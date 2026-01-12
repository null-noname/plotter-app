import { getDb } from '../../core/firebase.js';
import { getState, setState, subscribe } from '../../core/state.js';
import { escapeHtml, clearContainer, formatDate } from '../../utils/dom-utils.js';
import { initWorkEditor, openNewWorkEditor } from './work-editor.js';
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc
} from 'firebase/firestore';

let unsubscribeWorks = null;
let allWorksCache = [];

/**
 * ダッシュボードの初期化
 */
export function initDashboard() {
    // 作品エディタの初期化
    initWorkEditor();
    console.log('[Dashboard] Initialized v2 (Blue Btn Fix)');

    // 状態を監視して、TOPタブが表示されたらデータを取得
    subscribe((state) => {
        if (state.currentTab === 'top') {
            refreshWorkList(state);
        }
    });

    // 新規作成ボタン
    const newWorkBtn = document.getElementById('new-work-btn');
    if (newWorkBtn) {
        newWorkBtn.addEventListener('click', () => {
            openNewWorkEditor();
        });
    }

    // ソート順の変更監視
    const sortEl = document.getElementById('work-sort-order');
    if (sortEl) {
        sortEl.addEventListener('change', () => {
            renderWorkCards(allWorksCache, document.getElementById('work-grid-container'));
        });
    }

    // 初回読み込み用
    const state = getState();
    if (state.currentTab === 'top') {
        refreshWorkList(state);
    }
}

/**
 * 作品一覧の更新（Firestoreのリアルタイム監視設定）
 */
function refreshWorkList(state) {
    const container = document.getElementById('work-grid-container');
    if (!container) return;

    if (unsubscribeWorks) {
        unsubscribeWorks();
        unsubscribeWorks = null;
    }

    if (!state.currentUser) return;

    const db = getDb();
    // Modular SDK: query, where, onSnapshot
    const worksRef = collection(db, "works");
    const q = query(worksRef, where("uid", "==", state.currentUser.uid));

    unsubscribeWorks = onSnapshot(q, (snap) => {
        allWorksCache = [];
        snap.forEach(docSnap => {
            allWorksCache.push({ id: docSnap.id, ...docSnap.data() });
        });
        renderWorkCards(allWorksCache, container);
    }, (error) => {
        console.error('[Dashboard] 作品一覧監視エラー:', error);
        container.innerHTML = `
            <div style="padding:20px; color:#ff4444; border:1px solid #ff4444; border-radius:8px; background:rgba(255,0,0,0.1);">
                <h3 style="margin:0 0 10px 0;">読み込みエラー</h3>
                <p>データの取得に失敗しました。<br>
                ${escapeHtml(error.message)}</p>
                <p style="font-size:0.8rem; margin-top:10px; color:#ccc;">
                    ※ 解決しない場合は、ページをリロードするか、一度ログアウトして再ログインをお試しください。
                </p>
            </div>
        `;
    });
}

/**
 * 作品カードの描画
 */
function renderWorkCards(works, container) {
    clearContainer(container);

    if (!works || works.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:60px; color:#444; font-size:0.9rem;">作品がありません</div>';
        return;
    }

    // クライアント側でソート (インデックス不要)
    const sortVal = document.getElementById('work-sort-order')?.value || 'updatedAt_desc';
    const [field, order] = sortVal.split('_');

    const sorted = [...works].sort((a, b) => {
        // お気に入り（ピン）を最優先
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;

        // 次にユーザー選択のソート順
        const valA = a[field]?.seconds || 0;
        const valB = b[field]?.seconds || 0;

        return order === 'desc' ? valB - valA : valA - valB;
    });

    sorted.forEach(work => {
        const card = createWorkCard(work);
        container.appendChild(card);
    });
}

/**
 * 個別の作品カード要素を作成
 */
function createWorkCard(work) {
    const card = document.createElement('div');
    card.className = 'work-card';

    const tagsHtml = `
        <span class="work-tag ${work.length === 'short' ? 'tag-short' : 'tag-long'}">${work.length === 'short' ? '短編' : '長編'}</span>
    `;

    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <h3 style="margin:0;">${escapeHtml(work.title || "無題")}</h3>
            <button class="star-btn ${work.pinned ? 'active' : ''}" title="お気に入り">${work.pinned ? '★' : '☆'}</button>
        </div>
        <div style="margin:5px 0;">${tagsHtml}</div>
        <div class="work-meta" style="display:flex; justify-content:space-between; align-items:flex-end; gap:2px; font-size:0.85rem; margin-top:auto; color:#666;">
            <div style="display:flex; flex-direction:column; gap:4px;">
                <span>作成日: ${formatDate(work.createdAt)}</span>
                <span>更新日: ${formatDate(work.updatedAt, true)}</span>
            </div>
            <button class="btn-retro btn-edit blue" style="background-color: #1565c0 !important; color: #fff !important; font-size:0.8rem; padding:4px 12px;">編集</button>
        </div>
    `;
    // Force rebuild hash change v2

    // カードクリック時の挙動 (ボタン以外)
    card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;

        // 作品を選択状態にする
        setState({ selectedWorkId: work.id });
        // 最後に開いていたタブがあればそこへ、なければグローバルな最後のタブ、それもなければプロットへ
        const state = getState();
        const nextTab = work.lastTab || state.lastActiveTab || 'plot';
        setState({ currentTab: nextTab });
    });

    // 編集ボタンの挙動：カードクリックと同じ（作品を選択して前回タブへ）
    const editBtn = card.querySelector('.edit-btn');
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        setState({ selectedWorkId: work.id });
        const state = getState();
        const nextTab = work.lastTab || state.lastActiveTab || 'plot';
        setState({ currentTab: nextTab });
    });

    // スターボタンの挙動
    const starBtn = card.querySelector('.star-btn');
    starBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePin(work.id, work.pinned);
    });

    return card;
}

/**
 * ピン留め状態の切り替え
 */
async function togglePin(id, currentPinned) {
    const db = getDb();
    try {
        // Modular SDK: updateDoc
        const workRef = doc(db, "works", id);
        await updateDoc(workRef, {
            pinned: !currentPinned
        });
    } catch (error) {
        console.error('[Dashboard] ピン留め更新エラー:', error);
    }
}

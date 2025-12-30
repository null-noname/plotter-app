import { getDb } from '../../core/firebase.js';
import { getState, setState, subscribe } from '../../core/state.js';
import { escapeHtml, clearContainer, formatDate } from '../../utils/dom-utils.js';

let unsubscribeWorks = null;
let allWorksCache = [];

/**
 * ダッシュボードの初期化
 */
export function initDashboard() {
    // 状態を監視して、TOPタブが表示されたらデータを取得
    subscribe((state) => {
        if (state.currentTab === 'top') {
            refreshWorkList(state);
        }
    });

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
    // 取得を安定させるためorderByを一旦削除（インデックスエラー回避）
    unsubscribeWorks = db.collection("works")
        .where("uid", "==", state.currentUser.uid)
        .onSnapshot(snap => {
            allWorksCache = [];
            snap.forEach(doc => allWorksCache.push({ id: doc.id, ...doc.data() }));
            renderWorkCards(allWorksCache, container);
        }, error => {
            console.error('[Dashboard] 作品一覧監視エラー:', error);
        });
}

/**
 * 作品カードの描画
 */
function renderWorkCards(works, container) {
    clearContainer(container);

    if (!works || works.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">作品が登録されていません。<br>エディター側で作品を作成してください。</div>';
        return;
    }

    // クライアント側でソート (インデックス不要)
    const sort = document.getElementById('work-sort-order')?.value || 'updatedAt';
    const sorted = [...works].sort((a, b) => {
        // お気に入り（ピン）を最優先
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;

        // 次にユーザー選択のソート順
        const valA = a[sort]?.seconds || 0;
        const valB = b[sort]?.seconds || 0;
        return valB - valA;
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
        <p style="font-size:0.9rem; color:#aaa; flex:1; margin:5px 0;">${escapeHtml(work.catchphrase || "")}</p>
        <div class="work-meta" style="display:flex; flex-direction:column; gap:2px; font-size:0.75rem;">
            <span>作成: ${formatDate(work.createdAt)}</span>
            <span>更新: ${formatDate(work.updatedAt, true)}</span>
        </div>
    `;

    // カードクリック時の挙動 (スターボタン以外)
    card.addEventListener('click', (e) => {
        if (e.target.closest('.star-btn')) return;

        // 作品を選択状態にする
        setState({ selectedWorkId: work.id });
        // 最後に開いていたタブがあればそこへ、なければプロットへ
        const nextTab = work.lastTab || 'plot';
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
        await db.collection("works").doc(id).update({
            pinned: !currentPinned
        });
    } catch (error) {
        console.error('[Dashboard] ピン留め更新エラー:', error);
    }
}

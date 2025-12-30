/**
 * dashboard.js - TOP画面（作品一覧）の管理
 */

import { getDb } from '../../core/firebase.js';
import { getState, setState, subscribe } from '../../core/state.js';
import { escapeHtml, clearContainer } from '../../utils/dom-utils.js';

let unsubscribeWorks = null;

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
            renderWorkCards(snap, container);
        }, error => {
            console.error('[Dashboard] 作品一覧監視エラー:', error);
        });
}

/**
 * 作品カードの描画
 */
function renderWorkCards(snap, container) {
    clearContainer(container);

    if (snap.empty) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">作品が登録されていません。<br>エディター側で作品を作成してください。</div>';
        return;
    }

    snap.forEach(doc => {
        const work = { id: doc.id, ...doc.data() };
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

    const date = work.updatedAt ? new Date(work.updatedAt.seconds * 1000).toLocaleDateString() : '---';

    card.innerHTML = `
        <h3>${escapeHtml(work.title || "無題")}</h3>
        <p style="font-size:0.9rem; color:#aaa; flex:1;">${escapeHtml(work.catchphrase || "")}</p>
        <div class="work-meta">
            <span>最終更新: ${date}</span>
        </div>
    `;

    // カードクリック時の挙動
    card.addEventListener('click', () => {
        // 作品を選択状態にする
        setState({ selectedWorkId: work.id });
        // 最後に開いていたタブがあればそこへ、なければプロットへ
        const nextTab = work.lastTab || 'plot';
        setState({ currentTab: nextTab });
    });

    return card;
}

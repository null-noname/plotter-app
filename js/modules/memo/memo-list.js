/**
 * memo-list.js - 共通メモ一覧表示の管理
 */

import { getDb } from '../../core/firebase.js';
import { getState, setState, subscribe } from '../../core/state.js';
import { escapeHtml, clearContainer } from '../../utils/dom-utils.js';

let unsubscribeMemos = null;
let activeTagFilter = null;
let allMemosCache = [];

/**
 * メモ一覧の初期化
 */
export function initMemoList() {
    // グローバルブリッジ (タグフィルタ用)
    window.plotter_filterByTag = filterByTag;

    // 状態を監視して、タブが変わったら表示
    subscribe((state) => {
        if (state.currentTab === 'memo') {
            refreshMemoList(state);
        }
    });
}

/**
 * メモ一覧の更新（Firestoreのリアルタイム監視設定）
 */
function refreshMemoList(state) {
    const container = document.getElementById('memo-list-container');
    if (!container) return;

    if (unsubscribeMemos) {
        unsubscribeMemos();
        unsubscribeMemos = null;
    }

    if (!state.selectedWorkId) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">作品を選択してください</div>';
        return;
    }

    const db = getDb();
    // 共通メモから作品別のメモへ修正
    unsubscribeMemos = db.collection("works").doc(state.selectedWorkId)
        .collection("memos").orderBy("order", "asc")
        .onSnapshot(snap => {
            allMemosCache = [];
            snap.forEach(doc => allMemosCache.push({ id: doc.id, ...doc.data() }));
            renderMemoTags();
            renderMemoCards();
        }, error => {
            console.error('[MemoList] メモ監視エラー:', error);
        });
}

/**
 * タグ一覧の描画
 */
function renderMemoTags() {
    const bar = document.getElementById('memo-filter-bar');
    if (!bar) return;

    const allTags = new Set();
    allMemosCache.forEach(m => (m.tags || []).forEach(t => allTags.add(t)));

    clearContainer(bar);

    // 「すべて」ボタン
    const allBtn = document.createElement('button');
    allBtn.className = 'tag';
    allBtn.style.marginRight = '8px';
    allBtn.style.cursor = 'pointer';
    if (activeTagFilter === null) allBtn.style.background = '#444';
    allBtn.textContent = 'すべて';
    allBtn.addEventListener('click', () => filterByTag(null));
    bar.appendChild(allBtn);

    // 各タグボタン
    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag';
        btn.style.marginRight = '8px';
        btn.style.cursor = 'pointer';
        if (activeTagFilter === tag) btn.style.background = '#444';
        btn.textContent = tag;
        btn.addEventListener('click', () => filterByTag(tag));
        bar.appendChild(btn);
    });
}

/**
 * 特徴タグでのフィルタリング
 */
export function filterByTag(tag) {
    activeTagFilter = tag;
    renderMemoTags();
    renderMemoCards();
}

/**
 * メモカードの描画
 */
function renderMemoCards() {
    const container = document.getElementById('memo-list-container');
    if (!container) return;

    clearContainer(container);

    let filtered = allMemosCache;
    if (activeTagFilter) {
        filtered = filtered.filter(m => m.tags && m.tags.includes(activeTagFilter));
    }

    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">メモがありません</div>';
        return;
    }

    filtered.forEach(memo => {
        const card = createMemoCard(memo);
        container.appendChild(card);
    });
}

/**
 * 個別のメモカード要素を作成
 */
function createMemoCard(memo) {
    const preview = (memo.content || "").split('\n').slice(0, 5).join('\n');
    const card = document.createElement('div');
    card.className = 'card-retro';

    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div class="memo-click-area" style="flex:1; cursor:pointer;">
                <h3 style="font-size:1.3rem; margin-bottom:8px; color:var(--clr-save);">${escapeHtml(memo.title || "無題")}</h3>
                <div style="font-size:0.9rem; color:#aaa; white-space:pre-wrap; margin-bottom:12px;">${escapeHtml(preview)}...</div>
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    ${(memo.tags || []).map(t => `<span class="tag" style="color:#888;">${escapeHtml(t)}</span>`).join('')}
                </div>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px; margin-left:16px;">
                <button class="btn-sort btn-up">▲</button>
                <button class="btn-sort btn-down">▼</button>
                <button class="btn-icon btn-delete" style="background:transparent; color:var(--clr-delete); font-size:1.2rem; margin-top:10px; border:none; cursor:pointer; font-weight:bold;">×</button>
            </div>
        </div>
    `;

    // イベント
    card.querySelector('.memo-click-area').addEventListener('click', () => {
        if (window.plotter_openMemoEditor) window.plotter_openMemoEditor(memo.id);
    });

    card.querySelector('.btn-up').addEventListener('click', () => {
        if (window.plotter_moveMemo) window.plotter_moveMemo(memo.id, -1);
    });

    card.querySelector('.btn-down').addEventListener('click', () => {
        if (window.plotter_moveMemo) window.plotter_moveMemo(memo.id, 1);
    });

    card.querySelector('.btn-delete').addEventListener('click', () => {
        if (window.plotter_deleteMemo) window.plotter_deleteMemo(memo.id);
    });

    return card;
}

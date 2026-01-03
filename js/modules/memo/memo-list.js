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
    const card = document.createElement('div');
    card.className = 'collapsible-container collapsed card-retro';
    card.style.padding = "0";
    card.style.marginBottom = "15px";

    const getSummaryHtml = () => {
        return `
            <div class="line-clamp-5" style="color:#ddd; white-space:pre-wrap; font-size:0.95rem; margin-bottom:8px;">${escapeHtml(memo.content || "") || "内容なし"}</div>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
                ${(memo.tags || []).map(t => `<span class="tag" style="color:#888; border-color:#444; font-size:0.7rem;">${escapeHtml(t)}</span>`).join('')}
            </div>
        `;
    };

    card.innerHTML = `
        <div class="collapsible-header" style="padding: 12px; display:flex; justify-content:space-between; align-items:center; background: #1a1a1a; border-radius: 8px 8px 0 0; min-height:50px;">
            <div class="header-click-area" style="flex:1; cursor:pointer; display:flex; align-items:center; gap:8px; min-width:0;">
                <span class="toggle-icon gold-bold" style="width:1.2rem; font-size:1.2rem; display:flex; justify-content:center;">＋</span>
                <h3 style="font-size:1.1rem; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1; margin:0;">${escapeHtml(memo.title || "無題")}</h3>
            </div>
            <div style="display:flex; align-items:center; gap:8px; margin-left:12px;">
                <button class="btn-retro btn-delete" style="background:var(--clr-delete); font-size:0.75rem; padding:4px 8px; border-radius:4px;">削除</button>
                <button class="btn-retro btn-edit blue" style="font-size:0.75rem; padding:4px 8px; border-radius:4px;">編集</button>
                <button class="btn-sort btn-up" style="padding:4px 8px;">▲</button>
            </div>
        </div>
        <div class="collapsible-content summary-mode" style="padding: 12px; background: #0a0a0a; border-radius: 0 0 8px 8px; cursor:pointer; border-top:1px solid #222;">
            ${getSummaryHtml()}
        </div>
    `;

    const toggle = () => {
        const isCollapsed = card.classList.toggle('collapsed');
        const content = card.querySelector('.collapsible-content');
        const icon = card.querySelector('.toggle-icon');

        icon.textContent = isCollapsed ? '＋' : '－';

        if (isCollapsed) {
            content.classList.add('summary-mode');
            content.innerHTML = getSummaryHtml();
        } else {
            content.classList.remove('summary-mode');
            content.innerHTML = `
                <div style="color:#eee; white-space:pre-wrap; font-size:1.05rem; line-height:1.6; margin-bottom:12px;">${escapeHtml(memo.content || "")}</div>
                <div style="display:flex; gap:6px; flex-wrap:wrap; padding-top:10px; border-top:1px solid #222;">
                    ${(memo.tags || []).map(t => `<span class="tag" style="background:#333; color:#fff; font-size:0.75rem;">${escapeHtml(t)}</span>`).join('')}
                </div>
            `;
        }
    };

    card.querySelector('.collapsible-header').addEventListener('click', toggle);
    card.querySelector('.collapsible-content').addEventListener('click', (e) => {
        if (card.classList.contains('collapsed')) {
            toggle();
        }
    });

    card.querySelector('.btn-edit').addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.plotter_openMemoEditor) window.plotter_openMemoEditor(memo.id);
    });

    card.querySelector('.btn-up').addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.plotter_moveMemo) window.plotter_moveMemo(memo.id, -1);
    });

    card.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.plotter_deleteMemo) window.plotter_deleteMemo(memo.id);
    });

    return card;
}

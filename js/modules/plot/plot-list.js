/**
 * plot-list.js - プロット一覧表示の管理
 */

import { getDb } from '../../core/firebase.js';
import { subscribe } from '../../core/state.js';
import { escapeHtml, clearContainer } from '../../utils/dom-utils.js';
import { openPlotEditor, openPlotView } from './plot-editor.js';

let unsubscribePlots = null;

/**
 * プロット一覧の初期化
 */
export function initPlotList() {
    // 新規作成ボタン
    const newBtn = document.getElementById('plot-new-btn');
    if (newBtn) newBtn.addEventListener('click', () => openPlotEditor());

    // 状態を監視して、作品選択やタブが変わったら再描画
    subscribe((state) => {
        if (state.currentTab === 'plot') {
            refreshPlotList(state);
        }
    });
}

/**
 * プロット一覧の更新（Firestoreのリアルタイム監視設定）
 */
function refreshPlotList(state) {
    const container = document.getElementById('plot-list-container');
    if (!container) return;

    // 前回の監視を解除
    if (unsubscribePlots) {
        unsubscribePlots();
        unsubscribePlots = null;
    }

    if (!state.selectedWorkId) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">作品を選択してください</div>';
        return;
    }

    const db = getDb();
    unsubscribePlots = db.collection("works").doc(state.selectedWorkId)
        .collection("plots").orderBy("order", "asc")
        .onSnapshot(snap => {
            renderPlotCards(snap, container);
        }, error => {
            console.error('[PlotList] プロット監視エラー:', error);
        });
}

/**
 * 取得したデータを元にカードを描画
 */
function renderPlotCards(snap, container) {
    clearContainer(container);

    if (snap.empty) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">プロットがありません</div>';
        return;
    }

    snap.forEach(doc => {
        const plot = { id: doc.id, ...doc.data() };
        const card = createPlotCard(plot);
        container.appendChild(card);
    });
}

/**
 * 個別のプロットカード要素を作成
 */
function createPlotCard(plot) {
    const preview = (plot.content || "").split('\n').slice(0, 5).join('\n');
    const card = document.createElement('div');
    card.className = 'card-retro';

    // HTML構築 (イベントは後で紐付け)
    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="plot-click-area" style="flex:1; cursor:pointer; display:flex; align-items:center; gap:12px; min-width:0;">
                <h3 style="font-size:1.1rem; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1;">${escapeHtml(plot.title || "無題")}</h3>
                <span class="tag" style="color:var(--clr-save); border-color:var(--clr-save); font-size:0.75rem; flex-shrink:0;">${plot.type === 'timeline' ? 'TL' : '基本'}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; margin-left:12px;">
                <button class="btn-sort btn-up">▲</button>
                <button class="btn-sort btn-down">▼</button>
                <button class="btn-icon btn-delete" style="background:transparent; color:var(--clr-delete); font-size:1.2rem; padding: 4px; border:none; cursor:pointer; font-weight:bold;">×</button>
            </div>
        </div>
    `;

    // イベントの紐付け
    card.querySelector('.plot-click-area').addEventListener('click', () => {
        openPlotView(plot.id);
    });

    card.querySelector('.btn-up').addEventListener('click', () => {
        if (window.plotter_movePlot) window.plotter_movePlot(plot.id, -1);
    });

    card.querySelector('.btn-down').addEventListener('click', () => {
        if (window.plotter_movePlot) window.plotter_movePlot(plot.id, 1);
    });

    card.querySelector('.btn-delete').addEventListener('click', () => {
        if (window.plotter_deletePlot) window.plotter_deletePlot(plot.id);
    });

    return card;
}

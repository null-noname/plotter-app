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
    const card = document.createElement('div');
    card.className = 'collapsible-container collapsed card-retro';
    card.style.padding = "0";
    card.style.marginBottom = "15px";

    // プロット内容のサマリー作成
    const getSummaryHtml = () => {
        if (plot.type === 'timeline') {
            return (plot.timelineItems || []).slice(0, 3).map(item => `
                <div style="font-size:0.85rem; border-left:2px solid var(--clr-save); padding-left:8px; margin-bottom:4px; color:#999;">
                    <span style="color:var(--clr-save); opacity:0.7;">${item.date || "-"}</span>: ${escapeHtml(item.content || "")}
                </div>
            `).join('') + ((plot.timelineItems || []).length > 3 ? '<div style="color:#666; font-size:0.8rem; margin-top:4px;">...他多数</div>' : '');
        } else {
            return `<div class="line-clamp-5" style="color:#ddd; white-space:pre-wrap; font-size:0.95rem;">${escapeHtml(plot.content || "") || "内容なし"}</div>`;
        }
    };

    card.innerHTML = `
        <div class="collapsible-header" style="padding: 12px; display:flex; justify-content:space-between; align-items:center; background: #1a1a1a; border-radius: 8px 8px 0 0; min-height:50px;">
            <div class="header-click-area" style="flex:1; cursor:pointer; display:flex; align-items:center; gap:8px; min-width:0;">
                <span class="toggle-icon gold-bold" style="width:1.2rem; font-size:1.2rem; display:flex; justify-content:center;">＋</span>
                <h3 style="font-size:1.1rem; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1; margin:0;">${escapeHtml(plot.title || "無題")}</h3>
                <span class="tag" style="color:var(--clr-save); border-color:var(--clr-save); font-size:0.7rem; flex-shrink:0;">${plot.type === 'timeline' ? 'TL' : '基本'}</span>
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
            if (plot.type === 'timeline') {
                renderTimelineFull(plot, content);
            } else {
                content.innerHTML = `<div style="color:#eee; white-space:pre-wrap; font-size:1.05rem; line-height:1.6;">${escapeHtml(plot.content || "")}</div>`;
            }
        }
    };

    card.querySelector('.collapsible-header').addEventListener('click', toggle);
    card.querySelector('.collapsible-content').addEventListener('click', (e) => {
        // コンテンツ内のクリックでも、サマリーモード時のみトグルの対象にする
        if (card.classList.contains('collapsed')) {
            toggle();
        }
    });

    card.querySelector('.btn-edit').addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.plotter_openPlotEditor) window.plotter_openPlotEditor(plot.id);
    });

    card.querySelector('.btn-up').addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.plotter_movePlot) window.plotter_movePlot(plot.id, -1);
    });

    card.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.plotter_deletePlot) window.plotter_deletePlot(plot.id);
    });

    return card;
}

/**
 * タイムライン形式の全内容を表示（展開時）
 */
function renderTimelineFull(plot, container) {
    container.innerHTML = (plot.timelineItems || []).map(item => `
        <div style="margin-bottom:12px; border-bottom:1px solid #222; padding-bottom:8px;">
            <div style="color:var(--clr-save); font-size:0.85rem; font-weight:bold; margin-bottom:4px;">${item.date || "-"}</div>
            <div style="color:#eee; white-space:pre-wrap; font-size:1rem;">${escapeHtml(item.content || "")}</div>
        </div>
    `).join('') || "内容なし";
}

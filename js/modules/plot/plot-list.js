/**
 * plot-list.js - プロット一覧表示の管理
 */

import { getDb } from '../../core/firebase.js';
import { getState, setState, subscribe } from '../../core/state.js';
import { escapeHtml, clearContainer } from '../../utils/dom-utils.js';

let unsubscribePlots = null;

/**
 * プロット一覧の初期化
 */
export function initPlotList() {
    // 状態を監視して、作品選択やタブが変わったら再描画
    subscribe((state) => {
        if (state.currentTab === 'plot') {
            refreshWorkDropdown(state);
            refreshPlotList(state);
        }
    });

    // ワークドロップダウンの変更イベント
    const dropdown = document.getElementById('plot-work-dropdown');
    if (dropdown) {
        dropdown.addEventListener('change', (e) => {
            setState({ selectedWorkId: e.target.value });
        });
    }
}

/**
 * 作品選択ドロップダウンの更新
 */
async function refreshWorkDropdown(state) {
    if (!state.currentUser) return;

    const db = getDb();
    const dropdown = document.getElementById('plot-work-dropdown');
    if (!dropdown) return;

    // すでに選択中の場合は中身を書き換えない（ループ防止）
    if (dropdown.options.length > 1 && dropdown.value === state.selectedWorkId) {
        return;
    }

    try {
        const worksSnap = await db.collection("works")
            .where("uid", "==", state.currentUser.uid)
            .get();

        const currentVal = state.selectedWorkId;
        dropdown.innerHTML = '<option value="">作品を選択してください</option>';

        worksSnap.forEach(doc => {
            const data = doc.data();
            const opt = document.createElement('option');
            opt.value = doc.id;
            opt.textContent = data.title;
            dropdown.appendChild(opt);
        });

        dropdown.value = currentVal || "";
    } catch (error) {
        console.error('[PlotList] 作品一覧の取得に失敗:', error);
    }
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
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div class="plot-click-area" style="flex:1; cursor:pointer;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                    <span class="tag" style="color:var(--clr-save); border-color:var(--clr-save); font-size:0.7rem;">${plot.type === 'timeline' ? 'TL' : '通常'}</span>
                    <h3 style="font-size:1.2rem; color:#fff;">${escapeHtml(plot.title || "無題")}</h3>
                </div>
                ${plot.date ? `<div style="font-size:0.85rem; color:var(--clr-save); margin-bottom:4px;">${escapeHtml(plot.date)}</div>` : ''}
                <div style="font-size:0.9rem; color:#aaa; white-space:pre-wrap;">${escapeHtml(preview)}...</div>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px; margin-left:16px;">
                <button class="btn-sort btn-up">▲</button>
                <button class="btn-sort btn-down">▼</button>
                <button class="btn-icon btn-delete" style="background:transparent; color:var(--clr-delete); font-size:1.2rem; margin-top:10px;">🗑</button>
            </div>
        </div>
    `;

    // イベントの紐付け (onclickを排除)
    card.querySelector('.plot-click-area').addEventListener('click', () => {
        // TODO: plot-editorを開く処理を呼び出す
        if (window.plotter_openPlotEditor) window.plotter_openPlotEditor(plot.id);
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

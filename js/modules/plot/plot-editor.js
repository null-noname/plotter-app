/**
 * plot-editor.js - プロットの編集・保存・操作の管理
 */

import { getDb } from '../../core/firebase.js';
import { getState } from '../../core/state.js';

let currentPlotId = null;
let currentPlotType = 'normal';
let timelineItems = []; // { date: "", content: "" } の配列

/**
 * プロットエディタの初期化
 */
export function initPlotEditor() {
    // グローバルブリッジの登録 (モジュール移行期の一時的措置)
    window.plotter_openPlotEditor = openPlotEditor;
    window.plotter_openPlotView = openPlotView;
    window.plotter_deletePlot = deletePlot;
    window.plotter_movePlot = movePlot;

    // 編集画面：イベントリスナーの登録
    const saveBtn = document.getElementById('plot-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', savePlot);

    const backBtn = document.getElementById('plot-edit-back');
    if (backBtn) backBtn.addEventListener('click', closePlotEditor);

    const typeNormalBtn = document.getElementById('plot-type-normal');
    if (typeNormalBtn) typeNormalBtn.addEventListener('click', () => setPlotType('normal'));

    const typeTimelineBtn = document.getElementById('plot-type-timeline');
    if (typeTimelineBtn) typeTimelineBtn.addEventListener('click', () => setPlotType('timeline'));

    const addEntryBtn = document.getElementById('plot-timeline-add-btn');
    if (addEntryBtn) addEntryBtn.addEventListener('click', () => addTimelineEntry());

    // 閲覧画面：イベントリスナーの登録
    const viewBackBtn = document.getElementById('plot-view-back');
    if (viewBackBtn) viewBackBtn.addEventListener('click', closePlotEditor);

    const viewEditBtn = document.getElementById('plot-view-edit-btn');
    if (viewEditBtn) viewEditBtn.addEventListener('click', () => openPlotEditor(currentPlotId));
}

/**
 * 閲覧モードを開く
 */
export async function openPlotView(id) {
    const state = getState();
    if (!state.selectedWorkId) return;

    currentPlotId = id;
    const db = getDb();
    const doc = await db.collection("works").doc(state.selectedWorkId)
        .collection("plots").doc(id).get();

    if (!doc.exists) return;
    const data = doc.data();

    // 表示切り替え
    document.getElementById('plot-list-view').style.display = 'none';
    document.getElementById('plot-edit-view').style.display = 'none';
    document.getElementById('plot-view-view').style.display = 'block';

    document.getElementById('plot-view-title').textContent = data.title || "無題";

    const basicView = document.getElementById('plot-view-basic-content');
    const timelineView = document.getElementById('plot-view-timeline-content');
    const timelineList = document.getElementById('plot-view-timeline-list');

    if (data.type === 'timeline') {
        basicView.style.display = 'none';
        timelineView.style.display = 'block';
        timelineList.innerHTML = (data.timelineItems || []).map(item => `
            <div style="display:flex; gap:12px; margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:10px;">
                <div style="color:var(--clr-save); font-size:0.9rem; min-width:60px; font-weight:bold;">${item.date || "-"}</div>
                <div style="flex:1; color:#ddd; white-space:pre-wrap;">${item.content || ""}</div>
            </div>
        `).join('');
    } else {
        basicView.style.display = 'block';
        timelineView.style.display = 'none';
        basicView.textContent = data.content || "";
    }
}

/**
 * エディタを開く
 */
export async function openPlotEditor(id = null) {
    const state = getState();
    if (!state.selectedWorkId) {
        alert("作品を選択してください");
        return;
    }

    currentPlotId = id;
    timelineItems = [];
    document.getElementById('plot-list-view').style.display = 'none';
    document.getElementById('plot-view-view').style.display = 'none';
    document.getElementById('plot-edit-view').style.display = 'block';

    const titleInput = document.getElementById('plot-title');
    const contentInput = document.getElementById('plot-content');

    if (id) {
        const db = getDb();
        const doc = await db.collection("works").doc(state.selectedWorkId)
            .collection("plots").doc(id).get();

        if (doc.exists) {
            const data = doc.data();
            titleInput.value = data.title || "";
            contentInput.value = data.content || "";
            timelineItems = data.timelineItems || [];
            setPlotType(data.type || 'normal');
        }
    } else {
        titleInput.value = "";
        contentInput.value = "";
        setPlotType('normal');
    }
}

/**
 * プロットタイプの切り替え
 */
function setPlotType(type) {
    currentPlotType = type;
    document.getElementById('plot-type-normal').classList.toggle('active', type === 'normal');
    document.getElementById('plot-type-timeline').classList.toggle('active', type === 'timeline');

    // 表示切り替え
    const basicView = document.getElementById('plot-basic-content');
    const timelineView = document.getElementById('plot-timeline-view');

    if (type === 'timeline') {
        basicView.style.display = 'none';
        timelineView.style.display = 'block';
        renderTimelineEntries();
    } else {
        basicView.style.display = 'block';
        timelineView.style.display = 'none';
    }
}

/**
 * タイムラインエントリーの追加
 */
function addTimelineEntry() {
    timelineItems.push({ date: "", content: "" });
    renderTimelineEntries();
}

/**
 * タイムラインエントリーの描画
 */
function renderTimelineEntries() {
    const list = document.getElementById('plot-timeline-list');
    if (!list) return;

    list.innerHTML = "";
    timelineItems.forEach((item, index) => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '10px';
        row.style.marginBottom = '10px';
        row.style.alignItems = 'flex-start';

        row.innerHTML = `
            <input type="text" class="tl-date" placeholder="日時" value="${item.date}"
                style="width:60px; padding:6px; background:#0a0a0a; border:1px solid #333; color:var(--clr-save); font-size:0.85rem; align-self: stretch;">
            <textarea class="tl-content" placeholder="内容"
                style="flex: 1; height:40px; padding:8px; background:#111; border:1px solid #444; color:#fff; font-size:0.95rem; resize:none; overflow-y:hidden;">${item.content}</textarea>
            <div style="display:flex; gap:4px; align-items: center;">
                <button class="btn-sort tl-up" style="${index === 0 ? 'opacity:0.3; cursor:default;' : ''}">▲</button>
                <button class="btn-icon tl-del" style="background:transparent; color:var(--clr-delete); font-size:1.5rem; padding: 0 4px; line-height: 1;">×</button>
            </div>
        `;

        // イベント紐付け
        const dateInput = row.querySelector('.tl-date');
        const contentInput = row.querySelector('.tl-content');

        const autoResize = (el) => {
            el.style.height = '40px';
            el.style.height = (el.scrollHeight) + 'px';
        };

        dateInput.addEventListener('input', (e) => { timelineItems[index].date = e.target.value; });
        contentInput.addEventListener('input', (e) => {
            timelineItems[index].content = e.target.value;
            autoResize(e.target);
        });

        // 初期化時のリサイズ
        setTimeout(() => autoResize(contentInput), 0);

        row.querySelector('.tl-up').addEventListener('click', () => {
            if (index > 0) {
                const temp = timelineItems[index];
                timelineItems[index] = timelineItems[index - 1];
                timelineItems[index - 1] = temp;
                renderTimelineEntries();
            }
        });

        row.querySelector('.tl-del').addEventListener('click', () => {
            timelineItems.splice(index, 1);
            renderTimelineEntries();
        });

        list.appendChild(row);
    });
}

/**
 * 保存処理
 */
export async function savePlot() {
    const state = getState();
    const title = document.getElementById('plot-title').value.trim();
    const content = document.getElementById('plot-content').value;

    if (!title) {
        alert('タイトルを入力してください。');
        return;
    }

    const data = {
        title: title,
        content: currentPlotType === 'timeline' ? "" : content,
        type: currentPlotType,
        timelineItems: currentPlotType === 'timeline' ? timelineItems : [],
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const db = getDb();
    const ref = db.collection("works").doc(state.selectedWorkId).collection("plots");

    try {
        if (currentPlotId) {
            await ref.doc(currentPlotId).update(data);
            alert('保存しました。');
        } else {
            const snap = await ref.get();
            data.order = snap.size;
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await ref.add(data);
            alert('作成しました！');
        }
        closePlotEditor();
    } catch (error) {
        console.error('[PlotEditor] 保存エラー:', error);
        alert('保存に失敗しました。');
    }
}

/**
 * エディタを閉じる
 */
export function closePlotEditor() {
    document.getElementById('plot-list-view').style.display = 'block';
    document.getElementById('plot-edit-view').style.display = 'none';
    document.getElementById('plot-view-view').style.display = 'none';
}

/**
 * 削除処理
 */
export async function deletePlot(id) {
    if (!confirm("このプロットを削除しますか？")) return;

    const state = getState();
    const db = getDb();
    try {
        await db.collection("works").doc(state.selectedWorkId)
            .collection("plots").doc(id).delete();
    } catch (error) {
        console.error('[PlotEditor] 削除エラー:', error);
    }
}

/**
 * 並び替え処理
 */
export async function movePlot(id, dir) {
    const state = getState();
    const db = getDb();
    const ref = db.collection("works").doc(state.selectedWorkId).collection("plots");

    try {
        const snap = await ref.orderBy("order", "asc").get();
        const plots = [];
        snap.forEach(doc => plots.push({ id: doc.id, ...doc.data() }));

        const idx = plots.findIndex(p => p.id === id);
        if (idx === -1) return;
        const targetIdx = idx + dir;
        if (targetIdx < 0 || targetIdx >= plots.length) return;

        const other = plots[targetIdx];
        const batch = db.batch();
        batch.update(ref.doc(id), { order: targetIdx });
        batch.update(ref.doc(other.id), { order: idx });
        await batch.commit();
    } catch (error) {
        console.error('[PlotEditor] 並び替えエラー:', error);
    }
}

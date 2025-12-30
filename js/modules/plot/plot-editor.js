/**
 * plot-editor.js - プロットの編集・保存・操作の管理
 */

import { getDb } from '../../core/firebase.js';
import { getState } from '../../core/state.js';

let currentPlotId = null;
let currentPlotType = 'normal';

/**
 * プロットエディタの初期化
 */
export function initPlotEditor() {
    // グローバルブリッジの登録 (モジュール移行期の一時的措置)
    window.plotter_openPlotEditor = openPlotEditor;
    window.plotter_deletePlot = deletePlot;
    window.plotter_movePlot = movePlot;

    // イベントリスナーの登録
    const saveBtn = document.querySelector('#plot-edit-view .btn-retro.save');
    if (saveBtn) saveBtn.addEventListener('click', savePlot);

    const backBtn = document.querySelector('#plot-edit-view .btn-retro.back');
    if (backBtn) backBtn.addEventListener('click', closePlotEditor);

    const typeNormalBtn = document.getElementById('plot-type-normal');
    if (typeNormalBtn) typeNormalBtn.addEventListener('click', () => setPlotType('normal'));

    const typeTimelineBtn = document.getElementById('plot-type-timeline');
    if (typeTimelineBtn) typeTimelineBtn.addEventListener('click', () => setPlotType('timeline'));
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
    document.getElementById('plot-list-view').style.display = 'none';
    document.getElementById('plot-edit-view').style.display = 'block';

    const titleInput = document.getElementById('plot-title');
    const contentInput = document.getElementById('plot-content');
    const dateInput = document.getElementById('plot-date');

    if (id) {
        const db = getDb();
        const doc = await db.collection("works").doc(state.selectedWorkId)
            .collection("plots").doc(id).get();

        if (doc.exists) {
            const data = doc.data();
            titleInput.value = data.title || "";
            contentInput.value = data.content || "";
            dateInput.value = data.date || "";
            setPlotType(data.type || 'normal');
        }
    } else {
        titleInput.value = "";
        contentInput.value = "";
        dateInput.value = "";
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
    document.getElementById('plot-timeline-meta').style.display = (type === 'timeline') ? 'flex' : 'none';
}

/**
 * 保存処理
 */
export async function savePlot() {
    const state = getState();
    const title = document.getElementById('plot-title').value.trim();
    const content = document.getElementById('plot-content').value;
    const date = document.getElementById('plot-date').value;

    if (!title) {
        alert('タイトルを入力してください。');
        return;
    }

    const data = {
        title: title,
        content: content,
        type: currentPlotType,
        date: currentPlotType === 'timeline' ? date : "",
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

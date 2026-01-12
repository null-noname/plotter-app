/**
 * plot-editor.js - プロットの編集・保存・操作の管理
 */

import { getDb } from '../../core/firebase.js';
import { getState } from '../../core/state.js';
import { autoResizeTextarea } from '../../utils/dom-utils.js';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    writeBatch,
    serverTimestamp
} from 'firebase/firestore';

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

    const contentInput = document.getElementById('plot-content');
    if (contentInput) {
        contentInput.addEventListener('input', (e) => autoResizeTextarea(e.target));
    }

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
    currentPlotId = id;
    const db = getDb();
    const plotRef = doc(db, "works", state.selectedWorkId, "plots", id);
    const docSnap = await getDoc(plotRef);

    if (!docSnap.exists()) return;
    const data = docSnap.data();

    // 表示切り替え
    document.getElementById('plot-list-view').style.display = 'none';
    document.getElementById('plot-edit-view').style.display = 'none';
    document.getElementById('plot-view-view').style.display = 'block';

    document.getElementById('plot-view-title').textContent = data.title || "無題";

    const basicViewArea = document.getElementById('plot-view-basic-content-area');
    const basicContent = document.getElementById('plot-view-basic-content');
    const timelineView = document.getElementById('plot-view-timeline-content');
    const timelineList = document.getElementById('plot-view-timeline-list');

    if (data.type === 'timeline') {
        if (basicViewArea) basicViewArea.style.display = 'none';
        timelineView.style.display = 'block';
        timelineList.innerHTML = (data.timelineItems || []).map(item => `
            <div class="collapsible-container">
                <div class="collapsible-header" onclick="this.parentElement.classList.toggle('collapsed')">
                    <div style="color:var(--clr-save); font-size:0.9rem; font-weight:bold;">${item.date || "日時未設定"}</div>
                </div>
                <div class="collapsible-content">
                    <div style="color:#ddd; white-space:pre-wrap; font-size:1.05rem;">${item.content || ""}</div>
                </div>
            </div>
        `).join('');
    } else {
        if (basicViewArea) basicViewArea.style.display = 'block';
        timelineView.style.display = 'none';
        basicContent.textContent = data.content || "";
    }
}

/**
 * エディタを開く
 */
export async function openPlotEditor(id = null) {
    const state = getState();
    if (!state.selectedWorkId) {
        return;
    }

    currentPlotId = id;
    timelineItems = [];
    document.getElementById('plot-list-view').style.display = 'none';
    document.getElementById('plot-view-view').style.display = 'none';
    document.getElementById('plot-edit-view').style.display = 'block';

    // 既存プロット編集時はタイプ変更不可
    const typeSelector = document.getElementById('plot-type-selector');
    if (typeSelector) {
        typeSelector.style.display = id ? 'none' : 'flex';
    }

    const titleInput = document.getElementById('plot-title');
    const contentInput = document.getElementById('plot-content');

    if (id) {
        const db = getDb();
        const plotRef = doc(db, "works", state.selectedWorkId, "plots", id);
        const docSnap = await getDoc(plotRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            titleInput.value = data.title || "";
            contentInput.value = data.content || "";
            timelineItems = data.timelineItems || [];
            setPlotType(data.type || 'normal');
            // 高さを調整
            setTimeout(() => autoResizeTextarea(contentInput), 0);
        }
    } else {
        titleInput.value = "";
        contentInput.value = "";
        setPlotType('normal');
        autoResizeTextarea(contentInput);
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
        const container = document.createElement('div');
        container.className = 'collapsible-container';

        container.innerHTML = `
            <div class="collapsible-header" onclick="this.parentElement.classList.toggle('collapsed')">
                <div style="color:var(--clr-save); font-size:0.9rem; font-weight:bold;">${item.date || "（新規エントリー）"}</div>
            </div>
            <div class="collapsible-content">
                <div style="display:flex; gap:10px; margin-bottom:10px; alignItems:flex-start;">
                    <input type="text" class="tl-date" placeholder="日時" value="${item.date}"
                        style="width:80px; padding:6px; background:#0a0a0a; border:1px solid #333; color:var(--clr-save); font-size:0.85rem; align-self: center; text-align: center;">
                    <textarea class="tl-content" placeholder="内容"
                        style="flex: 1; height:40px; padding:8px; background:#111; border:1px solid #444; color:#fff; font-size:0.95rem; resize:none; overflow-y:hidden;">${item.content}</textarea>
                    <div style="display:flex; gap:4px; align-items: center;">
                        <button class="btn-sort tl-up" style="${index === 0 ? 'opacity:0.3; cursor:default;' : ''}">▲</button>
                        <button class="btn-icon tl-del" style="background:var(--clr-delete); color:#fff; width:24px; height:24px; border-radius:4px; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; font-weight:bold; font-size:1.1rem; padding: 0;">×</button>
                    </div>
                </div>
            </div>
        `;

        // イベント紐付け
        const dateInput = container.querySelector('.tl-date');
        const contentInput = container.querySelector('.tl-content');

        dateInput.addEventListener('input', (e) => {
            timelineItems[index].date = e.target.value;
            container.querySelector('.collapsible-header div').textContent = e.target.value || "（空の日時）";
        });
        contentInput.addEventListener('input', (e) => {
            timelineItems[index].content = e.target.value;
            autoResizeTextarea(e.target);
        });

        // 初期化時のリサイズ
        setTimeout(() => autoResizeTextarea(contentInput), 0);

        container.querySelector('.tl-up').addEventListener('click', () => {
            if (index > 0) {
                const temp = timelineItems[index];
                timelineItems[index] = timelineItems[index - 1];
                timelineItems[index - 1] = temp;
                renderTimelineEntries();
            }
        });

        container.querySelector('.tl-del').addEventListener('click', () => {
            if (confirm("本当に削除しますか？")) {
                timelineItems.splice(index, 1);
                renderTimelineEntries();
            }
        });

        list.appendChild(container);
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
        return;
    }

    try {
        const fb = window.firebase;
        const data = {
            title: title,
            content: currentPlotType === 'timeline' ? "" : content,
            type: currentPlotType,
            timelineItems: currentPlotType === 'timeline' ? timelineItems : [],
            updatedAt: fb.firestore.FieldValue.serverTimestamp()
        };

        const db = getDb();
        const plotsRef = collection(db, "works", state.selectedWorkId, "plots");

        let savedId = currentPlotId;
        if (currentPlotId) {
            const plotRef = doc(db, "works", state.selectedWorkId, "plots", currentPlotId);
            await updateDoc(plotRef, data);
        } else {
            const q = query(plotsRef);
            const snap = await getDocs(q);
            data.order = snap.size;
            data.createdAt = serverTimestamp();
            const docRef = await addDoc(plotsRef, data);
            savedId = docRef.id;
        }
        // 保存後は一覧に戻る
        closePlotEditor();
    } catch (error) {
        console.error('[PlotEditor] 保存エラー:', error);
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
    if (!confirm("本当に削除しますか？")) return;

    const state = getState();
    const db = getDb();
    try {
        const plotRef = doc(db, "works", state.selectedWorkId, "plots", id);
        await deleteDoc(plotRef);
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
    const plotsRef = collection(db, "works", state.selectedWorkId, "plots");

    try {
        const q = query(plotsRef, orderBy("order", "asc"));
        const snap = await getDocs(q);
        const plots = [];
        snap.forEach(docSnap => plots.push({ id: docSnap.id, ...docSnap.data() }));

        const idx = plots.findIndex(p => p.id === id);
        if (idx === -1) return;
        const targetIdx = idx + dir;
        if (targetIdx < 0 || targetIdx >= plots.length) return;

        const other = plots[targetIdx];
        const batch = writeBatch(db);
        const currentRef = doc(db, "works", state.selectedWorkId, "plots", id);
        const otherRef = doc(db, "works", state.selectedWorkId, "plots", other.id);

        batch.update(currentRef, { order: targetIdx });
        batch.update(otherRef, { order: idx });
        await batch.commit();
    } catch (error) {
        console.error('[PlotEditor] 並び替えエラー:', error);
    }
}

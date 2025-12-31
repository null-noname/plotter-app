/**
 * memo-editor.js - 共通メモの編集・保存・操作の管理
 */

import { getDb } from '../../core/firebase.js';
import { getState } from '../../core/state.js';
import { escapeHtml } from '../../utils/dom-utils.js';

let currentMemoId = null;

/**
 * メモエディタの初期化
 */
export function initMemoEditor() {
    // グローバルブリッジ
    window.plotter_openMemoEditor = openMemoEditor;
    window.plotter_openMemoView = openMemoView;
    window.plotter_deleteMemo = deleteMemo;
    window.plotter_moveMemo = moveMemo;

    // イベントリスナー: 新規作成
    const newBtn = document.getElementById('memo-new-btn');
    if (newBtn) newBtn.addEventListener('click', () => openMemoEditor(null));

    // イベントリスナー: 保存
    const saveBtn = document.querySelector('#memo-edit-view .btn-retro.save');
    if (saveBtn) saveBtn.addEventListener('click', saveMemo);

    // イベントリスナー: 戻る
    const backBtn = document.querySelector('#memo-edit-view .btn-retro.back');
    if (backBtn) backBtn.addEventListener('click', () => {
        if (currentMemoId) {
            openMemoView(currentMemoId);
        } else {
            closeMemoEditor();
        }
    });

    // 閲覧画面用：戻る・編集
    const viewBackBtn = document.getElementById('memo-view-back');
    if (viewBackBtn) viewBackBtn.addEventListener('click', closeMemoEditor);

    const viewEditBtn = document.getElementById('memo-view-edit-btn');
    if (viewEditBtn) viewEditBtn.addEventListener('click', () => openMemoEditor(currentMemoId));
}

/**
 * 閲覧モードを開く
 */
export async function openMemoView(id) {
    const state = getState();
    if (!state.selectedWorkId) return;

    currentMemoId = id;
    const db = getDb();
    const doc = await db.collection("works").doc(state.selectedWorkId)
        .collection("memos").doc(id).get();

    if (!doc.exists) return;
    const data = doc.data();

    // 表示切り替え
    document.getElementById('memo-list-view').style.display = 'none';
    document.getElementById('memo-edit-view').style.display = 'none';
    document.getElementById('memo-view-view').style.display = 'block';

    document.getElementById('memo-view-title').textContent = data.title || "無題";
    const tagsContainer = document.getElementById('memo-view-tags');
    tagsContainer.innerHTML = (data.tags || []).map(t => `<span class="tag" style="background:#333; color:#fff;">${escapeHtml(t)}</span>`).join('');
    document.getElementById('memo-view-content').textContent = data.content || "";
}

/**
 * エディタを開く
 */
export async function openMemoEditor(id = null) {
    currentMemoId = id;
    document.getElementById('memo-list-view').style.display = 'none';
    document.getElementById('memo-view-view').style.display = 'none';
    document.getElementById('memo-edit-view').style.display = 'block';

    const titleInput = document.getElementById('memo-title');
    const tagsInput = document.getElementById('memo-tags');
    const contentInput = document.getElementById('memo-content');

    if (id) {
        const state = getState();
        const db = getDb();
        const doc = await db.collection("works").doc(state.selectedWorkId)
            .collection("memos").doc(id).get();
        if (doc.exists) {
            const data = doc.data();
            titleInput.value = data.title || "";
            tagsInput.value = (data.tags || []).join(', ');
            contentInput.value = data.content || "";
        }
    } else {
        titleInput.value = "";
        tagsInput.value = "";
        contentInput.value = "";
    }
}

/**
 * メモを閉じる
 */
export function closeMemoEditor() {
    document.getElementById('memo-list-view').style.display = 'block';
    document.getElementById('memo-view-view').style.display = 'none';
    document.getElementById('memo-edit-view').style.display = 'none';
}

/**
 * 保存処理
 */
export async function saveMemo() {
    const state = getState();
    if (!state.currentUser || !state.selectedWorkId) return;

    const title = document.getElementById('memo-title').value.trim();
    const tags = document.getElementById('memo-tags').value.split(',').map(t => t.trim()).filter(t => t);
    const content = document.getElementById('memo-content').value;

    const fb = window.firebase || firebase;
    const data = {
        uid: state.currentUser.uid,
        title: title || "無題",
        tags: tags,
        content: content,
        updatedAt: fb.firestore.FieldValue.serverTimestamp()
    };

    const db = getDb();
    const collection = db.collection("works").doc(state.selectedWorkId).collection("memos");

    try {
        let savedId = currentMemoId;
        if (currentMemoId) {
            await collection.doc(currentMemoId).update(data);
        } else {
            const snap = await collection.get();
            data.order = snap.size;
            data.createdAt = fb.firestore.FieldValue.serverTimestamp();
            const docRef = await collection.add(data);
            savedId = docRef.id;
        }
        // 保存後は閲覧モードへ遷移
        openMemoView(savedId);
    } catch (error) {
        console.error('[MemoEditor] 保存エラー:', error);
    }
}

/**
 * 削除処理
 */
export async function deleteMemo(id) {
    if (!confirm("本当に削除しますか？")) return;

    const state = getState();
    const db = getDb();
    try {
        await db.collection("works").doc(state.selectedWorkId)
            .collection("memos").doc(id).delete();
    } catch (error) {
        console.error('[MemoEditor] 削除エラー:', error);
    }
}

/**
 * 並び替え処理
 */
export async function moveMemo(id, dir) {
    const state = getState();
    const db = getDb();
    const collection = db.collection("works").doc(state.selectedWorkId).collection("memos");

    try {
        const snap = await collection.orderBy("order", "asc").get();
        const memos = [];
        snap.forEach(doc => memos.push({ id: doc.id, ...doc.data() }));

        const idx = memos.findIndex(m => m.id === id);
        if (idx === -1) return;
        const targetIdx = idx + dir;
        if (targetIdx < 0 || targetIdx >= memos.length) return;

        const other = memos[targetIdx];
        const batch = db.batch();
        batch.update(collection.doc(id), { order: targetIdx });
        batch.update(collection.doc(other.id), { order: idx });
        await batch.commit();
    } catch (error) {
        console.error('[MemoEditor] 並びび替えエラー:', error);
    }
}

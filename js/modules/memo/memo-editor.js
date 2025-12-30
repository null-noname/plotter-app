/**
 * memo-editor.js - 共通メモの編集・保存・操作の管理
 */

import { getDb } from '../../core/firebase.js';
import { getState } from '../../core/state.js';

let currentMemoId = null;

/**
 * メモエディタの初期化
 */
export function initMemoEditor() {
    // グローバルブリッジ
    window.plotter_openMemoEditor = openMemoEditor;
    window.plotter_deleteMemo = deleteMemo;
    window.plotter_moveMemo = moveMemo;

    // イベントリスナー
    const saveBtn = document.querySelector('#memo-edit-view .btn-retro.save');
    if (saveBtn) saveBtn.addEventListener('click', saveMemo);

    const backBtn = document.querySelector('#memo-edit-view .btn-retro.back');
    if (backBtn) backBtn.addEventListener('click', closeMemoEditor);
}

/**
 * エディタを開く
 */
export async function openMemoEditor(id = null) {
    currentMemoId = id;
    document.getElementById('memo-list-view').style.display = 'none';
    document.getElementById('memo-edit-view').style.display = 'block';

    const titleInput = document.getElementById('memo-title');
    const tagsInput = document.getElementById('memo-tags');
    const contentInput = document.getElementById('memo-content');

    if (id) {
        const db = getDb();
        const doc = await db.collection("commonMemos").doc(id).get();
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
    document.getElementById('memo-edit-view').style.display = 'none';
}

/**
 * 保存処理
 */
export async function saveMemo() {
    const state = getState();
    if (!state.currentUser) return;

    const title = document.getElementById('memo-title').value.trim();
    const tags = document.getElementById('memo-tags').value.split(',').map(t => t.trim()).filter(t => t);
    const content = document.getElementById('memo-content').value;

    const data = {
        uid: state.currentUser.uid,
        title: title || "無題",
        tags: tags,
        content: content,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const db = getDb();
    const collection = db.collection("commonMemos");

    try {
        if (currentMemoId) {
            await collection.doc(currentMemoId).update(data);
        } else {
            // 新規作成時のオーダー設定
            const snap = await collection.where("uid", "==", state.currentUser.uid).get();
            data.order = snap.size;
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await collection.add(data);
        }
        closeMemoEditor();
    } catch (error) {
        console.error('[MemoEditor] 保存エラー:', error);
        alert('保存に失敗しました。');
    }
}

/**
 * 削除処理
 */
export async function deleteMemo(id) {
    if (!confirm("このメモを削除しますか？")) return;

    const db = getDb();
    try {
        await db.collection("commonMemos").doc(id).delete();
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
    const collection = db.collection("commonMemos");

    try {
        const snap = await collection.where("uid", "==", state.currentUser.uid).orderBy("order", "asc").get();
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

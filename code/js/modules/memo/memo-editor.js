import { getDb } from '../../core/firebase.js';
import { getState } from '../../core/state.js';
import { escapeHtml, autoResizeTextarea } from '../../utils/dom-utils.js';
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

let currentMemoId = null;

/**
 * メモエディタの初期化
 */
export function initMemoEditor() {
    // グローバルブリッジ
    window.plotter_openMemoEditor = openMemoEditor;
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
    if (backBtn) backBtn.addEventListener('click', closeMemoEditor);

    const contentInput = document.getElementById('memo-content');
    if (contentInput) {
        contentInput.addEventListener('input', (e) => autoResizeTextarea(e.target));
    }
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
        const state = getState();
        const db = getDb();
        const memoRef = doc(db, "works", state.selectedWorkId, "memos", id);
        const docSnap = await getDoc(memoRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            titleInput.value = data.title || "";
            tagsInput.value = (data.tags || []).join(', ');
            contentInput.value = data.content || "";
            setTimeout(() => autoResizeTextarea(contentInput), 0);
        }
    } else {
        titleInput.value = "";
        tagsInput.value = "";
        contentInput.value = "";
        autoResizeTextarea(contentInput);
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
    if (!state.currentUser || !state.selectedWorkId) return;

    const title = document.getElementById('memo-title').value.trim();
    const tags = document.getElementById('memo-tags').value.split(',').map(t => t.trim()).filter(t => t);
    const content = document.getElementById('memo-content').value;

    if (!title) return;

    const data = {
        uid: state.currentUser.uid,
        title: title || "無題",
        tags: tags,
        content: content,
        updatedAt: serverTimestamp()
    };

    const db = getDb();
    const memosRef = collection(db, "works", state.selectedWorkId, "memos");

    try {
        if (currentMemoId) {
            const memoRef = doc(db, "works", state.selectedWorkId, "memos", currentMemoId);
            await updateDoc(memoRef, data);
        } else {
            const q = query(memosRef);
            const snap = await getDocs(q);
            data.order = snap.size;
            data.createdAt = serverTimestamp();
            await addDoc(memosRef, data);
        }
        // 保存後は一覧に戻る
        closeMemoEditor();
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
        const memoRef = doc(db, "works", state.selectedWorkId, "memos", id);
        await deleteDoc(memoRef);
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
    const memosRef = collection(db, "works", state.selectedWorkId, "memos");

    try {
        const q = query(memosRef, orderBy("order", "asc"));
        const snap = await getDocs(q);
        const memos = [];
        snap.forEach(docSnap => memos.push({ id: docSnap.id, ...docSnap.data() }));

        const idx = memos.findIndex(m => m.id === id);
        if (idx === -1) return;
        const targetIdx = idx + dir;
        if (targetIdx < 0 || targetIdx >= memos.length) return;

        const other = memos[targetIdx];
        const batch = writeBatch(db);
        const currentRef = doc(db, "works", state.selectedWorkId, "memos", id);
        const otherRef = doc(db, "works", state.selectedWorkId, "memos", other.id);

        batch.update(currentRef, { order: targetIdx });
        batch.update(otherRef, { order: idx });
        await batch.commit();
    } catch (error) {
        console.error('[MemoEditor] 並び替えエラー:', error);
    }
}

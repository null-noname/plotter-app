/**
 * work-editor.js - 作品情報の作成・編集ロジック
 */

import { getDb, getAuth } from '../../core/firebase.js';
import { getState, setState, subscribe } from '../../core/state.js';
import { escapeHtml } from '../../utils/dom-utils.js';

let currentEditingId = null;

/**
 * 作品エディタの初期化
 */
export function initWorkEditor() {
    const saveBtn = document.getElementById('work-editor-save');
    const backBtn = document.getElementById('work-editor-back');
    const catchInput = document.getElementById('work-f-catchphrase');

    if (saveBtn) {
        saveBtn.addEventListener('click', saveWorkInfo);
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            toggleWorkEditor(false);
        });
    }

    if (catchInput) {
        catchInput.addEventListener('input', updateCatchCount);
    }
}

/**
 * エディタを開く（workIdがあれば編集、なければ新規）
 */
export async function openWorkEditor(workId = null) {
    currentEditingId = workId;
    resetForm();

    const titleDisp = document.getElementById('work-editor-title-disp');
    if (titleDisp) {
        titleDisp.textContent = workId ? '作品情報の編集' : '新規作品の作成';
    }

    if (workId) {
        // 既存データの読み込み
        const db = getDb();
        try {
            const doc = await db.collection("works").doc(workId).get();
            if (doc.exists) {
                populateForm(doc.data());
            }
        } catch (error) {
            console.error('[WorkEditor] データ読み込み失敗:', error);
            alert('データの読み込みに失敗しました。');
            return;
        }
    }

    toggleWorkEditor(true);
}

/**
 * フォームの表示・非表示を切り替え
 */
export function toggleWorkEditor(show) {
    const listView = document.getElementById('work-list-view');
    const editView = document.getElementById('work-editor-view');

    if (listView && editView) {
        listView.style.display = show ? 'none' : 'block';
        editView.style.display = show ? 'block' : 'none';
    }
}

/**
 * フォームの値をリセット
 */
function resetForm() {
    document.getElementById('work-f-title').value = '';
    document.getElementById('work-f-catchphrase').value = '';
    document.getElementById('work-f-description').value = '';

    // ラジオボタンのリセット
    setRadioValue('work-length', 'long');
    setRadioValue('work-type', 'original');
    setRadioValue('work-status', 'in-progress');
    setRadioValue('work-ai', 'none');

    // チェックボックスのリセット
    const checkboxes = document.querySelectorAll('input[name="work-rating"]');
    checkboxes.forEach(cb => cb.checked = false);

    updateCatchCount();
}

/**
 * 既存データをフォームに反映
 */
function populateForm(data) {
    document.getElementById('work-f-title').value = data.title || '';
    document.getElementById('work-f-catchphrase').value = data.catchphrase || '';
    document.getElementById('work-f-description').value = data.description || '';

    setRadioValue('work-length', data.length || 'long');
    setRadioValue('work-type', data.type || 'original');
    setRadioValue('work-status', data.status || 'in-progress');
    setRadioValue('work-ai', data.ai || 'none');

    const ratings = data.rating || [];
    const checkboxes = document.querySelectorAll('input[name="work-rating"]');
    checkboxes.forEach(cb => {
        cb.checked = ratings.includes(cb.value);
    });

    updateCatchCount();
}

/**
 * 入力内容を保存
 */
async function saveWorkInfo() {
    const title = document.getElementById('work-f-title').value.trim();
    if (!title) {
        alert('タイトルを入力してください。');
        return;
    }

    const auth = getAuth();
    if (!auth.currentUser) return;

    const data = {
        title: title,
        catchphrase: document.getElementById('work-f-catchphrase').value.trim(),
        description: document.getElementById('work-f-description').value.trim(),
        length: getRadioValue('work-length'),
        type: getRadioValue('work-type'),
        status: getRadioValue('work-status'),
        ai: getRadioValue('work-ai'),
        rating: Array.from(document.querySelectorAll('input[name="work-rating"]:checked')).map(cb => cb.value),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const db = getDb();
    try {
        if (currentEditingId) {
            // 更新
            await db.collection("works").doc(currentEditingId).update(data);
            alert('保存しました。');
            toggleWorkEditor(false);
        } else {
            // 新規作成
            data.uid = auth.currentUser.uid;
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            data.pinned = false;

            const docRef = await db.collection("works").add(data);
            alert('作品を作成しました！');

            // 新規作成時はその作品を選択し、プロットタブへ移動
            setState({
                selectedWorkId: docRef.id,
                currentTab: 'plot'
            });
            // 編集画面を閉じておく（次にTOPを開いた時に一覧が出るように）
            toggleWorkEditor(false);
        }
    } catch (error) {
        console.error('[WorkEditor] 保存失敗:', error);
        alert('保存に失敗しました。');
    }
}

/**
 * キャッチコピーの文字数カウント更新
 */
function updateCatchCount() {
    const input = document.getElementById('work-f-catchphrase');
    const disp = document.getElementById('work-f-catch-count');
    if (input && disp) {
        const remaining = 35 - input.value.length;
        disp.textContent = `残${remaining}字`;
    }
}

// ヘルパー: ラジオボタンの値を取得
function getRadioValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
}

// ヘルパー: ラジオボタンの値を設定
function setRadioValue(name, value) {
    const el = document.querySelector(`input[name="${name}"][value="${value}"]`);
    if (el) el.checked = true;
}

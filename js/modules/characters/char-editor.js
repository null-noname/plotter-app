/**
 * char-editor.js - 登場人物の編集・保存・操作の管理
 */

import { getDb, getStorage, getAuth } from '../../core/firebase.js';
import { getState } from '../../core/state.js';

let currentCharId = null;
let pendingIconFile = null;

/**
 * 登場人物エディタの初期化
 */
export function initCharEditor() {
    // グローバルブリッジの登録
    window.plotter_openCharEditor = openCharEditor;
    window.plotter_deleteChar = deleteChar;
    window.plotter_moveChar = moveChar;

    // イベントリスナーの登録
    const saveBtn = document.getElementById('char-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', saveCharacter);

    const backBtn = document.getElementById('char-edit-back');
    if (backBtn) backBtn.addEventListener('click', closeCharEditor);

    const iconInput = document.getElementById('char-icon-input');
    if (iconInput) iconInput.addEventListener('change', onIconFileChange);

    const changeIconBtn = document.getElementById('char-icon-change-btn');
    if (changeIconBtn && iconInput) {
        changeIconBtn.addEventListener('click', () => iconInput.click());
    }

    const addItemBtn = document.getElementById('char-item-add-btn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => addCharCustomItem());
    }
}

/**
 * エディタを開く
 */
export async function openCharEditor(id = null) {
    const state = getState();
    if (!state.selectedWorkId) {
        alert("作品を選択してください");
        return;
    }

    currentCharId = id;
    pendingIconFile = null;
    document.getElementById('char-list-view').style.display = 'none';
    document.getElementById('char-edit-view').style.display = 'block';

    resetFields();

    if (id) {
        const db = getDb();
        const doc = await db.collection("works").doc(state.selectedWorkId)
            .collection("characters").doc(id).get();

        if (doc.exists) {
            const data = doc.data();
            fillFields(data);
        }
    }
}

function resetFields() {
    const fields = ['char-name', 'char-ruby', 'char-alias', 'char-age', 'char-birth', 'char-role', 'char-height', 'char-looks', 'char-skill', 'char-history'];
    fields.forEach(f => document.getElementById(f).value = "");
    document.getElementById('char-custom-items').innerHTML = "";
    document.getElementById('char-icon-preview').innerHTML = '<span style="color:#444;">No Image</span>';
    document.getElementById('char-icon-input').value = "";
}

function fillFields(data) {
    document.getElementById('char-name').value = data.name || "";
    document.getElementById('char-ruby').value = data.ruby || "";
    document.getElementById('char-alias').value = data.alias || "";
    document.getElementById('char-age').value = data.age || "";
    document.getElementById('char-birth').value = data.birth || "";
    document.getElementById('char-role').value = data.role || "";
    document.getElementById('char-height').value = data.height || "";
    document.getElementById('char-looks').value = data.looks || "";
    document.getElementById('char-skill').value = data.skill || "";
    document.getElementById('char-history').value = data.history || "";

    if (data.iconUrl) {
        document.getElementById('char-icon-preview').innerHTML = `<img src="${data.iconUrl}" style="width:100%; height:100%; object-fit:cover;">`;
    }

    (data.customItems || []).forEach(item => addCharCustomItem(item.label, item.value));
}

/**
 * アイコン画像選択時のプレビュー
 */
function onIconFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    pendingIconFile = file;
    const reader = new FileReader();
    reader.onload = (re) => {
        document.getElementById('char-icon-preview').innerHTML = `<img src="${re.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
    };
    reader.readAsDataURL(file);
}

/**
 * カスタム項目の追加
 */
export function addCharCustomItem(label = "", value = "") {
    const container = document.getElementById('char-custom-items');
    const div = document.createElement('div');
    div.className = 'char-memo-item';
    div.style.marginBottom = '12px';
    div.innerHTML = `
        <input type="text" class="custom-label" value="${label}" placeholder="項目名" style="width:100%; font-size:0.75rem; color:var(--clr-save); background:transparent; border:none; border-bottom:1px solid #333; margin-bottom:4px;">
        <textarea class="custom-value" style="width:100%; height:60px; padding:8px; background:#111; border:1px solid #444; color:#fff; resize:none;">${value}</textarea>
    `;
    container.appendChild(div);
}

/**
 * 保存処理
 */
export async function saveCharacter() {
    const state = getState();
    if (!state.selectedWorkId) return;

    let iconUrl = null;
    if (pendingIconFile) {
        const storage = getStorage();
        const path = `characters/${state.currentUser.uid}/${Date.now()}_${pendingIconFile.name}`;
        const ref = storage.ref().child(path);
        await ref.put(pendingIconFile);
        iconUrl = await ref.getDownloadURL();
    } else if (currentCharId) {
        // 保存済みのURLを維持
        const db = getDb();
        const doc = await db.collection("works").doc(state.selectedWorkId)
            .collection("characters").doc(currentCharId).get();
        if (doc.exists) iconUrl = doc.data().iconUrl;
    }

    const customItems = [];
    document.querySelectorAll('#char-custom-items .char-memo-item').forEach(div => {
        customItems.push({
            label: div.querySelector('.custom-label').value,
            value: div.querySelector('.custom-value').value
        });
    });

    const data = {
        name: document.getElementById('char-name').value.trim() || "名称未定",
        ruby: document.getElementById('char-ruby').value,
        alias: document.getElementById('char-alias').value,
        age: document.getElementById('char-age').value,
        birth: document.getElementById('char-birth').value,
        role: document.getElementById('char-role').value,
        height: document.getElementById('char-height').value,
        looks: document.getElementById('char-looks').value,
        skill: document.getElementById('char-skill').value,
        history: document.getElementById('char-history').value,
        iconUrl: iconUrl,
        customItems: customItems,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const db = getDb();
    const ref = db.collection("works").doc(state.selectedWorkId).collection("characters");

    try {
        if (currentCharId) {
            await ref.doc(currentCharId).update(data);
        } else {
            const snap = await ref.get();
            data.order = snap.size;
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await ref.add(data);
        }
        closeCharEditor();
    } catch (error) {
        console.error('[CharEditor] 保存エラー:', error);
        alert('保存に失敗しました。');
    }
}

export function closeCharEditor() {
    document.getElementById('char-list-view').style.display = 'block';
    document.getElementById('char-edit-view').style.display = 'none';
}

/**
 * 削除処理
 */
export async function deleteChar(id) {
    if (!confirm("このキャラクターを削除しますか？")) return;

    const state = getState();
    const db = getDb();
    try {
        await db.collection("works").doc(state.selectedWorkId)
            .collection("characters").doc(id).delete();
    } catch (error) {
        console.error('[CharEditor] 削除エラー:', error);
    }
}

/**
 * 並び替え処理
 */
export async function moveChar(id, dir) {
    const state = getState();
    const db = getDb();
    const ref = db.collection("works").doc(state.selectedWorkId).collection("characters");

    try {
        const snap = await ref.orderBy("order", "asc").get();
        const chars = [];
        snap.forEach(doc => chars.push({ id: doc.id, ...doc.data() }));

        const idx = chars.findIndex(p => p.id === id);
        if (idx === -1) return;
        const targetIdx = idx + dir;
        if (targetIdx < 0 || targetIdx >= chars.length) return;

        const other = chars[targetIdx];
        const batch = db.batch();
        batch.update(ref.doc(id), { order: targetIdx });
        batch.update(ref.doc(other.id), { order: idx });
        await batch.commit();
    } catch (error) {
        console.error('[CharEditor] 並び替えエラー:', error);
    }
}

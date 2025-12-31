/**
 * char-editor.js - 登場人物の編集・保存・操作の管理
 */

import { getDb, getAuth } from '../../core/firebase.js';
import { getState } from '../../core/state.js';
import { escapeHtml, resizeImageToBase64 } from '../../utils/dom-utils.js';

let currentCharId = null;
let pendingIconFile = null;
let currentIconUrl = null;

/**
 * 登場人物エディタの初期化
 */
export function initCharEditor() {
    console.log('[CharEditor] 初期化開始...');
    // グローバルブリッジの登録
    window.plotter_openCharEditor = openCharEditor;
    window.plotter_openCharView = openCharView;
    window.plotter_deleteChar = deleteChar;
    window.plotter_moveChar = moveChar;

    // イベントリスナーの登録
    const saveBtn = document.getElementById('char-save-btn');
    if (saveBtn) {
        console.log('[CharEditor] 保存ボタンを検出。イベントを登録します。');
        saveBtn.addEventListener('click', saveCharacter);
    } else {
        console.warn('[CharEditor] 保存ボタン (char-save-btn) が見つかりません。');
    }

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

    // 閲覧モード用ボタン
    const viewBackBtn = document.getElementById('char-view-back');
    if (viewBackBtn) viewBackBtn.addEventListener('click', closeCharEditor);

    const viewEditBtn = document.getElementById('char-view-edit-btn');
    if (viewEditBtn) viewEditBtn.addEventListener('click', () => openCharEditor(currentCharId));
}

/**
 * 閲覧モードを開く
 */
export async function openCharView(id) {
    const state = getState();
    if (!state.selectedWorkId) return;

    currentCharId = id;
    document.getElementById('char-list-view').style.display = 'none';
    document.getElementById('char-view-view').style.display = 'block';
    document.getElementById('char-edit-view').style.display = 'none';

    const db = getDb();
    const doc = await db.collection("works").doc(state.selectedWorkId)
        .collection("characters").doc(id).get();

    if (!doc.exists) return;
    const data = doc.data();
    currentIconUrl = data.iconUrl;

    // データの流し込み
    const iconContainer = document.getElementById('char-view-icon');
    iconContainer.innerHTML = data.iconUrl ? `<img src="${data.iconUrl}" style="width:100%; height:100%; object-fit:cover;">` : '<span style="color:#444;">No Image</span>';

    // 名前（名字と名前の分離に対応）
    const lastName = data.lastName || data.name || "名称未定";
    const firstName = data.firstName || "";
    const lastNameRuby = data.lastNameRuby || data.ruby || "";
    const firstNameRuby = data.firstNameRuby || "";

    document.getElementById('char-view-last-name').textContent = lastName;
    document.getElementById('char-view-first-name').textContent = firstName;
    document.getElementById('char-view-last-ruby').textContent = lastNameRuby;
    document.getElementById('char-view-first-ruby').textContent = firstNameRuby;

    document.getElementById('char-view-alias').textContent = data.alias || "";
    document.getElementById('char-view-birth').textContent = data.birth || "";
    document.getElementById('char-view-age').textContent = data.age || "";
    document.getElementById('char-view-role').textContent = data.role || "";
    document.getElementById('char-view-height').textContent = data.height || "";

    // メモ表示 (見た目・性格、特技、生い立ちなど)
    const memosContainer = document.getElementById('char-view-memos');
    const memoItems = [
        { label: "見た目・性格", value: data.looks },
        { label: "特技", value: data.skill },
        { label: "生い立ち", value: data.history }
    ];

    // カスタム項目も統合
    (data.customItems || []).forEach(ci => memoItems.push({ label: ci.label, value: ci.value }));

    memosContainer.innerHTML = memoItems
        .filter(m => m.value)
        .map(m => `
            <div>
                <label class="gold-bold" style="font-size:0.8rem; display:block; margin-bottom:5px;">${m.label}</label>
                <div style="color:#ddd; white-space:pre-wrap; line-height:1.6; padding-left:10px; border-left:2px solid #444;">${escapeHtml(m.value)}</div>
            </div>
        `).join('');
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
    document.getElementById('char-view-view').style.display = 'none';
    document.getElementById('char-edit-view').style.display = 'block';

    resetFields();

    if (id) {
        const db = getDb();
        const doc = await db.collection("works").doc(state.selectedWorkId)
            .collection("characters").doc(id).get();

        if (doc.exists) {
            const data = doc.data();
            currentIconUrl = data.iconUrl;
            fillFields(data);
        } else {
            currentIconUrl = null;
        }
    } else {
        currentIconUrl = null;
    }
}

function resetFields() {
    const fields = [
        'char-last-name', 'char-first-name', 'char-last-ruby', 'char-first-ruby',
        'char-alias', 'char-age', 'char-birth', 'char-role', 'char-height',
        'char-looks', 'char-skill', 'char-history'
    ];
    fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = "";
    });
    document.getElementById('char-custom-items').innerHTML = "";
    document.getElementById('char-icon-preview').innerHTML = '<span style="color:#444;">No Image</span>';
    document.getElementById('char-icon-input').value = "";
}

function fillFields(data) {
    // 名字・名前の分離対応
    document.getElementById('char-last-name').value = data.lastName || data.name || "";
    document.getElementById('char-first-name').value = data.firstName || "";
    document.getElementById('char-last-ruby').value = data.lastNameRuby || data.ruby || "";
    document.getElementById('char-first-ruby').value = data.firstNameRuby || "";

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
    div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #333; margin-bottom:4px;">
            <input type="text" class="custom-label gold-bold" value="${label}" placeholder="項目名" style="flex:1; font-size:0.75rem; color:#fff; background:transparent; border:none; padding:4px 0; font-weight:bold;">
            <button class="btn-delete-item" style="background:transparent; color:var(--clr-delete); border:none; cursor:pointer; font-size:0.8rem; padding:4px;">✕削除</button>
        </div>
        <textarea class="custom-value" style="width:100%; height:60px; padding:8px; background:#111; border:1px solid #444; color:#fff; resize:none;">${value}</textarea>
    `;

    // 削除ボタンのイベント
    div.querySelector('.btn-delete-item').addEventListener('click', () => {
        if (confirm("この項目を削除しますか？")) {
            div.remove();
        }
    });

    container.appendChild(div);
}

/**
 * 保存処理
 */
export async function saveCharacter() {
    console.log('[CharEditor] 保存開始...');
    const state = getState();
    if (!state.selectedWorkId) {
        console.warn('[CharEditor] 作品IDがありません');
        return;
    }

    try {
        let iconUrl = currentIconUrl;

        // Base64方式に変更: 画像がある場合はリサイズしてデータURLを取得
        if (pendingIconFile) {
            console.log('[CharEditor] 画像変換開始:', pendingIconFile.name);
            try {
                // 300x300以内、jpeg品質0.7に変換して容量を削減
                iconUrl = await resizeImageToBase64(pendingIconFile, 300, 300, 0.7);
                console.log('[CharEditor] 画像変換完了 (Base64形式)');
            } catch (err) {
                console.error('[CharEditor] 画像変換失敗:', err);
                const msg = "画像の変換に失敗しました。画像なしでテキスト情報のみ保存しますか？";
                if (!confirm(msg)) return;
            }
        }

        const customItems = [];
        document.querySelectorAll('#char-custom-items .char-memo-item').forEach(div => {
            const labelEl = div.querySelector('.custom-label');
            const valueEl = div.querySelector('.custom-value');
            if (labelEl && valueEl) {
                customItems.push({
                    label: labelEl.value,
                    value: valueEl.value
                });
            }
        });

        const getVal = (id) => {
            const el = document.getElementById(id);
            return el ? el.value : "";
        };

        const fb = window.firebase || firebase;
        if (!fb) throw new Error('Firebase SDK not found');

        const data = {
            lastName: getVal('char-last-name').trim() || "(名字未入力)",
            firstName: getVal('char-first-name').trim(),
            lastNameRuby: getVal('char-last-ruby').trim(),
            firstNameRuby: getVal('char-first-ruby').trim(),
            alias: getVal('char-alias'),
            age: getVal('char-age'),
            birth: getVal('char-birth'),
            role: getVal('char-role'),
            height: getVal('char-height'),
            looks: getVal('char-looks'),
            skill: getVal('char-skill'),
            history: getVal('char-history'),
            iconUrl: iconUrl,
            customItems: customItems,
            updatedAt: fb.firestore.FieldValue.serverTimestamp()
        };

        console.log('[CharEditor] 保存データ詳細:', JSON.parse(JSON.stringify(data)));

        const db = getDb();
        const ref = db.collection("works").doc(state.selectedWorkId).collection("characters");

        if (currentCharId) {
            await ref.doc(currentCharId).update(data);
        } else {
            const snap = await ref.get();
            data.order = snap.size;
            data.createdAt = fb.firestore.FieldValue.serverTimestamp();
            const newDoc = await ref.add(data);
            currentCharId = newDoc.id;
        }

        console.log('[CharEditor] 保存成功:', currentCharId);
        openCharView(currentCharId);
    } catch (error) {
        console.error('[CharEditor] 保存エラー:', error);
        alert('保存に失敗しました。エラー内容はコンソールを確認してください。');
    }
}

export function closeCharEditor() {
    document.getElementById('char-list-view').style.display = 'block';
    document.getElementById('char-view-view').style.display = 'none';
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

/**
 * work-editor.js - 作品情報の作成・編集ロジック
 */

import { getDb, getAuth } from '../../core/firebase.js';
import { getState, setState, subscribe } from '../../core/state.js';
import { escapeHtml } from '../../utils/dom-utils.js';

let currentEditingId = null;
let renderedWorkId = null; // タブに現在描画されている作品ID

/**
 * 作品エディタの初期化
 */
export function initWorkEditor() {
    const newSaveBtn = document.getElementById('work-new-save');
    const tabSaveBtn = document.getElementById('work-info-save');
    const newBackBtn = document.getElementById('work-new-back');

    if (newSaveBtn) newSaveBtn.addEventListener('click', () => saveWorkInfo(true));
    if (tabSaveBtn) tabSaveBtn.addEventListener('click', () => saveWorkInfo(false));

    if (newBackBtn) {
        newBackBtn.addEventListener('click', () => {
            document.getElementById('work-new-view').style.display = 'none';
            document.getElementById('work-list-view').style.display = 'block';
        });
    }

    // 状態監視：作品情報タブが開かれたらフォームを描画
    subscribe((state) => {
        if (state.currentTab === 'work-info' && state.selectedWorkId) {
            if (renderedWorkId !== state.selectedWorkId) {
                renderWorkInfoTab(state.selectedWorkId);
            }
        } else if (state.currentTab === 'top') {
            renderedWorkId = null; // TOPに戻ったらリセット
        }
    });
}

/**
 * 新規作成画面を開く
 */
export function openNewWorkEditor() {
    const list = document.getElementById('work-list-view');
    const nv = document.getElementById('work-new-view');
    const container = document.getElementById('work-form-container-new');

    if (!list || !nv || !container) return;

    currentEditingId = null;
    container.innerHTML = generateFormHtml('new');

    // イベント付与（キャッチカウント）
    const catchInput = container.querySelector('#new-f-catchphrase');
    if (catchInput) catchInput.addEventListener('input', (e) => updateCatchCount(e.target, container.querySelector('#new-f-catch-count')));

    list.style.display = 'none';
    nv.style.display = 'block';

    resetForm(container, 'new');
    updateCatchCount(catchInput, container.querySelector('#new-f-catch-count'));
}

/**
 * 作品情報タブの内容を描画
 */
async function renderWorkInfoTab(workId) {
    const container = document.getElementById('work-form-container-info');
    if (!container) return;

    currentEditingId = workId;
    renderedWorkId = workId;
    container.innerHTML = generateFormHtml('info');

    // キャッチカウントのイベント
    const catchInput = container.querySelector('#info-f-catchphrase');
    if (catchInput) catchInput.addEventListener('input', (e) => updateCatchCount(e.target, container.querySelector('#info-f-catch-count')));

    // データ読み込み
    const db = getDb();
    try {
        const doc = await db.collection("works").doc(workId).get();
        if (doc.exists) {
            populateForm(container, 'info', doc.data());
        }
    } catch (error) {
        console.error('[WorkEditor] 読み込み失敗:', error);
    }
}

/**
 * フォームHTMLの生成
 */
function generateFormHtml(p) {
    return `
        <div class="card-retro">
            <div class="form-group mb-20">
                <label class="gold-bold">作品タイトル</label>
                <input type="text" id="${p}-f-title" placeholder="タイトルを入力..." style="width:100%; padding:10px; background:#111; border:1px solid #444; color:#fff; font-size:1.2rem;">
            </div>

            <div class="form-group mb-20">
                <div style="display:flex; justify-content:space-between;">
                    <label class="gold-bold">キャッチコピー（残35字）</label>
                    <span id="${p}-f-catch-count" style="font-size:0.75rem; color:#888; display:none;">残35字</span>
                </div>
                <input type="text" id="${p}-f-catchphrase" maxlength="35" placeholder="読者を惹きつける一言..." style="width:100%; padding:8px; background:#111; border:1px solid #444; color:#fff;">
            </div>

            <div class="form-group mb-20">
                <label class="gold-bold">あらすじ・概要</label>
                <textarea id="${p}-f-description" placeholder="ストーリーの概要を入力..." style="width:100%; height:120px; padding:8px; background:#111; border:1px solid #444; color:#fff; resize:none;"></textarea>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
                <div>
                    <label class="gold-bold">作品の長さ</label>
                    <div style="display:flex; gap:10px; margin-top:5px;">
                        <label><input type="radio" name="${p}-length" value="long" checked> 長編</label>
                        <label><input type="radio" name="${p}-length" value="short"> 短編</label>
                    </div>
                </div>
                <div>
                    <label class="gold-bold">作品種別</label>
                    <div style="display:flex; gap:10px; margin-top:5px;">
                        <label><input type="radio" name="${p}-type" value="original" checked> オリジナル</label>
                        <label><input type="radio" name="${p}-type" value="derivative"> 二次創作</label>
                    </div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
                <div>
                    <label class="gold-bold">執筆ステータス</label>
                    <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px;">
                        <label><input type="radio" name="${p}-status" value="in-progress" checked> 制作中</label>
                        <label><input type="radio" name="${p}-status" value="completed"> 完了</label>
                        <label><input type="radio" name="${p}-status" value="suspended"> 中断</label>
                    </div>
                </div>
                <div>
                    <label class="gold-bold">レーティング</label>
                    <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px;">
                        <label><input type="checkbox" name="${p}-rating" value="sexual"> 性描写</label>
                        <label><input type="checkbox" name="${p}-rating" value="violent"> 暴力</label>
                        <label><input type="checkbox" name="${p}-rating" value="cruel"> 残酷</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="gold-bold">AI利用状況</label>
                <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px;">
                    <label><input type="radio" name="${p}-ai" value="none" checked> なし</label>
                    <label><input type="radio" name="${p}-ai" value="assist"> 補助</label>
                    <label><input type="radio" name="${p}-ai" value="partial"> 一部</label>
                    <label><input type="radio" name="${p}-ai" value="main"> 本文</label>
                </div>
            </div>
        </div>
    `;
}

// 削除：既存の openWorkEditor, toggleWorkEditor

/**
 * フォームの値をリセット
 */
function resetForm(container, p) {
    container.querySelector(`#${p}-f-title`).value = '';
    container.querySelector(`#${p}-f-catchphrase`).value = '';
    container.querySelector(`#${p}-f-description`).value = '';

    setRadioValue(container, p, 'length', 'long');
    setRadioValue(container, p, 'type', 'original');
    setRadioValue(container, p, 'status', 'in-progress');
    setRadioValue(container, p, 'ai', 'none');

    const checkboxes = container.querySelectorAll(`input[name="${p}-rating"]`);
    checkboxes.forEach(cb => cb.checked = false);
}

/**
 * 既存データをフォームに反映
 */
function populateForm(container, p, data) {
    container.querySelector(`#${p}-f-title`).value = data.title || '';
    container.querySelector(`#${p}-f-catchphrase`).value = data.catchphrase || '';
    container.querySelector(`#${p}-f-description`).value = data.description || '';

    setRadioValue(container, p, 'length', data.length || 'long');
    setRadioValue(container, p, 'type', data.type || 'original');
    setRadioValue(container, p, 'status', data.status || 'in-progress');
    setRadioValue(container, p, 'ai', data.ai || 'none');

    const ratings = data.rating || [];
    const checkboxes = container.querySelectorAll(`input[name="${p}-rating"]`);
    checkboxes.forEach(cb => {
        cb.checked = ratings.includes(cb.value);
    });

    const catchInput = container.querySelector(`#${p}-f-catchphrase`);
    const catchCount = container.querySelector(`#${p}-f-catch-count`);
    updateCatchCount(catchInput, catchCount);
}

/**
 * 入力内容を保存
 */
async function saveWorkInfo(isNew) {
    const p = isNew ? 'new' : 'info';
    const containerId = isNew ? 'work-form-container-new' : 'work-form-container-info';
    const container = document.getElementById(containerId);
    if (!container) return;

    const title = container.querySelector(`#${p}-f-title`).value.trim();
    if (!title) {
        alert('タイトルを入力してください。');
        return;
    }

    const auth = getAuth();
    if (!auth.currentUser) return;

    const data = {
        title: title,
        catchphrase: container.querySelector(`#${p}-f-catchphrase`).value.trim(),
        description: container.querySelector(`#${p}-f-description`).value.trim(),
        length: getRadioValue(container, p, 'length'),
        type: getRadioValue(container, p, 'type'),
        status: getRadioValue(container, p, 'status'),
        ai: getRadioValue(container, p, 'ai'),
        rating: Array.from(container.querySelectorAll(`input[name="${p}-rating"]:checked`)).map(cb => cb.value),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const db = getDb();
    try {
        if (!isNew && currentEditingId) {
            // 更新
            await db.collection("works").doc(currentEditingId).update(data);
            alert('保存しました。');
        } else {
            // 新規作成
            data.uid = auth.currentUser.uid;
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            data.pinned = false;

            const docRef = await db.collection("works").add(data);
            alert('作品を作成しました！');

            // リスト表示に戻し、プロットへ移動
            document.getElementById('work-new-view').style.display = 'none';
            document.getElementById('work-list-view').style.display = 'block';

            setState({
                selectedWorkId: docRef.id,
                currentTab: 'plot'
            });
        }
    } catch (error) {
        console.error('[WorkEditor] 保存失敗:', error);
        alert('保存に失敗しました。');
    }
}

/**
 * キャッチコピーの文字数カウント更新
 */
function updateCatchCount(input, disp) {
    if (input && disp) {
        const remaining = 35 - input.value.length;
        disp.textContent = `残${remaining}字`;
    }
}

// ヘルパー: ラジオボタンの値を取得
function getRadioValue(container, p, name) {
    const checked = container.querySelector(`input[name="${p}-${name}"]:checked`);
    return checked ? checked.value : null;
}

// ヘルパー: ラジオボタンの値を設定
function setRadioValue(container, p, name, value) {
    const el = container.querySelector(`input[name="${p}-${name}"][value="${value}"]`);
    if (el) el.checked = true;
}

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
    const newBackBtn = document.getElementById('work-new-back');
    if (newBackBtn) {
        newBackBtn.addEventListener('click', () => {
            document.getElementById('work-new-view').style.display = 'none';
            document.getElementById('work-list-view').style.display = 'block';
        });
    }

    // 編集・キャンセルボタンのイベント (作品情報タブ用)
    const editBtn = document.getElementById('work-view-edit-btn');
    if (editBtn) editBtn.addEventListener('click', () => {
        document.getElementById('work-view-view').style.display = 'none';
        document.getElementById('work-edit-view').style.display = 'block';
    });

    const backBtn = document.getElementById('work-edit-back');
    if (backBtn) backBtn.addEventListener('click', () => {
        document.getElementById('work-view-view').style.display = 'block';
        document.getElementById('work-edit-view').style.display = 'none';
    });

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

    // イベント付与
    const saveBtn = container.querySelector('#new-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', () => saveWorkInfo(true));

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
    const container = document.getElementById('work-view-container');
    const formContainer = document.getElementById('work-form-container-info');
    if (!container || !formContainer) return;

    currentEditingId = workId;
    renderedWorkId = workId;

    // 初期状態：閲覧モードを表示
    document.getElementById('work-view-view').style.display = 'block';
    document.getElementById('work-edit-view').style.display = 'none';

    // フォームも裏で生成しておく
    formContainer.innerHTML = generateFormHtml('info');
    const saveBtn = formContainer.querySelector('#info-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', () => saveWorkInfo(false));

    const catchInput = formContainer.querySelector('#info-f-catchphrase');
    if (catchInput) catchInput.addEventListener('input', (e) => updateCatchCount(e.target, formContainer.querySelector('#info-f-catch-count')));

    // 認証待ち
    const auth = getAuth();
    if (!auth.currentUser) {
        let retryCount = 0;
        while (!auth.currentUser && retryCount < 10) {
            await new Promise(resolve => setTimeout(resolve, 500));
            retryCount++;
        }
    }

    if (!auth.currentUser) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--clr-delete);">認証エラーが発生しました。</div>';
        return;
    }

    // データ読み込み
    const db = getDb();
    try {
        const doc = await db.collection("works").doc(workId).get();
        if (doc.exists) {
            const data = doc.data();
            renderWorkView(container, data);
            populateForm(formContainer, 'info', data);
        } else {
            container.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">作品が見つかりませんでした。</div>';
        }
    } catch (error) {
        console.error('[WorkEditor] 読み込み失敗:', error);
        container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--clr-delete);">データの読み込みに失敗しました。</div>';
    }
}

/**
 * 閲覧モードの描画
 */
function renderWorkView(container, data) {
    const ratings = {
        sexual: "性描写",
        violent: "暴力",
        cruel: "残酷"
    };
    const activeRatings = (data.rating || []).map(r => ratings[r] || r).join('/');

    const statusLabels = {
        "in-progress": "制作中",
        "completed": "完了",
        "suspended": "中断"
    };
    const statusLabel = statusLabels[data.status] || "未設定";

    const aiLabels = {
        "none": "なし",
        "assist": "補助",
        "partial": "一部",
        "main": "本文"
    };

    container.innerHTML = `
        <div class="card-retro">
            <h3 style="color:#fff; font-size:1.6rem; margin-bottom:10px;">\${escapeHtml(data.title || "無題")}</h3>
            
            <div style="margin-bottom:15px; font-size:0.95rem; line-height:1.6; color:#ccc;">
                <div>
                    <span class="gold-bold" style="display:inline;">状態：</span>\${statusLabel}　
                    <span class="gold-bold" style="display:inline;">種別：</span>\${data.type === 'derivative' ? '二次創作' : 'オリジナル'}
                </div>
                <div>
                    <span class="gold-bold" style="display:inline;">長さ：</span>\${data.length === 'short' ? '短編' : '長編'}　
                    <span class="gold-bold" style="display:inline;">AI利用：</span>\${aiLabels[data.ai] || "なし"}
                </div>
                \${activeRatings ? `
                <div style="margin-top:2px;">
                    <span class="gold-bold" style="display:inline;">レーティング：</span>\${activeRatings}
                </div>` : ''}
            </div>

            <label class="gold-bold" style="font-size:0.8rem; opacity:0.7; margin-bottom:2px;">キャッチコピー</label>
            <div style="color:#fff; margin-bottom:15px; font-size:1.1rem;">\${escapeHtml(data.catchphrase || "（未設定）")}</div>
            
            <label class="gold-bold" style="font-size:0.8rem; opacity:0.7; margin-bottom:2px;">あらすじ</label>
            <div style="color:#fff; white-space:pre-wrap; line-height:1.7; font-size:1.1rem; margin-bottom:20px;">\${escapeHtml(data.description || "あらすじ未入力")}</div>
        </div>
    `;
}

/**
 * フォームHTMLの生成
 */
function generateFormHtml(p) {
    return `
        <div class="card-retro">
            <div class="form-group mb-20">
                <label class="gold-bold">作品タイトル</label>
                <input type="text" id="\${p}-f-title" placeholder="タイトルを入力..." style="width:100%; padding:10px; background:#111; border:1px solid #444; color:#fff; font-size:1.2rem;">
            </div>

            <div class="form-group mb-20">
                <div style="display:flex; justify-content:space-between;">
                    <label class="gold-bold">キャッチコピー（残35字）</label>
                    <span id="\${p}-f-catch-count" style="font-size:0.75rem; color:#888;">残35字</span>
                </div>
                <input type="text" id="\${p}-f-catchphrase" maxlength="35" placeholder="読者を惹きつける一言..." style="width:100%; padding:8px; background:#111; border:1px solid #444; color:#fff;">
            </div>

            <div class="form-group mb-20">
                <label class="gold-bold">あらすじ・概要</label>
                <textarea id="\${p}-f-description" placeholder="ストーリーの概要を入力..." style="width:100%; height:120px; padding:8px; background:#111; border:1px solid #444; color:#fff; resize:none;"></textarea>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
                <div>
                    <label class="gold-bold">作品の長さ</label>
                    <div style="display:flex; gap:10px; margin-top:5px;">
                        <label><input type="radio" name="\${p}-length" value="long" checked> 長編</label>
                        <label><input type="radio" name="\${p}-length" value="short"> 短編</label>
                    </div>
                </div>
                <div>
                    <label class="gold-bold">作品種別</label>
                    <div style="display:flex; gap:10px; margin-top:5px;">
                        <label><input type="radio" name="\${p}-type" value="original" checked> オリジナル</label>
                        <label><input type="radio" name="\${p}-type" value="derivative"> 二次創作</label>
                    </div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:20px;">
                <div>
                    <label class="gold-bold">執筆ステータス</label>
                    <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px;">
                        <label><input type="radio" name="\${p}-status" value="in-progress" checked> 制作中</label>
                        <label><input type="radio" name="\${p}-status" value="completed"> 完了</label>
                        <label><input type="radio" name="\${p}-status" value="suspended"> 中断</label>
                    </div>
                </div>
                <div>
                    <label class="gold-bold">レーティング</label>
                    <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px;">
                        <label><input type="checkbox" name="\${p}-rating" value="sexual"> 性描写</label>
                        <label><input type="checkbox" name="\${p}-rating" value="violent"> 暴力</label>
                        <label><input type="checkbox" name="\${p}-rating" value="cruel"> 残酷</label>
                    </div>
                </div>
            </div>

            <div class="form-group" style="margin-bottom:30px;">
                <label class="gold-bold">AI利用状況</label>
                <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:5px;">
                    <label><input type="radio" name="\${p}-ai" value="none" checked> なし</label>
                    <label><input type="radio" name="\${p}-ai" value="assist"> 補助</label>
                    <label><input type="radio" name="\${p}-ai" value="partial"> 一部</label>
                    <label><input type="radio" name="\${p}-ai" value="main"> 本文</label>
                </div>
            </div>

            <div style="text-align:center; padding:20px 0; border-top:1px solid #333;">
                <button id="\${p}-save-btn" class="btn-retro save" style="padding:10px 60px; font-size:1.1rem;">保存</button>
            </div>
        </div>
    `;
}

// 削除：既存の openWorkEditor, toggleWorkEditor

/**
 * フォームの値をリセット
 */
function resetForm(container, p) {
    container.querySelector(`#\${p}-f-title`).value = '';
    container.querySelector(`#\${p}-f-catchphrase`).value = '';
    container.querySelector(`#\${p}-f-description`).value = '';

    setRadioValue(container, p, 'length', 'long');
    setRadioValue(container, p, 'type', 'original');
    setRadioValue(container, p, 'status', 'in-progress');
    setRadioValue(container, p, 'ai', 'none');

    const checkboxes = container.querySelectorAll(`input[name="\${p}-rating"]`);
    checkboxes.forEach(cb => cb.checked = false);
}

/**
 * 既存データをフォームに反映
 */
function populateForm(container, p, data) {
    container.querySelector(`#\${p}-f-title`).value = data.title || '';
    container.querySelector(`#\${p}-f-catchphrase`).value = data.catchphrase || '';
    container.querySelector(`#\${p}-f-description`).value = data.description || '';

    setRadioValue(container, p, 'length', data.length || 'long');
    setRadioValue(container, p, 'type', data.type || 'original');
    setRadioValue(container, p, 'status', data.status || 'in-progress');
    setRadioValue(container, p, 'ai', data.ai || 'none');

    const ratings = data.rating || [];
    const checkboxes = container.querySelectorAll(`input[name="\${p}-rating"]`);
    checkboxes.forEach(cb => {
        cb.checked = ratings.includes(cb.value);
    });

    const catchInput = container.querySelector(`#\${p}-f-catchphrase`);
    const catchCount = container.querySelector(`#\${p}-f-catch-count`);
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

    const title = container.querySelector(`#\${p}-f-title`).value.trim();
    if (!title) {
        return;
    }

    const auth = getAuth();
    if (!auth.currentUser) return;

    const data = {
        title: title,
        catchphrase: container.querySelector(`#\${p}-f-catchphrase`).value.trim(),
        description: container.querySelector(`#\${p}-f-description`).value.trim(),
        length: getRadioValue(container, p, 'length'),
        type: getRadioValue(container, p, 'type'),
        status: getRadioValue(container, p, 'status'),
        ai: getRadioValue(container, p, 'ai'),
        rating: Array.from(container.querySelectorAll(`input[name="\${p}-rating"]:checked`)).map(cb => cb.value),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const db = getDb();
    try {
        if (!isNew && currentEditingId) {
            // 更新
            await db.collection("works").doc(currentEditingId).update(data);
            // 保存成功通知を削除し、閲覧モードに戻る
            renderWorkInfoTab(currentEditingId);
        } else {
            // 新規作成
            data.uid = auth.currentUser.uid;
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            data.pinned = false;

            const docRef = await db.collection("works").add(data);
            // 保存成功通知を削除

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
    }
}

/**
 * キャッチコピーの文字数カウント更新
 */
function updateCatchCount(input, disp) {
    if (input && disp) {
        const remaining = 35 - input.value.length;
        disp.textContent = `残\${remaining}字`;

        if (remaining <= 0) {
            disp.classList.add('text-error');
        } else {
            disp.classList.remove('text-error');
        }
    }
}

// ヘルパー: ラジオボタンの値を取得
function getRadioValue(container, p, name) {
    const checked = container.querySelector(`input[name="\${p}-\${name}"]:checked`);
    return checked ? checked.value : null;
}

// ヘルパー: ラジオボタンの値を設定
function setRadioValue(container, p, name, value) {
    const el = container.querySelector(`input[name="\${p}-\${name}"][value="\${value}"]`);
    if (el) el.checked = true;
}

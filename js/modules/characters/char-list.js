/**
 * char-list.js - 登場人物一覧表示の管理
 */

import { getDb } from '../../core/firebase.js';
import { getState, setState, subscribe } from '../../core/state.js';
import { escapeHtml, clearContainer } from '../../utils/dom-utils.js';

import { openCharEditor, moveChar, deleteChar } from './char-editor.js';

let unsubscribeChars = null;

/**
 * 登場人物一覧の初期化
 */
export function initCharList() {
    // 新規作成ボタン
    const newBtn = document.getElementById('char-new-btn');
    if (newBtn) newBtn.addEventListener('click', () => openCharEditor());

    // 状態を監視して、作品選択やタブが変わったら再描画
    subscribe((state) => {
        if (state.currentTab === 'characters') {
            refreshCharList(state);
        }
    });
}

/**
 * 登場人物一覧の更新（Firestoreのリアルタイム監視設定）
 */
function refreshCharList(state) {
    const container = document.getElementById('char-list-container');
    if (!container) return;

    // 前回の監視を解除
    if (unsubscribeChars) {
        unsubscribeChars();
        unsubscribeChars = null;
    }

    if (!state.selectedWorkId) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">作品を選択してください</div>';
        return;
    }

    const db = getDb();
    unsubscribeChars = db.collection("works").doc(state.selectedWorkId)
        .collection("characters").orderBy("order", "asc")
        .onSnapshot(snap => {
            renderCharCards(snap, container);
        }, error => {
            console.error('[CharList] 登場人物監視エラー:', error);
        });
}

/**
 * 取得したデータを元にカードを描画
 */
function renderCharCards(snap, container) {
    clearContainer(container);

    if (snap.empty) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#666;">キャラクターが登録されていません</div>';
        return;
    }

    snap.forEach(doc => {
        const char = { id: doc.id, ...doc.data() };
        const card = createCharCard(char);
        container.appendChild(card);
    });
}

/**
 * 個別のキャラクターカード要素を作成
 */
function createCharCard(char) {
    const card = document.createElement('div');
    card.className = 'card-retro';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.gap = '12px';
    card.style.padding = '8px 12px';

    // HTML構築 (イベントは後で紐付け)
    card.innerHTML = `
        <div class="char-icon-thumb" style="width:50px; height:50px; background:#111; border:1px solid #555; overflow:hidden; display:flex; align-items:center; justify-content:center;">
            ${char.iconUrl ? `<img src="${char.iconUrl}" style="width:100%; height:100%; object-fit:cover;">` : '<span style="font-size:0.6rem; color:#444;">No thumb</span>'}
        </div>
        <div class="char-click-area" style="flex:1; cursor:pointer;">
            <div style="font-size:0.75rem; color:#888;">${escapeHtml(char.ruby || "")}</div>
            <h3 style="font-size:1.1rem; color:#fff;">${escapeHtml(char.name || "名称未定")}</h3>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="btn-sort btn-up">▲</button>
            <button class="btn-sort btn-down">▼</button>
            <button class="btn-icon btn-delete" style="background:transparent; color:var(--clr-delete); font-size:1.1rem;">🗑</button>
        </div>
    `;

    // イベントの紐付け
    card.querySelector('.char-click-area').addEventListener('click', () => {
        openCharEditor(char.id);
    });

    card.querySelector('.btn-up').addEventListener('click', () => {
        moveChar(char.id, -1);
    });

    card.querySelector('.btn-down').addEventListener('click', () => {
        moveChar(char.id, 1);
    });

    card.querySelector('.btn-delete').addEventListener('click', () => {
        deleteChar(char.id);
    });

    return card;
}

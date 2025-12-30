/**
 * view-manager.js - 画面表示とタブ切り替えの管理
 * HTMLのインラインonclickを廃止し、状態(state)に基づいて表示を制御します。
 */

import { getDb } from './firebase.js';
import { getState, setState, subscribe } from './state.js';

/**
 * ビューマネージャの初期化
 */
export function initViewManager() {
    // 状態変更を監視して画面を更新
    subscribe((state) => {
        renderScreen(state);
        renderTabs(state);
    });

    // タブボタンのイベント紐付け
    setupTabListeners();
}

/**
 * ログイン状態に応じた画面の表示・非表示
 */
function renderScreen(state) {
    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-app');

    if (state.currentUser) {
        if (loginScreen) loginScreen.style.display = 'none';
        if (mainApp) mainApp.style.display = 'block';
    } else {
        if (loginScreen) loginScreen.style.display = 'flex';
        if (mainApp) mainApp.style.display = 'none';
    }
}

/**
 * アクティブなタブの表示・非表示
 */
function renderTabs(state) {
    const tabs = ['top', 'plot', 'char', 'memo']; // 'top'タブを追加
    tabs.forEach(tab => {
        const btn = document.getElementById(`tab-btn-${tab}`);
        const content = document.getElementById(`tab-${tab}`);
        if (btn) btn.classList.toggle('active', state.currentTab === tab);
        if (content) content.classList.toggle('active', state.currentTab === tab);
    });

    // TOPタブの場合はナビゲーションを隠す
    const nav = document.querySelector('.tab-nav');
    if (nav) {
        if (state.currentTab === 'top') nav.classList.add('hidden');
        else nav.classList.remove('hidden');
    }
}

/**
 * タブボタンにクリックイベントを設定
 */
function setupTabListeners() {
    const tabs = ['top', 'plot', 'char', 'memo']; // 'top'タブを追加
    tabs.forEach(tab => {
        const btn = document.getElementById(`tab-btn-${tab}`);
        if (btn) {
            btn.addEventListener('click', () => {
                setState({ currentTab: tab });
            });
        }
    });
}

/**
 * 特定のタブに切り替える（外部モジュール用）
 */
export function switchTab(tabName) {
    setState({ currentTab: tabName });
}

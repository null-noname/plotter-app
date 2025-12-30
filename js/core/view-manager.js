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

    // TOP画面に戻るボタンのイベント
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('back-to-top')) {
            setState({ currentTab: 'top', selectedWorkId: null });
        }
    });
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
    const currentTab = state.currentTab || 'top';
    const allTabs = ['top', 'work-info', 'plot', 'characters', 'memo'];

    // コンテンツの表示・非表示
    allTabs.forEach(tabName => {
        const content = document.getElementById(`tab-${tabName}`);
        if (content) {
            content.classList.toggle('active', currentTab === tabName);
        }
    });

    // ボタンの状態更新 (ナビゲーション内にある場合)
    const tabButtons = document.querySelectorAll('.tab-nav .tab-btn');
    tabButtons.forEach(btn => {
        const btnTabName = btn.getAttribute('data-tab');
        btn.classList.toggle('active', currentTab === btnTabName);
    });

    // TOPタブの場合はナビゲーションを隠す
    const nav = document.querySelector('.tab-nav');
    if (nav) {
        if (currentTab === 'top') nav.classList.add('hidden');
        else nav.classList.remove('hidden');
    }
}

/**
 * タブボタンにクリックイベントを設定
 */
function setupTabListeners() {
    const tabButtons = document.querySelectorAll('.tab-nav .tab-btn');
    tabButtons.forEach(btn => {
        const tabName = btn.getAttribute('data-tab');
        btn.addEventListener('click', () => {
            setState({ currentTab: tabName });
        });
    });
}

/**
 * 特定のタブに切り替える（外部モジュール用）
 */
export function switchTab(tabName) {
    setState({ currentTab: tabName });
}

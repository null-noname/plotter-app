/**
 * main.js - アプリケーションの起点
 * 各モジュールの初期化とグローバルなイベントの紐付けを管理します。
 */

import { initFirebase } from './core/firebase.js';
import { initAuth } from './modules/auth.js';
import { initViewManager } from './core/view-manager.js';
import { initPlotList } from './modules/plot/plot-list.js';
import { initPlotEditor } from './modules/plot/plot-editor.js';
import { initCharList } from './modules/characters/char-list.js';
import { initCharEditor } from './modules/characters/char-editor.js';
import { initMemoList } from './modules/memo/memo-list.js';
import { initMemoEditor } from './modules/memo/memo-editor.js';
import { initDashboard } from './modules/dashboard/dashboard.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('[Main] アプリケーションの初期化を開始します...');

    try {
        // 1. Firebaseの初期化
        initFirebase();

        // 2. ビューマネージャー（タブ切り替え等）の初期化
        initViewManager();

        // 3. 認証状態の監視開始
        initAuth();

        // 4. 機能モジュールの初期化
        initPlotList();
        initPlotEditor();
        initCharList();
        initCharEditor();
        initMemoList();
        initMemoEditor();
        initDashboard();

        console.log('[Main] 初期化プロセスが完了しました。');
    } catch (error) {
        console.error('[Main] 初期化中にエラーが発生しました:', error);
    }
});

/**
 * 将来的にグローバルイベント（ボタンクリックなど）を
 * HTMLのonclickではなく、ここで一括して登録する予定です。
 */

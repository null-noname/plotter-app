/**
 * auth.js - 認証ロジックの管理
 * Googleログイン、ログアウト、認証状態の監視を担当します。
 */

import { initFirebase } from '../core/firebase.js';
import { setState } from '../core/state.js';

/**
 * 認証モジュールの初期化
 * ログインボタンのイベント設定と認証状態の監視を開始します。
 */
export function initAuth() {
    const { auth } = initFirebase();

    // ログインボタンのイベント登録
    const loginBtn = document.getElementById('google-login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }

    // ログアウトボタン（ヘッダー等）のボタンがあれば登録
    const topLogoutBtn = document.querySelector('.main-header button');
    if (topLogoutBtn) {
        topLogoutBtn.addEventListener('click', handleLogout);
    }

    // 認証状態の監視
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('[Auth] ログイン完了:', user.displayName);
            setState({ currentUser: user, isAuthReady: true });
        } else {
            console.log('[Auth] ログアウト状態');
            setState({ currentUser: null, isAuthReady: true });
        }
    });
}

/**
 * Googleログインの実行
 */
export async function handleLogin() {
    const { auth } = initFirebase();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error('[Auth] ログインエラー:', error);
    }
}

/**
 * ログアウトの実行
 */
export async function handleLogout() {
    const { auth } = initFirebase();
    try {
        await auth.signOut();
    } catch (error) {
        console.error('[Auth] ログアウトエラー:', error);
    }
}

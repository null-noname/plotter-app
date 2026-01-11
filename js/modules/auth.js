/**
 * auth.js - 認証ロジックの管理
 * Googleログイン、ログアウト、認証状態の監視を担当します。
 */

import { getAuth } from '../core/firebase.js';
import { setState } from '../core/state.js';

/**
 * 認証モジュールの初期化
 * ログインボタンのイベント設定と認証状態の監視を開始します。
 */
export function initAuth() {
    const auth = getAuth();
    const loginBtn = document.getElementById('google-login-btn');
    const logoutBtn = document.getElementById('logout-btn-legacy'); // 後で調整

    // ログインボタンのイベント登録
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }

    // ログアウトボタン（ヘッダー等）のボタンがあれば登録
    // ※現在は一旦、名前指定で取得。HTML側の構造に合わせて調整。
    const topLogoutBtn = document.querySelector('.main-header button');
    if (topLogoutBtn) {
        topLogoutBtn.addEventListener('click', handleLogout);
    }

    // 認証状態の監視
    auth.onAuthStateChanged(user => {
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
    const auth = getAuth();
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error('[Auth] ログインエラー:', error);
    }
}

/**
 * ログアウトの実行
 */
export async function handleLogout() {
    const auth = getAuth();
    try {
        await auth.signOut();
    } catch (error) {
        console.error('[Auth] ログアウトエラー:', error);
    }
}

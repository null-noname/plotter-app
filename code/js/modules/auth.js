/**
 * auth.js - 認証ロジックの管理 (Modular SDK)
 * Googleログイン、ログアウト、認証状態の監視を担当します。
 */

import { getAuth } from '../core/firebase.js';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { setState } from '../core/state.js';

/**
 * 認証モジュールの初期化
 * ログインボタンのイベント設定と認証状態の監視を開始します。
 */
export function initAuth() {
    const auth = getAuth();
    const loginBtn = document.getElementById('google-login-btn');

    // ログインボタンのイベント登録
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }

    // ログアウトボタン（ヘッダー等）のボタンがあれば登録
    const topLogoutBtn = document.querySelector('.main-header button');
    if (topLogoutBtn) {
        topLogoutBtn.addEventListener('click', handleLogout);
    }

    // 認証状態の監視 (Modular Syntax)
    onAuthStateChanged(auth, (user) => {
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
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
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
        await signOut(auth);
    } catch (error) {
        console.error('[Auth] ログアウトエラー:', error);
    }
}

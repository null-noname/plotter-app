/**
 * auth.js - 認証ロジックの管理
 * Googleログイン、ログアウト、認証状態の監視を担当します。
 */

import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initFirebase } from '../core/firebase.js';
import { setState } from '../core/state.js';

/**
 * 認証モジュールの初期化
 * ログインボタンのイベント設定と認証状態の監視を開始します。
 */
export function initAuth() {
    const { app } = initFirebase();
    const auth = getAuth(app);

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
    const { app } = initFirebase();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error('[Auth] ログインエラー:', error);
    }
}

/**
 * ログアウトの実行
 */
export async function handleLogout() {
    const { app } = initFirebase();
    const auth = getAuth(app);
    try {
        await signOut(auth);
    } catch (error) {
        console.error('[Auth] ログアウトエラー:', error);
    }
}

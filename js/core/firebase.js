/**
 * firebase.js - Firebaseの初期化とインスタンスの提供
 * グローバル変数を避け、必要な箇所でインポートして使用する形式にします。
 */

const firebaseConfig = {
    apiKey: "AIzaSyDealKaPyIcqUIujJhvsWERxGm0zSBD1jw",
    authDomain: "plotter-app-dbb21.firebaseapp.com",
    projectId: "plotter-app-dbb21",
    storageBucket: "plotter-app-dbb21.firebasestorage.app",
    messagingSenderId: "483491444496",
    appId: "1:483491444496:web:56fa556a709348339fd795"
};

// インスタンスのキャッシュ
let app = null;
let db = null;
let auth = null;
let storage = null;

/**
 * Firebaseを初期化し、DB/Authのインスタンスを用意します。
 */
export function initFirebase() {
    if (!firebase.apps.length) {
        app = firebase.initializeApp(firebaseConfig);
    } else {
        app = firebase.app();
    }
    db = firebase.firestore();
    auth = firebase.auth();
    storage = firebase.storage();

    // 永続性の設定 (ブラウザを閉じてもログインを維持)
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    console.log('[Firebase] 初期化完了');
    return { app, db, auth, storage };
}

/**
 * 各インスタンスを取得するためのゲッター
 * 初期化前に呼ばれた場合は、内部で初期化を試みます。
 */
export function getDb() {
    if (!db) initFirebase();
    return db;
}

export function getAuth() {
    if (!auth) initFirebase();
    return auth;
}

export function getStorage() {
    if (!storage) initFirebase();
    return storage;
}

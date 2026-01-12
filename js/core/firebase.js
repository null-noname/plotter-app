/**
 * firebase.js - Firebaseの初期化とインスタンスの提供
 * グローバル変数を避け、必要な箇所でインポートして使用する形式にします。
 */

const firebaseConfig = {
    apiKey: "AIzaSyDaXyH96jd-k3r1MRaDiN9KWo2oN2lpaW4",
    authDomain: "editor-app-29ca6.firebaseapp.com",
    projectId: "editor-app-29ca6",
    storageBucket: "editor-app-29ca6.firebasestorage.app",
    messagingSenderId: "666399306180",
    appId: "1:666399306180:web:619b5765655311d4a03491"
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

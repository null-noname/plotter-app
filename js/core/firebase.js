/**
 * firebase.js - Firebaseの初期化とインスタンスの提供
 * グローバル変数を避け、必要な箇所でインポートして使用する形式にします。
 */

const firebaseConfig = {
    apiKey: "AIzaSyDc5HZ1PVW7H8-Pe8PBoY_bwCMm0jd5_PU",
    authDomain: "story-builder-app.firebaseapp.com",
    projectId: "story-builder-app",
    storageBucket: "story-builder-app.firebasestorage.app",
    messagingSenderId: "763153451684",
    appId: "1:763153451684:web:37a447d4cafb4abe41f431"
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

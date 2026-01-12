/**
 * firebase.js - Firebase Initialization (Compat Mode for Migration)
 * npmパッケージの firebase/compat を使用して初期化します。
 * これにより、既存コード(v8形式)を維持したままnpm環境へ移行できます。
 */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDaXyH96jd-k3r1MRaDiN9KWo2oN2lpaW4",
    authDomain: "editor-app-29ca6.firebaseapp.com",
    projectId: "editor-app-29ca6",
    storageBucket: "editor-app-29ca6.firebasestorage.app",
    messagingSenderId: "666399306180",
    appId: "1:666399306180:web:619b5765655311d4a03491"
};

// Initialize Firebase (Singleton check)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Export initialized instances
export const app = firebase.app();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

// Persistence settings (Keep local persistence)
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

console.log('[Firebase] Initialized via npm compat');

// Getter functions for backward compatibility (optional, but keeping structure safe)
export function getDb() { return db; }
export function getAuth() { return auth; }
export function getStorage() { return storage; }


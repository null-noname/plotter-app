/**
 * firebase.js - Firebase Initialization (Hybrid)
 * Compatで初期化し、Modular SDKのインスタンスをエクスポートします。
 */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { getFirestore } from 'firebase/firestore';
import { getAuth as getAuthSDK } from 'firebase/auth';
import { getStorage as getStorageSDK } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDaXyH96jd-k3r1MRaDiN9KWo2oN2lpaW4",
    authDomain: "editor-app-29ca6.firebaseapp.com",
    projectId: "editor-app-29ca6",
    storageBucket: "editor-app-29ca6.firebasestorage.app",
    messagingSenderId: "666399306180",
    appId: "1:666399306180:web:619b5765655311d4a03491"
};

// Initialize Firebase (Compat)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Export Modular Instances
// Default app is used implicitly or we can pass firebase.app()
export const db = getFirestore();
export const auth = getAuthSDK();
export const storage = getStorageSDK();

console.log('[Firebase] Initialized via Hybrid (Compat+Modular)');

// Getter functions
export function getDb() { return db; }
// These functions are named exactly as external modules expect (getAuth)
export function getAuth() { return auth; }
export function getStorage() { return storage; }

export function initFirebase() {
    console.log('[Firebase] Explicit initialization called.');
}

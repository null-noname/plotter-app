import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth as getAuthSDK } from 'firebase/auth'; // Alias internal import
import { getStorage as getStorageSDK } from 'firebase/storage'; // Alias internal import

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

// Get the Compat App instance
const app = firebase.app();

// Export Modular Instances
export const db = getFirestore(app);
export const auth = getAuthSDK(app);
export const storage = getStorageSDK(app);

// Keep Compat exports if needed
export const appCompat = app;

console.log('[Firebase] Initialized via Hybrid (Compat+Modular)');

// Getter functions for compatibility (Keep original names)
export function getDb() { return db; }
export function getAuth() { return auth; } // Restored original name
export function getStorage() { return storage; } // Restored original name

export function initFirebase() {
    console.log('[Firebase] Explicit initialization called.');
}


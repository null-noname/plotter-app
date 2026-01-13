/**
 * Plotterアプリ専用 データベース制御 (plotter/db.js)
 * キャラクター・プロット・作品設定などの「物語構築」に関わるデータを扱います。
 * このファイルはローカル環境（plotter/）でのみ使用されます。
 */
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * CHARACTERS (キャラクター管理)
 */

export function subscribeCharacters(db, workId, callback) {
    const q = query(collection(db, "works", workId, "characters"), orderBy("name", "asc"));
    return onSnapshot(q, (snapshot) => {
        const characters = [];
        snapshot.forEach((doc) => {
            characters.push({ id: doc.id, ...doc.data() });
        });
        callback(characters);
    });
}

export async function createCharacter(db, workId, data) {
    const docRef = await addDoc(collection(db, "works", workId, "characters"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
    return docRef.id;
}

export async function updateCharacter(db, workId, characterId, data) {
    const docRef = doc(db, "works", workId, "characters", characterId);
    await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
    });
}

export async function deleteCharacter(db, workId, characterId) {
    const docRef = doc(db, "works", workId, "characters", characterId);
    await deleteDoc(docRef);
}

/**
 * WORKS (作品の基本設定 - Plotter側でも参照・更新可能にする場合)
 */
export async function updateWorkSettings(db, workId, data) {
    const docRef = doc(db, "works", workId);
    await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
    });
}

/**
 * PLOT (構成・プロット管理)
 */
// 今後の拡張：プロット、世界観設定、アイテム管理などの関数をここに追加していく

/**
 * state.js - アプリケーションの状態管理
 * 「どの作品を選択しているか」「現在のタブ」などの情報を一元管理します。
 */

// 状態の初期値
const state = {
    selectedWorkId: null,
    currentTab: localStorage.getItem('plotter_currentTab') || 'top', // localStorageから復元、デフォルトはtop
    currentUser: null,
    listeners: [] // 状態変更を監視するリスナー
};

/**
 * 状態の一部を更新し、登録されたリスナーに通知します。
 */
export function setState(newState) {
    Object.assign(state, newState);

    // タブが変更された場合はlocalStorageに保存
    if (newState.currentTab) {
        localStorage.setItem('plotter_currentTab', newState.currentTab);
    }

    console.log('[State] 更新:', newState);
    notifyListeners();
}

/**
 * 現在の状態を取得します。
 */
export function getState() {
    return { ...state };
}

/**
 * 状態変更を監視するためのリスナーを登録します。
 */
export function subscribe(callback) {
    state.listeners.push(callback);
    // 登録時に現在の状態で一度実行する（初期化用）
    callback(getState());

    // 解除用の関数を返す
    return () => {
        state.listeners = state.listeners.filter(l => l !== callback);
    };
}

/**
 * 全リスナーに現在の状態を通知します。
 */
function notifyListeners() {
    const currentState = getState();
    state.listeners.forEach(callback => callback(currentState));
}

// 便利のためのショートカット
export const getSelectedWorkId = () => state.selectedWorkId;
export const getCurrentTab = () => state.currentTab;
export const getCurrentUser = () => state.currentUser;

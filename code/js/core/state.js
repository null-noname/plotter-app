/**
 * state.js - アプリケーションの状態管理
 * 「どの作品を選択しているか」「現在のタブ」などの情報を一元管理します。
 */

// 状態の初期値
const state = {
    selectedWorkId: localStorage.getItem('plotter_selectedWorkId'), // localStorageから復元
    currentTab: localStorage.getItem('plotter_currentTab') || 'top',
    lastActiveTab: localStorage.getItem('plotter_lastActiveTab') || 'plot', // 最後に開いていた作品内タブ
    currentUser: null,
    isAuthReady: false, // 認証情報の初期確認が完了したか
    listeners: []
};

/**
 * 状態の一部を更新し、登録されたリスナーに通知します。
 */
export function setState(newState) {
    Object.assign(state, newState);

    // タブが変更された場合はlocalStorageに保存
    if (newState.currentTab) {
        localStorage.setItem('plotter_currentTab', newState.currentTab);
        // TOP以外なら「最後にアクティブだったタブ」として記憶
        if (newState.currentTab !== 'top') {
            state.lastActiveTab = newState.currentTab;
            localStorage.setItem('plotter_lastActiveTab', newState.currentTab);
        }
    }
    // 作品IDが変更された場合も保存
    if (newState.hasOwnProperty('selectedWorkId')) {
        if (state.selectedWorkId) {
            localStorage.setItem('plotter_selectedWorkId', state.selectedWorkId);
        } else {
            localStorage.removeItem('plotter_selectedWorkId');
        }
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

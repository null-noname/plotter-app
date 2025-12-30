/**
 * dom-utils.js - DOM操作や文字列処理のユーティリティ
 */

/**
 * HTML文字列をエスケープしてXSSを防止します。
 */
export function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }[m]));
}

/**
 * 要素の表示・非表示をクラスで切り替えます。
 * (※CSS側に .hidden { display: none !important; } がある前提、
 *  または直接スタイルを操作する場合のヘルパー)
 */
export function toggleVisible(selector, isVisible) {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) {
        el.style.display = isVisible ? '' : 'none';
    }
}

/**
 * 指定した要素のすべての子要素を削除します。
 */
export function clearContainer(container) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
}

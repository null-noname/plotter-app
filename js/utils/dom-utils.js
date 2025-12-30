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
 * 日付を YYYY/MM/DD (HH:mm) 形式にフォーマットします。
 */
export function formatDate(timestamp, showTime = false) {
    if (!timestamp) return '---';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    if (!showTime) return `${y}/${m}/${d}`;

    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${y}/${m}/${d} ${hh}:${mm}`;
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

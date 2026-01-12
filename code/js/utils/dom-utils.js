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

/**
 * 画像ファイルをリサイズ・圧縮してBase64形式の文字列に変換します。
 * @param {File} file 
 * @param {number} maxWidth 
 * @param {number} maxHeight 
 * @param {number} quality (0 to 1)
 * @returns {Promise<string>}
 */
export function resizeImageToBase64(file, maxWidth = 300, maxHeight = 300, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

/**
 * テキストエリアの高さを内容に合わせて自動調整します。
 */
export function autoResizeTextarea(el) {
    if (!el) return;
    el.style.height = 'auto'; // 一旦リセット
    el.style.height = el.scrollHeight + 'px';
}

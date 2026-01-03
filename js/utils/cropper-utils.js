/**
 * cropper-utils.js - 簡易的な画像切り抜き（正方形）機能
 */

export function openCropper(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                showCropperModal(img, resolve, reject);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function showCropperModal(img, resolve, reject) {
    // モーダルの作成
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); z-index: 9999;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        touch-action: none;
    `;

    const title = document.createElement('div');
    title.textContent = "枠に合わせて調整してください";
    title.style.cssText = "color: #fff; margin-bottom: 20px; font-weight: bold;";
    modal.appendChild(title);

    const container = document.createElement('div');
    container.style.cssText = `
        position: relative; width: 300px; height: 300px;
        overflow: hidden; border: 2px solid #555; background: #111;
    `;
    modal.appendChild(container);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    // 画像の初期配置
    let scale = 1.0;
    let imgW = img.width;
    let imgH = img.height;

    // 枠(300x300)に収まるように初期スケール設定
    const minScale = Math.max(300 / imgW, 300 / imgH);
    scale = minScale;

    let posX = (300 - imgW * scale) / 2;
    let posY = (300 - imgH * scale) / 2;

    const draw = () => {
        canvas.width = 300;
        canvas.height = 300;
        ctx.clearRect(0, 0, 300, 300);
        ctx.drawImage(img, posX, posY, imgW * scale, imgH * scale);
    };
    draw();

    // ドラッグ操作
    let isDragging = false;
    let lastX, lastY;

    const onStart = (e) => {
        isDragging = true;
        const pageX = e.touches ? e.touches[0].pageX : e.pageX;
        const pageY = e.touches ? e.touches[0].pageY : e.pageY;
        lastX = pageX;
        lastY = pageY;
    };

    const onMove = (e) => {
        if (!isDragging) return;
        const pageX = e.touches ? e.touches[0].pageX : e.pageX;
        const pageY = e.touches ? e.touches[0].pageY : e.pageY;
        posX += pageX - lastX;
        posY += pageY - lastY;
        lastX = pageX;
        lastY = pageY;
        draw();
    };

    const onEnd = () => {
        isDragging = false;
    };

    modal.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    modal.addEventListener('touchstart', onStart);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);

    // ボタン
    const footer = document.createElement('div');
    footer.style.cssText = "margin-top: 30px; display: flex; gap: 20px;";

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = "キャンセル";
    cancelBtn.className = "btn-retro back";
    cancelBtn.onclick = () => {
        cleanup();
        reject();
    };

    const okBtn = document.createElement('button');
    okBtn.textContent = "決定";
    okBtn.className = "btn-retro save";
    okBtn.onclick = () => {
        const result = canvas.toDataURL('image/jpeg', 0.8);
        cleanup();
        resolve(result);
    };

    footer.appendChild(cancelBtn);
    footer.appendChild(okBtn);
    modal.appendChild(footer);

    document.body.appendChild(modal);

    const cleanup = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onEnd);
        document.body.removeChild(modal);
    };
}

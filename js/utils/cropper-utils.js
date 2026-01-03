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
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.95); z-index: 9999;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        touch-action: none; font-family: sans-serif;
    `;

    const title = document.createElement('div');
    title.textContent = "枠に合わせて調整してください";
    title.style.cssText = "color: #fff; margin-bottom: 20px; font-weight: bold;";
    modal.appendChild(title);

    const container = document.createElement('div');
    container.style.cssText = `
        position: relative; width: 300px; height: 300px;
        overflow: hidden; border: 2px solid var(--clr-save); background: #000;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;
    modal.appendChild(container);

    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    // 画像の初期状態計算
    let imgW = img.width;
    let imgH = img.height;
    const baseScale = Math.max(300 / imgW, 300 / imgH); // 枠を埋める最小倍率
    let currentZoom = 1.0; // 1.0 = baseScale

    let posX = (300 - imgW * baseScale) / 2;
    let posY = (300 - imgH * baseScale) / 2;

    const draw = () => {
        const scale = baseScale * currentZoom;
        ctx.clearRect(0, 0, 300, 300);

        // 境界制限（隙間ができないように）
        const maxPosX = 0;
        const minPosX = 300 - (imgW * scale);
        const maxPosY = 0;
        const minPosY = 300 - (imgH * scale);

        posX = Math.min(maxPosX, Math.max(minPosX, posX));
        posY = Math.min(maxPosY, Math.max(minPosY, posY));

        ctx.drawImage(img, posX, posY, imgW * scale, imgH * scale);
    };
    draw();

    // ズームスライダー
    const zoomContainer = document.createElement('div');
    zoomContainer.style.cssText = "margin-top: 20px; width: 250px; display: flex; align-items: center; gap: 10px;";

    const zoomLabel = document.createElement('span');
    zoomLabel.textContent = "拡大";
    zoomLabel.style.color = "#fff";
    zoomLabel.style.fontSize = "0.8rem";

    const zoomSlider = document.createElement('input');
    zoomSlider.type = "range";
    zoomSlider.min = "1.0";
    zoomSlider.max = "3.0";
    zoomSlider.step = "0.01";
    zoomSlider.value = "1.0";
    zoomSlider.style.flex = "1";

    zoomSlider.oninput = (e) => {
        const oldZoom = currentZoom;
        currentZoom = parseFloat(e.target.value);

        // 中心を起点に拡大
        const scaleDiff = (baseScale * currentZoom) / (baseScale * oldZoom);
        posX = 150 - (150 - posX) * scaleDiff;
        posY = 150 - (150 - posY) * scaleDiff;

        draw();
    };

    zoomContainer.appendChild(zoomLabel);
    zoomContainer.appendChild(zoomSlider);
    modal.appendChild(zoomContainer);

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

    const onEnd = () => { isDragging = false; };

    container.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    container.addEventListener('touchstart', onStart);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);

    // マウスホイールでのズーム
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newZoom = Math.min(3.0, Math.max(1.0, currentZoom + delta));

        if (newZoom !== currentZoom) {
            const oldZoom = currentZoom;
            currentZoom = newZoom;
            zoomSlider.value = currentZoom;

            const scaleDiff = (baseScale * currentZoom) / (baseScale * oldZoom);
            posX = 150 - (150 - posX) * scaleDiff;
            posY = 150 - (150 - posY) * scaleDiff;

            draw();
        }
    }, { passive: false });

    // ボタン
    const footer = document.createElement('div');
    footer.style.cssText = "margin-top: 30px; display: flex; gap: 20px;";

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = "キャンセル";
    cancelBtn.className = "btn-retro back";
    cancelBtn.onclick = () => { cleanup(); reject(); };

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

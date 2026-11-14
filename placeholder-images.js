document.addEventListener('error', (e) => {
    const img = e.target;
    if (img.tagName === 'IMG' && !img.dataset.fallback) {
        img.dataset.fallback = 'true';
        img.src = './inf.png';
    }
}, true);
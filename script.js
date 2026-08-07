/**
 * CSS2Image — CSS gradient → PNG/JPG exporter
 */

const translations = {
    tr: {
        documentTitle: 'CSS2Image — CSS Gradyanı PNG/JPG Dönüştürücü',
        metaDescription: 'CSS gradyanlarını (linear, radial, conic) yüksek çözünürlüklü PNG veya JPG görsele dönüştürün. Ücretsiz, reklamsız, tarayıcıda çalışır.',
        ogDescription: 'CSS gradyanı yapıştır, çözünürlüğü seç, net PNG veya JPG indir. Ücretsiz tarayıcı aracı — kayıt yok.',
        tagline: 'CSS gradyanını yüksek çözünürlüklü PNG veya JPG olarak indir.',
        settings: 'Ayarlar',
        cssGradientCode: 'CSS Gradyan Kodu',
        cssPlaceholder: 'background: linear-gradient(90deg, #0d7a72, #1a3a4a);',
        example: 'Örnek:',
        exampleCode: 'linear-gradient(90deg, #0d7a72, #1a3a4a)',
        width: 'Genişlik (px)',
        height: 'Yükseklik (px)',
        quickSizes: 'Hızlı Boyutlar',
        outputFormat: 'Çıktı Formatı',
        transparencySupport: '(Şeffaflık desteği)',
        smallerSize: '(Daha küçük boyut)',
        downloadImage: 'Görseli İndir',
        processing: 'İşleniyor…',
        exampleGradients: 'Örnek Gradyanlar',
        livePreview: 'Canlı Önizleme',
        emptyState: 'Geçerli bir gradyan girildiğinde önizleme burada görünür.',
        tips: 'İpuçları',
        tip1: '<code>linear-gradient</code>, <code>radial-gradient</code> ve <code>conic-gradient</code> desteklenir.',
        tip2: 'Maksimum çözünürlük: 7680×4320 (8K)',
        tip3: 'PNG formatı şeffaflık için, JPG daha küçük dosya boyutu için uygundur.',
        footer: 'CSS2Image — tarayıcıda çalışan CSS gradyan dışa aktarıcı',
        previewAria: 'Gradyan önizlemesi',
        errorNoGradient: 'Geçerli bir gradyan kodu bulunamadı. linear-gradient, radial-gradient veya conic-gradient kullanın.',
        errorInvalidSyntax: 'Gradyan kodu geçersiz. Söz dizimini kontrol edin.',
        errorUnsafe: 'Güvenlik nedeniyle url() ve harici kaynak içeren değerler desteklenmiyor.',
        errorGeneral: 'Görsel oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.',
        confirmLarge: 'Bu çözünürlük cihaz belleğini zorlayabilir. Yine de devam edilsin mi?'
    },
    en: {
        documentTitle: 'CSS2Image — CSS Gradient to PNG/JPG Converter',
        metaDescription: 'Convert CSS gradients (linear, radial, conic) into high-resolution PNG or JPG images. Free, ad-free, runs in your browser — no signup.',
        ogDescription: 'Paste a CSS gradient, set resolution, download a crisp PNG or JPG. Free browser tool — no ads, no signup.',
        tagline: 'Turn a CSS gradient into a high-resolution PNG or JPG.',
        settings: 'Settings',
        cssGradientCode: 'CSS Gradient Code',
        cssPlaceholder: 'background: linear-gradient(90deg, #0d7a72, #1a3a4a);',
        example: 'Example:',
        exampleCode: 'linear-gradient(90deg, #0d7a72, #1a3a4a)',
        width: 'Width (px)',
        height: 'Height (px)',
        quickSizes: 'Quick Sizes',
        outputFormat: 'Output Format',
        transparencySupport: '(Transparency support)',
        smallerSize: '(Smaller file size)',
        downloadImage: 'Download Image',
        processing: 'Processing…',
        exampleGradients: 'Example Gradients',
        livePreview: 'Live Preview',
        emptyState: 'A live preview appears here once you enter a valid gradient.',
        tips: 'Tips',
        tip1: '<code>linear-gradient</code>, <code>radial-gradient</code>, and <code>conic-gradient</code> are supported.',
        tip2: 'Maximum resolution: 7680×4320 (8K)',
        tip3: 'Use PNG for transparency, JPG for smaller files.',
        footer: 'CSS2Image — client-side CSS gradient exporter',
        previewAria: 'Gradient preview',
        errorNoGradient: 'No valid gradient found. Use linear-gradient, radial-gradient, or conic-gradient.',
        errorInvalidSyntax: 'Invalid gradient syntax. Please check your code.',
        errorUnsafe: 'Values with url() or external resources are not supported for security reasons.',
        errorGeneral: 'An error occurred while creating the image. Please try again.',
        confirmLarge: 'This resolution may exceed device memory. Continue anyway?'
    }
};

let currentLang = 'tr';
let lastValidGradient = 'linear-gradient(135deg, #0d7a72 0%, #1a3a4a 100%)';

const GRADIENT_TYPES = [
    'linear-gradient',
    'radial-gradient',
    'conic-gradient',
    'repeating-linear-gradient',
    'repeating-radial-gradient',
    'repeating-conic-gradient'
];

const UNSAFE_PATTERN = /url\s*\(|expression\s*\(|-moz-binding|behavior\s*:|@import|javascript\s*:/i;

function t(key) {
    return translations[currentLang][key] || translations.en[key] || key;
}

function setMeta(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
}

function switchLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateUILanguage();
    updateLanguageButtons();
}

function updateLanguageButtons() {
    const trBtn = document.getElementById('langTR');
    const enBtn = document.getElementById('langEN');
    if (!trBtn || !enBtn) return;

    const trActive = currentLang === 'tr';
    trBtn.classList.toggle('is-active', trActive);
    enBtn.classList.toggle('is-active', !trActive);
    trBtn.setAttribute('aria-pressed', String(trActive));
    enBtn.setAttribute('aria-pressed', String(!trActive));
}

function updateUILanguage() {
    document.documentElement.lang = currentLang;
    document.title = t('documentTitle');

    setMeta('meta[name="description"]', 'content', t('metaDescription'));
    setMeta('meta[property="og:title"]', 'content', t('documentTitle'));
    setMeta('meta[property="og:description"]', 'content', t('ogDescription'));
    setMeta('meta[property="og:locale"]', 'content', currentLang === 'tr' ? 'tr_TR' : 'en_US');
    setMeta('meta[name="twitter:title"]', 'content', t('documentTitle'));
    setMeta('meta[name="twitter:description"]', 'content', t('ogDescription'));

    const map = {
        pageHeading: 'tagline',
        settingsTitle: 'settings',
        cssLabel: 'cssGradientCode',
        widthLabel: 'width',
        heightLabel: 'height',
        quickSizesLabel: 'quickSizes',
        outputFormatLabel: 'outputFormat',
        pngDesc: 'transparencySupport',
        jpgDesc: 'smallerSize',
        downloadBtnText: 'downloadImage',
        exampleGradientsTitle: 'exampleGradients',
        livePreviewTitle: 'livePreview',
        emptyStateText: 'emptyState',
        tipsTitle: 'tips',
        tip2: 'tip2',
        tip3: 'tip3',
        footerText: 'footer'
    };

    Object.entries(map).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = t(key);
    });

    const cssInput = document.getElementById('cssInput');
    if (cssInput) cssInput.placeholder = t('cssPlaceholder');

    const exampleText = document.getElementById('exampleText');
    if (exampleText) {
        exampleText.replaceChildren();
        exampleText.append(t('example') + ' ');
        const code = document.createElement('code');
        code.textContent = t('exampleCode');
        exampleText.append(code);
    }

    const tip1 = document.getElementById('tip1');
    if (tip1) tip1.innerHTML = t('tip1');

    const previewBox = document.getElementById('previewBox');
    if (previewBox) previewBox.setAttribute('aria-label', t('previewAria'));
}

const cssInput = document.getElementById('cssInput');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const previewBox = document.getElementById('previewBox');
const previewStage = document.getElementById('previewStage');
const previewEmpty = document.getElementById('previewEmpty');
const downloadBtn = document.getElementById('downloadBtn');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const dimensionInfo = document.getElementById('dimensionInfo');
const aspectRatioEl = document.getElementById('aspectRatio');

function init() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    } else {
        const browserLang = (navigator.language || 'en').split('-')[0];
        currentLang = translations[browserLang] ? browserLang : 'en';
    }

    updateUILanguage();
    updateLanguageButtons();

    cssInput.addEventListener('input', debounce(updatePreview, 150));
    widthInput.addEventListener('input', debounce(handleManualInputChange, 150));
    heightInput.addEventListener('input', debounce(handleManualInputChange, 150));
    downloadBtn.addEventListener('click', downloadImage);

    updatePreview();
    updateDimensionInfo();
    updatePresetSelection(parseInt(widthInput.value, 10), parseInt(heightInput.value, 10));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

function extractGradientFunction(code) {
    let depth = 0;
    const start = code.indexOf('(');
    if (start === -1) return null;

    for (let i = start; i < code.length; i++) {
        if (code[i] === '(') depth++;
        if (code[i] === ')') depth--;
        if (depth === 0) return code.substring(0, i + 1);
    }
    return null;
}

function extractGradient(cssCode) {
    if (!cssCode || typeof cssCode !== 'string') return null;

    const trimmedCode = cssCode.trim();

    for (const type of GRADIENT_TYPES) {
        if (trimmedCode.toLowerCase().startsWith(type)) {
            const gradientValue = extractGradientFunction(trimmedCode);
            if (gradientValue) return gradientValue;
        }
    }

    for (const type of GRADIENT_TYPES) {
        const idx = trimmedCode.toLowerCase().indexOf(type);
        if (idx === -1) continue;
        const slice = trimmedCode.slice(idx);
        const gradientValue = extractGradientFunction(slice);
        if (gradientValue) return gradientValue;
    }

    return null;
}

function isUnsafeGradient(gradient) {
    return UNSAFE_PATTERN.test(gradient);
}

function validateGradient(gradient) {
    if (!gradient) {
        return { valid: false, message: t('errorNoGradient') };
    }

    if (isUnsafeGradient(gradient)) {
        return { valid: false, message: t('errorUnsafe') };
    }

    const testEl = document.createElement('div');
    testEl.style.background = gradient;

    if (!testEl.style.background) {
        return { valid: false, message: t('errorInvalidSyntax') };
    }

    return { valid: true, gradient };
}

function setPreviewVisibility(hasValid) {
    if (hasValid) {
        previewEmpty.hidden = true;
        previewStage.hidden = false;
    } else {
        previewEmpty.hidden = false;
        previewStage.hidden = true;
    }
}

function updatePreview() {
    const cssCode = cssInput.value;
    const gradient = extractGradient(cssCode);
    const validation = validateGradient(gradient);

    if (validation.valid) {
        hideError();
        lastValidGradient = validation.gradient;
        previewBox.style.background = validation.gradient;
        setPreviewVisibility(true);
        return;
    }

    if (cssCode.trim().length > 0) {
        showError(validation.message);
        setPreviewVisibility(false);
    } else {
        hideError();
        previewBox.style.background = lastValidGradient;
        setPreviewVisibility(true);
    }
}

function updateDimensionInfo() {
    const width = parseInt(widthInput.value, 10) || 1920;
    const height = parseInt(heightInput.value, 10) || 1080;
    const clampedWidth = Math.min(Math.max(width, 100), 7680);
    const clampedHeight = Math.min(Math.max(height, 100), 7680);

    dimensionInfo.textContent = `${clampedWidth} × ${clampedHeight} px`;

    const gcd = calculateGCD(clampedWidth, clampedHeight);
    aspectRatioEl.textContent = getSimplifiedRatio(clampedWidth / gcd, clampedHeight / gcd);
}

function calculateGCD(a, b) {
    return b === 0 ? a : calculateGCD(b, a % b);
}

function getSimplifiedRatio(w, h) {
    const knownRatios = {
        '16:9': [[16, 9], [1920, 1080], [1280, 720], [2560, 1440], [3840, 2160], [7680, 4320]],
        '4:3': [[4, 3], [1024, 768], [800, 600]],
        '1:1': [[1, 1], [1080, 1080]],
        '21:9': [[21, 9]],
        '9:16': [[9, 16]],
        '3:2': [[3, 2]],
        '2:3': [[2, 3]]
    };

    for (const [ratio, values] of Object.entries(knownRatios)) {
        for (const [rw, rh] of values) {
            if (w === rw && h === rh) return ratio;
        }
    }

    if (w > 50 || h > 50) {
        return `~${Math.round((w / h) * 100) / 100}:1`;
    }

    return `${w}:${h}`;
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.hidden = false;
}

function hideError() {
    errorMessage.hidden = true;
}

function setSize(width, height) {
    widthInput.value = width;
    heightInput.value = height;
    updateDimensionInfo();
    updatePresetSelection(width, height);
}

function updatePresetSelection(width, height) {
    const presetContainer = document.getElementById('presetContainer');
    if (!presetContainer) return;

    const sizeKey = `${width}x${height}`;
    presetContainer.querySelectorAll('.preset-btn').forEach((btn) => {
        btn.classList.toggle('is-selected', btn.dataset.size === sizeKey);
        btn.classList.toggle('selected', btn.dataset.size === sizeKey);
    });
}

function clearPresetSelection() {
    const presetContainer = document.getElementById('presetContainer');
    if (!presetContainer) return;
    presetContainer.querySelectorAll('.preset-btn').forEach((btn) => {
        btn.classList.remove('is-selected', 'selected');
    });
}

function incrementInput(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const currentValue = parseInt(input.value, 10) || 0;
    const max = parseInt(input.max, 10) || 7680;
    if (currentValue + 10 <= max) {
        input.value = currentValue + 10;
        handleManualInputChange();
    }
}

function decrementInput(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const currentValue = parseInt(input.value, 10) || 0;
    const min = parseInt(input.min, 10) || 100;
    if (currentValue - 10 >= min) {
        input.value = currentValue - 10;
        handleManualInputChange();
    }
}

function handleManualInputChange() {
    clearPresetSelection();
    updateDimensionInfo();
}

function setGradient(gradient) {
    cssInput.value = `background: ${gradient};`;
    updatePreview();
}

function getSelectedFormat() {
    const checked = document.querySelector('input[name="format"]:checked');
    return checked ? checked.value : 'png';
}

async function downloadImage() {
    const cssCode = cssInput.value;
    const gradient = extractGradient(cssCode);
    const validation = validateGradient(gradient);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    let width = parseInt(widthInput.value, 10) || 1920;
    let height = parseInt(heightInput.value, 10) || 1080;
    width = Math.min(Math.max(width, 100), 7680);
    height = Math.min(Math.max(height, 100), 7680);

    if (width * height > 3840 * 2160 && !window.confirm(t('confirmLarge'))) {
        return;
    }

    const format = getSelectedFormat();
    const downloadBtnText = document.getElementById('downloadBtnText');
    const originalText = downloadBtnText.textContent;

    downloadBtn.classList.add('is-loading');
    downloadBtn.disabled = true;
    downloadBtnText.textContent = t('processing');

    let tempContainer = null;

    try {
        if (typeof html2canvas !== 'function') {
            throw new Error('html2canvas unavailable');
        }

        tempContainer = document.createElement('div');
        tempContainer.style.cssText = `
            position: fixed;
            left: -9999px;
            top: -9999px;
            width: ${width}px;
            height: ${height}px;
            background: ${validation.gradient};
            z-index: -9999;
        `;
        document.body.appendChild(tempContainer);

        const canvas = await html2canvas(tempContainer, {
            width,
            height,
            scale: 1,
            useCORS: true,
            allowTaint: false,
            backgroundColor: format === 'jpg' ? '#ffffff' : null,
            logging: false
        });

        document.body.removeChild(tempContainer);
        tempContainer = null;

        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const quality = format === 'jpg' ? 0.95 : undefined;

        await new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('blob failed'));
                    return;
                }
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `css2image-${width}x${height}.${format === 'jpg' ? 'jpg' : 'png'}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                resolve();
            }, mimeType, quality);
        });
    } catch (error) {
        console.error('Download error:', error);
        showError(t('errorGeneral'));
    } finally {
        if (tempContainer && tempContainer.parentNode) {
            tempContainer.parentNode.removeChild(tempContainer);
        }
        downloadBtn.classList.remove('is-loading');
        downloadBtn.disabled = false;
        downloadBtnText.textContent = originalText;
    }
}

window.setSize = setSize;
window.setGradient = setGradient;
window.switchLanguage = switchLanguage;
window.incrementInput = incrementInput;
window.decrementInput = decrementInput;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

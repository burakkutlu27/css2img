/**
 * CSS Gradient to Image Converter
 * Converts CSS gradient code to downloadable PNG/JPG images
 * With multi-language support (TR/EN)
 */

// ===========================================
// INTERNATIONALIZATION (i18n)
// ===========================================

const translations = {
    tr: {
        pageTitle: 'CSS Gradient to Image Converter',
        metaDescription: 'CSS gradyan kodlarınızı yüksek çözünürlüklü PNG veya JPG görsellerine dönüştürün.',
        headerDescription: 'CSS gradyan kodlarınızı yüksek çözünürlüklü <span class="text-purple-400 font-medium">PNG</span> veya <span class="text-indigo-400 font-medium">JPG</span> görsellerine dönüştürün.',
        settings: 'Ayarlar',
        cssGradientCode: 'CSS Gradyan Kodu',
        cssPlaceholder: 'background: linear-gradient(90deg, #667eea, #764ba2);',
        example: 'Örnek:',
        width: 'Genişlik (px)',
        height: 'Yükseklik (px)',
        quickSizes: 'Hızlı Boyutlar',
        outputFormat: 'Çıktı Formatı',
        transparencySupport: '(Şeffaflık desteği)',
        smallerSize: '(Daha küçük boyut)',
        downloadImage: 'Görseli İndir',
        processing: 'İşleniyor...',
        exampleGradients: 'Örnek Gradyanlar',
        livePreview: 'Canlı Önizleme',
        tips: 'İpuçları',
        tip1: '<code class="text-purple-400">linear-gradient</code>, <code class="text-purple-400">radial-gradient</code> ve <code class="text-purple-400">conic-gradient</code> desteklenir.',
        tip2: 'Maksimum çözünürlük: 4096×4096 piksel',
        tip3: 'PNG formatı şeffaflık için, JPG daha küçük dosya boyutu için uygundur.',
        footer: 'CSS Gradient to Image Converter',
        errorNoGradient: 'Geçerli bir gradyan kodu bulunamadı. Lütfen linear-gradient, radial-gradient veya conic-gradient kullanın.',
        errorInvalidSyntax: 'Gradyan kodu geçersiz. Lütfen söz dizimini kontrol edin.',
        errorGeneral: 'Görsel oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.'
    },
    en: {
        pageTitle: 'CSS Gradient to Image Converter',
        metaDescription: 'Convert your CSS gradient code to high-resolution PNG or JPG images.',
        headerDescription: 'Convert your CSS gradient code to high-resolution <span class="text-purple-400 font-medium">PNG</span> or <span class="text-indigo-400 font-medium">JPG</span> images.',
        settings: 'Settings',
        cssGradientCode: 'CSS Gradient Code',
        cssPlaceholder: 'background: linear-gradient(90deg, #667eea, #764ba2);',
        example: 'Example:',
        width: 'Width (px)',
        height: 'Height (px)',
        quickSizes: 'Quick Sizes',
        outputFormat: 'Output Format',
        transparencySupport: '(Transparency support)',
        smallerSize: '(Smaller file size)',
        downloadImage: 'Download Image',
        processing: 'Processing...',
        exampleGradients: 'Example Gradients',
        livePreview: 'Live Preview',
        tips: 'Tips',
        tip1: '<code class="text-purple-400">linear-gradient</code>, <code class="text-purple-400">radial-gradient</code> and <code class="text-purple-400">conic-gradient</code> are supported.',
        tip2: 'Maximum resolution: 4096×4096 pixels',
        tip3: 'PNG format for transparency, JPG for smaller file size.',
        footer: 'CSS Gradient to Image Converter',
        errorNoGradient: 'No valid gradient code found. Please use linear-gradient, radial-gradient or conic-gradient.',
        errorInvalidSyntax: 'Invalid gradient syntax. Please check your code.',
        errorGeneral: 'An error occurred while creating the image. Please try again.'
    }
};

let currentLang = 'tr';

/**
 * Get translation for a key
 */
function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

/**
 * Switch language
 */
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateUILanguage();
    updateLanguageButtons();
}

/**
 * Update language toggle buttons
 */
function updateLanguageButtons() {
    const trBtn = document.getElementById('langTR');
    const enBtn = document.getElementById('langEN');

    if (trBtn && enBtn) {
        if (currentLang === 'tr') {
            trBtn.classList.add('bg-purple-600', 'text-white');
            trBtn.classList.remove('bg-dark-700', 'text-gray-400');
            enBtn.classList.remove('bg-purple-600', 'text-white');
            enBtn.classList.add('bg-dark-700', 'text-gray-400');
        } else {
            enBtn.classList.add('bg-purple-600', 'text-white');
            enBtn.classList.remove('bg-dark-700', 'text-gray-400');
            trBtn.classList.remove('bg-purple-600', 'text-white');
            trBtn.classList.add('bg-dark-700', 'text-gray-400');
        }
    }
}

/**
 * Update all UI text based on current language
 */
function updateUILanguage() {
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Update page title
    document.title = t('pageTitle');

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t('metaDescription');

    // Update header description
    const headerDesc = document.getElementById('headerDescription');
    if (headerDesc) headerDesc.innerHTML = t('headerDescription');

    // Update settings title
    const settingsTitle = document.getElementById('settingsTitle');
    if (settingsTitle) settingsTitle.textContent = t('settings');

    // Update CSS label
    const cssLabel = document.getElementById('cssLabel');
    if (cssLabel) cssLabel.textContent = t('cssGradientCode');

    // Update CSS placeholder
    const cssInput = document.getElementById('cssInput');
    if (cssInput) cssInput.placeholder = t('cssPlaceholder');

    // Update example text
    const exampleText = document.getElementById('exampleText');
    if (exampleText) exampleText.innerHTML = t('example') + ' <code class="text-purple-400">linear-gradient(90deg, red, blue)</code>';

    // Update dimension labels
    const widthLabel = document.getElementById('widthLabel');
    if (widthLabel) widthLabel.textContent = t('width');

    const heightLabel = document.getElementById('heightLabel');
    if (heightLabel) heightLabel.textContent = t('height');

    // Update quick sizes label
    const quickSizesLabel = document.getElementById('quickSizesLabel');
    if (quickSizesLabel) quickSizesLabel.textContent = t('quickSizes');

    // Update output format label
    const outputFormatLabel = document.getElementById('outputFormatLabel');
    if (outputFormatLabel) outputFormatLabel.textContent = t('outputFormat');

    // Update format descriptions
    const pngDesc = document.getElementById('pngDesc');
    if (pngDesc) pngDesc.textContent = t('transparencySupport');

    const jpgDesc = document.getElementById('jpgDesc');
    if (jpgDesc) jpgDesc.textContent = t('smallerSize');

    // Update download button
    const downloadBtnText = document.getElementById('downloadBtnText');
    if (downloadBtnText) downloadBtnText.textContent = t('downloadImage');

    // Update example gradients title
    const exampleGradientsTitle = document.getElementById('exampleGradientsTitle');
    if (exampleGradientsTitle) exampleGradientsTitle.textContent = t('exampleGradients');

    // Update live preview title
    const livePreviewTitle = document.getElementById('livePreviewTitle');
    if (livePreviewTitle) livePreviewTitle.textContent = t('livePreview');

    // Update tips title
    const tipsTitle = document.getElementById('tipsTitle');
    if (tipsTitle) tipsTitle.textContent = t('tips');

    // Update tips
    const tip1 = document.getElementById('tip1');
    if (tip1) tip1.innerHTML = '• ' + t('tip1');

    const tip2 = document.getElementById('tip2');
    if (tip2) tip2.textContent = '• ' + t('tip2');

    const tip3 = document.getElementById('tip3');
    if (tip3) tip3.textContent = '• ' + t('tip3');

    // Update footer
    const footerText = document.getElementById('footerText');
    if (footerText) footerText.innerHTML = t('footer') + ' &copy; 2024';
}

// ===========================================
// DOM ELEMENTS
// ===========================================

const cssInput = document.getElementById('cssInput');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const previewBox = document.getElementById('previewBox');
const downloadBtn = document.getElementById('downloadBtn');
const renderCanvas = document.getElementById('renderCanvas');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const dimensionInfo = document.getElementById('dimensionInfo');
const aspectRatioEl = document.getElementById('aspectRatio');

// Supported gradient types
const GRADIENT_TYPES = ['linear-gradient', 'radial-gradient', 'conic-gradient', 'repeating-linear-gradient', 'repeating-radial-gradient', 'repeating-conic-gradient'];

/**
 * Initialize the application
 */
function init() {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        currentLang = translations[browserLang] ? browserLang : 'en';
    }

    // Update UI with current language
    updateUILanguage();
    updateLanguageButtons();

    // Add event listeners
    cssInput.addEventListener('input', debounce(updatePreview, 150));

    // Manual input changes should clear preset selection
    widthInput.addEventListener('input', debounce(handleManualInputChange, 150));
    heightInput.addEventListener('input', debounce(handleManualInputChange, 150));

    downloadBtn.addEventListener('click', downloadImage);

    // Initial update
    updatePreview();
    updateDimensionInfo();
}

/**
 * Debounce function to limit rapid calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Extract gradient value from CSS input
 */
function extractGradient(cssCode) {
    if (!cssCode || typeof cssCode !== 'string') {
        return null;
    }

    const trimmedCode = cssCode.trim();

    // Check if input directly starts with a gradient function
    for (const type of GRADIENT_TYPES) {
        if (trimmedCode.toLowerCase().startsWith(type)) {
            // Find the matching closing parenthesis
            const gradientValue = extractGradientFunction(trimmedCode);
            if (gradientValue) {
                return gradientValue;
            }
        }
    }

    // Try to extract gradient from CSS property (e.g., background: linear-gradient(...))
    for (const type of GRADIENT_TYPES) {
        const regex = new RegExp(`(${type}\\s*\\([^;]+\\))`, 'i');
        const match = trimmedCode.match(regex);
        if (match) {
            return match[1];
        }
    }

    return null;
}

/**
 * Extract gradient function with proper parenthesis matching
 */
function extractGradientFunction(code) {
    let depth = 0;
    let start = code.indexOf('(');

    if (start === -1) return null;

    for (let i = start; i < code.length; i++) {
        if (code[i] === '(') depth++;
        if (code[i] === ')') depth--;

        if (depth === 0) {
            return code.substring(0, i + 1);
        }
    }

    return null;
}

/**
 * Validate gradient CSS
 */
function validateGradient(gradient) {
    if (!gradient) {
        return { valid: false, message: t('errorNoGradient') };
    }

    // Create a temporary element to test the gradient
    const testEl = document.createElement('div');
    testEl.style.background = gradient;

    // Check if the browser accepted the gradient
    if (!testEl.style.background || testEl.style.background === '') {
        return { valid: false, message: t('errorInvalidSyntax') };
    }

    return { valid: true, gradient: gradient };
}

/**
 * Update the live preview
 */
function updatePreview() {
    const cssCode = cssInput.value;
    const gradient = extractGradient(cssCode);
    const validation = validateGradient(gradient);

    if (validation.valid) {
        hideError();
        previewBox.style.background = validation.gradient;
    } else {
        // If there's any text input, show error
        if (cssCode.trim().length > 0) {
            showError(validation.message);
        } else {
            hideError();
        }
        // Keep the last valid gradient or use default
        if (!previewBox.style.background || previewBox.style.background === '') {
            previewBox.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    }
}

/**
 * Update dimension info display
 */
function updateDimensionInfo() {
    const width = parseInt(widthInput.value) || 1920;
    const height = parseInt(heightInput.value) || 1080;

    // Clamp values (max 7680 for 8K support)
    const clampedWidth = Math.min(Math.max(width, 100), 7680);
    const clampedHeight = Math.min(Math.max(height, 100), 7680);

    // Update dimension display
    dimensionInfo.textContent = `${clampedWidth} × ${clampedHeight} px`;

    // Calculate and display aspect ratio
    const gcd = calculateGCD(clampedWidth, clampedHeight);
    const ratioW = clampedWidth / gcd;
    const ratioH = clampedHeight / gcd;

    // Simplify common ratios
    const aspectRatioText = getSimplifiedRatio(ratioW, ratioH);
    aspectRatioEl.textContent = aspectRatioText;
}

/**
 * Calculate Greatest Common Divisor
 */
function calculateGCD(a, b) {
    return b === 0 ? a : calculateGCD(b, a % b);
}

/**
 * Get simplified aspect ratio string
 */
function getSimplifiedRatio(w, h) {
    // Common known ratios
    const knownRatios = {
        '16:9': [[16, 9], [1920, 1080], [1280, 720], [2560, 1440], [3840, 2160]],
        '4:3': [[4, 3], [1024, 768], [800, 600]],
        '1:1': [[1, 1]],
        '21:9': [[21, 9]],
        '9:16': [[9, 16]],
        '3:2': [[3, 2]],
        '2:3': [[2, 3]]
    };

    for (const [ratio, values] of Object.entries(knownRatios)) {
        for (const [rw, rh] of values) {
            if (w === rw && h === rh) {
                return ratio;
            }
        }
    }

    // If ratio is too complex, simplify it
    if (w > 50 || h > 50) {
        return `~${Math.round(w / h * 100) / 100}:1`;
    }

    return `${w}:${h}`;
}

/**
 * Show error message
 */
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

/**
 * Set preset size and update selected state
 */
function setSize(width, height) {
    widthInput.value = width;
    heightInput.value = height;
    updateDimensionInfo();
    updatePresetSelection(width, height);
}

/**
 * Update preset button selection state
 */
function updatePresetSelection(width, height) {
    const presetContainer = document.getElementById('presetContainer');
    if (!presetContainer) return;

    const buttons = presetContainer.querySelectorAll('.preset-btn');
    const sizeKey = `${width}x${height}`;

    buttons.forEach(btn => {
        if (btn.dataset.size === sizeKey) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

/**
 * Clear preset selection (called when user manually changes input)
 */
function clearPresetSelection() {
    const presetContainer = document.getElementById('presetContainer');
    if (!presetContainer) return;

    const buttons = presetContainer.querySelectorAll('.preset-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
}

/**
 * Increment number input value
 */
function incrementInput(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const currentValue = parseInt(input.value) || 0;
    const max = parseInt(input.max) || 7680;
    const step = 10;

    if (currentValue + step <= max) {
        input.value = currentValue + step;
        handleManualInputChange();
    }
}

/**
 * Decrement number input value
 */
function decrementInput(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const currentValue = parseInt(input.value) || 0;
    const min = parseInt(input.min) || 100;
    const step = 10;

    if (currentValue - step >= min) {
        input.value = currentValue - step;
        handleManualInputChange();
    }
}

/**
 * Handle manual input change - clear preset selection and update dimension info
 */
function handleManualInputChange() {
    clearPresetSelection();
    updateDimensionInfo();
}

/**
 * Set gradient from example
 */
function setGradient(gradient) {
    cssInput.value = `background: ${gradient};`;
    updatePreview();
}

/**
 * Get selected output format
 */
function getSelectedFormat() {
    const formatRadios = document.querySelectorAll('input[name="format"]');
    for (const radio of formatRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return 'png';
}

/**
 * Download the gradient as image using html2canvas
 */
async function downloadImage() {
    const cssCode = cssInput.value;
    const gradient = extractGradient(cssCode);
    const validation = validateGradient(gradient);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    // Get dimensions
    let width = parseInt(widthInput.value) || 1920;
    let height = parseInt(heightInput.value) || 1080;

    // Clamp values (max 7680 for 8K support)
    width = Math.min(Math.max(width, 100), 7680);
    height = Math.min(Math.max(height, 100), 7680);

    // Get format
    const format = getSelectedFormat();

    // Show loading state
    downloadBtn.classList.add('loading');
    downloadBtn.disabled = true;
    const downloadBtnText = document.getElementById('downloadBtnText');
    const originalText = downloadBtnText.textContent;
    downloadBtnText.textContent = t('processing');

    try {
        // Create a temporary div with exact dimensions and gradient
        const tempContainer = document.createElement('div');
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

        // Use html2canvas to capture the div with exact dimensions
        // scale: 1 ensures output matches user-specified dimensions exactly
        const canvas = await html2canvas(tempContainer, {
            width: width,
            height: height,
            scale: 1,
            useCORS: true,
            allowTaint: true,
            backgroundColor: format === 'jpg' ? '#ffffff' : null,
            logging: false
        });

        // Remove temporary container
        document.body.removeChild(tempContainer);

        // Convert canvas to blob
        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const quality = format === 'jpg' ? 0.95 : undefined;

        canvas.toBlob((blob) => {
            if (blob) {
                // Create download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `gradient-${width}x${height}-${Date.now()}.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                showError(t('errorGeneral'));
            }

            // Reset button state
            downloadBtn.classList.remove('loading');
            downloadBtn.disabled = false;
            downloadBtnText.textContent = originalText;
        }, mimeType, quality);

    } catch (error) {
        console.error('Download error:', error);
        showError(t('errorGeneral'));

        // Reset button state
        downloadBtn.classList.remove('loading');
        downloadBtn.disabled = false;
        downloadBtnText.textContent = originalText;
    }
}

// Make functions available globally for inline onclick handlers
window.setSize = setSize;
window.setGradient = setGradient;
window.switchLanguage = switchLanguage;
window.incrementInput = incrementInput;
window.decrementInput = decrementInput;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


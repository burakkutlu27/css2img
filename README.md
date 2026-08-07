# CSS2Image

**Live demo:** [https://css2img.vercel.app](https://css2img.vercel.app)

[English](#english) | [Türkçe](#türkçe)

---

<a name="english"></a>
## English

Export CSS gradient code (`linear-gradient`, `radial-gradient`, `conic-gradient`, …) as high-resolution **PNG** or **JPG** — entirely in the browser.

Most tools generate CSS *from* images. This does the reverse: paste a gradient, pick a size (up to 8K), download a usable background asset without screenshots or Photoshop cropping.

### Features
- Live preview with transparency checkerboard
- Custom width/height and common presets (1080² → 8K)
- PNG (transparency) / JPG (smaller files)
- TR / EN UI
- No signup, no ads, no server upload of your CSS

### Tech
- Vanilla HTML / CSS / JS
- HTML5 Canvas via `html2canvas` (CDN, SRI-pinned)
- Static hosting on Vercel

### Run locally
Clone the repo and open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
```

### SEO / discoverability
Canonical URL, Open Graph / Twitter cards, JSON-LD (`WebApplication`), `robots.txt`, and `sitemap.xml` point at the live Vercel deployment.

---

<a name="türkçe"></a>
## Türkçe

CSS gradyan kodunu (`linear-gradient`, `radial-gradient`, `conic-gradient` vb.) yüksek çözünürlüklü **PNG** veya **JPG** olarak dışa aktarır — tamamen tarayıcıda.

### Ne işe yarıyor?
- Gradyanı yapıştır → çözünürlüğü seç → indir
- Canlı önizleme, hızlı boyutlar, TR/EN arayüz
- Reklam / üyelik / sunucuya yükleme yok

### Yerelde çalıştırma
Repoyu klonlayıp `index.html` dosyasını tarayıcıda açman yeterli.

### Teknik kararlar
- Framework yok; bakım maliyeti düşük
- Stil tamamen özel CSS (Tailwind CDN yok) — prod için öngörülebilir ve kimlikli
- `url()` içeren değerler güvenlik için reddedilir

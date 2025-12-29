# CSS2Image

[English](#english) | [Türkçe](#türkçe)

---

<a name="english"></a>
## 🇬🇧 English

A simple tool to export CSS gradient codes (linear, radial, conic, etc.) directly as high-res image files (PNG/JPG).

Most tools out there generate CSS *from* images. I needed the reverse—something to quickly generate background assets from code without manually taking screenshots and cropping them in Photoshop. I couldn't find a decent, ad-free tool that does this properly, so I built this.

### What does it do?
* Paste your CSS code (e.g., `background: linear-gradient...`).
* Set your custom resolution (e.g., 1920x1080).
* Download the output instantly.

### Tech Stack
Nothing too fancy under the hood. It uses HTML5 Canvas and `html2canvas`.
* No frameworks (Vanilla JS).
* Styled with Tailwind CSS (CDN).

### Usage
No installation required. Just clone the repo and open `index.html` in your browser.

---
If you find a bug or have a feature request, feel free to open a PR.

<br>

---

<a name="türkçe"></a>
## 🇹🇷 Türkçe

CSS gradient kodlarını (linear, radial, conic vb.) direkt resim dosyası (PNG/JPG) olarak indirmeyi sağlayan basit bir araç.

Piyasada genelde "Resimden CSS kodu çıkaran" tool'lar var ama tam tersi (CSS -> Resim) lazım olduğunda çalışan doğru düzgün, reklamsız bir şey bulamadım. Özellikle tasarım sunumlarında veya hızlıca background görseli üretmek gerektiğinde elle ekran görüntüsü alıp kırpmakla uğraşmamak için bunu yaptım.

### Ne işe yarıyor?
* CSS kodunu yapıştırıyorsun (`background: linear-gradient...`).
* İstediğin çözünürlüğü giriyorsun (1920x1080 vs.).
* Direkt çıktı alıyorsun.

### Teknik Kısım
Çok karmaşık bir olayı yok. HTML5 Canvas ve `html2canvas` kütüphanesi kullanıyor.
* Framework yok (Vanilla JS).
* Stil için Tailwind CSS var (CDN).

### Nasıl Çalıştırırım?
Kurulum yapmana gerek yok. Projeyi indirip `index.html` dosyasını tarayıcıda açman yeterli.

---
Eğer bug bulursanız veya "şu da olsun" derseniz PR atabilirsiniz.
# css2img

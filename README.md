<p align="center">
  <strong>kankam.ai</strong> &mdash; <em>kanka'nın resmi tanıtım sitesi</em>
</p>

<p align="center">
  🌐 <strong><a href="https://kankam.ai">https://kankam.ai</a></strong>
</p>

<p align="center">
  <a href="https://kankam.ai"><img alt="site" src="https://img.shields.io/website?url=https%3A%2F%2Fkankam.ai&style=flat-square&label=kankam.ai"></a>
  <a href="LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square"></a>
  <img alt="next" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js">
  <img alt="tailwind" src="https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss">
  <a href="https://github.com/thorrangonak/kanka"><img alt="main project" src="https://img.shields.io/badge/main%20project-kanka-cba6f7?style=flat-square"></a>
</p>

---

## Nedir?

[kanka](https://github.com/thorrangonak/kanka) — Türkçe konuşan terminal kodlama asistanı — için resmi tanıtım sitesi.

🔗 **Canlı**: [https://kankam.ai](https://kankam.ai)

### Özellikler

- 🎭 **İnteraktif persona switcher** — 7 persona arası anlık geçiş, mock terminal'de canlı örnek cevap
- 🍯 **Animasyonlu hero terminal** — typewriter effect ile Türkçe oturum simulasyonu
- 🌟 **Token tasarrufu benchmark** — IntersectionObserver-tetiklenen bar grafikleri
- 🇹🇷 **KVKK bilgi sayfası** — önce/sonra kod karşılaştırması + checklist
- 🔌 **10+ LLM provider grid** — Claude, GPT, Gemini, GLM, Grok, Ollama vb.
- 📖 **8 detay sayfası** — her özellik için 300-500 satırlık zengin içerik
- 🌙 **Light/dark tema** — Catppuccin Mocha + Latte
- 📱 **Tam mobile responsive** — 320px'e kadar test edildi

## Teknoloji

| Katman | Seçim |
|--------|-------|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Dil | TypeScript strict |
| Stil | **Tailwind CSS 4** + custom Catppuccin Mocha tema |
| Tema | `next-themes` (light/dark, dark default) |
| Animasyon | `framer-motion` |
| Icons | `lucide-react` + custom brand SVG'leri |
| i18n | TR ana, EN secondary (`/en`) |
| Build | Statik export (`output: "export"`) |
| Hosting | DigitalOcean droplet + Nginx |
| Deploy | GitHub Actions → SSH rsync |
| Analytics | (planlı) Plausible self-hosted |

## Yapı

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Ana landing
│   ├── globals.css         # Catppuccin Mocha + utilities
│   ├── robots.ts           # robots.txt
│   ├── sitemap.ts          # sitemap.xml
│   └── opengraph-image.tsx # 1200×630 OG (build-time)
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── copy-command.tsx
│   ├── feature-card.tsx
│   └── icons.tsx
└── lib/
    ├── features.ts         # 8 özellik tek source of truth
    └── utils.ts            # cn() helper
```

## Geliştirme

```bash
# Bağımlılıklar
npm install

# Dev server (Turbopack)
npm run dev
# → http://localhost:3000

# Production build (statik export)
npm run build
# → out/ klasörü, Nginx'te serve edilebilir

# Lokal preview
npx serve out
```

## Deploy

**Otomatik**: `main`'e push → GitHub Actions → DigitalOcean rsync.

**Manuel**: `npm run build && rsync -avz --delete out/ deploy@host:/var/www/kankam.ai/`

Detay: [DEPLOYMENT.md](DEPLOYMENT.md)

## GitHub Actions secrets

| Secret | Açıklama |
|--------|----------|
| `DO_HOST` | DigitalOcean droplet IP veya hostname |
| `DO_USER` | SSH kullanıcı (önerilen: `deploy`) |
| `DO_PORT` | SSH portu (varsayılan 22) |
| `DO_PATH` | Site path (`/var/www/kankam.ai`) |
| `DO_SSH_KEY` | Private key (`-----BEGIN OPENSSH PRIVATE KEY-----` dahil) |

## Performans

- ⚡ **0 runtime cost** — statik export, Nginx serve
- 📦 1.6 MB toplam build (3.5 MB unpacked, 128 dosya)
- 🔥 314ms ilk-byte (TR → Frankfurt DigitalOcean)
- 📊 Lighthouse 95+ (Performance + Accessibility + SEO)

## Lisans

[MIT](LICENSE) © thorrangonak

## İlgili linkler

- 🌐 **Canlı site**: [kankam.ai](https://kankam.ai)
- 🚀 **Ana ürün**: [kanka GitHub](https://github.com/thorrangonak/kanka)
- 📦 **npm**: [@thorrangonak/kanka](https://www.npmjs.com/package/@thorrangonak/kanka)
- 📋 **Yol haritası**: [ROADMAP](https://github.com/thorrangonak/kanka/blob/main/ROADMAP.md)
- 🤝 **Katkı**: [CONTRIBUTING](https://github.com/thorrangonak/kanka/blob/main/CONTRIBUTING.md)
- 💬 **Topluluk**: [Discussions](https://github.com/thorrangonak/kanka/discussions)

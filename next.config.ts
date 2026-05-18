import type { NextConfig } from "next";
import path from "node:path";

/**
 * Statik export — DigitalOcean Nginx üstünde 0 runtime cost ile serve edilir.
 * `next build` → `out/` klasörü → rsync ile sunucuya gönder.
 *
 * Trade-off'lar:
 *   - SSR / RSC dynamic data yok (zaten gerek değil, içerik statik)
 *   - Image optimization disabled (Nginx ile farklı çözüyoruz veya CDN)
 *   - API routes yok (gerekirse ayrı endpoint yapacağız)
 */
const nextConfig: NextConfig = {
	output: "export",

	// Statik export'ta her route'un sonuna `/` eklenir (Nginx için kolaylık).
	trailingSlash: true,

	// next/image optimization disabled — statik export desteklemiyor.
	images: {
		unoptimized: true,
	},

	// React strict mode (dev'de duplicate render uyarısı)
	reactStrictMode: true,

	// TypeScript hatalarını build sırasında zorla
	typescript: {
		ignoreBuildErrors: false,
	},

	// Production'da source map'leri kaldır (sunucuda yer kazan)
	productionBrowserSourceMaps: false,

	// X-Powered-By header'ı kaldır
	poweredByHeader: false,

	// Turbopack root — üst dizindeki package-lock.json'ları inference'a karıştırma
	turbopack: {
		root: path.resolve(__dirname),
	},
};

export default nextConfig;

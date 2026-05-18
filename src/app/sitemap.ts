import type { MetadataRoute } from "next";
import { FEATURE_SLUGS } from "@/lib/features-detail";

export const dynamic = "force-static";

const BASE_URL = "https://kankam.ai";

/**
 * sitemap.xml — Google/Bing için crawl haritası.
 * Statik export ile build-time generate edilir.
 * Ana sayfa + 8 özellik detay sayfası.
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const home: MetadataRoute.Sitemap[number] = {
		url: BASE_URL,
		lastModified: now,
		changeFrequency: "weekly",
		priority: 1,
		alternates: {
			languages: {
				tr: BASE_URL,
				en: `${BASE_URL}/en`,
			},
		},
	};

	const featurePages: MetadataRoute.Sitemap = FEATURE_SLUGS.map((slug) => ({
		url: `${BASE_URL}/ozellikler/${slug}/`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	const enPage: MetadataRoute.Sitemap[number] = {
		url: `${BASE_URL}/en`,
		lastModified: now,
		changeFrequency: "weekly",
		priority: 0.9,
	};

	return [home, ...featurePages, enPage];
}

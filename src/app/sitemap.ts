import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://kankam.ai";

/**
 * sitemap.xml — Google/Bing için crawl haritası.
 * Statik export ile build-time generate edilir.
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	return [
		{
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
		},
		{
			url: `${BASE_URL}/en`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		},
	];
}

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * robots.txt — arama motorlarına yönerge.
 * Statik export ile build-time generate edilir.
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/_next/", "/private/"],
			},
		],
		sitemap: "https://kankam.ai/sitemap.xml",
		host: "https://kankam.ai",
	};
}

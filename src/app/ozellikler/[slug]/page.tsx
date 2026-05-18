import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CopyCmd } from "@/components/parts/copy-cmd";
import { DetailBlockRenderer } from "@/components/sections/detail-block";
import { FEATURE_DETAILS, FEATURE_SLUGS } from "@/lib/features-detail";
import { FEATURES } from "@/lib/site-data";

interface PageProps {
	params: Promise<{ slug: string }>;
}

// Statik export için tüm slug'ları build-time'da generate et
export function generateStaticParams() {
	return FEATURE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const detail = FEATURE_DETAILS[slug];
	if (!detail) {
		return { title: "Bulunamadı" };
	}
	return {
		title: `${detail.title} — ${detail.tagline}`,
		description: detail.intro,
		openGraph: {
			title: `${detail.emoji} ${detail.title}`,
			description: detail.tagline,
			type: "article",
		},
		alternates: {
			canonical: `https://kankam.ai/ozellikler/${slug}/`,
		},
	};
}

export default async function FeatureDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const detail = FEATURE_DETAILS[slug];

	if (!detail) {
		notFound();
	}

	// Sıradaki / önceki feature için breadcrumb
	const currentIndex = FEATURE_SLUGS.indexOf(slug);
	const prev = currentIndex > 0 ? FEATURE_SLUGS[currentIndex - 1] : null;
	const next = currentIndex < FEATURE_SLUGS.length - 1 ? FEATURE_SLUGS[currentIndex + 1] : null;

	return (
		<>
			<Navbar />
			<main>
				{/* Hero bölümü */}
				<section style={{ paddingTop: 60, paddingBottom: 40, position: "relative", overflow: "hidden" }}>
					<div className="hero-bg" />
					<div className="dot-grid" />
					<div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
						{/* Breadcrumb */}
						<nav style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }} aria-label="Breadcrumb">
							<Link href="/" style={{ color: "var(--muted)" }}>
								Ana sayfa
							</Link>
							<span style={{ margin: "0 8px" }}>/</span>
							<Link href="/#features" style={{ color: "var(--muted)" }}>
								Özellikler
							</Link>
							<span style={{ margin: "0 8px" }}>/</span>
							<span style={{ color: "var(--text)" }}>{detail.title}</span>
						</nav>

						{/* Eyebrow */}
						<span className="eyebrow">
							<span className="dot" /> Özellik detayı · {currentIndex + 1} / {FEATURE_SLUGS.length}
						</span>

						{/* Title */}
						<h1 style={{ marginTop: 18, fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.08 }}>
							<span style={{ marginRight: 16 }} aria-hidden>
								{detail.emoji}
							</span>
							{detail.title}
						</h1>

						{/* Tagline */}
						<p
							style={{
								fontSize: 22,
								marginTop: 16,
								color: "var(--teal)",
								fontWeight: 500,
								lineHeight: 1.4,
							}}
						>
							{detail.tagline}
						</p>

						{/* Intro */}
						<p
							style={{
								fontSize: 17,
								marginTop: 16,
								color: "var(--subtext)",
								maxWidth: 740,
								lineHeight: 1.7,
							}}
						>
							{detail.intro}
						</p>

						{/* TL;DR */}
						<div
							style={{
								marginTop: 32,
								padding: 24,
								background: "var(--mantle)",
								border: "1px solid var(--surface1)",
								borderLeft: "3px solid var(--accent)",
								borderRadius: "0 12px 12px 0",
							}}
						>
							<div
								style={{
									fontFamily: "var(--font-mono)",
									fontSize: 12,
									color: "var(--accent)",
									fontWeight: 700,
									letterSpacing: "0.05em",
									marginBottom: 10,
								}}
							>
								TL;DR
							</div>
							<ul
								style={{
									listStyle: "none",
									padding: 0,
									margin: 0,
									display: "flex",
									flexDirection: "column",
									gap: 8,
								}}
							>
								{detail.tldr.map((item) => (
									<li
										key={item}
										style={{
											display: "flex",
											gap: 12,
											color: "var(--subtext)",
											fontSize: 15,
											lineHeight: 1.5,
										}}
									>
										<span style={{ color: "var(--teal)", flexShrink: 0 }}>▸</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{/* İçerik blokları */}
				<section style={{ paddingTop: 20, paddingBottom: 60 }}>
					<div className="container" style={{ maxWidth: 900 }}>
						{detail.blocks.map((block, i) => (
							<DetailBlockRenderer key={i} block={block} />
						))}

						{/* FAQ */}
						{detail.faq.length > 0 && (
							<>
								<h2
									id="sss"
									style={{
										fontSize: 32,
										fontWeight: 700,
										marginTop: 64,
										marginBottom: 16,
										scrollMarginTop: 80,
									}}
								>
									Sıkça Sorulanlar
								</h2>
								<div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
									{detail.faq.map((qa) => (
										<details
											key={qa.q}
											style={{
												background: "var(--mantle)",
												border: "1px solid var(--surface1)",
												borderRadius: 10,
												padding: "16px 20px",
											}}
										>
											<summary
												style={{
													cursor: "pointer",
													fontWeight: 600,
													color: "var(--text)",
													fontSize: 16,
												}}
											>
												{qa.q}
											</summary>
											<p
												style={{
													marginTop: 12,
													color: "var(--subtext)",
													fontSize: 15,
													lineHeight: 1.6,
												}}
											>
												{qa.a}
											</p>
										</details>
									))}
								</div>
							</>
						)}

						{/* Mini CTA */}
						<div
							style={{
								marginTop: 72,
								padding: "40px 32px",
								background:
									"linear-gradient(135deg, var(--mantle), var(--surface0))",
								borderRadius: 16,
								border: "1px solid var(--surface1)",
								textAlign: "center",
							}}
						>
							<h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
								{detail.emoji} {detail.title}&apos;ni dene
							</h3>
							<p style={{ fontSize: 15, color: "var(--subtext)", marginBottom: 24 }}>
								npm üzerinden 30 saniyede kur, hemen kullan.
							</p>
							<div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
								<CopyCmd large />
								<a
									className="btn btn-ghost"
									href="https://github.com/thorrangonak/kanka"
									target="_blank"
									rel="noopener noreferrer"
								>
									GitHub →
								</a>
							</div>
						</div>

						{/* Prev / Next navigation */}
						<nav
							style={{
								marginTop: 56,
								paddingTop: 32,
								borderTop: "1px solid var(--surface1)",
								display: "flex",
								justifyContent: "space-between",
								gap: 16,
								flexWrap: "wrap",
							}}
							aria-label="Özellik gezinme"
						>
							{prev ? (
								<Link
									href={`/ozellikler/${prev}/`}
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 4,
										color: "var(--subtext)",
										textDecoration: "none",
										padding: "12px 18px",
										border: "1px solid var(--surface1)",
										borderRadius: 10,
										minWidth: 200,
									}}
								>
									<span style={{ fontSize: 12, color: "var(--muted)" }}>← Önceki</span>
									<span style={{ fontWeight: 600, color: "var(--text)" }}>
										{FEATURE_DETAILS[prev].emoji} {FEATURE_DETAILS[prev].title}
									</span>
								</Link>
							) : (
								<div />
							)}
							{next ? (
								<Link
									href={`/ozellikler/${next}/`}
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 4,
										color: "var(--subtext)",
										textDecoration: "none",
										padding: "12px 18px",
										border: "1px solid var(--surface1)",
										borderRadius: 10,
										minWidth: 200,
										textAlign: "right",
									}}
								>
									<span style={{ fontSize: 12, color: "var(--muted)" }}>Sonraki →</span>
									<span style={{ fontWeight: 600, color: "var(--text)" }}>
										{FEATURE_DETAILS[next].emoji} {FEATURE_DETAILS[next].title}
									</span>
								</Link>
							) : (
								<div />
							)}
						</nav>

						{/* Tüm özelliklere dön */}
						<div style={{ marginTop: 32, textAlign: "center" }}>
							<Link
								href="/#features"
								style={{
									color: "var(--muted)",
									fontSize: 14,
									textDecoration: "none",
								}}
							>
								← Tüm özelliklere dön
							</Link>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

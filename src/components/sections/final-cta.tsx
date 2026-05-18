import { CopyCmd } from "@/components/parts/copy-cmd";

/**
 * Final CTA — sayfanın en altında, büyük yazı + kopyala + GitHub link.
 */
export function FinalCTA() {
	return (
		<section
			id="cta"
			style={{
				background: "var(--crust)",
				borderTop: "1px solid var(--surface1)",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					background:
						"radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--teal) 18%, transparent), transparent 60%)," +
						"radial-gradient(40% 60% at 80% 100%, color-mix(in oklab, var(--mauve) 14%, transparent), transparent 60%)",
				}}
			/>
			<div
				className="container"
				style={{
					position: "relative",
					textAlign: "center",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 24,
				}}
			>
				<span className="eyebrow">
					<span className="dot" /> v0.5.0 · today
				</span>
				<h2 style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>Hadi başlayalım kanka 🚀</h2>
				<p style={{ fontSize: 18, maxWidth: 560 }}>
					5 dakikada kur, terminal&apos;de Türkçe konuş, üretkenliğin uçar.
				</p>
				<div
					style={{
						display: "flex",
						gap: 14,
						flexWrap: "wrap",
						justifyContent: "center",
						marginTop: 8,
					}}
				>
					<CopyCmd large />
					<a
						className="btn btn-ghost"
						href="https://github.com/thorrangonak/kanka"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
						</svg>
						github.com/thorrangonak/kanka
					</a>
				</div>
			</div>
		</section>
	);
}

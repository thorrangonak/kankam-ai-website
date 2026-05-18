import { CopyCmd } from "@/components/parts/copy-cmd";
import { HeroTerminal } from "@/components/parts/hero-terminal";

/**
 * Hero — sayfanın en üstündeki büyük başlık + animasyonlu terminal.
 */
export function Hero() {
	return (
		<section
			className="hero"
			id="top"
			style={{ paddingTop: 60, paddingBottom: 80, position: "relative" }}
		>
			<div className="hero-bg" />
			<div className="dot-grid" />
			<div className="container" style={{ position: "relative", zIndex: 1 }}>
				<div
					className="hero-grid"
					style={{
						display: "grid",
						gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
						gap: 56,
						alignItems: "center",
					}}
				>
					<div>
						<span className="eyebrow">
							<span className="dot" /> v0.5.0 · pi-coding-agent üstüne
						</span>
						<h1 style={{ marginTop: 18 }}>
							Kanka,
							<br />
							<span style={{ color: "var(--teal)" }}>şunu yapsana.</span>
						</h1>
						<p
							style={{
								fontSize: 19,
								marginTop: 22,
								maxWidth: 540,
								color: "var(--subtext)",
							}}
						>
							Türkçe konuşan terminal kodlama asistanı. Claude · GPT · Gemini destekli,{" "}
							<strong style={{ color: "var(--text)" }}>KVKK uyumlu</strong>,{" "}
							<strong style={{ color: "var(--teal)" }}>%70 daha az token</strong>.
						</p>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: 14,
								marginTop: 30,
								alignItems: "center",
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
								GitHub&apos;da incele
								<span style={{ color: "var(--muted)" }}>→</span>
							</a>
						</div>
						<div
							style={{
								display: "flex",
								gap: 18,
								marginTop: 28,
								color: "var(--muted)",
								fontFamily: "var(--font-mono)",
								fontSize: 12,
								flexWrap: "wrap",
							}}
						>
							<span>node ≥ 20</span>
							<span>·</span>
							<span>macOS · Linux · Windows</span>
							<span>·</span>
							<span>MIT</span>
						</div>
					</div>
					<div>
						<HeroTerminal />
					</div>
				</div>
			</div>
		</section>
	);
}

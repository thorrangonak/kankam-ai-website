import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "kanka — Türkçe konuşan terminal kodlama asistanı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image (1200×630) — Twitter/LinkedIn/Slack/Discord preview.
 * Build-time generate edilir.
 */
export default async function OGImage() {
	// next/og (Satori) JSX kuralları: birden fazla child olan her parent'ın explicit display: flex'i olmalı.
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: 80,
					background: "linear-gradient(135deg, #1e1e2e 0%, #313244 100%)",
					color: "#cdd6f4",
					fontFamily: "Inter, system-ui, sans-serif",
				}}
			>
				{/* Top — branded mark */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						fontSize: 28,
						fontFamily: "JetBrains Mono, monospace",
						fontWeight: 700,
						color: "#94e2d5",
					}}
				>
					<span>{`{ kankam.ai }`}</span>
				</div>

				{/* Center — title */}
				<div
					style={{ display: "flex", flexDirection: "column", gap: 24 }}
				>
					<div
						style={{
							display: "flex",
							fontSize: 112,
							fontWeight: 800,
							lineHeight: 1.05,
							letterSpacing: "-0.025em",
							color: "#cdd6f4",
						}}
					>
						Kanka, şunu yapsana.
					</div>

					<div
						style={{
							display: "flex",
							fontSize: 32,
							color: "#a6adc8",
							lineHeight: 1.4,
							maxWidth: 980,
						}}
					>
						Türkçe konuşan terminal kodlama asistanı. Claude / GPT / Gemini destekli, KVKK uyumlu, %70 daha az token.
					</div>
				</div>

				{/* Bottom — meta */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						fontSize: 22,
						color: "#7f849c",
					}}
				>
					<div style={{ display: "flex", gap: 32 }}>
						<span>🎭 7 persona</span>
						<span>🇹🇷 KVKK skill</span>
						<span>🔌 10+ LLM</span>
						<span>⚡ %70 tasarruf</span>
					</div>
					<div
						style={{
							display: "flex",
							fontFamily: "JetBrains Mono, monospace",
							color: "#94e2d5",
						}}
					>
						kankam.ai
					</div>
				</div>
			</div>
		),
		{ ...size },
	);
}

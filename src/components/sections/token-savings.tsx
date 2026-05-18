"use client";

import { useEffect, useRef, useState } from "react";

const BARS = [
	{ label: "Çıplak Claude", tokens: "180K", cost: "$1.80", pct: 100, color: "var(--red)" },
	{ label: "kanka", tokens: "54K", cost: "$0.45", pct: 30, color: "var(--green)" },
] as const;

const LAYERS = [
	{
		icon: "💾",
		title: "Prompt Cache",
		sub: "Sistem prompt + büyük dosyaları cache'le. Aynı tokenı iki kez ödeme.",
		pct: "−45%",
	},
	{
		icon: "🔒",
		title: "İzole Context",
		sub: "Her subagent kendi mini context'inde çalışır. Şişme yok.",
		pct: "−18%",
	},
	{
		icon: "⚡",
		title: "Paralel Async",
		sub: "Bağımsız görevler aynı anda. 3× wall-clock + daha az retry.",
		pct: "−7%",
	},
] as const;

/**
 * Token tasarrufu — IntersectionObserver ile görünür olunca bar'lar animate olur.
 */
export function TokenSavings() {
	const [animate, setAnimate] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						setAnimate(true);
						observer.unobserve(e.target);
					}
				}
			},
			{ threshold: 0.3 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<section
			id="savings"
			className="bg-mantle"
			style={{
				borderTop: "1px solid var(--surface1)",
				borderBottom: "1px solid var(--surface1)",
			}}
		>
			<div className="container">
				<div className="section-head reveal">
					<span className="eyebrow">
						<span
							className="dot"
							style={{ background: "var(--green)", boxShadow: "0 0 8px var(--green)" }}
						/>{" "}
						Ekonomi
					</span>
					<h2>
						💰 %70 daha az token,{" "}
						<span style={{ color: "var(--green)" }}>%75 daha az maliyet</span>.
					</h2>
					<p>
						Prompt cache + izole context + paralel async. Üç katman, bir sonuç.
					</p>
				</div>

				<div
					id="tk-grid"
					className="reveal grid grid-2"
					style={{ gap: 32, alignItems: "start" }}
				>
					<div
						ref={ref}
						style={{
							background: "var(--base)",
							border: "1px solid var(--surface1)",
							borderRadius: 14,
							padding: 28,
						}}
					>
						<div
							style={{
								fontFamily: "var(--font-mono)",
								fontSize: 12,
								color: "var(--muted)",
								marginBottom: 6,
							}}
						>
							5 dosyalık refactor projesi · benchmark
						</div>
						{BARS.map((b, i) => (
							<div className="bar-row" key={b.label}>
								<div className="bar-label">{b.label}</div>
								<div className="bar-track">
									<div
										className="bar-fill"
										style={{
											width: animate ? `${b.pct}%` : "0%",
											background: b.color,
											transitionDelay: `${i * 250}ms`,
										}}
									>
										{b.tokens} · {b.cost}
									</div>
								</div>
								<div className="bar-meta">{b.pct === 100 ? "baseline" : `−${100 - b.pct}%`}</div>
							</div>
						))}
						<div
							style={{
								marginTop: 18,
								paddingTop: 18,
								borderTop: "1px solid var(--surface1)",
								display: "flex",
								justifyContent: "space-between",
								fontFamily: "var(--font-mono)",
								fontSize: 13,
							}}
						>
							<span style={{ color: "var(--muted)" }}>tasarruf</span>
							<span style={{ color: "var(--green)", fontWeight: 700 }}>
								126K token · $1.35 / proje
							</span>
						</div>
					</div>

					<div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
						{LAYERS.map((l) => (
							<div key={l.title} className="layer">
								<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
									<span className="icon">{l.icon}</span>
									<div style={{ flex: 1 }}>
										<div className="layer-title">{l.title}</div>
										<div className="layer-sub">{l.sub}</div>
									</div>
									<div
										className="pct"
										style={{ color: "var(--green)", fontSize: 16, fontWeight: 700 }}
									>
										{l.pct}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

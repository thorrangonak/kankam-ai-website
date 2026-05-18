/**
 * Sosyal kanıt strip — hero altında ince çizgi, marka/lisans/tagline.
 */
export function SocialProof() {
	return (
		<section
			className="tight bg-mantle"
			style={{
				borderTop: "1px solid var(--surface1)",
				borderBottom: "1px solid var(--surface1)",
			}}
		>
			<div
				className="container"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 24,
					flexWrap: "wrap",
				}}
			>
				<div
					style={{
						display: "flex",
						gap: 28,
						flexWrap: "wrap",
						alignItems: "center",
						color: "var(--muted)",
						fontFamily: "var(--font-mono)",
						fontSize: 13,
					}}
				>
					<span>
						<span style={{ color: "var(--teal)" }}>▸</span> Built on pi-coding-agent
					</span>
					<span>
						<span style={{ color: "var(--mauve)" }}>▸</span> MIT licensed
					</span>
					<span>
						<span style={{ color: "var(--yellow)" }}>▸</span> 10+ LLM provider
					</span>
					<span>
						<span style={{ color: "var(--green)" }}>▸</span> KVKK ready
					</span>
				</div>
				<span style={{ color: "var(--text)", fontWeight: 600, fontSize: 14 }}>
					Türk geliştiriciler için tasarlandı <span style={{ filter: "saturate(1.2)" }}>🇹🇷</span>
				</span>
			</div>
		</section>
	);
}

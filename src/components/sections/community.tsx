import { GOOD_FIRST_ISSUES } from "@/lib/site-data";

const AVATAR_COLORS = [
	"#94e2d5", "#cba6f7", "#f9e2af", "#a6e3a1", "#f38ba8", "#89b4fa",
	"#fab387", "#b4befe", "#f5c2e7", "#74c7ec", "#a6adc8", "#cdd6f4",
];

/**
 * Topluluk bölümü — 3 örnek issue + katkıcı avatarları + CTA butonları.
 */
export function Community() {
	return (
		<section id="contrib">
			<div className="container">
				<div className="section-head reveal">
					<span className="eyebrow">
						<span
							className="dot"
							style={{ background: "var(--mauve)", boxShadow: "0 0 8px var(--mauve)" }}
						/>{" "}
						Topluluk
					</span>
					<h2>Açık kaynak, MIT lisans.</h2>
					<p>
						Persona/skill eklemek sadece markdown. TypeScript şart değil — herkes katkı verebilir.
					</p>
				</div>
				<div
					id="comm-grid"
					className="reveal"
					style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32 }}
				>
					<div>
						<div
							style={{
								fontFamily: "var(--font-mono)",
								fontSize: 12,
								color: "var(--muted)",
								marginBottom: 12,
							}}
						>
							# 3 hazır <span style={{ color: "var(--green)" }}>good-first-issue</span>
						</div>
						<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
							{GOOD_FIRST_ISSUES.map((iss) => (
								<a
									key={iss.number}
									href={`https://github.com/thorrangonak/kanka/issues/${iss.number}`}
									target="_blank"
									rel="noopener noreferrer"
									className="issue"
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											gap: 12,
										}}
									>
										<span className="tag">[{iss.tag}]</span>
										<span
											style={{
												color: "var(--muted)",
												fontSize: 11,
												fontFamily: "var(--font-mono)",
											}}
										>
											#{iss.number}
										</span>
									</div>
									<div className="title">{iss.title}</div>
									<div className="meta">
										{iss.meta.map((m) => (
											<span key={m}>{m}</span>
										))}
									</div>
								</a>
							))}
						</div>
					</div>
					<div
						style={{
							background: "var(--mantle)",
							border: "1px solid var(--surface1)",
							borderRadius: 14,
							padding: 28,
							display: "flex",
							flexDirection: "column",
							gap: 18,
						}}
					>
						<div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
							# contributors
						</div>
						<div style={{ display: "flex", flexWrap: "wrap" }}>
							{AVATAR_COLORS.map((c, i) => (
								<div
									key={c}
									style={{
										width: 38,
										height: 38,
										borderRadius: "50%",
										background: c,
										marginLeft: i === 0 ? 0 : -10,
										border: "2px solid var(--mantle)",
										display: "grid",
										placeItems: "center",
										fontFamily: "var(--font-mono)",
										fontWeight: 700,
										fontSize: 12,
										color: "var(--base)",
									}}
								>
									{String.fromCharCode(65 + i)}
								</div>
							))}
							<div
								style={{
									marginLeft: -10,
									width: 38,
									height: 38,
									borderRadius: "50%",
									background: "var(--surface0)",
									border: "2px solid var(--mantle)",
									display: "grid",
									placeItems: "center",
									fontFamily: "var(--font-mono)",
									fontSize: 11,
									color: "var(--text)",
								}}
							>
								+24
							</div>
						</div>
						<div style={{ height: 1, background: "var(--surface1)" }} />
						<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
							<div style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.6 }}>
								<strong style={{ color: "var(--teal)" }}>İlk persona</strong>&apos;nı yazmak için
								tek ihtiyacın bir{" "}
								<code
									style={{
										fontFamily: "var(--font-mono)",
										background: "var(--crust)",
										padding: "2px 6px",
										borderRadius: 4,
										fontSize: 13,
									}}
								>
									.md
								</code>{" "}
								dosyası. Sistem prompt + 3 örnek diyalog. Hepsi bu.
							</div>
							<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
								<a
									className="btn btn-primary btn-sm"
									href="https://github.com/thorrangonak/kanka/issues"
									target="_blank"
									rel="noopener noreferrer"
								>
									Issue&apos;lara bak
								</a>
								<a
									className="btn btn-ghost btn-sm"
									href="https://github.com/thorrangonak/kanka/blob/main/CONTRIBUTING.md"
									target="_blank"
									rel="noopener noreferrer"
								>
									CONTRIBUTING.md →
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

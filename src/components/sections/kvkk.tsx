import { MacBar } from "@/components/parts/mac-bar";

const CHECKLIST: ReadonlyArray<readonly [string, string]> = [
	["PII masking", "E-posta, TC, telefon — otomatik mask helper"],
	["Retention politikası", "Veri tipi başına saklama süresi + auto-purge"],
	["Veri silme isteği", "GDPR/KVKK silme talebi handler scaffold"],
	["72 saat ihlal bildirimi", "Sızıntı tespit + bildirim akışı pattern"],
];

/**
 * KVKK skill bölümü — önce/sonra kod karşılaştırması, checklist, süre kazancı.
 * Türk dev'ler için **killer feature** vurgusu.
 */
export function KVKK() {
	return (
		<section id="kvkk">
			<div className="container">
				<div className="section-head reveal">
					<span className="eyebrow" style={{ color: "var(--green)" }}>
						<span
							className="dot"
							style={{ background: "var(--green)", boxShadow: "0 0 8px var(--green)" }}
						/>
						Türk dev&apos;ler için killer feature
					</span>
					<h2>🇹🇷 KVKK uyumlu kod yazımı.</h2>
					<p>6698 sayılı kanunla uyumlu pattern&apos;ler. Hiçbir başka agent&apos;ta yok.</p>
				</div>

				<div className="reveal grid grid-2" style={{ gap: 24 }}>
					<div className="win">
						<MacBar title="logger.ts — önce ❌" />
						<pre
							className="code"
							style={{ background: "var(--mantle)", border: "none", borderRadius: 0 }}
						>
							<span style={{ color: "var(--muted)", fontStyle: "italic" }}>
								{"// PII düz log'a basılıyor — KVKK ihlali"}
							</span>
							{"\n"}
							{"log.info("}
							<span style={{ color: "var(--green)" }}>
								{"`User ${user.email} TC: ${user.tc}`"}
							</span>
							{");\n\n"}
							<span style={{ color: "var(--muted)", fontStyle: "italic" }}>
								{'// → "User ali@firma.com TC: 12345678901"\n//   ⚠ veri sızıntısı, denetim cezası riski'}
							</span>
						</pre>
					</div>
					<div
						className="win"
						style={{
							borderColor: "var(--green)",
							boxShadow:
								"0 0 0 1px rgba(166,227,161,.18), 0 12px 40px rgba(166,227,161,.06)",
						}}
					>
						<MacBar title="logger.ts — kanka ile ✅" />
						<pre
							className="code"
							style={{ background: "var(--mantle)", border: "none", borderRadius: 0 }}
						>
							<span style={{ color: "var(--muted)", fontStyle: "italic" }}>
								{"// kanka maskPII helper'ı önerdi"}
							</span>
							{"\n"}
							{"log.info("}
							<span style={{ color: "var(--blue)" }}>maskPII</span>
							{"("}
							<span style={{ color: "var(--green)" }}>
								{"`User ${user.email} TC: ${user.tc}`"}
							</span>
							{"));\n\n"}
							<span style={{ color: "var(--muted)", fontStyle: "italic" }}>
								{'// → "User a***@****.com TC: ***********"\n//   ✓ retention 90g, 72h ihlal bildirim hazır'}
							</span>
						</pre>
					</div>
				</div>

				<div
					id="kvkk-grid"
					className="reveal"
					style={{
						marginTop: 32,
						display: "grid",
						gridTemplateColumns: "1.1fr 1fr",
						gap: 28,
					}}
				>
					<ul className="checklist">
						{CHECKLIST.map(([title, desc]) => (
							<li key={title}>
								<span className="check">✓</span>
								<div>
									<div style={{ fontWeight: 600 }}>{title}</div>
									<div style={{ color: "var(--muted)", fontSize: 13 }}>{desc}</div>
								</div>
							</li>
						))}
					</ul>
					<div
						style={{
							background: "var(--mantle)",
							border: "1px solid var(--surface1)",
							borderRadius: 14,
							padding: 24,
							display: "flex",
							flexDirection: "column",
							gap: 14,
						}}
					>
						<div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
							karşılaştırma
						</div>
						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
							<div>
								<div
									style={{
										fontSize: 28,
										fontWeight: 800,
										color: "var(--red)",
										fontFamily: "var(--font-mono)",
									}}
								>
									4–6 saat
								</div>
								<div style={{ color: "var(--muted)", fontSize: 13 }}>
									Manuel araştırma + denetçi konsültasyonu
								</div>
							</div>
							<div>
								<div
									style={{
										fontSize: 28,
										fontWeight: 800,
										color: "var(--green)",
										fontFamily: "var(--font-mono)",
									}}
								>
									~ 1 dk
								</div>
								<div style={{ color: "var(--muted)", fontSize: 13 }}>
									<span className="mono" style={{ color: "var(--teal)" }}>
										/skill kvkk
									</span>{" "}
									ile pattern hazır
								</div>
							</div>
						</div>
						<div style={{ height: 1, background: "var(--surface1)" }} />
						<div style={{ fontSize: 14, color: "var(--subtext)" }}>
							&quot;Saatler süren araştırma → 1 dakikalık skill çağrısı. Yasal pattern&apos;ler
							kanka&apos;nın hafızasında.&quot;
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

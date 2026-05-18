"use client";

import { useState } from "react";
import { PERSONAS, type Persona } from "@/lib/site-data";
import { MacBar } from "@/components/parts/mac-bar";

/**
 * Persona switcher — 7 personaya tıklanarak aynı sorunun farklı cevabı görülür.
 * Cache'lenmiş örnek cevaplar (gerçek API call yok).
 */
export function PersonaDemo() {
	const [activeId, setActiveId] = useState<string>("kanka");
	const [question, setQuestion] = useState<string>("Recursive fonksiyon nedir?");

	const persona: Persona = PERSONAS.find((p) => p.id === activeId) ?? PERSONAS[0];

	return (
		<section
			id="personas"
			className="bg-mantle"
			style={{
				borderTop: "1px solid var(--surface1)",
				borderBottom: "1px solid var(--surface1)",
			}}
		>
			<div className="container">
				<div className="section-head reveal">
					<span className="eyebrow">
						<span className="dot" /> Persona sistemi
					</span>
					<h2>
						Aynı soru, farklı kişilik —{" "}
						<span style={{ color: "var(--teal)" }}>anında değişir</span>.
					</h2>
					<p>
						Bir komutla tonalite değişir. Kod kalitesi aynı, ama nasıl konuşulduğu sana kalmış.
					</p>
				</div>

				<div
					id="persona-grid"
					className="reveal"
					style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 32 }}
				>
					{/* Sol: persona listesi + soru input */}
					<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
						<div>
							<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
								{PERSONAS.map((p) => (
									<button
										key={p.id}
										type="button"
										className={`persona-pill ${activeId === p.id ? "active" : ""}`}
										onClick={() => setActiveId(p.id)}
										aria-pressed={activeId === p.id}
									>
										<span style={{ fontSize: 18 }}>{p.emoji}</span>
										<span>/{p.name}</span>
									</button>
								))}
							</div>
							<div
								style={{
									marginTop: 16,
									color: "var(--muted)",
									fontFamily: "var(--font-mono)",
									fontSize: 12,
								}}
							>
								aktif:{" "}
								<span style={{ color: `var(--${persona.color})` }}>/{persona.name}</span> —{" "}
								{persona.tag}
							</div>
						</div>

						<div>
							<label
								htmlFor="persona-question"
								style={{
									display: "block",
									fontFamily: "var(--font-mono)",
									fontSize: 12,
									color: "var(--muted)",
									marginBottom: 8,
								}}
							>
								Soru (sen değiştir)
							</label>
							<div
								style={{
									background: "var(--crust)",
									border: "1px solid var(--surface1)",
									borderRadius: 10,
									padding: "12px 14px",
									display: "flex",
									alignItems: "center",
									gap: 10,
								}}
							>
								<span style={{ color: "var(--teal)", fontFamily: "var(--font-mono)" }}>
									{">"}
								</span>
								<input
									id="persona-question"
									value={question}
									onChange={(e) => setQuestion(e.target.value)}
									style={{
										flex: 1,
										background: "transparent",
										border: "none",
										outline: "none",
										color: "var(--text)",
										fontFamily: "var(--font-mono)",
										fontSize: 14,
									}}
								/>
							</div>
							<div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
								* Demo: 7 örnek cevap önceden hazır. Gerçek kanka her soruyu işler.
							</div>
						</div>

						<div
							style={{
								background: "var(--crust)",
								border: "1px dashed var(--surface1)",
								borderRadius: 10,
								padding: "14px 16px",
								color: "var(--subtext)",
								fontSize: 13,
								lineHeight: 1.6,
							}}
						>
							<strong style={{ color: "var(--text)" }}>
								Persona = tonalite + sistem prompt + örnek diyalog.
							</strong>{" "}
							Markdown&apos;la kendi personanı yazabilirsin — TypeScript şart değil.
						</div>
					</div>

					{/* Sağ: mock terminal */}
					<div className="win" key={persona.id} style={{ animation: "fadein .35s ease" }}>
						<MacBar title={`kanka • ${persona.name}@local`} />
						<div className="win-body" style={{ minHeight: 360 }}>
							{persona.answer.map((l, i) => {
								if (l.type === "prompt") {
									return (
										<div key={`${persona.id}-${i}`} className="t-line">
											<span className="term-prompt">{"> "}</span>
											{question.trim() || (l.text ?? "").replace(/^>\s*/, "")}
										</div>
									);
								}
								if (l.type === "sep") {
									return (
										<div key={`${persona.id}-${i}`} className="t-line t-dim">
											{"─".repeat(40)}
										</div>
									);
								}
								return (
									<div key={`${persona.id}-${i}`} className={`t-line ${l.cls ?? ""}`}>
										{l.text || "\u00a0"}
									</div>
								);
							})}
							<div className="t-line t-dim" style={{ marginTop: 12 }}>
								{"─".repeat(40)}
							</div>
							<div className="t-line" style={{ fontSize: 12, color: "var(--muted)" }}>
								{persona.id} · 1.4K token · cache hit %78 · &lt; 1.2s
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

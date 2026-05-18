import { PROVIDERS } from "@/lib/site-data";
import { MacBar } from "@/components/parts/mac-bar";

/**
 * 10+ LLM provider grid'i + giriş/.env örnekleri.
 */
export function ProviderGrid() {
	return (
		<section id="providers">
			<div className="container">
				<div className="section-head reveal">
					<span className="eyebrow">
						<span
							className="dot"
							style={{ background: "var(--blue)", boxShadow: "0 0 8px var(--blue)" }}
						/>{" "}
						Esneklik
					</span>
					<h2>🔌 İstediğin LLM&apos;i bağla.</h2>
					<p>
						10+ provider, tek arayüz. Vendor lock-in yok — yarın daha iyisi çıkarsa{" "}
						<span className="mono" style={{ color: "var(--teal)" }}>
							/giriş
						</span>{" "}
						ile geç.
					</p>
				</div>

				<div className="grid grid-5 reveal" style={{ gap: 14 }}>
					{PROVIDERS.map((p) => (
						<div key={p.name} className="provider">
							<div className="glyph" style={{ background: p.bg }}>
								{p.glyph}
							</div>
							<div className="name">{p.name}</div>
							<div className="model">{p.model}</div>
						</div>
					))}
				</div>

				<div
					id="prov-grid"
					className="reveal"
					style={{
						marginTop: 36,
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 18,
					}}
				>
					<div className="win">
						<MacBar title="terminal" />
						<div className="win-body">
							<div className="t-line">
								<span className="term-prompt">{"> "}</span>/giriş
							</div>
							<div className="t-line t-dim">─ provider seçin ─</div>
							<div className="t-line">
								[1] Claude <span className="t-dim"> · Opus 4.7</span>
							</div>
							<div className="t-line">
								[2] GPT <span className="t-dim"> · gpt-5-turbo</span>
							</div>
							<div className="t-line t-accent">
								[3] Gemini <span className="t-dim"> · 2.5 Pro ◀ aktif</span>
							</div>
							<div className="t-line">
								[4] Ollama <span className="t-dim"> · local (ücretsiz)</span>
							</div>
							<div className="t-line">
								<span className="term-prompt">{"> "}</span>3<span className="term-cursor" />
							</div>
						</div>
					</div>
					<div className="win">
						<MacBar title=".env" />
						<pre
							className="code"
							style={{ background: "var(--mantle)", border: "none", borderRadius: 0 }}
						>
							{`# kanka tek satırla provider geçer
KANKA_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-...

# veya local model
KANKA_PROVIDER=ollama
KANKA_OLLAMA_MODEL=qwen2.5-coder:32b`}
						</pre>
					</div>
				</div>
			</div>
		</section>
	);
}

"use client";

import { useState } from "react";

interface MultiLine {
	p: string;
	t: string;
}

interface Step {
	title: string;
	cmd?: string;
	multi?: MultiLine[];
	tail: string;
}

const STEPS: readonly Step[] = [
	{
		title: "Yükle",
		cmd: "npm install -g @thorrangonak/kanka",
		tail: "node ≥ 20 · ~12 MB · MIT lisans",
	},
	{
		title: "Giriş yap",
		multi: [
			{ p: "$", t: "kanka" },
			{ p: ">", t: "/giriş" },
		],
		tail: "Anthropic OAuth, .env API key, veya Ollama local",
	},
	{
		title: "Konuş",
		multi: [{ p: ">", t: "Bana NextJS landing page yap" }],
		tail: "İlk projen Türkçe komutla, 30 saniyede.",
	},
];

function CopyBtnSmall({ text }: { text: string }) {
	const [ok, setOk] = useState(false);
	return (
		<button
			type="button"
			onClick={() => {
				navigator.clipboard?.writeText(text).catch(() => {});
				setOk(true);
				setTimeout(() => setOk(false), 1400);
			}}
			style={{
				background: "transparent",
				color: ok ? "var(--green)" : "var(--muted)",
				border: "1px solid var(--surface1)",
				borderRadius: 8,
				padding: "6px 10px",
				fontFamily: "var(--font-mono)",
				fontSize: 11,
				cursor: "pointer",
				display: "inline-flex",
				alignItems: "center",
				gap: 6,
			}}
			aria-label={ok ? "Kopyalandı" : "Kopyala"}
		>
			{ok ? "✓ kopyalandı" : "kopyala"}
		</button>
	);
}

/**
 * Kurulum — 3 adım, terminal mock'larıyla.
 */
export function Quickstart() {
	return (
		<section
			id="install"
			className="bg-mantle"
			style={{
				borderTop: "1px solid var(--surface1)",
				borderBottom: "1px solid var(--surface1)",
			}}
		>
			<div className="container">
				<div className="section-head reveal">
					<span className="eyebrow">
						<span className="dot" /> Kurulum
					</span>
					<h2>30 saniyede başla.</h2>
					<p>Üç adım. Hiçbiri 10 saniyeden uzun değil.</p>
				</div>
				<div id="qs-grid" className="grid grid-3 reveal">
					{STEPS.map((s, i) => {
						const copyText = s.cmd ?? (s.multi ?? []).map((m) => `${m.p} ${m.t}`).join("\n");
						return (
							<div key={s.title} className="step">
								<div className="num">adım {String(i + 1).padStart(2, "0")} / 03</div>
								<h3>
									<span className="stepidx">{`0${i + 1}`}</span>
									{s.title}
								</h3>
								<div
									style={{
										background: "var(--crust)",
										border: "1px solid var(--surface1)",
										borderRadius: 10,
										padding: "14px 16px",
										fontFamily: "var(--font-mono)",
										fontSize: 14,
										lineHeight: 1.7,
									}}
								>
									{s.cmd && (
										<div className="t-line">
											<span style={{ color: "var(--green)" }}>$ </span>
											{s.cmd.includes("@thorrangonak/kanka") ? (
												<>
													npm install <span style={{ color: "var(--peach)" }}>-g</span>{" "}
													<span style={{ color: "var(--mauve)" }}>@thorrangonak/kanka</span>
												</>
											) : (
												s.cmd
											)}
										</div>
									)}
									{s.multi?.map((m, j) => (
										<div className="t-line" key={`${s.title}-${j}`}>
											<span style={{ color: m.p === "$" ? "var(--green)" : "var(--teal)" }}>
												{m.p}{" "}
											</span>
											{m.t}
										</div>
									))}
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										gap: 12,
									}}
								>
									<div style={{ fontSize: 12, color: "var(--muted)" }}>{s.tail}</div>
									<CopyBtnSmall text={copyText} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

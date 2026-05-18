"use client";

import { useEffect, useState } from "react";
import { HERO_LINES, type HeroLine } from "@/lib/site-data";
import { MacBar } from "./mac-bar";

function TermLine({ ln }: { ln: HeroLine }) {
	if (ln.kind === "in") {
		return (
			<div className="t-line">
				<span className="term-prompt">{"> "}</span>
				{ln.text}
			</div>
		);
	}
	if (ln.kind === "meta") return <div className="t-line t-dim">{ln.text}</div>;
	if (ln.kind === "ok") return <div className="t-line t-good">{ln.text}</div>;
	if (ln.kind === "out") return <div className="t-line">{ln.text || "\u00a0"}</div>;
	if (ln.kind === "link")
		return (
			<div className="t-line t-info" style={{ textDecoration: "underline" }}>
				{ln.text}
			</div>
		);
	if (ln.kind === "stat") return <div className="t-line t-accent">{ln.text}</div>;
	return <div className="t-line">{ln.text}</div>;
}

/**
 * Hero animasyonlu terminal — Türkçe oturum tipler:
 *   - typewriter ile kullanıcı sorusu
 *   - subagent meta satırları
 *   - başarılı dosya oluşturma
 *   - final çıktı + benchmark istatistikleri
 */
export function HeroTerminal() {
	const [shown, setShown] = useState(0);
	const [typed, setTyped] = useState("");
	const [done, setDone] = useState(false);
	const [generation, setGeneration] = useState(0);

	useEffect(() => {
		if (shown >= HERO_LINES.length) {
			setDone(true);
			return;
		}
		const line = HERO_LINES[shown];

		if (line.kind === "in") {
			// Typewriter — karakter karakter
			let i = 0;
			const id = setInterval(() => {
				i++;
				setTyped(line.text.slice(0, i));
				if (i >= line.text.length) {
					clearInterval(id);
					setTimeout(() => {
						setTyped("");
						setShown((s) => s + 1);
					}, 360);
				}
			}, line.delay);
			return () => clearInterval(id);
		}

		// Diğer satırlar — sabit gecikme
		const t = setTimeout(() => setShown((s) => s + 1), 220 + line.delay * 8);
		return () => clearTimeout(t);
	}, [shown, generation]);

	const restart = () => {
		setShown(0);
		setTyped("");
		setDone(false);
		setGeneration((g) => g + 1);
	};

	const currentLine = shown < HERO_LINES.length ? HERO_LINES[shown] : null;

	return (
		<div className="win float" style={{ width: "100%", position: "relative" }}>
			<MacBar title="~/projects/landing — kanka" />
			<div className="win-body" style={{ minHeight: 360 }}>
				{HERO_LINES.slice(0, shown).map((ln, i) => (
					<TermLine key={`${generation}-${i}`} ln={ln} />
				))}
				{currentLine?.kind === "in" && (
					<div className="t-line">
						<span className="term-prompt">{"> "}</span>
						<span>{typed}</span>
						<span className="term-cursor" />
					</div>
				)}
				{done && (
					<button
						type="button"
						onClick={restart}
						className="hero-replay"
						aria-label="Animasyonu tekrar oynat"
					>
						↻ tekrar oynat
					</button>
				)}
			</div>
		</div>
	);
}

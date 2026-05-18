import { PERSONAS, PROVIDERS, SUBAGENTS } from "@/lib/site-data";

/**
 * Her feature kartında küçük mini-önizleme.
 * `previewKind` → uygun preview component'i.
 */
export function FeaturePreview({ kind }: { kind: string }) {
	switch (kind) {
		case "persona-chips":
			return (
				<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
					{PERSONAS.map((p) => (
						<span key={p.id} className="chip">
							/{p.name}
						</span>
					))}
				</div>
			);

		case "journal":
			return (
				<pre style={{ margin: 0, fontSize: 11, color: "var(--subtext)" }}>
					{`# 2026-05-17  @api  #refactor\n✓ Token cache devre dışı\n↳ Sebep: race condition`}
				</pre>
			);

		case "terminal-tab":
			return (
				<div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
					<div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
						<span style={{ color: "var(--muted)" }}>▶</span>
						<span style={{ color: "var(--teal)" }}>kanka • build (%62)</span>
					</div>
					<div
						style={{
							background: "var(--mantle)",
							border: "1px solid var(--surface1)",
							borderLeft: "2px solid var(--green)",
							borderRadius: 6,
							padding: "6px 8px",
							fontSize: 11,
							color: "var(--text)",
						}}
					>
						✓ Tests passed (24/24)
					</div>
				</div>
			);

		case "update-check":
			return (
				<div style={{ fontSize: 11 }}>
					<div style={{ color: "var(--muted)" }}>
						$ kanka <span style={{ color: "var(--peach)" }}>--check</span>
					</div>
					<div style={{ color: "var(--text)" }}>
						v2.4.1 → <span style={{ color: "var(--green)" }}>v2.5.0</span> available
					</div>
					<div style={{ color: "var(--teal)" }}>{"> /güncelle"}</div>
				</div>
			);

		case "subagent-chips":
			return (
				<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
					{SUBAGENTS.map((s) => (
						<span key={s} className="chip" style={{ color: "var(--teal)" }}>
							{s}
						</span>
					))}
				</div>
			);

		case "chain-pipeline":
			return (
				<pre style={{ margin: 0, fontSize: 11, color: "var(--subtext)" }}>
					{`plan ──┬──> isci.A  ✓\n       ├──> isci.B  ✓\n       └──> isci.C  ▮▮▮  72%`}
				</pre>
			);

		case "token-bar":
			return (
				<div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
					<div
						style={{
							flex: 1,
							height: 8,
							background: "var(--surface0)",
							borderRadius: 4,
							overflow: "hidden",
						}}
					>
						<div style={{ width: "30%", height: "100%", background: "var(--green)" }} />
					</div>
					<span style={{ fontSize: 11, color: "var(--green)" }}>54K / 180K</span>
				</div>
			);

		case "provider-chips":
			return (
				<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
					{[...PROVIDERS.slice(0, 7).map((p) => p.name), `+${PROVIDERS.length - 7}`].map((p) => (
						<span key={p} className="chip">
							{p}
						</span>
					))}
				</div>
			);

		default:
			return null;
	}
}

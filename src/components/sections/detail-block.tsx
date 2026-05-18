import type { DetailBlock, TerminalLine } from "@/lib/features-detail";
import { MacBar } from "@/components/parts/mac-bar";

/**
 * Detay sayfasındaki tek bir bloğun render edilmesi.
 * 10 farklı block type'ı destekler.
 */
export function DetailBlockRenderer({ block }: { block: DetailBlock }) {
	switch (block.kind) {
		case "heading":
			return renderHeading(block);
		case "paragraph":
			return (
				<p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--subtext)", marginTop: 16 }}>
					{block.text}
				</p>
			);
		case "list":
			return renderList(block);
		case "code":
			return renderCode(block);
		case "terminal":
			return renderTerminal(block);
		case "table":
			return renderTable(block);
		case "callout":
			return renderCallout(block);
		case "kbd-list":
			return renderKbdList(block);
		case "stat-grid":
			return renderStatGrid(block);
		case "comparison":
			return renderComparison(block);
	}
}

function renderHeading(block: Extract<DetailBlock, { kind: "heading" }>) {
	const id = block.id ?? slugify(block.text);
	if (block.level === 2) {
		return (
			<h2
				id={id}
				style={{
					fontSize: 32,
					fontWeight: 700,
					marginTop: 56,
					marginBottom: 8,
					letterSpacing: "-0.01em",
					scrollMarginTop: 80,
				}}
			>
				<a
					href={`#${id}`}
					style={{
						color: "inherit",
						textDecoration: "none",
					}}
					className="anchor-link"
				>
					{block.text}
				</a>
			</h2>
		);
	}
	return (
		<h3
			id={id}
			style={{
				fontSize: 22,
				fontWeight: 600,
				marginTop: 32,
				marginBottom: 4,
				color: "var(--text)",
				scrollMarginTop: 80,
			}}
		>
			{block.text}
		</h3>
	);
}

function renderList(block: Extract<DetailBlock, { kind: "list" }>) {
	const style = block.style ?? "bullet";
	if (style === "numbered") {
		return (
			<ol style={{ marginTop: 16, paddingLeft: 28, color: "var(--subtext)", fontSize: 16, lineHeight: 1.8 }}>
				{block.items.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ol>
		);
	}
	if (style === "check") {
		return (
			<ul
				style={{
					marginTop: 16,
					listStyle: "none",
					padding: 0,
					display: "flex",
					flexDirection: "column",
					gap: 10,
				}}
			>
				{block.items.map((item) => (
					<li
						key={item}
						style={{
							display: "flex",
							gap: 12,
							alignItems: "flex-start",
							color: "var(--subtext)",
							fontSize: 16,
							lineHeight: 1.6,
						}}
					>
						<span style={{ color: "var(--green)", fontWeight: 700, marginTop: 1 }}>✓</span>
						<span>{item}</span>
					</li>
				))}
			</ul>
		);
	}
	return (
		<ul style={{ marginTop: 16, paddingLeft: 24, color: "var(--subtext)", fontSize: 16, lineHeight: 1.8 }}>
			{block.items.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>
	);
}

function renderCode(block: Extract<DetailBlock, { kind: "code" }>) {
	return (
		<div style={{ marginTop: 20 }}>
			{block.title && (
				<div
					style={{
						fontFamily: "var(--font-mono)",
						fontSize: 12,
						color: "var(--muted)",
						background: "var(--surface0)",
						padding: "8px 14px",
						borderRadius: "10px 10px 0 0",
						borderBottom: "1px solid var(--surface1)",
					}}
				>
					{block.title}
					{block.lang && (
						<span style={{ marginLeft: 12, color: "var(--surface2)" }}>· {block.lang}</span>
					)}
				</div>
			)}
			<pre
				className="code"
				style={{
					margin: 0,
					borderRadius: block.title ? "0 0 10px 10px" : 10,
					background: "var(--mantle)",
					border: "1px solid var(--surface1)",
					padding: "16px 18px",
					overflowX: "auto",
					fontSize: 13,
					lineHeight: 1.6,
					color: "var(--text)",
				}}
			>
				<code>{block.code}</code>
			</pre>
		</div>
	);
}

function renderTerminal(block: Extract<DetailBlock, { kind: "terminal" }>) {
	return (
		<div className="win" style={{ marginTop: 20 }}>
			<MacBar title={block.title} />
			<div className="win-body" style={{ fontSize: 13, lineHeight: 1.6 }}>
				{block.lines.map((line, i) => (
					<TermLineRender key={i} line={line} />
				))}
			</div>
		</div>
	);
}

function TermLineRender({ line }: { line: TerminalLine }) {
	const cls = line.cls ? `t-${line.cls}` : "";
	return (
		<div className={`t-line ${cls}`}>
			{line.prefix && (
				<span
					style={{
						marginRight: 6,
						color:
							line.prefix === ">" || line.prefix === "$"
								? "var(--teal)"
								: line.prefix === "✓"
								? "var(--green)"
								: line.prefix === "✗"
								? "var(--red)"
								: line.prefix === "↳" || line.prefix === "→"
								? "var(--muted)"
								: "var(--accent)",
					}}
				>
					{line.prefix}
				</span>
			)}
			{line.text || "\u00a0"}
		</div>
	);
}

function renderTable(block: Extract<DetailBlock, { kind: "table" }>) {
	return (
		<div
			style={{
				marginTop: 20,
				overflowX: "auto",
				border: "1px solid var(--surface1)",
				borderRadius: 12,
				background: "var(--mantle)",
			}}
		>
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					fontSize: 14,
				}}
			>
				<thead>
					<tr style={{ background: "var(--surface0)" }}>
						{block.headers.map((h) => (
							<th
								key={h}
								style={{
									padding: "12px 16px",
									textAlign: "left",
									color: "var(--text)",
									fontWeight: 600,
									borderBottom: "1px solid var(--surface1)",
								}}
							>
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{block.rows.map((row, i) => (
						<tr key={i} style={{ borderBottom: i < block.rows.length - 1 ? "1px solid var(--surface0)" : "none" }}>
							{row.map((cell, j) => (
								<td
									key={j}
									style={{
										padding: "12px 16px",
										color: j === 0 ? "var(--text)" : "var(--subtext)",
										verticalAlign: "top",
										fontWeight: j === 0 ? 500 : 400,
									}}
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function renderCallout(block: Extract<DetailBlock, { kind: "callout" }>) {
	const colorMap = {
		info: { bg: "rgba(137, 180, 250, 0.08)", border: "var(--blue)", icon: "ℹ" },
		warning: { bg: "rgba(249, 226, 175, 0.08)", border: "var(--yellow)", icon: "⚠" },
		success: { bg: "rgba(166, 227, 161, 0.08)", border: "var(--green)", icon: "✓" },
		tip: { bg: "rgba(148, 226, 213, 0.08)", border: "var(--teal)", icon: "💡" },
	};
	const c = colorMap[block.variant];
	return (
		<div
			style={{
				marginTop: 20,
				padding: "16px 20px",
				background: c.bg,
				borderLeft: `3px solid ${c.border}`,
				borderRadius: "0 10px 10px 0",
				display: "flex",
				gap: 14,
				alignItems: "flex-start",
			}}
		>
			<div style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}>{c.icon}</div>
			<div style={{ flex: 1 }}>
				{block.title && (
					<div
						style={{
							fontWeight: 600,
							color: "var(--text)",
							marginBottom: 4,
							fontSize: 15,
						}}
					>
						{block.title}
					</div>
				)}
				<div style={{ color: "var(--subtext)", fontSize: 14, lineHeight: 1.6 }}>{block.text}</div>
			</div>
		</div>
	);
}

function renderKbdList(block: Extract<DetailBlock, { kind: "kbd-list" }>) {
	return (
		<div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
			{block.commands.map((c) => (
				<div
					key={c.cmd}
					style={{
						display: "grid",
						gridTemplateColumns: "minmax(180px, max-content) 1fr",
						gap: 16,
						alignItems: "center",
						padding: "10px 14px",
						background: "var(--mantle)",
						border: "1px solid var(--surface1)",
						borderRadius: 8,
					}}
				>
					<code
						style={{
							fontFamily: "var(--font-mono)",
							fontSize: 13,
							color: "var(--teal)",
							background: "var(--crust)",
							padding: "4px 10px",
							borderRadius: 6,
							border: "1px solid var(--surface0)",
							whiteSpace: "nowrap",
						}}
					>
						{c.cmd}
					</code>
					<span style={{ color: "var(--subtext)", fontSize: 14 }}>{c.desc}</span>
				</div>
			))}
		</div>
	);
}

function renderStatGrid(block: Extract<DetailBlock, { kind: "stat-grid" }>) {
	return (
		<div
			className="stat-grid"
			style={{
				marginTop: 24,
				display: "grid",
				gridTemplateColumns: `repeat(${Math.min(block.stats.length, 4)}, 1fr)`,
				gap: 12,
			}}
		>
			{block.stats.map((s) => (
				<div
					key={s.label}
					style={{
						background: "var(--mantle)",
						border: "1px solid var(--surface1)",
						borderRadius: 12,
						padding: 20,
						textAlign: "center",
					}}
				>
					<div
						style={{
							fontFamily: "var(--font-mono)",
							fontSize: 32,
							fontWeight: 800,
							color: s.color ?? "var(--teal)",
							lineHeight: 1,
						}}
					>
						{s.value}
					</div>
					<div
						style={{
							marginTop: 8,
							fontSize: 13,
							color: "var(--muted)",
						}}
					>
						{s.label}
					</div>
				</div>
			))}
		</div>
	);
}

function renderComparison(block: Extract<DetailBlock, { kind: "comparison" }>) {
	/* comparison-grid class'ı ile responsive override yapılır */
	const renderSide = (side: typeof block.left) => (
		<div
			style={{
				background: "var(--mantle)",
				border: "1px solid var(--surface1)",
				borderTop: `3px solid var(--${side.color})`,
				borderRadius: 12,
				padding: 24,
			}}
		>
			<div
				style={{
					fontWeight: 700,
					color: `var(--${side.color})`,
					fontSize: 18,
					marginBottom: 4,
				}}
			>
				{side.title}
			</div>
			{side.subtitle && (
				<div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 12 }}>{side.subtitle}</div>
			)}
			<ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
				{side.bullets.map((b) => (
					<li
						key={b}
						style={{
							color: "var(--subtext)",
							fontSize: 14,
							lineHeight: 1.5,
							paddingLeft: 16,
							position: "relative",
						}}
					>
						<span
							style={{
								position: "absolute",
								left: 0,
								color: `var(--${side.color})`,
							}}
						>
							›
						</span>
						{b}
					</li>
				))}
			</ul>
		</div>
	);

	return (
		<div
			style={{
				marginTop: 20,
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 16,
			}}
			className="comparison-grid"
		>
			{renderSide(block.left)}
			{renderSide(block.right)}
		</div>
	);
}

function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/ı/g, "i")
		.replace(/ş/g, "s")
		.replace(/ğ/g, "g")
		.replace(/ü/g, "u")
		.replace(/ö/g, "o")
		.replace(/ç/g, "c")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

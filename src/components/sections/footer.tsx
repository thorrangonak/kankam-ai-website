import { Logo } from "@/components/parts/logo";
import { CopyCmd } from "@/components/parts/copy-cmd";

interface FooterColumn {
	heading: string;
	items: Array<{ label: string; href: string; external?: boolean }>;
}

const COLUMNS: readonly FooterColumn[] = [
	{
		heading: "Ürün",
		items: [
			{ label: "Özellikler", href: "#features" },
			{ label: "Personas", href: "#personas" },
			{ label: "Roadmap", href: "https://github.com/thorrangonak/kanka/blob/main/ROADMAP.md", external: true },
			{ label: "Changelog", href: "https://github.com/thorrangonak/kanka/releases", external: true },
		],
	},
	{
		heading: "Geliştirici",
		items: [
			{ label: "Docs", href: "https://github.com/thorrangonak/kanka#readme", external: true },
			{ label: "GitHub", href: "https://github.com/thorrangonak/kanka", external: true },
			{ label: "npm", href: "https://www.npmjs.com/package/@thorrangonak/kanka", external: true },
		],
	},
	{
		heading: "Topluluk",
		items: [
			{ label: "Discussions", href: "https://github.com/thorrangonak/kanka/discussions", external: true },
			{ label: "Issues", href: "https://github.com/thorrangonak/kanka/issues", external: true },
			{ label: "Katkı Yap", href: "https://github.com/thorrangonak/kanka/blob/main/CONTRIBUTING.md", external: true },
		],
	},
	{
		heading: "Hakkında",
		items: [
			{ label: "Lisans", href: "https://github.com/thorrangonak/kanka/blob/main/LICENSE", external: true },
			{ label: "İletişim", href: "mailto:hi@kankam.ai", external: true },
		],
	},
];

/**
 * Footer — logo + slogan + npm install + 4 link sütunu + alt bar.
 */
export function Footer() {
	return (
		<footer>
			<div className="container">
				<div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 32 }}>
					<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
						<Logo />
						<p style={{ fontSize: 14, maxWidth: 280, margin: 0 }}>
							Türkçe konuşan terminal kodlama asistanı.{" "}
							<span style={{ color: "var(--teal)" }}>pi-coding-agent</span> üstüne inşa edildi.
						</p>
						<CopyCmd />
					</div>
					{COLUMNS.map((col) => (
						<div key={col.heading}>
							<h4>{col.heading}</h4>
							<ul
								style={{
									listStyle: "none",
									padding: 0,
									margin: 0,
									display: "flex",
									flexDirection: "column",
									gap: 10,
								}}
							>
								{col.items.map((item) => (
									<li key={item.label}>
										<a
											href={item.href}
											target={item.external ? "_blank" : undefined}
											rel={item.external ? "noopener noreferrer" : undefined}
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div
					style={{
						marginTop: 56,
						paddingTop: 24,
						borderTop: "1px solid var(--surface1)",
						display: "flex",
						justifyContent: "space-between",
						gap: 20,
						flexWrap: "wrap",
						color: "var(--muted)",
						fontSize: 13,
					}}
				>
					<span>
						Built with <span style={{ color: "var(--red)" }}>♥</span> in Türkiye 🇹🇷 · Powered by{" "}
						<span style={{ color: "var(--teal)" }}>pi-coding-agent</span>
					</span>
					<span style={{ fontFamily: "var(--font-mono)" }}>
						MIT © thorrangonak · {new Date().getFullYear()}
					</span>
				</div>
			</div>
		</footer>
	);
}

import Link from "next/link";
import { Heart } from "lucide-react";
import { GithubIcon } from "@/components/icons";

const FOOTER_LINKS: Record<string, Array<{ href: string; label: string; external?: boolean }>> = {
	Ürün: [
		{ href: "#ozellikler", label: "Özellikler" },
		{ href: "#personas", label: "Personalar" },
		{ href: "#kvkk", label: "KVKK Uyumu" },
		{ href: "https://github.com/thorrangonak/kanka/blob/main/ROADMAP.md", label: "Yol Haritası", external: true },
	],
	Geliştirici: [
		{ href: "https://github.com/thorrangonak/kanka#readme", label: "Dokümantasyon", external: true },
		{ href: "https://www.npmjs.com/package/@thorrangonak/kanka", label: "npm", external: true },
		{ href: "https://github.com/thorrangonak/kanka/releases", label: "Sürümler", external: true },
		{ href: "https://github.com/thorrangonak/kanka/blob/main/CONTRIBUTING.md", label: "Katkı Yap", external: true },
	],
	Topluluk: [
		{ href: "https://github.com/thorrangonak/kanka/discussions", label: "Tartışmalar", external: true },
		{ href: "https://github.com/thorrangonak/kanka/issues", label: "Issue'lar", external: true },
		{ href: "https://github.com/thorrangonak/kanka", label: "GitHub", external: true },
	],
	Hakkında: [
		{ href: "#felsefe", label: "Felsefe" },
		{ href: "https://github.com/thorrangonak/kanka/blob/main/LICENSE", label: "MIT Lisansı", external: true },
		{ href: "mailto:hi@kankam.ai", label: "İletişim", external: true },
	],
};

export function Footer() {
	return (
		<footer className="border-t border-border bg-surface/30 mt-24">
			<div className="container-kanka py-12 lg:py-16">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-8">
					{/* Marka */}
					<div className="col-span-2">
						<Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold mb-3">
							<span aria-hidden className="text-accent">{"{"}</span>
							<span>
								<span className="text-foreground">kanka</span>
								<span className="text-foreground-subtle">m</span>
								<span className="text-accent">.ai</span>
							</span>
							<span aria-hidden className="text-accent">{"}"}</span>
						</Link>
						<p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
							Türkçe konuşan terminal kodlama asistanı. Açık kaynak, MIT lisanslı.
							<br />
							<em>"Kanka, şunu yapsana."</em>
						</p>
						<div className="mt-4 flex items-center gap-2">
							<a
								href="https://github.com/thorrangonak/kanka"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface text-sm text-foreground-muted hover:text-foreground hover:bg-surface-2 transition-colors"
								aria-label="GitHub'da incele"
							>
								<GithubIcon className="size-4" />
								<span>GitHub</span>
							</a>
						</div>
					</div>

					{/* Linkler */}
					{Object.entries(FOOTER_LINKS).map(([title, links]) => (
						<div key={title}>
							<h3 className="font-semibold text-sm text-foreground mb-3">{title}</h3>
							<ul className="space-y-2">
								{links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											target={link.external ? "_blank" : undefined}
											rel={link.external ? "noopener noreferrer" : undefined}
											className="text-sm text-foreground-muted hover:text-accent transition-colors"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Alt bar */}
				<div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-subtle">
					<p>
						© {new Date().getFullYear()} kankam.ai · MIT lisanslı · pi-coding-agent üstüne inşa edildi.
					</p>
					<p className="flex items-center gap-1.5">
						<span>Built with</span>
						<Heart className="size-3.5 text-danger" aria-label="sevgi" />
						<span>in Türkiye</span>
						<span aria-hidden>🇹🇷</span>
					</p>
				</div>
			</div>
		</footer>
	);
}

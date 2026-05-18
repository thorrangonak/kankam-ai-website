import { Logo } from "@/components/parts/logo";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Navbar — tasarımın orijinal markup'ı, Next.js-uyumlu.
 * Sticky değil (CSS'te zaten konumlanıyor), brand + nav + actions.
 */
export function Navbar() {
	return (
		<header className="nav">
			<div className="nav-inner">
				<Logo />
				<nav className="nav-links" aria-label="Birincil">
					<a href="#features">Özellikler</a>
					<a href="#personas">Personas</a>
					<a href="#kvkk">KVKK</a>
					<a
						href="https://github.com/thorrangonak/kanka#readme"
						target="_blank"
						rel="noopener noreferrer"
					>
						Docs
					</a>
					<a
						href="https://github.com/thorrangonak/kanka/blob/main/ROADMAP.md"
						target="_blank"
						rel="noopener noreferrer"
					>
						Roadmap
					</a>
				</nav>
				<div className="nav-right">
					<a
						className="gh-badge"
						href="https://github.com/thorrangonak/kanka"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub'da incele"
					>
						<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
						</svg>
						<span style={{ color: "var(--yellow)" }}>★</span>
						<span>GitHub</span>
					</a>
					<ThemeToggle />
					<a className="btn btn-primary btn-sm" href="#install">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
							<title>İndir</title>
							<path d="M12 3v12M6 9l6 6 6-6M5 21h14" />
						</svg>
						İndir
					</a>
				</div>
			</div>
		</header>
	);
}

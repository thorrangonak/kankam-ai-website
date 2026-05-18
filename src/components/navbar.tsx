"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
	{ href: "#ozellikler", label: "Özellikler" },
	{ href: "#personas", label: "Personalar" },
	{ href: "#kvkk", label: "KVKK" },
	{ href: "#kurulum", label: "Kurulum" },
	{ href: "https://github.com/thorrangonak/kanka/blob/main/ROADMAP.md", label: "Yol Haritası", external: true },
];

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-40 transition-all duration-200",
				scrolled
					? "border-b border-border bg-background/85 backdrop-blur-md"
					: "border-b border-transparent bg-transparent",
			)}
		>
			<nav className="container-kanka flex h-16 items-center justify-between gap-4">
				{/* Logo */}
				<Link
					href="/"
					className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight"
				>
					<span aria-hidden className="text-accent">{"{"}</span>
					<span>
						<span className="text-foreground">kanka</span>
						<span className="text-foreground-subtle">m</span>
						<span className="text-accent">.ai</span>
					</span>
					<span aria-hidden className="text-accent">{"}"}</span>
				</Link>

				{/* Desktop nav */}
				<ul className="hidden md:flex items-center gap-1">
					{NAV_LINKS.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								target={link.external ? "_blank" : undefined}
								rel={link.external ? "noopener noreferrer" : undefined}
								className={cn(
									"px-3 py-2 rounded-md text-sm font-medium",
									"text-foreground-muted hover:text-foreground hover:bg-surface",
									"transition-colors",
								)}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				{/* Actions */}
				<div className="flex items-center gap-2">
					<a
						href="https://github.com/thorrangonak/kanka"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							"hidden sm:inline-flex items-center gap-2 size-9 justify-center rounded-md",
							"border border-border bg-surface text-foreground-muted",
							"hover:bg-surface-2 hover:text-foreground transition-colors",
						)}
						aria-label="GitHub'da incele"
						title="GitHub"
					>
						<GithubIcon className="size-4" />
					</a>
					<ThemeToggle />
					<a
						href="#kurulum"
						className={cn(
							"hidden sm:inline-flex items-center gap-2 h-9 px-4 rounded-md",
							"bg-accent text-accent-foreground font-medium text-sm",
							"hover:opacity-90 transition-opacity",
						)}
					>
						İndir
					</a>
					{/* Mobile menu trigger */}
					<button
						type="button"
						className="md:hidden inline-flex items-center justify-center size-9 rounded-md border border-border bg-surface text-foreground-muted"
						aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
						onClick={() => setMobileOpen((prev) => !prev)}
					>
						{mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
					</button>
				</div>
			</nav>

			{/* Mobile drawer */}
			{mobileOpen && (
				<div className="md:hidden border-t border-border bg-background">
					<ul className="container-kanka py-4 flex flex-col gap-1">
						{NAV_LINKS.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									target={link.external ? "_blank" : undefined}
									rel={link.external ? "noopener noreferrer" : undefined}
									onClick={() => setMobileOpen(false)}
									className="block px-3 py-2 rounded-md text-base font-medium text-foreground-muted hover:text-foreground hover:bg-surface"
								>
									{link.label}
								</Link>
							</li>
						))}
						<li className="pt-2">
							<a
								href="#kurulum"
								onClick={() => setMobileOpen(false)}
								className="block w-full text-center px-4 py-2.5 rounded-md bg-accent text-accent-foreground font-medium"
							>
								İndir
							</a>
						</li>
					</ul>
				</div>
			)}
		</header>
	);
}

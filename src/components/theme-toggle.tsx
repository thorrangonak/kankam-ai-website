"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tema değiştirici — light/dark/system arası geçiş.
 * Hydration mismatch'i önlemek için mount sonrası render eder.
 */
export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, resolvedTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = (mounted ? resolvedTheme : "dark") === "dark";

	if (!mounted) {
		// SSR'da deterministik placeholder
		return (
			<button
				type="button"
				className="inline-flex items-center justify-center size-9 rounded-md border border-border bg-surface text-foreground-muted"
				aria-label="Tema yükleniyor"
				disabled
			>
				<Moon className="size-4" aria-hidden />
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className={cn(
				"inline-flex items-center justify-center size-9 rounded-md",
				"border border-border bg-surface text-foreground-muted",
				"hover:bg-surface-2 hover:text-foreground transition-colors",
			)}
			aria-label={isDark ? "Açık temaya geç" : "Koyu temaya geç"}
			title={isDark ? "Açık tema" : "Koyu tema"}
		>
			{isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
		</button>
	);
}

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Tema sağlayıcısı — next-themes wrapper.
 * `data-theme="dark"` / `data-theme="light"` attribute kullanır.
 * Varsayılan: dark (terminal estetiği).
 */
export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

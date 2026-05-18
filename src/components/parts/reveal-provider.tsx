"use client";

import { useReveal } from "./use-reveal";

/**
 * Client-side wrapper — useReveal()'i mount eder.
 * Root layout'a yerleştirilerek tüm sayfada .reveal elementleri çalışır.
 */
export function RevealProvider() {
	useReveal();
	return null;
}

"use client";

import { useEffect } from "react";

/**
 * `.reveal` class'ı olan elementleri scroll yaklaştığında `.in` ile işaretler.
 * styles.css'te `.reveal { opacity: 0; transform: translateY(...) }` → `.in { opacity: 1; ... }`
 * geçişi tanımlı.
 */
export function useReveal() {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("in");
						observer.unobserve(entry.target);
					}
				}
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
		);

		const nodes = document.querySelectorAll(".reveal:not(.in)");
		for (const node of nodes) {
			observer.observe(node);
		}

		return () => observer.disconnect();
	}, []);
}

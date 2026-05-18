"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CopyCmdProps {
	cmd?: string;
	large?: boolean;
	className?: string;
}

/**
 * Terminal komut görünümlü, tek-tık kopyalama.
 * Tasarımın orijinal "copy-row" markup'ını TypeScript ile sarar.
 */
export function CopyCmd({
	cmd = "npm install -g @thorrangonak/kanka",
	large = false,
	className,
}: CopyCmdProps) {
	const [ok, setOk] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(`$ ${cmd}`);
			setOk(true);
			setTimeout(() => setOk(false), 1600);
		} catch {
			// Sessiz başarısız (HTTP context'te clipboard yok olabilir)
		}
	};

	const isInstall = cmd.includes("@thorrangonak/kanka");

	return (
		<div className={cn("copy-row", className)} style={large ? { fontSize: 15 } : undefined}>
			<code className="cmd">
				<span className="sigil">$</span>
				{isInstall ? (
					<>
						npm install <span style={{ color: "var(--peach)" }}>-g</span>{" "}
						<span className="pkg">@thorrangonak/kanka</span>
					</>
				) : (
					cmd
				)}
			</code>
			<button
				type="button"
				onClick={handleCopy}
				className={ok ? "ok" : ""}
				aria-label="Komutu kopyala"
			>
				{ok ? (
					<>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
							<polyline points="20 6 9 17 4 12" />
						</svg>{" "}
						Kopyalandı
					</>
				) : (
					<>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<rect x="9" y="9" width="13" height="13" rx="2" />
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
						</svg>{" "}
						Kopyala
					</>
				)}
			</button>
		</div>
	);
}

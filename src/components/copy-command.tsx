"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyCommandProps {
	command: string;
	className?: string;
	label?: string;
}

/**
 * Terminal komut görünümlü, tek tıkla kopyalama butonu.
 * Hero ve kurulum bölümlerinde kullanılır.
 */
export function CopyCommand({ command, className, label }: CopyCommandProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(command);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (e: unknown) {
			console.error("Kopyalama başarısız:", e);
		}
	};

	return (
		<div
			className={cn(
				"group inline-flex items-center gap-3 rounded-lg",
				"border border-border bg-surface/80 backdrop-blur",
				"px-4 py-3 font-mono text-sm",
				"hover:border-accent/50 transition-colors",
				className,
			)}
		>
			<span className="text-foreground-subtle select-none" aria-hidden>
				$
			</span>
			<code className="text-foreground flex-1">{command}</code>
			<button
				type="button"
				onClick={handleCopy}
				className={cn(
					"inline-flex items-center justify-center size-7 rounded",
					"text-foreground-muted hover:text-accent hover:bg-surface-2",
					"transition-all",
				)}
				aria-label={label ?? "Komutu kopyala"}
				title={copied ? "Kopyalandı!" : "Kopyala"}
			>
				{copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
			</button>
		</div>
	);
}

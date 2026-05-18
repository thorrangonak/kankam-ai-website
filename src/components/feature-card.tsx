import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
	emoji: string;
	title: string;
	description: string;
	href?: string;
	accentColor?: string;
}

/**
 * Özellik kartı — 8 ana özellik grid'inde kullanılır.
 * Hover'da yukarı kalkar, accent border.
 */
export function FeatureCard({
	emoji,
	title,
	description,
	href,
	accentColor = "var(--accent)",
}: FeatureCardProps) {
	const inner = (
		<>
			<div
				className="text-4xl mb-3 transition-transform group-hover:scale-110"
				aria-hidden
			>
				{emoji}
			</div>
			<h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-1.5">
				{title}
				{href && (
					<ArrowUpRight
						className="size-4 text-foreground-subtle group-hover:text-accent transition-colors"
						aria-hidden
					/>
				)}
			</h3>
			<p className="text-sm text-foreground-muted leading-relaxed">{description}</p>
		</>
	);

	const cardClass = cn(
		"group relative rounded-xl p-6",
		"border border-border bg-surface/40 backdrop-blur-sm",
		"hover:bg-surface hover:border-accent/40 hover:-translate-y-0.5",
		"transition-all duration-200",
	);

	if (href) {
		return (
			<Link
				href={href}
				style={{ ["--feature-accent" as string]: accentColor }}
				className={cardClass}
			>
				{inner}
			</Link>
		);
	}

	return (
		<div
			style={{ ["--feature-accent" as string]: accentColor }}
			className={cardClass}
		>
			{inner}
		</div>
	);
}

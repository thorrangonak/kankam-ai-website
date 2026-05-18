import Link from "next/link";

/**
 * Brand logosu — terminal-flavored bracket [k] + kankam.ai metni.
 * Navbar ve Footer'da kullanılır.
 */
export function Logo({ size = 22 }: { size?: number }) {
	return (
		<Link href="/#top" aria-label="kankam.ai" className="logo">
			<span
				className="logo-mark"
				style={{
					width: size + 8,
					height: size + 8,
					fontSize: size - 4,
				}}
			>
				k
			</span>
			<span className="logo-text">
				kankam<span className="logo-tld">.ai</span>
			</span>
		</Link>
	);
}

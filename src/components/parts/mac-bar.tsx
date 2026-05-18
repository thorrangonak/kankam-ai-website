/**
 * macOS-style window üst başlığı — 3 daire + opsiyonel title.
 * Terminal mock'larında kullanılır.
 */
export function MacBar({ title }: { title?: string }) {
	return (
		<div className="win-bar">
			<div className="win-dots">
				<span className="win-dot r" />
				<span className="win-dot y" />
				<span className="win-dot g" />
			</div>
			{title && <span className="win-title">{title}</span>}
		</div>
	);
}

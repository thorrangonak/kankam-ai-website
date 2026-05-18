import { FEATURES } from "@/lib/site-data";
import { FeaturePreview } from "@/components/parts/feature-preview";

/**
 * 8 özellik grid'i — kartlar, mini-önizleme + detay linki.
 */
export function Features() {
	return (
		<section id="features">
			<div className="container">
				<div className="section-head reveal">
					<span className="eyebrow">
						<span className="dot" /> Özellikler
					</span>
					<h2>Terminal&apos;de yaşamayı sevenler için.</h2>
					<p>Türk dev&apos;in günlük akışına oturan 8 işlev. Yüklemeden 30 saniye sonra çalışıyor.</p>
				</div>
				<div className="grid grid-4 reveal" style={{ gap: 18 }}>
					{FEATURES.map((f, i) => (
						<article key={f.title} className="card">
							<div className="emoji" aria-hidden>
								{f.emoji}
							</div>
							<h3>{f.title}</h3>
							<p style={{ fontSize: 14, margin: 0 }}>{f.desc}</p>
							<div className="preview">
								<FeaturePreview kind={f.previewKind} />
							</div>
							<a className="detail-link" href={`#feature-${i}`}>
								Detay <span>→</span>
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

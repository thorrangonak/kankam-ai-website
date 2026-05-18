import { Star, Zap } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CopyCommand } from "@/components/copy-command";
import { FeatureCard } from "@/components/feature-card";
import { FEATURES } from "@/lib/features";

export default function HomePage() {
	return (
		<>
			<Navbar />
			<main className="flex-1">
				{/* Hero */}
				<section className="relative overflow-hidden">
					{/* Background gradients */}
					<div
						aria-hidden
						className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
						style={{
							background:
								"radial-gradient(60% 80% at 50% 0%, var(--secondary) 0%, transparent 50%), radial-gradient(40% 60% at 80% 20%, var(--accent) 0%, transparent 60%)",
						}}
					/>

					<div className="container-kanka pt-20 pb-24 lg:pt-32 lg:pb-32">
						{/* Eyebrow */}
						<div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-border bg-surface/60 backdrop-blur text-xs text-foreground-muted font-medium">
							<span className="size-1.5 rounded-full bg-success animate-pulse" />
							<span>v0.5.0 yayında</span>
							<span aria-hidden className="text-foreground-subtle">·</span>
							<span>7 persona · KVKK skill · ~%70 token tasarrufu</span>
						</div>

						{/* Title */}
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
							<span className="block">Kanka,</span>
							<span className="block bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
								şunu yapsana.
							</span>
						</h1>

						{/* Subtitle */}
						<p className="text-lg sm:text-xl text-foreground-muted max-w-2xl leading-relaxed mb-10">
							Türkçe konuşan terminal kodlama asistanı.{" "}
							<span className="text-foreground font-medium">Claude, GPT, Gemini</span> destekli,{" "}
							<span className="text-foreground font-medium">KVKK uyumlu</span>,{" "}
							<span className="text-foreground font-medium">%70 daha az token</span>.
						</p>

						{/* CTA */}
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
							<CopyCommand command="npm install -g @thorrangonak/kanka" />
							<a
								href="https://github.com/thorrangonak/kanka"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 h-12 px-5 rounded-lg border border-border bg-surface/60 backdrop-blur text-foreground font-medium hover:bg-surface hover:border-accent/40 transition-colors"
							>
								<GithubIcon className="size-4" />
								<span>GitHub'da incele</span>
							</a>
						</div>

						{/* Mini stats */}
						<div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground-muted">
							<a
								href="https://github.com/thorrangonak/kanka"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
							>
								<Star className="size-4" />
								<span>GitHub'da ⭐ ver</span>
							</a>
							<span className="inline-flex items-center gap-1.5">
								<Zap className="size-4" />
								<span>MIT lisanslı</span>
							</span>
							<span>10+ LLM provider</span>
							<span>9 Türkçe subagent</span>
							<span>Açık kaynak</span>
						</div>
					</div>
				</section>

				{/* Sosyal kanıt strip */}
				<section className="border-y border-border bg-surface/30">
					<div className="container-kanka py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-foreground-subtle">
						<span>Built on pi-coding-agent</span>
						<span aria-hidden>·</span>
						<span>MIT licensed</span>
						<span aria-hidden>·</span>
						<span>10+ LLM provider</span>
						<span aria-hidden>·</span>
						<span>KVKK ready</span>
						<span aria-hidden>·</span>
						<span>Türk geliştiriciler için tasarlandı 🇹🇷</span>
					</div>
				</section>

				{/* Özellikler */}
				<section id="ozellikler" className="container-kanka py-20 lg:py-28">
					<div className="max-w-2xl mb-12 lg:mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
							8 ana özellik
						</h2>
						<p className="text-lg text-foreground-muted leading-relaxed">
							Sıradan bir Türkçe wrapper değil — yerel dev kültürüne özel tasarlanmış mature bir agent.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
						{FEATURES.map((feature) => (
							<FeatureCard
								key={feature.id}
								emoji={feature.emoji}
								title={feature.title}
								description={feature.description}
								accentColor={feature.accentColor}
							/>
						))}
					</div>
				</section>

				{/* Personas placeholder */}
				<section id="personas" className="container-kanka py-20 lg:py-28 border-t border-border">
					<div className="max-w-2xl mb-12">
						<div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
							<span aria-hidden>🎭</span>
							<span>Persona Sistemi</span>
						</div>
						<h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
							Aynı soru, farklı kişilik — anında değişir
						</h2>
						<p className="text-lg text-foreground-muted leading-relaxed">
							7 hazır persona ile agent'ın tonunu istediğin gibi ayarla. Sistem prompt'a dinamik
							enjeksiyon, her cevapta etkili.
						</p>
					</div>

					{/* TODO: Interactive persona switcher (Claude Design çıktısı ile değiştir) */}
					<div className="rounded-xl border border-border bg-surface/40 p-10 text-center text-foreground-muted">
						<p className="font-mono text-sm">
							[ İnteraktif persona switcher — Claude Design çıktısı buraya entegre edilecek ]
						</p>
					</div>
				</section>

				{/* KVKK placeholder */}
				<section
					id="kvkk"
					className="container-kanka py-20 lg:py-28 border-t border-border"
				>
					<div className="max-w-2xl mb-12">
						<div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-danger/10 text-danger text-xs font-medium">
							<span aria-hidden>🇹🇷</span>
							<span>Yerel Mevzuat</span>
						</div>
						<h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
							KVKK uyumlu kod yazımı — hiçbir agent'ta yok
						</h2>
						<p className="text-lg text-foreground-muted leading-relaxed">
							6698 sayılı kanunla uyumlu pattern'ler: PII masking, retention policy, veri silme,
							72 saatlik ihlal bildirim akışı. Saatler süren araştırma → 1 dakikalık skill çağrısı.
						</p>
					</div>

					{/* TODO: Önce/sonra kod karşılaştırma (Claude Design ile) */}
					<div className="rounded-xl border border-border bg-surface/40 p-10 text-center text-foreground-muted">
						<p className="font-mono text-sm">
							[ KVKK önce/sonra kod karşılaştırma — Claude Design çıktısı entegre edilecek ]
						</p>
					</div>
				</section>

				{/* Kurulum */}
				<section
					id="kurulum"
					className="container-kanka py-20 lg:py-28 border-t border-border"
				>
					<div className="max-w-2xl mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
							30 saniyede başla
						</h2>
						<p className="text-lg text-foreground-muted leading-relaxed">
							3 adımda kur, terminal'de Türkçe konuş, üretkenliğin uçar.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								step: "1",
								title: "Yükle",
								desc: "npm üzerinden global kurulum.",
								cmd: "npm install -g @thorrangonak/kanka",
							},
							{
								step: "2",
								title: "Giriş yap",
								desc: "Anthropic OAuth veya .env API key.",
								cmd: "kanka\n> /giriş",
							},
							{
								step: "3",
								title: "Konuş",
								desc: "Türkçe yaz, kanka kodu yazsın.",
								cmd: "> Bana NextJS landing yap",
							},
						].map((s) => (
							<div
								key={s.step}
								className="relative rounded-xl border border-border bg-surface/40 p-6"
							>
								<div className="absolute -top-3 left-6 size-7 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
									{s.step}
								</div>
								<h3 className="font-semibold mt-2 mb-2">{s.title}</h3>
								<p className="text-sm text-foreground-muted mb-4">{s.desc}</p>
								<pre className="rounded-md bg-background/80 border border-border p-3 text-xs font-mono text-foreground overflow-x-auto">
									<code>{s.cmd}</code>
								</pre>
							</div>
						))}
					</div>
				</section>

				{/* Final CTA */}
				<section className="container-kanka py-24 lg:py-32">
					<div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-10 sm:p-16 text-center">
						<h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
							Hadi başlayalım kanka 🚀
						</h2>
						<p className="text-lg text-foreground-muted max-w-2xl mx-auto mb-8">
							5 dakikada kur, terminal'de Türkçe konuş. Üretkenliğin uçar.
						</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
							<CopyCommand command="npm install -g @thorrangonak/kanka" />
							<a
								href="https://github.com/thorrangonak/kanka"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 h-12 px-5 rounded-lg border border-border bg-background text-foreground font-medium hover:border-accent/40 transition-colors"
							>
								<GithubIcon className="size-4" />
								<span>GitHub</span>
							</a>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

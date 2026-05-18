import type { ReactNode } from "react";

/**
 * Sitenin verisi — tek source of truth.
 * Yeni özellik, persona veya provider eklerken sadece buraya dokun.
 */

// ============================================================================
// FEATURES — 8 ana özellik
// ============================================================================

export interface Feature {
	slug: string; // /ozellikler/<slug>/ detay sayfası
	emoji: string;
	title: string;
	desc: string;
	accent: "teal" | "mauve" | "yellow" | "blue" | "green" | "peach";
	previewKind:
		| "persona-chips"
		| "journal"
		| "terminal-tab"
		| "update-check"
		| "subagent-chips"
		| "chain-pipeline"
		| "token-bar"
		| "provider-chips";
}

export const FEATURES: readonly Feature[] = [
	{
		slug: "persona",
		emoji: "🎭",
		title: "Persona sistemi",
		desc: "7 farklı kişilik — kanka, hoca, abi, patron, akademisyen, stajyer, paranoyak. Tek komutla geç.",
		accent: "mauve",
		previewKind: "persona-chips",
	},
	{
		slug: "gunluk",
		emoji: "📓",
		title: "Geliştirme günlüğü",
		desc: "Proje bazlı JSONL günlük. Etiketle, ara, geri dön. Dünkü kararını unutma.",
		accent: "yellow",
		previewKind: "journal",
	},
	{
		slug: "terminal",
		emoji: "🔔",
		title: "Windows Terminal entegrasyonu",
		desc: "Canlı tab title + toast bildirim. Arka planda çalışırken haberin olsun.",
		accent: "blue",
		previewKind: "terminal-tab",
	},
	{
		slug: "guncelle",
		emoji: "🔄",
		title: "Otomatik güncelleme",
		desc: "Pasif npm check. Yeni sürüm gelince /güncelle ile saniyede güncel ol.",
		accent: "green",
		previewKind: "update-check",
	},
	{
		slug: "ekip",
		emoji: "🤝",
		title: "9 Türkçe subagent",
		desc: "kasif, planlayici, isci, gozden-geciren, mimar, hata-avcisi, test-yazari, refactorcu, docs-yazari.",
		accent: "teal",
		previewKind: "subagent-chips",
	},
	{
		slug: "chain",
		emoji: "🔗",
		title: "Chain + paralel async",
		desc: "Pipeline kur, görevleri paralel çalıştır. 3× wall-clock kazancı bedava gelsin.",
		accent: "mauve",
		previewKind: "chain-pipeline",
	},
	{
		slug: "token",
		emoji: "💰",
		title: "%70 token tasarrufu",
		desc: "Prompt cache + izole context + paralel async. Aynı işi üçte birine yap.",
		accent: "green",
		previewKind: "token-bar",
	},
	{
		slug: "multi-llm",
		emoji: "🔌",
		title: "10+ LLM provider",
		desc: "Claude, GPT, Gemini, GLM, Grok, Llama, DeepSeek, Trendyol, MiniMax, Ollama. Sen seç.",
		accent: "blue",
		previewKind: "provider-chips",
	},
];

export const SUBAGENTS = [
	"kasif",
	"planlayici",
	"isci",
	"gozden-geciren",
	"mimar",
	"hata-avcisi",
	"test-yazari",
	"refactorcu",
	"docs-yazari",
] as const;

// ============================================================================
// PERSONAS — 7 kişilik (canlı demoda kullanılır)
// ============================================================================

export type PersonaLineType = "prompt" | "sep" | "line";

export interface PersonaLine {
	type: PersonaLineType;
	text?: string;
	cls?: string;
}

export interface Persona {
	id: string;
	emoji: string;
	name: string;
	tag: string;
	color: "teal" | "yellow" | "peach" | "red" | "mauve" | "green";
	answer: PersonaLine[];
}

export const PERSONAS: readonly Persona[] = [
	{
		id: "kanka",
		emoji: "🤝",
		name: "kanka",
		tag: "samimi · arkadaş canlısı",
		color: "teal",
		answer: [
			{ type: "prompt", text: "> Recursive fonksiyon nedir?" },
			{ type: "sep" },
			{ type: "line", cls: "t-accent", text: "kanka:" },
			{ type: "line", text: "Kanka, recursive dediğin şey aslında basit:" },
			{ type: "line", text: "fonksiyon kendi kendini çağırır 🔄" },
			{ type: "line", text: "" },
			{ type: "line", text: "Mesela faktöriyel — 5! = 5 × 4!" },
			{ type: "line", text: "her adımda kendini bir küçükle çağırırsın," },
			{ type: "line", text: "taban (1) gelince geri toplarsın. O kadar." },
			{ type: "line", cls: "t-dim", text: '// örnek istersen "kanka örnek ver" de' },
		],
	},
	{
		id: "hoca",
		emoji: "🧑‍🏫",
		name: "hoca",
		tag: "eğitici · adım adım",
		color: "yellow",
		answer: [
			{ type: "prompt", text: "> Recursive fonksiyon nedir?" },
			{ type: "sep" },
			{ type: "line", cls: "t-warn", text: "hoca:" },
			{ type: "line", text: "Tanım: Kendi kendini çağıran fonksiyon." },
			{ type: "line", text: "" },
			{ type: "line", text: "İki bileşeni vardır:" },
			{ type: "line", text: "  1) Taban durumu (base case)" },
			{ type: "line", text: "  2) Özyinelemeli adım (recursive step)" },
			{ type: "line", text: "" },
			{ type: "line", text: "Önce taban durumunu yazın, sonra adımı." },
			{ type: "line", text: "Aksi takdirde stack overflow oluşur." },
		],
	},
	{
		id: "abi",
		emoji: "🧔",
		name: "abi",
		tag: "tecrübeli · pratik",
		color: "peach",
		answer: [
			{ type: "prompt", text: "> Recursive fonksiyon nedir?" },
			{ type: "sep" },
			{ type: "line", cls: "t-warn", text: "abi:" },
			{ type: "line", text: "Bak kardeşim, recursive lafa gelmez —" },
			{ type: "line", text: "90% durumda for loop yeter, kafanı yorma." },
			{ type: "line", text: "" },
			{ type: "line", text: "Ama tree gezeceksen, parser yazacaksan," },
			{ type: "line", text: "orda recursive şart. Stack'i de izle." },
			{ type: "line", cls: "t-dim", text: "// production: tail-call olmayan dil → loop tercih et" },
		],
	},
	{
		id: "patron",
		emoji: "💼",
		name: "patron",
		tag: "doğrudan · sonuç odaklı",
		color: "red",
		answer: [
			{ type: "prompt", text: "> Recursive fonksiyon nedir?" },
			{ type: "sep" },
			{ type: "line", cls: "t-err", text: "patron:" },
			{ type: "line", text: "Kısaca: kendi kendini çağıran fonksiyon." },
			{ type: "line", text: "" },
			{ type: "line", text: "• Performans: O(n) stack maliyeti" },
			{ type: "line", text: "• Risk: stack overflow" },
			{ type: "line", text: "• Çözüm: iteration veya memoization" },
			{ type: "line", text: "" },
			{ type: "line", text: "Kullanım kararı sende. Sonraki soru?" },
		],
	},
	{
		id: "akademisyen",
		emoji: "🎓",
		name: "akademisyen",
		tag: "teorik · detaylı",
		color: "mauve",
		answer: [
			{ type: "prompt", text: "> Recursive fonksiyon nedir?" },
			{ type: "sep" },
			{ type: "line", cls: "t-mauve", text: "akademisyen:" },
			{ type: "line", text: "Tanım (Kleene, 1936): Bir f fonksiyonu," },
			{ type: "line", text: "tanım kümesinde kendisine başvuruyorsa" },
			{ type: "line", text: "özyinelemelidir." },
			{ type: "line", text: "" },
			{ type: "line", text: "Y-combinator ile anonim recursive de mümkündür." },
			{ type: "line", cls: "t-dim", text: "// ref: Pierce, TAPL §5.3" },
		],
	},
	{
		id: "stajyer",
		emoji: "🐣",
		name: "stajyer",
		tag: "meraklı · soru sorar",
		color: "green",
		answer: [
			{ type: "prompt", text: "> Recursive fonksiyon nedir?" },
			{ type: "sep" },
			{ type: "line", cls: "t-good", text: "stajyer:" },
			{ type: "line", text: "Yaa ben de tam onu soracaktım! 😅" },
			{ type: "line", text: "Galiba fonksiyon kendini çağırıyor, değil mi?" },
			{ type: "line", text: "" },
			{ type: "line", text: "Bir de stack overflow diye bişey vardı —" },
			{ type: "line", text: "o nedir tam olarak? Beraber bakalım mı?" },
		],
	},
	{
		id: "paranoyak",
		emoji: "🔒",
		name: "paranoyak",
		tag: "güvenlik · şüpheci",
		color: "red",
		answer: [
			{ type: "prompt", text: "> Recursive fonksiyon nedir?" },
			{ type: "sep" },
			{ type: "line", cls: "t-err", text: "paranoyak:" },
			{ type: "line", text: "Önce sor: girdi nereden geliyor?" },
			{ type: "line", text: "Kullanıcı kontrollü ise — DERHAL depth limiti koy." },
			{ type: "line", text: "" },
			{ type: "line", text: "• ReDoS / Billion laughs benzeri saldırılar" },
			{ type: "line", text: "• Stack exhaustion = DoS vektörü" },
			{ type: "line", text: "• Untrusted JSON parse → recursive bomb" },
			{ type: "line", cls: "t-dim", text: "// her zaman: try/catch + max-depth" },
		],
	},
];

// ============================================================================
// PROVIDERS — 10+ LLM
// ============================================================================

export interface Provider {
	name: string;
	model: string;
	glyph: string;
	bg: string;
}

export const PROVIDERS: readonly Provider[] = [
	{ name: "Claude", model: "Opus 4.7", glyph: "AN", bg: "#f38ba8" },
	{ name: "GPT", model: "gpt-5-turbo", glyph: "GP", bg: "#a6e3a1" },
	{ name: "Gemini", model: "2.5 Pro", glyph: "GE", bg: "#89b4fa" },
	{ name: "GLM", model: "4.5-air", glyph: "ZP", bg: "#cba6f7" },
	{ name: "Grok", model: "grok-4", glyph: "XA", bg: "#f5c2e7" },
	{ name: "Llama", model: "4-405B", glyph: "LL", bg: "#fab387" },
	{ name: "DeepSeek", model: "v3-reasoner", glyph: "DS", bg: "#74c7ec" },
	{ name: "Trendyol", model: "LLM-7B (TR)", glyph: "TY", bg: "#f9e2af" },
	{ name: "MiniMax", model: "abab-7-chat", glyph: "MM", bg: "#b4befe" },
	{ name: "Ollama", model: "local · 0$", glyph: "OL", bg: "#94e2d5" },
];

// ============================================================================
// COMMUNITY — "good first issue" örnekleri
// ============================================================================

export interface IssueExample {
	tag: string;
	title: string;
	meta: string[];
	number: number;
}

export const GOOD_FIRST_ISSUES: readonly IssueExample[] = [
	{ tag: "good first issue", title: "memur personası ekle", meta: ["#persona", "~ 2h", "markdown"], number: 432 },
	{ tag: "good first issue", title: "/iban doğrulama skill'i", meta: ["#skill", "~ 4h", "JS"], number: 433 },
	{ tag: "good first issue", title: "/şaka komutu — Türk meme listesi", meta: ["#command", "~ 1h", "JSON"], number: 434 },
];

// ============================================================================
// HERO TERMINAL — animasyonlu satırlar
// ============================================================================

export type HeroLineKind = "in" | "meta" | "ok" | "out" | "link" | "stat";

export interface HeroLine {
	kind: HeroLineKind;
	text: string;
	delay: number;
}

export const HERO_LINES: readonly HeroLine[] = [
	{ kind: "in", text: "Bana NextJS landing page yap, Türkçe konuşan AI tanıtsın.", delay: 60 },
	{ kind: "meta", text: "↳ planlayici · 3 görev oluşturuldu", delay: 18 },
	{ kind: "meta", text: "↳ kasif · sırf src/app/* okundu (12 dosya, izole context)", delay: 16 },
	{ kind: "meta", text: "↳ isci · component yazılıyor… ▮▮▮▮▮▯▯▯ 62%", delay: 14 },
	{ kind: "ok", text: "✓ app/page.tsx · 184 satır", delay: 8 },
	{ kind: "ok", text: "✓ components/Hero.tsx · 96 satır", delay: 8 },
	{ kind: "ok", text: "✓ tailwind.config.ts güncellendi", delay: 8 },
	{ kind: "out", text: "", delay: 4 },
	{ kind: "out", text: "Hazır kanka 🎉  3 dosya oluşturdum, dev server çalışıyor:", delay: 22 },
	{ kind: "link", text: "http://localhost:3000", delay: 8 },
	{ kind: "stat", text: "54K token · $0.45 · 2.1s · cache hit %78", delay: 14 },
];

/**
 * Kanka'nın 8 ana özelliği — landing page ve detay sayfalarında kullanılır.
 * Tek source of truth: değişiklik buradan.
 */

export interface Feature {
	id: string;
	emoji: string;
	title: string;
	description: string;
	accentColor: string;
}

export const FEATURES: readonly Feature[] = [
	{
		id: "persona",
		emoji: "🎭",
		title: "Persona Sistemi",
		description:
			"7 hazır kişilik (kanka, hoca, abi, patron, akademisyen, stajyer, paranoyak). Aynı soru, farklı ton — anında değişir.",
		accentColor: "#cba6f7",
	},
	{
		id: "gunluk",
		emoji: "📓",
		title: "Geliştirme Günlüğü",
		description:
			"Proje bazlı append-only JSONL. Kararları, fix'leri, deployment notlarını kaydet. Etiket destekli arama.",
		accentColor: "#f9e2af",
	},
	{
		id: "terminal",
		emoji: "🔔",
		title: "Windows Terminal Entegrasyonu",
		description:
			"Canlı tab title güncellemesi (OSC 0) + uzun tool'lar bittiğinde masaüstü bildirim (OSC 9). Windows-first.",
		accentColor: "#89b4fa",
	},
	{
		id: "guncelle",
		emoji: "🔄",
		title: "Otomatik Güncelleme",
		description:
			"Günde 1 kez pasif npm kontrolü. Header'da bildirim + tek komutla güncelleme: /güncelle veya kanka update.",
		accentColor: "#a6e3a1",
	},
	{
		id: "ekip",
		emoji: "🤝",
		title: "9 Türkçe Subagent",
		description:
			"kasif, planlayici, isci, gozden-geciren, mimar, hata-avcisi, test-yazari, refactorcu, docs-yazari. İzole context.",
		accentColor: "#94e2d5",
	},
	{
		id: "chain",
		emoji: "🔗",
		title: "Chain + Paralel Async",
		description:
			"Tek komutla sequential pipeline (/yap) veya 3 agent paralel çalışsın — wall-clock 3x hız, token aynı.",
		accentColor: "#fab387",
	},
	{
		id: "token",
		emoji: "💰",
		title: "Token Tasarrufu",
		description:
			"Prompt cache (~70%) + izole context (~50%) + paralel async (3x hız). Çıplak LLM'e göre %75 daha ucuz.",
		accentColor: "#f5c2e7",
	},
	{
		id: "multi-llm",
		emoji: "🔌",
		title: "10+ LLM Provider",
		description:
			"Claude, GPT, Gemini, GLM, Grok, Llama, DeepSeek, Trendyol, MiniMax, Ollama. Tek paket, istediğin LLM.",
		accentColor: "#74c7ec",
	},
] as const;

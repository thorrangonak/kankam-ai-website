/**
 * Her özellik için detay sayfası içeriği.
 * Gerçek kanka projesi kaynak kodundan + dokümantasyondan derlendi.
 *
 * Her özellik = 1 detay sayfası (`/ozellikler/<slug>/`).
 * İçerik blokları: hero / intro / bölümler / kod örnekleri / FAQ / CTA.
 */

export type DetailBlock =
	| { kind: "heading"; level: 2 | 3; text: string; id?: string }
	| { kind: "paragraph"; text: string }
	| { kind: "list"; items: string[]; style?: "bullet" | "numbered" | "check" }
	| { kind: "code"; lang: string; title?: string; code: string }
	| { kind: "terminal"; title?: string; lines: TerminalLine[] }
	| { kind: "table"; headers: string[]; rows: string[][] }
	| { kind: "callout"; variant: "info" | "warning" | "success" | "tip"; title?: string; text: string }
	| { kind: "kbd-list"; commands: Array<{ cmd: string; desc: string }> }
	| { kind: "stat-grid"; stats: Array<{ value: string; label: string; color?: string }> }
	| { kind: "comparison"; left: ComparisonSide; right: ComparisonSide };

export interface TerminalLine {
	prefix?: ">" | "$" | "↳" | "✓" | "✗" | "📦" | "🔔" | "→";
	text: string;
	cls?: "dim" | "good" | "warn" | "err" | "accent" | "info" | "mauve";
}

export interface ComparisonSide {
	title: string;
	subtitle?: string;
	color: "red" | "green" | "yellow" | "blue" | "mauve";
	bullets: string[];
}

export interface FeatureDetail {
	slug: string;
	emoji: string;
	title: string;
	tagline: string;
	intro: string;
	tldr: string[]; // 3-5 madde özet
	blocks: DetailBlock[];
	faq: Array<{ q: string; a: string }>;
}

// ============================================================================
// PERSONA SİSTEMİ
// ============================================================================

const personaDetail: FeatureDetail = {
	slug: "persona",
	emoji: "🎭",
	title: "Persona Sistemi",
	tagline: "Aynı soru, 7 farklı kişilik. Tek komutla geç.",
	intro:
		"Kanka 7 hazır persona ile gelir. Persona = sistem prompt + tonalite + örnek diyalog. Markdown dosyalarla tanımlanır, runtime'da değişir, anında etkili olur.",
	tldr: [
		"7 hazır persona — kanka, hoca, abi, patron, akademisyen, stajyer, paranoyak",
		"Tek komutla değiştir: /kisilik <isim>",
		"~/.kanka/aktif-kisilik dosyasında saklanır (oturumlar arası kalıcı)",
		"Kendi persona'nı markdown olarak yazabilirsin — TypeScript şart değil",
		"before_agent_start hook'u ile sistem prompt'a dinamik enjekte edilir",
	],
	blocks: [
		{ kind: "heading", level: 2, text: "7 hazır persona", id: "personas" },
		{
			kind: "paragraph",
			text: "Her persona bir markdown dosyasıdır — frontmatter + örnek diyaloglar. Aşağıdaki 7 persona kanka ile birlikte gelir:",
		},
		{
			kind: "table",
			headers: ["Persona", "Stil", "Ne zaman?"],
			rows: [
				["🤝 kanka", "Samimi, rahat, profesyonel", "Varsayılan. Günlük iş."],
				["🧑‍🏫 hoca", "Öğretici, 'neden' açıklayan", "Öğrenirken, junior dev"],
				["🧔 abi", "Senior dev, direkt, kısa", "Hızlı iş, gereksiz açıklama yok"],
				["💼 patron", "Pragmatik, MVP odaklı", "Deadline, demo, hızlı iterasyon"],
				["🎓 akademisyen", "Detaylı, kaynak gösteren", "Karmaşık konular, derinlik"],
				["🐣 stajyer", "Öğrenme modunda, soru sorar", "Pair programming, sen mentor"],
				["🔒 paranoyak", "Güvenlik öncelikli, OWASP refleksi", "Production öncesi audit"],
			],
		},

		{ kind: "heading", level: 2, text: "Aynı soru, farklı cevap" },
		{
			kind: "paragraph",
			text: "Soru: \"Fibonacci yazsana\" — 4 personanın yanıtları:",
		},
		{
			kind: "code",
			lang: "text",
			title: "kanka:",
			code: "Tamamdır kanka, hemen yazalım.\nfunction fib(n) { return n < 2 ? n : fib(n-1) + fib(n-2); }",
		},
		{
			kind: "code",
			lang: "text",
			title: "hoca:",
			code: "Önce 'recursion' kavramına bakalım. Fonksiyon kendi kendini\nçağırırsa recursive olur. Base case + recursive case = 2 parça.\nFibonacci için: F(0)=0, F(1)=1, F(n) = F(n-1) + F(n-2)...",
		},
		{
			kind: "code",
			lang: "text",
			title: "abi:",
			code: "function fib(n) { return n < 2 ? n : fib(n-1) + fib(n-2); }\nBu kadar.",
		},
		{
			kind: "code",
			lang: "text",
			title: "patron:",
			code: "Production'da memoize'lı versiyon kullan.\nNaive recursive O(2^n), memoized O(n). Şu yeter:\nconst memo = new Map(); function fib(n) { if (memo.has(n)) return memo.get(n); ... }",
		},

		{ kind: "heading", level: 2, text: "Komutlar", id: "komutlar" },
		{
			kind: "kbd-list",
			commands: [
				{ cmd: "/kisilik", desc: "Mevcut persona + tüm listeyi göster" },
				{ cmd: "/kisilik hoca", desc: "Aktif persona'yı 'hoca'ya değiştir" },
				{ cmd: "/kisilikler", desc: "Detaylı katalog (açıklama + dosya yolu)" },
				{ cmd: "/kişilik", desc: "Türkçe karakter alias (aynı işlevde)" },
			],
		},

		{ kind: "heading", level: 2, text: "Kendi persona'nı yaz", id: "ozel-persona" },
		{
			kind: "paragraph",
			text: "İstediğin tonlu bir persona oluşturmak için tek ihtiyacın bir markdown dosyası:",
		},
		{
			kind: "code",
			lang: "markdown",
			title: "~/.kanka/personas/koc.md",
			code: `---
name: koc
description: Motivasyon odaklı, momentum kuran, "sen yapabilirsin" diyen koç
emoji: 🏆
---

## Kişiliğin

- Türkçe konuşur, enerjik ve teşvik edici
- Her çıkmazda alternatif önerir, "olmaz" demez
- Küçük zaferleri kutlar, büyük resimde kalır
- Pozitif ama gerçekçi — palavra atmaz

## Üslup örnekleri

- ✅ "Bunu başardın kanka! Şimdi bir adım daha — şu refactor da bitsin."
- ✅ "Bug var diye stres yapma. Hadi adım adım çözelim."
- ❌ "Süperrr 🥳🥳🥳" (abartılı emoji)

## Çalışma tarzı

- Her PR sonrası kısa pat (sırtına vurma)
- Frustrated görürse 5 dakika mola öner
- Long task öncesi: "Bu 2 saat sürer, kahveni hazırla"
`,
		},
		{
			kind: "callout",
			variant: "tip",
			title: "İpucu",
			text: "~/.kanka/personas/ altındaki dosyalar her oturum başında otomatik yüklenir. /kisilik koc ile aktif et, hazır.",
		},

		{ kind: "heading", level: 2, text: "Nasıl çalışır?", id: "teknik" },
		{
			kind: "paragraph",
			text: "Persona değiştiğinde, kanka before_agent_start hook'u ile sistem prompt'a o personanın içeriğini dinamik olarak enjekte eder. Her turn'de yeniden:",
		},
		{
			kind: "code",
			lang: "ts",
			title: "src/extensions/kisilik.ts (özet)",
			code: `pi.on("before_agent_start", async (event) => {
  const aktif = aktifKisilikOku(); // ~/.kanka/aktif-kisilik
  if (aktif === DEFAULT_PERSONA) return undefined;

  const persona = personalardanBul(aktif);
  return {
    systemPrompt: \`\${event.systemPrompt}\\n\\n---\\n\\n\${persona.icerik}\`,
  };
});`,
		},
		{
			kind: "callout",
			variant: "info",
			text: "Pitfall: Generic prompt + 'switch persona' runtime talimatı çok güvenilmez. Dinamik enjeksiyon çok daha tutarlı — model gradient drift'i en aza iner.",
		},

		{ kind: "heading", level: 2, text: "Tipik kullanım" },
		{
			kind: "terminal",
			title: "kanka kullanımı",
			lines: [
				{ prefix: "$", text: "kanka", cls: "good" },
				{ prefix: ">", text: "/kisilik hoca", cls: "warn" },
				{ text: "Aktif kişilik: 🧑‍🏫 hoca ✓" },
				{ text: "" },
				{ prefix: ">", text: "useEffect hook'u nasıl çalışır?", cls: "warn" },
				{ text: "" },
				{ text: "Önce useEffect'in 3 temel parametresini anlayalım..." },
				{ text: "(1) Effect callback — render sonrası çalışır" },
				{ text: "(2) Dependency array — değişikliği takip eder" },
				{ text: "(3) Cleanup function — unmount/re-render önce" },
				{ text: "" },
				{ prefix: ">", text: "/kisilik abi", cls: "warn" },
				{ text: "Aktif kişilik: 🧔 abi ✓" },
				{ text: "" },
				{ prefix: ">", text: "aynı soru", cls: "warn" },
				{ text: "Render sonrası side effect. Deps array'i kontrol et." },
				{ text: "Empty array = sadece mount'ta. Cleanup return ile." },
			],
		},
	],
	faq: [
		{
			q: "Persona değişikliği önceki konuşmayı etkiler mi?",
			a: "Hayır, sadece sonraki turn'lerden itibaren etkili. Geçmiş mesajlar context'te kalır ama yeni sistem prompt'la birlikte yeniden değerlendirilir.",
		},
		{
			q: "Aynı anda birden fazla persona kullanabilir miyim?",
			a: "Bir oturumda bir aktif persona vardır. Ama farklı oturumlarda (`/fork`, `/clone`) farklı personalar kullanabilirsin.",
		},
		{
			q: "Persona dosyam çalışmıyor, nasıl debug edeyim?",
			a: "Frontmatter (---) eksikse, name alanı yoksa, markdown gövde boşsa sessizce atlanır. /kisilikler ile dosya yolunu gör, içeriği kontrol et.",
		},
		{
			q: "Persona seçimim oturumlar arası kalır mı?",
			a: "Evet, ~/.kanka/aktif-kisilik dosyasında saklanır. Kanka'yı kapat-aç, son seçimin korunur.",
		},
	],
};

// ============================================================================
// GELİŞTİRME GÜNLÜĞÜ
// ============================================================================

const gunlukDetail: FeatureDetail = {
	slug: "gunluk",
	emoji: "📓",
	title: "Geliştirme Günlüğü",
	tagline: "Dünkü kararını unutma. Proje bazlı, etiketli, aranabilir.",
	intro:
		"Kanka'nın günlük sistemi telemetri yok, lokal JSONL — kararlarını, fix'lerini, deployment notlarını sen ne zaman istersen kayda alırsın. Tag desteği, etiket bazlı arama, proje izolasyonu.",
	tldr: [
		"Proje bazlı: her klasör için ayrı dosya (~/.kanka/gunlukler/<proje>.jsonl)",
		"Append-only JSONL — kolayca okunur, version control'a uygun",
		"#etiket sentaksıyla otomatik tag parse",
		"Bugün / son N / arama / istatistik komutları",
		"Tamamen lokal — bulut yok, telemetri yok, verin sende",
	],
	blocks: [
		{ kind: "heading", level: 2, text: "Komutlar" },
		{
			kind: "kbd-list",
			commands: [
				{ cmd: "/gunluk yaz <metin>", desc: "Yeni giriş ekle (#etiket otomatik parse)" },
				{ cmd: "/gunluk bugun", desc: "Bugünün girişlerini listele" },
				{ cmd: "/gunluk son 10", desc: "Son N giriş (varsayılan 10, max 100)" },
				{ cmd: "/gunluk ara auth", desc: "Substring + etiket arama" },
				{ cmd: "/gunluk istatistik", desc: "Toplam, ilk/son, top 5 etiket" },
				{ cmd: "/günlük", desc: "Türkçe karakter alias (tüm alt komutlar)" },
			],
		},

		{ kind: "heading", level: 2, text: "Format", id: "format" },
		{
			kind: "paragraph",
			text: "Her satır bağımsız bir JSON object. Bozuk satır olursa diğerleri etkilenmez:",
		},
		{
			kind: "code",
			lang: "json",
			title: "~/.kanka/gunlukler/my-app.jsonl",
			code: `{"ts":"2026-05-18T14:23:12.000Z","proje":"my-app","metin":"auth refresh token bug düzeltildi","etiketler":["fix","auth"]}
{"ts":"2026-05-18T15:01:45.000Z","proje":"my-app","metin":"NextJS 15 migration başladı","etiketler":["frontend","nextjs"]}
{"ts":"2026-05-18T16:30:00.000Z","proje":"my-app","metin":"Prod'da PostgreSQL connection pool tükendi, pgbouncer eklendi","etiketler":["fix","prod","db","incident"]}`,
		},

		{ kind: "heading", level: 2, text: "Tipik bir gün" },
		{
			kind: "terminal",
			title: "günlük kullanımı",
			lines: [
				{ prefix: ">", text: "/gunluk yaz auth refresh bug fix #fix #auth", cls: "warn" },
				{ prefix: "✓", text: "Günlüğe yazdım [#fix #auth]", cls: "good" },
				{ text: "  → auth refresh bug fix" },
				{ text: "" },
				{ prefix: ">", text: "/gunluk yaz pgbouncer eklendi prod'a #fix #prod #db", cls: "warn" },
				{ prefix: "✓", text: "Günlüğe yazdım [#fix #prod #db]", cls: "good" },
				{ text: "" },
				{ prefix: ">", text: "/gunluk bugun", cls: "warn" },
				{ text: "" },
				{ text: "📓 Bugün (2 giriş) — my-app", cls: "accent" },
				{ text: "─────────────────────────────" },
				{ text: "  18.05.2026 14:23  [#fix #auth]", cls: "mauve" },
				{ text: "  → auth refresh bug fix" },
				{ text: "" },
				{ text: "  18.05.2026 16:30  [#fix #prod #db]", cls: "mauve" },
				{ text: "  → pgbouncer eklendi prod'a" },
			],
		},

		{ kind: "heading", level: 2, text: "İstatistik" },
		{
			kind: "paragraph",
			text: "/gunluk istatistik komutu sana hangi konularda en çok not aldığını gösterir:",
		},
		{
			kind: "terminal",
			title: "istatistik çıktısı",
			lines: [
				{ text: "📊 Günlük istatistik — my-app", cls: "accent" },
				{ text: "═════════════════════════════════" },
				{ text: "" },
				{ text: "  Toplam giriş : 47" },
				{ text: "  İlk          : 01.04.2026" },
				{ text: "  Son          : 18.05.2026 (bugün)" },
				{ text: "  Bugün        : 3" },
				{ text: "" },
				{ text: "🏷️  Top 5 etiket", cls: "warn" },
				{ text: "  #fix       18  ████████████████████" },
				{ text: "  #refactor  12  █████████████" },
				{ text: "  #auth       8  █████████" },
				{ text: "  #prod       5  █████" },
				{ text: "  #db         4  ████" },
			],
		},

		{ kind: "heading", level: 2, text: "Neden JSONL?", id: "neden-jsonl" },
		{
			kind: "list",
			style: "check",
			items: [
				"Append-only — race condition yok, paralel yazıma uygun",
				"cat | grep ile bash'te de okunabilir",
				"Bozuk satır → sadece o atlanır, diğerleri sağlam",
				"jq ile filtreleme kolay (jq 'select(.etiketler[] | contains(\"fix\"))')",
				"Git'e commit edebilirsin — proje history'sinin bir parçası",
				"SQLite/JSON'dan daha hızlı write (yalnızca dosyaya append)",
			],
		},

		{ kind: "heading", level: 2, text: "Git'e commit etmek" },
		{
			kind: "paragraph",
			text: "Günlüğünü repo ile birlikte versiyonlamak istersen .gitignore'dan çıkar ve commit et. Takım üyelerin de görür:",
		},
		{
			kind: "code",
			lang: "bash",
			code: `# .kanka/ klasörünü repo'na sembolik link veya copy et
mkdir .kanka
ln -s ~/.kanka/gunlukler/my-app.jsonl .kanka/gunluk.jsonl

git add .kanka/gunluk.jsonl
git commit -m "docs: günlük güncellendi"`,
		},
		{
			kind: "callout",
			variant: "warning",
			title: "Dikkat",
			text: "Günlükte hassas bilgi olabilir (server IP, geçici API key, müşteri ismi). Commit etmeden önce gözden geçir veya .gitignore'da tut.",
		},

		{ kind: "heading", level: 2, text: "Bash'te de kullan" },
		{
			kind: "code",
			lang: "bash",
			title: "Son 7 günün özet",
			code: `# Tüm projelerin son 7 günlük girişleri
find ~/.kanka/gunlukler -name "*.jsonl" -mtime -7 -exec cat {} \\;

# Etikete göre filtre
cat ~/.kanka/gunlukler/my-app.jsonl | jq 'select(.etiketler[] | contains("incident"))'

# Bugün kaç giriş?
cat ~/.kanka/gunlukler/my-app.jsonl | grep "$(date +%Y-%m-%d)" | wc -l`,
		},
	],
	faq: [
		{
			q: "Aynı proje birden fazla klasörde olursa?",
			a: "Klasör adı baz alınır (path.basename). Aynı isimde 2 klasörün varsa girişleri tek dosyada birleşir. İstersen klasör adlarını farklılaştır.",
		},
		{
			q: "Sınırsız büyür mü?",
			a: "Teorik olarak evet — ama 10K giriş bile sadece ~2MB. Çok büyüdüğünde manuel rotate edebilirsin (mv app.jsonl app-2025.jsonl).",
		},
		{
			q: "Cron job ile yazabilir miyim?",
			a: "Şu an /gunluk yaz interaktif komut. Programatik için: doğrudan ~/.kanka/gunlukler/<proje>.jsonl dosyasına JSON satırı append edersin. Format dokümante.",
		},
	],
};

// ============================================================================
// WINDOWS TERMINAL ENTEGRASYONU
// ============================================================================

const terminalDetail: FeatureDetail = {
	slug: "terminal",
	emoji: "🔔",
	title: "Windows Terminal Entegrasyonu",
	tagline: "Tab title canlı, toast bildirim native — Windows-first.",
	intro:
		"Çoğu AI agent macOS/Linux odaklı. Kanka Windows'u birinci sınıf vatandaş olarak görür: OSC escape codes ile native Windows Terminal entegrasyonu. Sıfır bağımlılık, sıfır kurulum.",
	tldr: [
		"OSC 0 ile canlı tab title — 'kanka · düşünüyor…', 'kanka · komut çalıştırıyor'",
		"OSC 9 ile masaüstü bildirim — 30s+ tool'lar bitince toast",
		"Multi-tasking için ideal — başka pencereye bakarken haberin olur",
		"Windows Terminal + WezTerm + iTerm2 destekli",
		"KANKA_NO_TERMINAL_INTEGRATION=1 ile devre dışı",
	],
	blocks: [
		{ kind: "heading", level: 2, text: "Canlı tab title", id: "tab-title" },
		{
			kind: "paragraph",
			text: "Kanka çalışırken Windows Terminal tab başlığı dinamik olarak değişir:",
		},
		{
			kind: "table",
			headers: ["Durum", "Tab title"],
			rows: [
				["Agent boştayken", "kanka · hazır"],
				["LLM düşünürken", "kanka · düşünüyor…"],
				["Bash çalışırken", "kanka · komut çalıştırıyor"],
				["Read sırasında", "kanka · dosya okuyor"],
				["Write sırasında", "kanka · dosya yazıyor"],
				["Subagent çağırırken", "kanka · subagent çağırıyor"],
			],
		},
		{
			kind: "callout",
			variant: "tip",
			text: "Multi-tasking yaparken birden fazla terminal sekmesi açıksan, hangisinde kanka çalışıyor anında görürsün.",
		},

		{ kind: "heading", level: 2, text: "Masaüstü bildirim", id: "bildirim" },
		{
			kind: "paragraph",
			text: "30 saniyeden uzun süren tool'lar bittiğinde Windows Terminal toast bildirimi gönderir:",
		},
		{
			kind: "terminal",
			title: "Windows Terminal toast",
			lines: [
				{ text: "🔔 kanka", cls: "warn" },
				{ text: "cevabım hazır (32s)" },
			],
		},
		{
			kind: "paragraph",
			text: "Sen başka pencereye bakıyorken veya kahve molasındayken haberin olur. 30 saniye eşiği KANKA_TOAST_THRESHOLD ile değiştirilebilir.",
		},

		{ kind: "heading", level: 2, text: "Test komutları" },
		{
			kind: "kbd-list",
			commands: [
				{ cmd: "/tab-title <metin>", desc: "Manuel tab title değiştir (debug için)" },
				{ cmd: "/bildir <metin>", desc: "Test toast bildirimi gönder" },
			],
		},

		{ kind: "heading", level: 2, text: "OSC nasıl çalışır?", id: "teknik" },
		{
			kind: "paragraph",
			text: "Operating System Command (OSC) escape sequence'leri stdout'a yazılan özel metin parçalarıdır. Terminal emülatörü bunları görsel olarak yorumlar:",
		},
		{
			kind: "code",
			lang: "ts",
			title: "src/extensions/windows-terminal.ts (özet)",
			code: `// Tab title set (OSC 0)
process.stdout.write(\`\\x1b]0;\${title}\\x07\`);

// Desktop toast (OSC 9 — Windows Terminal extension)
process.stdout.write(\`\\x1b]9;\${title};\${body}\\x07\`);

pi.on("tool_call_start", (e) => {
  const labels = {
    bash: "komut çalıştırıyor",
    read: "dosya okuyor",
    write: "dosya yazıyor",
    edit: "dosya düzenliyor",
  };
  setTabTitle(\`kanka · \${labels[e.toolName] ?? e.toolName}\`);
});

pi.on("tool_call_end", (e) => {
  const duration = Date.now() - e.startTime;
  if (duration > 30_000) {
    sendToast("kanka", \`\${e.toolName} bitti (\${Math.round(duration/1000)}s)\`);
  }
});`,
		},

		{ kind: "heading", level: 2, text: "Desteklenen terminaller", id: "destek" },
		{
			kind: "table",
			headers: ["Terminal", "Tab title (OSC 0)", "Toast (OSC 9)"],
			rows: [
				["Windows Terminal", "✓ native", "✓ native"],
				["WezTerm", "✓ native", "✓ native"],
				["iTerm2 (macOS)", "✓ native", "✓ native"],
				["Alacritty", "✓ native", "✗ (OSC 9 desteklemez)"],
				["GNOME Terminal", "✓ native", "✗"],
				["macOS Terminal.app", "✓ native", "✗"],
				["Cmd.exe / ConEmu", "kısmen", "✗"],
				["Git Bash", "kısmen", "✗"],
			],
		},
		{
			kind: "callout",
			variant: "info",
			text: "OSC 9 desteği olmayan terminallerde toast bildirim sessizce atlanır — hata vermez. Tab title hemen her yerde çalışır.",
		},

		{ kind: "heading", level: 2, text: "Devre dışı bırakma" },
		{
			kind: "paragraph",
			text: "Tab title değişiklikleri rahatsız ediyorsa environment variable ile kapatabilirsin:",
		},
		{
			kind: "code",
			lang: "bash",
			code: `# Tek seferlik
KANKA_NO_TERMINAL_INTEGRATION=1 kanka

# Kalıcı (~/.bashrc, ~/.zshrc veya PowerShell $PROFILE)
export KANKA_NO_TERMINAL_INTEGRATION=1`,
		},
	],
	faq: [
		{
			q: "Tab title değişmiyor, niye?",
			a: "Terminal'in OSC 0 desteği yok olabilir. Windows Terminal / WezTerm / iTerm2 dene. Cmd.exe'de garantili çalışmaz.",
		},
		{
			q: "Toast bildirim gelmiyor",
			a: "OSC 9 sadece Windows Terminal, WezTerm, iTerm2'de destekli. Diğerlerinde sessizce atlanır. Windows Terminal'de 'Settings > General > Notifications' açık mı kontrol et.",
		},
		{
			q: "Custom eşik koyabilir miyim?",
			a: "Henüz yok — şu an sabit 30s. v0.6.0'da KANKA_TOAST_THRESHOLD env değişkeni eklenecek.",
		},
	],
};

// ============================================================================
// OTOMATİK GÜNCELLEME
// ============================================================================

const guncelleDetail: FeatureDetail = {
	slug: "guncelle",
	emoji: "🔄",
	title: "Otomatik Güncelleme",
	tagline: "Hep güncel kal, dert etme. /güncelle yeter.",
	intro:
		"Kanka günde 1 kez pasif olarak npm registry'ye bakar, yeni sürüm varsa header'da bildirim gösterir. 3 katmanlı update sistemi — pasif uyarı, komut içi onay, CLI subcommand.",
	tldr: [
		"Günde 1 kez pasif npm view check (24h cache)",
		"Header'da bildirim: '📦 Yeni sürüm var: 0.4.1 → 0.5.0'",
		"/güncelle — interaktif onay + npm install",
		"kanka update — standalone CLI subcommand (oturum içi olmayan)",
		"KANKA_NO_UPDATE_CHECK=1 ile pasif kontrolu kapat",
	],
	blocks: [
		{ kind: "heading", level: 2, text: "3 yol" },
		{
			kind: "kbd-list",
			commands: [
				{ cmd: "kanka", desc: "Pasif uyarı — header'da otomatik gözükür (yeni sürüm varsa)" },
				{ cmd: "/güncelle", desc: "Oturum içinden interaktif güncelleme (onay sorar)" },
				{ cmd: "/versiyon-kontrol", desc: "Sadece kontrol, kurulum yok" },
				{ cmd: "kanka update", desc: "Standalone CLI — latest sürüme atla" },
				{ cmd: "kanka update --check", desc: "Sadece kontrol et" },
			],
		},

		{ kind: "heading", level: 2, text: "Akış", id: "akis" },
		{
			kind: "terminal",
			title: "tipik güncelleme",
			lines: [
				{ prefix: "$", text: "kanka", cls: "good" },
				{ text: "" },
				{ text: "  ╦╔═╔═╗╔╗╔╦╔═╔═╗" },
				{ text: "  ╠╩╗╠═╣║║║╠╩╗╠═╣" },
				{ text: "  ╩ ╩╩ ╩╝╚╝╩ ╩╩ ╩" },
				{ text: "" },
				{ text: "  kanka v0.4.1  ·  Türkçe konuşan terminal kodlama asistanı" },
				{ text: "  /yardım komutlar  ·  /ekip subagent'lar  ·  /bilgi durum" },
				{ text: "" },
				{ text: "  📦 Yeni sürüm var: 0.4.1 → 0.5.0  ·  Güncellemek için: /güncelle", cls: "warn" },
				{ text: "" },
				{ prefix: ">", text: "/güncelle", cls: "warn" },
				{ text: "" },
				{ text: "📡 npm registry kontrol ediliyor...", cls: "info" },
				{ text: "📦 Yeni sürüm: 0.4.1 → 0.5.0", cls: "warn" },
				{ text: "Güncellemek istiyor musun? [E/h]: e" },
				{ text: "" },
				{ text: "📥 npm install -g @thorrangonak/kanka@0.5.0", cls: "dim" },
				{ text: "..." },
				{ prefix: "✓", text: "Tamamdır kanka! kanka@0.5.0 yüklendi.", cls: "good" },
			],
		},

		{ kind: "heading", level: 2, text: "Cache yapısı", id: "cache" },
		{
			kind: "paragraph",
			text: "Pasif kontrol 24 saatte bir gerçek npm registry call yapar. Diğer açılışlarda cache okur:",
		},
		{
			kind: "code",
			lang: "json",
			title: "~/.kanka/son-versiyon-kontrol",
			code: `{
  "ts": "2026-05-18T14:23:00Z",
  "mevcut": "0.4.1",
  "latest": "0.5.0",
  "guncelMi": false
}`,
		},
		{
			kind: "paragraph",
			text: "Cache 24 saat sonra otomatik invalidate. /güncelle veya /versiyon-kontrol manuel refresh tetikler.",
		},

		{ kind: "heading", level: 2, text: "Devre dışı bırakma" },
		{
			kind: "code",
			lang: "bash",
			code: `# Pasif kontrol kapanır (npm view çağrılmaz)
export KANKA_NO_UPDATE_CHECK=1

# Header'da bildirim gözükmez (ama kontrol arka planda çalışır)
export KANKA_NO_UPDATE_PROMPT=1`,
		},
		{
			kind: "callout",
			variant: "info",
			text: "Air-gapped / corporate firewall arkasındaysan KANKA_NO_UPDATE_CHECK=1 yap — gereksiz npm registry HTTP'sini önler.",
		},

		{ kind: "heading", level: 2, text: "Yetki hatası" },
		{
			kind: "paragraph",
			text: "Linux/macOS'ta global npm install için sudo gerekir genelde. Çözümler:",
		},
		{
			kind: "list",
			style: "bullet",
			items: [
				"`sudo npm install -g @thorrangonak/kanka@latest` (basit ama sudo)",
				"nvm (Node Version Manager) — kullanıcı bazlı kurulum, sudo gerekmez",
				"Windows'ta: PowerShell'i yönetici aç veya nvm-windows kullan",
				"npm prefix'i ~/.npm-global'a değiştir — sudo'suz global install",
			],
		},

		{ kind: "heading", level: 2, text: "Semver davranışı" },
		{
			kind: "paragraph",
			text: "Kanka semantic versioning kullanır (semver). Aşağıdaki sürüm tipleri otomatik öneriliyor:",
		},
		{
			kind: "table",
			headers: ["Tip", "Örnek", "Otomatik bildirim?", "Önerilen aksiyon"],
			rows: [
				["Patch", "0.5.0 → 0.5.1", "Evet", "Bug fix — güvenle güncelle"],
				["Minor", "0.5.0 → 0.6.0", "Evet", "Yeni feature — değişiklik geriye uyumlu"],
				["Major", "0.5.0 → 1.0.0", "Evet (uyarıyla)", "Breaking change olabilir — release notes oku"],
			],
		},
	],
	faq: [
		{
			q: "kanka update beni neden eski sürüme indiriyor?",
			a: "İndirmez — sadece npm'deki latest tag'e geçer. Eğer npm publish edilen son sürümün lokalindekinden eski varsa, npm'deki kazanır.",
		},
		{
			q: "Belirli sürüme geçmek istersem?",
			a: "kanka update CLI'da şu an yok. Manuel: npm install -g @thorrangonak/kanka@<version>",
		},
		{
			q: "Pasif kontrol kaç kez network çağrısı yapıyor?",
			a: "24 saatte 1 kez. Kanka 10 kere açılsa bile sadece 1 kontrol — cache 24h.",
		},
	],
};

// ============================================================================
// SUBAGENT EKİBİ
// ============================================================================

const ekipDetail: FeatureDetail = {
	slug: "ekip",
	emoji: "🤝",
	title: "9 Türkçe Subagent",
	tagline: "Her biri izole context'te çalışan uzman ekip.",
	intro:
		"Kanka 9 uzman agent ile birlikte gelir — her biri kendi sistem prompt'una, izole context'ine, uzmanlık alanına sahip. Türkçe rapor verir, paralel veya sequential çalışabilir.",
	tldr: [
		"9 agent: kasif, planlayici, isci, gozden-geciren, mimar, hata-avcisi, test-yazari, refactorcu, docs-yazari",
		"Her biri izole context — ana sohbet şişmiyor",
		"Sequential chain veya paralel async (3x wall-clock)",
		"delege tool veya /yap, /plan-yap chain workflow'lar",
		"Kendi agent'ını ~/.kanka/agents/<isim>.md ile ekleyebilirsin",
	],
	blocks: [
		{ kind: "heading", level: 2, text: "9 ajan" },
		{
			kind: "table",
			headers: ["Agent", "Görevi", "Tipik kullanım"],
			rows: [
				["🔍 kasif", "Hızlı kod keşif, sıkıştırılmış context", "Yeni codebase'e bakarken"],
				["📋 planlayici", "Uygulama planı çıkar (hiç değişiklik yapmaz)", "'Önce ne yapayım?'"],
				["⚙️ isci", "Genel amaçlı uygulamacı, tam yetki", "Hemen kodu yaz"],
				["🔎 gozden-geciren", "Code review, kalite/güvenlik", "PR review öncesi"],
				["🏛️ mimar", "Sistem mimarisi, trade-off analizi", "'Microservice mi monolith mi?'"],
				["🐛 hata-avcisi", "Bug analizi, root cause, stack trace", "'Bu neden patlıyor?'"],
				["🧪 test-yazari", "Test senaryoları + test kodu", "Coverage artırma"],
				["♻️ refactorcu", "Davranış koruyarak refactor", "Code smell temizleme"],
				["📖 docs-yazari", "README, JSDoc, API docs, Mermaid", "Dokümantasyon eksikse"],
			],
		},

		{ kind: "heading", level: 2, text: "İzole context — neden önemli?", id: "izolasyon" },
		{
			kind: "paragraph",
			text: "Subagent çağırdığında, o agent KENDİ context'inde çalışır. Ana sohbet şişmez:",
		},
		{
			kind: "code",
			lang: "text",
			title: "Context flow",
			code: `Ana agent (40K token context)
  └─> delege({ agent: "kasif", task: "frontend keşif" })
        └─> kasif KENDİ context'inde (200K+ kullanabilir)
              ↓ derinlemesine inceler
              ↓ tool call'lar
              ↓ analiz yapar
              ↓
              └─> Ana agent'a SADECE 500 TOKEN ÖZET döner

Sonuç: kasif istediği kadar derin gitsin, ana sohbet 40K kalır.`,
		},
		{
			kind: "callout",
			variant: "success",
			title: "Tasarruf",
			text: "İzole context olmasa: kasif'in 200K token'i ana sohbete eklenir. Sonraki turn'de hepsi tekrar gönderilir → 200K cost her turn. İzolasyon ile 500 token cost (sadece özet).",
		},

		{ kind: "heading", level: 2, text: "Sequential chain", id: "chain" },
		{
			kind: "paragraph",
			text: "Tek komutla birden fazla agent sırayla — her biri öncekinin çıktısını alır:",
		},
		{
			kind: "terminal",
			title: "/yap chain",
			lines: [
				{ prefix: ">", text: "/yap kullanıcı kayıt formu ekle, validation + test", cls: "warn" },
				{ text: "" },
				{ text: "↞ Chain başlatıldı: kasif → planlayici → isci", cls: "dim" },
				{ text: "" },
				{ prefix: "→", text: "🔍 kasif — frontend dosyaları taranıyor...", cls: "info" },
				{ prefix: "✓", text: "kasif: 4 component analiz edildi (auth, forms, validation)", cls: "good" },
				{ text: "" },
				{ prefix: "→", text: "📋 planlayici — implementation planı çıkarılıyor...", cls: "info" },
				{ prefix: "✓", text: "planlayici: 3 adımlı plan hazır", cls: "good" },
				{ text: "    1. RegisterForm component" },
				{ text: "    2. validation schema (zod)" },
				{ text: "    3. test cases (happy + error)" },
				{ text: "" },
				{ prefix: "→", text: "⚙️ isci — uygulanıyor...", cls: "info" },
				{ prefix: "✓", text: "isci: 5 dosya oluşturuldu, 2 dosya düzenlendi", cls: "good" },
				{ text: "" },
				{ text: "Chain tamamlandı — toplam 8K token, 12 saniye.", cls: "accent" },
			],
		},

		{ kind: "heading", level: 2, text: "Hazır chain workflow'lar", id: "workflows" },
		{
			kind: "kbd-list",
			commands: [
				{ cmd: "/yap <görev>", desc: "kasif → planlayici → isci" },
				{ cmd: "/plan-yap <görev>", desc: "kasif → planlayici (sadece plan, kod yazmaz)" },
				{ cmd: "/yap-ve-incele <görev>", desc: "isci → gozden-geciren → isci (review feedback'i uygular)" },
				{ cmd: "/hata-ayikla <bug>", desc: "kasif → hata-avcisi (root cause)" },
				{ cmd: "/refactor-incele <hedef>", desc: "kasif → refactorcu → gozden-geciren" },
			],
		},

		{ kind: "heading", level: 2, text: "Paralel async" },
		{
			kind: "paragraph",
			text: "3 agent aynı anda farklı görevlerde çalışsın — wall-clock 3x hız, toplam token aynı:",
		},
		{
			kind: "code",
			lang: "ts",
			title: "Programatik paralel",
			code: `// SDK üzerinden
await delege({
  tasks: [
    { agent: "kasif",          task: "frontend keşif" },
    { agent: "test-yazari",    task: "backend test'leri yaz" },
    { agent: "gozden-geciren", task: "PR review" },
  ],
  concurrency: 3,
});

// Sonuç: 3 görev paralel
//   kasif         done in 8s
//   test-yazari   done in 12s
//   gozden-geciren done in 10s
//   Wall-clock: 12s (uzun olan kadar)
//   Sequential olsaydı: 30s`,
		},

		{ kind: "heading", level: 2, text: "Worktree ile dosya izolasyonu", id: "worktree" },
		{
			kind: "paragraph",
			text: "3 agent paralel çalışıyorken aynı dosyaya yazmak isterse conflict olur. Git worktree ile her agent kendi izole dosya sisteminde çalışır:",
		},
		{
			kind: "code",
			lang: "ts",
			code: `await delege({
  tasks: [
    { agent: "isci", task: "auth refactor" },
    { agent: "isci", task: "logging upgrade" },
    { agent: "isci", task: "test coverage" },
  ],
  worktree: true,  // Her agent ayrı git worktree'de
});

// Her görev kendi dalında, conflict yok.
// Sonunda merge stratejisi sen seç.`,
		},

		{ kind: "heading", level: 2, text: "Kendi agent'ını ekle" },
		{
			kind: "code",
			lang: "markdown",
			title: "~/.kanka/agents/devops.md",
			code: `---
name: devops
description: CI/CD, Docker, Kubernetes uzmanı. Pipeline yazar, infra debug eder.
tools: bash, read, write, edit
---

# devops agent

Sen DevOps konusunda uzman bir agent'sın. Görevin:
- CI/CD pipeline yazımı (GitHub Actions, GitLab CI, CircleCI)
- Dockerfile + docker-compose optimizasyonu
- Kubernetes manifests, Helm charts
- Infrastructure as Code (Terraform, Pulumi)

## Çalışma tarzın
- Production-grade önerirsin (security, secrets, env separation)
- Minimal Docker image (alpine, scratch tercih)
- Health check + readiness probe ekle
- Cost-aware (k8s resource limits)
`,
		},
		{
			kind: "callout",
			variant: "tip",
			text: "Restart sonrası /ekip ile yeni agent'ın listede gözükür. delege({ agent: 'devops', task: '...' }) veya doğal dilde 'devops çağır' diyebilirsin.",
		},
	],
	faq: [
		{
			q: "Subagent ana agent'ın hangi context'ini alır?",
			a: "Hiç. Her subagent boş context'le başlar. Sadece sen verdiğin 'task' string'i ile. Bu sayede izolasyon ve token tasarrufu sağlanır.",
		},
		{
			q: "Subagent kendisi de subagent çağırabilir mi?",
			a: "Evet, sınır yok. Ama dikkat — recursive subagent'lar exponential maliyet yaratabilir. Maks 2-3 derinlik öner.",
		},
		{
			q: "Paralel async sırasında hangi agent hata verirse?",
			a: "Diğerleri devam eder. Promise.allSettled() pattern'i — her tasks[i] için ayrı success/error döner.",
		},
	],
};

// ============================================================================
// CHAIN + PARALEL ASYNC (daha derinlemesine)
// ============================================================================

const chainDetail: FeatureDetail = {
	slug: "chain",
	emoji: "🔗",
	title: "Chain + Paralel Async",
	tagline: "Pipeline kur, görevleri paralel çalıştır.",
	intro:
		"Tek komutla agent zinciri (sequential) veya N agent paralel (async). Wall-clock kazancı 3x'e kadar çıkar. Worktree ile dosya izolasyonu opsiyonel.",
	tldr: [
		"Sequential chain: A → B → C (her biri öncekinin output'unu alır)",
		"Paralel async: A | B | C (aynı anda, 3x hız)",
		"Worktree: paralel async + git worktree = filesystem izolasyonu",
		"5 hazır workflow: /yap, /plan-yap, /yap-ve-incele, /hata-ayikla, /refactor-incele",
		"SDK ile programatik delege call",
	],
	blocks: [
		{ kind: "heading", level: 2, text: "Sequential vs Paralel" },
		{
			kind: "comparison",
			left: {
				title: "Sequential Chain",
				color: "blue",
				bullets: [
					"A → B → C — sırayla",
					"B, A'nın output'unu alır",
					"C, B'nin output'unu alır",
					"Wall-clock = toplam süre",
					"Bağımlılık varsa kullan",
					"Örnek: kasif → planlayici → isci",
				],
			},
			right: {
				title: "Paralel Async",
				color: "green",
				bullets: [
					"A | B | C — aynı anda",
					"Hepsi bağımsız task",
					"Sonuçlar Promise.allSettled",
					"Wall-clock = en uzun task",
					"Bağımsız iş varsa kullan",
					"Örnek: frontend + backend + tests",
				],
			},
		},

		{ kind: "heading", level: 2, text: "Hazır chain'ler" },
		{
			kind: "table",
			headers: ["Komut", "Pipeline", "Ne zaman?"],
			rows: [
				["/yap <görev>", "kasif → planlayici → isci", "Standart feature implementation"],
				["/plan-yap <görev>", "kasif → planlayici", "Sadece plan, kod yazma"],
				["/yap-ve-incele <görev>", "isci → gozden-geciren → isci", "Quality-first: review feedback uygulanır"],
				["/hata-ayikla <bug>", "kasif → hata-avcisi", "Root cause analizi"],
				["/refactor-incele <hedef>", "kasif → refactorcu → gozden-geciren", "Safe refactor + review"],
			],
		},

		{ kind: "heading", level: 2, text: "Paralel async — SDK örneği", id: "paralel" },
		{
			kind: "code",
			lang: "ts",
			title: "3 agent paralel",
			code: `import { delege } from "@thorrangonak/kanka/sdk";

const results = await delege({
  tasks: [
    {
      agent: "kasif",
      task: "src/auth/* dosyalarını incele",
      model: "google/gemini-2.5-flash", // Ucuz + hızlı
    },
    {
      agent: "test-yazari",
      task: "src/payments/checkout.ts için test yaz",
      model: "anthropic/claude-sonnet-4-6",
    },
    {
      agent: "gozden-geciren",
      task: "Son 3 commit'i incele",
      model: "anthropic/claude-opus-4-7", // Kalite önemli
    },
  ],
  concurrency: 3,
});

// results.kasif         — frontend audit raporu
// results.test_yazari   — yeni test dosyaları
// results.gozden_geciren — review yorumları`,
		},
		{
			kind: "callout",
			variant: "tip",
			title: "Task'a göre model",
			text: "Her görev için farklı LLM kullan: ucuz keşif Gemini, derin reasoning Opus. Hibrit kullanım %50+ ek tasarruf sağlar.",
		},

		{ kind: "heading", level: 2, text: "Worktree ile filesystem izolasyonu" },
		{
			kind: "paragraph",
			text: "3 agent aynı anda dosya yazıyorsa conflict olur. Worktree ile her agent kendi git branch'inde, kendi dosya sisteminde çalışır:",
		},
		{
			kind: "code",
			lang: "ts",
			code: `await delege({
  tasks: [
    { agent: "isci", task: "auth refactor",     branch: "refactor/auth" },
    { agent: "isci", task: "logging upgrade",   branch: "refactor/log" },
    { agent: "isci", task: "test coverage",     branch: "refactor/test" },
  ],
  worktree: true,  // Her task kendi worktree'de
  base: "main",    // Kaynak branch
});

// Sonuç: 3 ayrı branch, conflict yok
// Sen merge stratejisini seç (sequential merge / PR / squash)`,
		},

		{ kind: "heading", level: 2, text: "Custom chain yazımı" },
		{
			kind: "paragraph",
			text: "Kendi workflow'unu markdown ile tanımla — /komut olarak çalışır:",
		},
		{
			kind: "code",
			lang: "markdown",
			title: "~/.kanka/prompts/api-yap.md",
			code: `---
chain: [kasif, mimar, planlayici, isci, test-yazari, docs-yazari]
description: REST API endpoint'i sıfırdan yaz, test ve doc dahil
---

# /api-yap <endpoint>

Yeni REST API endpoint'i için tam pipeline:

1. **kasif** — mevcut API yapısını anla
2. **mimar** — endpoint için en uygun pattern (REST / RPC / GraphQL)
3. **planlayici** — adım adım plan
4. **isci** — endpoint + handler + middleware
5. **test-yazari** — integration test'ler
6. **docs-yazari** — OpenAPI/Swagger güncellemesi

User input: {{args}}
`,
		},
		{
			kind: "terminal",
			lines: [
				{ prefix: ">", text: "/api-yap POST /api/orders", cls: "warn" },
				{ text: "" },
				{ text: "↞ Chain başlatıldı: 6 agent, sequential", cls: "dim" },
				{ text: "..." },
				{ prefix: "✓", text: "6 agent tamamlandı — 18K token, 45 saniye", cls: "good" },
			],
		},

		{ kind: "heading", level: 2, text: "Benchmark" },
		{
			kind: "stat-grid",
			stats: [
				{ value: "1x", label: "Sequential chain", color: "var(--blue)" },
				{ value: "3x", label: "Paralel async (3 agent)", color: "var(--green)" },
				{ value: "5x", label: "Paralel + worktree (5 agent)", color: "var(--teal)" },
				{ value: "0", label: "Conflict (worktree ile)", color: "var(--mauve)" },
			],
		},
	],
	faq: [
		{
			q: "Hangisi daha verimli — chain mi paralel mi?",
			a: "Bağımlılık varsa chain. Görevler bağımsızsa paralel. Karışık durumlarda hibrit: önce paralel keşif, sonra sequential implementation.",
		},
		{
			q: "Paralel'de kaç agent maksimum?",
			a: "concurrency parametresi belirler (varsayılan 3, max 10 öneri). Çok yüksek olunca rate limit'e takılır.",
		},
		{
			q: "Worktree olmadan paralel filesystem conflict olur mu?",
			a: "Evet, olabilir. Aynı dosyaya yazan 2 agent → son yazan kazanır (race). Bağımsız klasörler dokunuyorsa sorun yok.",
		},
	],
};

// ============================================================================
// TOKEN TASARRUFU
// ============================================================================

const tokenDetail: FeatureDetail = {
	slug: "token",
	emoji: "💰",
	title: "Token Tasarrufu (~%70)",
	tagline: "Cache + izole context + paralel async = 3 katman optimizasyon.",
	intro:
		"Kanka 3 katmanlı token optimizasyonu uygular — prompt cache, subagent context isolation, paralel async. Çıplak LLM kullanımına göre 5 dosyalık refactor projesi $1.80'den $0.45'a düşer.",
	tldr: [
		"Prompt cache (~70% tasarruf) — Anthropic cache hit, 5dk TTL",
		"İzole context (~50%) — subagent kendi context'inde, ana sohbet şişmiyor",
		"Paralel async (3x hız) — wall-clock 1/3, toplam token aynı",
		"OAuth ile $0 marginal cost — Claude Pro/Max abonelik",
		"5 dosyalık refactor: $1.80 → $0.45 (-75% maliyet, -66% süre)",
	],
	blocks: [
		{ kind: "heading", level: 2, text: "3 katman" },

		{ kind: "heading", level: 3, text: "💾 Katman 1: Prompt Cache (~70%)" },
		{
			kind: "paragraph",
			text: "Anthropic prompt caching + GLM cache desteği. Sistem prompt'u, skill'ler, AGENTS.md gibi statik içerikler 5 dakika cache'lenir.",
		},
		{
			kind: "code",
			lang: "text",
			title: "Cache fiyatlandırma (Claude Sonnet 4.6)",
			code: `İlk turn (cache miss, full write):  $0.018 / 1K token
Sonraki turn'ler (cache hit, read): $0.002 / 1K token  → 1/10 fiyat

Tipik oturum: 50 turn
  - 1 cache miss:  $0.018
  - 49 cache hit:  49 × $0.002 = $0.098
  - Toplam:        $0.116

  Cache olmasaydı: 50 × $0.018 = $0.900
  Tasarruf:        87%`,
		},

		{ kind: "heading", level: 3, text: "🔒 Katman 2: İzole Context (~50%)" },
		{
			kind: "paragraph",
			text: "Subagent kendi context'inde çalışır, ana sohbet sadece özet alır:",
		},
		{
			kind: "code",
			lang: "text",
			title: "Context isolation",
			code: `Çıplak yaklaşım:
  Ana agent: 20 mesaj × ~2K token = 40K token
  → 'şu kodu detaylı oku' der
  → Ana context'e 20K token kod eklenir
  → Sonraki turn: 60K token kod GÖNDERİLİR (her seferinde tekrar)

Kanka:
  Ana agent: 40K token
  → delege({ agent: 'kasif', task: 'şu kodu oku' })
  → kasif KENDİ context'inde çalışır (200K kapasiteli)
  → kasif: 500 token özet döner
  → Ana agent şimdi: 40.5K token (sadece +500)
  → Sonraki turn: 40.5K gönderilir`,
		},

		{ kind: "heading", level: 3, text: "⚡ Katman 3: Paralel Async (~3x hız)" },
		{
			kind: "paragraph",
			text: "Toplam token aynı ama wall-clock 1/3'e iner:",
		},
		{
			kind: "code",
			lang: "text",
			title: "Sequential vs Paralel",
			code: `Sequential:
  kasif (8s) → test-yazari (12s) → gozden-geciren (10s)
  Toplam wall-clock: 30s
  Toplam token: 8K

Paralel:
  kasif         ⎫
  test-yazari   ⎬ aynı anda
  gozden-geciren⎭
  Wall-clock: max(8, 12, 10) = 12s
  Toplam token: 8K (aynı!)
  Kullanıcı bekleme: -60%`,
		},

		{ kind: "heading", level: 2, text: "Gerçek benchmark", id: "benchmark" },
		{
			kind: "paragraph",
			text: "5 dosyalık refactor projesi — auth modülünü yeniden yazma:",
		},
		{
			kind: "table",
			headers: ["Metrik", "Çıplak Claude", "kanka", "Tasarruf"],
			rows: [
				["Toplam token", "180K", "54K", "-70%"],
				["Maliyet (Sonnet 4.6)", "$1.80", "$0.45", "-75%"],
				["Wall-clock süre", "12 dk", "4 dk", "-66%"],
				["Kullanıcı bekleme", "12 dk active", "4 dk active", "-66%"],
				["Cache hit oranı", "0%", "78%", "+78pp"],
			],
		},

		{ kind: "heading", level: 2, text: "OAuth ile $0 marginal cost" },
		{
			kind: "paragraph",
			text: "Claude Pro ($20/ay) veya Max ($100/ay) abonelin varsa, OAuth ile sınırsız Opus + Sonnet — marginal cost = $0:",
		},
		{
			kind: "terminal",
			lines: [
				{ prefix: "$", text: "kanka", cls: "good" },
				{ prefix: ">", text: "/giriş", cls: "warn" },
				{ text: "Provider seç:" },
				{ text: "  [1] OAuth — Claude Pro/Max" },
				{ text: "  [2] API key — Anthropic" },
				{ text: "  [3] API key — OpenAI" },
				{ text: "  ..." },
				{ prefix: ">", text: "1", cls: "warn" },
				{ text: "" },
				{ text: "🌐 Tarayıcı açılıyor: claude.ai/oauth", cls: "info" },
				{ text: "..." },
				{ prefix: "✓", text: "OAuth tamam. Marginal cost: $0 (Pro/Max kapsamında)", cls: "good" },
			],
		},
		{
			kind: "callout",
			variant: "success",
			title: "Pro ipucu",
			text: "Token sayma derdi yok — aylık abonelik kapsamında. Yoğun kullanıcılar için bedava (kullanım limiti var ama günlük dev için yeterli).",
		},

		{ kind: "heading", level: 2, text: "Hibrit model kullanımı" },
		{
			kind: "code",
			lang: "ts",
			title: "Task'a göre LLM",
			code: `// Ucuz + hızlı keşif: Gemini Flash
await delege({
  agent: "kasif",
  task: "frontend dosyalarını listele",
  model: "google/gemini-2.5-flash", // $0.075 / 1M token
});

// Orta seviye iş: Sonnet
await delege({
  agent: "isci",
  task: "yeni component yaz",
  model: "anthropic/claude-sonnet-4-6", // $3 / 1M token
});

// Karmaşık reasoning: Opus
await delege({
  agent: "mimar",
  task: "microservice architecture design",
  model: "anthropic/claude-opus-4-7", // $15 / 1M token
});

// Toplam maliyet: $0.05 (vs Opus only $1.20) — %96 tasarruf`,
		},

		{ kind: "heading", level: 2, text: "Cache durumunu izle" },
		{
			kind: "kbd-list",
			commands: [
				{ cmd: "/bilgi", desc: "Cache hit oranı + maliyet özeti" },
				{ cmd: "/istatistik", desc: "Lokal kullanım analizi (oturum başına)" },
				{ cmd: "/maliyet", desc: "Şu anki oturumun toplam maliyeti" },
			],
		},
	],
	faq: [
		{
			q: "Cache nasıl çalışır?",
			a: "Anthropic ephemeral cache — sistem prompt üst kısmı (~6K token) cache_control: ephemeral ile işaretlenir. 5 dakika TTL. Sonraki request'lerde cache hit olursa o kısım 1/10 fiyat.",
		},
		{
			q: "Cache invalidation?",
			a: "Sistem prompt değişirse cache miss. Persona değiştirdiğinde, AGENTS.md güncellediğinde, skill yüklediğinde cache yenilenir.",
		},
		{
			q: "OAuth limit'e takılırsam?",
			a: "Claude Pro/Max'in günlük token limit'i var (resmi olmayan ~3-5M token/gün). Limit aşılırsa otomatik API key'e düşer (varsa).",
		},
	],
};

// ============================================================================
// MULTI-LLM PROVIDER
// ============================================================================

const multiLlmDetail: FeatureDetail = {
	slug: "multi-llm",
	emoji: "🔌",
	title: "10+ LLM Provider",
	tagline: "Tek paket, istediğin LLM. Vendor lock-in yok.",
	intro:
		"Kanka pi-coding-agent provider sisteminden faydalanır — 10+ LLM provider, tek arayüz. API key koy, kullan. Canlı model değiştir. Task'a göre farklı LLM ile hibrit kullanım.",
	tldr: [
		"10+ provider: Claude, GPT, Gemini, GLM, Grok, Llama, DeepSeek, Trendyol, MiniMax, Ollama",
		".env'e API key koy, otomatik bulunur",
		"/model ile canlı değiştir (Ctrl+P cycle)",
		"OAuth (Claude Pro/Max) — $0 marginal cost",
		"Task'a göre model — ucuz keşif Gemini, derin Opus",
	],
	blocks: [
		{ kind: "heading", level: 2, text: "Desteklenen provider'lar" },
		{
			kind: "table",
			headers: ["Provider", "Sağlayıcı", "Modeller", "Auth"],
			rows: [
				["Claude", "Anthropic", "Opus 4.7, Sonnet 4.6, Haiku", "API key veya OAuth"],
				["GPT", "OpenAI", "GPT-5, o4, GPT-4.1", "API key"],
				["Gemini", "Google", "2.5 Pro, 2.5 Flash", "API key"],
				["GLM", "Z.AI", "GLM-5.1, GLM-4.7", "API key (Coding Plan $0)"],
				["Grok", "xAI", "Grok 4, Grok 4 Fast", "API key"],
				["DeepSeek", "DeepSeek", "V3, R1 (reasoning)", "API key"],
				["Llama", "Groq / Together / lokal", "3.3, 4-405B", "API key veya lokal"],
				["🇹🇷 Trendyol", "Trendyol", "Türkçe-fine-tuned", "API key"],
				["MiniMax", "MiniMax", "abab6.5", "API key"],
				["Ollama", "Lokal", "Herhangi GGUF model", "Local, offline"],
			],
		},

		{ kind: "heading", level: 2, text: "Kurulum" },
		{
			kind: "code",
			lang: "bash",
			title: ".env (otomatik bulunur)",
			code: `# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI GPT
OPENAI_API_KEY=sk-proj-...

# Google Gemini
GEMINI_API_KEY=AIza...

# xAI Grok
XAI_API_KEY=xai-...

# Z.AI GLM
ZAI_API_KEY=...

# DeepSeek
DEEPSEEK_API_KEY=sk-...

# MiniMax
MINIMAX_API_KEY=...

# Trendyol (yerli)
TRENDYOL_API_KEY=...

# Lokal Ollama (API key gerekmez)
OLLAMA_HOST=http://localhost:11434`,
		},
		{
			kind: "paragraph",
			text: "Kanka ~/.pi/.env veya proje kökündeki .env dosyasından otomatik okur. Hangi key varsa, o provider aktif.",
		},

		{ kind: "heading", level: 2, text: "Canlı model değiştirme" },
		{
			kind: "kbd-list",
			commands: [
				{ cmd: "/giriş", desc: "Provider listesi açılır, seç" },
				{ cmd: "/model", desc: "Mevcut + alternatifleri göster, değiştir" },
				{ cmd: "Ctrl+P", desc: "Model cycle (hızlı değiştirme)" },
			],
		},
		{
			kind: "terminal",
			title: "/model komutu",
			lines: [
				{ prefix: ">", text: "/model", cls: "warn" },
				{ text: "" },
				{ text: "Şu an: anthropic/claude-sonnet-4-6" },
				{ text: "" },
				{ text: "Alternatif (kayıtlı API key olan):" },
				{ text: "  [1] anthropic/claude-opus-4-7" },
				{ text: "  [2] openai/gpt-5" },
				{ text: "  [3] google/gemini-2.5-pro" },
				{ text: "  [4] xai/grok-4-fast" },
				{ text: "  [5] zai/glm-5.1" },
				{ text: "  [6] ollama/qwen2.5-coder-32b (local)" },
				{ text: "" },
				{ prefix: ">", text: "3", cls: "warn" },
				{ prefix: "✓", text: "Aktif model: google/gemini-2.5-pro", cls: "good" },
			],
		},

		{ kind: "heading", level: 2, text: "OAuth (Claude Pro/Max)" },
		{
			kind: "paragraph",
			text: "Claude Pro ($20/ay) veya Max ($100/ay) aboneliğin varsa OAuth ile sınırsız kullanım — marginal cost = $0:",
		},
		{
			kind: "code",
			lang: "bash",
			code: `kanka
> /giriş
# 1) OAuth — Claude Pro/Max seç
# 2) Tarayıcı açılır → claude.ai/oauth
# 3) Onayla → terminal'e geri dön
# 4) Kanka token kaydeder (~/.pi/oauth.json)
# 5) Aylık abonelik kapsamında sınırsız Opus + Sonnet`,
		},

		{ kind: "heading", level: 2, text: "Lokal model — Ollama" },
		{
			kind: "paragraph",
			text: "Internet'siz, gizlilik öncelikli kullanım için Ollama. Tüm işlem lokal makinende:",
		},
		{
			kind: "code",
			lang: "bash",
			code: `# 1) Ollama kur
curl https://ollama.com/install.sh | sh

# 2) Coding model çek (~20GB)
ollama pull qwen2.5-coder:32b

# 3) Kanka kullan
kanka
> /model
# > 6) ollama/qwen2.5-coder:32b
> /yap fibonacci yazsana

# Tamamen lokal, ücretsiz, gizli`,
		},
		{
			kind: "callout",
			variant: "info",
			title: "Performans",
			text: "Lokal model GPU'na bağlı. 32B model için 24GB+ VRAM önerilir (RTX 4090, A100). 7B-13B modeller daha uygun fiyatlı GPU'larda.",
		},

		{ kind: "heading", level: 2, text: "Hibrit kullanım — task'a göre" },
		{
			kind: "code",
			lang: "ts",
			title: "Akıllı routing",
			code: `// Programatik
await delege({
  agent: "kasif",
  task: "100 dosya tara",
  model: "google/gemini-2.5-flash",   // Ucuz + hızlı: $0.075/1M
});

await delege({
  agent: "mimar",
  task: "microservice architecture",
  model: "anthropic/claude-opus-4-7", // Derin: $15/1M ama 1 kere
});

await delege({
  agent: "isci",
  task: "10 component yaz",
  model: "anthropic/claude-sonnet-4-6", // Orta: $3/1M, kalite/hız dengesi
});

// Toplam maliyet: $0.30 (sadece Opus kullanılsaydı $4.50)`,
		},

		{ kind: "heading", level: 2, text: "Karşılaştırma — hangi LLM hangi iş için?" },
		{
			kind: "table",
			headers: ["LLM", "İyi olduğu", "Maliyet", "Hız"],
			rows: [
				["Claude Opus 4.7", "Karmaşık reasoning, mimari", "$$$$", "Orta"],
				["Claude Sonnet 4.6", "General-purpose, balanced", "$$", "Hızlı"],
				["GPT-5", "Karmaşık planlama, tool use", "$$$$", "Orta"],
				["Gemini 2.5 Pro", "Long context (1M token)", "$$", "Hızlı"],
				["Gemini 2.5 Flash", "Hızlı keşif, basit iş", "$", "Çok hızlı"],
				["GLM-5.1", "Açık kaynak, Çince + İngilizce", "$", "Hızlı"],
				["Grok 4", "Real-time bilgi, web search", "$$", "Hızlı"],
				["DeepSeek R1", "Math + reasoning", "$", "Yavaş"],
				["Trendyol-LLM", "Türkçe fine-tuned", "$", "Hızlı"],
				["Ollama (local)", "Gizlilik, offline", "$0", "GPU'ya bağlı"],
			],
		},
	],
	faq: [
		{
			q: "API key olmayan provider'ları nasıl test ederim?",
			a: "Ücretsiz tier'ları dene: Gemini Flash günlük 1500 request, GLM ücretsiz, Ollama lokal sınırsız. Hesap aç → API key al → .env'e koy.",
		},
		{
			q: "Aynı anda farklı provider kullanabilir miyim?",
			a: "Evet — paralel async'de her tasks[i] için ayrı model belirleyebilirsin. Subagent'lar farklı LLM'lerle çalışabilir.",
		},
		{
			q: "OAuth token kaybolursa?",
			a: "rm ~/.pi/oauth.json + /giriş tekrar. Token süresi dolarsa otomatik refresh — refresh token expire ederse manuel.",
		},
		{
			q: "Custom (self-hosted) LLM ekleyebilir miyim?",
			a: "Evet, OpenAI-compatible API ise: KANKA_CUSTOM_PROVIDER_URL=https://benim-llm.com/v1 + API key. vLLM, LM Studio, TGI uyumlu.",
		},
	],
};

// ============================================================================
// TÜM DETAYLAR
// ============================================================================

export const FEATURE_DETAILS: Readonly<Record<string, FeatureDetail>> = {
	persona: personaDetail,
	gunluk: gunlukDetail,
	terminal: terminalDetail,
	guncelle: guncelleDetail,
	ekip: ekipDetail,
	chain: chainDetail,
	token: tokenDetail,
	"multi-llm": multiLlmDetail,
};

export const FEATURE_SLUGS = Object.keys(FEATURE_DETAILS);

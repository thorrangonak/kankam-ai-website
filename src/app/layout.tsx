import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin", "latin-ext"],
	display: "swap",
	weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin", "latin-ext"],
	display: "swap",
	weight: ["400", "500", "700"],
});

const siteUrl = "https://kankam.ai";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "kanka — Türkçe konuşan terminal kodlama asistanı",
		template: "%s · kankam.ai",
	},
	description:
		"Claude, GPT, Gemini destekli, KVKK uyumlu, %70 daha az token kullanan Türkçe AI kodlama asistanı. Terminal'de Türkçe konuş, kanka kodu yazsın.",
	keywords: [
		"kanka",
		"kankam",
		"türkçe ai",
		"yapay zeka kodlama",
		"ai coding agent",
		"türkçe coding assistant",
		"kvkk uyumlu",
		"claude code türkçe",
		"terminal asistanı",
		"open source ai agent",
		"typescript",
		"pi-coding-agent",
	],
	authors: [{ name: "thorrangonak", url: "https://github.com/thorrangonak" }],
	creator: "thorrangonak",
	publisher: "thorrangonak",
	openGraph: {
		type: "website",
		locale: "tr_TR",
		alternateLocale: ["en_US"],
		url: siteUrl,
		siteName: "kanka",
		title: "kanka — Türkçe konuşan terminal kodlama asistanı",
		description:
			"Claude, GPT, Gemini destekli, KVKK uyumlu, %70 daha az token kullanan Türkçe AI kodlama asistanı.",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "kanka — Kanka, şunu yapsana.",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "kanka — Türkçe konuşan terminal kodlama asistanı",
		description:
			"Claude, GPT, Gemini destekli, KVKK uyumlu, %70 daha az token. Terminal'de Türkçe konuş.",
		images: ["/og.png"],
		creator: "@thorrangonak",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: siteUrl,
		languages: {
			"tr-TR": siteUrl,
			"en-US": `${siteUrl}/en`,
		},
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#eff1f5" },
		{ media: "(prefers-color-scheme: dark)", color: "#1e1e2e" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="tr"
			className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col bg-background text-foreground">
				<ThemeProvider
					attribute="data-theme"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

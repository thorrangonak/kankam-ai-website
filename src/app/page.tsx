import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Features } from "@/components/sections/features";
import { PersonaDemo } from "@/components/sections/persona-demo";
import { KVKK } from "@/components/sections/kvkk";
import { TokenSavings } from "@/components/sections/token-savings";
import { ProviderGrid } from "@/components/sections/provider-grid";
import { Quickstart } from "@/components/sections/quickstart";
import { Community } from "@/components/sections/community";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

/**
 * Ana sayfa — 10 bölüm, design dosyasıyla 1:1 eşleme.
 * Sıralama tasarımın `app.jsx`'inden alındı.
 */
export default function HomePage() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<SocialProof />
				<Features />
				<PersonaDemo />
				<KVKK />
				<TokenSavings />
				<ProviderGrid />
				<Quickstart />
				<Community />
				<FinalCTA />
			</main>
			<Footer />
		</>
	);
}

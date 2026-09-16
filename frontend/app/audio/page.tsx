import Downloader from "@/components/download/Downloader";
import Header from "@/components/download/Header";
import Hero from "@/components/shared/Hero";
<Hero
    title="Enhance audio."
    subtitle="Your way."
    description="Remove noise, normalize volume and improve voice quality."
/>

export default function AudioPage() {
	return (
		<main className="flex min-h-screen flex-col bg-zinc-950 text-white">
			<Header />
			<Downloader />
		</main>
	);
}

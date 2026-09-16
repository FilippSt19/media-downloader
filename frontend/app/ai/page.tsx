import Downloader from "@/components/download/Downloader";
import Header from "@/components/download/Header";
import Hero from "@/components/shared/Hero";

<Hero
    title="Generate subtitles."
    subtitle="Your way."
    description="Automatically create subtitles, translate them and export them in multiple formats."
/>

export default function AiPage() {
	return (
		<main className="flex min-h-screen flex-col bg-zinc-950 text-white">
			<Header />
			<Downloader />
		</main>
	);
}

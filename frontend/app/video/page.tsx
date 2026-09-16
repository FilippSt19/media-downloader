import Downloader from "@/components/download/Downloader";
import Header from "@/components/download/Header";
import Hero from "@/components/shared/Hero";

<Hero
    title="Edit videos."
    subtitle="Your way."
    description="Trim, crop, resize and optimize your videos in a few clicks."
/>

export default function VideoPage() {
	return (
		<main className="flex min-h-screen flex-col bg-zinc-950 text-white">
			<Header />
			<Downloader />
		</main>
	);
}

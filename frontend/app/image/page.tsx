import Downloader from "@/components/download/Downloader";
import Header from "@/components/download/Header";
<Hero
    title="Edit images."
    subtitle="Your way."
    description="Remove backgrounds, compress images and extract text with AI."
/>

export default function ImagePage() {
	return (
		<main className="flex min-h-screen flex-col bg-zinc-950 text-white">
			<Header />
			<Downloader />
		</main>
	);
}

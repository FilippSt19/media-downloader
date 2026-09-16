import Downloader from "@/components/download/Downloader";
import Header from "@/components/download/Header";

export default function AudioPage() {
	return (
		<main className="flex min-h-screen flex-col bg-zinc-950 text-white">
			<Header />
			<Downloader />
		</main>
	);
}

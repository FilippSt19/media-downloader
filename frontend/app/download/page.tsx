import Downloader from "@/components/download/Downloader";
import Header from "@/components/download/Header";
import Hero from "@/components/shared/Hero";

<Hero
    title="Download media."
    subtitle="Your way."
    description="Paste a media link, choose your format and quality, and download the file you need."
/>

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <Header />
      <Downloader />
    </main>
  );
}
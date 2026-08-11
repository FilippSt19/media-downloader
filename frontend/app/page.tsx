import Downloader from "@/components/Downloader";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <Header />
      <Downloader />
    </main>
  );
}
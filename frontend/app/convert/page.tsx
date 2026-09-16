import Header from "@/components/shared/Header";
import Converter from "@/components/converter/Converter";
import Hero from "@/components/shared/Hero";

<Hero
    title="Convert media."
    subtitle="Your way."
    description="Upload a media file, choose the output format and convert it in seconds."
/>

export default function ConvertPage() {
    return (
        <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
            <Header />
            <Converter />
        </main>
    );
}
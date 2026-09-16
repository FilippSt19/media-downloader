import Header from "@/components/shared/Header";
import Converter from "@/components/converter/Converter";

export default function ConvertPage() {
    return (
        <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
            <Header />
            <Converter />
        </main>
    );
}
type HeroProps = {
    title: string;
    subtitle: string;
    description: string;
};

export default function Hero({
    title,
    subtitle,
    description,
}: HeroProps) {
    return (
        <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
                SIMPLE. FAST. FLEXIBLE.
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                {title}

                <span className="mt-1 block text-zinc-500">
                    {subtitle}
                </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                {description}
            </p>
        </div>
    );
}
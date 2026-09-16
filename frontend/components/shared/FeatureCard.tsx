import type { ReactNode } from "react";

type FeatureCardProps = {
    children: ReactNode;
};

export default function FeatureCard({
    children,
}: FeatureCardProps) {
    return (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            {children}
        </div>
    );
}
"use client";

import { useState } from "react";


export default function Converter() {
	const [fileName, setFileName] = useState<string | null>(null);

	return (
		<section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20">
			<div className="text-center">
				<p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
					Simple. Fast. Flexible.
				</p>
				<h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
					Convert your media.
				</h1>
				<p className="mx-auto mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
					Select a file to start converting it to another format.
				</p>
			</div>

			<label className="mt-10 cursor-pointer rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-10 text-center transition hover:border-white/40">
				<input
					type="file"
					className="sr-only"
					onChange={(event) =>
						setFileName(event.target.files?.[0]?.name ?? null)
					}
				/>
				<span className="text-zinc-300">
					{fileName ?? "Choose a media file"}
				</span>
				<span className="mt-2 block text-sm text-zinc-500">
					MP4, MP3, WAV, JPG and more
				</span>
			</label>
		</section>
	);
}

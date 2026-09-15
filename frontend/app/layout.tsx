import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import Script from "next/dist/client/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Media Downloader",
    description:
        "Download, convert and process media from YouTube, Instagram and TikTok.",

    manifest: "/manifest.webmanifest",

    icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
},

    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Media Downloader",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Toaster
          position="bottom-right"
          richColors
          expand
          closeButton
          theme="dark"
        />
        <Script id="register-sw" strategy="afterInteractive">
{`
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}
`}
</Script>
      </body>
    </html>
  );
}

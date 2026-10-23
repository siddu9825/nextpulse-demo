import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextPulse — Modern Next.js App Router Showcase",
  description:
    "A full-featured Next.js demo project showcasing Server Components, Dynamic Routes, Server Actions, Route Handlers, and Tailwind CSS.",
  keywords: ["Next.js", "React 18", "App Router", "Server Actions", "TypeScript", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-800 bg-slate-50 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

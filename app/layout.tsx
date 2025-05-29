import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { BASE_METADATA } from "@/lib/metadata";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = BASE_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Full-width textured background container */}
        <div className="w-full bg-green-100 bg-leaf-pattern bg-repeat rounded-b-xl">
          {/* Actual navbar inside, constrained to 80% */}
          <Navbar className="mx-auto lg:max-w-[80%] max-w-full" />
        </div>

        <main className="mx-auto lg:max-w-[80%] max-w-full p-2">
          {children}
        </main>

        <footer className="w-full bg-black text-white py-6 mt-8">
  <div className="max-w-[80%] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
    <p>Free to use. No rights reserved. With love from Vegan Future.</p>

    <div className="flex items-center gap-4">
      <Link
        href="https://www.youtube.com/@kind-future" // <-- Replace with your actual URL
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-white/80 hover:text-white"
      >
        Find us on YouTube
      </Link>
      <Link
        href="/contact" // <-- Replace with actual contact route
        className="hover:underline text-white/80 hover:text-white"
      >
        Contact us
      </Link>
    </div>
  </div>
</footer>
      </body>
    </html>
  );
}

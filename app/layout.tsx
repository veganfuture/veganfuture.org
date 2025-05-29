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
        {/* Sticky footer wrapper */}
        <div className="min-h-screen flex flex-col">
          {/* Full-width textured navbar background */}
          <div className="w-full bg-green-100 bg-leaf-pattern bg-repeat rounded-b-xl">
            <Navbar className="mx-auto lg:max-w-[80%] max-w-full" />
          </div>

          {/* Main content fills available space */}
          <main className="flex-grow w-full p-2">
            <div className="mx-auto lg:max-w-[80%] w-full">
              {children}
            </div>
          </main>

          {/* Footer always at the bottom */}
          <footer className="w-full bg-black text-white py-6 mt-8">
            <div className="max-w-[80%] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
              <p>Free to use. No rights reserved. With love from Vegan Future.</p>

              <div className="flex items-center gap-4">
                <Link
                  href="https://www.youtube.com/@kind-future"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  Find us on YouTube
                </Link>
                <Link
                  href="/contact"
                  className="hover:underline text-white/80 hover:text-white"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vegan Future",
  description: "Vegan Future of Amsterdam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar className="mx-auto lg:max-w-[800px] max-w-full" />
        <main className="mx-auto lg:max-w-[800px] max-w-full p-2">
          {children}
        </main>
      </body>
    </html>
  );
}

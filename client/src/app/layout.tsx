import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Player's Club",
  description: "Where the players play all the best games nonstop.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-zinc-900 text-emerald-50`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

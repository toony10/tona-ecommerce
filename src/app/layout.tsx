import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: "Tona",
  description: "E-commerce Application using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ roboto.className }>
        <Navbar />
        { children }
        <Footer />
      </body>
    </html>
  );
}

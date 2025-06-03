import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Tona - Login",
  description: "Login to Tona E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children

}

import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Rohit Menda — PM who ships",
  description:
    "Product Manager & Founder. I turn chaotic zero-to-one briefs into products real humans use. 15× growth, 750% DAU, ₹18Cr+ in revenue — but the stories are better.",
  metadataBase: new URL("https://rohitmenda.com"),
  openGraph: {
    title: "Rohit Menda — PM who ships",
    description: "AdTech. GenAI. Web3. E-comm. I've shipped all of it. Take a look.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans bg-cream text-ink antialiased overflow-x-hidden grain">
        <Cursor />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

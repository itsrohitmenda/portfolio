import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import SmoothScroll from "@/components/smooth-scroll";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohit Menda — Product",
  description:
    "Product Manager & Founder. Scaled products from 100K to 1.6M users, shipped GenAI on Big Billion Day, and launched Reliance Retail in the US in 45 days.",
  metadataBase: new URL("https://rohitmenda.com"),
  openGraph: {
    title: "Rohit Menda — Product",
    description: "AdTech. GenAI. E-comm. Retail. Four case studies, one operator.",
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
      <body className="font-sans bg-void text-ink antialiased noise">
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { DM_Mono, Hanken_Grotesk, Jersey_10 } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/content";
import "./globals.css";

const jersey = Jersey_10({
  variable: "--font-jersey",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — PM / PMM · Northwestern MBAi ’28`,
    template: `%s · ${site.name}`,
  },
  description:
    site.description,
  openGraph: {
    title: `${site.name} — personal site`,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e7e5ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jersey.variable} ${hanken.variable} ${dmMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

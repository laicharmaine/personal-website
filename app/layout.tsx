import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Mono, Hanken_Grotesk } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/content";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
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
    "Charmaine Lai: marketer turned product builder. Almost five years in AI marketing at Numenta, now a joint MBA + MS in AI at Northwestern (Kellogg + McCormick), looking for a summer 2027 PM / PMM internship in the Bay Area.",
  openGraph: {
    title: `${site.name} — personal site`,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f1ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${dmMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

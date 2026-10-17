import type { Metadata, Viewport } from "next";
import { DM_Mono, Hanken_Grotesk, Jersey_10 } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { defaultContent } from "@/lib/content";
import { getContent } from "@/lib/content-store";
import EditProvider from "@/components/edit/EditProvider";
import Toolbar from "@/components/edit/Toolbar";
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
  metadataBase: new URL("https://charmainel.ai"),
  title: {
    default: `${defaultContent.site.name} — AI marketer · Northwestern MBAi ’28`,
    template: `%s · ${defaultContent.site.name}`,
  },
  description: defaultContent.site.description,
  openGraph: {
    title: `${defaultContent.site.name} — personal site`,
    description: defaultContent.site.description,
    type: "website",
    url: "https://charmainel.ai",
    siteName: defaultContent.site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${defaultContent.site.name} — personal site`,
    description: defaultContent.site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#e7e5ff",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  return (
    <html
      lang="en"
      className={`${jersey.variable} ${hanken.variable} ${dmMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <EditProvider initial={content}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toolbar />
        </EditProvider>
      </body>
    </html>
  );
}

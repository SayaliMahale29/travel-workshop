import type { Metadata } from "next";
import { Anton, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/storage";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-title",
});

// Admin edits must appear without a redeploy.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.title,
    description: content.tagline,
    openGraph: {
      title: content.title,
      description: content.tagline,
      type: "website",
      images: ["/images/akash-banner.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${anton.variable}`}>
      <body className="font-sans antialiased">
        <Header
          siteName={content.siteName}
          registrationOpen={content.workshop.registrationOpen}
          registerHref="/register"
        />
        <main>{children}</main>
        <Footer
          siteName={content.siteName}
          contactEmail={content.privacy.contactEmail}
          instagram={content.creator.social.instagram}
        />
      </body>
    </html>
  );
}

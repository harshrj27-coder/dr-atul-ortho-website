import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import SiteChrome from "@/components/SiteChrome";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Dr. Atul Rai Sharma | Orthopaedics & Joint Replacement — Jalandhar",
    template: "%s | Dr. Atul Rai Sharma",
  },
  description:
    "Dr. Atul Rai Sharma — Consultant Orthopaedics & Joint Replacement Surgeon in Jalandhar. Robotic knee, hip & shoulder replacement, arthroscopy, sports injury and trauma care.",
  keywords: [
    "orthopedic surgeon Jalandhar",
    "knee replacement",
    "hip replacement",
    "robotic joint replacement",
    "Dr. Atul Rai Sharma",
  ],
  openGraph: {
    title: "Dr. Atul Rai Sharma | Orthopaedics & Joint Replacement",
    description:
      "World-class robotic joint replacement, arthroscopy and trauma care in Jalandhar.",
    type: "website",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0057D9",
  width: "device-width",
  initialScale: 1,
};

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Atul Rai Sharma",
  medicalSpecialty: "Orthopedic Surgery",
  description:
    "Consultant Orthopaedics & Joint Replacement Surgeon specialising in robotic knee, hip and shoulder replacement, arthroscopy, sports injury management and complex trauma care.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jalandhar",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  alumniOf: [
    "Dr. B.R. Ambedkar University, Agra",
    "MM Institute of Medical Sciences & Research, Ambala",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
      </head>
      <body className="font-body antialiased bg-white text-[#0b0f1a]" suppressHydrationWarning>
        <SmoothScrollProvider>
          <ServiceWorkerRegister />
          <SiteChrome>{children}</SiteChrome>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

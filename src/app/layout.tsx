import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://carewell.clinic"),
  title: {
    default: "CareWell Dental Clinic — Advanced Dental Care in Dwarka, New Delhi",
    template: "%s | CareWell Dental Clinic",
  },
  description:
    "CareWell Dental Clinic offers implants, braces, aligners, smile design and complete family dentistry in Dwarka, New Delhi. Book your appointment online.",
  keywords: [
    "dental clinic Dwarka Mor Delhi",
    "dental implants",
    "braces",
    "aligners",
    "smile design",
    "root canal",
    "teeth whitening",
  ],
  openGraph: {
    siteName: "CareWell Dental Clinic",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

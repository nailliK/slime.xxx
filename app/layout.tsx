import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dogicaPixel = localFont({
  src: [
    {
      path: "../public/fonts/Dogica/Dogica_Pixel.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Dogica/Dogica_Pixel_Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dogica-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SLIME",
  description: "I AM SLIME",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dogicaPixel.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

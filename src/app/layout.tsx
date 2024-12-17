import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const proximaNova = localFont({
  variable: "--font-proxima",
  src: [
    {
      path: "./fonts/ProximaNova-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ProximaNova-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/ProximaNova-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});
const dinCondensed = localFont({
  variable: "--font-din",
  src: [
    {
      path: "./fonts/D-DINCondensed-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "SO Coffee Roasters - Specialty Coffee",
  description:
    "SO Coffee Roasters - Portuguese Specialty Coffee Roasters. Visit coffee shops in Porto and Lisbon or buy your coffee online.",
};
export const viewport: Viewport = {
  // initialScale: 1,
  userScalable: false,
  // width: "device-width",
  // maximumScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${proximaNova.variable} ${dinCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

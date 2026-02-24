import QueryProvider from "@/app/query-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const beatrice = localFont({
  src: [
    {
      path: "../fonts/BeatriceTRIAL-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/BeatriceTRIAL-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-beatrice",
  display: "swap",
});

const beatriceDeck = localFont({
  src: [
    {
      path: "../fonts/BeatriceDeckTRIAL-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/BeatriceDeckTRIAL-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/BeatriceDeckTRIAL-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/BeatriceDeckTRIAL-Extrabold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-beatrice-deck",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
  ),
  title: {
    default: "Modeva Storefront",
    template: "%s | Modeva",
  },
  description:
    "The Modeva E-commerce Storefront - Premium fashion and lifestyle products",
  keywords: ["fashion", "e-commerce", "clothing", "lifestyle", "modeva"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Modeva Storefront",
    title: "Modeva Storefront",
    description:
      "The Modeva E-commerce Storefront - Premium fashion and lifestyle products",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Modeva Storefront - New Collection Summer 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modeva Storefront",
    description:
      "The Modeva E-commerce Storefront - Premium fashion and lifestyle products",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${beatrice.variable} ${beatriceDeck.variable} font-beatrice`}>
        <QueryProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <ProtectedRoute>{children}</ProtectedRoute>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

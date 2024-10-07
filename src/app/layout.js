import localFont from "next/font/local";
import "./globals.css";
import RootProviders from "@/components/providers/RootProvider";

// Geist fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Euclid Circular with .ttf files
const euclidCircular = localFont({
  src: [
    {
      path: "./fonts/Euclid-light.ttf",
      weight: "300",
    },
    {
      path: "./fonts/Euclid-regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/Euclid-medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/Euclid-semibold.ttf",
      weight: "600",
    },
    {
      path: "./fonts/Euclid-bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-euclid-circular",
});

export const metadata = {
  title: "1221",
  description: "1221 | The Song Recommender App",
  openGraph: {
    images: [`${process.env.AUTH_URL}/opengraph-image.png`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/logo-192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/logo-512.png"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-192.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/logo-192.png"
        />

        <meta name="apple-mobile-web-app-title" content="1221" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <meta name="theme-color" content="#eee" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${euclidCircular.variable} antialiased`}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}

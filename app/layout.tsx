
import { Analytics } from "@vercel/analytics/next"
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from '@/app/context/CartContext';
import Image from 'next/image';

// Configuration de la police Inter
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Dubai Chez Vous - Votre Boutique en Ligne de Produits du Moyen-Orient',
    template: '%s | Dubai Chez Vous',
  },
  description: 'Découvrez notre sélection exclusive de produits du Moyen-Orient. Livraison rapide et service client exceptionnel.',
  keywords: ['produits Moyen-Orient', 'épices orientales', 'décoration arabe', 'huile d\'argan', 'dattes', 'encens'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dubaichezvous.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'Dubai Chez Vous',
    title: 'Dubai Chez Vous - Votre Boutique en Ligne de Produits du Moyen-Orient',
    description: 'Découvrez notre sélection exclusive de produits du Moyen-Orient. Livraison rapide et service client exceptionnel.',
    images: [
      {
        url: new URL('/img/logo.png', process.env.NEXT_PUBLIC_SITE_URL || 'https://dubaichezvous.com').toString(),
        width: 1200,
        height: 630,
        alt: 'Dubai Chez Vous',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubai Chez Vous - Votre Boutique en Ligne',
    description: 'Découvrez notre sélection exclusive de produits du Moyen-Orient.',
    images: [new URL('/img/dark1.png', process.env.NEXT_PUBLIC_SITE_URL || 'https://dubaichezvous.com').toString()],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="fr" className={inter.className}>
          <head>
            <meta name="theme-color" content="#ffffff" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              href="/img/logo.png"
              as="image"
              type="image/png"
              imageSizes="1200x630"
            />
          </head>
          <body className="min-h-screen bg-white text-gray-900">
            <div style={{ display: 'none' }}>
              <Image
                src="/img/logo.png"
                alt=""
                width={1200}
                height={630}
                priority
                loading="eager"
              />
            </div>
            {children}
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'AlertNow - Simple Alerting  API',
  description: 'Monitor your systems with intelligent alerts and powerful automations',
  openGraph: {
    title: 'AlertNow - Simple Alerting  API',
    description: 'Monitor your systems with intelligent alerts and powerful automations',
    url: `${siteUrl}/`, // URL of the page
    siteName: 'AlertNow',
    images: [
      {
        url: `${siteUrl}/cover2.png`, // Path to your image in the public folder
        width: 1200,
        height: 630,
        alt: 'Monitor your systems with intelligent alerts and powerful automations',
      },
    ],
    locale: 'en_US', // Optional: Specify locale
    type: 'website', // Optional: Specify content type (website, article, etc.)
  },
  icons: {
    // You can provide a string path, a single object, or an array of objects
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      // Example for dark mode preference:
      // { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)', type: 'image/png' },
      // Example using SVG:
      { url: '/favicon.ico', type: 'image/svg+xml' },
    ],
    // Use 'shortcut' for older browsers or specific needs (often redundant with 'icon')
    shortcut: '/favicon.ico', // Points to /public/shortcut-icon.png
    // Apple Touch Icon
    apple: [
      { url: '/apple-touch-icon.png' }, // Default 180x180
    ],
    // For other non-standard icons (e.g., manifest icons, specific platform icons)
    other: [
      {
        rel: 'alternate alertnow icon', // Example custom relation
        type: 'image/png',
        sizes: '48x48',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'alternate alertnow icon', // Example custom relation
        type: 'image/png',
        sizes: '48x48',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  // Optional: Add Twitter specific card metadata
  twitter: {
    card: 'summary_large_image', // Type of card ('summary', 'summary_large_image', 'app', 'player')
    title: 'AlertNow - Simple Alerting  API',
    description: 'Monitor your systems with intelligent alerts and powerful automations',
    images: [`${siteUrl}/cover2.png`], // Must be an absolute URL
  },
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false} disableTransitionOnChange forcedTheme={undefined}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!} />
      </body>
    </html>
  )
}


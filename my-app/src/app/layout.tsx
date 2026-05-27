import type { Metadata } from "next"
import "./globals.css"
import { site } from "../data/portfolio"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.title,
  keywords: [
    "Portfólio",
    "Engenharia de Software",
    "Next.js",
    "React",
    "TypeScript",
    "Backend",
    "APIs",
    "SaaS",
    "Nexa",
    site.name,
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.title,
    locale: site.locale,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/20I4Nw7YQ2T3yhvG1pYbUg8iEIXy9LS9DrAz6vTQc5cO1Y9tN1qpmTt8FA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}

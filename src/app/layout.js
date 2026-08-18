import { Plus_Jakarta_Sans } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/ui/globals.css";

const googleSansAlt = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://eronime.com"),

  title: {
    default: "Eronime",
    template: "%s | Eronime",
  },

  description:
    "Explore animated, hentai, cosplay, and adult entertainment content on Eronime.",

  applicationName: "Eronime",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "jY6i0Vx_8kWQDKYtICYX6l3tontTolPgy9kYcd-Wm0A",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eronime.com",
    siteName: "Eronime",
    title: "Eronime",
    description:
      "Explore animated, hentai, cosplay, and adult entertainment content.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eronime",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Eronime",
    description:
      "Explore animated, hentai, cosplay, and adult entertainment content.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`${googleSansAlt.className} h-full antialiased`}>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}

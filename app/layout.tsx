import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ScaleWeb Agency — Premium Websites That Convert",
    template: "%s — ScaleWeb Agency",
  },
  description: "ScaleWeb Agency designs and develops premium, high-performing websites for businesses, startups and growing brands in India and worldwide.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "ScaleWeb Agency — Premium Websites That Convert",
    description: "Premium website strategy, UI/UX and custom development for ambitious businesses, startups and growing brands.",
    siteName: "ScaleWeb Agency",
    type: "website",
    images: [{ url: "/og-scaleweb.png", width: 1200, height: 630, alt: "ScaleWeb Agency selected website work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScaleWeb Agency — Premium Websites That Convert",
    description: "Premium website strategy, UI/UX and custom development for ambitious brands.",
    images: ["/og-scaleweb.png"],
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ScaleWeb Agency",
  description: "Website strategy, UI/UX design and custom web development for businesses, startups and growing brands.",
  email: "scaleweb152@gmail.com",
  telephone: ["+91-78038-51101", "+91-96693-66166"],
  areaServed: ["India", "Worldwide"],
  sameAs: ["https://www.instagram.com/scaleweb_agency/"],
  knowsAbout: ["Website Strategy", "UI/UX Design", "Custom Web Development", "Mobile Optimization", "AI and SaaS Websites", "Landing Pages"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}

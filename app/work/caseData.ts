export type CaseStudyData = {
  slug: string;
  number: string;
  name: string;
  year: string;
  category: string;
  headline: string;
  intro: string;
  challenge: string;
  approach: string;
  outcome: string;
  scope: string[];
  features: { title: string; copy: string }[];
  desktop: string;
  mobile: string;
  gallery: { src: string; alt: string; kind?: "desktop" | "mobile" }[];
  liveUrl: string;
  next: { name: string; href: string };
  accent: "civic" | "hydraa" | "vcap";
};

export const caseStudies: Record<string, CaseStudyData> = {
  "civic-pulse-ai": {
    slug: "civic-pulse-ai",
    number: "01 / 03",
    name: "Civic Pulse AI",
    year: "2026",
    category: "AI / CIVIC TECHNOLOGY",
    headline: "Every citizen voice, routed with clarity.",
    intro: "A civic issue-reporting platform that combines voice intake, complaint tracking, ward-level intelligence, and an administrative action console in one clear experience.",
    challenge: "Municipal complaints arrive through scattered channels and are difficult to classify, prioritize, and track. The website needed to explain a complex AI product without making citizens or administrators work to understand it.",
    approach: "We organized the experience around two people: the citizen reporting an issue and the administrator taking action. Strong hierarchy, guided actions, and realistic product views make the platform feel immediate and usable.",
    outcome: "The finished experience gives citizens a clearer reporting path, makes complex product capabilities easier to understand, and presents the platform more professionally across desktop and mobile.",
    scope: ["Website strategy", "Product UX", "UI design", "AI / SaaS storytelling", "Responsive development"],
    features: [
      { title: "Voice-first reporting", copy: "A prominent voice flow makes issue submission accessible while retaining a complete manual form." },
      { title: "Transparent tracking", copy: "Complaint stages, assigned departments, and next actions are presented in a clear visual sequence." },
      { title: "Ward intelligence", copy: "Live issue clusters and priority signals turn civic data into a useful decision surface." },
    ],
    desktop: "/civic-desktop.png",
    mobile: "/civic-mobile.jpeg",
    gallery: [
      { src: "/civic-report.png", alt: "Civic Pulse AI desktop complaint form", kind: "desktop" },
      { src: "/civic-mobile-form.jpeg", alt: "Civic Pulse AI mobile complaint form", kind: "mobile" },
      { src: "/civic-tracker.png", alt: "Civic Pulse AI complaint tracking dashboard", kind: "desktop" },
      { src: "/civic-admin.png", alt: "Civic Pulse AI administrative console", kind: "desktop" },
    ],
    liveUrl: "https://civic-pulse-ai-zeta.vercel.app/",
    next: { name: "HYDRAA Drop", href: "/work/hydraa-drop" },
    accent: "civic",
  },
  "hydraa-drop": {
    slug: "hydraa-drop",
    number: "02 / 03",
    name: "HYDRAA Drop",
    year: "2026",
    category: "PREMIUM PACKAGED WATER",
    headline: "Pure product. Premium digital presence.",
    intro: "A dark, high-contrast brand website for a packaged-water supplier serving bulk orders, retail partners, hotels, restaurants, weddings, and corporate events.",
    challenge: "The business serves very different audiences—from high-volume buyers to couples planning an event. The experience needed to feel premium while keeping every path to enquiry simple on mobile.",
    approach: "We created a bold water-led visual language, separated the service paths clearly, and used WhatsApp-focused calls to action throughout the journey. Product imagery carries the brand while concise copy keeps the experience fast.",
    outcome: "The website now presents HYDRAA as a more credible premium supplier, clarifies its different order types, and shortens the path from interest to a WhatsApp enquiry.",
    scope: ["Website strategy", "Brand direction", "Mobile UI / UX", "Custom development", "WhatsApp conversion flow"],
    features: [
      { title: "Clear service paths", copy: "Bulk supply, customized bottles, and retail distribution are easy to compare and act on." },
      { title: "Occasion-led storytelling", copy: "Wedding, hospitality, corporate, retail, and fitness needs each receive a distinct visual moment." },
      { title: "Mobile-first enquiry", copy: "Every important section creates a direct route into the order conversation." },
    ],
    desktop: "/hydraa-hero.jpeg",
    mobile: "/hydraa-gallery.jpeg",
    gallery: [
      { src: "/hydraa-services.jpeg", alt: "HYDRAA Drop premium services section", kind: "mobile" },
      { src: "/hydraa-gallery.jpeg", alt: "HYDRAA Drop mobile gallery", kind: "mobile" },
      { src: "/hydraa-hero.jpeg", alt: "HYDRAA Drop mobile homepage", kind: "mobile" },
      { src: "/hydraa-contact.jpeg", alt: "HYDRAA Drop contact section", kind: "mobile" },
    ],
    liveUrl: "https://hydradrop-in.vercel.app/",
    next: { name: "VCAP Physiotherapy", href: "/work/vcap-physiotherapy" },
    accent: "hydraa",
  },
  "vcap-physiotherapy": {
    slug: "vcap-physiotherapy",
    number: "03 / 03",
    name: "VCAP Physiotherapy",
    year: "2026",
    category: "HEALTHCARE / LEAD GENERATION",
    headline: "From pain-relief search to confident appointment.",
    intro: "A conversion-focused healthcare website that communicates expert physiotherapy care, home-visit availability, recovery steps, and clear booking options.",
    challenge: "People looking for pain relief need confidence quickly. The website had to explain the treatment approach, build trust, and make appointment or WhatsApp contact effortless across desktop and mobile.",
    approach: "We combined calm navy authority with focused orange actions, clear treatment information, an understandable recovery process, and repeated booking opportunities without overwhelming the page.",
    outcome: "Visitors can understand the care process more quickly, discover home visits easily, and move from pain-relief research to appointment or WhatsApp contact with less friction.",
    scope: ["Website strategy", "Healthcare UX", "Responsive UI design", "Lead-generation flow", "Custom development"],
    features: [
      { title: "Immediate booking routes", copy: "Appointment and WhatsApp actions remain clear from the hero through the final contact section." },
      { title: "Visible care process", copy: "Assessment, diagnosis, treatment planning, and recovery are explained as one understandable path." },
      { title: "Home-visit positioning", copy: "A dedicated visual treatment option makes at-home care easy to discover and request." },
    ],
    desktop: "/vcap-desktop.png",
    mobile: "/vcap-mobile.jpeg",
    gallery: [
      { src: "/vcap-benefits.png", alt: "VCAP Physiotherapy benefits section", kind: "desktop" },
      { src: "/vcap-process.jpeg", alt: "VCAP Physiotherapy mobile recovery process", kind: "mobile" },
      { src: "/vcap-testimonials.png", alt: "VCAP Physiotherapy patient stories section", kind: "desktop" },
      { src: "/vcap-home-visit.jpeg", alt: "VCAP Physiotherapy home visit section", kind: "mobile" },
      { src: "/vcap-booking.jpeg", alt: "VCAP Physiotherapy mobile booking form", kind: "mobile" },
    ],
    liveUrl: "https://vcap-physiotherapy.vercel.app/",
    next: { name: "Civic Pulse AI", href: "/work/civic-pulse-ai" },
    accent: "vcap",
  },
};

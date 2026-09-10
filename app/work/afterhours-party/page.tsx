import type { Metadata } from "next";
import CaseStudyPage from "../../components/CaseStudyPage";
import { caseStudies } from "../caseData";

export const metadata: Metadata = {
  title: "AfterHours Event Platform Case Study",
  description: "AfterHours event website, responsive RSVP experience, secure admin dashboard and full-stack development by ScaleWeb Agency.",
  openGraph: {
    title: "AfterHours Case Study — ScaleWeb Agency",
    description: "A cinematic event website and protected organiser dashboard designed and developed as one connected platform.",
    images: ["/afterhours/hero-desktop.webp"],
  },
};

export default function AfterHoursCaseStudy() {
  return <CaseStudyPage study={caseStudies["afterhours-party"]} />;
}

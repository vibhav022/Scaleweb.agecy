import type { Metadata } from "next";
import CaseStudyPage from "../../components/CaseStudyPage";
import { caseStudies } from "../caseData";

export const metadata: Metadata = {
  title: "Civic Pulse AI Case Study",
  description: "Civic Pulse AI website strategy, product UX, responsive UI design, and custom development by ScaleWeb Agency.",
  openGraph: { title: "Civic Pulse AI Case Study — ScaleWeb Agency", description: "A clear, responsive AI civic-technology platform designed and developed by ScaleWeb Agency.", images: ["/civic-desktop.png"] },
};

export default function CivicPulseCaseStudy() {
  return <CaseStudyPage study={caseStudies["civic-pulse-ai"]} />;
}

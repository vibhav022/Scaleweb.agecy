import type { Metadata } from "next";
import CaseStudyPage from "../../components/CaseStudyPage";
import { caseStudies } from "../caseData";

export const metadata: Metadata = {
  title: "HYDRAA Drop Case Study",
  description: "HYDRAA Drop premium mobile website strategy, brand direction, UI/UX, and custom development by ScaleWeb Agency.",
  openGraph: { title: "HYDRAA Drop Case Study — ScaleWeb Agency", description: "A premium, mobile-first packaged-water brand website designed and developed by ScaleWeb Agency.", images: ["/hydraa-hero.jpeg"] },
};

export default function HydraaDropCaseStudy() {
  return <CaseStudyPage study={caseStudies["hydraa-drop"]} />;
}

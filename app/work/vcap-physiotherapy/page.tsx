import type { Metadata } from "next";
import CaseStudyPage from "../../components/CaseStudyPage";
import { caseStudies } from "../caseData";

export const metadata: Metadata = {
  title: "VCAP Physiotherapy Case Study",
  description: "VCAP Physiotherapy healthcare UX, responsive UI design, lead-generation flow, and custom development by ScaleWeb Agency.",
  openGraph: { title: "VCAP Physiotherapy Case Study — ScaleWeb Agency", description: "A responsive healthcare website built around trust and appointment conversion by ScaleWeb Agency.", images: ["/vcap-desktop.png"] },
};

export default function VcapPhysiotherapyCaseStudy() {
  return <CaseStudyPage study={caseStudies["vcap-physiotherapy"]} />;
}

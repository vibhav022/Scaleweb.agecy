import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description: "General website and project-enquiry terms for ScaleWeb Agency.",
};

export default function TermsPage() {
  return <main className="legal-page"><nav className="legal-nav shell"><Link className="wordmark" href="/"><strong>SCALEWEB</strong><span>AGENCY</span></Link><Link className="legal-back" href="/">Back to website →</Link></nav><header className="legal-hero shell"><p className="section-label">Legal / Terms</p><h1>Website Terms</h1></header><article className="legal-content shell"><section><h2>Website information</h2><p>Information on this website describes ScaleWeb Agency’s services and selected work. It is provided for general information and does not form a binding project agreement.</p></section><section><h2>Project enquiries</h2><p>Submitting an enquiry does not create a contract. Project scope, pricing, timeline, responsibilities and payment terms are confirmed separately in writing before work begins.</p></section><section><h2>Portfolio content</h2><p>Project screenshots and names are shown to demonstrate real design and development work. External project websites remain subject to their own content and availability.</p></section><section><h2>Availability</h2><p>ScaleWeb Agency aims to keep this website accurate and available, but cannot guarantee uninterrupted access or that every external link will remain unchanged.</p></section><section><h2>Contact</h2><p>Questions about these terms can be sent to <a href="mailto:scaleweb152@gmail.com">scaleweb152@gmail.com</a>.</p></section></article></main>;
}

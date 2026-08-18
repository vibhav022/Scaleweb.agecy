import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ScaleWeb Agency handles information shared through website enquiries.",
};

export default function PrivacyPage() {
  return <main className="legal-page"><nav className="legal-nav shell"><Link className="wordmark" href="/"><strong>SCALEWEB</strong><span>AGENCY</span></Link><Link className="legal-back" href="/">Back to website →</Link></nav><header className="legal-hero shell"><p className="section-label">Legal / Privacy</p><h1>Privacy Policy</h1></header><article className="legal-content shell"><section><h2>Information you share</h2><p>When you contact ScaleWeb Agency, you may choose to share your name, business details, email address, phone number, website URL, budget range and project description.</p></section><section><h2>How it is used</h2><p>This information is used only to review your enquiry, understand your project and contact you about relevant next steps. ScaleWeb Agency does not sell enquiry information.</p></section><section><h2>How the project form works</h2><p>The website prepares your project details in your own email application. You decide whether to send that email. The website does not silently store form submissions in a separate database.</p></section><section><h2>External links</h2><p>The website links to live client websites, Instagram and WhatsApp. Those services operate under their own privacy policies.</p></section><section><h2>Contact</h2><p>For privacy questions, email <a href="mailto:scaleweb152@gmail.com">scaleweb152@gmail.com</a>.</p></section></article></main>;
}

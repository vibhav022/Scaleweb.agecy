"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { CaseStudyData } from "../work/caseData";

const webpFor = (src: string) => src.replace(/\.(png|jpe?g)$/i, ".webp");

function CaseImage({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return (
    <picture>
      <source srcSet={webpFor(src)} type="image/webp" />
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </picture>
  );
}

export default function CaseStudyPage({ study }: { study: CaseStudyData }) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    const items = Array.from(document.querySelectorAll("[data-reveal]"));
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`case-study case-study-${study.accent}`}>
      <a className="skip-link" href="#case-content">Skip to case study</a>
      <nav className="case-nav shell" aria-label="Case study navigation">
        <Link className="wordmark" href="/" aria-label="ScaleWeb Agency home"><strong>SCALEWEB</strong><span>AGENCY</span></Link>
        <Link className="case-back" href="/#work">← Selected work</Link>
        <a className="case-live" href={study.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${study.name} live website in a new tab`}>Open Live Site ↗</a>
      </nav>

      <div id="case-content">
        <header className="case-study-hero shell">
          <div className="case-hero-copy" data-reveal>
            <div className="case-overline"><span>{study.number}</span><span>{study.year}</span><span>{study.category}</span></div>
            <h1>{study.headline}</h1>
            <p>{study.intro}</p>
            <div className="case-scope-row">{study.scope.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <div className="case-hero-stage" aria-label={`${study.name} responsive website showcase`} data-reveal>
            <div className="case-hero-grid" aria-hidden="true" />
            {study.accent === "hydraa" ? (
              <>
                <div className="cs-phone cs-phone-back"><CaseImage src={study.mobile} alt={`${study.name} gallery on mobile`} eager /></div>
                <div className="cs-phone cs-phone-front"><CaseImage src={study.desktop} alt={`${study.name} homepage on mobile`} eager /></div>
              </>
            ) : (
              <>
                <div className="cs-browser"><div><i /><i /><i /><span>{study.liveUrl.replace("https://", "")}</span></div><CaseImage src={study.desktop} alt={`${study.name} desktop website`} eager /></div>
                <div className="cs-phone"><CaseImage src={study.mobile} alt={`${study.name} mobile website`} eager /></div>
              </>
            )}
            <div className="case-hero-label"><small>LIVE EXPERIENCE</small><b>{study.name}</b></div>
          </div>
        </header>

        <section className="case-overview">
          <div className="shell case-overview-grid">
            <span className="index" data-reveal>Project overview</span>
            <div data-reveal><small>The challenge</small><p>{study.challenge}</p></div>
            <div data-reveal><small>Our approach</small><p>{study.approach}</p></div>
            <div data-reveal><small>Qualitative outcome</small><p>{study.outcome}</p></div>
          </div>
        </section>

        <section className="case-built">
          <div className="shell case-built-head" data-reveal><span className="index">What we built</span><h2>One system.<br /><em>Every screen.</em></h2></div>
          <div className="shell case-feature-list">
            {study.features.map((feature, index) => <article key={feature.title} data-reveal><span>0{index + 1}</span><h3>{feature.title}</h3><p>{feature.copy}</p></article>)}
          </div>
        </section>

        <section className="case-gallery-section">
          <div className="shell case-gallery-head" data-reveal><span className="index">Responsive experience</span><p>Designed as one coherent experience across desktop and mobile—not a desktop layout compressed into a smaller screen.</p></div>
          <div className={`shell case-gallery case-gallery-${study.accent}`}>
            {study.gallery.map((image, index) => <figure className={`case-gallery-item ${image.kind === "mobile" ? "is-mobile" : "is-desktop"}`} key={`${image.src}-${index}`} data-reveal><div className="gallery-image"><CaseImage src={image.src} alt={image.alt} /></div><figcaption><span>0{index + 1}</span>{image.alt}</figcaption></figure>)}
          </div>
        </section>

        <section className="case-scope">
          <div className="shell case-scope-grid" data-reveal><span className="index">Scope</span><h2>Built with<br /><em>intent.</em></h2><div>{study.scope.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}</div></div>
        </section>

        <section className="case-next">
          <div className="shell case-next-inner" data-reveal><span>Next project</span><Link href={study.next.href}>{study.next.name}<b aria-hidden="true">↗</b></Link><p>Ready to build a premium digital presence for your business?</p><Link className="case-contact" href="/#contact">Start a Project ↗</Link></div>
        </section>
      </div>
    </main>
  );
}

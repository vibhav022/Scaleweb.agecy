"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const industries = [
  { label: "Wellness", title: "Care & wellbeing", image: "/industries/wellness.webp" },
  { label: "Local business", title: "Services near you", image: "/industries/local-business.webp" },
  { label: "Retail & supply", title: "Products people need", image: "/industries/retail-supply.webp" },
  { label: "Public services", title: "Connected communities", image: "/industries/public-services.webp" },
  { label: "Healthcare", title: "Clinics & practitioners", image: "/industries/healthcare.webp" },
  { label: "Consumer brands", title: "Brands built to grow", image: "/industries/consumer-brands.webp" },
  { label: "Technology", title: "Platforms & products", image: "/industries/technology.webp" },
  { label: "Events & hospitality", title: "Memorable experiences", image: "/industries/events-hospitality.webp" },
  { label: "Business operations", title: "Teams & workflows", image: "/industries/business-operations.webp" },
];

export function Industries() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const activate = (index: number) => {
    stageRef.current?.classList.remove("fan-waiting", "fan-entering");
    setActive(index);
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // The server-rendered fan is always visible. Enhance its entrance only when
    // it starts offscreen, so hydration or a missing observer cannot hide work.
    let observer: IntersectionObserver | undefined;
    if (!preference.matches && stage.getBoundingClientRect().top > window.innerHeight) {
      stage.classList.add("fan-waiting");
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { stage.classList.remove("fan-waiting"); stage.classList.add("fan-entering"); observer?.disconnect(); }
      }, { threshold: .15 });
      observer.observe(stage);
    }
    const reduce = () => { if (preference.matches) { stage.classList.remove("fan-waiting", "fan-entering"); observer?.disconnect(); } };
    preference.addEventListener("change", reduce);
    return () => { observer?.disconnect(); preference.removeEventListener("change", reduce); stage.classList.remove("fan-waiting", "fan-entering"); };
  }, []);

  return <section className="industries-section" id="industries" aria-labelledby="industries-title">
    <span id="work" className="section-anchor" aria-hidden="true" />
    <div className="reference-heading" data-reveal>
      <p className="reference-eyebrow section-label">Industries</p>
      <h2 className="agency-section-title" id="industries-title">Built for <em>every business</em></h2>
      <p>From healthcare and consumer brands to local businesses and digital platforms. Your industry, our next challenge.</p>
    </div>
    <div className={`industry-fan ${active !== null ? "has-active" : ""}`} ref={stageRef} onAnimationEnd={(event) => { if (event.target === event.currentTarget.lastElementChild) event.currentTarget.classList.remove("fan-entering"); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setActive(null); }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }} role="group" aria-label="Industries we build for">
      {industries.map((industry, index) => {
        const offset = index - 4;
        return <button className={`industry-card ${active === index ? "is-active" : ""}`} type="button" key={industry.label} aria-pressed={active === index} aria-label={`${industry.label}: ${industry.title}`} onPointerEnter={(event) => { if (event.pointerType === "mouse") activate(index); }} onFocus={() => activate(index)} onClick={() => activate(index)}
          style={{ "--fan-x": `${offset * 5.5}vw`, "--fan-y": `${offset * offset * 1.875}px`, "--fan-angle": `${offset * 2.5}deg`, "--fan-scale": 1 - Math.abs(offset) * .02, "--fan-order": index, "--fan-layer": offset === 0 ? 20 : 10 - Math.abs(offset) } as CSSProperties}>
          <img src={industry.image} alt="" width={960} height={960} loading="lazy" draggable={false} />
          <span className="industry-card-caption"><span>{industry.label}</span><strong>{industry.title}</strong></span>
        </button>;
      })}
    </div>
    <a className="portfolio-link" href="/portfolio">View portfolio <span aria-hidden="true">↗</span></a>
  </section>;
}

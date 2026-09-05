"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const capabilities = [
  { title: "Website Development", label: "Your digital first impression", image: "/capabilities/website.webp", icon: "web", copy: "Distinctive websites that bring your brand to life. Beautifully designed, fast to load and effortless to explore." },
  { title: "App Development", label: "Ideas, in your hands", image: "/capabilities/app.webp", icon: "app", copy: "Intuitive mobile experiences that turn a great idea into something people love using, every single day." },
  { title: "AI Media", label: "Imagination, without limits", image: "/scaleweb-editorial-desktop.webp", icon: "media", copy: "Original imagery, campaign visuals and motion made with AI and shaped by thoughtful creative direction." },
  { title: "System Development", label: "A smarter way to work", image: "/capabilities/system.webp", icon: "system", copy: "Connected tools, dashboards and business systems that simplify complex workflows and keep your team moving." },
] as const;

function CapabilityIcon({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "web" && <><rect x="3" y="4" width="18" height="15" rx="3" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01m-2 6-2 2 2 2m8-4 2 2-2 2m-3-5-2 6" /></>}
    {name === "app" && <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 5h4m-3 14h2" /></>}
    {name === "media" && <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" /><path d="m20 2 .5 1.5L22 4l-1.5.5L20 6l-.5-1.5L18 4l1.5-.5L20 2Z" /></>}
    {name === "system" && <><rect x="8" y="3" width="8" height="6" rx="1.5" /><rect x="2" y="15" width="8" height="6" rx="1.5" /><rect x="14" y="15" width="8" height="6" rx="1.5" /><path d="M12 9v3m-6 3v-3h12v3" /></>}
  </svg>;
}

export function Capabilities({ onEnquire }: { onEnquire: (service: string) => void }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [active, setActive] = useState(0);
  const drag = useRef({ down: false, moved: false, x: 0, scroll: 0 });

  const sync = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>(".capability-card"));
    const end = viewport.scrollWidth - viewport.clientWidth;
    const next = { start: viewport.scrollLeft < 4, end: viewport.scrollLeft >= end - 4 };
    setEdges((current) => current.start === next.start && current.end === next.end ? current : next);
    let nearest = 0;
    cards.forEach((card, index) => {
      if (Math.abs(card.offsetLeft - viewport.scrollLeft - 16) < Math.abs(cards[nearest].offsetLeft - viewport.scrollLeft - 16)) nearest = index;
    });
    setActive(nearest);
  }, []);

  const move = (direction: number) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(".capability-card");
    if (!viewport || !card) return;
    viewport.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(sync);
    observer.observe(viewport);
    sync();
    return () => observer.disconnect();
  }, [sync]);

  return <section className="capabilities-section light-section" id="capabilities" aria-labelledby="capabilities-title">
    <div className="reference-heading" data-reveal>
      <p className="reference-eyebrow section-label">About us</p>
      <h2 className="agency-section-title" id="capabilities-title">Inspired by ideas.<br /><em>Built for what comes next.</em></h2>
      <p>We turn ambitious ideas into exceptional digital experiences. From websites and apps to AI media and connected systems, we bring design and technology together to move your business forward.</p>
    </div>
    <div className="capability-controls" aria-label="Service card controls">
      <button type="button" aria-label="Previous services" onClick={() => move(-1)} disabled={edges.start}><span aria-hidden="true">←</span></button>
      <button type="button" aria-label="Next services" onClick={() => move(1)} disabled={edges.end}><span aria-hidden="true">→</span></button>
    </div>
    <div className="capability-viewport" ref={viewportRef} onScroll={sync} role="region" aria-roledescription="carousel" aria-label="What ScaleWeb does" tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
        if (event.key === "Home" || event.key === "End") { event.preventDefault(); event.currentTarget.scrollTo({ left: event.key === "Home" ? 0 : event.currentTarget.scrollWidth, behavior: "instant" }); }
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        drag.current = { down: true, moved: false, x: event.clientX, scroll: event.currentTarget.scrollLeft };
      }}
      onPointerMove={(event) => {
        const state = drag.current;
        if (!state.down) return;
        const distance = event.clientX - state.x;
        if (Math.abs(distance) > 7) {
          state.moved = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.classList.add("is-dragging");
          event.currentTarget.scrollLeft = state.scroll - distance;
        }
      }}
      onPointerUp={(event) => { drag.current.down = false; event.currentTarget.classList.remove("is-dragging"); if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      onPointerCancel={(event) => { drag.current.down = false; drag.current.moved = false; event.currentTarget.classList.remove("is-dragging"); }}
      onPointerLeave={() => { if (!drag.current.moved) drag.current.down = false; }}
      onClickCapture={(event) => { if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; } }}>
      <div className="capability-track">
        {capabilities.map((capability, index) => <button className={`capability-card capability-${capability.icon}`} key={capability.icon} type="button" onClick={() => onEnquire(capability.title)} aria-label={`${capability.title}. ${capability.copy} Discuss a project.`}>
          <img className="capability-image" src={capability.image} alt="" width={1200} height={900} loading="lazy" draggable={false} />
          <span className="capability-shade" aria-hidden="true" />
          <span className="capability-icon"><CapabilityIcon name={capability.icon} /></span>
          <span className="capability-index">0{index + 1} / 04</span>
          <span className="capability-content">
            <span className="capability-label">{capability.label}</span>
            <span className="capability-title">{capability.title}</span>
            <span className="capability-reveal"><span className="capability-description">{capability.copy}</span><span className="capability-launch" aria-hidden="true">→</span></span>
          </span>
        </button>)}
      </div>
    </div>
    <span className="sr-only" aria-live="polite">Services {active + 1} through {Math.min(active + 2, 4)} of 4</span>
  </section>;
}

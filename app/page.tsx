"use client";

import Lenis from "lenis";
import { CSSProperties, FormEvent, useCallback, useEffect, useRef, useState } from "react";

const services = [
  ["01", "Website Strategy", "Positioning, page structure, user journeys, conversion planning and content hierarchy."],
  ["02", "UI/UX Design", "Custom visual design, responsive layouts, interaction design and high-fidelity interfaces."],
  ["03", "Custom Web Development", "Fast, scalable and maintainable websites built around the needs of the business."],
  ["04", "Mobile Optimization", "Touch-friendly navigation, clear typography and consistent performance across devices."],
];

const process = [
  ["01", "Discover", "Understand the business, audience, goals, competitors and current website problems."],
  ["02", "Strategize", "Plan the structure, messaging, user journey, features and conversion approach."],
  ["03", "Design & Build", "Create the responsive design, develop the website and refine every interaction."],
  ["04", "Launch & Improve", "Test, optimize, publish and support the website after launch."],
];

const projects = [
  {
    slug: "civic-pulse-ai",
    number: "01",
    name: "Civic Pulse AI",
    category: "AI / Civic Technology",
    year: "2026",
    services: "Strategy · Product UX · UI Design · Development",
    description: "A civic issue-reporting platform that turns citizen complaints into clear, trackable action for citizens and administrators.",
    outcome: "Clearer information hierarchy, simplified reporting and a more credible product presentation across desktop and mobile.",
    desktop: "/civic-desktop.webp",
    desktopFallback: "/civic-desktop.png",
    mobile: "/civic-mobile.webp",
    mobileFallback: "/civic-mobile.jpeg",
    showcaseDesktop: "/showcase/civic-desktop.webp",
    showcaseMobile: "/showcase/civic-mobile.webp",
    live: "https://civic-pulse-ai-zeta.vercel.app/",
    tone: "civic",
  },
  {
    slug: "hydraa-drop",
    number: "02",
    name: "HYDRAA Drop",
    category: "Premium Packaged Water",
    year: "2026",
    services: "Strategy · Brand Direction · Mobile UX · Development",
    description: "A premium packaged-water website built for bulk supply, retail partners and customized event bottle enquiries.",
    outcome: "Stronger brand presentation, clearer service paths and faster access to WhatsApp ordering on mobile.",
    desktop: "/hydraa-hero.webp",
    desktopFallback: "/hydraa-hero.jpeg",
    mobile: "/hydraa-gallery.webp",
    mobileFallback: "/hydraa-gallery.jpeg",
    showcaseDesktop: "/showcase/hydraa-desktop.webp",
    showcaseMobile: "/showcase/hydraa-mobile.webp",
    live: "https://hydradrop-in.vercel.app/",
    tone: "hydraa",
  },
  {
    slug: "vcap-physiotherapy",
    number: "03",
    name: "VCAP Physiotherapy",
    category: "Healthcare / Lead Generation",
    year: "2026",
    services: "Strategy · Healthcare UX · Responsive Design · Development",
    description: "A conversion-focused physiotherapy website that builds trust quickly and makes appointment booking simple.",
    outcome: "Improved mobile usability, clearer treatment information and a more direct enquiry journey from search to session.",
    desktop: "/vcap-desktop.webp",
    desktopFallback: "/vcap-desktop.png",
    mobile: "/vcap-mobile.webp",
    mobileFallback: "/vcap-mobile.jpeg",
    showcaseDesktop: "/showcase/vcap-desktop.webp",
    showcaseMobile: "/showcase/vcap-mobile.webp",
    live: "https://vcap-physiotherapy.vercel.app/",
    tone: "vcap",
  },
];

const contactLinks = {
  whatsapp: "https://wa.me/917803851101?text=Hi%20ScaleWeb%20Agency%2C%20I%27d%20like%20to%20discuss%20a%20website%20project.",
  instagram: "https://www.instagram.com/scaleweb_agency/",
  gmail: "https://mail.google.com/mail/?view=cm&fs=1&to=scaleweb152@gmail.com&su=Website%20project%20enquiry&body=Hi%20ScaleWeb%20Agency%2C%0A%0AI%27d%20like%20to%20discuss%20a%20website%20project.",
};

function ContactIcon({ name }: { name: "whatsapp" | "instagram" | "gmail" }) {
  if (name === "instagram") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.7" r=".8" className="icon-fill" /></svg>;
  }

  if (name === "gmail") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h17v11h-17z" /><path d="m4 7 8 6 8-6" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-4.5A8.5 8.5 0 1 1 20.5 11.5Z" /><path d="M8.1 7.7c.7 3.3 2.4 5 5.7 6.5l1.7-1.6" /></svg>;
}

type FormFields = {
  name: string;
  contact: string;
  projectType: string;
  description: string;
};

const initialForm: FormFields = {
  name: "",
  contact: "",
  projectType: "",
  description: "",
};

function FallingWord({ word, start, emphasis = false }: { word: string; start: number; emphasis?: boolean }) {
  return (
    <span className={`hero-word-group ${emphasis ? "is-emphasis" : ""}`} aria-hidden="true">
      {Array.from(word).map((letter, index) => (
        <span className="hero-letter-mask" key={`${word}-${index}`}>
          <span className="hero-letter" style={{ "--letter-index": start + index } as CSSProperties}>{letter}</span>
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [form, setForm] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "gmail" | "whatsapp">("idle");
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const workSliderRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef(0);
  const sliderPausedRef = useRef(false);
  const sliderScrollTimerRef = useRef<number | null>(null);
  const sliderMotionFrameRef = useRef(0);
  const projectDialogRef = useRef<HTMLDivElement>(null);
  const projectOpenerRef = useRef<HTMLElement | null>(null);

  const showProject = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const viewport = workSliderRef.current;
    if (!viewport) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>(".work-card"));
    const nextIndex = (index + cards.length) % cards.length;
    const card = cards[nextIndex];
    if (!card) return;
    activeProjectRef.current = nextIndex;
    setActiveProject(nextIndex);
    const target = Math.min(card.offsetLeft, viewport.scrollWidth - viewport.clientWidth);
    cancelAnimationFrame(sliderMotionFrameRef.current);
    viewport.classList.add("is-programmatic");
    if (behavior === "auto") {
      viewport.scrollLeft = target;
      requestAnimationFrame(() => viewport.classList.remove("is-programmatic"));
      return;
    }
    const start = viewport.scrollLeft;
    const distance = target - start;
    const startedAt = performance.now();
    const move = (now: number) => {
      const progress = Math.min((now - startedAt) / 760, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      viewport.scrollLeft = start + distance * eased;
      if (progress < 1) sliderMotionFrameRef.current = requestAnimationFrame(move);
      else viewport.classList.remove("is-programmatic");
    };
    sliderMotionFrameRef.current = requestAnimationFrame(move);
  }, []);

  const syncProjectFromScroll = useCallback(() => {
    if (sliderScrollTimerRef.current !== null) window.clearTimeout(sliderScrollTimerRef.current);
    sliderScrollTimerRef.current = window.setTimeout(() => {
      const viewport = workSliderRef.current;
      if (!viewport) return;
      const cards = Array.from(viewport.querySelectorAll<HTMLElement>(".work-card"));
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      let nextIndex = 0;
      let nearest = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - viewportCenter);
        if (distance < nearest) {
          nearest = distance;
          nextIndex = index;
        }
      });
      if (nextIndex !== activeProjectRef.current) {
        activeProjectRef.current = nextIndex;
        setActiveProject(nextIndex);
      }
    }, 120);
  }, []);

  useEffect(() => () => {
    if (sliderScrollTimerRef.current !== null) window.clearTimeout(sliderScrollTimerRef.current);
    cancelAnimationFrame(sliderMotionFrameRef.current);
  }, []);

  useEffect(() => {
    let previousY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setHeaderScrolled(currentY > 24);
      if (currentY > previousY + 5 && currentY > 280) setHeaderHidden(true);
      if (currentY < previousY - 5 || currentY < 80) setHeaderHidden(false);
      previousY = currentY;
      const progress = document.documentElement.scrollHeight > window.innerHeight
        ? currentY / (document.documentElement.scrollHeight - window.innerHeight)
        : 0;
      document.documentElement.style.setProperty("--page-progress", `${Math.min(1, Math.max(0, progress)) * 100}%`);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
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
    const serviceObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
          serviceObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4, rootMargin: "-8% 0px -18%" });
    const serviceCards = Array.from(document.querySelectorAll("[data-service-card]"));
    serviceCards.forEach((item) => serviceObserver.observe(item));
    document.documentElement.classList.add("motion-enhanced");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    onScroll();
    return () => {
      observer.disconnect();
      serviceObserver.disconnect();
      document.documentElement.classList.remove("motion-enhanced");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      if (!sliderPausedRef.current) showProject(activeProjectRef.current + 1);
    }, 5200);
    return () => {
      window.clearInterval(interval);
    };
  }, [showProject]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (motionPreference.matches) video.pause();
      else void video.play().catch(() => undefined);
    };
    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    return () => motionPreference.removeEventListener("change", syncPlayback);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9, anchors: true });
    let frame = 0;
    const hero = document.querySelector<HTMLElement>(".hero");
    const heroGrid = hero?.querySelector<HTMLElement>(".hero-grid");
    const processSection = document.querySelector<HTMLElement>(".process-section");
    const processItems = Array.from(document.querySelectorAll<HTMLElement>(".process-list li"));
    const contactSection = document.querySelector<HTMLElement>(".contact-section");
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const animate = (time: number) => {
      lenis.raf(time);
      if (hero && heroGrid) {
        const heroProgress = clamp(window.scrollY / Math.max(1, hero.offsetHeight * .82));
        hero.style.setProperty("--hero-scroll-y", `${heroProgress * 96}px`);
        hero.style.setProperty("--hero-scroll-rotate", `${heroProgress * 3.5}deg`);
        heroGrid.style.setProperty("--hero-content-y", `${heroProgress * 54}px`);
        heroGrid.style.setProperty("--hero-content-scale", `${1 - heroProgress * .035}`);
        heroGrid.style.setProperty("--hero-content-opacity", `${1 - heroProgress * .62}`);
      }
      if (processSection) {
        const rect = processSection.getBoundingClientRect();
        const processProgress = clamp((window.innerHeight * .72 - rect.top) / Math.max(1, rect.height * .72));
        processSection.style.setProperty("--process-progress", `${processProgress * 100}%`);
        if (rect.top < window.innerHeight * .8 && rect.bottom > window.innerHeight * .2) {
          let activeIndex = 0;
          let smallestDistance = Number.POSITIVE_INFINITY;
          processItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const distance = Math.abs(itemRect.top + itemRect.height / 2 - window.innerHeight * .5);
            if (distance < smallestDistance) {
              smallestDistance = distance;
              activeIndex = index;
            }
          });
          processItems.forEach((item, index) => item.classList.toggle("is-scroll-active", index === activeIndex));
        } else {
          processItems.forEach((item) => item.classList.remove("is-scroll-active"));
        }
      }
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const contactProgress = clamp((window.innerHeight - rect.top) / Math.max(1, window.innerHeight * .75));
        contactSection.style.setProperty("--contact-shift", `${(1 - contactProgress) * 56}px`);
        contactSection.style.setProperty("--contact-opacity", `${.35 + contactProgress * .65}`);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let lastX = -100;
    let lastY = -100;
    let cursorFrame = 0;
    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("is-visible");
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      cursor.classList.toggle("is-arrow", target?.dataset.cursor === "arrow");
      cursor.classList.toggle("is-light", target?.dataset.cursorTone === "light");
    };
    const onPointerLeave = () => cursor.classList.remove("is-visible");
    const animateCursor = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      const velocityX = currentX - lastX;
      const velocityY = currentY - lastY;
      const speed = Math.min(12, Math.hypot(velocityX, velocityY));
      const angle = Math.atan2(velocityY, velocityX) * 180 / Math.PI;
      const stretch = 1 + speed * 0.025;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretch}, ${2 - stretch})`;
      lastX = currentX;
      lastY = currentY;
      cursorFrame = requestAnimationFrame(animateCursor);
    };
    cursorFrame = requestAnimationFrame(animateCursor);

    const magneticItems = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const magneticCleanups = magneticItems.map((item) => {
      const move = (event: PointerEvent) => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty("--magnetic-x", `${(event.clientX - rect.left - rect.width / 2) * 0.14}px`);
        item.style.setProperty("--magnetic-y", `${(event.clientY - rect.top - rect.height / 2) * 0.18}px`);
      };
      const leave = () => {
        item.style.setProperty("--magnetic-x", "0px");
        item.style.setProperty("--magnetic-y", "0px");
      };
      item.addEventListener("pointermove", move);
      item.addEventListener("pointerleave", leave);
      return () => {
        item.removeEventListener("pointermove", move);
        item.removeEventListener("pointerleave", leave);
      };
    });

    const workCards = Array.from(document.querySelectorAll<HTMLElement>(".work-card"));
    const cardCleanups = workCards.map((card) => {
      const video = card.querySelector("video");
      const play = () => video?.play().catch(() => undefined);
      const pause = () => {
        if (!video) return;
        video.pause();
        video.currentTime = 0;
      };
      card.addEventListener("pointerenter", play);
      card.addEventListener("pointerleave", pause);
      card.addEventListener("focusin", play);
      card.addEventListener("focusout", pause);
      return () => {
        card.removeEventListener("pointerenter", play);
        card.removeEventListener("pointerleave", pause);
        card.removeEventListener("focusin", play);
        card.removeEventListener("focusout", pause);
      };
    });

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    return () => {
      cancelAnimationFrame(cursorFrame);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      magneticCleanups.forEach((cleanup) => cleanup());
      cardCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hero || !finePointer || reducedMotion) return;

    const move = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      hero.style.setProperty("--hero-x", `${x * 100}%`);
      hero.style.setProperty("--hero-y", `${y * 100}%`);
      hero.style.setProperty("--hero-shift-x", `${(x - .5) * 24}px`);
      hero.style.setProperty("--hero-shift-y", `${(y - .5) * 18}px`);
    };
    const leave = () => {
      hero.style.setProperty("--hero-x", "76%");
      hero.style.setProperty("--hero-y", "26%");
      hero.style.setProperty("--hero-shift-x", "0px");
      hero.style.setProperty("--hero-shift-y", "0px");
    };

    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen || projectModalOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen, projectModalOpen]);

  useEffect(() => {
    if (!projectModalOpen) return;
    const timer = window.setTimeout(() => projectDialogRef.current?.querySelector<HTMLElement>(".project-modal-close")?.focus(), 80);
    const onModalKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setProjectModalOpen(false);
      window.setTimeout(() => projectOpenerRef.current?.focus(), 50);
    };
    window.addEventListener("keydown", onModalKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onModalKey);
    };
  }, [projectModalOpen]);

  const updateField = <K extends keyof FormFields>(field: K, value: FormFields[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormStatus("idle");
  };

  const prepareProjectMessage = () => {
    const nextErrors: Partial<Record<keyof FormFields, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!form.contact.trim()) nextErrors.contact = "Please enter an email or WhatsApp number.";
    if (!form.projectType) nextErrors.projectType = "Please choose a project type.";
    if (form.description.trim().length < 20) nextErrors.description = "Please share at least a few details about the project.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      window.setTimeout(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(), 50);
      return null;
    }

    const body = [
      `Full name: ${form.name}`,
      `Email / WhatsApp: ${form.contact}`,
      `Project type: ${form.projectType}`,
      "",
      "Project details:",
      form.description,
    ].join("\n");
    return {
      subject: `Website project enquiry — ${form.name}`,
      body,
    };
  };

  const submitProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = prepareProjectMessage();
    if (!message) return;
    setFormStatus("gmail");
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=scaleweb152@gmail.com&su=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(message.body)}`, "_blank", "noopener,noreferrer");
  };

  const submitProjectToWhatsApp = () => {
    const message = prepareProjectMessage();
    if (!message) return;
    setFormStatus("whatsapp");
    window.open(`https://wa.me/917803851101?text=${encodeURIComponent(`${message.subject}\n\n${message.body}`)}`, "_blank", "noopener,noreferrer");
  };

  const closeMenu = () => setMenuOpen(false);
  const openProjectModal = () => {
    projectOpenerRef.current = document.activeElement as HTMLElement | null;
    setProjectModalOpen(true);
  };
  const closeProjectModal = () => {
    setProjectModalOpen(false);
    window.setTimeout(() => projectOpenerRef.current?.focus(), 50);
  };

  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="motion-cursor" ref={cursorRef} aria-hidden="true"><span>↗</span></div>

      <header className={`site-header ${headerScrolled ? "is-scrolled" : ""} ${headerHidden && !menuOpen ? "is-hidden" : ""}`}>
        <div className="header-inner shell">
          <a className="wordmark" href="#top" aria-label="ScaleWeb Agency home"><strong>SCALEWEB</strong><span>AGENCY</span></a>
          <nav id="primary-navigation" className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <a className="header-cta" href="#contact" data-magnetic data-cursor="arrow">Start a Project <span aria-hidden="true">↗</span></a>
          <button className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? "Close" : "Menu"}</span><i aria-hidden="true" /></button>
        </div>
      </header>

      <div id="main-content">
        <section className="hero shell" aria-labelledby="hero-title" ref={heroRef}>
          <video className="hero-film" ref={heroVideoRef} autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} disablePictureInPicture>
            <source media="(max-width: 760px)" src="/scaleweb-brand-film-mobile.mp4" type="video/mp4" />
            <source src="/scaleweb-brand-film-desktop.mp4" type="video/mp4" />
          </video>
          <picture className="hero-portrait">
            <source media="(max-width: 760px)" srcSet="/scaleweb-editorial-mobile.webp" />
            <img src="/scaleweb-editorial-desktop.webp" alt="" fetchPriority="high" />
          </picture>
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-grid" data-reveal>
            <div className="hero-topline">
              <p className="eyebrow"><span /> Strategy · Design · Development</p>
              <p>India <i /> Worldwide</p>
            </div>
            <h1 id="hero-title" aria-label="Websites engineered to make brands impossible to ignore.">
              <span className="hero-line hero-line-one">
                <FallingWord word="Websites" start={0} />{" "}
                <FallingWord word="engineered" start={8} />
              </span>
              <span className="hero-line hero-line-two">
                <FallingWord word="to" start={18} />{" "}
                <FallingWord word="make" start={20} />{" "}
                <FallingWord word="brands" start={24} />
              </span>
              <span className="hero-line hero-line-three">
                <FallingWord word="impossible" start={30} emphasis />{" "}
                <FallingWord word="to" start={40} />{" "}
                <FallingWord word="ignore." start={42} />
              </span>
            </h1>
            <div className="hero-bottom">
              <p className="hero-intro">Premium, high-performing websites for ambitious businesses ready to grow, lead and be remembered.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact" data-magnetic data-cursor="arrow">Start a Project <span aria-hidden="true">↗</span></a>
                <a className="button button-secondary" href="#work" data-magnetic data-cursor="arrow">Explore Our Work <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </div>
          <a className="hero-scroll" href="#work" aria-label="Scroll to selected work"><span>Scroll to explore</span><i aria-hidden="true">↓</i></a>
        </section>

        <section className="work-section section" id="work" aria-labelledby="work-title">
          <div className="section-heading shell" data-reveal>
            <p className="section-label">01 — Selected Work</p>
            <div><h2 id="work-title">Real websites.<br /><em>Built for real businesses.</em></h2><p>A selection of strategy, design and development work created to improve credibility, usability and growth.</p></div>
          </div>
          <div className="work-slider shell" data-reveal onPointerEnter={() => { sliderPausedRef.current = true; }} onPointerLeave={() => { sliderPausedRef.current = false; }} onFocusCapture={() => { sliderPausedRef.current = true; }} onBlurCapture={() => { sliderPausedRef.current = false; }}>
            <div className="work-slider-viewport" ref={workSliderRef} onScroll={syncProjectFromScroll} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Selected website projects" onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") event.preventDefault(); if (event.key === "ArrowLeft") showProject(activeProject - 1); if (event.key === "ArrowRight") showProject(activeProject + 1); }}>
              <div className="work-slider-track">
                {projects.map((project, index) => (
                  <article className={`work-card work-card-${project.tone} ${activeProject === index ? "is-active" : ""}`} key={project.slug} aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.name}`}>
                    <a className="work-card-media" href={`/work/${project.slug}`} aria-label={`View ${project.name} case study`} data-cursor="arrow" data-cursor-tone="light">
                      <picture>
                        <source media="(max-width: 760px)" srcSet={project.showcaseMobile} />
                        <img src={project.showcaseDesktop} alt={`${project.name} website showcase`} loading={index === 0 ? "eager" : "lazy"} />
                      </picture>
                      <span className="work-card-number">{project.number}</span>
                      <span className="work-card-view">View project ↗</span>
                    </a>
                    <div className="work-card-copy">
                      <div><p>{project.category}</p><h3>{project.name}</h3></div>
                      <p>{project.description}</p>
                    </div>
                    <div className="work-card-links"><a href={`/work/${project.slug}`} data-cursor="arrow">Case Study ↗</a><a href={project.live} target="_blank" rel="noreferrer" aria-label={`View ${project.name} live website (opens in a new tab)`} data-cursor="arrow">Live Website ↗</a></div>
                  </article>
                ))}
              </div>
            </div>
            <div className="work-slider-controls" aria-label="Project slider controls">
              <button className="work-slider-arrow is-previous" type="button" onClick={() => showProject(activeProject - 1)} aria-label="Show previous project" data-cursor="arrow"><span aria-hidden="true">←</span></button>
              <div className="work-slider-progress">
                <span>0{activeProject + 1}</span>
                <div className="work-slider-rail" style={{ "--slider-position": activeProject } as CSSProperties}>
                  <i className="work-slider-thumb" aria-hidden="true" />
                  {projects.map((project, index) => <button type="button" key={project.slug} className={activeProject === index ? "is-active" : ""} onClick={() => showProject(index)} aria-label={`Show ${project.name}`} aria-current={activeProject === index ? "true" : undefined} />)}
                </div>
                <span>0{projects.length}</span>
              </div>
              <button className="work-slider-next" type="button" onClick={() => showProject(activeProject + 1)} data-magnetic data-cursor="arrow"><span>Next project</span><i aria-hidden="true">→</i></button>
            </div>
          </div>
        </section>

        <section className="services-section section light-section section-curve" id="services" aria-labelledby="services-title">
          <div className="section-heading shell" data-reveal><p className="section-label">02 — Expertise</p><div><h2 id="services-title">Everything needed<br />to build a better<br /><em>digital presence.</em></h2><p>Clear, focused services shaped around what your business needs—not a fixed template or bloated package.</p></div></div>
          <div className="service-stack shell">{services.map(([number, title, copy], index) => <article className={`service-card service-card-${index + 1}`} key={number} data-service-card><div className="service-card-head"><span>{number}</span><h3>{title}</h3><i aria-hidden="true">↗</i></div><div className="service-card-body"><p>{copy}</p><div className="service-art" aria-hidden="true"><i /><i /><i /></div></div></article>)}</div>
        </section>

        <section className="process-section section section-curve section-curve-dark" id="process" aria-labelledby="process-title">
          <div className="section-heading shell" data-reveal><p className="section-label">03 — Process</p><div><h2 id="process-title">Clear process.<br /><em>No confusion.</em></h2><p>You’ll always know what is happening, what comes next and what feedback is needed.</p></div></div>
          <ol className="process-list shell">{process.map(([number, title, copy]) => <li key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
        </section>

        <section className="why-section section light-section section-curve" aria-labelledby="why-title">
          <div className="why-grid shell">
            <div className="why-intro" data-reveal><p className="section-label">04 — Why ScaleWeb</p><h2 id="why-title">Design that looks good.<br /><em>Strategy that works.</em></h2><p>ScaleWeb combines strategy, design and development to create websites that feel premium while remaining clear, fast and useful for the people visiting them.</p></div>
            <div className="why-list">
              {["Custom direction, not recycled templates.", "Mobile-first thinking from the beginning.", "Direct and transparent communication.", "Design and development handled as one connected process."].map((item, index) => <article key={item} data-reveal><span>0{index + 1}</span><p>{item}</p></article>)}
            </div>
          </div>
        </section>

        <section className="about-section section" id="about" aria-labelledby="about-title">
          <div className="about-grid shell" data-reveal>
            <p className="section-label">About ScaleWeb</p>
            <h2 id="about-title">Built for growth.<br /><em>Designed with intent.</em></h2>
            <div><p>At ScaleWeb Agency, we design and develop premium, high-performing websites built to help businesses grow. Our services include website strategy, UI/UX design, custom web development, mobile optimization, AI and SaaS websites, landing pages and ongoing performance improvements—from idea to launch.</p><p>We work with businesses, startups and growing brands in India and worldwide, combining strong visual direction with clear business thinking.</p></div>
          </div>
        </section>

        <section className="contact-section light-section section-curve" id="contact" aria-labelledby="contact-title">
          <div className="contact-stage shell" data-reveal>
            <p className="contact-kicker">Start a project with ScaleWeb</p>
            <h2 id="contact-title">Ready to start<br /><em>building?</em></h2>
            <p className="contact-lead">Let’s talk about your project. No pressure—just a clear conversation about what your website could become.</p>
            <div className="contact-launch-ring">
              <button className="contact-launch" type="button" onClick={openProjectModal} data-magnetic data-cursor="arrow"><span>Talk to ScaleWeb</span><i aria-hidden="true">↗</i></button>
            </div>
            <div className="contact-direct" aria-label="Direct contact options">
              <a href={contactLinks.gmail} target="_blank" rel="noreferrer" data-cursor="arrow"><ContactIcon name="gmail" /><span>scaleweb152@gmail.com</span></a>
              <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer" data-cursor="arrow"><ContactIcon name="whatsapp" /><span>WhatsApp ScaleWeb</span></a>
              <a href="tel:+917803851101" data-cursor="arrow"><span className="contact-phone-icon" aria-hidden="true">↗</span><span>+91 78038 51101</span></a>
            </div>
            <p className="contact-note">India · Worldwide <i /> Replies within one business day</p>
          </div>
        </section>
      </div>

      <footer className="site-footer" id="footer">
        <div className="footer-card">
          <div className="footer-grid">
            <div className="footer-statement"><a className="footer-mark" href="#top" aria-label="ScaleWeb Agency home">SCALE<span>WEB</span></a><p>We build premium websites that turn first impressions into business growth.</p><div className="footer-socials"><a className="footer-social-link" href={contactLinks.whatsapp} target="_blank" rel="noreferrer" aria-label="Message ScaleWeb on WhatsApp" title="WhatsApp" data-cursor="arrow"><ContactIcon name="whatsapp" /></a><a className="footer-social-link" href={contactLinks.instagram} target="_blank" rel="noreferrer" aria-label="Visit ScaleWeb on Instagram" title="Instagram" data-cursor="arrow"><ContactIcon name="instagram" /></a><a className="footer-social-link" href={contactLinks.gmail} target="_blank" rel="noreferrer" aria-label="Email ScaleWeb with Gmail" title="Gmail" data-cursor="arrow"><ContactIcon name="gmail" /></a></div></div>
            <nav aria-label="Footer navigation"><span>Quick Links</span><a href="#top">Home</a><a href="#work">Work</a><a href="#services">Expertise</a><a href="#process">Process</a><a href="#about">About</a></nav>
            <div className="footer-services"><span>Services</span><a href="#services">Website Strategy</a><a href="#services">UI/UX Design</a><a href="#services">Web Development</a><a href="#services">Mobile Optimization</a></div>
            <div className="footer-contact"><span>Studio &amp; Contact</span><p>ScaleWeb Agency<br /><small>India · Working worldwide</small></p><a href="tel:+917803851101">+91 78038 51101</a><a href="tel:+919669366166">+91 96693 66166</a><a href="mailto:scaleweb152@gmail.com">scaleweb152@gmail.com</a><button type="button" onClick={openProjectModal} data-cursor="arrow">Start a Project <i aria-hidden="true">↗</i></button></div>
          </div>
          <div className="footer-bottom"><span>© 2026 ScaleWeb Agency. All rights reserved.</span><span>Built with clarity. Designed for growth.</span><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="#top">Back to top ↑</a></div></div>
        </div>
      </footer>

      {projectModalOpen && <div className="project-modal" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) closeProjectModal(); }}>
        <div className="project-modal-card" ref={projectDialogRef} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" aria-describedby="project-modal-copy">
          <button className="project-modal-close" type="button" onClick={closeProjectModal} aria-label="Close project enquiry">×</button>
          <div className="project-modal-heading"><span>Project enquiry</span><h2 id="project-modal-title">Talk to ScaleWeb.</h2><p id="project-modal-copy">Four quick answers are enough. We’ll review them and reply within one business day.</p></div>
          <form className="project-form project-form-modal" onSubmit={submitProject} noValidate>
            <div className="form-body">
              <div className="field-grid">
                <label><span>Your name *</span><input name="name" autoComplete="name" placeholder="Full name" value={form.name} onChange={(e) => updateField("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} /><small id="name-error" className="field-error">{errors.name}</small></label>
                <label><span>Email or WhatsApp *</span><input name="contact" autoComplete="email" placeholder="How should we reach you?" value={form.contact} onChange={(e) => updateField("contact", e.target.value)} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-error" : undefined} /><small id="contact-error" className="field-error">{errors.contact}</small></label>
                <label className="field-wide"><span>What do you need? *</span><select name="projectType" value={form.projectType} onChange={(e) => updateField("projectType", e.target.value)} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "project-error" : undefined}><option value="">Choose a project type</option><option>New business website</option><option>Website redesign</option><option>Landing page</option><option>AI or SaaS website</option><option>Mobile optimization</option><option>Ongoing website improvements</option></select><small id="project-error" className="field-error">{errors.projectType}</small></label>
                <label className="field-wide"><span>Tell us a little about it *</span><textarea name="description" rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="What should the website help your business achieve?" aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} /><small id="description-error" className="field-error">{errors.description}</small></label>
              </div>
              <div className="form-action"><div className="form-send"><span>Send your enquiry with</span><div className="form-send-options"><button className="form-send-button" type="submit" data-cursor="arrow"><ContactIcon name="gmail" /><span>Send with Gmail</span><i aria-hidden="true">↗</i></button><button className="form-send-button is-whatsapp" type="button" onClick={submitProjectToWhatsApp} data-cursor="arrow"><ContactIcon name="whatsapp" /><span>Send on WhatsApp</span><i aria-hidden="true">↗</i></button></div></div></div>
              <p className={`form-status ${formStatus !== "idle" ? "is-visible" : ""}`} role="status">{formStatus === "whatsapp" ? "WhatsApp should now be open with your project details prepared. Send the message to complete your enquiry." : "Gmail should now be open with your project details prepared. Send the email to complete your enquiry."}</p>
            </div>
          </form>
        </div>
      </div>}
    </main>
  );
}

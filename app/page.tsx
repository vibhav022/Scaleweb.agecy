"use client";

import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { useSceneMotion } from "./use-scene-motion";
import { Capabilities } from "./components/capabilities";
import { Industries } from "./components/industries";

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
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [form, setForm] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "gmail" | "whatsapp">("idle");
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(true);
  const projectDialogRef = useRef<HTMLDivElement>(null);
  const projectOpenerRef = useRef<HTMLElement | null>(null);

  useSceneMotion(heroRef);

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
    document.documentElement.classList.add("motion-enhanced");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px 40px" });
    const items = Array.from(document.querySelectorAll("[data-reveal]"));
    items.forEach((item) => observer.observe(item));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    onScroll();
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-enhanced");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    let visible = true;
    const syncPlayback = () => {
      if (motionPreference.matches || !visible || document.hidden) video.pause();
      else void video.play().catch(() => undefined);
    };
    const changeSource = () => { video.load(); syncPlayback(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(hero);
    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    mobileQuery.addEventListener("change", changeSource);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      video.pause();
      observer.disconnect();
      motionPreference.removeEventListener("change", syncPlayback);
      mobileQuery.removeEventListener("change", changeSource);
      document.removeEventListener("visibilitychange", syncPlayback);
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
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!cursor.classList.contains("is-visible")) { currentX = targetX; currentY = targetY; }
      document.documentElement.classList.add("cursor-enhanced");
      cursor.classList.add("is-visible");
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      cursor.classList.toggle("is-arrow", target?.dataset.cursor === "arrow");
      cursor.classList.toggle("is-light", target?.dataset.cursorTone === "light");
      if (!cursorFrame) cursorFrame = requestAnimationFrame(animateCursor);
    };
    const onPointerLeave = () => {
      cursor.classList.remove("is-visible");
      document.documentElement.classList.remove("cursor-enhanced");
      cancelAnimationFrame(cursorFrame);
      cursorFrame = 0;
    };
    const animateCursor = () => {
      cursorFrame = 0;
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
      if (Math.abs(targetX - currentX) > .1 || Math.abs(targetY - currentY) > .1) cursorFrame = requestAnimationFrame(animateCursor);
    };

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

    const serviceCards = Array.from(document.querySelectorAll<HTMLElement>(".service-card"));
    const serviceCleanups = serviceCards.map((card) => {
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      };
      card.addEventListener("pointermove", move);
      return () => card.removeEventListener("pointermove", move);
    });

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onPointerLeave);
    return () => {
      cancelAnimationFrame(cursorFrame);
      document.documentElement.classList.remove("cursor-enhanced");
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onPointerLeave);
      magneticCleanups.forEach((cleanup) => cleanup());
      serviceCleanups.forEach((cleanup) => cleanup());
    };
  }, [motionAllowed]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen || projectModalOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen, projectModalOpen]);

  useEffect(() => {
    if (!projectModalOpen) return;
    const timer = window.setTimeout(() => projectDialogRef.current?.querySelector<HTMLElement>(".project-modal-close")?.focus(), 80);
    const onModalKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProjectModalOpen(false);
        window.setTimeout(() => projectOpenerRef.current?.focus(), 50);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(projectDialogRef.current?.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])") ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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
      subject: `Project enquiry — ${form.name}`,
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
            <a href="/portfolio" onClick={closeMenu}>Work</a>
            <a href="#capabilities" onClick={closeMenu}>Services</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <div className="mobile-nav-actions">
              <a href="#contact" onClick={closeMenu}>Start a Project <span aria-hidden="true">↗</span></a>
              <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp ScaleWeb <span aria-hidden="true">↗</span></a>
            </div>
          </nav>
          <a className="header-cta" href="#contact" data-magnetic data-cursor="arrow">Start a Project <span aria-hidden="true">↗</span></a>
          <button className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? "Close" : "Menu"}</span><i aria-hidden="true" /></button>
        </div>
      </header>

      <div id="main-content">
        <div className="hero-stage">
        <section className="hero shell" aria-labelledby="hero-title" ref={heroRef}>
          <video className="hero-film" ref={heroVideoRef} muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} disablePictureInPicture>
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
              <p>Indore, India <i /> Worldwide</p>
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
              <p className="hero-intro">Premium, high-performing websites designed to make ambitious businesses easier to trust, remember and choose.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact" data-magnetic data-cursor="arrow">Start a Project <span aria-hidden="true">↗</span></a>
                <a className="button button-secondary" href="/portfolio" data-magnetic data-cursor="arrow">Explore Our Work <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
          <a className="hero-scroll" href="#capabilities" aria-label="Explore what ScaleWeb does"><span>Scroll to explore</span><i aria-hidden="true">↓</i></a>
        </section>
        </div>

        <Capabilities onEnquire={(projectType) => { updateField("projectType", projectType); openProjectModal(); }} />

        <section className="services-section section light-section section-curve" id="services" aria-labelledby="services-title">
          <div className="section-heading shell" data-reveal><p className="section-label">02 — Expertise</p><div><h2 id="services-title">Everything needed<br />to build a better<br /><em>digital presence.</em></h2><p>Clear, focused services shaped around what your business needs—not a fixed template or bloated package.</p></div></div>
          <div className="service-stack shell">{services.map(([number, title, copy], index) => <article className={`service-card service-card-${index + 1}`} key={number} data-service-card style={{ "--service-index": index } as CSSProperties}><div className="service-card-head"><span>{number}</span><h3>{title}</h3><i aria-hidden="true">↗</i></div><div className="service-card-body"><p>{copy}</p><div className="service-art" aria-hidden="true"><i /><i /><i /></div></div></article>)}</div>
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

        <Industries />

        <section className="about-section section" id="about" aria-labelledby="about-title">
          <div className="about-grid shell" data-reveal>
            <p className="section-label">About ScaleWeb</p>
            <h2 id="about-title">Built for growth.<br /><em>Designed with intent.</em></h2>
            <div><p>ScaleWeb is an Indore-based web agency creating premium, high-performing websites through strategy, UI/UX design, custom development and mobile optimization.</p><p>We work directly with businesses, startups and growing brands across India and worldwide, combining strong visual direction with clear business thinking.</p></div>
          </div>
        </section>

        <section className="contact-section light-section section-curve" id="contact" aria-labelledby="contact-title">
          <div className="contact-stage shell" data-reveal>
            <p className="contact-kicker">Start a project with ScaleWeb</p>
            <h2 id="contact-title">Ready to start<br /><em>building?</em></h2>
            <p className="contact-lead">Let’s talk about your project. No pressure—just a clear conversation about what your website could become.</p>
            <div className="contact-launch-ring">
              <button className="contact-launch" type="button" onClick={openProjectModal} data-magnetic data-cursor="arrow"><span>Start a Project</span><i aria-hidden="true">↗</i></button>
            </div>
            <div className="contact-direct" aria-label="Direct contact options">
              <a href={contactLinks.gmail} target="_blank" rel="noreferrer" data-cursor="arrow"><ContactIcon name="gmail" /><span>scaleweb152@gmail.com</span></a>
              <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer" data-cursor="arrow"><ContactIcon name="whatsapp" /><span>WhatsApp ScaleWeb</span></a>
              <a href="tel:+917803851101" data-cursor="arrow"><span className="contact-phone-icon" aria-hidden="true">↗</span><span>+91 78038 51101</span></a>
            </div>
            <p className="contact-note">Indore, India · Working worldwide <i /> Replies within one business day</p>
          </div>
        </section>
      </div>

      <footer className="site-footer" id="footer">
        <div className="footer-card">
          <div className="footer-grid">
            <div className="footer-statement"><a className="footer-mark" href="#top" aria-label="ScaleWeb Agency home">SCALE<span>WEB</span></a><p>We build premium websites that turn first impressions into business growth.</p><div className="footer-socials"><a className="footer-social-link" href={contactLinks.whatsapp} target="_blank" rel="noreferrer" aria-label="Message ScaleWeb on WhatsApp" title="WhatsApp" data-cursor="arrow"><ContactIcon name="whatsapp" /></a><a className="footer-social-link" href={contactLinks.instagram} target="_blank" rel="noreferrer" aria-label="Visit ScaleWeb on Instagram" title="Instagram" data-cursor="arrow"><ContactIcon name="instagram" /></a><a className="footer-social-link" href={contactLinks.gmail} target="_blank" rel="noreferrer" aria-label="Email ScaleWeb with Gmail" title="Gmail" data-cursor="arrow"><ContactIcon name="gmail" /></a></div></div>
            <nav aria-label="Footer navigation"><span>Quick Links</span><a href="#top">Home</a><a href="/portfolio">Work</a><a href="#services">Expertise</a><a href="#process">Process</a><a href="#about">About</a></nav>
            <div className="footer-services"><span>Services</span><a href="#capabilities">Website Development</a><a href="#capabilities">App Development</a><a href="#capabilities">AI Media</a><a href="#capabilities">System Development</a></div>
            <div className="footer-contact"><span>Studio &amp; Contact</span><p>ScaleWeb Agency<br /><small>Indore, India · Working worldwide</small></p><a href="tel:+917803851101">+91 78038 51101</a><a href="tel:+919669366166">+91 96693 66166</a><a href="mailto:scaleweb152@gmail.com">scaleweb152@gmail.com</a><button type="button" onClick={openProjectModal} data-cursor="arrow">Start a Project <i aria-hidden="true">↗</i></button></div>
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
                <label className="field-wide"><span>What do you need? *</span><select name="projectType" value={form.projectType} onChange={(e) => updateField("projectType", e.target.value)} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "project-error" : undefined}><option value="">Choose a project type</option><option>Website Development</option><option>App Development</option><option>AI Media</option><option>System Development</option><option>Website redesign</option><option>UI/UX design</option></select><small id="project-error" className="field-error">{errors.projectType}</small></label>
                <label className="field-wide"><span>Tell us a little about it *</span><textarea name="description" rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="What should this project help your business achieve?" aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} /><small id="description-error" className="field-error">{errors.description}</small></label>
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

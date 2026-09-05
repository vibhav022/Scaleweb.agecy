"use client";

import { useEffect, type RefObject } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

// Measure layout, not transformed bounds, so a scene never feeds its motion back
// into the next frame's measurements.
function layoutTop(element: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = element;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function useSceneMotion(
  heroRef: RefObject<HTMLElement | null>,
  carouselRef?: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const hero = heroRef.current;
    const carousel = carouselRef?.current;
    if (!hero) return;

    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const desktopQuery = window.matchMedia("(min-width: 761px)");
    const stack = document.querySelector<HTMLElement>(".service-stack");
    const services = Array.from(document.querySelectorAll<HTMLElement>("[data-service-card]"));
    const cards = Array.from(carousel?.querySelectorAll<HTMLElement>(".work-card") ?? []);
    const processSection = document.querySelector<HTMLElement>(".process-section");
    const processItems = Array.from(document.querySelectorAll<HTMLElement>(".process-list li"));
    const contact = document.querySelector<HTMLElement>(".contact-section");
    const footer = document.querySelector<HTMLElement>(".footer-card");

    let frame = 0;
    let lastTime = 0;
    let scroll = window.scrollY;
    let targetScroll = scroll;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    let needsMeasure = true;
    let heroTop = 0, heroHeight = 1, workTop = 0, workHeight = 1;
    let contactTop = 0, footerTop = 0, viewportHeight = window.innerHeight;
    let carouselWidth = 1;
    let cardGeometry: { left: number; width: number }[] = [];
    let serviceGeometry: { top: number; height: number; sticky: number }[] = [];
    let processGeometry: { top: number; height: number }[] = [];
    let disposed = false;

    const measure = () => {
      viewportHeight = window.innerHeight;
      heroTop = layoutTop(hero);
      heroHeight = hero.offsetHeight;
      workTop = carousel ? layoutTop(carousel) : 0;
      workHeight = carousel?.offsetHeight ?? 1;
      carouselWidth = carousel?.clientWidth ?? 1;
      const track = carousel?.querySelector<HTMLElement>(".work-slider-track");
      if (track && cards[0]) track.style.paddingInline = `${Math.max(0, (carouselWidth - cards[0].offsetWidth) / 2)}px`;
      cardGeometry = cards.map((card) => ({ left: card.offsetLeft, width: card.offsetWidth }));
      if (stack) {
        let top = layoutTop(stack);
        const gap = parseFloat(getComputedStyle(stack).rowGap) || 0;
        serviceGeometry = services.map((card, index) => {
          const height = card.offsetHeight;
          const geometry = { top, height, sticky: 104 + index * 18 };
          top += height + gap;
          return geometry;
        });
      }
      processGeometry = processItems.map((item) => ({ top: layoutTop(item), height: item.offsetHeight }));
      contactTop = contact ? layoutTop(contact) : 0;
      footerTop = footer ? layoutTop(footer) : 0;
      needsMeasure = false;
    };

    const paint = (now: number) => {
      frame = 0;
      if (disposed || motionQuery.matches || document.hidden) return;
      if (needsMeasure) measure();
      const delta = Math.min(48, lastTime ? now - lastTime : 16.67);
      lastTime = now;
      const ease = 1 - Math.exp(-delta / 85);
      // Native scrolling remains immediate; only decorative layers are damped.
      scroll += (targetScroll - scroll) * ease;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      const desktop = desktopQuery.matches;
      const depth = desktop ? 1 : .25;

      if (targetScroll < heroTop + heroHeight + viewportHeight * .2) {
        const progress = clamp((scroll - heroTop) / heroHeight);
        hero.style.setProperty("--scene-pitch", `${progress * -6.5 * depth - y * .7}deg`);
        hero.style.setProperty("--scene-yaw", `${x * -.9}deg`);
        hero.style.setProperty("--scene-scale", `${1 - progress * .055 * depth}`);
        hero.style.setProperty("--scene-lift", `${progress * 36 * depth}px`);
        hero.style.setProperty("--hero-shift-x", `${x * 22}px`);
        hero.style.setProperty("--hero-shift-y", `${y * 16}px`);
        hero.style.setProperty("--hero-x", `${62 + x * 32}%`);
        hero.style.setProperty("--hero-y", `${38 + y * 32}%`);
        hero.style.setProperty("--portrait-scroll", `${progress * 120 * depth}px`);
        hero.style.setProperty("--film-scroll", `${progress * 48 * depth}px`);
        hero.style.setProperty("--hero-content-y", `${progress * -56 * depth}px`);
        hero.style.setProperty("--hero-content-scale", "1");
        hero.style.setProperty("--hero-content-opacity", `${1 - progress * .5}`);
        hero.style.setProperty("--hero-line-drift", `${progress * -22 * depth}px`);
      }

      if (carousel && workTop - targetScroll < viewportHeight + 100 && workTop + workHeight > targetScroll - 100) {
        const entry = clamp((viewportHeight - (workTop - scroll)) / (viewportHeight * .8));
        const imageY = clamp((workTop - scroll + workHeight / 2 - viewportHeight / 2) / viewportHeight, -.7, .7);
        cards.forEach((card, index) => {
          const geometry = cardGeometry[index];
          const distance = clamp((geometry.left + geometry.width / 2 - carousel.scrollLeft - carouselWidth / 2) / carouselWidth, -1, 1);
          card.style.setProperty("--gallery-yaw", `${distance * -9 * depth}deg`);
          card.style.setProperty("--gallery-pitch", `${(1 - entry) * 7 * depth}deg`);
          card.style.setProperty("--gallery-rise", `${((1 - entry) * 45 + Math.abs(distance) * 12) * depth}px`);
          card.style.setProperty("--gallery-z", `${Math.abs(distance) * -55 * depth}px`);
          card.style.setProperty("--image-parallax", `${imageY * -28 * depth}px`);
        });
      }

      services.forEach((card, index) => {
        const geometry = serviceGeometry[index];
        if (!geometry) return;
        const next = serviceGeometry[index + 1];
        const entry = clamp((viewportHeight * .9 - (geometry.top - scroll)) / (viewportHeight * .6));
        const cover = desktop && next ? clamp((geometry.sticky + geometry.height - (next.top - scroll)) / geometry.height) : 0;
        card.style.setProperty("--stack-scale", `${1 - cover * .065}`);
        card.style.setProperty("--stack-pitch", `${((1 - entry) * 6 - cover * 3) * depth}deg`);
        card.style.setProperty("--stack-rise", `${(1 - entry) * 28 * depth}px`);
        card.style.setProperty("--stack-shade", `${cover * .14}`);
      });

      if (processSection && processGeometry.length) {
        const first = processGeometry[0];
        const last = processGeometry[processGeometry.length - 1];
        const progress = clamp((scroll + viewportHeight * .55 - first.top) / Math.max(1, last.top + last.height - first.top));
        processSection.style.setProperty("--process-progress", `${progress * 100}%`);
        let nearest = 0;
        let distance = Infinity;
        processGeometry.forEach((geometry, index) => {
          const d = Math.abs(geometry.top + geometry.height / 2 - scroll - viewportHeight * .55);
          if (d < distance) { distance = d; nearest = index; }
        });
        processItems.forEach((item, index) => item.classList.toggle("is-scroll-active", index === nearest));
      }

      if (contact) {
        const entry = clamp((viewportHeight - (contactTop - scroll)) / (viewportHeight * .75));
        contact.style.setProperty("--contact-shift", `${(1 - entry) * 64 * depth}px`);
        contact.style.setProperty("--contact-pitch", `${(1 - entry) * 9 * depth}deg`);
        contact.style.setProperty("--contact-opacity", "1");
      }
      if (footer) {
        const entry = clamp((viewportHeight - (footerTop - scroll)) / (viewportHeight * .7));
        footer.style.setProperty("--footer-shift", `${(1 - entry) * -42 * depth}px`);
        footer.style.setProperty("--footer-scale", `${.97 + entry * .03}`);
      }

      if (Math.abs(targetScroll - scroll) > .1 || Math.abs(targetX - x) > .001 || Math.abs(targetY - y) > .001) schedule();
    };

    const schedule = () => {
      if (!frame && !motionQuery.matches && !document.hidden && !disposed) frame = requestAnimationFrame(paint);
    };
    const onScroll = () => { targetScroll = window.scrollY; schedule(); };
    const onResize = () => {
      needsMeasure = true;
      if (motionQuery.matches) measure();
      else schedule();
    };
    const onPointer = (event: PointerEvent) => {
      if (!pointerQuery.matches || !desktopQuery.matches || event.pointerType === "touch") return;
      targetX = clamp(event.clientX / window.innerWidth - .5, -.5, .5);
      targetY = clamp((event.clientY - heroTop + window.scrollY) / heroHeight - .5, -.5, .5);
      schedule();
    };
    const resetPointer = () => { targetX = 0; targetY = 0; schedule(); };
    const syncPreference = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      scroll = targetScroll = window.scrollY;
      x = y = targetX = targetY = 0;
      root.classList.toggle("depth-motion", !motionQuery.matches);
      needsMeasure = true;
      // Carousel alignment is functional, including when motion is disabled.
      measure();
      schedule();
    };
    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else syncPreference();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    carousel?.addEventListener("scroll", schedule, { passive: true });
    hero.addEventListener("pointermove", onPointer, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", syncPreference);
    desktopQuery.addEventListener("change", syncPreference);
    pointerQuery.addEventListener("change", resetPointer);
    const resizeObserver = new ResizeObserver(onResize);
    [hero, carousel, stack, contact, footer].forEach((element) => { if (element) resizeObserver.observe(element); });
    void document.fonts.ready.then(() => { if (!disposed) onResize(); });
    syncPreference();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      root.classList.remove("depth-motion");
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      carousel?.removeEventListener("scroll", schedule);
      hero.removeEventListener("pointermove", onPointer);
      hero.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", syncPreference);
      desktopQuery.removeEventListener("change", syncPreference);
      pointerQuery.removeEventListener("change", resetPointer);
    };
  }, [heroRef, carouselRef]);
}

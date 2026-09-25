import { createContext, useContext, useEffect, useState } from "react";

export const ContactContext = createContext({ open: () => {} });
export const useContact = () => useContext(ContactContext);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// True once the element has scrolled into view.
export function useInView(ref, { threshold = 0.2, once = true } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, once]);
  return inView;
}

// Calls onFrame(rect, viewportHeight) on scroll/resize, throttled to animation frames.
export function useScrollFrame(ref, onFrame) {
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (ref.current) onFrame(ref.current.getBoundingClientRect(), window.innerHeight);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, onFrame]);
}

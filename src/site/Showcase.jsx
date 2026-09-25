import { useEffect, useRef } from "react";
import { prefersReducedMotion, useContact } from "./hooks";

// Final resting angle (degrees, 0 = right, clockwise) and tilt for each card around the headline.
const cards = [
  { id: "id", angle: 200, tilt: -8, bg: "#0d0d22", sub: "Brand identity" },
  { id: "off", angle: 246, tilt: 6, bg: "#1a3aff", sub: "Campaign" },
  { id: "logo", angle: 318, tilt: 4, bg: "#12122a", sub: "Logo design" },
  { id: "p", angle: 142, tilt: 5, bg: "#ff4d1a", sub: "Visual identity" },
  { id: "how", angle: 66, tilt: -4, bg: "#0d0d22", sub: "Strategy" },
  { id: "brand", angle: 12, tilt: 7, bg: "#3b5bff", sub: "Brand identity" },
];

const CARD_W = 150;
const CARD_H = 176;
const DURATION = 1900;
const STAGGER = 110;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

const visuals = {
  id: <span className="sc-big">ID</span>,
  off: (
    <div className="sc-off">
      <svg viewBox="0 0 36 36" fill="none"><path d="M4 28C10 18 26 8 32 4" stroke="#fff" strokeWidth="3" strokeLinecap="round" /><path d="M28 2 L34 6 L28 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span>OFF</span>
    </div>
  ),
  logo: (
    <div className="sc-logo">
      <p>Principles <em>of</em> Logo Design</p>
      <svg viewBox="0 0 80 60" fill="none"><ellipse cx="40" cy="42" rx="28" ry="14" fill="#1a3aff" opacity="0.35" /><path d="M20 40 Q30 20 45 22 Q55 24 52 36 Q48 44 36 44 Q24 44 20 40Z" fill="rgba(245,244,240,0.92)" /><circle cx="52" cy="20" r="6" fill="rgba(245,244,240,0.92)" /><path d="M52 20 Q60 14 56 10" stroke="#ff4d1a" strokeWidth="2" strokeLinecap="round" /></svg>
    </div>
  ),
  p: (
    <svg viewBox="0 0 80 80" fill="none" style={{ width: 76 }}><circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.3)" /><circle cx="40" cy="40" r="24" stroke="rgba(255,255,255,0.5)" /><path d="M24 60 Q24 20 40 20 Q56 20 56 34 Q56 48 40 48 L24 48" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  how: (
    <div className="sc-how">
      <em>How<br />to</em>
      <p>use design to sell things, make things look good, and move people.</p>
    </div>
  ),
  brand: (
    <div className="sc-brand">
      <b>Designing<br />Brand<br />Identity</b>
      <div>{[...Array(24)].map((_, i) => <i key={i} className={i % 3 === 0 ? "on" : ""} />)}</div>
    </div>
  ),
};

export default function Showcase() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const { open: openContact } = useContact();

  useEffect(() => {
    const section = sectionRef.current;
    const reduced = prefersReducedMotion();
    const phases = cards.map((_, i) => i * 1.7);
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let start = null;
    let raf = 0;
    let running = false;

    const frame = (now) => {
      raf = 0;
      const w = section.clientWidth;
      const h = section.clientHeight;
      const rx = Math.max(160, w / 2 - CARD_W * 0.8);
      const ry = Math.max(150, h / 2 - CARD_H * 0.6);
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      cards.forEach((card, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const t = reduced ? 1 : Math.min(1, Math.max(0, (now - start - i * STAGGER) / DURATION));
        const e = easeOutCubic(t);
        // Spiral out from the centre, sweeping ~1.1 turns before landing on the final angle.
        const angle = ((card.angle - (1 - e) * 400) * Math.PI) / 180;
        const radius = 0.15 + 0.85 * e;
        const time = now / 1000;
        const settle = e * e;
        const floatX = Math.cos(time * 0.6 + phases[i]) * 6 * settle;
        const floatY = Math.sin(time * 0.8 + phases[i]) * 10 * settle;
        const depth = 10 + (i % 3) * 8;
        const x = Math.cos(angle) * rx * radius + floatX + mouse.x * depth;
        const y = Math.sin(angle) * ry * radius + floatY + mouse.y * depth;
        const rot = card.tilt - (1 - e) * 160 + Math.sin(time * 0.5 + phases[i]) * 1.5 * settle;
        const scale = t === 0 ? 0 : Math.max(0, easeOutBack(t));
        el.style.opacity = Math.min(1, t * 4).toFixed(3);
        el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      });

      if (running) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (start === null) start = performance.now();
        running = true;
        if (!raf) raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }, { threshold: 0.3 });
    io.observe(section);

    const onMove = (ev) => {
      const r = section.getBoundingClientRect();
      mouse.tx = ((ev.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = ((ev.clientY - r.top) / r.height - 0.5) * 2;
    };
    section.addEventListener("mousemove", onMove);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className="showcase" ref={sectionRef}>
      {cards.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => (cardRefs.current[i] = el)}
          className="orbit-card"
          style={{ width: CARD_W, height: CARD_H }}
        >
          <div className="orbit-card-inner" style={{ background: card.bg }}>
            {visuals[card.id]}
            <span className="orbit-card-label">{card.sub}</span>
          </div>
        </div>
      ))}

      <div className="showcase-center">
        <span className="eyebrow">Powered by Digicraft</span>
        <h2 className="showcase-headline">
          One place for brands that want to be <em>unforgettable.</em>
        </h2>
        <p className="showcase-sub">
          From positioning to pixels, we craft work that makes people stop scrolling, start talking, and never forget your name.
        </p>
        <div className="showcase-actions">
          <button className="btn btn-orange" onClick={() => openContact()}>Start a project <span className="arrow">→</span></button>
          <a className="btn btn-ghost" href="#work">View our work ↗</a>
        </div>
      </div>
    </section>
  );
}

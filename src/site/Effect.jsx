import { useCallback, useRef, useState } from "react";
import { effectItems } from "./data";
import { useContact, useScrollFrame } from "./hooks";
import BackgroundVideo from "./BackgroundVideo";

export default function Effect() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [local, setLocal] = useState(0);
  const { open: openContact } = useContact();
  const n = effectItems.length;

  // Progress through the tall section drives which outcome is active (Miro-style pinned scroll).
  const onFrame = useCallback((rect, vh) => {
    const total = rect.height - vh;
    if (total <= 0) return;
    const p = Math.min(0.9999, Math.max(0, -rect.top / total));
    const idx = Math.floor(p * n);
    setActive(idx);
    setLocal(p * n - idx);
  }, [n]);
  useScrollFrame(ref, onFrame);

  const goTo = (i) => {
    const el = ref.current;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + (total * (i + 0.05)) / n;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const current = effectItems[active];

  return (
    <section className="effect" ref={ref} style={{ "--steps": n }}>
      <div className="effect-sticky">
        {/* Row 1: title + primary CTA */}
        <header className="effect-head">
          <div>
            <span className="eyebrow">The Digicraft effect</span>
            <h2 className="effect-title">What happens when brands <em>partner</em> with us</h2>
          </div>
          <button className="btn btn-orange btn-lg" onClick={() => openContact()}>
            Start a project <span className="arrow">↗</span>
          </button>
        </header>

        {/* Row 2: the active outcome as a big statement, with its animated scene edge to edge on the right */}
        <div className="effect-body">
          <div className="effect-copy">
            <div className="effect-copy-inner" key={active}>
              <span className="effect-kicker">{current.id} — {current.title}</span>
              <p className="effect-headline">{current.desc}</p>
              <p className="effect-stat"><b>{current.stat}</b> {current.statLabel}</p>
            </div>
            <div className="effect-progress">
              {effectItems.map((item, i) => (
                <button key={item.id} className={`effect-step${i === active ? " is-active" : ""}`} onClick={() => goTo(i)} aria-label={item.title}>
                  <i style={{ transform: `scaleX(${i < active ? 1 : i === active ? local : 0})` }} />
                  <span>{item.id}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="effect-visual">
            {effectItems.map((item, i) => {
              const state = i === active ? "is-active" : i < active ? "is-past" : "is-next";
              return (
                <div key={item.id} className={`effect-panel ${state}`}>
                  <BackgroundVideo sources={[item.video]} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

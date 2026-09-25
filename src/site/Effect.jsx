import { useCallback, useRef, useState } from "react";
import { effectItems } from "./data";
import { useContact, useScrollFrame } from "./hooks";

// Each scene is a mini "workspace canvas". Children with .pop animate in when the scene is active;
// --d staggers them.
const d = (n) => ({ "--d": `${n * 0.09}s` });

const Cursor = ({ label, color, className = "" }) => (
  <div className={`canvas-cursor ${className}`}>
    <svg viewBox="0 0 16 16" width="16" height="16"><path d="M1 1 L15 7 L8.5 8.5 L7 15 Z" fill={color} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg>
    <span style={{ background: color }}>{label}</span>
  </div>
);

const IdentityScene = () => (
  <div className="scene scene-identity">
    <div className="canvas-board">
      <div className="pop id-logo" style={d(1)}>
        <span>d</span>
      </div>
      <div className="pop id-swatches" style={d(2)}>
        {["#1a3aff", "#ff4d1a", "#0b0b1f", "#f5f4f0"].map((c) => <i key={c} style={{ background: c }} />)}
        <small>Primary palette</small>
      </div>
      <div className="pop id-type" style={d(3)}>
        <b>Aa</b>
        <small>Instrument Sans<br />Display / 700</small>
      </div>
      <div className="pop id-card" style={d(4)}>
        <span>digicraft</span>
        <small>hello@yourbrand.co</small>
      </div>
      <div className="pop sticky-note note-orange id-note" style={d(6)}>Logo v3 approved ✓</div>
      <Cursor label="Digicraft" color="#1a3aff" className="pop cursor-a" />
      <Cursor label="You" color="#ff4d1a" className="pop cursor-b" />
    </div>
  </div>
);

const PositioningScene = () => (
  <div className="scene scene-positioning">
    <div className="canvas-board">
      <div className="pos-map">
        <span className="pos-axis pos-axis-x" />
        <span className="pos-axis pos-axis-y" />
        <span className="pos-label pos-top">Premium</span>
        <span className="pos-label pos-bottom">Accessible</span>
        <span className="pos-label pos-left">Traditional</span>
        <span className="pos-label pos-right">Innovative</span>
        {[[22, 30], [30, 38], [18, 44], [34, 26], [26, 62], [38, 70], [62, 72], [70, 64]].map(([x, y], i) => (
          <i key={i} className="pop pos-dot" style={{ left: `${x}%`, top: `${y}%`, ...d(i * 0.6) }} />
        ))}
        <svg className="pos-trail" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M30 50 C 45 40, 55 25, 74 24" pathLength="1" />
        </svg>
        <div className="pos-you"><b>YOU</b></div>
        <div className="pop sticky-note note-blue pos-note" style={d(7)}>Own this space</div>
      </div>
      <Cursor label="Strategy" color="#ff4d1a" className="pop cursor-c" />
    </div>
  </div>
);

const AudienceScene = () => (
  <div className="scene scene-audience">
    <div className="canvas-board">
      <div className="pop aud-chart" style={d(1)}>
        <div className="aud-chart-head">
          <small>Followers</small>
          <b>48.2k</b>
          <em>+180%</em>
        </div>
        <svg viewBox="0 0 300 110" preserveAspectRatio="none">
          <path className="aud-area" d="M0 100 C 40 96, 60 92, 90 84 S 150 70, 180 56 S 250 22, 300 10 V 110 H 0 Z" />
          <path className="aud-line" pathLength="1" d="M0 100 C 40 96, 60 92, 90 84 S 150 70, 180 56 S 250 22, 300 10" />
        </svg>
      </div>
      <div className="aud-avatars">
        {[["AK", "#1a3aff"], ["JM", "#ff4d1a"], ["TS", "#0b0b1f"], ["EO", "#3b5bff"], ["+2k", "#f5f4f0"]].map(([t, c], i) => (
          <span key={t} className="pop" style={{ background: c, color: c === "#f5f4f0" ? "#0b0b1f" : "#fff", ...d(3 + i * 0.7) }}>{t}</span>
        ))}
      </div>
      <div className="pop aud-bubble aud-bubble-1" style={d(5)}>♥ 2,341</div>
      <div className="pop aud-bubble aud-bubble-2" style={d(6)}>"Obsessed with this brand"</div>
      <div className="pop sticky-note note-orange aud-note" style={d(7)}>Community-led launch</div>
    </div>
  </div>
);

const RevenueScene = () => (
  <div className="scene scene-revenue">
    <div className="canvas-board">
      <div className="pop rev-bars" style={d(1)}>
        <small>Monthly revenue</small>
        <div className="rev-bars-row">
          {[28, 36, 34, 48, 58, 70, 86, 100].map((h, i) => (
            <i key={i} style={{ "--h": `${h}%`, "--bd": `${0.25 + i * 0.07}s` }} className={i > 4 ? "hot" : ""} />
          ))}
        </div>
      </div>
      <div className="pop rev-roi" style={d(4)}>
        <small>Campaign ROI</small>
        <b>3.1×</b>
      </div>
      <div className="pop rev-funnel" style={d(5)}>
        <span style={{ width: "100%" }}>Visitors</span>
        <span style={{ width: "72%" }}>Leads</span>
        <span style={{ width: "44%" }}>Customers</span>
      </div>
      <div className="pop sticky-note note-blue rev-note" style={d(7)}>Q3 target hit early 🎉</div>
    </div>
  </div>
);

const scenes = { identity: IdentityScene, positioning: PositioningScene, audience: AudienceScene, revenue: RevenueScene };

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
        <div className="effect-left">
          <span className="eyebrow">The Digicraft effect</span>
          <h2 className="effect-title">What happens when brands <em>partner</em> with us</h2>
          <div className="effect-list">
            {effectItems.map((item, i) => (
              <button
                key={item.id}
                className={`effect-row${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
                onClick={() => goTo(i)}
              >
                <span className="effect-row-bar">
                  <i style={{ transform: `scaleY(${i < active ? 1 : i === active ? local : 0})` }} />
                </span>
                <span className="effect-row-main">
                  <span className="effect-row-head">
                    <span className="effect-row-num">{item.id}</span>
                    <span className="effect-row-name">{item.title}</span>
                  </span>
                  <span className="effect-row-body">
                    <span className="effect-row-desc">{item.desc}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="effect-right">
          <div className="effect-stage">
            {effectItems.map((item, i) => {
              const Scene = scenes[item.scene];
              const state = i === active ? "is-active" : i < active ? "is-past" : "is-next";
              return (
                <div key={item.id} className={`effect-panel ${state}`}>
                  <Scene />
                </div>
              );
            })}
            <div className="stat-badge" key={active}>
              <span className="stat-num">{current.stat}</span>
              <span className="stat-label">{current.statLabel}</span>
            </div>
          </div>
          <div className="effect-foot">
            <span className="effect-count">
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")} outcomes
            </span>
            <button className="btn btn-light" onClick={() => openContact()}>
              Start a project <span className="arrow">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

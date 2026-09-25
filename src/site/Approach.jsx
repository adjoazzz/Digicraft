import { APPROACH_VIDEO, HERO_VIDEO } from "./data";
import { useContact } from "./hooks";
import ScrollStatement from "./ScrollStatement";
import BackgroundVideo from "./BackgroundVideo";

const StageCard = ({ title, dot, bg, children }) => (
  <span className="stage-card" style={{ background: bg }}>
    <span className="stage-card-header">
      <span className="stage-card-dot" style={{ background: dot }} />
      <span className="stage-card-title">{title}</span>
    </span>
    <span className="stage-card-body">{children}</span>
  </span>
);

const Metric = ({ label, value, color }) => (
  <span className="stage-metric">
    <span>{label}</span>
    <b style={{ color }}>{value}</b>
  </span>
);

const statement = [
  "WE",
  { card: (
    <StageCard title="DISCOVER" dot="#1a3aff" bg="#0b1030">
      <span className="stage-bars">
        {[45, 70, 55, 90, 60, 75].map((h, i) => <i key={i} style={{ height: `${h}%`, opacity: 0.4 + h / 150 }} />)}
      </span>
      <Metric label="Audience reach" value="+68%" color="#3b5bff" />
    </StageCard>
  ) },
  "YOUR", "MARKET", "&",
  { card: (
    <StageCard title="STRATEGISE" dot="#ff4d1a" bg="#0f0b20">
      <svg viewBox="0 0 100 34" fill="none">
        <rect x="5" y="3" width="90" height="7" rx="2" fill="rgba(255,77,26,0.2)" />
        <rect x="18" y="13" width="64" height="7" rx="2" fill="rgba(255,77,26,0.4)" />
        <rect x="32" y="23" width="36" height="7" rx="2" fill="#ff4d1a" />
      </svg>
      <Metric label="Funnel drop" value="−34%" color="#ff4d1a" />
    </StageCard>
  ) },
  "YOUR", "POSITION.", "THEN", "WE",
  { card: (
    <StageCard title="DESIGN" dot="#3b5bff" bg="#050f1a">
      <span className="stage-swatches">
        {["#1a3aff", "#ff4d1a", "#f5f4f0", "#3b5bff", "#0a0a30"].map((c) => <i key={c} style={{ background: c }} />)}
      </span>
      <span className="stage-type"><b>Aa</b><small>Brand typeface</small></span>
    </StageCard>
  ) },
  "BOLD", "IDENTITIES", "&",
  { card: (
    <StageCard title="LAUNCH" dot="#22c55e" bg="#0a1a0a">
      <svg viewBox="0 0 100 30" fill="none">
        <polygon points="4,26 20,22 36,18 52,11 68,7 84,3 96,1 96,28 4,28" fill="rgba(34,197,94,0.1)" />
        <polyline points="4,26 20,22 36,18 52,11 68,7 84,3 96,1" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="96" cy="1" r="2.5" fill="#22c55e" />
      </svg>
      <Metric label="Revenue growth" value="+214%" color="#22c55e" />
    </StageCard>
  ) },
  "YOUR",
  { word: "brand.", accent: true },
];

export default function Approach() {
  const { open: openContact } = useContact();

  return (
    <section className="approach">
      <div className="approach-main">
        <div className="about-rail about-rail-l" />

        <div className="about-top">
          <span className="about-tag">(Our approach)</span>
          <span className="about-tag">02 — How we work</span>
        </div>

        <ScrollStatement items={statement} className="approach-statement" />

        <div className="approach-bottom">
          <p className="about-copy">
            <strong>Our strategies are designed to challenge the status quo, drive real impact, and unlock new growth opportunities.</strong>{" "}
            If you're ready to redefine your brand and dominate the market, we're here to make it happen.
          </p>
          <button className="btn btn-inv" onClick={() => openContact()}>
            See how we'd approach your brand <span className="arrow">→</span>
          </button>
        </div>
      </div>

      {/* Narrow video strip (~20% of the width) that stays pinned while the statement fills in */}
      <aside className="approach-video" aria-hidden="true">
        <div className="approach-video-inner">
          <div className="approach-video-fallback">
            <span className="live-dot" />
            <span>Inside the studio</span>
          </div>
          <BackgroundVideo sources={[APPROACH_VIDEO, HERO_VIDEO]} />
          <span className="approach-video-tag">● Live from the studio</span>
        </div>
      </aside>
    </section>
  );
}

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

export default function Approach() {
  return (
    <section className="approach">
      <div className="approach-blob" />
      <div className="approach-blob-left" />

      <p className="approach-intro">
        <span className="approach-dot" />
        We think out of the box when it comes to our <em>approach</em>
      </p>

      <h2 className="approach-headline">
        We{" "}
        <StageCard title="DISCOVER" dot="#1a3aff" bg="#0b1030">
          <span className="stage-bars">
            {[45, 70, 55, 90, 60, 75].map((h, i) => <i key={i} style={{ height: `${h}%`, opacity: 0.4 + h / 150 }} />)}
          </span>
          <Metric label="Audience reach" value="+68%" color="#3b5bff" />
        </StageCard>
        {" "}your market &{" "}
        <StageCard title="STRATEGISE" dot="#ff4d1a" bg="#0f0b20">
          <svg viewBox="0 0 100 34" fill="none" style={{ width: "100%", display: "block" }}>
            <rect x="5" y="3" width="90" height="7" rx="2" fill="rgba(255,77,26,0.2)" />
            <rect x="18" y="13" width="64" height="7" rx="2" fill="rgba(255,77,26,0.4)" />
            <rect x="32" y="23" width="36" height="7" rx="2" fill="#ff4d1a" />
          </svg>
          <Metric label="Funnel drop" value="−34%" color="#ff4d1a" />
        </StageCard>
        {" "}your position. Then we{" "}
        <StageCard title="DESIGN" dot="#3b5bff" bg="#050f1a">
          <span className="stage-swatches">
            {["#1a3aff", "#ff4d1a", "#f5f4f0", "#3b5bff", "#0a0a30"].map((c) => <i key={c} style={{ background: c }} />)}
          </span>
          <span className="stage-type"><em>Aa</em><small>Brand typeface</small></span>
        </StageCard>
        {" "}bold identities &{" "}
        <StageCard title="LAUNCH" dot="#22c55e" bg="#0a1a0a">
          <svg viewBox="0 0 100 30" fill="none" style={{ width: "100%", display: "block" }}>
            <polygon points="4,26 20,22 36,18 52,11 68,7 84,3 96,1 96,28 4,28" fill="rgba(34,197,94,0.1)" />
            <polyline points="4,26 20,22 36,18 52,11 68,7 84,3 96,1" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="96" cy="1" r="2.5" fill="#22c55e" />
          </svg>
          <Metric label="Revenue growth" value="+214%" color="#22c55e" />
        </StageCard>
        {" "}your <em>brand</em>.
      </h2>

      <p className="approach-body">
        <strong>Our strategies are designed to challenge the status quo, drive real impact, and unlock new growth opportunities.</strong>{" "}
        If you're ready to redefine your brand and dominate the market, we're here to make it happen. We refuse to settle for the ordinary,
        so we partner with innovators and bold entrepreneurs.
      </p>
    </section>
  );
}

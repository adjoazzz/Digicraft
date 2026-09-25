import { useContact } from "./hooks";
import ScrollStatement from "./ScrollStatement";

// Big statement, one entry per word; `accent` words render in the serif italic.
const statement = [
  "DIGICRAFT", "DOESN'T", "CHASE", "TRENDS,", "WE", "BUILD", "BRANDS", "THAT",
  { word: "last.", accent: true },
];

const stats = [
  { num: "120+", label: "Brands launched & repositioned" },
  { num: "3.1×", label: "Average campaign ROI" },
  { num: "9/10", label: "Clients come back for more" },
];

export default function About() {
  const { open: openContact } = useContact();

  return (
    <section className="about" id="about">
      <div className="about-rail about-rail-l" />
      <div className="about-rail about-rail-r" />

      <div className="about-top">
        <span className="about-tag">(About Digicraft)</span>
        <span className="about-tag">01 — Who we are</span>
      </div>

      <ScrollStatement items={statement} className="about-statement" />
      <div className="about-bottom">
        <p className="about-copy">
          We're a brand and growth studio for founders and teams who refuse to blend in. Strategy, design and marketing under one roof,
          so the idea that wins the room is the same one that wins the market.
        </p>
        <div className="about-stats">
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-stat-num">{s.num}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-ink about-btn" onClick={() => openContact()}>
          Work with us <span className="arrow">→</span>
        </button>
      </div>
    </section>
  );
}

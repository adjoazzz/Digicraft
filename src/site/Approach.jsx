import { APPROACH_VIDEO, HERO_VIDEO } from "./data";
import { useContact } from "./hooks";
import ScrollStatement from "./ScrollStatement";
import BackgroundVideo from "./BackgroundVideo";

// Key verbs are set in the serif italic accent, like "unmissable" elsewhere on the page.
const statement = [
  "WE", { word: "discover", accent: true }, "YOUR", "MARKET", "&",
  { word: "strategise", accent: true }, "YOUR", "POSITION.", "THEN", "WE",
  { word: "design", accent: true }, "BOLD", "IDENTITIES", "&",
  { word: "launch", accent: true }, "YOUR", { word: "brand.", accent: true },
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

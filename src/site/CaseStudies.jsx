import { useRef } from "react";
import { useContact, useInView } from "./hooks";

const Pill = ({ children, onClick }) => (
  <button className="pill" onClick={onClick}>
    {children} <span className="arrow">→</span>
  </button>
);

export default function CaseStudies() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });
  const { open: openContact } = useContact();

  return (
    <section className={`work${inView ? " in-view" : ""}`} id="work" ref={ref}>
      <div className="work-head">
        <div>
          <span className="eyebrow">Selected work</span>
          <h2 className="work-title">Brands we've made <em>unmissable</em></h2>
        </div>
        <p className="work-sub">A few of the teams we've partnered with, from first sketch to measurable growth.</p>
      </div>

      <div className="bento">
        {/* Row 1 — visual + story */}
        <article className="bento-card bento-visual estro" style={{ "--i": 0 }}>
          <div className="estro-scene">
            <div className="estro-bottle"><span>estro</span></div>
            <div className="estro-bottle small"><span>estro</span></div>
            <div className="estro-box"><span>estro<br /><small>eau de parfum</small></span></div>
          </div>
          <div className="bento-meta light">
            <span>Estro</span>
            <span>Brand Strategy · Packaging</span>
          </div>
        </article>

        <article className="bento-card bento-story tone-orange" style={{ "--i": 1 }}>
          <span className="bento-kicker">Estro · Luxury fragrance</span>
          <h3 className="bento-headline">A fragrance house that finally looks as good as it smells.</h3>
          <p className="bento-text">We rebuilt Estro's identity and packaging around one idea, "quiet confidence". Launch-month sales beat forecast by 2.6×.</p>
          <Pill>read the story</Pill>
        </article>

        {/* Row 2 — three tall cards */}
        <article className="bento-card bento-tall tone-blue" style={{ "--i": 2 }}>
          <h3 className="bento-headline center">+212% repeat orders</h3>
          <div className="bento-logo">ARITHMETIC</div>
          <p className="bento-caption">Fintech rebrand · Digital marketing</p>
          <Pill>view case study</Pill>
        </article>

        <article className="bento-card bento-tall bento-visual butter" style={{ "--i": 3 }}>
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-post">
              <div className="phone-user"><i /> butter.co</div>
              <div className="phone-img"><span>BUTTER</span></div>
              <div className="phone-actions">♥ 18.4k &nbsp; 💬 1.2k</div>
            </div>
            <div className="phone-post ghost" />
          </div>
          <div className="bento-meta light">
            <span>Butter</span>
            <span>Social campaign · 4.1M reach</span>
          </div>
          <Pill>view campaign</Pill>
        </article>

        <article className="bento-card bento-tall tone-cream" style={{ "--i": 4 }}>
          <h3 className="bento-headline center dark">Could your brand be next?</h3>
          <p className="bento-text center dark">Tell us where you want to go. We'll show you how we'd get you there, no strings attached.</p>
          <div className="packs">
            {[["#1a3aff", "Brand"], ["#ff4d1a", "Launch"], ["#0b0b1f", "Growth"], ["#3b5bff", "Scale"]].map(([c, t], i) => (
              <div key={t} className="pack" style={{ "--c": c, "--r": `${(i - 1.5) * 9}deg`, "--y": `${Math.abs(i - 1.5) * 10}px` }}>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <Pill onClick={() => openContact()}>start a project</Pill>
        </article>
      </div>
    </section>
  );
}

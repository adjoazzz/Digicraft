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

      <div className="bento" id="portfolio">
        {/* Row 1 — visual + story */}
        <article className="bento-card bento-visual visual-img" style={{ "--i": 0 }}>
          <img
            className="work-img"
            src="/work/be-a-gee.jpg"
            alt="Be a GEE campaign artwork with two characters pointing at the viewer"
            loading="lazy"
          />
          <div className="bento-meta light">
            <span>Be a GEE!</span>
            <span>Campaign launch · Key visual</span>
          </div>
        </article>

        <article className="bento-card bento-story tone-blue" style={{ "--i": 1 }}>
          <span className="bento-kicker">Be a GEE · Campaign launch</span>
          <h3 className="bento-headline">A campaign that makes everyone want in.</h3>
          <p className="bento-text">Two larger-than-life characters, one bold invitation and a short code to dial. We built the key visual to be simple to read and impossible to scroll past.</p>
          <Pill>read the story</Pill>
        </article>

        {/* Row 2 — three tall cards */}
        <article className="bento-card bento-tall visual-img tall-img" style={{ "--i": 2 }}>
          <img
            className="work-img"
            src="/work/cbg-mobile.jpg"
            alt="CBG Mobile banking campaign artwork with phones on a red background"
            style={{ objectPosition: "22% 50%" }}
            loading="lazy"
          />
          <div className="bento-meta light">
            <span>CBG Mobile</span>
            <span>Mobile banking · Campaign design</span>
          </div>
          <Pill>view campaign</Pill>
        </article>

        <article className="bento-card bento-tall visual-img tall-img" style={{ "--i": 3 }}>
          <img
            className="work-img"
            src="/work/ecofridges.jpg"
            alt="Ecofridges campaign artwork about saving on energy bills"
            style={{ objectPosition: "96% 50%" }}
            loading="lazy"
          />
          <div className="bento-meta light">
            <span>Ecofridges</span>
            <span>Go Green · Campaign design</span>
          </div>
          <Pill>view campaign</Pill>
        </article>

        {/* Last card */}
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

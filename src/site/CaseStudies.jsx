import { useRef } from "react";
import { useContact, useInView } from "./hooks";

const Pill = ({ children, onClick }) => (
  <button className="pill" onClick={onClick}>
    {children} <span className="arrow">→</span>
  </button>
);

const work = [
  {
    img: "/work/be-a-gee.jpg",
    alt: "Be a GEE campaign artwork with two characters pointing at the viewer",
    name: "Be a GEE!",
    tag: "Campaign launch · Key visual",
  },
  {
    img: "/work/cbg-mobile.jpg",
    alt: "CBG Mobile banking campaign artwork with phones on a red background",
    name: "CBG Mobile",
    tag: "Mobile banking · Campaign design",
  },
  {
    img: "/work/ecofridges.jpg",
    alt: "Ecofridges campaign artwork about saving on energy bills",
    name: "Ecofridges",
    tag: "Go Green · Campaign design",
  },
  {
    img: "/work/asaase-sound-clash.jpg",
    alt: "Asaase Sound Clash event poster",
    name: "Asaase Sound Clash",
    tag: "Event promotion · Key art",
  },
];

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
        {work.map((w, i) => (
          <article key={w.name} className="bento-card bento-visual work-card" style={{ "--i": i }}>
            <img className="work-img" src={w.img} alt={w.alt} loading="lazy" />
            <div className="work-caption">
              <span>{w.name}</span>
              <span>{w.tag}</span>
            </div>
          </article>
        ))}

        <article className="bento-card tone-cream work-cta" style={{ "--i": work.length }}>
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

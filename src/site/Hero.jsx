import { useState } from "react";
import { HERO_VIDEO, services } from "./data";
import { useContact } from "./hooks";
import ServiceIllustration from "./ServiceIllustrations";
import EyeLogo from "./EyeLogo";
import ThemeToggle from "./ThemeToggle";
import BackgroundVideo from "./BackgroundVideo";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
];

function ServiceRow({ service, open, onToggle }) {
  const { open: openContact } = useContact();
  return (
    <div className={`service-row${open ? " is-open" : ""}`}>
      <button className="service-head" onClick={onToggle} aria-expanded={open}>
        <span className="service-num">{service.id}</span>
        <span className="service-name">{service.name}</span>
        <span className="service-plus" aria-hidden="true" />
      </button>
      <div className="service-drawer">
        <div className="service-drawer-inner">
          <div className="service-panel">
            <ServiceIllustration type={service.illustration} />
            <div className="service-panel-body">
              <span className="service-panel-eyebrow">{service.id} — What we do</span>
              <h3 className="service-panel-title">{service.headline}</h3>
              <p className="service-panel-text">{service.body}</p>
              <ul className="service-deliverables">
                {service.deliverables.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <div className="service-panel-foot">
                <span className="service-timeline">Typical timeline · {service.timeline}</span>
                <button className="btn btn-ink" onClick={() => openContact(service.name)}>
                  Discuss this service <span className="arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [openService, setOpenService] = useState(null);
  const { open: openContact } = useContact();

  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true">
        <div className="hero-blob" />
        <div className="hero-blob-2" />
        <div className="hero-blob-3" />
        <BackgroundVideo className="hero-video" sources={[HERO_VIDEO]} />
        <div className="hero-overlay" />
      </div>

      <nav className="hero-nav fade-up">
        <a className="logo" href="#top">
          <EyeLogo />
          Digicraft
        </a>
        <div className="hero-links">
          {navLinks.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        </div>
        <div className="hero-nav-actions">
          <ThemeToggle />
          <button className="btn btn-light" onClick={() => openContact()}>
            Get in touch
          </button>
        </div>
      </nav>

      <div className="hero-content">
        <p className="hero-kicker fade-up delay-1"><span className="live-dot" /> Brand & growth studio · Taking new projects</p>
        <h1 className="hero-title fade-up delay-2">
          We create bold ideas that <em>position brands</em> &amp; <em>drive growth</em>
        </h1>
      </div>

      <div className="services fade-up delay-3" id="services">
        <div className="services-intro">
          <span className="eyebrow">Services</span>
          <p>Comprehensive services to transform your brand and business in today's dynamic market. Tap any service to see what's included.</p>
        </div>
        <div className="services-list">
          {services.map((s) => (
            <ServiceRow
              key={s.id}
              service={s}
              open={openService === s.id}
              onToggle={() => setOpenService(openService === s.id ? null : s.id)}
            />
          ))}
        </div>
        <aside className="services-cta">
          <span className="eyebrow">Not sure where to start?</span>
          <p>Book a free 30-minute call. We'll tell you honestly what your brand needs next.</p>
          <button className="btn btn-orange" onClick={() => openContact()}>
            Book a free call <span className="arrow">→</span>
          </button>
        </aside>
      </div>
    </section>
  );
}

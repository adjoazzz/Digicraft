import { useEffect, useRef, useState } from "react";
import { budgets, services } from "./data";

const toTitle = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export function FloatingContact({ onOpen, hidden }) {
  return (
    <button className={`float-contact${hidden ? " is-hidden" : ""}`} onClick={() => onOpen()}>
      <span className="live-dot" />
      <span className="float-contact-label">Let's talk</span>
      <span className="float-contact-extra">start a project →</span>
    </button>
  );
}

// `session` changes every time the sheet opens, remounting the form so it starts fresh.
export function ContactSheet({ open, preset, session, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`contact-layer${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="contact-backdrop" onClick={onClose} />
      <div className="contact-sheet" role="dialog" aria-modal="true" aria-label="Start a project">
        <button className="contact-close" onClick={onClose} aria-label="Close">×</button>
        <ContactForm key={session} preset={preset} autoFocus={open} onClose={onClose} />
      </div>
    </div>
  );
}

function ContactForm({ preset, autoFocus, onClose }) {
  const [picked, setPicked] = useState(preset ? [preset] : []);
  const [budget, setBudget] = useState(null);
  const [sent, setSent] = useState(false);
  const firstField = useRef(null);

  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => firstField.current?.focus({ preventScroll: true }), 350);
    return () => clearTimeout(t);
  }, [autoFocus]);

  const toggle = (name) =>
    setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  // Not wired to a backend yet: hook this up to Formspree/Resend/etc. before launch.
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return sent ? (
      <div className="contact-sent">
        <div className="contact-sent-icon">✓</div>
        <h3>Thanks, we're on it.</h3>
        <p>A strategist will get back to you within one business day with next steps and a time for a quick call.</p>
        <button className="btn btn-ink" onClick={onClose}>Back to the site</button>
      </div>
    ) : (
      <form onSubmit={submit}>
        <span className="contact-eyebrow"><span className="live-dot" /> Replies within 1 business day</span>
        <h3 className="contact-title">Let's build something <em>unforgettable.</em></h3>

        <fieldset>
          <legend>What do you need?</legend>
          <div className="chips">
            {services.map((s) => (
              <button type="button" key={s.id} className={`chip${picked.includes(s.name) ? " on" : ""}`} onClick={() => toggle(s.name)}>
                {toTitle(s.name)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Budget</legend>
          <div className="chips">
            {budgets.map((b) => (
              <button type="button" key={b} className={`chip${budget === b ? " on" : ""}`} onClick={() => setBudget(b)}>{b}</button>
            ))}
          </div>
        </fieldset>

        <div className="contact-fields">
          <input ref={firstField} required name="name" placeholder="Your name" autoComplete="name" />
          <input required type="email" name="email" placeholder="Work email" autoComplete="email" />
        </div>
        <textarea name="message" rows="3" placeholder="Tell us about your brand and goals (optional)" />

        <button type="submit" className="btn btn-orange contact-submit">
          Send enquiry <span className="arrow">→</span>
        </button>
      </form>
  );
}

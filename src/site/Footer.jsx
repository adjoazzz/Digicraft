import { useCallback, useRef } from "react";
import { useContact, useScrollFrame } from "./hooks";

const WORD = "DIGICRAFT".split("");

export default function Footer() {
  const markRef = useRef(null);
  const { open: openContact } = useContact();

  // 0 when the wordmark's top meets the bottom of the screen, 1 once it's fully on screen (page bottom).
  const onFrame = useCallback((r, vh) => {
    const p = (vh - r.top) / r.height;
    markRef.current.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
  }, []);
  useScrollFrame(markRef, onFrame);

  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <h2>Got a brand to build? <em>Let's talk.</em></h2>
        <button className="btn btn-orange" onClick={() => openContact()}>Start a project <span className="arrow">→</span></button>
      </div>
      <div className="footer-row">
        <span className="footer-logo">Digicraft</span>
        <span>© {new Date().getFullYear()} All rights reserved</span>
        <span>Privacy Policy · Terms</span>
      </div>
      <div className="footer-wordmark" ref={markRef} style={{ "--n": WORD.length }} aria-label="Digicraft">
        {WORD.map((ch, i) => (
          <span key={i} className="footer-letter" style={{ "--i": i }} aria-hidden="true">
            <span>{ch}</span>
          </span>
        ))}
      </div>
    </footer>
  );
}

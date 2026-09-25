import { useCallback, useMemo, useState } from "react";
import "./site/styles.css";
import { ContactContext } from "./site/hooks";
import Hero from "./site/Hero";
import About from "./site/About";
import Effect from "./site/Effect";
import CaseStudies from "./site/CaseStudies";
import Approach from "./site/Approach";
import Showcase from "./site/Showcase";
import Footer from "./site/Footer";
import { ContactSheet, FloatingContact } from "./site/Contact";

export default function AgencySite() {
  const [contact, setContact] = useState({ open: false, preset: null, session: 0 });
  const open = useCallback((preset = null) => setContact((c) => ({ open: true, preset, session: c.session + 1 })), []);
  const close = useCallback(() => setContact((c) => ({ ...c, open: false })), []);
  const ctx = useMemo(() => ({ open }), [open]);

  return (
    <ContactContext.Provider value={ctx}>
      <Hero />
      <About />
      <Effect />
      <CaseStudies />
      <Approach />
      <Showcase />

      <Footer />

      <FloatingContact onOpen={open} hidden={contact.open} />
      <ContactSheet open={contact.open} preset={contact.preset} session={contact.session} onClose={close} />
    </ContactContext.Provider>
  );
}

import { useCallback, useRef } from "react";
import { useScrollFrame } from "./hooks";

// Giant uppercase statement whose words fill in one by one as it scrolls through the viewport.
// Each item is a word string, { word, accent } for a serif-italic key word, or { card } for an inline element.
export default function ScrollStatement({ items, className = "" }) {
  const ref = useRef(null);

  const onFrame = useCallback((r, vh) => {
    const p = (vh * 0.9 - r.top) / (r.height + vh * 0.35);
    ref.current.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
  }, []);
  useScrollFrame(ref, onFrame);

  return (
    <h2 className={`statement ${className}`} ref={ref} style={{ "--n": items.length }}>
      {items.map((item, i) => {
        if (item.card) {
          return <span key={i} className="statement-card" style={{ "--i": i }}>{item.card}</span>;
        }
        const word = typeof item === "string" ? item : item.word;
        return (
          <span key={i} className={`statement-word${item.accent ? " accent" : ""}`} style={{ "--i": i }}>
            {word}{" "}
          </span>
        );
      })}
    </h2>
  );
}

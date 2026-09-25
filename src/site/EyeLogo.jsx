import { useEffect, useId, useRef, useState } from "react";

// SVG rebuild of the Digicraft eye (public/logo.png) so the pupil can follow the pointer and the eye can blink.
// Traced in the PNG's own 1700×1210 coordinate space.
const MAX_X = 150; // how far the pupil can travel inside the almond
const MAX_Y = 55;

export default function EyeLogo({ className = "" }) {
  const id = useId();
  const svgRef = useRef(null);
  const pupilRef = useRef(null);
  const [blinking, setBlinking] = useState(false);

  const blink = () => {
    setBlinking(false);
    requestAnimationFrame(() => setBlinking(true));
  };

  useEffect(() => {
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };

    const onMove = (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.48);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, dist / 300); // looks further the further away the pointer is
      target.x = (dx / dist) * MAX_X * reach;
      target.y = (dy / dist) * MAX_Y * reach;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      raf = 0;
      cur.x += (target.x - cur.x) * 0.2;
      cur.y += (target.y - cur.y) * 0.2;
      pupilRef.current?.setAttribute("transform", `translate(${cur.x.toFixed(1)} ${cur.y.toFixed(1)})`);
      if (Math.abs(target.x - cur.x) > 0.5 || Math.abs(target.y - cur.y) > 0.5) raf = requestAnimationFrame(tick);
    };

    // An occasional idle blink keeps it alive.
    const idle = setInterval(() => {
      setBlinking(false);
      requestAnimationFrame(() => setBlinking(true));
    }, 6500);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      clearInterval(idle);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`eye-logo${blinking ? " is-blinking" : ""} ${className}`}
      viewBox="40 0 1560 1210"
      onPointerEnter={blink}
      onAnimationEnd={() => setBlinking(false)}
      aria-hidden="true"
    >
      <defs>
        <mask id={`${id}-iris`} maskUnits="userSpaceOnUse" x="0" y="0" width="1700" height="1210">
          <rect width="1700" height="1210" fill="#fff" />
          <g ref={pupilRef}>
            <ellipse cx="822" cy="586" rx="150" ry="117" fill="#000" />
          </g>
        </mask>
      </defs>
      <g fill="#0070b4">
        {/* lid above the brow band */}
        <path className="eye-lid-top" d="M48 645 A768 595 0 1 1 1583 657 Q817 -115 48 645 Z" />
        {/* lower lid below the band */}
        <path className="eye-lid-bottom" d="M195 697 Q817 1119 1437 697 L1500 880 A768 595 0 0 1 132 880 Z" />
        {/* almond iris with the pupil cut out */}
        <path className="eye-iris" mask={`url(#${id}-iris)`} d="M287 587 Q822 199 1358 587 Q822 973 287 587 Z" />
      </g>
    </svg>
  );
}

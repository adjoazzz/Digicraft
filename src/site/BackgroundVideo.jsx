import { useEffect, useRef, useState } from "react";

// Muted, looping background video that fades in once it has a frame to show.
// React doesn't render the `muted` attribute, and some browsers (Safari, Edge with stricter
// autoplay settings) then refuse to autoplay, so we set it on the element and start playback
// ourselves, retrying on the first interaction if the browser still blocks it.
export default function BackgroundVideo({ sources, className = "" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");

    const markReady = () => setReady(true);
    const tryPlay = () => v.play().catch(() => {});
    const onInteract = () => { tryPlay(); cleanupInteract(); };
    const cleanupInteract = () => ["pointerdown", "keydown", "scroll", "touchstart"].forEach((e) => window.removeEventListener(e, onInteract));

    v.addEventListener("loadeddata", markReady);
    if (v.readyState >= 2) markReady();
    ["pointerdown", "keydown", "scroll", "touchstart"].forEach((e) => window.addEventListener(e, onInteract, { passive: true, once: true }));
    tryPlay();

    return () => {
      v.removeEventListener("loadeddata", markReady);
      cleanupInteract();
    };
  }, []);

  return (
    <video ref={ref} className={`${className}${ready ? " is-ready" : ""}`} autoPlay muted loop playsInline preload="auto" aria-hidden="true">
      {sources.map((src) => <source key={src} src={src} type="video/mp4" />)}
    </video>
  );
}

// Minimal line illustrations for the service dropdowns.
// Paths with className="draw" animate in (pathLength=1 lets CSS draw them with a dash offset).
const P = (props) => <path className="draw" pathLength="1" {...props} />;

const scenes = {
  design: (
    <>
      <circle cx="62" cy="96" r="34" fill="var(--orange)" opacity="0.9" />
      <rect className="draw" pathLength="1" x="92" y="58" width="62" height="62" rx="6" />
      <P d="M28 140 C 70 60, 120 150, 176 40" />
      <rect x="24" y="136" width="8" height="8" fill="#fff" stroke="currentColor" />
      <rect x="172" y="36" width="8" height="8" fill="#fff" stroke="currentColor" />
      <P d="M100 92 L 148 48" />
      <circle cx="148" cy="48" r="4" fill="currentColor" />
    </>
  ),
  consulting: (
    <>
      <P d="M20 140 H 184" />
      <P d="M20 140 V 24" />
      <rect x="40" y="104" width="22" height="36" rx="3" fill="var(--blue)" opacity="0.15" />
      <rect x="76" y="84" width="22" height="56" rx="3" fill="var(--blue)" opacity="0.3" />
      <rect x="112" y="60" width="22" height="80" rx="3" fill="var(--blue)" />
      <P d="M36 96 L 80 74 L 116 50 L 168 26" />
      <P d="M152 24 L 170 25 L 164 42" />
    </>
  ),
  strategy: (
    <>
      <circle className="draw" pathLength="1" cx="90" cy="92" r="52" />
      <circle className="draw" pathLength="1" cx="90" cy="92" r="34" />
      <circle cx="90" cy="92" r="16" fill="var(--orange)" />
      <P d="M90 92 L 168 22" />
      <P d="M156 20 L 170 20 L 170 34" />
      <P d="M160 26 L 176 14" />
    </>
  ),
  digital: (
    <>
      <rect className="draw" pathLength="1" x="46" y="18" width="70" height="128" rx="12" />
      <P d="M70 30 H 92" />
      <rect x="58" y="44" width="46" height="34" rx="4" fill="var(--blue)" />
      <P d="M58 92 H 104" />
      <P d="M58 104 H 90" />
      <P d="M128 64 C 150 56, 160 70, 176 60" />
      <P d="M128 86 C 146 80, 164 96, 184 84" />
      <path d="M118 112 L 146 124 L 134 128 L 142 142 L 136 145 L 128 131 L 120 138 Z" fill="var(--orange)" stroke="currentColor" strokeLinejoin="round" />
    </>
  ),
  marketing: (
    <>
      <P d="M24 132 C 60 132, 60 60, 100 60 S 140 20, 176 20" />
      <circle cx="24" cy="132" r="7" fill="#fff" stroke="currentColor" />
      <circle cx="100" cy="60" r="10" fill="var(--blue)" />
      <circle cx="176" cy="20" r="7" fill="var(--orange)" />
      <P d="M100 60 V 146" />
      <rect className="draw" pathLength="1" x="112" y="96" width="62" height="40" rx="5" />
      <P d="M122 110 H 160" />
      <P d="M122 122 H 146" />
    </>
  ),
  comms: (
    <>
      <path className="draw" pathLength="1" d="M20 36 h 100 a 10 10 0 0 1 10 10 v 44 a 10 10 0 0 1 -10 10 h -64 l -22 18 v -18 h -14 a 10 10 0 0 1 -10 -10 v -44 a 10 10 0 0 1 10 -10 z" />
      <P d="M36 60 H 104" />
      <P d="M36 76 H 84" />
      <path d="M96 84 h 74 a 10 10 0 0 1 10 10 v 34 a 10 10 0 0 1 -10 10 h -6 v 16 l -20 -16 h -48 a 10 10 0 0 1 -10 -10 v -34 a 10 10 0 0 1 10 -10 z" fill="var(--orange)" stroke="currentColor" />
      <circle cx="118" cy="111" r="3.5" fill="#fff" />
      <circle cx="133" cy="111" r="3.5" fill="#fff" />
      <circle cx="148" cy="111" r="3.5" fill="#fff" />
    </>
  ),
};

export default function ServiceIllustration({ type }) {
  return (
    <svg className="svc-illustration" viewBox="0 0 200 160" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {scenes[type]}
    </svg>
  );
}

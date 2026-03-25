import { useState } from "react";

const services = [
  { id: "01", name: "DESIGN", active: false },
  { id: "02", name: "BUSINESS CONSULTING", active: false },
  { id: "03", name: "BRAND STRATEGY", active: true },
  { id: "04", name: "DIGITAL MARKETING", active: false },
  { id: "05", name: "STRATEGIC MARKETING", active: false },
  { id: "06", name: "COMMUNICATIONS", active: false, dim: true },
];

const projectFilters = ["All projects", "Brand Strategy", "Business Consulting", "Design", "Digital Marketing", "Strategic Marketing", "Communications"];

const projects = [
  {
    id: 1,
    name: "Arithmetic",
    tags: ["Digital Marketing", "Strategic Marketing"],
    bg: "#C0392B",
    label: "ARITHMETIC",
    color: "#fff",
  },
  {
    id: 2,
    name: "Estro",
    tags: ["Brand Strategy", "Marketing Research"],
    bg: "#2C2C2C",
    label: "estro",
    color: "#fff",
    image: true,
  },
  {
    id: 3,
    name: "Butter",
    tags: ["Digital Marketing", "Strategic Marketing"],
    bg: "#F5F0E8",
    label: "UTTER",
    color: "#D35400",
    drag: true,
  },
];

// Scattered work cards for the CTA showcase section
const showcaseCards = [
  {
    id: 1,
    bg: "#0d0d22",
    accent: "#f5f4f0",
    label: "ID",
    sub: "Brand Identity",
    style: { top: "8%", left: "4%", rotate: "-8deg", width: 140, height: 170 },
    type: "bold-text",
  },
  {
    id: 2,
    bg: "#1a3aff",
    accent: "#f5f4f0",
    label: "OFF",
    sub: "Campaign",
    style: { top: "2%", left: "38%", rotate: "6deg", width: 130, height: 155 },
    type: "word",
  },
  {
    id: 3,
    bg: "#12122a",
    accent: "#1a3aff",
    label: "LOGO",
    sub: "Logo Design",
    style: { top: "5%", right: "5%", rotate: "4deg", width: 150, height: 180 },
    type: "swan",
  },
  {
    id: 4,
    bg: "#ff4d1a",
    accent: "#f5f4f0",
    label: "P",
    sub: "Visual Identity",
    style: { bottom: "5%", left: "3%", rotate: "5deg", width: 145, height: 165 },
    type: "pink-letter",
  },
  {
    id: 5,
    bg: "#0d0d22",
    accent: "#f5f4f0",
    label: "How",
    sub: "Strategy",
    style: { bottom: "2%", left: "35%", rotate: "-4deg", width: 140, height: 170 },
    type: "how",
  },
  {
    id: 6,
    bg: "#3b5bff",
    accent: "#f5f4f0",
    label: "BRAND",
    sub: "Brand Identity",
    style: { bottom: "3%", right: "4%", rotate: "7deg", width: 145, height: 165 },
    type: "yellow-brand",
  },
];

const unlockItems = [
  {
    id: "01",
    title: "BRAND IDENTITY",
    desc: "A bold, distinctive visual language that turns heads and builds instant recognition across every touchpoint.",
    stat: "+340%",
    statLabel: "Brand recall lift",
    color: "#1a3aff",
  },
  {
    id: "02",
    title: "MARKET POSITIONING",
    desc: "Carve out the category you own. We find the white space and plant your flag before competitors know it exists.",
    stat: "2.4×",
    statLabel: "Faster market penetration",
    color: "#ff4d1a",
  },
  {
    id: "03",
    title: "AUDIENCE GROWTH",
    desc: "Community-first strategies that compound — turning customers into advocates who do the marketing for you.",
    stat: "+180%",
    statLabel: "Organic audience growth",
    color: "#1a3aff",
  },
  {
    id: "04",
    title: "REVENUE ACCELERATION",
    desc: "Every creative decision ties back to a commercial outcome. Strategy and execution aligned to your growth targets.",
    stat: "3.1×",
    statLabel: "Average ROI on campaigns",
    color: "#ff4d1a",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #050510;
    --blue: #1a3aff;
    --blue-bright: #3b5bff;
    --orange: #ff4d1a;
    --white: #f5f4f0;
    --dim: rgba(245,244,240,0.35);
    --card-border: rgba(255,255,255,0.08);
  }

  body { background: var(--bg); color: var(--white); font-family: 'Syne', sans-serif; overflow-x: hidden; }

  /* ---- HERO ---- */
  .hero {
    position: relative;
    min-height: 100vh;
    padding: 0 5vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
  }

  .hero-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0 3rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--dim);
  }

  .hero-nav .logo { color: var(--white); font-size: 1rem; font-weight: 800; letter-spacing: -0.02em; }
  .hero-nav nav { display: flex; gap: 2.5rem; }
  .hero-nav nav a { color: var(--dim); text-decoration: none; transition: color 0.2s; }
  .hero-nav nav a:hover { color: var(--white); }

  .hero-blob {
    position: absolute;
    width: 55%;
    height: 85%;
    background: radial-gradient(ellipse at 40% 40%, #2a3aff 0%, #1a1aee 30%, #0a0a60 65%, transparent 100%);
    border-radius: 50% 40% 60% 50%;
    filter: blur(40px);
    opacity: 0.7;
    z-index: 0;
    animation: blobDrift 25s ease-in-out infinite;
  }

  .hero-blob-2 {
    position: absolute;
    top: 20%;
    right: 5%;
    width: 30%;
    height: 40%;
    background: radial-gradient(ellipse, #00d4ff 0%, #0055ff 40%, transparent 75%);
    border-radius: 60% 40% 50% 60%;
    filter: blur(50px);
    opacity: 0.35;
    z-index: 0;
    animation: blobDrift2 14s 2s ease-in-out infinite;
  }

  .hero-blob-3 {
    position: absolute;
    bottom: 5%;
    right: 20%;
    width: 25%;
    height: 30%;
    background: radial-gradient(ellipse, #5b2fff 0%, #1a0aaa 50%, transparent 80%);
    border-radius: 40% 60% 55% 45%;
    filter: blur(55px);
    opacity: 0.28;
    z-index: 0;
    animation: blobDrift3 20s 1s ease-in-out infinite;
  }

  @keyframes blobDrift2 {
    0%   { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
    30%  { transform: translate(10vw, -15vh) scale(1.1) rotate(-15deg); }
    60%  { transform: translate(-14vw, -20vh) scale(0.9) rotate(18deg); }
    100% { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
  }

  @keyframes blobDrift3 {
    0%   { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
    40%  { transform: translate(-10vw, -8vh) scale(1.12) rotate(10deg); }
    80%  { transform: translate(12vw, -18vh) scale(0.88) rotate(-12deg); }
    100% { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
  }

  @keyframes blobDrift {
    0%   { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
    20%  { transform: translate(-8vw, 12vh) scale(1.1) rotate(10deg); }
    45%  { transform: translate(14vw, 20vh) scale(0.92) rotate(-8deg); }
    70%  { transform: translate(-5vw, -10vh) scale(1.06) rotate(14deg); }
    100% { transform: translate(0vw, 0vh) scale(1) rotate(0deg); }
  }

  .hero-content { position: relative; z-index: 1; }

  .hero-eyebrow {
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.15em;
    color: var(--dim);
    max-width: 200px;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .hero-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(3rem, 6vw, 5.5rem);
    line-height: 1.08;
    font-weight: 400;
    margin-bottom: 0;
    letter-spacing: -0.02em;
  }

  .hero-title em {
    font-style: italic;
    text-decoration: underline;
    text-decoration-color: var(--orange);
    text-underline-offset: 6px;
  }

  /* ---- SERVICES ---- */
  .services {
    position: relative;
    z-index: 1;
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 200px 1fr 280px;
    gap: 0 3rem;
    align-items: start;
  }

  .services-intro {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    color: var(--dim);
    line-height: 1.65;
    padding-top: 0.5rem;
  }

  .services-list { border-top: 1px solid var(--card-border); }

  .service-row {
    display: flex;
    align-items: center;
    padding: 1.1rem 0;
    border-bottom: 1px solid var(--card-border);
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
  }

  .service-row:hover .service-name { color: var(--white); }

  .service-num {
    font-size: 0.65rem;
    color: var(--dim);
    width: 2.5rem;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
  }

  .service-name {
    flex: 1;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--white);
    transition: color 0.2s;
  }

  .service-row.active .service-name { color: var(--orange); }
  .service-row.dim .service-name { color: var(--dim); font-weight: 400; }

  .service-plus {
    font-size: 1.2rem;
    color: var(--dim);
    width: 1.5rem;
    text-align: center;
  }

  /* ---- SHOWCASE CTA ---- */
  .showcase-section {
    position: relative;
    background: #050510;
    border-top: 1px solid var(--card-border);
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 7rem 5vw;
  }

  .showcase-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 60%, rgba(26,58,255,0.12) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }

  .showcase-center {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 480px;
  }

  .showcase-eyebrow {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    color: var(--dim);
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 1.2rem;
    display: block;
  }

  .showcase-headline {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(1.8rem, 3.2vw, 2.6rem);
    font-weight: 400;
    line-height: 1.15;
    color: var(--white);
    letter-spacing: -0.02em;
    margin-bottom: 0.9rem;
  }

  .showcase-headline em {
    font-style: italic;
    color: var(--orange);
  }

  .showcase-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.76rem;
    color: var(--dim);
    line-height: 1.75;
    margin-bottom: 2rem;
  }

  .showcase-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--white);
    color: #050510;
    border: none;
    padding: 0.85rem 2rem;
    border-radius: 100px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.3s;
  }

  .showcase-btn:hover {
    background: var(--orange);
    color: #fff;
    transform: scale(1.04);
  }

  .showcase-card {
    position: absolute;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.07);
  }

  .showcase-card:hover {
    transform: scale(1.07) rotate(0deg) !important;
    box-shadow: 0 24px 60px rgba(0,0,0,0.7);
    z-index: 20;
  }

  .showcase-card-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.2rem;
    position: relative;
  }

  .card-placeholder-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.48rem;
    letter-spacing: 0.15em;
    opacity: 0.45;
    position: absolute;
    bottom: 0.6rem;
    right: 0.8rem;
    text-transform: uppercase;
  }

  /* ---- UNLOCK SECTION ---- */
  .unlock-section {
    position: relative;
    padding: 0 5vw;
    border-top: 1px solid var(--card-border);
    overflow: hidden;
  }

  .unlock-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    min-height: 560px;
  }

  /* Left: accordion list */
  .unlock-left {
    padding: 4rem 3rem 4rem 0;
    border-right: 1px solid var(--card-border);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }

  .unlock-eyebrow {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: var(--dim);
    font-weight: 600;
    margin-bottom: 2rem;
    font-family: 'DM Sans', sans-serif;
  }

  .unlock-title-block {
    margin-bottom: 2.5rem;
  }

  .unlock-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    line-height: 1.12;
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .unlock-title em {
    font-style: italic;
    color: var(--orange);
  }

  .unlock-list { display: flex; flex-direction: column; }

  .unlock-row {
    border-top: 1px solid var(--card-border);
    cursor: pointer;
    transition: all 0.3s;
    overflow: hidden;
  }

  .unlock-row:last-child { border-bottom: 1px solid var(--card-border); }

  .unlock-row-header {
    display: flex;
    align-items: center;
    padding: 1.1rem 0;
    gap: 1rem;
  }

  .unlock-row-num {
    font-size: 0.6rem;
    color: var(--dim);
    font-family: 'DM Sans', sans-serif;
    width: 2rem;
    flex-shrink: 0;
  }

  .unlock-row-name {
    flex: 1;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--white);
    transition: color 0.25s;
  }

  .unlock-row.active .unlock-row-name { color: var(--orange); }

  .unlock-row-toggle {
    font-size: 1rem;
    color: var(--dim);
    transition: transform 0.3s;
    font-weight: 300;
  }

  .unlock-row.active .unlock-row-toggle { transform: rotate(45deg); color: var(--orange); }

  .unlock-row-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.35s ease;
  }

  .unlock-row.active .unlock-row-body { grid-template-rows: 1fr; }

  .unlock-row-body-inner {
    overflow: hidden;
    padding: 0 0 0 3rem;
  }

  .unlock-row.active .unlock-row-body-inner { padding-bottom: 1.2rem; }

  .unlock-row-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    color: rgba(245,244,240,0.6);
    line-height: 1.7;
  }

  /* Right: visual panel */
  .unlock-right {
    padding: 4rem 0 4rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .unlock-visual {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 16px;
    overflow: hidden;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--card-border);
  }

  /* Animated brand canvas */
  .brand-canvas {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  }

  .brand-orb {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, #1a3aff, #ff4d1a, #5b2fff, #1a3aff);
    animation: orbSpin 6s linear infinite;
    position: relative;
    flex-shrink: 0;
  }

  .brand-orb::after {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    background: #07071a;
  }

  @keyframes orbSpin { to { transform: rotate(360deg); } }

  .brand-bars {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 60px;
    width: 100%;
    max-width: 200px;
  }

  .brand-bar {
    flex: 1;
    border-radius: 3px 3px 0 0;
    animation: barRise 2s ease both;
    background: var(--blue);
  }

  .brand-bar:nth-child(2) { animation-delay: 0.1s; background: rgba(26,58,255,0.6); }
  .brand-bar:nth-child(3) { animation-delay: 0.2s; background: var(--orange); }
  .brand-bar:nth-child(4) { animation-delay: 0.3s; background: rgba(26,58,255,0.6); }
  .brand-bar:nth-child(5) { animation-delay: 0.4s; background: var(--blue); }

  @keyframes barRise {
    from { transform: scaleY(0); transform-origin: bottom; }
    to { transform: scaleY(1); transform-origin: bottom; }
  }

  .stat-badge {
    position: absolute;
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 0.7rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2px;
    transition: all 0.4s ease;
  }

  .stat-badge.top-right { top: 1rem; right: 1rem; }
  .stat-badge.bottom-left { bottom: 1rem; left: 1rem; }

  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    line-height: 1;
    transition: color 0.4s;
  }

  .stat-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    color: var(--dim);
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  /* Corner tag */
  .unlock-corner-tag {
    position: absolute;
    bottom: 4rem;
    right: 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    color: var(--dim);
    letter-spacing: 0.12em;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
  }

  /* Background decoration for unlock section */
  .unlock-bg-line {
    position: absolute;
    top: 0; bottom: 0;
    left: 50%;
    width: 1px;
    background: var(--card-border);
    pointer-events: none;
  }

  /* ---- PROJECTS ---- */
  .projects-section {
    background: #050510;
    padding: 5rem 5vw;
    position: relative;
  }

  .projects-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .projects-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(3.5rem, 7vw, 6rem);
    font-weight: 400;
    letter-spacing: -0.03em;
    line-height: 1;
    position: relative;
  }

  .projects-title sup {
    position: absolute;
    top: 0.5rem;
    right: -1.5rem;
    width: 22px;
    height: 22px;
    background: var(--orange);
    border-radius: 50%;
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .filter-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-tab {
    padding: 0.45rem 1rem;
    border-radius: 100px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid var(--card-border);
    background: transparent;
    color: var(--dim);
  }

  .filter-tab:hover { border-color: rgba(255,255,255,0.3); color: var(--white); }
  .filter-tab.active { background: var(--white); color: #050510; border-color: var(--white); }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .project-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 3/4;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .project-card:hover { transform: scale(1.02); }

  .project-card-bg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-card-label {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 400;
    letter-spacing: -0.02em;
    position: relative;
    z-index: 1;
    mix-blend-mode: multiply;
  }

  .project-info { margin-top: 1rem; }

  .project-name {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    font-style: italic;
    margin-bottom: 0.3rem;
  }

  .project-tags {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .project-tag {
    font-size: 0.65rem;
    color: var(--dim);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: 'DM Sans', sans-serif;
  }

  .project-tag::before {
    content: '';
    width: 4px;
    height: 4px;
    background: var(--dim);
    border-radius: 50%;
    display: inline-block;
  }

  .project-tag:first-child::before { display: none; }

  /* ---- APPROACH ---- */
  .approach-section {
    background: linear-gradient(135deg, #050510 0%, #0a0a30 40%, #0a1580 70%, #050510 100%);
    padding: 6rem 5vw;
    position: relative;
    overflow: hidden;
  }

  .approach-blob {
    position: absolute;
    bottom: -20%;
    right: -10%;
    width: 60%;
    height: 80%;
    background: radial-gradient(ellipse, #1a3aff 0%, #0a1aaa 40%, transparent 70%);
    filter: blur(60px);
    opacity: 0.5;
    z-index: 0;
  }

  .approach-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
    position: relative;
    z-index: 1;
  }

  .approach-title-l, .approach-title-r {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .approach-title-r em {
    font-style: italic;
    text-decoration: underline;
    text-decoration-color: var(--orange);
    text-underline-offset: 6px;
  }

  .approach-body {
    max-width: 600px;
    margin: 0 auto 4rem;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    line-height: 1.8;
    color: rgba(245,244,240,0.7);
    position: relative;
    z-index: 1;
  }

  .approach-body strong { color: var(--white); font-weight: 500; }

  .approach-circle-wrap {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  .approach-circle {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: spinSlow 20s linear infinite;
  }

  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .circle-inner {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(26,58,255,0.6) 0%, rgba(10,10,50,0.9) 60%, rgba(5,5,20,0.95) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: spinSlow 20s linear infinite reverse;
    padding: 2rem;
    text-align: center;
  }

  .circle-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 0.6rem;
  }

  .circle-icon { font-size: 1.8rem; margin-bottom: 0.6rem; }

  .circle-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.55rem;
    color: var(--dim);
    line-height: 1.6;
  }

  .dot-accent {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--blue-bright);
    box-shadow: 0 0 12px var(--blue-bright);
  }

  .dot-l { left: -5px; top: 50%; }
  .dot-r { right: -5px; top: 50%; }
  .dot-t { top: -5px; left: 50%; }

  /* ---- FOOTER ---- */
  .site-footer {
    background: #050510;
    border-top: 1px solid var(--card-border);
    padding: 2rem 5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--dim);
    font-family: 'DM Sans', sans-serif;
  }

  .footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1rem; color: var(--white); }

  /* ---- ANIMATIONS ---- */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fadeUp 0.7s ease both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.25s; }
  .delay-3 { animation-delay: 0.45s; }
  .delay-4 { animation-delay: 0.6s; }

  @media (max-width: 900px) {
    .services { grid-template-columns: 1fr; }
    .unlock-inner { grid-template-columns: 1fr; }
    .unlock-right { padding: 0 0 3rem; border-top: 1px solid var(--card-border); }
    .unlock-left { border-right: none; padding-right: 0; }
    .projects-grid { grid-template-columns: 1fr 1fr; }
    .approach-top { grid-template-columns: 1fr; }
  }

  @media (max-width: 600px) {
    .projects-grid { grid-template-columns: 1fr; }
  }
`;

const ProjectCard = ({ project }) => {
  const cardColors = {
    1: { bg: "#c0392b", text: "#fff" },
    2: { bg: "#1a1a1a", text: "#fff" },
    3: { bg: "#f0ede6", text: "#c0392b" },
  };
  const c = cardColors[project.id];
  return (
    <div>
      <div className="project-card" style={{ background: c.bg }}>
        <div className="project-card-bg">
          {project.id === 1 && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", opacity: 0.6 }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ width: 60, height: 80, background: i % 2 === 0 ? "#e74c3c" : "#c0392b", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }} />
                ))}
              </div>
            </div>
          )}
          {project.id === 2 && (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#2a2a2a 0%,#111 100%)", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: "1.5rem" }}>
              <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(#555,#222)", opacity: 0.8 }} />
            </div>
          )}
          {project.id === 3 && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(0,0,0,0.08)", borderRadius: 8, padding: "0.5rem 1rem", backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", color: "#333" }}>DRAG</div>
              </div>
            </div>
          )}
        </div>
        <div
          className="project-card-label"
          style={{ color: c.text, position: "absolute", bottom: "1.5rem", left: "1.5rem", zIndex: 2 }}
        >
          {project.label}
        </div>
      </div>
      <div className="project-info">
        <div className="project-name">{project.name}</div>
        <div className="project-tags">
          {project.tags.map((t, i) => (
            <span key={i} className="project-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ShowcaseSection = () => {
  const cardVisuals = {
    "bold-text": (card) => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "3.5rem", color: card.accent, letterSpacing: "-0.05em", lineHeight: 1 }}>
          {card.label}
        </span>
      </div>
    ),
    "word": (card) => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", width: "100%", height: "100%", padding: "0.8rem" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: card.accent, letterSpacing: "-0.03em", lineHeight: 1 }}>
          {card.label}
        </span>
        {/* Placeholder swoosh shape */}
        <div style={{ position: "absolute", top: "0.8rem", right: "0.8rem", width: 36, height: 36 }}>
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 28C10 18 26 8 32 4" stroke={card.accent} strokeWidth="3" strokeLinecap="round"/>
            <path d="M28 2 L34 6 L28 10" stroke={card.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    ),
    "swan": (card) => (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "1rem" }}>
        <div style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(245,244,240,0.5)", marginBottom: "0.3rem", lineHeight: 1.4, fontFamily: "'Syne', sans-serif" }}>
          Principles<br /><span style={{ fontStyle: "italic", fontFamily: "'DM Serif Display', serif", fontSize: "0.7rem" }}>of</span> Logo Design
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 70 }}>
            <ellipse cx="40" cy="42" rx="28" ry="14" fill="#1a3aff" opacity="0.3"/>
            <path d="M20 40 Q30 20 45 22 Q55 24 52 36 Q48 44 36 44 Q24 44 20 40Z" fill="rgba(245,244,240,0.9)"/>
            <circle cx="52" cy="20" r="6" fill="rgba(245,244,240,0.9)"/>
            <path d="M52 20 Q60 14 56 10" stroke="#ff4d1a" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    ),
    "pink-letter": (card) => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", position: "relative" }}>
        {/* Abstract P shape with circular arcs — placeholder brand mark */}
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 70, opacity: 0.9 }}>
          <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <circle cx="40" cy="40" r="24" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <path d="M24 60 Q24 20 40 20 Q56 20 56 34 Q56 48 40 48 L24 48" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>
    ),
    "how": (card) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "100%", height: "100%", padding: "1rem 1rem 0.5rem" }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "3.2rem", lineHeight: 0.9, color: card.accent, letterSpacing: "-0.03em" }}>How</span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "3.2rem", lineHeight: 0.9, color: card.accent, letterSpacing: "-0.03em" }}>to</span>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.45rem", color: "var(--dim)", lineHeight: 1.5, marginTop: "0.5rem" }}>
          use design to sell things, make things look good, and move people.
        </p>
      </div>
    ),
    "yellow-brand": (card) => (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "1rem" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: card.accent, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "0.4rem" }}>
          Designing<br />Brand<br />Identity
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "3px", alignContent: "center" }}>
          {[...Array(24)].map((_, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i % 3 === 0 ? "rgba(245,244,240,0.9)" : "rgba(245,244,240,0.2)" }} />
          ))}
        </div>
      </div>
    ),
  };

  return (
    <section className="showcase-section">
      {/* Scattered cards */}
      {showcaseCards.map((card) => (
        <div
          key={card.id}
          className="showcase-card"
          style={{
            ...card.style,
            width: card.style.width,
            height: card.style.height,
            background: card.bg,
            transform: `rotate(${card.style.rotate})`,
          }}
        >
          <div className="showcase-card-inner">
            {cardVisuals[card.type]?.(card)}
            <span className="card-placeholder-label" style={{ color: card.accent }}>
              {card.sub}
            </span>
          </div>
        </div>
      ))}

      {/* Center copy */}
      <div className="showcase-center">
        <span className="showcase-eyebrow">POWERED BY DIGICRAFT</span>
        <h2 className="showcase-headline">
          One place for brands<br />
          that want to be <em>unforgettable.</em>
        </h2>
        <p className="showcase-sub">
          From positioning to pixels — we craft work that makes people stop scrolling, start talking, and never forget your name.
        </p>
        <button className="showcase-btn">
          View Our Work ↗
        </button>
      </div>
    </section>
  );
};

const UnlockSection = () => {
  const [activeItem, setActiveItem] = useState(0);
  const current = unlockItems[activeItem];

  return (
    <div className="unlock-section">
      <div className="unlock-inner">
        {/* Left: accordion */}
        <div className="unlock-left">
          <p className="unlock-eyebrow">THE DIGICRAFT EFFECT</p>
          <div className="unlock-title-block">
            <h2 className="unlock-title">
              What happens when<br />
              brands <em>partner</em> with us
            </h2>
          </div>
          <div className="unlock-list">
            {unlockItems.map((item, i) => (
              <div
                key={item.id}
                className={`unlock-row${activeItem === i ? " active" : ""}`}
                onClick={() => setActiveItem(i)}
              >
                <div className="unlock-row-header">
                  <span className="unlock-row-num">{item.id}</span>
                  <span className="unlock-row-name">{item.title}</span>
                  <span className="unlock-row-toggle">+</span>
                </div>
                <div className="unlock-row-body">
                  <div className="unlock-row-body-inner">
                    <p className="unlock-row-desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: visual panel */}
        <div className="unlock-right">
          <div className="unlock-visual">
            {/* Animated bar chart */}
            <div className="brand-canvas">
              <div className="brand-orb" key={activeItem} />
              <div className="brand-bars" key={`bars-${activeItem}`}>
                {[55, 75, 45, 90, 65].map((h, i) => (
                  <div
                    key={i}
                    className="brand-bar"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Stat badges */}
            <div
              className="stat-badge top-right"
              key={`stat-a-${activeItem}`}
            >
              <span
                className="stat-num"
                style={{ color: current.color }}
              >
                {current.stat}
              </span>
              <span className="stat-label">{current.statLabel}</span>
            </div>

            <div className="stat-badge bottom-left">
              <span className="stat-num" style={{ color: "#f5f4f0", fontSize: "0.85rem" }}>
                {current.title}
              </span>
              <span className="stat-label">CURRENTLY VIEWING</span>
            </div>

            {/* Grid dots decoration */}
            <div style={{
              position: "absolute",
              top: "1.2rem",
              left: "1.2rem",
              display: "grid",
              gridTemplateColumns: "repeat(4, 6px)",
              gap: "5px",
              opacity: 0.3,
            }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 5 ? "#1a3aff" : "#f5f4f0" }} />
              ))}
            </div>
          </div>

          <div style={{
            marginTop: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              color: "rgba(245,244,240,0.4)",
              letterSpacing: "0.08em",
            }}>
              {activeItem + 1} / {unlockItems.length} OUTCOMES
            </p>
            <button
              onClick={() => {}}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#f5f4f0",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                padding: "0.6rem 1.4rem",
                borderRadius: "100px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1a3aff"; e.currentTarget.style.borderColor = "#1a3aff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              START A PROJECT ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AgencySite() {
  const [activeFilter, setActiveFilter] = useState("All projects");
  const [activeService, setActiveService] = useState("BRAND STRATEGY");

  return (
    <>
      <style>{styles}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-blob" />
        <div className="hero-blob-2" />
        <div className="hero-blob-3" />

        <nav className="hero-nav fade-up">
          <span className="logo">Digicraft</span>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {["Services", "Projects", "About", "Contact"].map(l => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>
          <button style={{ background: "var(--white)", color: "#050510", border: "none", padding: "0.6rem 1.4rem", borderRadius: "100px", fontFamily: "Syne", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", cursor: "pointer" }}>
            Get in touch
          </button>
        </nav>

        <div className="hero-content">
          <h1 className="hero-title fade-up delay-2">
            We create bold ideas<br />
            that <em>position brands</em> &amp; <em>drive growth</em>
          </h1>
        </div>

        {/* Services */}
        <div className="services fade-up delay-3">
          <p className="services-intro">Comprehensive services to transform your brand and business in today's dynamic market.</p>
          <div className="services-list">
            {services.map(s => (
              <div
                key={s.id}
                className={`service-row${activeService === s.name ? " active" : ""}${s.dim ? " dim" : ""}`}
                onClick={() => !s.dim && setActiveService(s.name)}
              >
                <span className="service-num">{s.id}</span>
                <span className="service-name">{s.name}</span>
                <span className="service-plus">{activeService === s.name ? "−" : "+"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNLOCK / PARTNERSHIP SHOWCASE ── */}
      <UnlockSection />

      {/* ── PROJECTS ── */}
      <section className="projects-section">
        <div className="projects-header">
          <h2 className="projects-title">
            Projects
          </h2>
          <div className="filter-tabs">
            {projectFilters.map(f => (
              <button
                key={f}
                className={`filter-tab${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="projects-grid">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="approach-section">
        <div className="approach-blob" />
        <div className="approach-top">
          <div className="approach-title-l">We think<br />out of the box</div>
          <div className="approach-title-r">when it comes to<br />our <em>approach</em></div>
        </div>

        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#3b5bff",
            boxShadow: "0 0 16px #3b5bff",
            margin: "0 auto 1rem",
            position: "relative",
            zIndex: 1,
          }}
        />

        <div className="approach-body">
          <strong>Our strategies are designed to challenge the status quo, drive real impact, and unlock new growth opportunities.</strong> If you're ready to redefine your brand and dominate the market, we're here to make it happen. We refuse to settle for the ordinary, thus we partner with innovators and bold entrepreneurs.
        </div>

        <div className="approach-circle-wrap">
          <div className="approach-circle">
            <div className="dot-accent dot-l" />
            <div className="dot-accent dot-r" />
            <div className="dot-accent dot-t" />
            <div className="circle-inner">
              <span className="circle-icon">📦</span>
              <div className="circle-title">Innovation</div>
              <p className="circle-text">We use creative, unconventional solutions to help brands stand out, backed by analytics that measure impact and refine performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOWCASE CTA ── */}
      <ShowcaseSection />

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <span className="footer-logo">Digicraft</span>
        <span>© 2024 All rights reserved</span>
        <span>Privacy Policy · Terms</span>
      </footer>
    </>
  );
}
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  BrainCircuit,
  Shield,
  Users,
  BarChart3,
  Sparkles,
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Globe,
  ChevronRight,
  Play,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ─── Inject global styles ─────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --ink: #0A0A0F;
    --ink-2: #1C1C2E;
    --paper: #FAFAFD;
    --accent: #5B5EFF;
    --accent-2: #FF5B8A;
    --accent-3: #00D4AA;
    --muted: #6B7280;
    --border: rgba(91,94,255,0.12);
    --glass: rgba(255,255,255,0.04);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: var(--paper); color: var(--ink); font-family: 'DM Sans', sans-serif; }

  .hakeem-landing {
    overflow-x: hidden;
  }

  /* ── HEADER ── */
  .hk-header {
    position: sticky; top: 0; z-index: 100;
    background: rgba(250,250,253,0.82);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  .hk-header-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 32px;
    height: 68px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .hk-logo {
    display: flex; align-items: center; gap: 10px;
    font-weight: 800; font-size: 22px;
    color: var(--ink); text-decoration: none;
  }
  .hk-logo-icon {
    width: 36px; height: 36px;
    background: var(--accent);
    border-radius: 10px;
    display: grid; place-items: center;
    box-shadow: 0 4px 14px rgba(91,94,255,0.35);
  }
  .hk-nav { display: flex; align-items: center; gap: 32px; }
  .hk-nav a {
    font-size: 14px; font-weight: 500; color: var(--muted);
    text-decoration: none; transition: color .2s;
  }
  .hk-nav a:hover { color: var(--ink); }
  .hk-cta-btn {
    background: var(--ink);
    color: #fff;
    border: none; border-radius: 10px;
    padding: 10px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    cursor: pointer;
    transition: background .2s, transform .15s;
    display: flex; align-items: center; gap: 6px;
  }
  .hk-cta-btn:hover { background: var(--accent); transform: translateY(-1px); }

  /* ── HERO ── */
  .hk-hero {
    position: relative;
    max-width: 1200px; margin: 0 auto;
    padding: 96px 32px 80px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
  }
  .hk-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(91,94,255,0.08);
    border: 1px solid rgba(91,94,255,0.2);
    color: var(--accent);
    border-radius: 100px; padding: 6px 14px;
    font-size: 13px; font-weight: 500;
    margin-bottom: 24px;
  }
  .hk-hero h1 {
    font-size: clamp(40px, 5vw, 60px);
    font-weight: 800;
    line-height: 1.08;
    color: var(--ink);
    letter-spacing: -1.5px;
    margin-bottom: 20px;
  }
  .hk-hero h1 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hk-hero p {
    font-size: 17px; line-height: 1.7;
    color: var(--muted);
    max-width: 440px;
    margin-bottom: 36px;
  }
  .hk-hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .hk-btn-primary {
    background: var(--accent);
    color: #fff;
    border: none; border-radius: 12px;
    padding: 14px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 500;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all .2s;
    box-shadow: 0 6px 24px rgba(91,94,255,0.3);
  }
  .hk-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(91,94,255,0.4); }
  .hk-btn-ghost {
    background: transparent;
    color: var(--ink);
    border: 1.5px solid rgba(10,10,15,0.12);
    border-radius: 12px;
    padding: 13px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 500;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all .2s;
  }
  .hk-btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
  .hk-hero-trust {
    display: flex; align-items: center; gap: 8px;
    margin-top: 28px;
  }
  .hk-trust-avatars { display: flex; }
  .hk-trust-avatars span {
    width: 30px; height: 30px; border-radius: 50%;
    border: 2px solid white;
    margin-left: -8px;
    display: grid; place-items: center;
    font-size: 11px; font-weight: 600; color: white;
  }
  .hk-trust-avatars span:first-child { margin-left: 0; }
  .hk-trust-text { font-size: 13px; color: var(--muted); }
  .hk-trust-text strong { color: var(--ink); }

  /* ── HERO VISUAL ── */
  .hk-hero-visual {
    position: relative;
  }
  .hk-dashboard-card {
    background: white;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.10), 0 0 0 1px var(--border);
    position: relative;
  }
  .hk-dash-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
  }
  .hk-dash-title {  font-weight: 700; font-size: 15px; }
  .hk-dash-badge {
    background: rgba(0,212,170,0.1);
    color: var(--accent-3);
    border-radius: 6px; padding: 3px 10px;
    font-size: 12px; font-weight: 600;
  }
  .hk-candidate-row {
    display: flex; align-items: center; gap: 12px;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 8px;
    transition: background .15s;
    cursor: default;
  }
  .hk-candidate-row:hover { background: rgba(91,94,255,0.04); }
  .hk-c-avatar {
    width: 38px; height: 38px; border-radius: 10px;
    display: grid; place-items: center;
    font-weight: 700; font-size: 14px; color: white;
    flex-shrink: 0;
  }
  .hk-c-info { flex: 1; }
  .hk-c-name { font-weight: 600; font-size: 14px; color: var(--ink); }
  .hk-c-role { font-size: 12px; color: var(--muted); }
  .hk-c-score {
    
    font-weight: 700; font-size: 16px;
  }
  .hk-c-bar-wrap {
    height: 4px; background: rgba(0,0,0,0.06); border-radius: 4px; margin-top: 4px;
  }
  .hk-c-bar { height: 4px; border-radius: 4px; }

  .hk-float-card {
    position: absolute;
    background: white;
    border-radius: 14px;
    padding: 14px 18px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .hk-float-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: grid; place-items: center; flex-shrink: 0;
  }
  .hk-float-label { font-size: 11px; color: var(--muted); }
  .hk-float-value {  font-weight: 700; font-size: 17px; color: var(--ink); }

  /* ── STATS STRIP ── */
  .hk-stats-strip {
    background: var(--ink);
    padding: 32px 0;
  }
  .hk-stats-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 32px;
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }
  .hk-stat {
    text-align: center;
    padding: 0 24px;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .hk-stat:last-child { border-right: none; }
  .hk-stat-num {
    
    font-size: 36px; font-weight: 800;
    color: white;
    letter-spacing: -1px;
  }
  .hk-stat-label { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 4px; }

  /* ── SECTION COMMONS ── */
  .hk-section {
    max-width: 1200px; margin: 0 auto; padding: 96px 32px;
  }
  .hk-section-eyebrow {
    font-size: 12px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }
  .hk-section-title {
    font-size: clamp(28px, 3.5vw, 42px);
    font-weight: 800;
    letter-spacing: -1px;
    color: var(--ink);
    margin-bottom: 16px;
  }
  .hk-section-sub {
    font-size: 17px; color: var(--muted); line-height: 1.7;
    max-width: 520px;
  }
  .hk-section-head-center { text-align: center; }
  .hk-section-head-center .hk-section-sub { margin: 0 auto; }

  /* ── FEATURES ── */
  .hk-features-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
    margin-top: 56px;
  }
  .hk-feat-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 32px;
    position: relative; overflow: hidden;
    transition: transform .2s, box-shadow .2s;
  }
  .hk-feat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(91,94,255,0.1); }
  .hk-feat-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    opacity: 0; transition: opacity .2s;
  }
  .hk-feat-card:hover::before { opacity: 1; }
  .hk-feat-icon {
    width: 48px; height: 48px;
    background: rgba(91,94,255,0.08);
    border-radius: 12px;
    display: grid; place-items: center;
    margin-bottom: 20px;
    color: var(--accent);
  }
  .hk-feat-title {
    font-size: 17px; font-weight: 700;
    color: var(--ink); margin-bottom: 10px;
  }
  .hk-feat-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

  /* ── HOW IT WORKS ── */
  .hk-hiw-section { background: #F4F4FF; }
  .hk-hiw-inner {
    max-width: 1200px; margin: 0 auto; padding: 96px 32px;
  }
  .hk-hiw-steps {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0; margin-top: 56px; position: relative;
  }
  .hk-hiw-steps::before {
    content: '';
    position: absolute; top: 28px; left: calc(12.5% + 14px); right: calc(12.5% + 14px);
    height: 2px; background: linear-gradient(90deg, var(--accent), var(--accent-2));
    z-index: 0;
  }
  .hk-step { text-align: center; padding: 0 16px; position: relative; margin-bottom: 20px; z-index: 1; }
  .hk-step-num {
    width: 56px; height: 56px;
    background: var(--accent);
    border-radius: 50%;
    display: grid; place-items: center; margin: 0 auto 20px;
    font-weight: 800; font-size: 18px; color: white;
    border: 4px solid #F4F4FF;
    box-shadow: 0 0 0 2px var(--accent);
  }
  .hk-step-title {
    font-weight: 700; font-size: 15px; color: var(--ink); margin-bottom: 8px;
  }
  .hk-step-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* ── SOCIAL PROOF ── */
  .hk-testimonials {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
    margin-top: 56px;
  }
  .hk-testi {
    background: white;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    transition: box-shadow .2s;
  }
  .hk-testi:hover { box-shadow: 0 12px 36px rgba(91,94,255,0.08); }
  .hk-testi-stars { display: flex; gap: 3px; margin-bottom: 16px; }
  .hk-testi-stars svg { color: #FFB800; }
  .hk-testi-quote { font-size: 15px; line-height: 1.7; color: #374151; margin-bottom: 20px; font-style: italic; }
  .hk-testi-author { display: flex; align-items: center; gap: 10px; }
  .hk-testi-av {
    width: 38px; height: 38px; border-radius: 50%;
    font-weight: 700; font-size: 13px; color: white;
    display: grid; place-items: center; flex-shrink: 0;
  }
  .hk-testi-name { font-weight: 600; font-size: 14px; color: var(--ink); }
  .hk-testi-role { font-size: 12px; color: var(--muted); }

  /* ── LOGOS ── */
  .hk-logos-strip {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 36px 0;
  }
  .hk-logos-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 32px;
    display: flex; align-items: center; justify-content: space-between; gap: 32px;
  }
  .hk-logos-label { font-size: 13px; color: var(--muted); white-space: nowrap; flex-shrink: 0; }
  .hk-logos-items { display: flex; align-items: center; gap: 40px; flex: 1; justify-content: space-around; }
  .hk-logo-item {
    font-weight: 800; font-size: 16px;
    color: #C4C4CF; letter-spacing: -0.5px;
    transition: color .2s; cursor: default;
  }
  .hk-logo-item:hover { color: var(--ink); }

  /* ── PRICING ── */
  .hk-pricing-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
    margin-top: 56px; align-items: start;
  }
  .hk-plan {
    border: 1.5px solid var(--border);
    border-radius: 20px; padding: 32px;
    background: white;
    transition: transform .2s;
    position: relative;
  }
  .hk-plan:hover { transform: translateY(-4px); }
  .hk-plan.featured {
    background: var(--ink);
    border-color: var(--ink);
    transform: scale(1.02);
  }
  .hk-plan.featured:hover { transform: scale(1.02) translateY(-4px); }
  .hk-plan-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--accent); color: white;
    border-radius: 100px; padding: 4px 16px;
    font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    white-space: nowrap;
  }
  .hk-plan-name {
     font-weight: 700; font-size: 14px;
    text-transform: uppercase; letter-spacing: 1.5px;
    color: var(--muted); margin-bottom: 16px;
  }
  .hk-plan.featured .hk-plan-name { color: rgba(255,255,255,0.5); }
  .hk-plan-price {
     font-weight: 800;
    font-size: 48px; letter-spacing: -2px; color: var(--ink);
    margin-bottom: 4px;
  }
  .hk-plan.featured .hk-plan-price { color: white; }
  .hk-plan-period { font-size: 13px; color: var(--muted); margin-bottom: 28px; }
  .hk-plan.featured .hk-plan-period { color: rgba(255,255,255,0.5); }
  .hk-plan-divider { height: 1px; background: var(--border); margin-bottom: 24px; }
  .hk-plan.featured .hk-plan-divider { background: rgba(255,255,255,0.1); }
  .hk-plan-feature {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; color: #374151;
    margin-bottom: 12px;
  }
  .hk-plan.featured .hk-plan-feature { color: rgba(255,255,255,0.85); }
  .hk-plan-btn {
    width: 100%; margin-top: 28px;
    padding: 13px;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    cursor: pointer; border: none;
    transition: all .2s;
  }
  .hk-plan-btn-outline {
    background: transparent;
    border: 1.5px solid var(--border) !important;
    color: var(--ink);
  }
  .hk-plan-btn-outline:hover { border-color: var(--accent) !important; color: var(--accent); }
  .hk-plan-btn-primary { background: var(--accent); color: white; }
  .hk-plan-btn-primary:hover { opacity: 0.9; }
  .hk-plan-btn-dark { background: white; color: var(--ink); }
  .hk-plan-btn-dark:hover { opacity: 0.9; }

  /* ── CTA ── */
  .hk-cta-section {
    background: var(--ink);
    padding: 96px 32px;
    text-align: center;
    position: relative; overflow: hidden;
  }
  .hk-cta-section::before {
    content: '';
    position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
    width: 800px; height: 800px;
    background: radial-gradient(circle, rgba(91,94,255,0.3) 0%, transparent 70%);
    pointer-events: none;
  }
  .hk-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
  .hk-cta-title {
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 800; color: white;
    letter-spacing: -1.5px; margin-bottom: 16px;
  }
  .hk-cta-sub { font-size: 17px; color: rgba(255,255,255,0.6); margin-bottom: 40px; line-height: 1.7; }
  .hk-cta-actions { display: flex; align-items: center; justify-content: center; gap: 14px; }
  .hk-btn-white {
    background: white; color: var(--ink);
    border: none; border-radius: 12px;
    padding: 14px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all .2s;
  }
  .hk-btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,255,0.2); }
  .hk-btn-ghost-light {
    background: rgba(255,255,255,0.08); color: white;
    border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 14px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 500;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all .2s;
  }
  .hk-btn-ghost-light:hover { background: rgba(255,255,255,0.12); }

  /* ── FOOTER ── */
  .hk-footer {
    background: white;
    border-top: 1px solid var(--border);
    padding: 48px 32px 32px;
  }
  .hk-footer-inner {
    max-width: 1200px; margin: 0 auto;
  }
  .hk-footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px;
    margin-bottom: 48px;
  }
  .hk-footer-brand p {
    font-size: 14px; color: var(--muted); line-height: 1.7; margin-top: 12px; max-width: 260px;
  }
  .hk-footer-col h4 {
    font-weight: 700; font-size: 13px;
    letter-spacing: 0.5px; color: var(--ink); margin-bottom: 16px;
  }
  .hk-footer-col a {
    display: block; font-size: 13px; color: var(--muted);
    text-decoration: none; margin-bottom: 10px; transition: color .2s;
  }
  .hk-footer-col a:hover { color: var(--accent); }
  .hk-footer-bottom {
    border-top: 1px solid var(--border);
    padding-top: 24px;
    display: flex; align-items: center; justify-content: space-between;
    font-size: 13px; color: var(--muted);
  }

  @media (max-width: 900px) {
    .hk-hero { grid-template-columns: 1fr; gap: 40px; padding-top: 48px; }
    .hk-features-grid { grid-template-columns: 1fr; }
    .hk-hiw-steps { grid-template-columns: 1fr; }
    .hk-hiw-steps::before { display: none; }
    .hk-stats-inner { grid-template-columns: repeat(2, 1fr); }
    .hk-testimonials { grid-template-columns: 1fr; }
    .hk-pricing-grid { grid-template-columns: 1fr; }
    .hk-footer-top { grid-template-columns: 1fr 1fr; }
    .hk-logos-items { gap: 20px; }
    .hk-logo-item { font-size: 13px; }
  }
    .hk-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  border-bottom: 1px solid #eee;
}

.hk-header-inner {
  max-width: 1200px;
  margin: auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* logo */
.hk-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 20px;
  color: #111;
  text-decoration: none;
}

.hk-logo-icon {
  width: 36px;
  height: 36px;
  background: #4f46e5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* nav desktop */
.hk-nav {
  display: flex;
  gap: 28px;
}

.hk-nav a {
  color: #555;
  text-decoration: none;
  font-weight: 500;
}

/* CTA */
.hk-cta-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #111827;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
}

/* mobile button */
.hk-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

/* mobile menu */
.hk-mobile-menu {
  display: none;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: white;
}

.hk-mobile-menu a {
  color: #444;
  text-decoration: none;
  font-weight: 500;
}

.hk-mobile-menu.open {
  display: flex;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .hk-nav,
  .hk-cta-btn:not(.mobile) {
    display: none;
  }

  .hk-menu-btn {
    display: block;
  }
}

`;

const candidates = [
  {
    name: "Sara Al-Rashidi",
    role: "Senior Frontend Dev",
    score: 94,
    color: "#5B5EFF",
    bg: "#EEF",
  },
  {
    name: "Omar Khalid",
    role: "Full Stack Engineer",
    score: 87,
    color: "#FF5B8A",
    bg: "#FEE",
  },
  {
    name: "Lena Mostafa",
    role: "DevOps Specialist",
    score: 81,
    color: "#00D4AA",
    bg: "#E0FAF4",
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: "AI Match Scoring",
    desc: "Advanced algorithms analyze candidate fit with full explainability and transparent reasoning.",
  },
  {
    icon: Target,
    title: "Semantic CV Analysis",
    desc: "Deep understanding of skills, experience, and qualifications—far beyond keyword matching.",
  },
  {
    icon: Shield,
    title: "Bias Detection",
    desc: "Built-in fairness metrics and bias indicators ensure ethical, inclusive hiring practices.",
  },
  {
    icon: Zap,
    title: "Technical Assessments",
    desc: "Live code challenges with real-time execution and automated quality scoring.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Comprehensive metrics on hiring performance, diversity, and time-to-hire trends.",
  },
  {
    icon: Users,
    title: "Kanban Pipeline",
    desc: "Visual candidate management with drag-and-drop workflow built for your team.",
  },
];

const steps = [
  {
    title: "Post a Job",
    desc: "Create detailed job descriptions with AI-powered requirement matching.",
  },
  {
    title: "AI Analysis",
    desc: "Candidates are automatically scored and ranked by semantic relevance.",
  },
  {
    title: "Evaluate",
    desc: "Review profiles with skill breakdowns, bias indicators, and insights.",
  },
  {
    title: "Hire",
    desc: "Make data-driven decisions with confidence and full transparency.",
  },
];

const testimonials = [
  {
    quote:
      "Hakeem cut our time-to-hire by 40%. The AI scoring is transparent and our team finally trusts the process.",
    name: "Nora Hussain",
    role: "Head of Talent, Fintech Co",
    color: "#5B5EFF",
  },
  {
    quote:
      "The bias detection feature alone changed how we think about inclusion. A genuinely transformative tool.",
    name: "Khaled Ibrahim",
    role: "HR Director, Scale-up",
    color: "#FF5B8A",
  },
  {
    quote:
      "Finally, an ATS that doesn't feel like it's from 2010. Hakeem is exactly what modern recruiting needs.",
    name: "Amira Saleh",
    role: "Recruiting Lead, SaaS",
    color: "#00D4AA",
  },
];

const logos = [
  "Tamara",
  "Noon",
  "STC Pay",
  "Unifonic",
  "Foodics",
  "Workmotion",
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "per month",
    features: [
      "5 active job posts",
      "AI match scoring",
      "Basic analytics",
      "Email support",
    ],
    btnClass: "hk-plan-btn-outline",
    btnLabel: "Start Free Trial",
    featured: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "per month",
    features: [
      "Unlimited job posts",
      "Semantic CV analysis",
      "Bias detection",
      "Technical assessments",
      "Priority support",
    ],
    btnClass: "hk-plan-btn-dark",
    btnLabel: "Start Free Trial",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    features: [
      "Everything in Growth",
      "Dedicated CSM",
      "SSO & compliance",
      "Custom integrations",
      "SLA guarantee",
    ],
    btnClass: "hk-plan-btn-outline",
    btnLabel: "Talk to Sales",
    featured: false,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{STYLES}</style>
      <div className="hakeem-landing">
        {/* HEADER */}
        <header className="hk-header">
          <div className="hk-header-inner">
            {/* Logo */}
            <a className="hk-logo" href="#">
              <div className="hk-logo-icon">
                <BrainCircuit size={20} color="white" />
              </div>
              Hakeem
            </a>

            {/* Desktop Nav */}
            <nav className="hk-nav">
              <a href="#">Features</a>
              <a href="#">How it works</a>
              <a href="#">Pricing</a>
              <a href="#">Blog</a>
            </nav>

            {/* Desktop CTA */}
            <button className="hk-cta-btn" onClick={() => navigate("/auth")}>
              Get Started <ArrowRight size={14} />
            </button>

            {/* Mobile Menu Button */}
            <button className="hk-menu-btn" onClick={() => setOpen(!open)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`hk-mobile-menu ${open ? "open" : ""}`}>
            <a href="#">Features</a>
            <a href="#">How it works</a>
            <a href="#">Pricing</a>
            <a href="#">Blog</a>

            <button
              className="hk-cta-btn mobile"
              onClick={() => navigate("/auth")}
            >
              Get Started <ArrowRight size={14} />
            </button>
          </div>
        </header>

        {/* HERO */}
        <section style={{ background: "white" }}>
          <div className="hk-hero">
            <div className="hk-hero-content">
              <div className="hk-hero-badge">
                <Sparkles size={13} /> AI-Powered Recruitment Platform
              </div>
              <h1>
                Hire the <em>Right People,</em> Faster & Fairer
              </h1>
              <p>
                Transform your recruitment with ethical AI matching, semantic CV
                analysis, and actionable insights—built for modern talent teams.
              </p>
              <div className="hk-hero-actions">
                <button
                  className="hk-btn-primary"
                  onClick={() => navigate("/auth")}
                >
                  Start Free Trial <ArrowRight size={16} />
                </button>
                <button
                  className="hk-btn-ghost"
                  onClick={() => navigate("/analytics")}
                >
                  <Play size={15} /> Watch Demo
                </button>
              </div>
              <div className="hk-hero-trust">
                <div className="hk-trust-avatars">
                  {["#5B5EFF", "#FF5B8A", "#00D4AA", "#F59E0B"].map((c, i) => (
                    <span key={i} style={{ background: c }}>
                      {["N", "K", "A", "O"][i]}
                    </span>
                  ))}
                </div>
                <span className="hk-trust-text">
                  Trusted by <strong>500+</strong> hiring teams worldwide
                </span>
              </div>
            </div>

            <div className="hk-hero-visual">
              <div className="hk-dashboard-card">
                <div className="hk-dash-header">
                  <span className="hk-dash-title">Top Candidates</span>
                  <span className="hk-dash-badge">Live ●</span>
                </div>
                {candidates.map((c, i) => (
                  <div key={i} className="hk-candidate-row">
                    <div
                      className="hk-c-avatar"
                      style={{ background: c.color }}
                    >
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="hk-c-info">
                      <div className="hk-c-name">{c.name}</div>
                      <div className="hk-c-role">{c.role}</div>
                      <div className="hk-c-bar-wrap">
                        <div
                          className="hk-c-bar"
                          style={{ width: `${c.score}%`, background: c.color }}
                        />
                      </div>
                    </div>
                    <div className="hk-c-score" style={{ color: c.color }}>
                      {c.score}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Float cards */}
              <div className="hk-float-card" style={{ bottom: -24, left: -32 }}>
                <div
                  className="hk-float-icon"
                  style={{ background: "rgba(0,212,170,0.1)" }}
                >
                  <TrendingUp size={18} color="var(--accent-3)" />
                </div>
                <div>
                  <div className="hk-float-label">Time to Hire</div>
                  <div className="hk-float-value">↓ 42%</div>
                </div>
              </div>
              <div className="hk-float-card" style={{ top: -20, right: -28 }}>
                <div
                  className="hk-float-icon"
                  style={{ background: "rgba(91,94,255,0.1)" }}
                >
                  <Clock size={18} color="var(--accent)" />
                </div>
                <div>
                  <div className="hk-float-label">Avg. Match Time</div>
                  <div className="hk-float-value">4.2s</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGOS */}
        <div className="hk-logos-strip">
          <div className="hk-logos-inner">
            <span className="hk-logos-label">Trusted by teams at</span>
            <div className="hk-logos-items">
              {logos.map((l, i) => (
                <span key={i} className="hk-logo-item">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="hk-stats-strip">
          <div className="hk-stats-inner">
            {[
              { num: "500+", label: "Companies hiring" },
              { num: "98K+", label: "CVs analyzed" },
              { num: "42%", label: "Faster time-to-hire" },
              { num: "4.9★", label: "Average rating" },
            ].map((s, i) => (
              <div key={i} className="hk-stat">
                <div className="hk-stat-num">{s.num}</div>
                <div className="hk-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section className="hk-section">
          <div className="hk-section-head-center">
            <div className="hk-section-eyebrow">Platform Features</div>
            <h2 className="hk-section-title">
              Everything Modern Recruiting Needs
            </h2>
            <p className="hk-section-sub">
              From AI scoring to bias detection—every tool you need to hire with
              confidence and speed.
            </p>
          </div>
          <div className="hk-features-grid">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="hk-feat-card">
                  <div className="hk-feat-icon">
                    <Icon size={22} />
                  </div>
                  <div className="hk-feat-title">{f.title}</div>
                  <div className="hk-feat-desc">{f.desc}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <div className="hk-hiw-section">
          <div className="hk-hiw-inner">
            <div className="hk-section-head-center">
              <div className="hk-section-eyebrow">Process</div>
              <h2 className="hk-section-title">Hire in Four Simple Steps</h2>
              <p className="hk-section-sub" style={{ margin: "0 auto" }}>
                From job post to offer letter—Hakeem streamlines every step of
                the way.
              </p>
            </div>
            <div className="hk-hiw-steps">
              {steps.map((s, i) => (
                <div key={i} className="hk-step">
                  <div className="hk-step-num">{i + 1}</div>
                  <div className="hk-step-title">{s.title}</div>
                  <div className="hk-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <section className="hk-section">
          <div className="hk-section-head-center">
            <div className="hk-section-eyebrow">Testimonials</div>
            <h2 className="hk-section-title">Loved by Hiring Teams</h2>
          </div>
          <div className="hk-testimonials">
            {testimonials.map((t, i) => (
              <div key={i} className="hk-testi">
                <div className="hk-testi-stars">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="#FFB800" />
                  ))}
                </div>
                <p className="hk-testi-quote">"{t.quote}"</p>
                <div className="hk-testi-author">
                  <div className="hk-testi-av" style={{ background: t.color }}>
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="hk-testi-name">{t.name}</div>
                    <div className="hk-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <div style={{ background: "#F4F4FF" }}>
          <section className="hk-section">
            <div className="hk-section-head-center">
              <div className="hk-section-eyebrow">Pricing</div>
              <h2 className="hk-section-title">Simple, Transparent Pricing</h2>
              <p className="hk-section-sub">
                Start free, scale when you're ready. No surprises.
              </p>
            </div>
            <div className="hk-pricing-grid">
              {plans.map((p, i) => (
                <div
                  key={i}
                  className={`hk-plan ${p.featured ? "featured" : ""}`}
                >
                  {p.badge && <div className="hk-plan-badge">{p.badge}</div>}
                  <div className="hk-plan-name">{p.name}</div>
                  <div className="hk-plan-price">{p.price}</div>
                  <div className="hk-plan-period">{p.period}</div>
                  <div className="hk-plan-divider" />
                  {p.features.map((f, j) => (
                    <div key={j} className="hk-plan-feature">
                      <CheckCircle
                        size={15}
                        color={p.featured ? "#00D4AA" : "var(--accent)"}
                      />
                      {f}
                    </div>
                  ))}
                  <button
                    className={`hk-plan-btn ${p.btnClass}`}
                    onClick={() => navigate("/auth")}
                  >
                    {p.btnLabel}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="hk-cta-section">
          <div className="hk-cta-inner">
            <h2 className="hk-cta-title">Ready to Transform Your Hiring?</h2>
            <p className="hk-cta-sub">
              Join 500+ companies using Hakeem to hire smarter, faster, and
              fairer. Start your 14-day free trial—no credit card required.
            </p>
            <div className="hk-cta-actions">
              <button
                className="hk-btn-white"
                onClick={() => navigate("/auth")}
              >
                Start Free Trial <ArrowRight size={16} />
              </button>
              <button
                className="hk-btn-ghost-light"
                onClick={() => navigate("/analytics")}
              >
                <Globe size={15} /> View Demo
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="hk-footer">
          <div className="hk-footer-inner">
            <div className="hk-footer-top">
              <div className="hk-footer-brand">
                <div
                  className="hk-logo"
                  style={{ textDecoration: "none", display: "flex" }}
                >
                  <div className="hk-logo-icon">
                    <BrainCircuit size={18} color="white" />
                  </div>
                  <span style={{ marginLeft: 10 }}>Hakeem</span>
                </div>
                <p>
                  AI-powered recruitment platform helping teams hire smarter,
                  faster, and more fairly.
                </p>
              </div>
              <div className="hk-footer-col">
                <h4>Product</h4>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">Changelog</a>
                <a href="#">Roadmap</a>
              </div>
              <div className="hk-footer-col">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
              </div>
              <div className="hk-footer-col">
                <h4>Legal</h4>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Security</a>
                <a href="#">Cookies</a>
              </div>
            </div>
            <div className="hk-footer-bottom">
              <span>© 2026 Hakeem. All rights reserved.</span>
              <span>Made with ♥ for modern recruiters</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

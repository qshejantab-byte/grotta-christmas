const NAV_HTML = `
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<style>
.ms { font-family: "Material Symbols Outlined"; font-size: 1.2rem; font-style: normal;
  font-weight: normal; line-height: 1; letter-spacing: normal; text-transform: none;
  white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased;
  font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24;
  color: inherit; display: inline-block; vertical-align: middle; }
</style>
<style>
/* ══ NAVBAR ══ */
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 4vw;
  background: rgba(6,5,4,.92);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid rgba(201,165,82,.1);
  z-index: 999;
  transition: background .4s ease, border-color .4s ease;
}
.navbar.scrolled {
  background: rgba(4,3,2,.97);
  border-bottom-color: rgba(201,165,82,.14);
}

/* Grotta Logo */
.grotta-wordmark {
  font-family: 'Cinzel', 'Palatino Linotype', Georgia, serif;
  font-size: clamp(1rem, 1.8vw, 1.45rem);
  font-weight: 600; letter-spacing: .46em;
  text-transform: uppercase; text-decoration: none;
  padding-right: .46em; display: inline-block; line-height: 1;
  background: linear-gradient(to bottom,#c9a552 0%,#f0d878 40%,#c9a552 60%,#9a7828 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
  transition: opacity .35s ease; flex-shrink: 0;
}
.grotta-wordmark:hover { opacity: .75; }

/* Nav links */
.nav-links {
  display: flex; align-items: center;
  gap: clamp(.5rem, 1.5vw, 1.8rem);
}
.nav-links a {
  font-family: 'Jost', sans-serif;
  font-size: clamp(.42rem, .75vw, .56rem);
  font-weight: 400; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(200,192,174,.52); text-decoration: none;
  position: relative; padding-bottom: 3px; white-space: nowrap;
  transition: color .3s ease;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 0; height: 1px; background: #c9a552;
  transition: width .35s cubic-bezier(.25,.46,.45,.94);
}
.nav-links a:hover { color: rgba(200,192,174,.88); }
.nav-links a:hover::after { width: 100%; }
.nav-links a.active { color: #c9a552; }
.nav-links a.active::after { width: 100%; }

/* Hamburger */
.hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: .4rem; z-index: 1001;
}
.hamburger span {
  display: block; width: 24px; height: 1px;
  background: rgba(201,165,82,.7);
  transition: all .35s cubic-bezier(.25,.46,.45,.94);
}
.hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* Mobile nav — Cinematic Luxury Overlay */
.mobile-nav {
  position: fixed; inset: 0; z-index: 998;
  display: flex; flex-direction: column;
  opacity: 0; pointer-events: none;
  transition: opacity .65s cubic-bezier(.25,.46,.45,.94);
  overflow: hidden;
}
.mobile-nav.open { opacity: 1; pointer-events: all; }

/* ── Layered cinematic background ── */
.mobile-nav-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 120% 80% at 15% 60%, rgba(201,110,20,.06) 0%, transparent 55%),
    radial-gradient(ellipse 80% 60% at 85% 20%, rgba(201,165,82,.04) 0%, transparent 50%),
    linear-gradient(160deg, rgba(8,6,4,1) 0%, rgba(12,9,6,.98) 45%, rgba(6,5,3,1) 100%);
  transition: opacity .65s ease;
}
/* Grain texture */
.mobile-nav-grain {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E");
  opacity: .6;
}
/* Ambient glow — bottom left warm */
.mobile-nav-glow {
  position: absolute; z-index: 1; pointer-events: none;
  bottom: -10%; left: -10%;
  width: 70vw; height: 60vh;
  background: radial-gradient(ellipse, rgba(201,120,30,.07) 0%, transparent 65%);
  animation: mn-glow 8s ease-in-out infinite alternate;
}
@keyframes mn-glow {
  from { opacity: .4; transform: scale(1); }
  to   { opacity: .9; transform: scale(1.15); }
}
/* Vignette edges */
.mobile-nav-vignette {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    linear-gradient(to right, rgba(4,3,2,.5) 0%, transparent 25%, transparent 75%, rgba(4,3,2,.5) 100%),
    linear-gradient(to bottom, rgba(4,3,2,.4) 0%, transparent 20%, transparent 80%, rgba(4,3,2,.4) 100%);
}

/* ── Header bar inside nav ── */
.mobile-nav-header {
  position: relative; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 6vw;
  height: 68px; flex-shrink: 0;
  border-bottom: 1px solid rgba(201,165,82,.07);
}
.mobile-nav-logo {
  font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 600;
  letter-spacing: .42em; padding-right: .42em; text-decoration: none;
  background: linear-gradient(to bottom, #c9a552 0%, #f0d878 40%, #c9a552 60%, #9a7828 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  -webkit-font-smoothing: antialiased;
}
.mobile-nav-close {
  background: none; border: none; cursor: pointer;
  width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  color: rgba(201,165,82,.55); font-size: 1.2rem; transition: color .3s ease;
}
.mobile-nav-close:hover { color: rgba(201,165,82,.9); }
.mobile-nav-close svg { width: 18px; height: 18px; }

/* ── Content area ── */
.mobile-nav-content {
  position: relative; z-index: 10;
  flex: 1; display: flex; flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 6vw 1.5rem clamp(3rem, 10vw, 6rem);
  min-height: 0;
  overflow-y: auto;
}

/* ── Gold accent line ── */
.mobile-nav-line {
  position: absolute; left: clamp(1.2rem, 5vw, 3rem);
  top: 8%; bottom: 8%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(201,165,82,.2) 20%, rgba(201,165,82,.2) 80%, transparent);
  z-index: 2;
  transform: scaleY(0); transform-origin: top;
  transition: transform .8s cubic-bezier(.25,.46,.45,.94) .3s;
}
.mobile-nav.open .mobile-nav-line { transform: scaleY(1); }

/* ── Primary links ── */
.mn-primary {
  display: flex; flex-direction: column; gap: .1rem;
  margin-bottom: 1.6rem;
}
.mn-primary a {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.2rem, 8vw, 3.5rem);
  font-weight: 300; letter-spacing: -.02em;
  color: rgba(240,232,213,.85); text-decoration: none; line-height: 1.08;
  display: block; position: relative;
  opacity: 0;
  transform: translateY(16px);
  transition: color .35s ease, opacity .7s ease, transform .7s cubic-bezier(.25,.46,.45,.94);
}
.mn-primary a::after {
  content: ''; position: absolute; bottom: 2px; left: 0;
  width: 0; height: 1px;
  background: linear-gradient(to right, #c9a552, rgba(201,165,82,.3));
  transition: width .45s cubic-bezier(.25,.46,.45,.94);
}
.mn-primary a:hover { color: #fff; }
.mn-primary a:hover::after { width: 40%; }

/* Active state on open */
.mobile-nav.open .mn-primary a:nth-child(1) { opacity: 1; transform: translateY(0); transition-delay: .18s; }
.mobile-nav.open .mn-primary a:nth-child(2) { opacity: 1; transform: translateY(0); transition-delay: .28s; }
.mobile-nav.open .mn-primary a:nth-child(3) { opacity: 1; transform: translateY(0); transition-delay: .38s; }

/* ── Divider ── */
.mn-divider {
  width: 0; height: 1px;
  background: linear-gradient(to right, rgba(201,165,82,.25), transparent);
  margin-bottom: 1.4rem;
  transition: width .6s cubic-bezier(.25,.46,.45,.94) .42s;
}
.mobile-nav.open .mn-divider { width: clamp(80px, 30vw, 160px); }

/* ── Secondary links ── */
.mn-secondary {
  display: flex; flex-direction: column; gap: 0;
}
.mn-secondary a {
  font-family: 'Jost', sans-serif;
  font-size: clamp(.75rem, 3.2vw, .95rem);
  font-weight: 300; letter-spacing: .18em; text-transform: uppercase;
  color: rgba(200,192,174,.45); text-decoration: none;
  padding: .5rem 0; display: block;
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  transition: color .3s ease, opacity .6s ease, transform .6s cubic-bezier(.25,.46,.45,.94);
}
.mn-secondary a::before {
  content: ''; position: absolute; left: -1.2rem; top: 50%;
  transform: translateY(-50%);
  width: 4px; height: 4px; border-radius: 50%;
  background: #c9a552; opacity: 0;
  transition: opacity .3s ease;
}
.mn-secondary a:hover { color: rgba(240,232,213,.8); }
.mn-secondary a:hover::before { opacity: 1; }

/* Active state on open */
.mobile-nav.open .mn-secondary a:nth-child(1) { opacity: 1; transform: translateY(0); transition-delay: .44s; }
.mobile-nav.open .mn-secondary a:nth-child(2) { opacity: 1; transform: translateY(0); transition-delay: .50s; }
.mobile-nav.open .mn-secondary a:nth-child(3) { opacity: 1; transform: translateY(0); transition-delay: .56s; }
.mobile-nav.open .mn-secondary a:nth-child(4) { opacity: 1; transform: translateY(0); transition-delay: .62s; }
.mobile-nav.open .mn-secondary a:nth-child(5) { opacity: 1; transform: translateY(0); transition-delay: .68s; }
.mobile-nav.open .mn-secondary a:nth-child(6) { opacity: 1; transform: translateY(0); transition-delay: .74s; }
.mobile-nav.open .mn-secondary a:nth-child(7) { opacity: 1; transform: translateY(0); transition-delay: .80s; }

/* Reset on close */
.mobile-nav:not(.open) .mn-primary a,
.mobile-nav:not(.open) .mn-secondary a {
  opacity: 0 !important;
  transform: translateY(14px) !important;
  transition-delay: 0s !important;
}

@supports(height: 100svh) { .mobile-nav { min-height: 100svh; } }

/* ── Mobile nav footer ── */
.mobile-nav-footer {
  position: relative; z-index: 10;
  padding: 1.2rem 6vw 2.5rem clamp(3rem, 10vw, 6rem);
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid rgba(201,165,82,.06);
  flex-shrink: 0;
}
.mn-location {
  font-family: 'Jost', sans-serif; font-size: .44rem;
  letter-spacing: .28em; text-transform: uppercase;
  color: rgba(201,165,82,.3);
  opacity: 0; transition: opacity .6s ease .8s;
}
.mobile-nav.open .mn-location { opacity: 1; }
.mn-book-link {
  font-family: 'Jost', sans-serif; font-size: .44rem;
  letter-spacing: .22em; text-transform: uppercase;
  color: rgba(201,165,82,.45); text-decoration: none;
  border: 1px solid rgba(201,165,82,.2); padding: .55rem 1.1rem;
  opacity: 0; transition: opacity .6s ease .9s, color .3s ease, border-color .3s ease;
}
.mobile-nav.open .mn-book-link { opacity: 1; }
.mn-book-link:hover { color: #c9a552; border-color: rgba(201,165,82,.45); }

/* Footer wordmark */
.grotta-wordmark-footer {
  font-family: 'Cinzel', 'Palatino Linotype', Georgia, serif;
  font-size: 1.1rem; font-weight: 600; letter-spacing: .42em;
  text-transform: uppercase; padding-right: .42em; display: inline-block;
  background: linear-gradient(to bottom,#c9a552 0%,#f0d878 40%,#c9a552 60%,#9a7828 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
}

/* Footer */
.footer { background: #050403; border-top: 1px solid rgba(201,165,82,.1); padding: 5rem 0 3rem; }
.footer .container { max-width: 1280px; margin: 0 auto; padding: 0 4vw; }
.footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 4rem; }
.footer-brand p { font-family: 'Jost',sans-serif; font-size: .78rem; font-weight: 300; color: rgba(200,192,174,.35); line-height: 1.9; max-width: 280px; margin-top: 1rem; }
.footer-col h5 { font-family: 'Jost',sans-serif; font-size: .48rem; font-weight: 500; letter-spacing: .3em; text-transform: uppercase; color: rgba(201,165,82,.45); margin-bottom: 1.4rem; }
.footer-col a { display: block; font-family: 'Jost',sans-serif; font-size: .78rem; font-weight: 300; color: rgba(200,192,174,.38); text-decoration: none; margin-bottom: .75rem; transition: color .3s ease; }
.footer-col a:hover { color: rgba(201,165,82,.75); }
.footer-bottom { border-top: 1px solid rgba(201,165,82,.07); padding-top: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.footer-legal { display: flex; gap: 2rem; }
.footer-legal a { font-family: 'Jost',sans-serif; font-size: .58rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(200,192,174,.22); text-decoration: none; transition: color .3s ease; }
.footer-legal a:hover { color: rgba(201,165,82,.5); }
.footer-bottom p { font-family: 'Jost',sans-serif; font-size: .6rem; color: rgba(200,192,174,.2); letter-spacing: .08em; }

/* Responsive navbar */
@media(max-width:1100px){ .nav-links { gap: clamp(.35rem, 1vw, .9rem); } }
@media(max-width:900px){ .nav-links { display: none; } .hamburger { display: flex; } .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } }
@media(max-width:600px){
  .navbar { padding: 0 5vw; }
  .footer-grid { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
  .grotta-wordmark { font-size: 1.1rem; letter-spacing: .32em; }
}
@media(max-width:380px){
  .grotta-wordmark { font-size: 1rem; letter-spacing: .26em; }
  .navbar { padding: 0 4vw; height: 60px; }
  .footer-col a { font-size: .72rem; }
}
@supports(height: 100svh){
  .mobile-nav { min-height: 100svh; }
}
</style>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const nav  = document.querySelector('.navbar');
  const ham  = document.querySelector('.hamburger');
  const mob  = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mob-close');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  function openMob() {
    ham?.classList.add('open');
    mob?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMob() {
    ham?.classList.remove('open');
    mob?.classList.remove('open');
    document.body.style.overflow = '';
  }

  ham?.addEventListener('click', () => {
    mob?.classList.contains('open') ? closeMob() : openMob();
  });
  closeBtn?.addEventListener('click', closeMob);

  // Close on any link click inside mobile nav
  mob?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));

  // Active page link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
</script>
<nav class="navbar">
  <a href="index.html" class="grotta-wordmark">GROTTA RESORT</a>
  <div class="nav-links">
    <a href="index.html">Home</a>
    <a href="stay.html">Stay</a>
    <a href="experiences.html">Experiences</a>
    <a href="caves.html">Caves</a>
    <a href="dining.html">Spaces</a>
    <a href="events.html">Events & Retreats</a>
    <a href="packages.html">Packages</a>
    <a href="weddings.html">Weddings</a>
    <a href="membership.html">Membership</a>
    <a href="faq.html">FAQ</a>
  </div>
  <button class="hamburger" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-nav" id="mobile-nav">
  <!-- Layered atmosphere -->
  <div class="mobile-nav-bg"></div>
  <div class="mobile-nav-grain"></div>
  <div class="mobile-nav-glow"></div>
  <div class="mobile-nav-vignette"></div>

  <!-- Header bar -->
  <div class="mobile-nav-header">
    <a href="index.html" class="mobile-nav-logo">GROTTA RESORT</a>
    <button class="mobile-nav-close" id="mob-close" aria-label="Close menu">
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.2">
        <line x1="2" y1="2" x2="16" y2="16"/>
        <line x1="16" y1="2" x2="2" y2="16"/>
      </svg>
    </button>
  </div>

  <!-- Nav content -->
  <div class="mobile-nav-content">
    <!-- Gold accent line -->
    <div class="mobile-nav-line"></div>

    <!-- Primary links -->
    <nav class="mn-primary">
      <a href="index.html">Home</a>
      <a href="stay.html">Stay</a>
      <a href="experiences.html">Experiences</a>
    </nav>

    <!-- Divider -->
    <div class="mn-divider"></div>

    <!-- Secondary links -->
    <nav class="mn-secondary">
      <a href="caves.html">Caves</a>
      <a href="dining.html">Spaces</a>
      <a href="events.html">Events & Retreats</a>
      <a href="packages.html">Packages</a>
      <a href="weddings.html">Weddings</a>
      <a href="membership.html">Membership</a>
      <a href="faq.html">FAQ</a>
    </nav>
  </div>

  <!-- Footer detail -->
  <div class="mobile-nav-footer">
    <span class="mn-location">Musanze · Rwanda · Volcanic Highlands</span>
    <a href="https://live.ipms247.com/booking/book-rooms-grottamusanze" target="_blank" class="mn-book-link">Reserve →</a>
  </div>
</div>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="grotta-wordmark-footer">GROTTA RESORT</span>
        <p>A luxury highland resort in Musanze, Rwanda — combining volcanic caves, premium accommodation, fine dining, wellness, and unforgettable experiences.</p>
      </div>
      <div class="footer-col">
        <h5>Explore</h5>
        <a href="stay.html">Stay</a>
        <a href="experiences.html">Experiences</a>
        <a href="caves.html">Caves</a>
        <a href="dining.html">Spaces</a>
      </div>
      <div class="footer-col">
        <h5>Activities</h5>
        <a href="events.html">Events & Retreats</a>
        <a href="packages.html">Packages</a>
        <a href="weddings.html">Weddings</a>
        <a href="membership.html">Membership</a>
      </div>
      <div class="footer-col">
        <h5>Info</h5>
        <a href="booking.html">Book a Stay</a>
        <a href="membership.html">Membership</a>
        <a href="weddings.html">Weddings</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
      <p>© ${new Date().getFullYear()} Grotta Resort. All Rights Reserved.</p>
    </div>
  </div>
</footer>`;

/* ══════════════════════════════════════════════════════
   GROTTA CONCIERGE — Luxury WhatsApp Inquiry System
   Site-wide, injected via components.js
   ══════════════════════════════════════════════════════ */

/* Single config point for the WhatsApp number */
const GROTTA_WHATSAPP_NUMBER = '250796149891'; // PLACEHOLDER — replace with real number, country code, no + or spaces

const CONCIERGE_HTML = `
<style>
/* ── Launcher ── */
.gc-launcher {
  position: fixed;
  bottom: 2rem; right: 2rem;
  z-index: 700;
  display: flex; align-items: center; gap: .7rem;
  padding: .9rem 1.5rem .9rem 1rem;
  background: rgba(14,12,9,.7);
  backdrop-filter: blur(18px) saturate(1.3);
  -webkit-backdrop-filter: blur(18px) saturate(1.3);
  border: 1px solid rgba(201,165,82,.28);
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 12px 40px rgba(0,0,0,.45), 0 0 0 1px rgba(201,165,82,.05) inset;
  opacity: 0; transform: translateY(16px) scale(.96);
  transition: opacity .6s cubic-bezier(.25,.46,.45,.94), transform .6s cubic-bezier(.25,.46,.45,.94),
              border-color .35s ease, box-shadow .35s ease, background .35s ease;
}
.gc-launcher.visible { opacity: 1; transform: translateY(0) scale(1); }
.gc-launcher:hover {
  border-color: rgba(201,165,82,.55);
  background: rgba(18,15,11,.8);
  box-shadow: 0 16px 50px rgba(0,0,0,.55), 0 0 28px rgba(201,165,82,.12);
}
.gc-launcher:active { transform: scale(.97); }

.gc-launcher-icon-wrap {
  position: relative;
  width: 38px; height: 38px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, rgba(201,165,82,.35), rgba(201,165,82,.08));
  border: 1px solid rgba(201,165,82,.4);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.gc-launcher-icon-wrap .ms {
  font-size: 1.05rem; color: #f0d878;
  font-variation-settings: "FILL" 1, "wght" 300, "GRAD" 0, "opsz" 24;
}
.gc-pulse-ring {
  position: absolute; inset: -4px;
  border-radius: 50%;
  border: 1px solid rgba(201,165,82,.5);
  animation: gc-pulse 2.6s cubic-bezier(.25,.46,.45,.94) infinite;
  pointer-events: none;
}
@keyframes gc-pulse {
  0%   { transform: scale(.92); opacity: .8; }
  70%  { transform: scale(1.35); opacity: 0; }
  100% { transform: scale(1.35); opacity: 0; }
}

.gc-launcher-text { display: flex; flex-direction: column; gap: 1px; line-height: 1.15; }
.gc-launcher-label {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: .98rem; font-weight: 400; font-style: italic;
  color: #f0e8d5; white-space: nowrap;
}
.gc-launcher-sub {
  font-family: 'Jost', sans-serif;
  font-size: .5rem; font-weight: 400; letter-spacing: .18em; text-transform: uppercase;
  color: rgba(201,165,82,.6); white-space: nowrap;
}

/* Mobile launcher: compact, icon-forward */
@media(max-width:700px){
  .gc-launcher {
    bottom: 1.1rem; right: 1.1rem;
    padding: .65rem .9rem .65rem .65rem;
    gap: .55rem;
  }
  .gc-launcher-icon-wrap { width: 34px; height: 34px; }
  .gc-launcher-icon-wrap .ms { font-size: .95rem; }
  .gc-launcher-label { font-size: .82rem; }
  .gc-launcher-sub { display: none; }
}
@media(max-width:380px){
  .gc-launcher-text { display: none; }
  .gc-launcher { padding: .7rem; border-radius: 50%; }
}

/* ── Backdrop ── */
.gc-backdrop {
  position: fixed; inset: 0; z-index: 850;
  background: rgba(5,4,3,.86);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0; pointer-events: none;
  transition: opacity .5s ease;
  display: flex; align-items: center; justify-content: flex-end;
}
.gc-backdrop.open { opacity: 1; pointer-events: all; }

/* ── Panel ── */
.gc-panel {
  position: relative;
  width: 100%; max-width: 480px;
  height: 100%;
  padding-top: 68px;
  background: linear-gradient(165deg, rgba(14,12,9,.98) 0%, rgba(9,8,6,.99) 100%);
  border-left: 1px solid rgba(201,165,82,.16);
  box-shadow: -40px 0 100px rgba(0,0,0,.5);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(201,165,82,.2) transparent;
  transform: translateX(100%);
  transition: transform .55s cubic-bezier(.25,.46,.45,.94);
}
.gc-panel::-webkit-scrollbar { width: 3px; }
.gc-panel::-webkit-scrollbar-track { background: transparent; }
.gc-panel::-webkit-scrollbar-thumb { background: rgba(201,165,82,.22); border-radius: 2px; }
.gc-backdrop.open .gc-panel { transform: translateX(0); }

.gc-panel::before {
  content: ''; position: fixed; inset: 0; z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events: none; opacity: .5;
}

/* ── Header ── */
.gc-header {
  position: relative;
  padding: 2.4rem 2.4rem 1.6rem;
  border-bottom: 1px solid rgba(201,165,82,.1);
}
.gc-close {
  position: fixed; top: 5rem; right: 1rem;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(201,165,82,.06);
  border: 1px solid rgba(201,165,82,.18);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: rgba(200,192,174,.6);
  transition: color .3s ease, border-color .3s ease, background .3s ease, transform .3s ease;
}
.gc-close:hover { color: #c9a552; border-color: rgba(201,165,82,.4); background: rgba(201,165,82,.1); transform: rotate(90deg); }
.gc-close .ms { font-size: 1.1rem; }

.gc-status {
  display: inline-flex; align-items: center; gap: .5rem;
  margin-bottom: 1.3rem;
  font-family: 'Jost', sans-serif; font-size: .56rem; font-weight: 500;
  letter-spacing: .2em; text-transform: uppercase;
  color: rgba(140,200,150,.85);
}
.gc-status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #7fc98c;
  box-shadow: 0 0 0 0 rgba(127,201,140,.6);
  animation: gc-dot-pulse 2.2s ease-in-out infinite;
}
@keyframes gc-dot-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(127,201,140,.5); }
  70%  { box-shadow: 0 0 0 6px rgba(127,201,140,0); }
  100% { box-shadow: 0 0 0 0 rgba(127,201,140,0); }
}
.gc-response-time {
  font-family: 'Jost', sans-serif; font-size: .68rem; font-weight: 300;
  color: rgba(200,192,174,.4); margin-bottom: 1.4rem;
}

.gc-eyebrow {
  font-family: 'Jost', sans-serif; font-size: .55rem; font-weight: 500;
  letter-spacing: .36em; text-transform: uppercase;
  color: rgba(201,165,82,.5); display: block; margin-bottom: .7rem;
}
.gc-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.7rem, 4vw, 2.3rem); font-weight: 300;
  color: #f0e8d5; line-height: 1.1; letter-spacing: -.02em;
  margin-bottom: .7rem;
}
.gc-subtitle {
  font-family: 'Jost', sans-serif; font-size: .8rem; font-weight: 300;
  color: rgba(200,192,174,.48); line-height: 1.8; max-width: 380px;
}

/* ── Suggested journeys ── */
.gc-journeys {
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid rgba(201,165,82,.08);
}
.gc-journeys-label {
  font-family: 'Jost', sans-serif; font-size: .52rem; font-weight: 500;
  letter-spacing: .26em; text-transform: uppercase;
  color: rgba(201,165,82,.4); margin-bottom: .9rem; display: block;
}
.gc-journeys-row { display: flex; gap: .6rem; overflow-x: auto; padding-bottom: .3rem; scrollbar-width: none; }
.gc-journeys-row::-webkit-scrollbar { display: none; }
.gc-journey-chip {
  flex-shrink: 0;
  font-family: 'Jost', sans-serif; font-size: .66rem; font-weight: 400;
  color: rgba(232,224,208,.7);
  background: rgba(201,165,82,.05);
  border: 1px solid rgba(201,165,82,.16);
  padding: .55rem 1.05rem;
  border-radius: 100px;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color .25s ease, color .25s ease, background .25s ease;
}
.gc-journey-chip:hover, .gc-journey-chip.active {
  border-color: rgba(201,165,82,.55); color: #f0d878; background: rgba(201,165,82,.1);
}

/* ── Form ── */
.gc-form { padding: 1.8rem 2.4rem 2.4rem; }
.gc-section-label {
  font-family: 'Jost', sans-serif; font-size: .54rem; font-weight: 500;
  letter-spacing: .28em; text-transform: uppercase;
  color: rgba(201,165,82,.55); margin: 1.8rem 0 1rem;
  display: flex; align-items: center; gap: .6rem;
}
.gc-section-label:first-child { margin-top: 0; }
.gc-section-label::after { content: ''; flex: 1; height: 1px; background: rgba(201,165,82,.12); }

.gc-field { margin-bottom: 1.3rem; position: relative; }
.gc-label {
  font-family: 'Jost', sans-serif; font-size: .58rem; font-weight: 400;
  letter-spacing: .16em; text-transform: uppercase;
  color: rgba(200,192,174,.45); display: block; margin-bottom: .55rem;
}
.gc-input, .gc-select, .gc-textarea {
  width: 100%; background: rgba(201,165,82,.03);
  border: 1px solid rgba(200,192,174,.12);
  color: #e8e0d0; font-family: 'Jost', sans-serif;
  font-size: .85rem; font-weight: 300;
  padding: .75rem .9rem; outline: none; caret-color: #c9a552;
  transition: border-color .3s ease, background .3s ease;
  -webkit-appearance: none; appearance: none;
}
.gc-input::placeholder, .gc-textarea::placeholder { color: rgba(200,192,174,.22); }
.gc-input:focus, .gc-select:focus, .gc-textarea:focus { border-color: rgba(201,165,82,.5); background: rgba(201,165,82,.05); }
.gc-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath fill='%23c9a552' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right .9rem center; background-size: 10px;
  padding-right: 2.2rem;
}
.gc-select option { background: #0e0c09; }
.gc-textarea { min-height: 90px; resize: vertical; }
.gc-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; }

/* Experience pills */
.gc-exp-group { margin-bottom: 1.2rem; }
.gc-exp-group-title {
  font-family: 'Jost', sans-serif; font-size: .56rem; font-weight: 500;
  letter-spacing: .2em; text-transform: uppercase;
  color: rgba(201,165,82,.4); margin-bottom: .7rem; display: block;
}
.gc-pills { display: flex; flex-wrap: wrap; gap: .45rem; }
.gc-pill-input { display: none; }
.gc-pill-label {
  font-family: 'Jost', sans-serif; font-size: .68rem; font-weight: 400;
  color: rgba(200,192,174,.5);
  border: 1px solid rgba(201,165,82,.14);
  padding: .42rem .85rem;
  cursor: pointer;
  transition: border-color .25s ease, color .25s ease, background .25s ease;
}
.gc-pill-input:checked + .gc-pill-label {
  border-color: #c9a552; color: #f0d878; background: rgba(201,165,82,.08);
}
.gc-pill-label:hover { border-color: rgba(201,165,82,.4); color: rgba(232,224,208,.85); }

/* Smart suggestion banner */
.gc-suggestion {
  display: none;
  margin-top: 1rem;
  padding: .9rem 1.1rem;
  background: rgba(201,165,82,.06);
  border: 1px solid rgba(201,165,82,.2);
  font-family: 'Jost', sans-serif; font-size: .72rem; font-weight: 300;
  color: rgba(232,224,208,.7); line-height: 1.7;
}
.gc-suggestion.show { display: block; animation: gc-fade-in .4s ease; }
.gc-suggestion strong { color: #c9a552; font-weight: 500; }
@keyframes gc-fade-in { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

.gc-submit {
  width: 100%; margin-top: 1.8rem;
  display: flex; align-items: center; justify-content: center; gap: .7rem;
  font-family: 'Jost', sans-serif; font-size: .62rem; font-weight: 600;
  letter-spacing: .22em; text-transform: uppercase;
  color: #080805; background: linear-gradient(135deg, #e2c97e, #c9a552);
  border: none; cursor: pointer; padding: 1.15rem;
  position: relative; overflow: hidden;
  transition: transform .25s ease, box-shadow .3s ease;
}
.gc-submit:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(201,165,82,.32); }
.gc-submit:active { transform: translateY(0); }
.gc-submit .ms { font-size: 1rem; }

.gc-disclaimer {
  text-align: center; margin-top: 1rem;
  font-family: 'Jost', sans-serif; font-size: .64rem; font-weight: 300;
  color: rgba(200,192,174,.32); line-height: 1.7;
}

/* ── Success state ── */
.gc-success {
  display: none; text-align: center;
  padding: 4rem 2.4rem;
}
.gc-success.show { display: block; animation: gc-fade-in .5s ease; }
.gc-success-icon {
  width: 64px; height: 64px; margin: 0 auto 2rem;
  border-radius: 50%;
  border: 1px solid rgba(201,165,82,.35);
  background: rgba(201,165,82,.07);
  display: flex; align-items: center; justify-content: center;
  animation: gc-pop .6s cubic-bezier(.34,1.56,.64,1) .1s both;
}
@keyframes gc-pop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
.gc-success-icon .ms { font-size: 1.6rem; color: #c9a552; }
.gc-success h3 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem; font-weight: 300; color: #f0e8d5; margin-bottom: 1rem;
}
.gc-success p {
  font-family: 'Jost', sans-serif; font-size: .85rem; font-weight: 300;
  color: rgba(200,192,174,.55); line-height: 2; max-width: 320px; margin: 0 auto;
}

@media(max-width:600px){
  .gc-panel { max-width: 100%; }
  .gc-header { padding: 2rem 1.5rem 1.4rem; }
  .gc-journeys { padding: 1.3rem 1.5rem; }
  .gc-form { padding: 1.5rem 1.5rem 2rem; }
  .gc-row-2 { grid-template-columns: 1fr; }
  .gc-success { padding: 3.5rem 1.5rem; }
}
</style>

<button class="gc-launcher" id="gc-launcher">
  <span class="gc-launcher-icon-wrap">
    <span class="ms">forum</span>
    <span class="gc-pulse-ring"></span>
  </span>
  <span class="gc-launcher-text">
    <span class="gc-launcher-label">Talk to Our Concierge</span>
    <span class="gc-launcher-sub">Plan Your Stay</span>
  </span>
</button>

<div class="gc-backdrop" id="gc-backdrop">
  <div class="gc-panel" id="gc-panel">

    <div id="gc-form-view">
      <div class="gc-header">
        <button class="gc-close" id="gc-close" aria-label="Close concierge"><span class="ms">close</span></button>
        <div class="gc-status"><span class="gc-status-dot"></span>Concierge Team Online</div>
        <div class="gc-response-time">Average response time: under 15 minutes</div>
        <span class="gc-eyebrow">Create Your Grotta Journey</span>
        <h2 class="gc-title">Plan Your Grotta Experience</h2>
        <p class="gc-subtitle">Tell us about your journey and our concierge team will create a personalized proposal.</p>
      </div>

      <div class="gc-journeys">
        <span class="gc-journeys-label">Suggested Journeys</span>
        <div class="gc-journeys-row">
          <button type="button" class="gc-journey-chip" data-journey="Romance Journey">Romance Journey</button>
          <button type="button" class="gc-journey-chip" data-journey="Wildlife Explorer">Wildlife Explorer</button>
          <button type="button" class="gc-journey-chip" data-journey="Wellness Escape">Wellness Escape</button>
          <button type="button" class="gc-journey-chip" data-journey="Family Discovery">Family Discovery</button>
          <button type="button" class="gc-journey-chip" data-journey="Custom Journey">Custom Journey</button>
        </div>
      </div>

      <div class="gc-form">

        <div class="gc-section-label">Your Details</div>
        <div class="gc-field">
          <label class="gc-label">Full Name</label>
          <input class="gc-input" type="text" id="gc-name" placeholder="Your name">
        </div>
        <div class="gc-row-2">
          <div class="gc-field">
            <label class="gc-label">Phone Number</label>
            <input class="gc-input" type="tel" id="gc-phone" placeholder="+250 ...">
          </div>
          <div class="gc-field">
            <label class="gc-label">Email</label>
            <input class="gc-input" type="email" id="gc-email" placeholder="your@email.com">
          </div>
        </div>

        <div class="gc-section-label">Your Journey</div>
        <div class="gc-row-2">
          <div class="gc-field">
            <label class="gc-label">Preferred Dates</label>
            <input class="gc-input" type="text" id="gc-dates" placeholder="e.g. 12–15 August">
          </div>
          <div class="gc-field">
            <label class="gc-label">Number of Guests</label>
            <input class="gc-input" type="text" id="gc-guests" placeholder="e.g. 2">
          </div>
        </div>
        <div class="gc-field">
          <label class="gc-label">Room Interest</label>
          <select class="gc-select" id="gc-room">
            <option value="">No preference yet</option>
            <option>Standard Room</option>
            <option>King Room</option>
            <option>King Volcano View</option>
            <option>King Pool View</option>
            <option>Family Room</option>
            <option>Deluxe Room</option>
            <option>Executive Room</option>
          </select>
        </div>
        <div class="gc-field">
          <label class="gc-label">Package Interest</label>
          <select class="gc-select" id="gc-package">
            <option value="">No preference yet</option>
            <option>Wellness Escape</option>
            <option>Wildlife Explorer</option>
            <option>Romance Journey</option>
            <option>Family Discovery</option>
            <option>Adventure Journey</option>
            <option>Ultimate Rwanda</option>
            <option>Custom Journey</option>
          </select>
        </div>

        <div class="gc-section-label">Experience Interest</div>

        <div class="gc-exp-group">
          <span class="gc-exp-group-title">At Grotta</span>
          <div class="gc-pills" id="gc-exp-at-grotta">
            <input type="checkbox" class="gc-pill-input" id="exp-cave-exploration" value="Cave Exploration"><label class="gc-pill-label" for="exp-cave-exploration">Cave Exploration</label>
            <input type="checkbox" class="gc-pill-input" id="exp-pool-jacuzzi" value="Pool & Jacuzzi"><label class="gc-pill-label" for="exp-pool-jacuzzi">Pool & Jacuzzi</label>
            <input type="checkbox" class="gc-pill-input" id="exp-volcanic-sauna" value="Volcanic Sauna"><label class="gc-pill-label" for="exp-volcanic-sauna">Volcanic Sauna</label>
            <input type="checkbox" class="gc-pill-input" id="exp-gym" value="Gym"><label class="gc-pill-label" for="exp-gym">Gym</label>
            <input type="checkbox" class="gc-pill-input" id="exp-farm" value="Farm Experience"><label class="gc-pill-label" for="exp-farm">Farm Experience</label>
            <input type="checkbox" class="gc-pill-input" id="exp-cave-cafe" value="Cave Café"><label class="gc-pill-label" for="exp-cave-cafe">Cave Café</label>
            <input type="checkbox" class="gc-pill-input" id="exp-bonfire" value="Bonfire Evenings"><label class="gc-pill-label" for="exp-bonfire">Bonfire Evenings</label>
            <input type="checkbox" class="gc-pill-input" id="exp-movie" value="Movie Room"><label class="gc-pill-label" for="exp-movie">Movie Room</label>
            <input type="checkbox" class="gc-pill-input" id="exp-gardens" value="Highland Gardens"><label class="gc-pill-label" for="exp-gardens">Highland Gardens</label>
            <input type="checkbox" class="gc-pill-input" id="exp-massage" value="Massage"><label class="gc-pill-label" for="exp-massage">Massage</label>
            <input type="checkbox" class="gc-pill-input" id="exp-sip-paint" value="Sip & Paint"><label class="gc-pill-label" for="exp-sip-paint">Sip & Paint</label>
            <input type="checkbox" class="gc-pill-input" id="exp-aqua-aerobics" value="Aqua Aerobics"><label class="gc-pill-label" for="exp-aqua-aerobics">Aqua Aerobics</label>
            <input type="checkbox" class="gc-pill-input" id="exp-garden-bbq" value="Garden BBQ"><label class="gc-pill-label" for="exp-garden-bbq">Garden BBQ</label>
            <input type="checkbox" class="gc-pill-input" id="exp-live-cooking" value="Live Cooking"><label class="gc-pill-label" for="exp-live-cooking">Live Cooking</label>
          </div>
        </div>

        <div class="gc-exp-group">
          <span class="gc-exp-group-title">Beyond Grotta</span>
          <div class="gc-pills" id="gc-exp-beyond">
            <input type="checkbox" class="gc-pill-input" id="exp-gorilla" value="Gorilla Trekking"><label class="gc-pill-label" for="exp-gorilla">Gorilla Trekking</label>
            <input type="checkbox" class="gc-pill-input" id="exp-ebike" value="E-Bike Tours"><label class="gc-pill-label" for="exp-ebike">E-Bike Tours</label>
            <input type="checkbox" class="gc-pill-input" id="exp-volcano-hiking" value="Volcano Hiking"><label class="gc-pill-label" for="exp-volcano-hiking">Volcano Hiking</label>
            <input type="checkbox" class="gc-pill-input" id="exp-golden-monkey" value="Golden Monkey Trek"><label class="gc-pill-label" for="exp-golden-monkey">Golden Monkey Trek</label>
            <input type="checkbox" class="gc-pill-input" id="exp-community" value="Community Visits"><label class="gc-pill-label" for="exp-community">Community Visits</label>
            <input type="checkbox" class="gc-pill-input" id="exp-cultural" value="Cultural Performances"><label class="gc-pill-label" for="exp-cultural">Cultural Performances</label>
            <input type="checkbox" class="gc-pill-input" id="exp-kayaking" value="Kayaking"><label class="gc-pill-label" for="exp-kayaking">Kayaking</label>
            <input type="checkbox" class="gc-pill-input" id="exp-photo-walks" value="Photography Walks"><label class="gc-pill-label" for="exp-photo-walks">Photography Walks</label>
            <input type="checkbox" class="gc-pill-input" id="exp-sunset-trails" value="Sunset Trails"><label class="gc-pill-label" for="exp-sunset-trails">Sunset Trails</label>
            <input type="checkbox" class="gc-pill-input" id="exp-bike-rental" value="Bike Rental"><label class="gc-pill-label" for="exp-bike-rental">Bike Rental</label>
            <input type="checkbox" class="gc-pill-input" id="exp-fishing" value="Fishing"><label class="gc-pill-label" for="exp-fishing">Fishing</label>
            <input type="checkbox" class="gc-pill-input" id="exp-beer" value="Local Beer Brewing"><label class="gc-pill-label" for="exp-beer">Local Beer Brewing</label>
            <input type="checkbox" class="gc-pill-input" id="exp-chocolate" value="Chocolate Experience"><label class="gc-pill-label" for="exp-chocolate">Chocolate Experience</label>
            <input type="checkbox" class="gc-pill-input" id="exp-virunga" value="Virunga Experience"><label class="gc-pill-label" for="exp-virunga">Virunga Experience</label>
            <input type="checkbox" class="gc-pill-input" id="exp-bigogwe" value="Bigogwe Coffee Tasting"><label class="gc-pill-label" for="exp-bigogwe">Bigogwe Coffee Tasting</label>
            <input type="checkbox" class="gc-pill-input" id="exp-sawa" value="Sawa Experience"><label class="gc-pill-label" for="exp-sawa">Sawa Experience</label>
            <input type="checkbox" class="gc-pill-input" id="exp-sooko" value="Sooko Experience"><label class="gc-pill-label" for="exp-sooko">Sooko Experience</label>
            <input type="checkbox" class="gc-pill-input" id="exp-ikirenge" value="Ikirenge Experience"><label class="gc-pill-label" for="exp-ikirenge">Ikirenge Experience</label>
          </div>
        </div>

        <div class="gc-exp-group">
          <span class="gc-exp-group-title">Group Experiences</span>
          <div class="gc-pills" id="gc-exp-group">
            <input type="checkbox" class="gc-pill-input" id="exp-nature-walk" value="Musanze Nature Walk"><label class="gc-pill-label" for="exp-nature-walk">Musanze Nature Walk</label>
          </div>
        </div>

        <div class="gc-suggestion" id="gc-suggestion">
          <strong>You might also like:</strong> <span id="gc-suggestion-text"></span>
        </div>

        <div class="gc-section-label">Special Requests</div>
        <div class="gc-field">
          <textarea class="gc-textarea" id="gc-notes" placeholder="Honeymoon, anniversary, family trip, gorilla trekking focus, wellness retreat, corporate retreat..."></textarea>
        </div>

        <button class="gc-submit" id="gc-submit" type="button">
          <span class="ms">send</span>
          <span>Send to Our Concierge</span>
        </button>
        <p class="gc-disclaimer">Your inquiry opens directly in WhatsApp, addressed to our concierge team.</p>
      </div>
    </div>

    <div class="gc-success" id="gc-success">
      <div class="gc-success-icon"><span class="ms">check</span></div>
      <h3>Thank You</h3>
      <p>Your journey request has been prepared and sent to our concierge team.<br><br>We look forward to designing your Grotta experience.</p>
    </div>

  </div>
</div>
`;

/* ── Concierge behavior ── */
function initGrottaConcierge() {
  const launcher = document.getElementById('gc-launcher');
  const backdrop = document.getElementById('gc-backdrop');
  const closeBtn = document.getElementById('gc-close');
  const submitBtn = document.getElementById('gc-submit');
  const formView = document.getElementById('gc-form-view');
  const successView = document.getElementById('gc-success');

  if (!launcher || !backdrop) return;

  // Reveal launcher shortly after load
  setTimeout(() => launcher.classList.add('visible'), 600);

  function openConcierge() {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeConcierge() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  launcher.addEventListener('click', openConcierge);
  closeBtn?.addEventListener('click', closeConcierge);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeConcierge(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeConcierge(); });

  // Suggested journey chips -> set package select
  document.querySelectorAll('.gc-journey-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.gc-journey-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const pkgSelect = document.getElementById('gc-package');
      if (pkgSelect) pkgSelect.value = chip.dataset.journey;
    });
  });

  // Smart experience recommendations
  const SMART_MAP = {
    'Gorilla Trekking': { suggest: ['Volcano Hiking', 'E-Bike Tours'], room: 'Executive Room' }
  };
  document.querySelectorAll('.gc-pill-input').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked && SMART_MAP[input.value]) {
        const rule = SMART_MAP[input.value];
        const banner = document.getElementById('gc-suggestion');
        const text = document.getElementById('gc-suggestion-text');
        if (banner && text) {
          text.textContent = rule.suggest.join(', ') + (rule.room ? `, and the ${rule.room}` : '');
          banner.classList.add('show');
        }
      }
    });
  });

  // Submit -> build WhatsApp message
  submitBtn?.addEventListener('click', () => {
    const val = (id) => document.getElementById(id)?.value?.trim() || '';
    const name = val('gc-name');
    const phone = val('gc-phone');

    if (!name || !phone) {
      [('gc-name'), ('gc-phone')].forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.value.trim()) {
          el.style.borderColor = 'rgba(201,80,60,.6)';
          setTimeout(() => { el.style.borderColor = ''; }, 1400);
        }
      });
      return;
    }

    const email = val('gc-email');
    const dates = val('gc-dates');
    const guests = val('gc-guests');
    const room = val('gc-room');
    const pkg = val('gc-package');
    const notes = val('gc-notes');

    const experiences = Array.from(document.querySelectorAll('.gc-pill-input:checked')).map(i => i.value);

    let msg = '━━━━━━━━━━━━━━\n';
    msg += 'GROTTA RESORT INQUIRY\n';
    msg += '━━━━━━━━━━━━━━\n\n';
    msg += `Guest Name:\n${name}\n\n`;
    msg += `Phone:\n${phone}\n\n`;
    if (email) msg += `Email:\n${email}\n\n`;
    if (dates) msg += `Dates:\n${dates}\n\n`;
    if (guests) msg += `Guests:\n${guests}\n\n`;
    if (room) msg += `Room Interest:\n${room}\n\n`;
    if (pkg) msg += `Package:\n${pkg}\n\n`;
    if (experiences.length) {
      msg += `Experiences:\n`;
      experiences.forEach(e => { msg += `• ${e}\n`; });
      msg += '\n';
    }
    if (notes) msg += `Special Requests:\n${notes}\n\n`;
    msg += '━━━━━━━━━━━━━━';

    const waUrl = `https://wa.me/${GROTTA_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    if (formView) formView.style.display = 'none';
    if (successView) successView.classList.add('show');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const navHolder = document.getElementById('nav-holder');
  if (navHolder) navHolder.innerHTML = NAV_HTML;
  const footerHolder = document.getElementById('footer-holder');
  if (footerHolder) footerHolder.innerHTML = FOOTER_HTML;

  // Inject Grotta Concierge globally (skip if already present, e.g. double-include)
  if (!document.getElementById('gc-launcher')) {
    const gcHolder = document.createElement('div');
    gcHolder.id = 'gc-holder';
    gcHolder.innerHTML = CONCIERGE_HTML;
    document.body.appendChild(gcHolder);
    initGrottaConcierge();
  }
});

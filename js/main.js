// ============================================================
// GROTTA — Shared JS
// ============================================================

// ---- Room Inventory (localStorage persistent) ----
const ROOM_DEFAULTS = {
  standard:    { name: 'Standard Room',       price: 120000, total: 10 },
  king:        { name: 'King Room',            price: 175000, total: 10 },
  king_view:   { name: 'King Room with View',  price: 185000, total: 10 },
  deluxe:      { name: 'Deluxe Room',          price: 250000, total: 10 },
  executive:   { name: 'Executive Room',       price: 350000, total: 10 },
};

function getRooms() {
  try {
    const stored = localStorage.getItem('grotta_rooms');
    return stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(ROOM_DEFAULTS));
  } catch { return JSON.parse(JSON.stringify(ROOM_DEFAULTS)); }
}

function saveRooms(rooms) {
  try { localStorage.setItem('grotta_rooms', JSON.stringify(rooms)); } catch {}
}

function getAvailable(roomKey) {
  const rooms = getRooms();
  const r = rooms[roomKey];
  if (!r) return 0;
  return r.booked ? r.total - r.booked : r.total;
}

function bookRoom(roomKey, qty) {
  const rooms = getRooms();
  if (!rooms[roomKey]) return false;
  const avail = rooms[roomKey].total - (rooms[roomKey].booked || 0);
  if (avail < qty) return false;
  rooms[roomKey].booked = (rooms[roomKey].booked || 0) + qty;
  saveRooms(rooms);
  return true;
}

window.GrottaRooms = { getRooms, getAvailable, bookRoom, ROOM_DEFAULTS };

// ---- Availability Badge Helper ----
function availBadgeHTML(roomKey) {
  const avail = getAvailable(roomKey);
  if (avail === 0) return `<span class="availability-badge sold-out"><span class="avail-dot"></span>Fully Booked</span>`;
  if (avail <= 2) return `<span class="availability-badge low"><span class="avail-dot"></span>Only ${avail} left!</span>`;
  return `<span class="availability-badge"><span class="avail-dot"></span>${avail} rooms available</span>`;
}

window.availBadgeHTML = availBadgeHTML;

// ---- Navbar ----
document.addEventListener('DOMContentLoaded', () => {
  // Active nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Hamburger
  const ham = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (ham && mobileNav) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Scroll animations
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  // Testimonial carousel
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots   = document.querySelectorAll('.dot');
  if (slides.length) {
    let cur = 0;
    function showSlide(i) {
      slides.forEach((s,idx) => s.style.display = idx === i ? 'block' : 'none');
      dots.forEach((d,idx) => d.classList.toggle('active', idx === i));
      cur = i;
    }
    showSlide(0);
    dots.forEach((d,i) => d.addEventListener('click', () => showSlide(i)));
    setInterval(() => showSlide((cur + 1) % slides.length), 6000);
  }

  // Booking bar → booking.html
  document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bar = btn.closest('.booking-bar');
      if (bar) {
        const checkin  = bar.querySelector('[name="checkin"]')?.value || '';
        const checkout = bar.querySelector('[name="checkout"]')?.value || '';
        const adults   = bar.querySelector('[name="adults"]')?.value || '1';
        const rooms    = bar.querySelector('[name="rooms"]')?.value || '1';
        const params   = new URLSearchParams({ checkin, checkout, adults, rooms });
        window.location.href = 'booking.html?' + params.toString();
      } else {
        window.location.href = 'booking.html';
      }
    });
  });

  // All "BOOK NOW" links that are anchors to booking page
  document.querySelectorAll('a[href="booking.html"]').forEach(a => {
    // already an anchor, fine
  });

  // Refresh availability badges on stay page
  document.querySelectorAll('[data-room-key]').forEach(el => {
    const key = el.dataset.roomKey;
    el.innerHTML = availBadgeHTML(key);
  });
});

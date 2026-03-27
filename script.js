// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== PARTICLES =====
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#4f9cf9', '#a855f7', '#ec4899', '#22c55e'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = Math.random() * 30 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.opacity = Math.random() * 0.6;
    container.appendChild(p);
  }
})();

// ===== SCROLL FADE IN =====
const fadeEls = document.querySelectorAll(
  '.ocard, .arch-layer, .scenario, .tl-item, .lt-row, .app-feat, .cost-item, ' +
  '.compare-card, .stack-category, .aws-node, .pipe-step, .section-title, .section-desc'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = (i % 8) * 0.05 + 's';
  observer.observe(el);
});

// ===== COST BAR ANIMATION =====
const costObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.cost-fill').forEach(fill => {
        const w = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => { fill.style.width = w; }, 100);
      });
      costObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.cost-bar').forEach(el => costObserver.observe(el));

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--text)'
      : '';
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

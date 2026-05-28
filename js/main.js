// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
  });
});

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');
const closeBtn = document.getElementById('closeMobileNav');

hamburger?.addEventListener('click', () => mobileNav.classList.add('open'));
closeBtn?.addEventListener('click', () => mobileNav.classList.remove('open'));

function closeMobile() {
  mobileNav.classList.remove('open');
}

// ===== CONTACT FORM =====
function showToast(message, emoji = '🚧') {
  const existing = document.getElementById('formToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'formToast';
  toast.innerHTML = `<span class="toast-emoji">${emoji}</span><span class="toast-msg">${message}</span>`;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #111;
    color: #FFD93D;
    padding: 14px 24px;
    border-radius: 50px;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');

    // Loading state
    btn.disabled = true;
    btn.innerHTML = '<span style="display:inline-block;animation:spin 0.7s linear infinite;margin-right:8px;">⏳</span> Sending…';

    setTimeout(() => {
      // Reset button
      btn.disabled = false;
      btn.textContent = 'Send Message →';

      // Show toast
      showToast("We're working on the backend — check back soon!", '🚧');

      contactForm.reset();
    }, 1200);
  });
}

// Spin keyframe for loading icon
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.dataset.transform || 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s, box-shadow 0.2s ease-out, translate 0.2s ease-out`;
  revealObserver.observe(el);
});

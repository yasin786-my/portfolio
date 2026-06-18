// ===== TOP BAR HEIGHT =====
function setTopBarOffset() {
  const topBar = document.getElementById('topBar');
  if (!topBar) return;
  const h = topBar.getBoundingClientRect().height;
  document.body.style.paddingTop = h + 'px';
}
setTopBarOffset();
window.addEventListener('resize', setTopBarOffset);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('topBar')?.getBoundingClientRect().height || 70;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
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
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #111;
    color: #FFD93D;
    padding: 12px 20px;
    border-radius: 12px;
    border: 3px solid #FFD93D;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 4px 4px 0px #FFD93D;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    max-width: calc(100vw - 32px);
    width: max-content;
    text-align: center;
    word-break: break-word;
    white-space: normal;
    box-sizing: border-box;
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
// ── YOUR VERCEL URL (update after first deploy) ──
const VERCEL_BACKEND = 'https://mohamedyasin-portfolio.vercel.app';

// Auto-detect: on Vercel use relative path, on GitHub Pages use full Vercel URL
function getApiUrl(path) {
  const isVercel = window.location.hostname.includes('vercel.app');
  return isVercel ? path : VERCEL_BACKEND + path;
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all fields', '⚠️');
      return;
    }

    // Loading state
    btn.disabled = true;
    btn.innerHTML = '<span style="display:inline-block;animation:spin 0.7s linear infinite;margin-right:8px;">⏳</span> Sending…';

    try {
      const response = await fetch(getApiUrl('/api/send_email'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast('Message sent successfully! I\'ll get back to you soon.', '✅');
        contactForm.reset();
      } else {
        showToast(data.error || 'Something went wrong. Please try again.', '❌');
      }
    } catch (error) {
      showToast('Network error. Please check your connection and try again.', '❌');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message →';
    }
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

// Lumina - Main JavaScript
// Built with Grok Build in the playground worktree

// Tailwind Configuration
function initTailwind() {
  if (typeof tailwind === 'undefined') return;

  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        },
        colors: {
          accent: '#6366f1',
        }
      }
    }
  };
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    } else {
      mobileMenu.classList.add('hidden');
      menuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  });

  // Close mobile menu when clicking nav links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    });
  });
}

// Live Preview Controls
let currentAccent = '#6366f1';

function updatePreview() {
  const preview = document.getElementById('preview-card');
  if (!preview) return;

  const radius = document.getElementById('radius').value;
  const blur = document.getElementById('blur').value;
  const opacity = document.getElementById('opacity').value;

  // Update preview styles
  preview.style.borderRadius = `${radius}px`;
  preview.style.backdropFilter = `blur(${blur}px)`;
  preview.style.webkitBackdropFilter = `blur(${blur}px)`;
  
  // Glass background with dynamic opacity
  const alpha = (parseInt(opacity) / 100).toFixed(2);
  preview.style.background = `rgba(255, 255, 255, ${alpha})`;
  
  // Border
  preview.style.border = `1px solid rgba(255, 255, 255, ${Math.min(0.25, parseFloat(alpha) + 0.08)})`;

  // Update value labels
  document.getElementById('radius-value').textContent = `${radius}px`;
  document.getElementById('blur-value').textContent = `${blur}px`;
  document.getElementById('opacity-value').textContent = `${opacity}%`;
}

function setAccent(color) {
  currentAccent = color;
  
  const preview = document.getElementById('preview-card');
  const icon = document.getElementById('preview-icon');
  
  if (icon) {
    icon.style.background = `linear-gradient(to bottom right, ${color}, ${adjustColor(color, -20)})`;
  }
  
  // Update button accent in preview if exists
  const buttons = preview.querySelectorAll('button');
  buttons.forEach(btn => {
    if (btn.textContent.includes('Primary')) {
      btn.style.background = color;
      btn.style.color = '#fff';
    }
  });

  // Visual feedback on control
  document.querySelectorAll('.glass-card button').forEach(b => {
    b.style.outline = b.onclick.toString().includes(color) ? `2px solid ${color}` : '';
  });
}

function adjustColor(hex, percent) {
  // Simple color adjustment for gradient
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function resetDemo() {
  const preview = document.getElementById('preview-card');
  const icon = document.getElementById('preview-icon');
  
  // Reset inputs
  document.getElementById('radius').value = 24;
  document.getElementById('blur').value = 20;
  document.getElementById('opacity').value = 12;

  // Reset preview
  if (preview) {
    preview.style.borderRadius = '24px';
    preview.style.backdropFilter = 'blur(20px)';
    preview.style.webkitBackdropFilter = 'blur(20px)';
    preview.style.background = 'rgba(255, 255, 255, 0.12)';
    preview.style.border = '1px solid rgba(255, 255, 255, 0.2)';
  }

  if (icon) {
    icon.style.background = 'linear-gradient(to bottom right, #6366f1, #a855f7)';
  }

  // Reset values
  document.getElementById('radius-value').textContent = '24px';
  document.getElementById('blur-value').textContent = '20px';
  document.getElementById('opacity-value').textContent = '12%';

  currentAccent = '#6366f1';
}

// Copy component code
function copyComponentCode() {
  const preview = document.getElementById('preview-card');
  const radius = document.getElementById('radius').value;
  const blur = document.getElementById('blur').value;
  const opacity = document.getElementById('opacity').value;

  const html = `<!-- Lumina Glass Card Component -->
<div class="glass-card" style="
  background: rgba(255,255,255,${(parseInt(opacity)/100).toFixed(2)});
  border-radius: ${radius}px;
  backdrop-filter: blur(${blur}px);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 2rem;
">
  <!-- Your content here -->
</div>

<style>
.glass-card {
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
</style>`;

  navigator.clipboard.writeText(html).then(() => {
    const originalText = event.currentTarget ? event.currentTarget.textContent : '';
    const btns = document.querySelectorAll('button');
    btns.forEach(btn => {
      if (btn.textContent.includes('Copy')) {
        const orig = btn.innerHTML;
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7" />
          </svg>
          <span>Copied!</span>
        `;
        setTimeout(() => {
          btn.innerHTML = orig;
        }, 1800);
      }
    });
  }).catch(() => {
    // Fallback
    alert('Code copied to clipboard (fallback):\n\n' + html);
  });
}

// Scroll reveal animations
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.glass-card, h2, .prose');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Fake action for demo buttons
function fakeAction(button) {
  const originalText = button.textContent;
  const originalBg = button.style.background;

  button.style.transition = 'all 0.1s ease';
  button.textContent = 'Thanks!';
  button.style.background = '#22c55e';
  button.style.color = 'white';

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = originalBg || '';
    button.style.color = '';
  }, 1400);
}

// Get started action
function getStarted() {
  const demoSection = document.getElementById('demo');
  if (demoSection) {
    demoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Flash the preview card
    setTimeout(() => {
      const card = document.getElementById('preview-card');
      if (card) {
        card.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.3)';
        setTimeout(() => {
          card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        }, 900);
      }
    }, 700);
  } else {
    alert("Thanks for your interest in Lumina!\n\nIn a real app this would open signup or the builder.");
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Keyboard support for demo
function initKeyboardSupport() {
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName === 'BODY') {
      e.preventDefault();
      const radiusSlider = document.getElementById('radius');
      if (radiusSlider) radiusSlider.focus();
    }
    
    if (e.metaKey && e.key === 'k') {
      e.preventDefault();
      const preview = document.getElementById('preview-card');
      if (preview) preview.click();
    }
  });
}

// Initialize everything
function init() {
  initTailwind();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initKeyboardSupport();

  // Initialize live preview controls
  const controls = ['radius', 'blur', 'opacity'];
  controls.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updatePreview);
    }
  });

  // Initial preview render
  setTimeout(() => {
    const preview = document.getElementById('preview-card');
    if (preview) {
      // Set nice initial state
      preview.style.borderRadius = '24px';
      updatePreview();
    }
  }, 100);

  // Set default accent
  const icon = document.getElementById('preview-icon');
  if (icon) {
    icon.style.background = 'linear-gradient(to bottom right, #6366f1, #a855f7)';
  }

  // Bonus: Random subtle animation on hero badge
  const badge = document.querySelector('.inline-flex');
  if (badge) {
    setTimeout(() => {
      badge.style.transition = 'transform 0.6s ease';
    }, 2000);
  }

  // Welcome console message
  console.log('%c[Lumina] Beautiful static landing page built with Grok Build in the playground worktree.', 'color:#6366f1');
}

// Boot
document.addEventListener('DOMContentLoaded', init);
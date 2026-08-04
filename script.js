// =========================================================
// 1. PRELOADER & SCREEN LOADER
// =========================================================
(function () {
  const preloader = document.getElementById('preloader');
  const progress = document.getElementById('loaderProgress');
  const percentText = document.getElementById('loaderPercent');

  if (!preloader || !progress || !percentText) return;

  let current = 0;
  const interval = setInterval(() => {
    current += Math.floor(Math.random() * 12) + 6;
    if (current >= 100) {
      current = 100;
      clearInterval(interval);
      progress.style.width = '100%';
      percentText.textContent = '100%';
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 300);
    } else {
      progress.style.width = `${current}%`;
      percentText.textContent = `${current}%`;
    }
  }, 40);
})();

// =========================================================
// 2. CUSTOM CURSOR WITH SPRING EASE
// =========================================================
(function () {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
})();

// =========================================================
// 3. MOUSE SPOTLIGHT EFFECT ON CARDS
// =========================================================
(function () {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();

// =========================================================
// 4. 3D PARALLAX TILT EFFECT ON PROJECT CARDS
// =========================================================
(function () {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 8;
      const rotateY = (x / rect.width) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
})();

// =========================================================
// 5. MAGNETIC BUTTON EFFECT
// =========================================================
(function () {
  const btns = document.querySelectorAll('.magnetic-btn');
  btns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0, 0, 0)';
    });
  });
})();

// =========================================================
// 6. HERO DYNAMIC TYPEWRITER ANIMATION
// =========================================================
(function () {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  const phrases = [
    'AI/ML Engineer',
    'LLM & RAG Architect',
    'Computer Vision Specialist',
    'Full-Stack AI Developer'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 100;

  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 50;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 100;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      speed = 2000; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
})();

// =========================================================
// 7. NEURAL NETWORK CANVAS HERO BACKGROUND
// =========================================================
(function () {
  const canvas = document.getElementById('netCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, nodes = [];
  const NODE_COUNT_BASE = 5500;
  const LINK_DIST = 150;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
    buildNodes();
  }

  function buildNodes() {
    const count = Math.min(85, Math.max(30, Math.floor((width * height) / NODE_COUNT_BASE)));
    nodes = new Array(count).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.8 + 0.8,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.35;
          ctx.strokeStyle = `rgba(94, 234, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167, 139, 250, 0.8)';
      ctx.fill();
    }

    if (!reduceMotion) requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  resize();
  step();
})();

// =========================================================
// 8. SCROLL REVEAL & FLOATING NAV HIGHLIGHT
// =========================================================
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();

// =========================================================
// 9. MOBILE NAV TOGGLE
// =========================================================
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    if (isOpen) {
      links.style.display = 'flex';
      links.style.position = 'absolute';
      links.style.top = '100%';
      links.style.left = '0';
      links.style.right = '0';
      links.style.flexDirection = 'column';
      links.style.background = '#0a0f1d';
      links.style.padding = '20px';
      links.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    } else {
      links.style.display = '';
    }
  });
})();

// =========================================================
// 10. DARK / LIGHT THEME TOGGLE
// =========================================================
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const moon = btn.querySelector('.icon-moon');
  const sun  = btn.querySelector('.icon-sun');
  const html = document.documentElement;

  function applyTheme(isDark) {
    if (isDark) {
      html.removeAttribute('data-theme');
      moon.style.display = '';
      sun.style.display  = 'none';
    } else {
      html.setAttribute('data-theme', 'light');
      moon.style.display = 'none';
      sun.style.display  = '';
    }
  }

  const saved = localStorage.getItem('theme');
  let isDark = saved !== 'light';
  applyTheme(isDark);

  btn.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  });
})();

// =========================================================
// 11. CONTACT FORM MAILTO DISPATCH
// =========================================================
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:kanchettiajaypatel@gmail.com?subject=${subject}&body=${body}`;

    if (note) {
      note.textContent = 'Opening your mail client…';
    }
  });
})();

// =========================================================
// 12. NAV HIDE ON SCROLL DOWN / REVEAL ON SCROLL UP
// =========================================================
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastY && currentY > 120) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastY = currentY;
  }, { passive: true });
})();

// =========================================================
// 13. SCROLL REVEAL — .reveal elements (section heads, etc.)
// =========================================================
(function () {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

// =========================================================
// 14. STAGGER REVEAL — .reveal-stagger children
// =========================================================
(function () {
  const staggerContainers = document.querySelectorAll('.reveal-stagger');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Array.from(entry.target.children).forEach((child) => {
            child.classList.add('visible');
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  staggerContainers.forEach((el) => observer.observe(el));
})();

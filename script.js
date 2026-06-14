/* ========================================
   MUQADAS JAVED — PORTFOLIO SCRIPTS
======================================== */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2400);
});

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorFollower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorFollower.classList.remove('hover');
  });
});

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Active nav link
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ── PARTICLE CANVAS ── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.05 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ── TYPING ANIMATION (Hero name) ── */
(function typeName() {
  const el = document.getElementById('typedName');
  const name = 'Muqadas Javed';
  let i = 0;
  function type() {
    if (i <= name.length) {
      el.textContent = name.slice(0, i);
      i++;
      setTimeout(type, 80);
    }
  }
  setTimeout(type, 2600);
})();

/* ── ROLE ROTATING TEXT ── */
(function roleRotator() {
  const roles = [
    'QA Engineer',
    'Test Automation Expert',
    'API Testing Specialist',
    'Playwright Developer',
    'Cypress Automation Pro',
    'AI Chatbot Tester',
    'Bug Hunter 🐛'
  ];
  const el = document.getElementById('roleText');
  let idx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = roles[idx];
    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        idx = (idx + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 50 : 90);
  }
  setTimeout(tick, 3200);
})();

/* ── COUNTER ANIMATION ── */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { el.textContent = target; clearInterval(timer); }
      else el.textContent = Math.floor(count);
    }, 40);
  });
}

/* ── SCROLL-TRIGGERED ANIMATIONS (AOS-lite) ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');

      // Skill bars
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });

      // Counters (only once, when hero is visible)
      if (entry.target.id === 'home') animateCounters();
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos], section').forEach(el => observer.observe(el));

// Also trigger skill bars when skills section visible
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

/* ── CONTACT FORM ── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  btn.style.boxShadow  = '0 4px 20px rgba(34,197,94,0.4)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    btn.style.boxShadow  = '';
    btn.disabled = false;
    this.reset();
  }, 3500);
});

/* ── SMOOTH ACTIVE SECTION HIGHLIGHT ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ── GLITCH EFFECT on avatar hover ── */
const avatarInner = document.querySelector('.avatar-inner');
if (avatarInner) {
  avatarInner.addEventListener('mouseenter', () => {
    avatarInner.style.animation = 'pulseGlow 0.4s ease infinite alternate';
  });
  avatarInner.addEventListener('mouseleave', () => {
    avatarInner.style.animation = '';
  });
}

// ===============================
// PREMIUM BACKGROUND PARTICLES
// ===============================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Mouse movement
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,242,255,0.7)";
    ctx.fill();
  }
}

// Create particles
function initParticles() {
  particles = [];
  let count = Math.floor((canvas.width * canvas.height) / 15000);

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
initParticles();

// Connect particles
function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.strokeStyle = "rgba(0,242,255,0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animate
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();

  requestAnimationFrame(animateParticles);
}

animateParticles();

// ===============================
// 1) Smooth Scroll
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});


// ===============================
// 2) Navbar Shadow on Scroll
// ===============================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = "0 18px 45px rgba(0,0,0,0.45)";
  } else {
    header.style.boxShadow = "none";
  }
});


// ===============================
// 3) Active Link Highlight
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


// ===============================
// 4) Reveal Animation on Scroll
// ===============================
const allSections = document.querySelectorAll(".section");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.12 });

allSections.forEach(sec => {
  sec.classList.add("reveal");
  revealObserver.observe(sec);
});


// ===============================
// 5) Counter Animation (Stats)
// ===============================
const stats = document.querySelectorAll(".stat h3");

function animateCounter(el, target) {
  let start = 0;
  const speed = 30;

  const counter = setInterval(() => {
    start += Math.ceil(target / 60);

    if (start >= target) {
      el.innerText = target + "+";
      clearInterval(counter);
    } else {
      el.innerText = start + "+";
    }
  }, speed);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      stats.forEach(stat => {
        const value = parseInt(stat.innerText);
        if (!stat.dataset.done) {
          stat.dataset.done = "true";
          animateCounter(stat, value);
        }
      });
    }
  });
}, { threshold: 0.4 });

const statsBox = document.querySelector(".stats");
if (statsBox) statObserver.observe(statsBox);


// ===============================
// 6) Premium Tilt Effect on Projects
// ===============================
const projects = document.querySelectorAll(".project");

projects.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 25) * -1;
    const rotateY = (x - centerX) / 25;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0px)";
  });
});


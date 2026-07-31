// ===== NAV: scroll state + mobile toggle =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ===== Cursor glow (desktop only, subtle) =====
const glow = document.getElementById('cursorGlow');
let glowActive = window.matchMedia('(hover: hover)').matches;
if (glowActive) {
    window.addEventListener('mousemove', (e) => {
        glow.style.opacity = '1';
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }, { passive: true });
}

// ===== Skill bars: build from data-level =====
document.querySelectorAll('.bars').forEach(el => {
    const level = parseInt(el.dataset.level, 10) || 0;
    const row = document.createElement('div');
    row.className = 'bar-row';
    for (let i = 1; i <= 5; i++) {
        const bar = document.createElement('i');
        if (i <= level) bar.classList.add('filled');
        row.appendChild(bar);
    }
    el.appendChild(row);
});

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
    '.tl-item, .project-card, .skill-group, .stat, .cert-list li, .edu-item, .contact-link'
);
revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealTargets.forEach(el => io.observe(el));

// ===== Signature element: waveform morphing into a bar chart =====
// Represents the site's thesis: a raw telecom signal (Varun's ECE background)
// resolving into discrete data bars (his analytics work).
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
let W, H, DPR;

function resizeCanvas() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const NUM_BARS = 42;
let t = 0;

function draw() {
    ctx.clearRect(0, 0, W, H);
    const midY = H / 2;
    const amberColor = '#F0A94E';
    const tealColor = '#45D9C4';

    const spacing = W / NUM_BARS;

    for (let i = 0; i < NUM_BARS; i++) {
        const x = i * spacing + spacing / 2;
        const progress = i / (NUM_BARS - 1); // 0 (left, wave) -> 1 (right, bars)

        // wave contribution
        const waveVal = Math.sin((i * 0.5) + t) * (H * 0.32) * (1 - progress);
        // bar contribution: pseudo-random but stable height per index
        const seed = Math.sin(i * 12.9898) * 43758.5453;
        const rand = seed - Math.floor(seed);
        const barVal = (0.25 + rand * 0.75) * (H * 0.4) * progress;

        const blend = progress; // color blend factor
        const r1 = 240, g1 = 169, b1 = 78;   // amber
        const r2 = 69, g2 = 217, b2 = 196;  // teal
        const r = Math.round(r1 + (r2 - r1) * blend);
        const g = Math.round(g1 + (g2 - g1) * blend);
        const b = Math.round(b1 + (b2 - b1) * blend);

        ctx.strokeStyle = `rgba(${r},${g},${b},${0.35 + blend * 0.5})`;
        ctx.lineWidth = Math.max(2, spacing * 0.35);
        ctx.lineCap = 'round';

        ctx.beginPath();
        if (progress < 0.5) {
            // draw as a wave point (thin vertical tick around midline)
            const h = Math.max(2, Math.abs(waveVal));
            ctx.moveTo(x, midY - h / 2 - barVal * 0.15);
            ctx.lineTo(x, midY + h / 2 + barVal * 0.15);
        } else {
            // draw as a rising bar from baseline
            ctx.moveTo(x, midY + H * 0.34);
            ctx.lineTo(x, midY + H * 0.34 - barVal - Math.abs(waveVal) * 0.1);
        }
        ctx.stroke();
    }
}

function animate() {
    t += 0.045;
    draw();
    if (!prefersReduced) requestAnimationFrame(animate);
}

if (prefersReduced) {
    draw();
} else {
    animate();
}
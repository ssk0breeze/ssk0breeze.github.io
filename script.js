/* ======== EDIT YOUR LINKS HERE ======== */
const LINKS = [
  { label: "Instagram", note: "@ssk_breeze",        url: "https://www.instagram.com/ssk_breeze/",          short: "IG", color: "#f472b6" },
  { label: "X (Twitter)", note: "@sskbreeze",       url: "https://x.com/sskbreeze",                        short: "X",  color: "#e5e7eb" },
  { label: "Discord",   note: "Message me",         url: "https://discord.com/users/1466479181251739844",  short: "DC", color: "#7c8cff" },
  { label: "LinkedIn",  note: "ssk-breeze",         url: "https://www.linkedin.com/in/ssk-breeze",         short: "in", color: "#38bdf8" },
  { label: "GitHub",    note: "ssk0breeze",         url: "https://github.com/ssk0breeze",                  short: "GH", color: "#22d3ee" }
];
/* ====================================== */

const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

// Build link rows
const box = document.getElementById('links');
LINKS.forEach((l, i) => {
  const a = document.createElement('a');
  a.className = 'link rise';
  a.href = l.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
  a.style.setProperty('--c', l.color);
  a.style.animationDelay = (0.45 + i * 0.08) + 's';
  a.innerHTML = '<div class="ico"></div><div class="txt"><b></b><span></span></div><div class="go">&rsaquo;</div>';
  a.querySelector('.ico').textContent = l.short;
  a.querySelector('b').textContent = l.label;
  a.querySelector('span').textContent = l.note;
  box.appendChild(a);
});

document.getElementById('foot').textContent = '© ' + new Date().getFullYear() + ' Sumon S K';

// Typing tagline
(function () {
  const el = document.getElementById('tag'), t = el.dataset.text;
  if (reduce) { el.textContent = t; return; }
  let i = 0;
  setTimeout(function type() {
    el.textContent = t.slice(0, ++i);
    if (i < t.length) setTimeout(type, 55);
  }, 600);
})();

// Drifting particle network
(function () {
  if (reduce) return;
  const c = document.getElementById('bg'), x = c.getContext('2d');
  let w, h, dots;
  function size() {
    w = c.width = innerWidth; h = c.height = innerHeight;
    dots = Array.from({ length: Math.min(70, Math.floor(w * h / 18000)) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25
    }));
  }
  function frame() {
    x.clearRect(0, 0, w, h);
    dots.forEach((d, i) => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      x.fillStyle = 'rgba(139,92,246,.7)';
      x.fillRect(d.x, d.y, 2, 2);
      for (let j = i + 1; j < dots.length; j++) {
        const e = dots[j], dx = d.x - e.x, dy = d.y - e.y, dist = dx * dx + dy * dy;
        if (dist < 12000) {
          x.strokeStyle = 'rgba(34,211,238,' + (0.12 * (1 - dist / 12000)) + ')';
          x.beginPath(); x.moveTo(d.x, d.y); x.lineTo(e.x, e.y); x.stroke();
        }
      }
    });
    requestAnimationFrame(frame);
  }
  addEventListener('resize', size); size(); frame();
})();

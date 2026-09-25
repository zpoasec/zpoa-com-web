// Full-page ambient canvas, drawn differently per locale:
//   en-US : a live network graph, nodes linking up with data packets that
//           travel the edges, and links that reach toward the cursor.
//   en-IN : slow drifting embers with soft glow, parallaxing with the cursor.
// Fixed behind the page, pointer-events none, paused when the tab is hidden,
// and never started under prefers-reduced-motion.

type Node = {x: number; y: number; vx: number; vy: number; r: number};
type Ember = {x: number; y: number; z: number; r: number; ph: number; sp: number; c: string};
type Packet = {a: number; b: number; t: number; s: number};

const EMBER_COLORS = ['167,139,250', '34,211,238', '244,114,182', '255,153,51', '196,181,253'];

let started = false;

function start() {
  if (started) return;
  started = true;

  const lang = document.documentElement.lang;
  const isIN = lang === 'en-IN';

  const canvas = document.createElement('canvas');
  canvas.className = 'mo-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '0',
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0, h = 0, dpr = 1;
  const mouse = {x: -9999, y: -9999, active: false};
  let nodes: Node[] = [];
  let embers: Ember[] = [];
  const packets: Packet[] = [];

  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const small = w < 700;
    if (isIN) {
      const n = small ? 26 : 56;
      embers = Array.from({length: n}, () => ({
        x: rand(0, w), y: rand(0, h), z: rand(0.3, 1),
        r: rand(1, 3.4), ph: rand(0, Math.PI * 2), sp: rand(0.12, 0.42),
        c: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
      }));
    } else {
      const n = Math.max(24, Math.min(small ? 36 : 78, Math.floor((w * h) / 24000)));
      nodes = Array.from({length: n}, () => ({
        x: rand(0, w), y: rand(0, h),
        vx: rand(-0.22, 0.22), vy: rand(-0.22, 0.22), r: rand(1.2, 2.3),
      }));
    }
  }

  window.addEventListener('resize', resize, {passive: true});
  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  }, {passive: true});
  document.addEventListener('mouseleave', () => { mouse.active = false; });
  resize();

  const LINK = 150;
  let lastPacket = 0;

  function drawUS(t: number) {
    const c = ctx!;
    c.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
      if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
    }
    c.lineWidth = 1;
    const edges: Array<[number, number]> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.hypot(dx, dy);
        if (d < LINK) {
          const a = (1 - d / LINK) * 0.32;
          c.strokeStyle = `rgba(45,212,191,${a.toFixed(3)})`;
          c.beginPath(); c.moveTo(nodes[i].x, nodes[i].y); c.lineTo(nodes[j].x, nodes[j].y); c.stroke();
          edges.push([i, j]);
        }
      }
      if (mouse.active) {
        const d = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
        if (d < 190) {
          c.strokeStyle = `rgba(96,165,250,${((1 - d / 190) * 0.6).toFixed(3)})`;
          c.beginPath(); c.moveTo(nodes[i].x, nodes[i].y); c.lineTo(mouse.x, mouse.y); c.stroke();
        }
      }
    }
    for (const n of nodes) {
      c.fillStyle = 'rgba(147,197,253,0.85)';
      c.beginPath(); c.arc(n.x, n.y, n.r, 0, Math.PI * 2); c.fill();
    }
    if (t - lastPacket > 520 && edges.length && packets.length < 14) {
      lastPacket = t;
      const [a, b] = edges[Math.floor(Math.random() * edges.length)];
      packets.push({a, b, t: 0, s: rand(0.012, 0.024)});
    }
    for (let k = packets.length - 1; k >= 0; k--) {
      const p = packets[k];
      p.t += p.s;
      if (p.t >= 1) { packets.splice(k, 1); continue; }
      const A = nodes[p.a], B = nodes[p.b];
      const x = A.x + (B.x - A.x) * p.t, y = A.y + (B.y - A.y) * p.t;
      const g = c.createRadialGradient(x, y, 0, x, y, 9);
      g.addColorStop(0, 'rgba(94,234,212,0.95)');
      g.addColorStop(1, 'rgba(94,234,212,0)');
      c.fillStyle = g;
      c.beginPath(); c.arc(x, y, 9, 0, Math.PI * 2); c.fill();
    }
  }

  function drawIN(t: number) {
    const c = ctx!;
    c.clearRect(0, 0, w, h);
    c.globalCompositeOperation = 'lighter';
    const mx = mouse.active ? (mouse.x / w - 0.5) : 0;
    const my = mouse.active ? (mouse.y / h - 0.5) : 0;
    for (const e of embers) {
      e.y -= e.sp * e.z;
      e.x += Math.sin(t / 1800 + e.ph) * 0.25;
      if (e.y < -10) { e.y = h + 10; e.x = rand(0, w); }
      const px = e.x - mx * 46 * e.z, py = e.y - my * 34 * e.z;
      const tw = 0.55 + 0.45 * Math.sin(t / 700 + e.ph);
      const rr = e.r * (2.6 + e.z * 2.4);
      const g = c.createRadialGradient(px, py, 0, px, py, rr);
      g.addColorStop(0, `rgba(${e.c},${(0.85 * tw).toFixed(3)})`);
      g.addColorStop(0.4, `rgba(${e.c},${(0.22 * tw).toFixed(3)})`);
      g.addColorStop(1, `rgba(${e.c},0)`);
      c.fillStyle = g;
      c.beginPath(); c.arc(px, py, rr, 0, Math.PI * 2); c.fill();
    }
    c.globalCompositeOperation = 'source-over';
  }

  function frame(t: number) {
    if (!document.hidden) (isIN ? drawIN : drawUS)(t);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

export function onRouteDidUpdate() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  start();
}

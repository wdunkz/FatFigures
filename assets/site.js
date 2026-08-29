/* ============================================================
   FatFigures — site runtime

   Loading strategy, in short:
     1. index.html kicks off the profiles.json fetch in <head>, before
        this module has even downloaded.
     2. Background video + audio start buffering immediately, behind the
        enter gate, so the gate doubles as a loading screen.
     3. A poster JPEG paints the background on frame one and is shown
        blurred *through* the gate; the video only crossfades in once the
        visitor has entered.
   Net effect: the gate shows the real scene straight away, and by the
   time anyone clicks, the media is already warm.
   ============================================================ */

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Icons ---------- */
export const ICONS = {
  website: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3.53a15.9 15.9 0 0 0-1.2-5.44A8.03 8.03 0 0 1 19.9 11ZM12 4.06c.98 1.2 1.94 3.2 2.33 4.94H9.67c.39-1.74 1.35-3.74 2.33-4.94ZM4.1 13h3.53c.16 1.9.6 3.75 1.2 5.44A8.03 8.03 0 0 1 4.1 13Zm3.53-2H4.1a8.03 8.03 0 0 1 4.73-5.44A15.9 15.9 0 0 0 7.63 11Zm1.99 2h4.76c-.4 1.9-1.34 3.87-2.38 5.35C10.96 16.87 10.02 14.9 9.62 13Zm5.85 5.44c.6-1.69 1.04-3.54 1.2-5.44h3.53a8.03 8.03 0 0 1-4.73 5.44Z"/></svg>',
  steam: '<svg viewBox="0 0 24 24"><path d="M12 2C6.95 2 2.8 5.8 2.14 10.68l4.98 2.06a2.6 2.6 0 0 1 1.48-.46l2.2-3.2v-.05a3.53 3.53 0 1 1 3.53 3.53h-.08l-3.15 2.25v.08A2.6 2.6 0 0 1 6 16.31l-3.7-1.53C3.13 18.65 7.16 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2ZM8.1 17.3l-1.14-.47a1.94 1.94 0 0 0 3.6-.15l1.02-.43a2.98 2.98 0 0 1-3.48 1.05Zm7.62-7.72a2.35 2.35 0 1 1-4.7 0 2.35 2.35 0 0 1 4.7 0Z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24"><path d="M21.6 7.2s-.2-1.5-.85-2.15c-.8-.85-1.7-.85-2.1-.9C15.9 4 12 4 12 4h-.02s-3.9 0-6.65.15c-.4.05-1.3.05-2.1.9C2.6 5.7 2.4 7.2 2.4 7.2S2.2 9 2.2 10.75v1.5C2.2 14 2.4 15.8 2.4 15.8s.2 1.5.85 2.15c.8.85 1.85.83 2.32.92 1.68.16 7.13.2 7.13.2s3.9 0 6.65-.15c.4-.05 1.3-.05 2.1-.9.65-.65.85-2.15.85-2.15s.2-1.8.2-3.55v-1.5c0-1.75-.2-3.55-.2-3.55ZM9.9 14.6V8.9l5.6 2.86-5.6 2.85Z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24"><path d="M17.5 3h3l-6.6 7.55L21.5 21h-6l-4.7-6.15L4.9 21H1.9l7.05-8.05L1.5 3h6.15l4.25 5.62L17.5 3Zm-1.05 16.2h1.66L7.62 4.7H5.84l10.6 14.5Z"/></svg>',
  bluesky: '<svg viewBox="0 0 24 24"><path d="M12 8.4C10.6 5.7 7.9 3.4 5.4 3c-1.3-.2-1.9.5-1.4 1.9C4.6 6.9 6.3 11 12 14.5c5.7-3.5 7.4-7.6 8-9.6.5-1.4-.1-2.1-1.4-1.9-2.5.4-5.2 2.7-6.6 5.4Zm0 6.6c-1.3 2.4-4 4.4-6.4 4.8-1.4.2-2.1-.5-1.6-2 .5-1.6 1.7-3.5 3.3-4.7 1.7 1 3.2 1.6 4.7 1.9Zm0 0c1.5-.3 3-.9 4.7-1.9 1.6 1.2 2.8 3.1 3.3 4.7.5 1.5-.2 2.2-1.6 2-2.4-.4-5.1-2.4-6.4-4.8Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c2.7 0 3 0 4.1.06 1.1.05 1.8.22 2.4.46.66.25 1.15.58 1.65 1.08.5.5.83.99 1.08 1.65.24.6.41 1.3.46 2.4.06 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.1-.22 1.8-.46 2.4a4.4 4.4 0 0 1-1.08 1.65 4.4 4.4 0 0 1-1.65 1.08c-.6.24-1.3.41-2.4.46-1.1.06-1.4.06-4.1.06s-3 0-4.1-.06c-1.1-.05-1.8-.22-2.4-.46a4.4 4.4 0 0 1-1.65-1.08 4.4 4.4 0 0 1-1.08-1.65c-.24-.6-.41-1.3-.46-2.4C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1.1.22-1.8.46-2.4.25-.66.58-1.15 1.08-1.65C4.3 3.35 4.79 3.02 5.45 2.77c.6-.24 1.3-.41 2.4-.46C8.95 2.2 9.25 2.2 12 2.2Zm0 1.8c-2.66 0-2.97 0-4.02.06-.9.04-1.4.19-1.72.32-.43.17-.74.37-1.06.7-.32.31-.52.62-.7 1.05-.13.32-.28.82-.32 1.72C4.12 9.1 4.1 9.4 4.1 12c0 2.6.02 2.9.08 3.95.04.9.19 1.4.32 1.72.18.43.38.74.7 1.06.32.32.63.52 1.06.7.32.13.82.28 1.72.32 1.05.06 1.36.08 4.02.08s2.97-.02 4.02-.08c.9-.04 1.4-.19 1.72-.32.43-.18.74-.38 1.06-.7.32-.32.52-.63.7-1.06.13-.32.28-.82.32-1.72.06-1.05.08-1.35.08-3.95s-.02-2.9-.08-3.95c-.04-.9-.19-1.4-.32-1.72a2.7 2.7 0 0 0-.7-1.06 2.7 2.7 0 0 0-1.06-.7c-.32-.13-.82-.28-1.72-.32C14.97 4 14.66 4 12 4Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.7-1.98a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Z"/></svg>',
  twitch: '<svg viewBox="0 0 24 24"><path d="M4.3 2 3 5.7v13.2h4.7V22l3.3-3.1h4L21 12.9V2H4.3Zm14.9 10-3.2 3.1h-3.9L9 18.2v-3.1H5.9V4h13.3v8Z"/><path d="M15.9 6.8h1.9v4.7h-1.9zM11 6.8h1.9v4.7H11z"/></svg>',
  discord: '<svg viewBox="0 0 24 24"><path d="M19.5 5.3A17.4 17.4 0 0 0 15.3 4l-.2.4a12.7 12.7 0 0 1 3.7 1.6c-1.6-.8-3.2-1.2-4.8-1.3-1.6-.1-3.2 0-4.8.4a13 13 0 0 0-2.5.8c-.4.2-.6.3-.6.3l.1.4a12.7 12.7 0 0 1 3.7-1.6l-.2-.4a17.4 17.4 0 0 0-4.2 1.3C3 8.5 2.3 12.5 2.6 16.4a17.7 17.7 0 0 0 5.1 2.6l.6-1a10.5 10.5 0 0 1-1.7-.8l.4-.3a12.6 12.6 0 0 0 10 0l.4.3a10.5 10.5 0 0 1-1.7.8l.6 1a17.7 17.7 0 0 0 5.1-2.6c.4-4.5-.8-8.4-2.9-11.1ZM9 14.3c-.8 0-1.5-.8-1.5-1.7 0-1 .6-1.7 1.5-1.7s1.5.8 1.5 1.7c0 1-.6 1.7-1.5 1.7Zm6 0c-.8 0-1.5-.8-1.5-1.7 0-1 .6-1.7 1.5-1.7s1.5.8 1.5 1.7c0 1-.6 1.7-1.5 1.7Z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24"><path d="M14.5 2h2.7c.2 1.3.9 2.5 2 3.3.9.7 2 1.1 3.1 1.1v2.8a7.7 7.7 0 0 1-4.9-1.8v6.9a6.5 6.5 0 1 1-6.5-6.5c.3 0 .6 0 .9.05v2.9a3.6 3.6 0 1 0 2.6 3.5V2Z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
};

export const SOUND_ICONS = {
  on: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4Zm11.5 3a3.5 3.5 0 0 0-2-3.16v6.32A3.5 3.5 0 0 0 15.5 12Zm2 0a5.5 5.5 0 0 1-3.5 5.14v-2.1A3.48 3.48 0 0 0 16 12a3.48 3.48 0 0 0-2-3.04v-2.1A5.5 5.5 0 0 1 17.5 12Z"/></svg>',
  off: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4Zm11.7 3 2.15 2.15 1.06-1.06L16.76 12l2.15-2.15-1.06-1.06L15.7 10.94l-2.15-2.15-1.06 1.06L14.64 12l-2.15 2.15 1.06 1.06L15.7 13.06Z"/></svg>',
};

const ARROW = '<svg viewBox="0 0 24 24"><path d="M10.8 5.4 4.2 12l6.6 6.6 1.4-1.4-4.2-4.2H20v-2H8l4.2-4.2-1.4-1.4Z"/></svg>';
const PIN = '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>';
const EYE = '<svg viewBox="0 0 24 24"><path d="M12 5c-5 0-9.27 3.11-11 7 1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 11.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 0 9Zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>';

/* ---------- Data ----------
   index.html starts this fetch inline in <head>, before the module
   loads, so we reuse that in-flight promise when it exists. */
let profilesPromise = null;
export function loadProfiles() {
  if (!profilesPromise) {
    profilesPromise = (window.__profilesReq || fetch('/profiles.json').then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }));
  }
  return profilesPromise;
}

/* ---------- View counter ----------
   This is a static site, so counting views needs somebody else's server.
   abacus is a free, no-signup, CORS-open counter. Swap VIEWS_HOST for
   your own if you'd rather not depend on it — anything that returns
   {"value": N} works. Counted once per browser session per profile, so
   refreshing doesn't inflate the number. */
const VIEWS_HOST = 'https://abacus.jasoncameron.dev';
const VIEWS_NAMESPACE = 'fatfigures';

async function readViews(slug) {
  const key = String(slug).replace(/[^a-z0-9_-]/gi, '').slice(0, 60);
  if (key.length < 3) return null;

  const seen = `viewed:${key}`;
  let bump = true;
  try {
    bump = !sessionStorage.getItem(seen);
    if (bump) sessionStorage.setItem(seen, '1');
  } catch { /* private mode — just count it */ }

  const url = `${VIEWS_HOST}/${bump ? 'hit' : 'get'}/${VIEWS_NAMESPACE}/${key}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.value === 'number' ? data.value : null;
  } catch {
    return null; // offline or blocked — the counter just doesn't show
  }
}

/* ---------- Deterministic aura background ---------- */
function hashStr(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  return Math.abs(h >>> 0);
}

/* Muted, near-monochrome tones — a background haze, not a colour wheel. */
const PALETTE = ['--tone-a', '--tone-b', '--tone-c', '--tone-d'];

export function paintAura(seed) {
  let host = document.getElementById('aura');
  if (!host) {
    host = document.createElement('div');
    host.id = 'aura';
    // Sibling of .world, never a child: .world is a containing block for
    // fixed positioning (it animates transform/filter), so a fixed
    // background nested inside it would scroll with the page.
    document.body.prepend(host);
  }
  host.innerHTML = '';
  const h = hashStr(seed || 'default');
  for (let i = 0; i < 3; i++) {
    const n = (h >> (i * 6)) & 0xff;
    const span = document.createElement('span');
    span.style.setProperty('--i', i);
    span.style.width = 260 + (n % 5) * 60 + 'px';
    span.style.height = span.style.width;
    span.style.top = (h >> (i * 3 + 2)) % 100 + '%';
    span.style.left = (h >> (i * 5 + 1)) % 100 + '%';
    span.style.background = `var(${PALETTE[(h + i) % PALETTE.length]})`;
    host.appendChild(span);
  }
}

/* ---------- Accent ----------
   Optional per-profile hex, used to tint the card. Falls back to a
   neutral near-black so an unset profile still looks deliberate. */
function applyAccent(hex) {
  if (!hex) return;
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return;
  const n = parseInt(m[1], 16);
  document.documentElement.style.setProperty(
    '--accent-rgb', `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
  );
}

/* ============================================================
   Background video

   Mounted at page load so it buffers while the visitor is still on the
   gate, but kept hidden: the gate shows the blurred poster instead, and
   the video only crossfades in once they've entered.
   ============================================================ */
export function mountBackground({ video: src, poster }) {
  const wrap = document.createElement('div');
  wrap.className = 'bg-media';

  if (poster) {
    const img = document.createElement('img');
    img.className = 'bg-poster';
    img.src = poster;
    img.alt = '';
    img.decoding = 'async';
    wrap.appendChild(img);
  }

  const video = document.createElement('video');
  video.muted = true;          // must be set before play() for autoplay
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;
  video.preload = 'auto';
  video.disablePictureInPicture = true;
  video.src = src;
  wrap.appendChild(video);

  // Sibling of .world — see the note in paintAura().
  document.body.prepend(wrap);

  video.play().catch(() => {});

  return {
    el: video,
    wrap,
    // Show the video only once there are real frames to show, so the
    // poster never cuts to a black rectangle.
    reveal() {
      // Muted autoplay is usually allowed, but not always (backgrounded
      // tab, strict settings, Low Power Mode). reveal() runs straight off
      // the gate click, so the page still has user activation here — this
      // is the reliable place to get a blocked video moving.
      if (video.paused) video.play().catch(() => {});

      const show = () => video.classList.add('visible');
      if (video.readyState >= 2) show();
      else video.addEventListener('loadeddata', show, { once: true });
    },
  };
}

/* ============================================================
   Audio

   The element is created at page load with preload="auto" so bytes are
   already in flight; play() waits for the gate click (browsers require
   a gesture). start() also mounts the player UI + analyser.
   ============================================================ */
export function createAudio(src, startVolume = 0.2) {
  const audio = new Audio();
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = startVolume;
  audio.src = src;
  audio.load();

  return {
    el: audio,
    start() {
      audio.play().catch(() => {});
      mountAudioUI(audio, startVolume);
    },
  };
}

function mountAudioUI(audio, startVolume) {
  const bar = document.createElement('div');
  bar.className = 'audio-control';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle sound');
  btn.innerHTML = SOUND_ICONS.on;

  const eq = document.createElement('div');
  eq.className = 'eq';
  const bars = [];
  for (let i = 0; i < 5; i++) {
    const b = document.createElement('i');
    eq.appendChild(b);
    bars.push(b);
  }

  const volWrap = document.createElement('div');
  volWrap.className = 'vol-wrap';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '1';
  slider.step = '0.01';
  slider.value = String(startVolume);
  slider.setAttribute('aria-label', 'Volume');
  volWrap.appendChild(slider);

  const setIcon = () => {
    btn.innerHTML = (audio.muted || audio.volume === 0) ? SOUND_ICONS.off : SOUND_ICONS.on;
  };
  btn.addEventListener('click', () => { audio.muted = !audio.muted; setIcon(); });
  slider.addEventListener('input', () => {
    audio.volume = parseFloat(slider.value);
    audio.muted = audio.volume === 0;
    setIcon();
  });

  bar.append(btn, eq, volWrap);
  document.body.appendChild(bar);

  attachAnalyser(audio, bars);
}

/* Drives the equaliser bars and the --beat variable that makes the
   avatar glow breathe in time with the music. */
function attachAnalyser(audio, bars) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx || REDUCED) return;

  let ctx, analyser, data;
  try {
    ctx = new Ctx();
    const source = ctx.createMediaElementSource(audio);
    analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.75;
    source.connect(analyser);
    analyser.connect(ctx.destination); // keep the audio audible
    data = new Uint8Array(analyser.frequencyBinCount);
  } catch {
    return; // no analyser is fine — the player still works
  }

  ctx.resume?.().catch(() => {});

  const root = document.documentElement;
  const tick = () => {
    requestAnimationFrame(tick);
    analyser.getByteFrequencyData(data);

    for (let i = 0; i < bars.length; i++) {
      bars[i].style.height = Math.max(10, (data[i * 2 + 1] / 255) * 100) + '%';
    }
    let bass = 0;
    for (let i = 0; i < 4; i++) bass += data[i];
    root.style.setProperty('--beat', (bass / 4 / 255).toFixed(3));
  };
  tick();
}

/* ============================================================
   Enter gate

   Deliberately not a solid panel: the scene sits behind it, blurred and
   dimmed, with nothing but the prompt on top.
   ============================================================ */
export function createEnterGate({ label = 'click to enter...' } = {}) {
  return new Promise((resolve) => {
    const gate = document.createElement('div');
    gate.className = 'enter-gate';
    gate.setAttribute('role', 'button');
    gate.tabIndex = 0;
    gate.setAttribute('aria-label', label);

    const text = document.createElement('div');
    text.className = 'enter-label';
    text.textContent = label;
    gate.appendChild(text);

    document.body.appendChild(gate);

    let entered = false;
    const enter = () => {
      if (entered) return;
      entered = true;

      document.body.classList.add('entered');
      gate.classList.add('hide');
      gate.addEventListener('transitionend', () => gate.remove(), { once: true });
      setTimeout(() => gate.remove(), 1400); // belt and braces

      resolve();
    };

    gate.addEventListener('click', enter);
    gate.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); }
    });
    setTimeout(() => gate.focus({ preventScroll: true }), 400);
  });
}

/* ============================================================
   Ambient flourishes
   ============================================================ */
export function mountAmbience() {
  const grain = document.createElement('div');
  grain.className = 'grain';
  document.body.appendChild(grain);

  if (REDUCED || matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  // lerp toward the pointer so the light trails rather than snaps
  let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf = 0;
  addEventListener('pointermove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    glow.classList.add('on');
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });

  function loop() {
    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) ? requestAnimationFrame(loop) : 0;
  }
}

/* Pointer-tracked 3D tilt + sheen. `strength` is the max tilt in degrees. */
function addTilt(el, strength = 9) {
  if (REDUCED || matchMedia('(hover: none)').matches) return;

  const apply = (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    el.style.transform =
      `perspective(900px) rotateY(${((px - 0.5) * strength * 2).toFixed(2)}deg) ` +
      `rotateX(${((0.5 - py) * strength * 2).toFixed(2)}deg) translateY(-6px)`;
  };
  const reset = () => { el.style.transform = ''; };

  el.addEventListener('pointermove', apply, { passive: true });
  el.addEventListener('pointerleave', reset, { passive: true });
}

/* Tilt has to wait for the entrance keyframes to finish, otherwise the
   inline transform fights the animation. */
function tiltWhenSettled(el, strength) {
  const arm = () => { el.classList.add('settled'); addTilt(el, strength); };
  if (REDUCED) { arm(); return; }
  el.addEventListener('animationend', arm, { once: true });
}

/* Fade the page out before navigating, so tile -> profile is a
   crossfade instead of a hard cut. */
function softNavigate(href) {
  if (REDUCED) { location.href = href; return; }
  document.body.classList.add('leaving');
  setTimeout(() => { location.href = href; }, 320);
}

/* ============================================================
   Rendering
   ============================================================ */
export function avatarNode(profile, className) {
  if (profile.avatar) {
    const img = document.createElement('img');
    img.src = profile.avatar;
    img.alt = profile.name;
    img.className = className;
    img.loading = 'eager';
    img.decoding = 'async';
    return img;
  }
  const div = document.createElement('div');
  div.className = className + ' initials';
  div.textContent = (profile.name || '?').trim().charAt(0).toUpperCase();
  return div;
}

/* ---------- Directory page ---------- */
export async function renderDirectory(grid) {
  let profiles;
  try {
    profiles = await loadProfiles();
  } catch (err) {
    grid.outerHTML = `<p class="empty-state">Couldn't load profiles.json — ${err.message}</p>`;
    return;
  }

  if (!profiles.length) {
    grid.outerHTML = '<p class="empty-state">No profiles yet — add one to profiles.json.</p>';
    return;
  }

  const frag = document.createDocumentFragment();
  profiles.forEach((p, i) => {
    const a = document.createElement('a');
    a.className = 'profile-tile';
    a.href = `/${p.slug}/`;
    a.style.setProperty('--i', i);

    a.appendChild(avatarNode(p, 'tile-avatar'));

    const name = document.createElement('div');
    name.className = 'tile-name';
    name.textContent = p.name;

    const slug = document.createElement('div');
    slug.className = 'tile-slug';
    slug.textContent = '/' + p.slug;

    a.append(name, slug);

    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      softNavigate(a.href);
    });

    tiltWhenSettled(a, 9);
    frag.appendChild(a);
  });
  grid.appendChild(frag);
}

/* Small drifting specks around the display name. Monochrome on purpose. */
function addSparkles(host, count = 14) {
  if (REDUCED) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('i');
    s.className = 'spark';
    s.style.left = (Math.random() * 116 - 8).toFixed(1) + '%';
    s.style.top = (Math.random() * 150 - 25).toFixed(1) + '%';
    s.style.setProperty('--d', (Math.random() * 3.5).toFixed(2) + 's');
    s.style.setProperty('--s', (0.4 + Math.random() * 0.9).toFixed(2));
    host.appendChild(s);
  }
}

/* ---------- Profile page ----------
   Every /<slug>/index.html calls this; the slug comes from the URL, so
   all the profile folders share one identical, tiny HTML file. */
export async function renderProfile(card) {
  const slug = location.pathname.split('/').filter(Boolean).pop();

  let profile;
  try {
    const profiles = await loadProfiles();
    profile = profiles.find(p => p.slug === slug);
  } catch (err) {
    card.innerHTML = `<p class="card-empty">Couldn't load profiles.json — ${err.message}</p>`;
    document.body.classList.add('no-gate');
    return;
  }

  if (!profile) {
    document.title = 'not found';
    document.body.classList.add('no-gate');
    paintAura(slug);
    card.innerHTML = `<p class="card-empty">No profile found for <code>/${slug}</code>.<br>Add an entry with that slug to <code>profiles.json</code>.</p>`;
    return;
  }

  document.title = profile.name;
  applyAccent(profile.accent);

  /* --- media starts buffering now, behind the gate --- */
  let bg = null;
  if (profile.video) {
    const poster = profile.poster || `/assets/posters/${profile.slug}.jpg`;
    bg = mountBackground({ video: profile.video, poster });
  } else {
    paintAura(profile.slug);
  }

  const audio = profile.audio ? createAudio(profile.audio, 0.5) : null;

  /* --- card contents --- */
  card.innerHTML = '';
  let i = 0;
  const add = (node) => {
    node.classList.add('reveal');
    node.style.setProperty('--i', i++);
    card.appendChild(node);
    return node;
  };

  const wrap = document.createElement('div');
  wrap.className = 'avatar-wrap';
  wrap.appendChild(avatarNode(profile, 'avatar'));
  add(wrap);

  const nameWrap = document.createElement('div');
  nameWrap.className = 'name-wrap';
  const name = document.createElement('h1');
  name.className = 'name';
  name.textContent = profile.name;
  nameWrap.appendChild(name);
  addSparkles(nameWrap);
  add(nameWrap);

  if (profile.bio) {
    const bio = document.createElement('p');
    bio.className = 'bio';
    bio.textContent = profile.bio;
    add(bio);
  }

  if (profile.username) {
    const uname = document.createElement('p');
    uname.className = 'username';
    uname.textContent = profile.username;
    add(uname);
  }

  if (profile.location) {
    const loc = document.createElement('p');
    loc.className = 'location';
    loc.innerHTML = PIN;
    loc.appendChild(document.createTextNode(profile.location));
    add(loc);
  }

  const links = document.createElement('div');
  links.className = 'links';
  for (const link of profile.links || []) {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = link.type;
    a.dataset.label = link.label || link.type;
    a.innerHTML = ICONS[link.type] || ICONS.website;
    links.appendChild(a);
  }
  add(links);

  const back = document.createElement('a');
  back.className = 'back-link reveal';
  back.href = '/';
  back.innerHTML = ARROW + '<span>all profiles</span>';
  back.style.setProperty('--i', i++);
  back.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    softNavigate('/');
  });
  card.appendChild(back);

  // View counter, tucked into the corner. Added only if the count
  // actually resolves, so a blocked request leaves no empty chrome.
  const views = document.createElement('div');
  views.className = 'card-views';
  views.innerHTML = EYE + '<span></span>';
  readViews(profile.slug).then((n) => {
    if (n == null) return;
    views.querySelector('span').textContent = n.toLocaleString();
    card.appendChild(views);
    requestAnimationFrame(() => views.classList.add('in'));
  });

  addTilt(card, 4);

  /* --- gate --- */
  await createEnterGate();
  bg?.reveal();
  audio?.start();
}

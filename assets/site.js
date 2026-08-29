// ---------- Icons ----------
// Generic, simple line/glyph icons keyed by "type" in profiles.json.
// Add more here any time — just reference the key from your JSON.
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

// ---------- Data ----------
export async function loadProfiles() {
  const res = await fetch('/profiles.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load profiles.json');
  return res.json();
}

// ---------- Deterministic aura background ----------
// Same seed (slug) always produces the same colored-blur arrangement,
// so every profile gets its own consistent visual signature for free.
function hashStr(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  return Math.abs(h >>> 0);
}

const PALETTE = ['--accent-a', '--accent-b', '--accent-c', '--accent-d'];

export function paintAura(seed) {
  const host = document.getElementById('aura');
  if (!host) return;
  host.innerHTML = '';
  const h = hashStr(seed || 'default');
  const blobCount = 3;
  for (let i = 0; i < blobCount; i++) {
    const n = (h >> (i * 6)) & 0xff;
    const span = document.createElement('span');
    const size = 260 + (n % 5) * 60;
    const top = (h >> (i * 3 + 2)) % 100;
    const left = (h >> (i * 5 + 1)) % 100;
    const color = `var(${PALETTE[(h + i) % PALETTE.length]})`;
    span.style.width = size + 'px';
    span.style.height = size + 'px';
    span.style.top = top + '%';
    span.style.left = left + '%';
    span.style.background = color;
    host.appendChild(span);
  }
}

// ---------- Video background ----------
// Drops a full-bleed, muted, looping video behind everything, with the
// same dark vignette treatment as the rest of the site. Call this INSTEAD
// of paintAura() when a profile has a video set.
export function setupBackgroundVideo(src) {
  const wrap = document.createElement('div');
  wrap.className = 'bg-video-wrap';

  const video = document.createElement('video');
  video.src = src;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;       // required by browsers for autoplay
  video.playsInline = true;
  video.preload = 'auto';

  wrap.appendChild(video);
  document.body.prepend(wrap);
}

// ---------- Audio control (music player) ----------
export const SOUND_ICONS = {
  on: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4Zm11.5 3a3.5 3.5 0 0 0-2-3.16v6.32A3.5 3.5 0 0 0 15.5 12Zm2 0a5.5 5.5 0 0 1-3.5 5.14v-2.1A3.48 3.48 0 0 0 16 12a3.48 3.48 0 0 0-2-3.04v-2.1A5.5 5.5 0 0 1 17.5 12Z"/></svg>',
  off: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4Zm11.7 3 2.15 2.15 1.06-1.06L16.76 12l2.15-2.15-1.06-1.06L15.7 10.94l-2.15-2.15-1.06 1.06L14.64 12l-2.15 2.15 1.06 1.06L15.7 13.06Z"/></svg>',
};

// Adds a small floating player (top-right) with a mute toggle + volume
// slider, and starts the track playing. Browsers block audio with sound
// from autoplaying before any user interaction, so if that happens this
// quietly waits for the first click anywhere on the page and starts then.
export function setupAudioControl(src, startVolume = 0.5) {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = startVolume;

  const attemptPlay = () => audio.play().catch(() => {});
  attemptPlay();

  const resumeOnInteraction = () => {
    attemptPlay();
    document.removeEventListener('click', resumeOnInteraction);
  };
  document.addEventListener('click', resumeOnInteraction);

  const bar = document.createElement('div');
  bar.className = 'audio-control';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle sound');
  btn.innerHTML = SOUND_ICONS.on;

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '1';
  slider.step = '0.01';
  slider.value = String(startVolume);

  const setIcon = () => {
    btn.innerHTML = (audio.muted || audio.volume === 0) ? SOUND_ICONS.off : SOUND_ICONS.on;
  };

  btn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    setIcon();
  });

  slider.addEventListener('input', () => {
    audio.volume = parseFloat(slider.value);
    audio.muted = audio.volume === 0;
    setIcon();
  });

  bar.appendChild(btn);
  bar.appendChild(slider);
  document.body.appendChild(bar);
}

// Renders an avatar: uses the image if `avatar` is set, otherwise falls
// back to a colored initial so a profile looks good with zero assets.
export function avatarNode(profile, className) {
  if (profile.avatar) {
    const img = document.createElement('img');
    img.src = profile.avatar;
    img.alt = profile.name;
    img.className = className;
    return img;
  }
  const div = document.createElement('div');
  div.className = className + ' initials';
  div.textContent = (profile.name || '?').trim().charAt(0).toUpperCase();
  div.style.background = `var(${PALETTE[hashStr(profile.slug) % PALETTE.length]})`;
  return div;
}

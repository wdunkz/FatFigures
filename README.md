# Profile directory site

- `/` → directory page, auto-lists every profile as a clickable tile
- `/dunks/`, `/zai/` → individual profile cards

Every page opens with a click-to-enter gate. That gate is not just
decoration: browsers refuse to play audio until the visitor interacts with
the page. It shows the real scene behind it, blurred and dimmed, with
nothing on top but the prompt.

It also doubles as a loading screen. The background video and music start
buffering the moment the page loads, *behind* the gate, while the gate
displays the video's poster frame blurred. On click the blur lifts, the
video crossfades in over the poster and the music starts — so entering is
instant instead of dropping onto a black screen and waiting.

## Edit an existing profile

Open **`profiles.json`** and change any field:

```json
{
  "slug": "dunks",
  "name": "mel",
  "username": "@chungusmaxxer",
  "bio": "Check check, this is mel.",
  "location": "Somewhere, London",
  "accent": "#152B2A",
  "avatar": "",
  "links": [
    { "type": "bluesky", "url": "https://bsky.app/profile/example" }
  ]
}
```

**`bio` and `location` ship empty** — fill them in and the card fleshes out
into the full layout (name → bio → location → links). Any field left as
`""` is simply skipped, so a sparse profile still looks deliberate rather
than broken.

- `bio`: one line under the name. Keep it short; it's the focal text.
- `location`: shown with a map-pin icon. Free text — "Somewhere, London" is
  as valid as a real place.
- `accent`: hex colour used to tint that profile's card. Pick something
  pulled from the background video and it reads as one piece; the defaults
  here are sampled from each person's own footage (`#152B2A` cold slate for
  the dark room, `#0E2340` navy for the Beat Saber clip). Omit it and the
  card falls back to a neutral near-black.
- `avatar`: leave `""` to auto-show an initial, or set a path like
  `"/assets/avatars/mel.png"` (drop the image file into `assets/avatars/`).
- `video`: leave `""` for the generated aura background, or set a path like
  `"/assets/videos/mel.mp4"` to play a full-screen looping video behind the
  card (drop the `.mp4` into `assets/videos/`). Always muted — it's purely a
  visual background. **Run it through `tools/optimize-media.sh` first**, see
  below.
- `poster`: optional. Defaults to `/assets/posters/<slug>.jpg`, which
  `tools/optimize-media.sh` generates for you. This still frame paints
  instantly on load and the video crossfades over it once it can play, so
  the background is never a black rectangle.
- `audio`: leave `""` for no music, or set a path like
  `"/assets/audio/mel.mp3"` (drop the `.mp3` into `assets/audio/`). It starts
  when the visitor clicks through the enter gate. A mute button, a live
  equaliser and a volume slider (slides out on hover) appear top-right.
- `links[].type`: one of `website, steam, youtube, twitter, bluesky,
  instagram, twitch, discord, tiktok, github`. Want another platform? Add a
  new SVG to the `ICONS` object at the top of `assets/site.js`, then use that
  key here.
- `links[].label`: optional. Overrides the text in the hover tooltip, which
  otherwise just shows the `type`.

That's it — no HTML edits needed to change names, handles, avatars, or links.

## View counts

Each profile card shows a view count in its bottom-left corner. A static
site can't count anything by itself, so this calls out to
[abacus](https://abacus.jasoncameron.dev) — a free, no-signup, CORS-open
counter keyed by profile slug. Worth knowing:

- It's a third party. Visitors' browsers hit `abacus.jasoncameron.dev` on
  every profile view. Nothing personal is sent — just the slug — but it is
  an external request.
- Counted once per browser session per profile, so refreshing doesn't
  inflate the number.
- If the request fails (offline, blocked, service down) the counter simply
  doesn't render. Nothing breaks and no empty chrome is left behind.
- The numbers start from zero and are public — anyone who guesses the
  namespace can read or bump them. Fine for a vanity counter, not a metric
  to trust.

To point it somewhere else, change `VIEWS_HOST` / `VIEWS_NAMESPACE` near the
top of `assets/site.js`. Any endpoint returning `{"value": N}` works. To drop
view counts entirely, delete the `readViews(...)` block in `renderProfile()`.

## Add a new profile (e.g. `/dunk3`)

1. Duplicate the `dunks` folder → rename it `dunk3`. Nothing inside needs
   editing; the page detects its own slug from the URL and renders itself
   from `profiles.json`. (Optionally update the `<title>` and the two
   `rel="preload"` paths in its `index.html` to match the new slug — those
   are only a speed hint, the page works without touching them.)
2. Add a matching object to `profiles.json`:
   ```json
   { "slug": "dunk3", "name": "...", "username": "...", "avatar": "", "links": [] }
   ```
3. Done. It'll appear on `/` automatically and live at `/dunk3/`.

## Compress background videos (important)

Raw phone / screen-capture MP4s are far too heavy to sit in front of a
visitor — the originals in this repo were 69 MB and 84 MB, which is what
made the site take so long to show anything. Before committing a new
background video:

```bash
bash tools/optimize-media.sh
```

That re-encodes every `assets/videos/*.mp4` in place to 720p / 24fps H.264,
strips the unused audio track, moves the MP4 index to the front of the file
so playback can start before the download finishes, and writes a matching
poster frame to `assets/posters/`. Pass names to do only some of them:

```bash
bash tools/optimize-media.sh zai main-bg
```

It needs `ffmpeg` on your PATH. Tune with `CRF=28 bash tools/optimize-media.sh`
for higher quality, or `CRF=34` for smaller files — the video sits behind
darkened glass, so it can take a lot of compression before anyone notices.

Running it twice on the same file re-compresses it, so keep your originals
somewhere if you want to re-encode at a different quality later.

## How the front-end is put together

- `assets/site.js` — everything: icons, data loading, the enter gate, the
  video/audio setup, and the two page renderers (`renderDirectory`,
  `renderProfile`). The profile folders each contain the same ~40-line
  `index.html` that just calls `renderProfile()`.
- `assets/style.css` — all styling. Colours and the shared easing curve are
  CSS variables at the top.
- Motion respects `prefers-reduced-motion`: animations, the pointer tilt,
  the cursor glow and the page-transition fades all switch off for visitors
  who ask for that.

## Deploy on GitHub Pages with your domain

1. Push this whole folder to a GitHub repo (this content at the repo root).
2. Repo → Settings → Pages → set source to the `main` branch, root folder.
3. Add a file named `CNAME` at the repo root containing just your domain,
   e.g. `example.com`.
4. At your registrar, point DNS at GitHub:
   - Apex (`example.com`): four `A` records → `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: `CNAME` → `yourname.github.io`
5. In Settings → Pages, enter your custom domain and enable "Enforce HTTPS"
   once it's available.

Note: the pages fetch `/profiles.json` and `/assets/...` from the site root
(absolute paths), which is why this only works cleanly once it's on your
real domain root (or GitHub's own `username.github.io` root) — not inside a
`/reponame/` subpath.

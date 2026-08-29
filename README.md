# Profile directory site

- `/` → directory page, auto-lists every profile as a clickable tile
- `/dunks/`, `/dunk2/` → individual profile cards

## Edit an existing profile

Open **`profiles.json`** and change any field:

```json
{
  "slug": "dunks",
  "name": "mel",
  "username": "@chungusmaxxer",
  "avatar": "",
  "links": [
    { "type": "bluesky", "url": "https://bsky.app/profile/example" }
  ]
}
```

- `avatar`: leave `""` to auto-show a colored initial, or set a path like
  `"assets/avatars/mel.png"` (drop the image file into `assets/avatars/`).
- `video`: leave `""` for the normal generated aura background, or set a
  path like `"/assets/videos/mel.mp4"` to play a full-screen looping video
  behind the card instead (drop the `.mp4` into `assets/videos/`). The
  video is always muted — it's just a visual background.
- `audio`: leave `""` for no music, or set a path like
  `"/assets/audio/mel.mp3"` (drop the `.mp3` into `assets/audio/`) to play
  looping music while that profile page is open. A small mute button +
  volume slider appears in the top-right automatically. Browsers block
  audio with sound from autoplaying until the visitor interacts with the
  page at least once — if that happens, the track just starts on their
  first click anywhere on the page, which is normal and expected.
- `links[].type`: one of `website, steam, youtube, twitter, bluesky,
  instagram, twitch, discord, tiktok, github`. Want another platform? Add a
  new SVG to the `ICONS` object at the top of `assets/site.js`, then use that
  key here.

That's it — no HTML edits needed to change names, handles, avatars, or links.

## Add a new profile (e.g. `/dunk3`)

1. Duplicate the `dunks` folder → rename it `dunk3` (it already contains the
   right `index.html`, nothing inside needs editing — it detects its own
   slug from the URL).
2. Add a matching object to `profiles.json`:
   ```json
   { "slug": "dunk3", "name": "...", "username": "...", "avatar": "", "links": [] }
   ```
3. Done. It'll now appear on `/` automatically and live at `/dunk3/`.

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

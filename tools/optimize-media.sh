#!/usr/bin/env bash
#
# Re-encode background videos for the web and generate their poster frames.
#
#   bash tools/optimize-media.sh                # every video in assets/videos
#   bash tools/optimize-media.sh zai main-bg    # just these
#
# Why this exists: phone-camera and screen-capture MP4s are enormous
# (one of the originals here was 84 MB of 18 Mbps 1080p for a 35-second
# clip). They are used as a darkened, blurred-behind-glass background, so
# 720p at a modest bitrate is visually identical and roughly 20x smaller.
#
# Requires ffmpeg on PATH.

set -euo pipefail

cd "$(dirname "$0")/.."

VID_DIR="assets/videos"
POSTER_DIR="assets/posters"
mkdir -p "$POSTER_DIR"

# Quality knobs. Higher CRF = smaller + softer. 28-32 is a sane range here.
CRF="${CRF:-31}"
HEIGHT="${HEIGHT:-720}"
FPS="${FPS:-24}"

if [ "$#" -gt 0 ]; then
  names=("$@")
else
  names=()
  for f in "$VID_DIR"/*.mp4; do
    [ -e "$f" ] || continue
    base="$(basename "$f" .mp4)"
    names+=("$base")
  done
fi

for name in "${names[@]}"; do
  src="$VID_DIR/$name.mp4"
  if [ ! -f "$src" ]; then
    echo "!! $src not found, skipping" >&2
    continue
  fi

  before=$(wc -c < "$src")
  tmp="$VID_DIR/$name.opt.mp4"

  echo ">> encoding $name"
  # -an: the background is always muted, so the audio track is dead weight.
  # +faststart: moves the moov atom to the front so playback can begin
  # before the whole file has downloaded.
  # min(HEIGHT,ih) so a source that is already smaller is never upscaled —
  # upscaling would cost bitrate for no visible gain.
  ffmpeg -y -v error -i "$src" \
    -an \
    -vf "scale=-2:'min($HEIGHT,ih)':flags=lanczos,fps=$FPS" \
    -c:v libx264 -preset slow -crf "$CRF" -profile:v high -level 4.0 \
    -pix_fmt yuv420p -movflags +faststart -g $((FPS * 2)) \
    "$tmp"

  echo ">> poster $name"
  ffmpeg -y -v error -ss 0.5 -i "$src" -frames:v 1 \
    -vf "scale=-2:360:flags=lanczos" -q:v 6 "$POSTER_DIR/$name.jpg"

  after=$(wc -c < "$tmp")
  mv -f "$tmp" "$src"

  awk -v b="$before" -v a="$after" -v n="$name" \
    'BEGIN { printf "   %s: %.1f MB -> %.1f MB (%.0f%% smaller)\n", n, b/1048576, a/1048576, (1-a/b)*100 }'
done

echo "done."

#!/usr/bin/env bash
# Second pass — use Wikipedia's MediaWiki pageimages API + Commons API
# for cars the REST summary didn't cover.

set -u
PUBLIC="$(dirname "$0")/../public/cars"

# Slug | candidate page titles to try (comma-separated)
CARS=(
  "ertiga|Suzuki_Ertiga,Maruti_Suzuki_Ertiga"
  "aura|Hyundai_Aura"
  "venue|Hyundai_Venue"
  "creta|Hyundai_Creta"
  "alcazar|Hyundai_Alcazar"
  "sonet|Kia_Sonet"
  "carens|Kia_Carens"
  "thar|Mahindra_Thar"
  "thar-convertible|Mahindra_Thar"
  "thar-roxx|Mahindra_Thar_Roxx"
  "scorpio|Mahindra_Scorpio"
  "scorpio-n|Mahindra_Scorpio-N"
  "xuv-300|Mahindra_XUV300,Mahindra_XUV_300"
  "xuv-700|Mahindra_XUV700"
  "bolero-neo|Mahindra_Bolero"
  "tigor|Tata_Tigor"
  "fortuner|Toyota_Fortuner"
  "innova-crysta|Toyota_Innova"
  "hector|MG_Hector"
  "mini-cooper|Mini_Convertible,Mini_Cooper_S,Mini_(BMW)"
  "audi-a3|Audi_A3"
)

UA="Mozilla/5.0 (compatible; FastRentalSeedBot/1.0)"

fetch_image() {
  local title="$1"
  # Try MediaWiki pageimages API (works for ALL pages that have any image)
  local json
  json=$(curl -sL -A "$UA" "https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=1600&redirects=1")
  local url
  url=$(echo "$json" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    pages = d['query']['pages']
    for k, v in pages.items():
        if 'thumbnail' in v:
            print(v['thumbnail']['source'])
            break
except Exception as e:
    pass
" 2>/dev/null)
  echo "$url"
}

DOWNLOADED=0
echo "Second-pass downloads…"
for entry in "${CARS[@]}"; do
  slug="${entry%%|*}"
  titles="${entry#*|}"

  # Skip if we already have a primary image for this slug
  if [ -s "$PUBLIC/${slug}-1.jpg" ]; then
    echo "  · $slug already has photo"
    continue
  fi

  url=""
  IFS=',' read -ra TITLE_ARR <<< "$titles"
  for t in "${TITLE_ARR[@]}"; do
    url=$(fetch_image "$t")
    [ -n "$url" ] && break
  done

  if [ -z "$url" ]; then
    echo "  ✗ $slug — no image found via pageimages"
    continue
  fi

  out="$PUBLIC/${slug}-1.jpg"
  if curl -sL -A "$UA" --max-filesize 8000000 --max-time 30 --fail "$url" -o "$out" \
     && [ -s "$out" ] \
     && file "$out" | grep -qE "JPEG|PNG|WebP"; then
    echo "  ✓ $slug ← $(basename "$url" | head -c 50)…"
    cp "$out" "$PUBLIC/${slug}-2.jpg"
    DOWNLOADED=$((DOWNLOADED + 1))
  else
    rm -f "$out"
    echo "  ✗ $slug — download failed"
  fi
done

echo ""
echo "Second pass: $DOWNLOADED new photos"
echo "Total JPGs: $(ls -1 $PUBLIC/*.jpg 2>/dev/null | wc -l)"

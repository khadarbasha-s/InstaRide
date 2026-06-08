#!/usr/bin/env bash
# Downloads real car photos from Wikipedia / Wikimedia Commons.
# Each car is stored as public/cars/<slug>-1.jpg (primary) and -2.jpg (variant if available).
# Falls back to retaining the existing SVG if no Wikipedia image found.

set -u
PUBLIC="$(dirname "$0")/../public/cars"
mkdir -p "$PUBLIC"

# slug | Wikipedia page title (URL-encoded with _)
CARS=(
  "swift|Maruti_Suzuki_Swift"
  "baleno|Maruti_Suzuki_Baleno"
  "dzire|Maruti_Suzuki_Dzire"
  "ertiga|Maruti_Suzuki_Ertiga"
  "xl6|Maruti_Suzuki_XL6"
  "fronx|Maruti_Suzuki_Fronx"
  "jimny|Suzuki_Jimny"
  "ignis|Maruti_Suzuki_Ignis"
  "alto|Maruti_Alto"
  "brezza|Maruti_Suzuki_Brezza"
  "vitara-brezza|Maruti_Suzuki_Vitara_Brezza"
  "glanza|Toyota_Glanza"
  "i20|Hyundai_i20"
  "i10-nios|Hyundai_Grand_i10_Nios"
  "aura|Hyundai_Aura"
  "venue|Hyundai_Venue"
  "creta|Hyundai_Creta"
  "alcazar|Hyundai_Alcazar"
  "sonet|Kia_Sonet"
  "seltos|Kia_Seltos"
  "carens|Kia_Carens"
  "thar|Mahindra_Thar"
  "thar-convertible|Mahindra_Thar"
  "thar-roxx|Mahindra_Thar_Roxx"
  "scorpio|Mahindra_Scorpio"
  "scorpio-n|Mahindra_Scorpio-N"
  "xuv-300|Mahindra_XUV_300"
  "xuv-700|Mahindra_XUV700"
  "bolero-neo|Mahindra_Bolero"
  "tigor|Tata_Tigor"
  "punch|Tata_Punch"
  "altroz|Tata_Altroz"
  "fortuner|Toyota_Fortuner"
  "innova-crysta|Toyota_Innova"
  "innova-hycross|Toyota_Innova_Hycross"
  "hector|MG_Hector"
  "mini-cooper|Mini_Convertible"
  "audi-a3|Audi_A3"
)

UA="Mozilla/5.0 (compatible; FastRentalSeedBot/1.0)"

# 1) Fetch the JSON summaries — capture original image URLs
declare -A IMG
echo "Querying Wikipedia for image URLs…"
for entry in "${CARS[@]}"; do
  slug="${entry%%|*}"
  page="${entry#*|}"
  url=$(curl -sL -A "$UA" "https://en.wikipedia.org/api/rest_v1/page/summary/${page}" \
        | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('originalimage',{}).get('source') or d.get('thumbnail',{}).get('source') or '')" 2>/dev/null)
  if [ -n "$url" ]; then
    IMG["$slug"]="$url"
    echo "  ✓ $slug → $(basename "$url" | head -c 60)…"
  else
    echo "  ✗ $slug → no image"
  fi
done

echo ""
echo "Downloading images…"
DOWNLOADED=0
for slug in "${!IMG[@]}"; do
  url="${IMG[$slug]}"
  for n in 1 2; do
    out="$PUBLIC/${slug}-${n}.jpg"
    # For variant -2, try a /thumb/ resized version if available (smaller crop)
    if [ "$n" = "2" ]; then
      # Use a thumb 1600px wide URL if possible
      if [[ "$url" == *"/thumb/"* ]]; then
        target="$url"   # already a thumb
      else
        # build a 1600px thumb URL from the original
        target=$(echo "$url" | sed -E 's|/commons/([^/]+)/([^/]+)/([^/]+)$|/commons/thumb/\1/\2/\3/1600px-\3|')
      fi
    else
      target="$url"
    fi
    if curl -sL -A "$UA" --max-filesize 8000000 --max-time 30 --fail "$target" -o "$out" && [ -s "$out" ]; then
      # Verify it's a real image
      if file "$out" | grep -qE "JPEG|PNG|WebP"; then
        DOWNLOADED=$((DOWNLOADED + 1))
      else
        rm -f "$out"
        echo "  ✗ $slug-$n bad file"
      fi
    else
      rm -f "$out"
    fi
  done
done

echo ""
echo "Downloaded $DOWNLOADED car images to $PUBLIC"
echo "Final file list:"
ls -1 "$PUBLIC"/*.jpg 2>/dev/null | wc -l
echo "JPGs total"

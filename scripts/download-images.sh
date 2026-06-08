#!/usr/bin/env bash
# Download stock images for FastRental seed.
# These are public Unsplash CDN URLs (no auth required).
# Real production photos should replace these via admin upload.

set -e
PUBLIC="$(dirname "$0")/../public"
mkdir -p "$PUBLIC/cars" "$PUBLIC/locations" "$PUBLIC/hero" "$PUBLIC/blog"

dl() {
  local url=$1
  local out=$2
  if [ -f "$out" ]; then
    echo "skip  $out (exists)"
    return
  fi
  echo "fetch $out"
  curl -sL --fail "$url" -o "$out" || { echo "FAIL  $url"; rm -f "$out"; }
}

# Hero (homepage)
dl "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/hero/hero-suv.jpg"

# Cars — multiple angles per car. Some share base images by category for v1.
# Hatchbacks
dl "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/swift-1.jpg"
dl "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/swift-2.jpg"
dl "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/baleno-1.jpg"
dl "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/baleno-2.jpg"
dl "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/i20-1.jpg"
dl "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/i20-2.jpg"

# Sedans
dl "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/dzire-1.jpg"
dl "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/dzire-2.jpg"

# MPVs
dl "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/ertiga-1.jpg"
dl "https://images.unsplash.com/photo-1609520505218-7421df17a51e?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/ertiga-2.jpg"
dl "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/xl6-1.jpg"
dl "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/xl6-2.jpg"

# Compact SUVs
dl "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/venue-1.jpg"
dl "https://images.unsplash.com/photo-1583356322882-85559b912097?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/venue-2.jpg"
dl "https://images.unsplash.com/photo-1622390532898-4948c84d59cd?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/fronx-1.jpg"
dl "https://images.unsplash.com/photo-1543854704-783ee1d2ad3a?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/fronx-2.jpg"
dl "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/sonet-1.jpg"
dl "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/sonet-2.jpg"

# SUVs
dl "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/creta-1.jpg"
dl "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/creta-2.jpg"
dl "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/alcazar-1.jpg"
dl "https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/alcazar-2.jpg"

# Off-Road / Thar
dl "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/thar-1.jpg"
dl "https://images.unsplash.com/photo-1605731414532-6b26976cc153?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/thar-2.jpg"
dl "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/thar-3.jpg"
dl "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/jimny-1.jpg"
dl "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/jimny-2.jpg"
dl "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/thar-roxx-1.jpg"
dl "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/cars/thar-roxx-2.jpg"

# Goa locations
dl "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/locations/goa.jpg"
dl "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/locations/calangute.jpg"
dl "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/locations/baga.jpg"
dl "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/locations/candolim.jpg"
dl "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/locations/anjuna.jpg"
dl "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/locations/vagator.jpg"
dl "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/locations/porvorim.jpg"
dl "https://images.unsplash.com/photo-1599661046827-dacde6976549?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/locations/jaipur.jpg"
dl "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/locations/chandigarh.jpg"

# Blog covers
dl "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/blog/places-goa.jpg"
dl "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/blog/thar-guide.jpg"
dl "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=85&fm=jpg&auto=format&fit=crop" "$PUBLIC/blog/documents.jpg"

echo ""
echo "Done. Files in $PUBLIC:"
ls -lh "$PUBLIC/cars" "$PUBLIC/hero" "$PUBLIC/locations" "$PUBLIC/blog" 2>/dev/null | head -60

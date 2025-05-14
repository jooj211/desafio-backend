#!/usr/bin/env bash
set -euo pipefail

#––– Ensure Plants Exist –––#
echo "→ Creating Plant 1…"
curl -s -i -X POST http://localhost:3000/plants \
  -H "Content-Type: application/json" \
  -d '{ "name": "Plant 1", "localization": "Location 1" }'
echo; echo

echo "→ Creating Plant 2…"
curl -s -i -X POST http://localhost:3000/plants \
  -H "Content-Type: application/json" \
  -d '{ "name": "Plant 2", "localization": "Location 2" }'
echo; echo

#––– Create Inverters 1–4 on Plant 1 –––#
for i in {1..4}; do
  echo "→ Creating Inverter $i for Plant 1…"
  curl -s -i -X POST http://localhost:3000/inverters \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Inv-$i\", \"model\": \"Model-$i\", \"plantId\": 1}"
  echo
done
echo

#––– Create Inverters 5–8 on Plant 2 –––#
for i in {5..8}; do
  echo "→ Creating Inverter $i for Plant 2…"
  curl -s -i -X POST http://localhost:3000/inverters \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Inv-$i\", \"model\": \"Model-$i\", \"plantId\": 2}"
  echo
done

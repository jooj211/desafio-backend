#!/usr/bin/env bash
set -euo pipefail

#––– Seed a Plant and an Inverter –––#
echo "→ Creating Plant…"
curl -s -i -X POST http://localhost:3000/plants \
  -H "Content-Type: application/json" \
  -d '{ "name": "Curl Test Plant", "localization": "Testville" }'
echo; echo

echo "→ Creating Inverter…"
curl -s -i -X POST http://localhost:3000/inverters \
  -H "Content-Type: application/json" \
  -d '{ "name": "Curl-Inv-1", "model": "Model-C", "plantId": 1 }'
echo; echo

#––– Seed some Readings –––#
echo "→ Creating Readings…"
curl -s -i -X POST http://localhost:3000/metrics/readings \
  -H "Content-Type: application/json" \
  -d '{ "timestamp": "2025-05-01T08:00:00Z", "power": 100, "temperature": 20, "inverterId": 1 }'
echo
curl -s -i -X POST http://localhost:3000/metrics/readings \
  -H "Content-Type: application/json" \
  -d '{ "timestamp": "2025-05-01T12:00:00Z", "power": 150, "temperature": 22, "inverterId": 1 }'
echo
curl -s -i -X POST http://localhost:3000/metrics/readings \
  -H "Content-Type: application/json" \
  -d '{ "timestamp": "2025-05-02T10:00:00Z", "power": 200, "temperature": 25, "inverterId": 1 }'
echo; echo

#––– Aggregations –––#
START=2025-05-01
END=2025-05-02
INV=1
PLANT=1

echo "→ MAX POWER per day:"
curl -s -i "http://localhost:3000/metrics/max-power?inverter_id=${INV}&start_date=${START}&end_date=${END}"
echo; echo

echo "→ AVG TEMPERATURE per day:"
curl -s -i "http://localhost:3000/metrics/avg-temperature?inverter_id=${INV}&start_date=${START}&end_date=${END}"
echo; echo

echo "→ GENERATION by PLANT per day:"
curl -s -i "http://localhost:3000/metrics/generation/plant?plant_id=${PLANT}&start_date=${START}&end_date=${END}"
echo; echo

echo "→ GENERATION by INVERTER per day:"
curl -s -i "http://localhost:3000/metrics/generation/inverter?inverter_id=${INV}&start_date=${START}&end_date=${END}"
echo

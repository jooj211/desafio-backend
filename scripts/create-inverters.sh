#!/usr/bin/env bash
set -euo pipefail

# Start NestJS server in background
npm run start:dev > /dev/null 2>&1 &
SERVER_PID=$!

echo "Servidor iniciado (PID: $SERVER_PID). Aguardando disponibilidade..."

# Wait for server to respond on port 3000
until curl -s http://localhost:3000 > /dev/null; do
  sleep 1
done

echo "Servidor disponível. Criando usinas e inversores..."

# Create Plant 1
curl -s -X POST http://localhost:3000/plants \
  -H "Content-Type: application/json" \
  -d '{"name":"Plant 1","localization":"Location 1"}'

# Create Plant 2
curl -s -X POST http://localhost:3000/plants \
  -H "Content-Type: application/json" \
  -d '{"name":"Plant 2","localization":"Location 2"}'

# Create Inverters 1–4 for Plant 1
for i in {1..4}; do
  curl -s -X POST http://localhost:3000/inverters \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Inv-$i\", \"model\": \"Model-$i\", \"plantId\": 1}"
  echo " → Inversor $i criado para Plant 1"
done

# Create Inverters 5–8 for Plant 2
for i in {5..8}; do
  curl -s -X POST http://localhost:3000/inverters \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Inv-$i\", \"model\": \"Model-$i\", \"plantId\": 2}"
  echo " → Inversor $i criado para Plant 2"
done

echo "Criação de inversores concluída."

# Shut down the server
kill $SERVER_PID
echo "Servidor parado (PID: $SERVER_PID)."
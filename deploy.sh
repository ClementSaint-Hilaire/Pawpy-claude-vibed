#!/bin/bash

VPS=$1

if [ -z "$VPS" ]; then
    echo "Usage: ./deploy.sh username@vps-ip"
    exit 1
fi

echo "🔨 Building frontend locally..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not found"
    exit 1
fi

echo "📦 Transferring files to $VPS..."
rsync -avz --progress \
    --delete \
    --exclude '.git' \
    --exclude '.gitignore' \
    --exclude 'node_modules' \
    --exclude '.DS_Store' \
    dist \
    nginx.conf \
    Dockerfile \
    compose.yml \
    $VPS:../home/clement/pawpy-beta/

echo "🐳 Deploying on VPS..."
ssh $VPS << 'ENDSSH'
cd ../clement/pawpy-beta
docker network create web 2>/dev/null || true
docker compose down
docker compose up -d --build
echo "✅ Deployment complete!"
docker compose ps
ENDSSH

echo "🎉 Done! Your app should be running at https://beta.pawpy.fr"
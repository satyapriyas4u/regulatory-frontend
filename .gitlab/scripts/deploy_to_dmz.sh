#!/bin/bash

# === CONFIGURATION (from GitLab CI/CD variables) ===
SSH_USER="$SSH_USER"
SSH_HOST="$SSH_HOST"
SSH_PORT="$SSH_PORT"
SSH_TARGET="$SSH_USER@$SSH_HOST"
REMOTE_DIR="/home/$SSH_USER/regulatory-deploy"
IMAGE_NAME="regulatory-frontend"
TARBALL="regulatory-frontend.tar.gz"
COMPOSE_FILE="docker-compose.yml"

# === LOCAL CLEANUP (if rerun) ===
echo "🧹 Cleaning up local Docker artifacts (if any)..."
docker stop $(docker ps -aq --filter ancestor=$IMAGE_NAME) 2>/dev/null || true
docker rm $(docker ps -aq --filter ancestor=$IMAGE_NAME) 2>/dev/null || true
docker rmi $IMAGE_NAME 2>/dev/null || true
rm -f $TARBALL

# === BUILD AND PACKAGE ===
echo "📦 [1/6] Building Docker image..."
docker compose build

echo "🐳 [2/6] Saving image to tarball..."
docker save "$IMAGE_NAME" | gzip > "$TARBALL"

# === REMOTE SETUP ===
echo "📤 [3/6] Preparing remote server..."
ssh -p "$SSH_PORT" "$SSH_TARGET" << EOF
  echo "🔧 Creating deployment directory if it doesn't exist..."
  mkdir -p "$REMOTE_DIR"

  cd "$REMOTE_DIR"

  echo "🧹 Cleaning up old tarball if it exists..."
  [ -f "$TARBALL" ] && rm -f "$TARBALL" && echo "✅ Removed old $TARBALL" || echo "ℹ️ No old $TARBALL found"

  echo "🧹 Cleaning up extracted tar (uncompressed) if it exists..."
  [ -f "${TARBALL%.gz}" ] && rm -f "${TARBALL%.gz}" && echo "✅ Removed uncompressed tar file" || echo "ℹ️ No uncompressed tar file found"

  echo "🧼 Stopping running container if it exists..."
  docker ps -q -f name=$IMAGE_NAME | grep -q . && docker stop $IMAGE_NAME && echo "✅ Stopped container $IMAGE_NAME" || echo "ℹ️ No running container named $IMAGE_NAME"

  echo "🧽 Removing old container if it exists..."
  docker ps -a -q -f name=$IMAGE_NAME | grep -q . && docker rm $IMAGE_NAME && echo "✅ Removed container $IMAGE_NAME" || echo "ℹ️ No stopped container named $IMAGE_NAME"

  echo "🧼 Removing Docker image if it exists..."
  docker images -q $IMAGE_NAME | grep -q . && docker rmi $IMAGE_NAME && echo "✅ Removed image $IMAGE_NAME" || echo "ℹ️ No image named $IMAGE_NAME"
EOF

# === TRANSFER FILES ===
echo "📁 [4/6] Transferring files to DMZ..."
scp -P "$SSH_PORT" "$TARBALL" "$COMPOSE_FILE" "$SSH_TARGET:$REMOTE_DIR/"

# === REMOTE DEPLOYMENT ===
echo "📥 [5/6] Deploying on remote server..."
ssh -p "$SSH_PORT" "$SSH_TARGET" << EOF
  cd "$REMOTE_DIR"
  echo "📂 Unpacking image..."
  gunzip -f "$TARBALL"

  echo "🧼 Stopping and removing existing containers/images..."
  docker compose down || true
  docker load < "${TARBALL%.gz}"

  echo "🚀 Starting updated container..."
  docker compose up -d
EOF

# === LOCAL CLEANUP ===
echo "🧹 [6/6] Cleaning up local tarball..."
rm -f "$TARBALL"

# === DONE ===
echo "✅ Deployment to DMZ complete! Visit: https://regulatory.nuvoai.io"

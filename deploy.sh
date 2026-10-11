#!/usr/bin/env bash
# ─── deploy.sh : déploiement du portfolio (version macOS / Linux / WSL) ──────
# Équivalent de deploy.ps1. Voir DEPLOIEMENT.md.
#
#   bash deploy.sh                       # mise à jour
#   WITH_ENV=1 bash deploy.sh            # envoie aussi backend/.env
#   KEEP_SERVER_DATA=1 bash deploy.sh    # n'écrase pas src/data sur le serveur
#   SERVER=user@hote REMOTE_DIR=/chemin bash deploy.sh

set -euo pipefail

SERVER="${SERVER:-root@atlasentinel.fr}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/portfolio}"
ARCHIVE="$(mktemp -t portfolio-deploy.XXXXXX).tgz"

cd "$(dirname "$0")"

EXCLUDES=(--exclude=node_modules --exclude=build --exclude=.git --exclude='*.log')
[[ "${WITH_ENV:-0}" == "1" ]] || EXCLUDES+=(--exclude=backend/.env)
[[ "${KEEP_SERVER_DATA:-0}" == "1" ]] && EXCLUDES+=(--exclude=src/data)

echo "1/3  Préparation de l'archive..."
tar -czf "$ARCHIVE" "${EXCLUDES[@]}" .

echo "2/3  Envoi vers $SERVER..."
scp "$ARCHIVE" "$SERVER:/tmp/portfolio-deploy.tgz"
rm -f "$ARCHIVE"

echo "3/3  Construction et redémarrage du conteneur..."
ssh "$SERVER" "set -e; mkdir -p '$REMOTE_DIR'; cd '$REMOTE_DIR'; tar xzf /tmp/portfolio-deploy.tgz; rm /tmp/portfolio-deploy.tgz; \
  if [ ! -f backend/.env ]; then echo 'backend/.env manquant sur le serveur : relance avec WITH_ENV=1'; exit 1; fi; \
  docker compose up -d --build; docker compose ps"

echo "Déploiement terminé : https://atlasentinel.fr"

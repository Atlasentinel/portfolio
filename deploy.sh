#!/bin/bash
# ─── deploy.sh — Déploiement du portfolio sur atlasentinel.fr ────────────────
# Usage : bash deploy.sh
# Prérequis : ssh configuré, bun installé sur le serveur, git push fait

SERVER="root@89.226.96.43"        # ou root@atlasentinel.fr
REMOTE_DIR="/var/www/portfolio"    # dossier sur le serveur

set -e

echo "📦 [1/4] Build React..."
npm run build

echo "🚀 [2/4] Envoi des fichiers sur le serveur..."
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='src' \
  --exclude='public' \
  ./ "$SERVER:$REMOTE_DIR/"

echo "⚙️  [3/4] Installation de Bun + dépendances sur le serveur..."
ssh "$SERVER" "
  cd $REMOTE_DIR/backend
  curl -fsSL https://bun.sh/install | bash 2>/dev/null || true
  export PATH=\"\$HOME/.bun/bin:\$PATH\"
  bun --version
"

echo "🔄 [4/4] Redémarrage du service..."
ssh "$SERVER" "
  export PATH=\"\$HOME/.bun/bin:\$PATH\"
  # Tue l'ancien process s'il tourne
  pkill -f 'bun.*index.ts' 2>/dev/null || true
  sleep 1
  # Relance en arrière-plan avec nohup
  cd $REMOTE_DIR/backend
  nohup bun run index.ts > /var/log/portfolio.log 2>&1 &
  echo 'Serveur démarré. PID:' \$!
"

echo ""
echo "✅ Déploiement terminé !"
echo "   → https://atlasentinel.fr"
echo "   → Logs : ssh $SERVER 'tail -f /var/log/portfolio.log'"

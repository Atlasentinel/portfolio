# Déployer le portfolio

Le site tourne dans **un seul conteneur Docker** : il construit le front (Vite) puis lance le serveur Bun,
qui sert les pages, les PDF et l'API sur le port **3001**. Devant, un reverse proxy (Caddy ou nginx)
s'occupe du nom de domaine et du HTTPS.

```
Internet ──HTTPS──▶ Caddy / nginx ──▶ 127.0.0.1:3001 (conteneur portfolio)
```

Configuration actuelle (d'après l'ancien `deploy.sh`) : domaine **atlasentinel.fr**, serveur
`root@atlasentinel.fr` (89.226.96.43), dossier `/var/www/portfolio`, nginx devant (voir `nginx.conf`).

---

## 1. Prérequis sur le serveur (une seule fois)

- Docker et le plugin Compose : `docker compose version` doit répondre.
- Un accès SSH depuis ton PC : `ssh user@ton-serveur` doit fonctionner (idéalement par clé).
- Un nom de domaine qui pointe vers l'IP du serveur.

## 2. Configurer `backend/.env` (une seule fois)

Sur ton PC, copie l'exemple puis remplis-le :

```powershell
copy backend\.env.example backend\.env
```

| Variable | Valeur en production |
|---|---|
| `ADMIN_KEY` | 32 caractères minimum (`openssl rand -hex 32`). Sinon l'API d'écriture reste désactivée. |
| `ADMIN_IPS` | Ton IP fixe si tu utilises l'API admin à distance, sinon laisse `127.0.0.1,::1`. |
| `ALLOWED_ORIGINS` | `https://ton-domaine.fr` |
| `TRUST_PROXY` | `true` si Caddy/nginx est devant (cas normal). |
| `HSTS` | `true` une fois le HTTPS en place. |
| `GITHUB_USER` | `Atlasentinel` |

Le `.env` n'est **jamais** copié dans l'image Docker : il est lu au démarrage du conteneur.

## 3. Envoyer et lancer le site

### Avec le script (recommandé)

Depuis PowerShell, dans le dossier du portfolio :

```powershell
.\deploy.ps1 -Server root@atlasentinel.fr -RemoteDir /var/www/portfolio -WithEnv   # premier déploiement
.\deploy.ps1 -Server root@atlasentinel.fr -RemoteDir /var/www/portfolio            # mises à jour
```

Options :

| Option | Rôle |
|---|---|
| `-Server` | Obligatoire. Ex. `noe@123.45.67.89` ou `noe@mon-serveur.fr` |
| `-RemoteDir` | Dossier sur le serveur (défaut `/var/www/portfolio`) |
| `-WithEnv` | Envoie aussi `backend/.env` (sinon celui du serveur est conservé) |
| `-KeepServerData` | N'écrase pas `src/data/*.json` du serveur (utile si tu modifies les projets via l'API admin) |

Si PowerShell refuse de lancer le script : `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

Sous macOS, Linux ou WSL : `bash deploy.sh` (mêmes options via `WITH_ENV=1`, `KEEP_SERVER_DATA=1`).

### Migration depuis l'ancienne version (une seule fois)

L'ancienne version tournait avec `bun` lancé en arrière-plan (`nohup`). Avant le premier déploiement
Docker, arrête-le pour libérer le port 3001 :

```bash
ssh root@atlasentinel.fr "pkill -f 'bun.*index.ts' || true"
```

Il faut aussi Docker sur le serveur : `curl -fsSL https://get.docker.com | sh`.

### À la main

```powershell
tar -czf ..\portfolio.tgz --exclude=node_modules --exclude=build .
scp ..\portfolio.tgz user@ton-serveur:/tmp/
ssh user@ton-serveur "mkdir -p ~/portfolio && cd ~/portfolio && tar xzf /tmp/portfolio.tgz && docker compose up -d --build"
```

### Droits sur les données (une seule fois)

Le conteneur ne tourne pas en root (utilisateur `bun`, uid 1000). Pour que l'API admin puisse
enregistrer les modifications :

```bash
sudo chown -R 1000:1000 ~/portfolio/src/data
```

## 4. Nom de domaine et HTTPS

Dans `docker-compose.yml`, remplace `"3001:3001"` par `"127.0.0.1:3001:3001"` pour que le port
ne soit accessible que par le reverse proxy.

### Option A : Caddy (le plus simple, HTTPS automatique)

`/etc/caddy/Caddyfile` :

```
ton-domaine.fr, www.ton-domaine.fr {
    encode zstd gzip
    reverse_proxy 127.0.0.1:3001
}
```

```bash
sudo systemctl reload caddy
```

### Option B : nginx + Certbot (configuration actuelle)

Le fichier `nginx.conf` du dépôt est prêt pour atlasentinel.fr. Version minimale :

`/etc/nginx/sites-available/portfolio` :

```nginx
server {
    server_name ton-domaine.fr www.ton-domaine.fr;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d ton-domaine.fr -d www.ton-domaine.fr
```

Dans les deux cas, mets ensuite `TRUST_PROXY=true` et `HSTS=true` dans le `.env` du serveur, puis
`docker compose up -d` pour les prendre en compte.

## 5. Vérifier que tout marche

```bash
docker compose ps                         # le conteneur doit être "healthy"
docker compose logs --tail=50             # pas d'erreur au démarrage
curl -sI https://ton-domaine.fr | grep -i content-security-policy
curl -s https://ton-domaine.fr/api/github/contributions | head -c 200
```

Puis dans le navigateur : la page d'accueil, une fiche projet, le bouton EN, le téléchargement du CV,
le graphe GitHub et le widget Uspot sous la photo.

## 6. Mettre à jour

Modifie les fichiers sur ton PC (textes, projets, images), puis relance simplement :

```powershell
.\deploy.ps1 -Server user@ton-serveur
```

> Les fichiers de ton PC font foi : un déploiement remplace `src/data` sur le serveur.
> Si tu as modifié des projets via l'API admin, ajoute `-KeepServerData`, ou récupère d'abord
> le fichier : `scp user@ton-serveur:~/portfolio/src/data/projects.json src\data\`.

## En cas de problème

| Symptôme | Piste |
|---|---|
| Page blanche | `docker compose logs` ; le build a-t-il réussi ? |
| 502 Bad Gateway | Le conteneur est arrêté : `docker compose up -d` |
| L'API admin répond 401 | Clé trop courte, mauvaise IP dans `ADMIN_IPS`, ou `TRUST_PROXY` oublié derrière le proxy |
| Le graphe GitHub ne bouge pas | Normal pendant 6 h (cache). Sinon, vérifier que le serveur accède à github.com |
| Le widget Uspot n'apparaît pas | Vérifier que la CSP contient `https://uspot.fr` et que uspot.fr répond |

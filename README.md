# Portfolio — Noé Ziadi

React 19 + Vite (front) · Bun (serveur + petite API JSON) · FR / EN.

## Lancer en local

```bash
npm install
npm run dev            # front sur http://localhost:3000
cd backend && bun run dev   # API sur http://localhost:3001 (optionnel en dev)
```

## Mettre en production

Guide complet (serveur, HTTPS, mises à jour, dépannage) : **[DEPLOIEMENT.md](./DEPLOIEMENT.md)**.

En bref, depuis PowerShell :

```powershell
copy backend\.env.example backend\.env               # puis remplir ADMIN_KEY (≥ 32 caractères)
.\deploy.ps1 -Server user@ton-serveur -WithEnv        # premier déploiement
.\deploy.ps1 -Server user@ton-serveur                 # mises à jour
```

Sans Docker : `npm run build` puis `bun run backend/index.ts` (port 3001).

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Textes de l'interface (titres, boutons, bio, compétences) | `src/i18n/fr.js` et `src/i18n/en.js` |
| Projets (résumé, texte, captures, liens) | `src/data/projects.json` |
| Expérience | `src/data/experience.json` |
| Formation | `src/data/education.json` |
| E-mail, GitHub, LinkedIn, CV | `src/config.js` |
| CV et PDF téléchargeables | `public/files/` |
| Couleurs, typo, espacements | variables en haut de `src/styles.css` |

### Ajouter un projet

1. Déposer les captures en `.webp` dans `src/assets/projects/` (largeur max conseillée : 1600 px).
2. Ajouter une entrée dans `src/data/projects.json` :

```json
{
  "id": "mon-projet",
  "slug": "mon-projet",          // null = pas de page détaillée
  "title": "Mon projet",
  "featured": false,              // true = affiché sur l'accueil (6 max)
  "kind": "perso",                // perso | client | school | internship
  "status": "live",               // live | wip | offline | private
  "date_start": "2026-03",        // AAAA-MM
  "date_end": null,               // null = en cours
  "tags": ["React", "Node.js"],
  "summary": { "fr": "…", "en": "…" },
  "body": { "fr": ["Paragraphe 1", "Paragraphe 2"], "en": ["…", "…"] },
  "highlights": { "fr": ["Point 1"], "en": ["Point 1"] },
  "links": { "demo": "https://…", "source": "https://github.com/…", "doc": "/files/…pdf" },
  "cover": "mon-projet-1.webp",
  "cover_fit": "contain",         // optionnel : pour un logo plutôt qu'une capture
  "gallery": ["mon-projet-1.webp", "mon-projet-2.webp"]
}
```

3. `npm run build`.

La page est disponible sur `/projets/mon-projet`. Les anciennes URL (`/pixelwar`, `/rach`…) redirigent automatiquement.

### Langue

Le site choisit la langue du navigateur, puis mémorise le choix du visiteur.
Pour envoyer directement la version anglaise : `https://votre-domaine/?lang=en`.

## API

| Méthode | Route | Accès |
|---|---|---|
| GET | `/api/projects`, `/api/projects/:id`, `/api/education`, `/api/experience` | public |
| GET | `/api/github/contributions` (graphe GitHub, mis en cache 6 h) | public |
| POST | `/api/projects` | admin |
| PUT / DELETE | `/api/projects/:id` | admin |

Les routes admin exigent `Authorization: Bearer <ADMIN_KEY>` **et** une IP listée dans `ADMIN_IPS`.
Chaque projet envoyé est validé (champs, formats, URL https uniquement) ; les champs inconnus sont ignorés.

```bash
curl -X PUT http://localhost:3001/api/projects/roger \
  -H "Authorization: Bearer $ADMIN_KEY" -H "Content-Type: application/json" \
  -d '{"status": "live", "links": {"demo": "https://r0ger.example"}}'
```

## Intégrations

- **Activité GitHub** (sous la photo) : le serveur lit le graphe public de `GITHUB_USER` et le met en cache 6 h.
  Si GitHub ne répond pas, le site affiche l'instantané `src/data/github-snapshot.json`.
- **Widget Uspot** (sous la photo, repliable) : script officiel `https://uspot.fr/widget.js`.
  C'est la seule ressource externe : `uspot.fr` est autorisé dans la CSP de `backend/index.ts`.

## Sécurité (résumé)

- En-têtes : CSP stricte (`'self'`, plus `uspot.fr` pour le widget), `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS optionnel.
- Aucune source map publiée ; polices et icônes auto-hébergées (seul le widget Uspot vient de l'extérieur).
- Fichiers statiques : protection contre le path traversal et les fichiers cachés.
- Admin : clé ≥ 32 caractères comparée à temps constant, IP en correspondance exacte, `X-Forwarded-For` ignoré sauf `TRUST_PROXY=true`.
- Écritures JSON validées, atomiques et sérialisées ; corps de requête limité à 256 Ko ; rate limiting.
- Docker : `.env` jamais copié dans l'image, utilisateur non-root, système de fichiers en lecture seule.

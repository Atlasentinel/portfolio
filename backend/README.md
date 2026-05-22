# 🚀 Portfolio API — Bun.js

API REST légère pour gérer les données du portfolio. Les données sont stockées en JSON et partagées avec le frontend React (pas de duplication).

---

## Installation

### 1. Installer Bun
```bash
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# macOS / Linux
curl -fsSL https://bun.sh/install | bash
```

### 2. Lancer le serveur

```bash
cd backend

bun run dev    # 🔁 Développement (rechargement auto)
bun start      # 🚀 Production
```

Le serveur démarre sur **http://localhost:3001** par défaut.

---

## ⚙️ Configuration

Créez un fichier `.env` dans `backend/` :

```env
PORT=3001
ADMIN_KEY=mon-mot-de-passe-secret   # ⚠️ Changer en production !
ALLOWED_ORIGIN=http://localhost:3000
```

| Variable         | Défaut                  | Description                       |
|------------------|-------------------------|-----------------------------------|
| `PORT`           | `3001`                  | Port du serveur                   |
| `ADMIN_KEY`      | `portfolio-admin-key`   | Clé d'accès admin (changer !)     |
| `ALLOWED_ORIGIN` | `*`                     | Origine CORS autorisée            |

---

## ✏️ Modérer le contenu (ajouter / modifier / supprimer)

### Méthode 1 — Édition directe des JSON ✅ (recommandée)

Les données sont dans **`src/data/`** (partagées avec le React) :
- `src/data/projects.json` → projets
- `src/data/education.json` → formations

Il suffit d'éditer ces fichiers, le serveur relit à chaque requête.  
Pour mettre à jour le frontend : `npm run build`.

---

### Méthode 2 — API REST (scripts / automatisation)

Toutes les routes d'écriture nécessitent le header :
```
Authorization: Bearer <ADMIN_KEY>
```

#### 📋 Lister les projets
```bash
curl http://localhost:3001/api/projects
```

#### ➕ Ajouter un projet
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Authorization: Bearer portfolio-admin-key" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "mon-projet",
    "slug": "mon-projet",
    "title": "Mon Projet",
    "description": { "fr": "Description FR", "en": "English description" },
    "tags": ["HTML", "CSS", "JS"],
    "date_start": { "fr": "Janvier 2025", "en": "January 2025" },
    "date_end": null,
    "available": true,
    "image": "mon-image.jpg",
    "type": "Perso"
  }'
```

#### ✏️ Modifier un projet
```bash
curl -X PUT http://localhost:3001/api/projects/mon-projet \
  -H "Authorization: Bearer portfolio-admin-key" \
  -H "Content-Type: application/json" \
  -d '{ "title": "Nouveau titre" }'
```

#### 🗑️ Supprimer un projet
```bash
curl -X DELETE http://localhost:3001/api/projects/mon-projet \
  -H "Authorization: Bearer portfolio-admin-key"
```

---

## 📦 Format d'un projet

```json
{
  "id": "mon-projet",
  "slug": "mon-projet",
  "title": "Mon Projet",
  "description": {
    "fr": "Description en français",
    "en": "English description"
  },
  "tags": ["HTML", "CSS", "JS"],
  "date_start": { "fr": "Janvier 2025", "en": "January 2025" },
  "date_end": null,
  "available": true,
  "image": "nom-du-fichier.jpg",
  "type": "Perso"
}
```

| Champ         | Type              | Description                                         |
|---------------|-------------------|-----------------------------------------------------|
| `id`          | string            | Identifiant unique (kebab-case)                     |
| `slug`        | string \| null    | Slug de la route (`/mon-projet`). `null` = pas de page détail |
| `title`       | string            | Titre affiché                                       |
| `description` | `{fr, en}`        | Description bilingue                                |
| `tags`        | string[]          | Technologies (voir liste ci-dessous)                |
| `date_start`  | `{fr, en}`        | Date de début bilingue                              |
| `date_end`    | `{fr, en}` \| null| Date de fin (null si en cours)                      |
| `available`   | boolean           | `false` = bouton "Indisponible"                     |
| `image`       | string            | Fichier dans `src/img/` + entrée dans `src/utils/imageMap.js` |
| `type`        | string            | Catégorie (affiché sur la page détail)              |

**Tags disponibles :** `HTML` `CSS` `JS` `NodeJS` `ReactJS` `BunJS` `PHP` `SQL` `JQuery` `PYTHON` `CSHARP` `GoLang` `CPLUS` `ARDUINO` `RASPBERRY`

---

## 🖼️ Ajouter une image pour un nouveau projet

1. Mettre l'image dans `src/img/`
2. Ajouter l'import dans `src/utils/imageMap.js`
3. Référencer le filename dans `src/data/projects.json`
4. Reconstruire : `npm run build`

---

## 🌐 Déploiement production

```bash
# 1. Construire le frontend
npm run build

# 2. Lancer le serveur Bun (sert l'API + le build React)
cd backend && bun start
```

Le serveur Bun sert à la fois l'API (`/api/...`) et le build statique React.

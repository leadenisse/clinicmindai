# Assets ClinicMind AI

Placez les fichiers suivants dans ce dossier (`public/`) pour l’intégration du logo :

| Fichier | Usage |
|---------|--------|
| `LOGO.png` ou `logo.png` | Logo complet — page de connexion, sidebar, header (voir `LOGO_PATHS` dans `app.config.ts`) |
| `logo-icon.png` | Icône seule (secours si LOGO.png absent) — sidebar, header mobile |
| `logo-dark.png` | Version pour fond sombre — panneau gauche inscription |
| `favicon.ico` | Favicon navigateur |
| `favicon-32x32.png` | Favicon 32×32 |
| `favicon-16x16.png` | Favicon 16×16 (optionnel) |
| `apple-touch-icon.png` | Icône iOS (180×180, optionnel) |
| `og-image.png` | Image partage réseaux sociaux (Open Graph, optionnel) |

Les chemins sont en racine. Par défaut le code charge **`/LOGO.png`** (majuscules). Pour utiliser `logo.png`, modifiez `src/config/app.config.ts` (`LOGO_PATHS.full` et `LOGO_PATHS.icon`). Page de connexion : fallback `/LOGO.png` → `/logo.png` → `/logo-icon.png` → texte.

**Sensibilité à la casse (Linux)** : le code attend `LOGO.png` par défaut. Si le fichier s’appelle `LOGO.png` ou `Logo.png`, renommez-le en `logo.png` ou adaptez le code pour utiliser le bon chemin.

**Page de connexion** : le code charge d’abord `/logo.png`, puis en secours `/logo-icon.png` si le premier échoue, puis affiche le texte « ClinicMind AI » si les deux images sont absentes.

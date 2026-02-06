# Récapitulatif des changements — Palette ClinicMind AI

## Tableau des correspondances couleurs

| Élément           | Ancienne couleur | Nouvelle couleur   |
|-------------------|------------------|--------------------|
| Primaire          | #0EA5E9 (Sky)   | #14B8A6 (Teal)     |
| Primaire hover    | #0284C7          | #0D9488            |
| Primaire light    | #E0F2FE          | #CCFBF1            |
| Liens             | #0EA5E9          | #0D9488 (primary-600) |
| Focus ring        | ring-sky-500     | ring-primary-500   |
| Badges info       | bg-sky-100       | bg-primary-100     |

## Checklist de mise à jour

- [x] Mettre à jour `tailwind.config.js` avec la nouvelle palette (primary, navy, accent)
- [x] Mettre à jour `src/index.css` avec les variables CSS (teal, navy)
- [x] Références aux assets logo dans le code (`/public` : logo.png, logo-icon.png, logo-dark.png)
- [x] Sidebar avec logo (logo-icon + texte ClinicMind / AI)
- [x] LoginPage avec logo centré et tagline
- [x] SignupPage avec panneau gauche (logo-dark) et formulaire
- [x] index.html (title, meta, favicon, theme-color, Open Graph)
- [x] Renommage « ClinicMind IA » → « ClinicMind AI »
- [x] Remplacer les hex sky (#0EA5E9, #0ea5e9) par teal (#14B8A6) dans constants / API
- [x] Sidebar : lien actif = `border-primary-500 bg-primary-50 text-primary-700`, hover = `hover:bg-primary-50`
- [x] Boutons, badges, inputs, tabs : variantes primary/teal
- [ ] Ajouter les fichiers physiques dans `/public` (logo.png, logo-icon.png, logo-dark.png, favicon.*)
- [ ] Tester le mode sombre

## Classes Tailwind à utiliser

- **Primaire** : `primary-50` … `primary-900` (teal)
- **Navy** : `navy-50` … `navy-900` (titres, textes)
- **Liens** : `text-primary-600 hover:text-primary-700`
- **Focus** : `focus-visible:ring-primary-500`
- **Sidebar actif** : `border-l-4 border-primary-500 bg-primary-50 text-primary-700`
- **Sidebar hover** : `hover:bg-primary-50`

## Fichiers modifiés (session actuelle)

- `src/features/accounting/constants/accounting.constants.ts` — couleur logiciels → #14B8A6
- `src/features/settings/api/settings.api.ts` — primaryColor → #14B8A6
- `src/components/layout/Sidebar.tsx` — états actif/hover avec primary-50, border-primary-500
- `src/features/auth/components/LoginForm.tsx` — titre et lien en text-primary-600 / primary-700

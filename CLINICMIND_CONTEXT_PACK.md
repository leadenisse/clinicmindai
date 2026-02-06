# CLINICMIND IA — CONTEXT PACK DÉVELOPPEMENT

> **Document de référence pour Cursor AI**  
> Compile toutes les spécifications essentielles du projet.  
> Version 1.0 — Janvier 2026

---

# 1. VISION PRODUIT

## 1.1 Résumé exécutif

**ClinicMind IA en une phrase :**
*Un logiciel de gestion de cabinet dentaire moderne, intuitif et intelligent, qui libère les praticiens de la charge administrative pour qu'ils se concentrent sur les soins.*

### Le problème
Les chirurgiens-dentistes passent en moyenne 30% de leur temps sur des tâches administratives : rédaction de comptes rendus, gestion des devis, facturation, classement de documents. Les logiciels actuels (Orbis, Julie, Logos) sont :
- Lourds et peu intuitifs
- Fragmentés (plusieurs outils non connectés)
- Incapables d'exploiter l'IA pour automatiser les tâches répétitives
- Mal adaptés aux workflows réels des praticiens

### Notre solution
ClinicMind IA est une plateforme SaaS tout-en-un qui centralise la gestion du cabinet et intègre l'intelligence artificielle pour automatiser les tâches chronophages. Conçue PAR et POUR les soignants.

### Positionnement unique
- **Pensé terrain** : co-construit avec des praticiens en exercice
- **IA utile** : pas un gadget, mais un vrai gain de temps quotidien
- **Moderne** : interface web, accessible partout, sans installation
- **Conforme** : HDS, RGPD, préparation Ségur

## 1.2 Mission, Vision & Valeurs

**🎯 MISSION** : Simplifier le quotidien des professionnels de santé en leur offrant des outils numériques intelligents, fiables et agréables à utiliser.

**🔭 VISION À 5 ANS** : Devenir la référence française du logiciel de gestion médicale intelligent, utilisé par des milliers de cabinets et structures de santé.

**💎 VALEURS** :
- **Utilité** — Chaque fonctionnalité doit apporter un gain concret
- **Simplicité** — Interface claire, apprentissage rapide
- **Confiance** — Sécurité, transparence, fiabilité
- **Écoute** — Construire avec les utilisateurs, pas pour eux

## 1.3 Bénéfices clés pour le praticien

| ⏱️ TEMPS | 🎯 SIMPLICITÉ | 🔒 SÉRÉNITÉ |
|----------|---------------|-------------|
| Gain de 30 min à 1h par jour grâce à l'automatisation | Interface intuitive, prise en main en moins d'une semaine | Données sécurisées, conformité assurée, support réactif |

## 1.4 Fonctionnalités différenciantes

| Fonctionnalité | Valeur ajoutée |
|----------------|----------------|
| Dictée vocale intelligente | Dicter → Compte rendu structuré en 30 secondes |
| Génération IA de documents | Ordonnances, CR, courriers en 1 clic |
| Classement automatique | Document déposé → classé au bon endroit |
| Résumé patient IA | "Résume les antécédents" → réponse immédiate |
| Interface web moderne | Accessible partout, pas d'installation |

---

# 2. PÉRIMÈTRE FONCTIONNEL

## 2.1 Ce que fait ClinicMind IA (MVP)

✅ **Inclus dans le MVP :**
- Gestion complète des dossiers patients dentaires
- Planification et suivi des rendez-vous
- Génération assistée de documents (CR, ordonnances, courriers)
- Dictée vocale avec transcription automatique
- Création et suivi des devis dentaires
- Facturation et export CSV
- Stockage et consultation des radios
- Gestion des stocks et traçabilité prothèses
- Comptabilité simplifiée (recettes/dépenses)
- Messagerie prothésiste

## 2.2 Ce que NE fait PAS ClinicMind IA

🚫 **EXCLUSIONS CRITIQUES (Responsabilité)** :
- Diagnostic médical automatisé
- Recommandations thérapeutiques autonomes
- Prise de décision clinique sans validation humaine
- Interprétation automatique des radios
- Prescription médicamenteuse automatique

❌ **Hors périmètre V1 :**
- Comptabilité complète (bilan, TVA, liasse fiscale)
- Gestion RH / paie
- CRM / marketing patient
- Téléconsultation
- Application mobile native (web responsive uniquement)
- Télétransmission SESAM-Vitale
- Signature électronique qualifiée (eIDAS)
- Export vers DMP

---

# 3. DOMAINES FONCTIONNELS (Domain Map)

## 3.1 Vue d'ensemble

ClinicMind IA est structuré en **9 domaines fonctionnels** interconnectés :

| # | Domaine | Description |
|---|---------|-------------|
| 1 | 👤 Patient | Dossier médical, antécédents, suivi |
| 2 | 📅 Rendez-vous | Planning, agenda, gestion des créneaux |
| 3 | 📄 Documents | CR, ordonnances, courriers, consentements |
| 4 | 🦷 Imagerie | Radios panoramiques, rétro-alvéolaires, CBCT |
| 5 | 💸 Devis/Factures | Devis normalisés, facturation |
| 6 | 📦 Stock/Prothèses | Inventaire, traçabilité, commandes labo |
| 7 | 📊 Comptabilité | Recettes, dépenses, exports comptables |
| 8 | 🤖 Intelligence IA | Génération docs, dictée, classement auto |
| 9 | ⚙️ Administration | Utilisateurs, rôles, paramètres cabinet |

## 3.2 Priorisation MVP

| Priorité | Fonctionnalités | Justification |
|----------|-----------------|---------------|
| **P0** | Dossier patient + Documents + Auth | Sans ça, pas de logiciel médical |
| **P1** | RDV + Devis/Factures + IA génération | Valeur ajoutée principale, différenciant |
| **P2** | Imagerie + Stock + Compta simplifiée | Complétude fonctionnelle cabinet |

## 3.3 Détail par domaine

### 👤 Domaine 1 : PATIENT

**✅ Inclus MVP :**
- Création / modification / archivage patient
- Identité complète (nom, prénom, date naissance, INS)
- Coordonnées (téléphone, email, adresse)
- Médecin traitant / correspondants
- Antécédents médicaux et chirurgicaux
- Allergies connues
- Traitements en cours
- Habitudes (tabac, alcool)
- Observations cliniques
- Plan de traitement
- Timeline des consultations
- Recherche par nom, INS, téléphone
- Archivage (soft delete)

**❌ Hors scope V1 :**
- Fusion de doublons
- Import massif de patients
- Consentements granulaires RGPD
- Portail patient

### 📅 Domaine 2 : RENDEZ-VOUS

**✅ Inclus MVP :**
- Calendrier interactif (vue jour/semaine/mois)
- Création / modification / annulation RDV
- Lien patient obligatoire
- Motif de consultation (liste prédéfinie)
- Type de RDV (consultation, suivi, urgence, chirurgie, prothèse, détartrage)
- Statut (planifié, confirmé, terminé, annulé, absent)
- Durée configurable
- Notes praticien
- Filtrage par praticien

**❌ Hors scope V1 :**
- Prise de RDV en ligne par le patient
- Rappels SMS/email automatiques
- Gestion multi-salles
- Récurrence automatique

### 📄 Domaine 3 : DOCUMENTS

**✅ Inclus MVP :**
- Upload PDF, images (drag & drop)
- Génération IA (CR, ordonnances, courriers) — voir domaine 8
- Types de documents : CR, ordonnance, courrier, consentement, bilan
- Classement automatique par type
- Association patient + date
- Téléchargement / impression
- Visualisation dans dossier patient
- Ordonnances avec mentions légales obligatoires
- Verrouillage post-signature (inaltérabilité)
- Horodatage des créations

**❌ Hors scope V1 :**
- Signature électronique qualifiée (eIDAS)
- OCR sur documents scannés
- Export vers DMP
- Modèles de documents personnalisables (V2)

### 🦷 Domaine 4 : IMAGERIE

**✅ Inclus MVP :**
- Import d'images (JPEG, PNG, DICOM simplifié)
- Catégories : Panoramique, Rétro-alvéolaire, Bitewing, CBCT
- Association au dossier patient
- Visualisation plein écran
- Horodatage et métadonnées
- Zoom / rotation basique

**❌ Hors scope V1 :**
- Acquisition directe depuis capteur
- Annotations sur l'image
- Comparaison avant/après
- IA de détection caries/pathologies
- Export DICOM complet
- Téléradiologie

### 💸 Domaine 5 : DEVIS & FACTURATION

**✅ Inclus MVP :**
- Création devis dentaire normalisé
- Codes CCAM et actes HN intégrés
- Calcul automatique RAC (reste à charge)
- Acceptation / refus / modification devis
- Conversion devis → facture
- Numérotation séquentielle des factures (FACT-YYYYMM-XXXX)
- Mentions légales obligatoires
- Statut paiement (en attente / payé / remboursé)
- Export PDF facture
- Export CSV comptable mensuel
- Historique par patient

**❌ Hors scope V1 :**
- Télétransmission SESAM-Vitale
- Tiers payant automatique
- Relance automatique impayés
- Intégration mutuelles
- Entente préalable dématérialisée

### 📦 Domaine 6 : STOCK & PROTHÈSES

**✅ Inclus MVP :**
- Inventaire produits (consommables, matériaux)
- Catégories : stérilisation, anesthésie, restauration...
- Alertes seuil bas
- Suivi commandes prothésiste
- Lien prothèse → patient → devis
- Statut commande (en cours, terminé)
- Historique traçabilité

**❌ Hors scope V1 :**
- Commande automatique fournisseurs
- Intégration e-commerce
- Gestion multi-fournisseurs avancée

### 📊 Domaine 7 : COMPTABILITÉ

**✅ Inclus MVP :**
- Tableau de bord recettes/dépenses
- Saisie manuelle des dépenses
- Export comptable mensuel (CSV/FEC)
- Graphiques d'activité basiques
- Filtrage par période

**❌ Hors scope V1 :**
- Rapprochement bancaire
- TVA automatique
- Liasse fiscale
- Intégration logiciel comptable

### 🤖 Domaine 8 : INTELLIGENCE ARTIFICIELLE

**✅ Inclus MVP :**
- Dictée vocale → transcription (Whisper)
- Génération de compte rendu
- Génération d'ordonnance
- Classification automatique de document uploadé
- Extraction d'informations ciblées (Q/R sur dossier)
- Résumé automatique du dossier patient
- Marquage visuel 🤖 sur tout contenu IA
- Validation humaine obligatoire avant enregistrement
- Message d'avertissement systématique
- Logs IA (modèle, prompt, date, utilisateur)

**❌ Hors scope V1 :**
- Aide au diagnostic
- Suggestion de traitement
- Analyse radiologique IA
- Prédiction planning
- Chatbot patient

### ⚙️ Domaine 9 : ADMINISTRATION

**✅ Inclus MVP :**
- Gestion utilisateurs (création, modification, suppression)
- 3 rôles : Praticien, Secrétaire, Administrateur
- Authentification forte (MFA)
- Paramètres cabinet (nom, adresse, logo)
- Personnalisation thème couleur
- Configuration des actes et tarifs
- Mentions légales ordonnances
- Journalisation des accès (structure prête)

**❌ Hors scope V1 :**
- SSO entreprise
- Multi-cabinet / multi-site
- API externe
- Statistiques d'activité avancées

---

# 4. RÔLES & PERMISSIONS (RBAC)

## 4.1 Principes

ClinicMind AI utilise un modèle **RBAC (Role-Based Access Control)** :
- Chaque utilisateur a UN rôle (pas de cumul)
- Les permissions sont définies par action + ressource
- Le principe du **moindre privilège** s'applique
- Toute action sensible est journalisée

## 4.2 Les 3 rôles

### 👩‍⚕️ PRATICIEN
*Chirurgien-dentiste ou professionnel de santé habilité*

**Niveau d'accès : COMPLET sur les données cliniques**

✅ Peut :
- Créer, modifier, archiver des patients
- Accéder à l'intégralité des dossiers médicaux
- Créer tous types de documents (CR, ordonnances, courriers)
- Utiliser toutes les fonctionnalités IA
- Créer et valider des devis
- Consulter et annoter les radios
- Gérer ses rendez-vous
- Consulter la comptabilité (lecture seule)

❌ Ne peut PAS :
- Créer/supprimer des utilisateurs
- Modifier les paramètres du cabinet
- Exporter massivement les données

### 💼 SECRÉTAIRE
*Personnel administratif du cabinet*

**Niveau d'accès : RESTREINT — administratif uniquement**

✅ Peut :
- Créer des patients (identité, coordonnées)
- Gérer l'agenda et les rendez-vous
- Créer et suivre les factures
- Consulter les devis (lecture)
- Imprimer des documents

❌ Ne peut PAS :
- Accéder aux antécédents médicaux détaillés
- Créer des ordonnances ou CR
- Utiliser les fonctions IA cliniques
- Consulter les radios (sauf miniatures)
- Accéder à la comptabilité

### ⚙️ ADMINISTRATEUR
*Responsable technique et fonctionnel du cabinet*

**Niveau d'accès : TOTAL — incluant la configuration**

✅ Peut :
- Tout ce que peut faire un Praticien
- Créer, modifier, désactiver des utilisateurs
- Attribuer les rôles
- Configurer les paramètres du cabinet
- Accéder à la comptabilité complète
- Exporter les données (réversibilité)
- Consulter les logs d'accès

⚠️ Restrictions :
- Ne peut pas supprimer définitivement un patient
- Ne peut pas modifier un document signé

## 4.3 Matrice des permissions

**Légende** : C=Créer, R=Lire, U=Modifier, D=Supprimer, —=Aucun accès

### Domaine Patient

| Ressource | Praticien | Secrétaire | Admin |
|-----------|-----------|------------|-------|
| Identité patient | CRUD | CRU | CRUD |
| Coordonnées | CRUD | CRU | CRUD |
| Antécédents médicaux | CRUD | — | CRUD |
| Allergies | CRUD | R | CRUD |
| Traitements en cours | CRUD | — | CRUD |
| Observation clinique | CRUD | — | CRUD |
| Plan de traitement | CRUD | R | CRUD |
| Archivage patient | U | — | U |

### Domaine Documents

| Ressource | Praticien | Secrétaire | Admin |
|-----------|-----------|------------|-------|
| Compte rendu | CRU | R | CRU |
| Ordonnance | CRU | R | CRU |
| Courrier | CRU | R | CRU |
| Consentement | CRU | R | CRU |
| Document externe | CRU | R | CRU |
| Impression | ✓ | ✓ | ✓ |
| Signature document | ✓ | — | ✓ |

### Domaine Finance

| Ressource | Praticien | Secrétaire | Admin |
|-----------|-----------|------------|-------|
| Devis | CRUD | R | CRUD |
| Facture | CRU | CRU | CRUD |
| Encaissement | CRU | CRU | CRUD |
| Comptabilité | R | — | CRUD |
| Export comptable | — | — | ✓ |

### Domaine Administration

| Ressource | Praticien | Secrétaire | Admin |
|-----------|-----------|------------|-------|
| Gestion utilisateurs | — | — | CRUD |
| Attribution rôles | — | — | ✓ |
| Paramètres cabinet | R | — | RU |
| Configuration actes | R | — | CRUD |
| Logs d'accès | — | — | R |
| Export données (RGPD) | — | — | ✓ |

### Matrice Domaines × Rôles (synthèse)

| Domaine | Praticien | Secrétaire | Admin |
|---------|-----------|------------|-------|
| 👤 Patient | **Complet** | Restreint | **Complet** |
| 📅 Rendez-vous | **Complet** | Complet | **Complet** |
| 📄 Documents | **Complet** | Lecture | **Complet** |
| 🦷 Imagerie | **Complet** | Lecture | **Complet** |
| 💸 Devis/Factures | **Complet** | Complet | **Complet** |
| 📦 Stock/Prothèses | **Complet** | Restreint | **Complet** |
| 📊 Comptabilité | Lecture | — | **Complet** |
| 🤖 IA | **Complet** | Restreint | **Complet** |
| ⚙️ Administration | Restreint | — | **Complet** |

---

# 5. USER STORIES — MVP

## 👤 Gestion des patients

| # | User Story |
|---|------------|
| US-01 | En tant que **secrétaire ou praticien**, je veux **créer un patient** avec ses infos (nom, prénom, INS, etc.) afin de démarrer son suivi. |
| US-02 | En tant que **praticien**, je veux pouvoir **corriger les données d'un patient** (ex : téléphone, médecin traitant) afin de garder son dossier à jour. |
| US-03 | En tant que **praticien**, je veux **accéder à la fiche complète d'un patient** pour visualiser ses documents, RDV, antécédents. |
| US-04 | En tant qu'**utilisateur**, je veux **trier mes patients** par nom ou date de dernière activité afin d'accéder rapidement à ceux que je suis actuellement. |

## 📅 Gestion des rendez-vous

| # | User Story |
|---|------------|
| US-05 | En tant que **secrétaire**, je veux pouvoir **créer un RDV** pour un patient, avec date, heure et motif, pour organiser le planning du cabinet. |
| US-06 | En tant que **praticien ou secrétaire**, je veux **corriger ou annuler un RDV** si le patient appelle ou en cas de changement. |
| US-07 | En tant que **praticien**, je veux **visualiser mes RDV du jour et de la semaine** pour m'organiser efficacement. |

## 📄 Documents cliniques manuels

| # | User Story |
|---|------------|
| US-08 | En tant que **praticien**, je veux pouvoir **importer un fichier PDF** (ex : bilan, radio) dans le dossier du patient. |
| US-09 | En tant qu'**utilisateur**, je veux pouvoir **imprimer un document médical** depuis l'interface pour l'archiver ou le remettre au patient. |

## 🤖 Génération IA de documents

| # | User Story |
|---|------------|
| US-10 | En tant que **praticien**, je veux **dicter un compte rendu** afin qu'il soit automatiquement transcrit et intégré au dossier. |
| US-11 | En tant que **praticien**, je veux fournir une instruction textuelle (ou bouton rapide) pour **générer une ordonnance via IA**. |
| US-12 | En tant que **praticien**, je veux **déposer un fichier** (ex : PDF) pour que l'IA détecte son type et le classe automatiquement. |
| US-13 | En tant que **praticien**, je veux **poser une question à l'IA** sur un patient (ex : "résume les antécédents") pour gagner du temps en consultation. |

## 🧾 Facturation

| # | User Story |
|---|------------|
| US-14 | En tant que **praticien ou secrétaire**, je veux pouvoir **créer une facture** à la main après un acte. |
| US-15 | En tant qu'**utilisateur**, je veux pouvoir **imprimer ou télécharger une facture** en PDF. |
| US-16 | En tant que **praticien**, je veux **visualiser toutes les factures liées à un patient** pour le suivi administratif. |
| US-17 | En tant qu'**utilisateur**, je veux **exporter les factures du mois** (CSV) pour les transmettre à mon cabinet comptable. |

## 🔐 Sécurité / accès

| # | User Story |
|---|------------|
| US-18 | En tant qu'**utilisateur**, je veux **me connecter avec mon mot de passe + MFA** pour sécuriser mon accès. |
| US-19 | En tant qu'**administrateur**, je veux **attribuer à chaque compte un rôle** (praticien, secrétaire, admin) pour limiter les droits d'accès. |

## 🧪 Ergonomie & accessibilité

| # | User Story |
|---|------------|
| US-20 | En tant qu'**utilisateur**, je veux une **interface fluide** pour ne pas perdre de temps entre les modules. |
| US-21 | En tant que **praticien**, je veux **accéder à ClinicMind sans installer de logiciel**, depuis mon PC ou ma tablette. |

---

# 6. SPÉCIFICATIONS IA

## 6.1 Stack technologique IA

| Composant | Technologie |
|-----------|-------------|
| Speech-to-Text | OpenAI Whisper API (ou auto-hébergé) |
| LLM (génération texte) | OpenAI GPT-4 / Anthropic Claude (via API) |
| Classification documents | LLM avec prompt spécialisé |
| Recherche dans dossier | RAG (Retrieval-Augmented Generation) |

## 6.2 Flux de données IA

**Principe : Les données patient ne quittent JAMAIS l'environnement sécurisé sans anonymisation.**

1. Requête utilisateur → Backend ClinicMind
2. Backend prépare le contexte (données patient **anonymisées** si nécessaire)
3. Appel API IA externe (Whisper / GPT)
4. Réponse IA → Backend
5. Backend réintègre les données patient
6. Affichage à l'utilisateur pour **validation**

## 6.3 Données envoyées aux API externes

| Donnée | Envoyée ? | Commentaire |
|--------|-----------|-------------|
| Nom du patient | ❌ Non | Remplacé par [PATIENT] |
| Date de naissance | ❌ Non | Remplacé par âge si nécessaire |
| INS / NIR | ❌ Non | Jamais transmis |
| Contenu médical (antécédents) | ⚠️ Anonymisé | Sans identifiants |
| Texte de la dictée | ✅ Oui | Nécessaire pour transcription |
| Instructions du praticien | ✅ Oui | Nécessaire pour génération |

## 6.4 Engagements sur les données

🔒 **Engagements :**
1. **Pas d'entraînement sur vos données** : Vos données ne sont JAMAIS utilisées pour entraîner les modèles IA.
2. **Pas de conservation par le fournisseur** : Les API sont configurées en mode "zero retention".
3. **Anonymisation** : Les données sensibles (nom patient, INS) sont remplacées par des tokens avant envoi.
4. **Hébergement** : Les logs IA sont stockés sur l'infrastructure HDS, pas chez le fournisseur IA.

## 6.5 Modularité

L'architecture est conçue pour permettre le **remplacement des fournisseurs IA** (ex: passer de GPT-4 à Claude, ou à un modèle auto-hébergé) sans impact sur le reste de l'application.

## 6.6 Principes UX IA

**🔹 Identification claire** : Tout contenu généré par IA est marqué visuellement (icône 🤖)

**🔹 Éditable** : Le praticien peut toujours modifier le contenu généré

**🔹 Validation explicite** : Bouton "Valider" obligatoire avant signature

**🔹 Feedback** : Possibilité de signaler une génération incorrecte

**⚠️ Message affiché à chaque génération IA :**
> *"Ce contenu a été généré par intelligence artificielle. Veuillez vérifier et corriger si nécessaire avant validation."*

---

# 7. CONTRAINTES TECHNIQUES

## 7.1 Stack technique

| Élément | Choix |
|---------|-------|
| Frontend | React + TypeScript |
| Backend | Python + FastAPI |
| DB | PostgreSQL |
| IA | OpenAI, Whisper, ou autre API compatible |
| Déploiement | Docker Compose |
| Hébergement | HDS (OVHcloud / Outscale...) |
| Responsive | Optimisé desktop (mobile non prioritaire V1) |
| Accessibilité | 100% web, aucune installation locale requise |

## 7.2 Exigences de sécurité et conformité

- Authentification forte (SSO + MFA)
- Gestion des rôles utilisateur (RBAC)
- Séparation des droits selon les rôles
- **Hébergement HDS obligatoire**, même en préproduction
- Structure de logs prévue (accès, actions)
- **DPO identifié (Thomas)**
- Registre RGPD initial en place
- Données chiffrées au repos + en transit
- **Pas de données de patients réels** sans validation spécifique

## 7.3 Compatibilité Ségur / CI-SIS (préparation)

Le modèle de dossier patient est structuré pour être aligné avec le référentiel de l'ANS :
- Intégration du champ INS
- Types de documents classifiés (CR, ordonnance, etc.)
- Identifiants patients stables
- Fichiers documentés avec métadonnées typées
- Base de données préparée à l'export FHIR / CDA futur

---

# 8. DESIGN SYSTEM

## 8.1 Palette de couleurs

```css
/* Couleurs principales */
--primary: #0D9488;        /* Teal - couleur principale ClinicMind */
--primary-dark: #0F766E;   /* Teal foncé */
--primary-light: #5EEAD4;  /* Teal clair */

/* Couleurs secondaires */
--secondary: #1E3A5F;      /* Bleu marine - textes importants */
--accent: #14B8A6;         /* Teal vif - accents */

/* Neutres */
--background: #F8FAFB;     /* Fond général */
--surface: #FFFFFF;        /* Cartes et surfaces */
--border: #E2E8F0;         /* Bordures */

/* Textes */
--text-primary: #1E293B;   /* Texte principal */
--text-secondary: #64748B; /* Texte secondaire */
--text-muted: #94A3B8;     /* Texte désactivé */

/* États */
--success: #10B981;        /* Vert - succès */
--warning: #F59E0B;        /* Orange - avertissement */
--error: #EF4444;          /* Rouge - erreur */
--info: #3B82F6;           /* Bleu - information */
```

## 8.2 Typographie

- **Police principale** : Inter (Google Fonts)
- **Police alternative** : system-ui, -apple-system, sans-serif

## 8.3 Navigation principale (Sidebar)

Basé sur les maquettes :

1. **Logo** ClinicMind IA + tagline "L'intelligence au service des praticiens"
2. **Recherche patient** (barre de recherche)
3. **Menu principal** :
   - Accueil
   - Dossier patient
   - Ordonnances
   - Facturation
   - Prothésiste
   - Stock
   - Comptabilité
   - Paramètres
   - Aide & Support

## 8.4 Structure fiche patient

Basé sur les maquettes, la fiche patient contient :

**En-tête** : Nom, âge, date naissance, téléphone, adresse

**Onglets** :
- Observation initiale
- Suivi
- Documents
- Imagerie
- Devis
- RDV

**Sidebar droite** (synthèse) :
- Risques médicaux (alertes)
- Habitudes bucco-dentaire
- Plan traitement
- Examen initial bucco-dentaire

---

# 9. CRITÈRES DE SUCCÈS MVP

| Critère | Objectif | Mesure |
|---------|----------|--------|
| Gain de temps praticien | ≥ 30 min/jour | Questionnaire pilote |
| Satisfaction utilisateur | NPS ≥ 40 | Enquête fin de pilote |
| Fiabilité IA | < 5% retouches | Logs modifications |
| Disponibilité service | ≥ 99,5% | Monitoring infra |
| Cabinets pilotes convertis | ≥ 80% | Souscriptions payantes |

---

# 10. GLOSSAIRE MÉTIER

| Terme | Définition |
|-------|------------|
| **INS** | Identifiant National de Santé (matricule patient unique France) |
| **CR** | Compte Rendu (document de consultation) |
| **CCAM** | Classification Commune des Actes Médicaux (codes tarification) |
| **RAC** | Reste À Charge (part patient après remboursements) |
| **HDS** | Hébergeur de Données de Santé (certification obligatoire) |
| **RGPD** | Règlement Général sur la Protection des Données |
| **MFA** | Multi-Factor Authentication (double authentification) |
| **RBAC** | Role-Based Access Control (contrôle d'accès par rôle) |
| **DMP** | Dossier Médical Partagé |
| **DICOM** | Format standard d'imagerie médicale |
| **Panoramique** | Radio dentaire complète des deux mâchoires |
| **Rétro-alvéolaire** | Radio d'une ou plusieurs dents spécifiques |
| **Bitewing** | Radio inter-proximale pour détecter les caries |
| **CBCT** | Cone Beam CT (imagerie 3D dentaire) |

---

# 11. ÉQUIPE FONDATRICE

| 👩‍⚕️ LÉA | 👨‍💻 THOMAS |
|----------|-------------|
| *Vision métier & Présidente* | *Vision technique & DPO* |
| Chirurgienne-dentiste | Ingénieur développeur |
| Praticienne hôpital + cabinet | Année de césure dédiée au projet |
| Connaissance terrain approfondie | Expertise IA et sécurité |
| Réseau médical (internes, spécialistes) | Responsable conformité RGPD |

---

**FIN DU CONTEXT PACK**

*Ce document compile les informations essentielles pour le développement de ClinicMind IA. Pour toute question de clarification, se référer aux documents sources originaux.*

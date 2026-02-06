# 🦷 ClinicMind AI

<div align="center">

**Un logiciel de gestion de cabinet dentaire moderne, intuitif et intelligent**

*L'intelligence artificielle au service des praticiens*

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab)](https://www.python.org/)

</div>

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Installation](#-installation)
- [Structure du projet](#-structure-du-projet)
- [Documentation](#-documentation)
- [Contribution](#-contribution)
- [Licence](#-licence)

---

## 🎯 À propos

**ClinicMind AI** est une plateforme SaaS tout-en-un qui centralise la gestion du cabinet dentaire et intègre l'intelligence artificielle pour automatiser les tâches chronophages. Conçue **PAR et POUR** les soignants.

### Le problème

Les chirurgiens-dentistes passent en moyenne **30% de leur temps** sur des tâches administratives :
- Rédaction de comptes rendus
- Gestion des devis
- Facturation
- Classement de documents

Les logiciels actuels (Orbis, Julie, Logos) sont :
- ❌ Lourds et peu intuitifs
- ❌ Fragmentés (plusieurs outils non connectés)
- ❌ Incapables d'exploiter l'IA pour automatiser les tâches répétitives
- ❌ Mal adaptés aux workflows réels des praticiens

### Notre solution

✅ **Pensé terrain** : co-construit avec des praticiens en exercice  
✅ **IA utile** : pas un gadget, mais un vrai gain de temps quotidien  
✅ **Moderne** : interface web, accessible partout, sans installation  
✅ **Conforme** : HDS, RGPD, préparation Ségur

### Bénéfices clés

| ⏱️ **TEMPS** | 🎯 **SIMPLICITÉ** | 🔒 **SÉRÉNITÉ** |
|--------------|-------------------|-----------------|
| Gain de 30 min à 1h par jour grâce à l'automatisation | Interface intuitive, prise en main en moins d'une semaine | Données sécurisées, conformité assurée, support réactif |

---

## ✨ Fonctionnalités

### 🤖 Intelligence Artificielle

- **Dictée vocale intelligente** : Dicter → Compte rendu structuré en 30 secondes
- **Génération IA de documents** : Ordonnances, CR, courriers en 1 clic
- **Classement automatique** : Document déposé → classé au bon endroit
- **Résumé patient IA** : "Résume les antécédents" → réponse immédiate
- **Chat IA contextuel** : Assistant intelligent pour répondre aux questions

### 📋 Gestion des patients

- Dossiers patients complets et sécurisés
- Historique médical et dentaire
- Gestion des documents et imagerie
- Suivi des traitements et plans de soins
- Alertes médicales et risques

### 📅 Planification

- Calendrier interactif avec vue jour/semaine/mois
- Gestion des rendez-vous
- Rappels automatiques
- Planning de la journée avec timeline

### 💰 Facturation & Devis

- Création de devis dentaires
- Facturation avec codes CCAM
- Gestion des paiements
- Export comptable (CSV)
- Suivi des encaissements

### 📦 Gestion du stock

- Suivi des stocks de matériel
- Alertes de réapprovisionnement
- Traçabilité des prothèses
- Messagerie avec les prothésistes

### 💊 Ordonnances

- Génération assistée par IA
- Modèles personnalisables
- Historique des prescriptions
- Conformité légale

### 📊 Comptabilité

- Suivi des recettes et dépenses
- Tableaux de bord financiers
- Catégorisation automatique
- Export pour expert-comptable

---

## 🛠 Stack technique

### Frontend

- **React 19.2** avec TypeScript
- **Vite** pour le build et le développement
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI
- **React Router** pour la navigation
- **TanStack Query** pour la gestion des données
- **Zustand** pour l'état global
- **React Hook Form** + **Zod** pour les formulaires

### Backend

- **FastAPI** (Python 3.11+)
- **SQLAlchemy 2.0** (async) pour l'ORM
- **PostgreSQL** 15+ pour la base de données
- **Redis** 7+ pour le cache et les sessions
- **Alembic** pour les migrations
- **JWT** pour l'authentification
- **MFA** (TOTP) pour la sécurité renforcée

### Infrastructure

- **Docker** & Docker Compose
- **Multi-tenancy** (isolation par cabinet)
- Architecture RESTful
- API documentée avec Swagger/OpenAPI

---

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm
- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker (optionnel, pour la base de données)

### Installation du Frontend

```bash
cd clinicmind-frontend
npm install
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

### Installation du Backend

```bash
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou .\venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# Démarrer PostgreSQL et Redis (avec Docker)
docker-compose up -d db redis

# Appliquer les migrations
alembic upgrade head

# Lancer le serveur
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Le backend sera accessible sur `http://localhost:8000`
- **API Docs** : http://localhost:8000/api/docs
- **Health Check** : http://localhost:8000/health

### Variables d'environnement

Consultez les fichiers `.env.example` dans chaque dossier pour la configuration complète.

---

## 📁 Structure du projet

```
clinicmindai/
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── api/v1/         # Routes API
│   │   ├── models/         # Modèles SQLAlchemy
│   │   ├── schemas/        # Schémas Pydantic
│   │   ├── services/       # Logique métier
│   │   ├── repositories/  # Accès données
│   │   └── core/           # Sécurité, exceptions
│   ├── alembic/            # Migrations DB
│   ├── tests/              # Tests unitaires
│   └── requirements.txt
│
├── clinicmind-frontend/     # Application React
│   ├── src/
│   │   ├── app/           # Pages et routing
│   │   ├── components/    # Composants UI
│   │   ├── features/      # Modules fonctionnels
│   │   ├── hooks/         # Hooks React
│   │   ├── stores/        # État global (Zustand)
│   │   └── lib/           # Utilitaires
│   └── package.json
│
└── README.md
```

---

## 📚 Documentation

- [Documentation complète du projet](./CLINICMIND_CONTEXT_PACK.md)
- [Documentation Backend](./backend/README.md)
- [Documentation Frontend](./clinicmind-frontend/README.md)

### API Documentation

Une fois le backend démarré, accédez à la documentation interactive :
- **Swagger UI** : http://localhost:8000/api/docs
- **ReDoc** : http://localhost:8000/api/redoc

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Standards de code

- **TypeScript** : Mode strict, pas de `any`
- **React** : Composants fonctionnels uniquement
- **Styling** : Tailwind CSS uniquement
- **Sécurité** : Validation côté client ET serveur
- **Tests** : Tests unitaires pour la logique critique

---

## 🔒 Sécurité

ClinicMind AI prend la sécurité très au sérieux, surtout concernant les données de santé :

- ✅ Authentification JWT avec refresh tokens
- ✅ Authentification à deux facteurs (MFA)
- ✅ Multi-tenancy avec isolation des données
- ✅ Validation stricte des entrées
- ✅ Audit logs pour les accès aux données sensibles
- ✅ Conformité RGPD
- ✅ Préparation à la certification HDS

**⚠️ Important** : Ne jamais commiter de secrets ou de tokens dans le dépôt.

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👥 Équipe

Développé avec ❤️ pour les professionnels de santé dentaire.

---

## 📞 Contact & Support

- **GitHub Issues** : [Ouvrir une issue](https://github.com/leadenisse/clinicmindai/issues)
- **Documentation** : Consultez le [Context Pack](./CLINICMIND_CONTEXT_PACK.md)

---

<div align="center">

**Fait avec ❤️ pour simplifier le quotidien des praticiens**

⭐ Si ce projet vous est utile, n'hésitez pas à lui donner une étoile !

</div>

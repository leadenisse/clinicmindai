# ClinicMind AI — Backend (Phase 1)

API FastAPI pour ClinicMind AI : infrastructure, multi-tenancy (cabinet) et authentification (JWT + MFA).

## Stack

- **FastAPI** 0.109+
- **Python** 3.11+
- **SQLAlchemy** 2.0 (async)
- **PostgreSQL** 15+ (async via asyncpg)
- **Redis** 7+
- **Alembic** (migrations)
- **JWT** (python-jose) + **MFA** (pyotp)

## Structure

```
backend/
├── app/
│   ├── main.py           # Point d'entrée FastAPI
│   ├── config.py         # Configuration (Pydantic Settings)
│   ├── database.py       # Session DB async
│   ├── models/           # Modèles SQLAlchemy (Tenant, User)
│   ├── schemas/          # Schémas Pydantic (auth, user, common)
│   ├── api/v1/           # Routes (auth)
│   ├── services/         # Logique métier (auth_service)
│   ├── repositories/    # Accès données (base, tenant, user)
│   └── core/             # Security, exceptions, constants
├── alembic/              # Migrations
├── tests/
├── requirements.txt
├── docker-compose.yml    # PostgreSQL + Redis
└── .env.example
```

## Démarrage rapide

### 1. Environnement virtuel

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
# ou  .\venv\Scripts\activate  # Windows
```

### 2. Dépendances

```bash
pip install -r requirements.txt
```

### 3. Variables d'environnement

```bash
cp .env.example .env
# Éditer .env : SECRET_KEY, JWT_SECRET_KEY, DATABASE_URL
```

### 4. Base de données (Docker)

```bash
docker-compose up -d db redis
```

### 5. Migrations (optionnel en dev)

```bash
alembic revision --autogenerate -m "Initial: tenant and user"
alembic upgrade head
```

En `DEBUG=true`, les tables sont créées au démarrage si elles n'existent pas.

### 6. Lancer le serveur

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- **API Docs** : http://localhost:8000/api/docs  
- **Health** : http://localhost:8000/health  

## Endpoints (Phase 1)

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Inscription cabinet + admin |
| POST | `/api/v1/auth/login` | Connexion (JWT) |
| POST | `/api/v1/auth/refresh` | Rafraîchir les tokens |
| POST | `/api/v1/auth/forgot-password` | Demande reset password |
| POST | `/api/v1/auth/reset-password` | Reset password |
| GET | `/api/v1/auth/me` | Profil utilisateur (Bearer) |
| PUT | `/api/v1/auth/me/password` | Changer mot de passe |
| POST | `/api/v1/auth/mfa/setup` | Configurer MFA |
| POST | `/api/v1/auth/mfa/verify` | Activer MFA |
| POST | `/api/v1/auth/mfa/disable` | Désactiver MFA |
| GET | `/health` | Health check |

## Tests

```bash
pip install pytest pytest-asyncio httpx aiosqlite
pytest tests/ -v
```

## Phase 2 (prévue)

- Modèles Patient, Document
- CRUD Patients
- Upload fichiers (S3/MinIO)
- Endpoints patients et documents

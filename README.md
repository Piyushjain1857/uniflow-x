# UniFlow X

> **AI-powered Digital Operating System for Universities**

UniFlow X is an end-to-end digital campus ecosystem connecting Students, Faculty, Club Administrators, University Administrators, and Super Administrators.

---

## 🚀 Technology Stack

| Domain | Technology | Details |
| :--- | :--- | :--- |
| **Web Platform** | React + Vite + React Router | Pure JavaScript (JSX), styling via single main stylesheet (`apps/web/src/style.css`) |
| **Mobile Platform** | React Native + Expo | Pure JavaScript (JSX) with React Native `StyleSheet` |
| **Backend API** | Python + FastAPI | Asynchronous REST framework |
| **Database & ORM** | MySQL + SQLAlchemy + Alembic | Relational storage & database migration management |
| **Shared Packages** | Monorepo NPM Workspaces | Shared `@uniflow-x/api-client`, `@uniflow-x/constants`, `@uniflow-x/utils` |

---

## 📁 Folder Structure

```
uniflow-x/
├── apps/
│   ├── web/                     # Web application (React, Vite, React Router)
│   │   ├── src/
│   │   │   ├── components/      # Reusable UI components
│   │   │   ├── pages/           # Page views
│   │   │   ├── layouts/         # Layout wrappers
│   │   │   ├── services/        # Web API client integrations
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── context/         # React Context providers
│   │   │   ├── utils/           # Utility functions
│   │   │   ├── App.jsx          # Root App component & Router
│   │   │   ├── main.jsx         # App entrypoint
│   │   │   └── style.css        # MAIN SINGLE Web Stylesheet
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   └── package.json
│   └── mobile/                  # Mobile application (React Native, Expo)
│       ├── src/
│       │   ├── components/      # Native UI components
│       │   ├── screens/         # Mobile screen views
│       │   ├── navigation/      # Mobile navigation logic
│       │   ├── services/        # Mobile API client integration
│       │   ├── hooks/           # Custom hooks
│       │   └── utils/           # Mobile utilities
│       ├── App.js               # Entrypoint component
│       ├── app.json             # Expo config
│       ├── babel.config.js
│       └── package.json
├── backend/                     # Python FastAPI server
│   ├── app/
│   │   ├── api/                 # API router endpoints
│   │   ├── core/                # System settings & configuration
│   │   ├── db/                  # Database connection & base models
│   │   ├── models/              # SQLAlchemy database models
│   │   └── main.py              # FastAPI application instance
│   ├── alembic/                 # Database migration scripts
│   ├── alembic.ini              # Alembic configuration
│   └── requirements.txt         # Python dependencies
├── packages/                    # Monorepo shared packages
│   ├── api-client/              # Unified API client (@uniflow-x/api-client)
│   ├── constants/               # System roles & constants (@uniflow-x/constants)
│   └── utils/                   # Shared utility helpers (@uniflow-x/utils)
├── docs/                        # Project documentation
│   └── architecture.md
├── .env.example                 # Root environment template
├── .gitignore                   # Monorepo gitignore rules
├── README.md                    # Project documentation
└── package.json                 # Monorepo root configuration
```

---

## 🛠️ Development Commands

### Prerequisites
- **Node.js**: `v18+` & `npm v9+`
- **Python**: `3.10+`

### 1. Installation

Install all monorepo JavaScript dependencies (web, mobile, and shared packages):

```bash
cd uniflow-x
npm install
```

Set up Python virtual environment for backend:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

---

### 2. Running Applications

#### Web Application (Vite Dev Server)
From monorepo root:
```bash
npm run dev:web
```
Or from `apps/web`:
```bash
cd apps/web
npm run dev
```

#### Mobile Application (Expo Dev Server)
From monorepo root:
```bash
npm run dev:mobile
```
Or from `apps/mobile`:
```bash
cd apps/mobile
npm run start
```

#### Backend Application (FastAPI / Uvicorn)
From `backend` directory (with active venv):
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```
API Documentation will be available at: `http://localhost:8000/docs`

---

### 3. Building for Production

#### Build Web Bundle:
```bash
npm run build:web
```

---

## 🔒 Mandatory Rules & Constraints

- **Web Styling**: Exactly one CSS file (`apps/web/src/style.css`) is allowed and used for all web styling.
- **Language**: JavaScript only (`.js` / `.jsx`) across web, mobile, and packages.
- **No Third-Party CSS Frameworks**: No Tailwind, Bootstrap, CSS Modules, styled-components, SCSS/Sass, or Less.

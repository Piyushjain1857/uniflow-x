# UniFlow X — Architecture Overview

UniFlow X is an AI-powered Digital Operating System designed for modern university ecosystems.

## Supported Personas
1. **Students** — Access course materials, club events, announcements, and AI assistance.
2. **Faculty** — Course management, grading, research portal, and communication.
3. **Club Administrators** — Event organization, member rosters, budget requests, and notifications.
4. **University Administrators** — Operations management, analytics dashboard, department policies.
5. **Super Administrators** — Multi-tenant configurations, system access controls, global audit logs.

## Monorepo Architecture
```
uniflow-x/
├── apps/
│   ├── web/           # React 18 + Vite (JavaScript / JSX)
│   └── mobile/        # React Native + Expo (JavaScript / JSX)
├── backend/           # Python + FastAPI + SQLAlchemy + Alembic + MySQL
├── packages/          # Shared JavaScript Packages
│   ├── api-client/    # Unified HTTP API client for web & mobile
│   ├── constants/     # Roles, configuration, and app metadata
│   └── utils/         # Date formatters, string helpers, shared logic
├── docs/              # Architectural documentation
├── .gitignore
├── README.md
└── package.json       # Monorepo NPM workspace configuration
```

## System Components
- **Web Application**: Single Page Application built using React, Vite, React Router, and a single centralized stylesheet (`apps/web/src/style.css`).
- **Mobile Application**: Native mobile app for iOS and Android powered by Expo and React Native.
- **Backend Service**: High-performance RESTful API using FastAPI, SQLAlchemy ORM, Alembic migrations, and MySQL database engine.
- **Shared Packages**: NPM workspace packages providing type-safe and consistent constants, utilities, and API access across apps.

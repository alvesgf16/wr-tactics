# Wild Rift Draft Assistant

A web-based drafting assistant for League of Legends: Wild Rift that provides intelligent champion suggestions and real-time draft insights based on Chinese server statistics.

## 🎯 Project Overview

Since Wild Rift doesn't support third-party overlays, this tool operates as a standalone web application where users manually input draft picks and bans to receive AI-driven recommendations. The system scrapes [official Chinese server statistics](https://lolm.qq.com/act/a20220818raider/index.html) to generate tier lists and provide data-driven drafting assistance.

### Key Features

- **Automated Tier Lists**: Daily-updated champion tier lists by role and rank tier
- **Draft Assistant**: Real-time champion suggestions during draft phase (Phase 2)
- **Composition Analysis**: Team comp gap detection and insights (Phase 2)
- **Meta Tracking**: Historical trends across patches

## 📁 Project Structure

```plaintext
wr-tactics/
├── api/                         # Backend service (FastAPI)
│   ├── src/
│   │   ├── scraper/            # Data scraping module
│   │   └── main.py             # API entry point
│   ├── tests/                   # API tests
│   ├── requirements.txt         # API dependencies (lightweight)
│   ├── requirements-scraper.txt # Scraper dependencies
│   ├── requirements-dev.txt     # Development dependencies
│   ├── pyproject.toml          # Python project configuration
│   └── README.md               # API documentation
│
├── ui/                          # React frontend application
│   ├── src/                    # Frontend source code
│   ├── public/                 # Static assets
│   ├── package.json            # Node dependencies & scripts
│   └── README.md               # UI documentation
│
├── docs/                        # Detailed documentation
│   └── (future docs)           # Architecture, API specs, etc.
│
└── README.md                   # This file
```

### Component Responsibilities

- **`/api`**: Monorepo containing both the REST API service and scraper module
  - **`/api/src`**: API source code for tier lists, champion statistics, and draft suggestions
  - **`/api/src/scraper`**: Scraper module for collecting champion statistics from lolm.qq.com
- **`/ui`**: User-facing web application built with React, TypeScript, and Vite
- **`/docs`**: Comprehensive project documentation (coming soon)

### Dependency Management

The API uses separate requirement files for different deployment scenarios:

- **`requirements.txt`**: Lightweight API deployment (FastAPI, database tools)
- **`requirements-scraper.txt`**: Scraper deployment (Playwright, web scraping tools)
- **`requirements-dev.txt`**: Development tools (testing, linting, formatting)
- **`pyproject.toml`**: Python project configuration with optional dependency groups

#### Why Split Dependencies?

Dependencies are separated to optimize deployment size and performance:

**Size Comparison:**

- **API-only deployment**: ~30MB (FastAPI, database tools)
- **Scraper deployment**: ~230MB (includes Playwright + browser binaries)
  - Playwright package: ~5MB
  - Chromium browser binary: ~150MB
  - Browser dependencies: ~50MB

**Benefits:**

- **Smaller API containers**: 30MB vs 230MB when scraper dependencies excluded
- **Faster cold starts**: Less installation overhead on platforms like Render
- **Clear separation**: API and scraper can be deployed independently
- **Cost efficiency**: Lighter containers use fewer resources

**Dependency Categories:**

- **API-only**: FastAPI, Uvicorn
- **Scraper-only**: Playwright, BeautifulSoup4
- **Shared**: SQLAlchemy, Redis, Pydantic (both use database/cache)

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+** (for API and scraper)
- **Node.js 18+** (for UI)
- **PostgreSQL** (database)
- **Redis** (caching - optional)

### UI (Frontend)

```bash
cd ui

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Code quality commands
npm run lint              # Check for linting issues
npm run lint:fix          # Auto-fix linting issues
npm run format            # Format code with Prettier
npm run format:check      # Check code formatting
npm run typecheck         # Run TypeScript type checking
```

The UI will be available at `http://localhost:5173`

### API (Backend)

```bash
cd api

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies (choose one approach):

# Option 1: Using pyproject.toml (recommended for development)
pip install -e .[api,dev]      # API + dev tools
pip install -e .[scraper,dev]  # Scraper + dev tools
pip install -e .[all]          # Everything

# Option 2: Using requirements files (for production/deployment)
pip install -r requirements.txt -r requirements-dev.txt         # API
pip install -r requirements-scraper.txt -r requirements-dev.txt # Scraper

# Set environment variables
# DATABASE_URL=postgresql://...
# REDIS_URL=redis://...

# Run development server
uvicorn src.main:app --reload

# Run tests
pytest

# Code quality commands
black .                   # Format code with Black
ruff check .              # Lint with Ruff
ruff check . --fix        # Auto-fix Ruff issues
mypy .                    # Type check with MyPy
```

The API will be available at `http://localhost:8000`

### Scraper

The scraper is integrated into the API as a module at `api/src/scraper`.

```bash
cd api

# Ensure scraper dependencies are installed
pip install -e .[scraper]  # or: pip install -r requirements-scraper.txt

# Install Playwright browsers
playwright install

# Set environment variables
# DATABASE_URL=postgresql://...

# Run scraper manually
python -m src.scraper.main

# Run tests
pytest
```

## 📚 Documentation

Detailed documentation for each component:

- **[API Documentation](./api/README.md)** - REST API endpoints, database schema, scraper module, deployment
- **[UI Documentation](./ui/README.md)** - Component structure, state management, styling

## 🛠️ Technology Stack

| Layer          | Technology                 | Purpose                      |
| -------------- | -------------------------- | ---------------------------- |
| **Frontend**   | React + TypeScript + Vite  | Modern, fast, type-safe UI   |
| **Styling**    | Tailwind CSS               | Utility-first CSS framework  |
| **Backend**    | Python + FastAPI           | High-performance API service |
| **Database**   | PostgreSQL (Supabase)      | Relational data storage      |
| **Cache**      | Redis (Upstash)            | Fast tier list retrieval     |
| **Scraper**    | Playwright                 | Dynamic content scraping     |
| **Deployment** | Vercel (UI) + Render (API) | Free tier hosting            |

## 📅 Development Phases

### ✅ Phase 1: Tier List (Current)

Build the data pipeline and tier list generation system.

**Deliverables:**

- Automated daily scraping of lolm.qq.com
- PostgreSQL database with champion statistics
- Tier list calculation algorithm
- Web UI displaying tier lists (filterable by role, rank tier, patch)

### 🔜 Phase 2: Draft Assistant

Core drafting intelligence and real-time suggestions.

**Deliverables:**

- Manual draft input interface
- Champion suggestion algorithm
- Real-time composition analysis
- Insight notifications

### 💡 Phase 3: Advanced Features

Enhanced functionality for power users.

**Potential Features:**

- Team creation and management
- Draft history and analytics
- Mock draft simulator
- Custom tier list weights

## 🤝 Contributing

This is currently a personal project. Contributions, issues, and feature requests are welcome!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:

- Code style and formatting rules
- Running linters and formatters
- Commit message format
- Pre-commit hook behavior

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 🔗 Related Links

- [League of Legends: Wild Rift](https://wildrift.leagueoflegends.com/)
- [Official Chinese Stats (Data Source)](https://lolm.qq.com/act/a20220818raider/index.html)

---

**Note**: This project is in active development. Phase 1 (Tier Lists) is the current focus.

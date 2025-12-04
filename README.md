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
├── api/                    # FastAPI backend service
│   ├── src/               # API source code
│   ├── tests/             # API tests
│   ├── requirements.txt   # Python dependencies
│   └── README.md         # API documentation
│
├── scraper/               # Data scraping service
│   ├── src/              # Scraper source code
│   ├── tests/            # Scraper tests
│   ├── requirements.txt  # Python dependencies
│   └── README.md         # Scraper documentation
│
├── ui/                    # React frontend application
│   ├── src/              # Frontend source code
│   ├── public/           # Static assets
│   ├── package.json      # Node dependencies & scripts
│   └── README.md         # UI documentation
│
├── docs/                  # Detailed documentation
│   └── (future docs)     # Architecture, API specs, etc.
│
└── README.md             # This file
```

### Component Responsibilities

- **`/api`**: REST API service providing tier lists, champion statistics, and draft suggestions
- **`/scraper`**: Automated daily scraper that collects champion statistics from lolm.qq.com
- **`/ui`**: User-facing web application built with React, TypeScript, and Vite
- **`/docs`**: Comprehensive project documentation (coming soon)

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

# Run linter
npm run lint
```

The UI will be available at `http://localhost:5173`

### API (Backend)

```bash
cd api

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Set environment variables
# DATABASE_URL=postgresql://...
# REDIS_URL=redis://...

# Run development server
uvicorn src.main:app --reload

# Run tests
pytest
```

The API will be available at `http://localhost:8000`

### Scraper

```bash
cd scraper

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install

# Set environment variables
# DATABASE_URL=postgresql://...

# Run scraper manually
python src/main.py

# Run tests
pytest
```

## 📚 Documentation

Detailed documentation for each component:

- **[API Documentation](./api/README.md)** - REST API endpoints, database schema, deployment
- **[Scraper Documentation](./scraper/README.md)** - Scraping logic, scheduling, data validation
- **[UI Documentation](./ui/README.md)** - Component structure, state management, styling

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React + TypeScript + Vite | Modern, fast, type-safe UI |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Backend** | Python + FastAPI | High-performance API service |
| **Database** | PostgreSQL (Supabase) | Relational data storage |
| **Cache** | Redis (Upstash) | Fast tier list retrieval |
| **Scraper** | Playwright | Dynamic content scraping |
| **Deployment** | Vercel (UI) + Render (API) | Free tier hosting |

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

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 🔗 Related Links

- [League of Legends: Wild Rift](https://wildrift.leagueoflegends.com/)
- [Official Chinese Stats (Data Source)](https://lolm.qq.com/act/a20220818raider/index.html)

---

**Note**: This project is in active development. Phase 1 (Tier Lists) is the current focus.

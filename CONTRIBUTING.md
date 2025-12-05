# Contributing to WR Tactics

Thank you for your interest in contributing to WR Tactics! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Code Style Guidelines](#code-style-guidelines)
  - [TypeScript/React (UI)](#typescriptreact-ui)
  - [Python (API)](#python-api)
- [Running Linters Locally](#running-linters-locally)
  - [UI/Frontend](#uifrontend)
  - [API/Backend](#apibackend)
- [Commit Message Format](#commit-message-format)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Development Workflow](#development-workflow)

## Project Structure

This is a monorepo containing:

- **`ui/`** - Frontend application (React + TypeScript + Vite)
- **`api/`** - Backend API (Python FastAPI)
- **`scraper/`** - Data scraping utilities (Python)

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** (for the API)
- **Redis** (optional, for caching)

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:alvesgf16/wr-tactics.git
   cd wr-tactics
   ```

2. **Install root dependencies** (for pre-commit hooks)

   ```bash
   npm install
   ```

3. **Set up the UI**

   ```bash
   cd ui
   npm install
   ```

4. **Set up the API**

   ```bash
   cd api
   python -m venv .venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate

   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```

## Code Style Guidelines

### TypeScript/React (UI)

We use **ESLint** and **Prettier** to enforce consistent code style in the frontend.

#### Key UI Style Rules

- **Quotes**: Single quotes (`'`)
- **Semicolons**: Required
- **Indentation**: 2 spaces
- **Line Length**: 80 characters maximum
- **Trailing Commas**: ES5 style
- **Arrow Functions**: Always use parentheses around parameters

#### Import Ordering

Imports must be organized in the following order, with blank lines between groups:

1. Built-in Node.js modules
2. External dependencies (npm packages)
3. Internal modules (absolute imports)
4. Parent directory imports (`../`)
5. Sibling imports (`./`)
6. Index imports

Within each group, imports should be alphabetically sorted.

**Example:**

```typescript
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { formatDate } from '@/utils/formatters';

import { Button } from '../components/Button';

import { UserProfile } from './UserProfile';
```

#### TypeScript Rules

- **No unused variables**: Error
- **No explicit `any` types**: Warning (avoid when possible)
- **React Hooks**: Strict enforcement of rules of hooks

### Python (API)

We use **Black**, **Ruff**, and **MyPy** to enforce code quality in the backend.

#### Key API Style Rules

- **Line Length**: 80 characters maximum
- **Python Version**: 3.11+ syntax
- **Type Hints**: Required (strict MyPy mode enabled)
- **Import Sorting**: Automated with isort rules
- **Naming**: Follow PEP 8 conventions
- **Blank Lines**: 2 blank lines after imports

#### Linting Rules

Ruff is configured to enforce:

- **E** - pycodestyle errors
- **F** - pyflakes
- **I** - isort (import sorting)
- **N** - pep8-naming
- **W** - pycodestyle warnings
- **UP** - pyupgrade (modern Python syntax)
- **B** - flake8-bugbear (anti-patterns)
- **C4** - flake8-comprehensions

**Example:**

```python
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.database import get_db
from src.models import Champion
from src.schemas import ChampionResponse


def get_champions(db: Session = Depends(get_db)) -> List[ChampionResponse]:
    """Retrieve all champions from the database."""
    champions = db.query(Champion).all()
    return [ChampionResponse.from_orm(champ) for champ in champions]
```

## Running Linters Locally

### UI/Frontend

Navigate to the `ui/` directory:

```bash
cd ui
```

#### Check for linting issues

```bash
npm run lint
```

#### Auto-fix linting issues

```bash
npm run lint:fix
```

#### Check code formatting

```bash
npm run format:check
```

#### Auto-format code

```bash
npm run format
```

#### Type checking

```bash
npm run typecheck
```

#### Run all UI checks

```bash
npm run lint && npm run format:check && npm run typecheck
```

### API/Backend

Navigate to the `api/` directory and activate your virtual environment:

```bash
cd api
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

#### Format code with Black

```bash
black .
```

#### Lint with Ruff

```bash
ruff check .
```

#### Auto-fix Ruff issues

```bash
ruff check . --fix
```

#### Type check with MyPy

```bash
mypy .
```

#### Run tests

```bash
pytest
```

#### Run tests with coverage

```bash
pytest --cov
```

#### Run all API checks

```bash
black . && ruff check . && mypy . && pytest
```

## Commit Message Format

We use **Conventional Commits** enforced by **commitlint**. All commit messages must follow this format:

```plaintext
<type>: <Subject in sentence case>
```

### Allowed Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring (neither fixes a bug nor adds a feature)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependency updates, build config, etc.)
- **perf**: Performance improvements
- **ci**: CI/CD configuration changes

### Subject Rules

- Must be in **sentence case** (first word capitalized, rest lowercase unless proper nouns)
- No period at the end
- Describe what the commit does, not what you did

### Examples

✅ **Good:**

```plaintext
feat: Add champion tier list endpoint
fix: Resolve authentication token expiration issue
docs: Update API documentation for match endpoints
refactor: Simplify champion data transformation logic
test: Add unit tests for matchmaking service
```

❌ **Bad:**

```plaintext
feat: added champion tier list endpoint (not sentence case)
Fix: resolve authentication issue (type should be lowercase)
add tests (missing type)
FEAT: NEW FEATURE (subject not in sentence case)
fix: Fixed the bug. (has period at end)
```

## Pre-commit Hooks

We use **Husky** and **lint-staged** to automatically run code quality checks before each commit.

### What Happens Before Each Commit

When you run `git commit`, the following checks run automatically:

#### For UI Files (`ui/**/*.{ts,tsx}`)

1. **ESLint** - Automatically fixes linting issues
2. **Prettier** - Automatically formats code

#### For API Files (`api/**/*.py`)

1. **Black** - Automatically formats code
2. **Ruff** - Automatically fixes linting issues

#### Commit Message Validation

After staging changes, **commitlint** validates your commit message format.

### Behavior

- **If all checks pass**: Your commit succeeds
- **If checks fail**:
  - Auto-fixable issues are corrected and re-staged
  - Non-fixable issues block the commit
  - You'll see error messages indicating what needs to be fixed manually

### Bypassing Hooks (Not Recommended)

In rare cases where you need to bypass pre-commit hooks:

```bash
git commit --no-verify -m "your message"
```

⚠️ **Warning**: Only use this in exceptional circumstances. All code must pass checks before being merged.

### Manual Hook Setup

If hooks aren't working, reinstall them:

```bash
npm run prepare
```

## Development Workflow

1. **Create a feature branch**

   All branches must be linked to a JIRA ticket. Use the ticket ID as the branch prefix:

   ```bash
   git checkout -b WRT-XXX-brief-description
   ```

   Example: `WRT-123-add-champion-filtering`

2. **Make your changes**

   - Write code following the style guidelines
   - Run linters frequently (or enable IDE integration)
   - Commit often with meaningful commit messages

3. **Before committing**

   - Pre-commit hooks will automatically run
   - Fix any issues that can't be auto-corrected
   - Ensure your commit message follows the conventional format

4. **Push your changes**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all CI checks pass

## IDE Integration (Recommended)

For the best development experience, install these extensions:

### VS Code

- **ESLint** - dbaeumer.vscode-eslint
- **Prettier** - esbenp.prettier-vscode
- **Python** - ms-python.python
- **Ruff** - charliermarsh.ruff
- **Black Formatter** - ms-python.black-formatter

Configure VS Code to format on save:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true
  }
}
```

---

## Questions?

If you have questions about contributing, please:

1. Check existing issues and discussions
2. Review the project README files
3. Open a new issue with the `question` label

Thank you for contributing to WR Tactics! 🎮

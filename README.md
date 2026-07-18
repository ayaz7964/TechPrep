# TechPrep 2026

A comprehensive full-stack interview preparation app covering 27+ technical categories with interactive study tools, SVG architecture diagrams, code examples, and MCQ assessments.

## Features

- **27+ Categories** — JavaScript, React, Node.js, MongoDB, SQL, System Design, DevOps, Docker, Kubernetes, DSA, OOP, and more
- **Interactive Study** — Topic cards with TL;DR, Layman Definition, Deep Dive, and Interview Q&A sections
- **SVG Architecture Diagrams** — Auto-generated system diagrams with proper arrow markers, text wrapping, and responsive layouts
- **Code Examples** — Practical code snippets for each topic
- **MCQ Assessments** — Multiple-choice questions with instant grading
- **Progress Tracking** — Track completed topics with persistent local storage
- **Search & Filter** — Quick topic search across all categories

## Categories

| Category | Topics | Category | Topics |
|---|---|---|---|
| JavaScript | 30 | React.js | 45 |
| Node.js & Express | 17+15 | Next.js | 18 |
| MongoDB | 25 | SQL | 46 |
| MERN Stack | 15 | System Design | 24 |
| Docker | 94 | Kubernetes | 111 |
| DevOps & Cloud | 43 | CI/CD | 24 |
| Git & Version Control | 47 | GitHub Actions | 21 |
| Jenkins | 35 | CDN | 30 |
| API Gateway | 13 | Traffic Management | 24 |
| Auth & Security | 18 | Monitoring | 16 |
| Logging | 6 | DSA | 30 |
| OOP & CS | 20 | | |

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS (no framework dependencies)
- **Data Generation:** Node.js scripts produce topic data + SVG diagrams
- **Diagrams:** Inline SVG with auto-wrapping text, centered arrows, reusable marker defs
- **Storage:** Browser `localStorage` for progress persistence

## Quick Start

```
git clone <repo-url>
cd techprep-2026
```

Open `index.html` in a browser — no build step required. All topic data is pre-generated.

### Regenerate Topic Data

```bash
# Regenerate all categories
node data/gen-new-categories.js

# Or regenerate individual categories
node data/system-design/gen-sd.js
node data/docker/gen-docker.js
# ... etc
```

## Project Structure

```
├── index.html              # Main application shell
├── css/style.css           # Application styles
├── js/app.js               # Client-side application logic
├── data/
│   ├── <category>/         # Per-category directories
│   │   ├── gen-*.js        # Topic + SVG generator scripts
│   │   ├── topics-data.js  # Generated topic data (loaded by browser)
│   │   └── topics.json     # Generated topic index (if applicable)
│   ├── svg-helpers.js      # Shared SVG rendering utilities
│   ├── categories.json     # Category metadata
│   ├── topics-data.js      # Aggregated topic data
│   └── topics.json         # Aggregated topic index
├── .tmp_*.js               # Utility scripts (dev-only)
└── README.md
```

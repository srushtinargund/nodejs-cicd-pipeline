# Node.js TypeScript Microservice — CI/CD Pipeline

A RESTful task management microservice built with Node.js and TypeScript, deployed via a 4-stage GitHub Actions CI/CD pipeline.

Academic project demonstrating TypeScript development, automated testing, and CI/CD best practices.

---

## Pipeline stages

```
push to main
     │
     ▼
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌──────────────────┐
│  Lint   │───▶│  Test   │───▶│  Build  │───▶│ Deploy (staging) │
│ ESLint  │    │  Jest + │    │   tsc   │    │   main only      │
│         │    │coverage │    │         │    │                  │
└─────────┘    └─────────┘    └─────────┘    └──────────────────┘
```

Each stage only runs if the previous one passes. A failed lint blocks tests. A failed test blocks the build. The deploy only triggers on pushes to `main`.

---

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update task status |
| DELETE | `/tasks/:id` | Delete a task |

### Task status values
`pending` → `in-progress` → `done`

---

## Tech stack

| Tool | Purpose |
|------|---------|
| TypeScript 5 | Strongly typed Node.js |
| Express 4 | HTTP framework |
| Jest + Supertest | Unit and integration tests |
| ESLint | Static analysis and linting |
| GitHub Actions | CI/CD pipeline automation |

---

## How to run locally

**1. Clone and install**
```bash
git clone https://github.com/srushti-nargund/nodejs-cicd-pipeline.git
cd nodejs-cicd-pipeline
npm install
```

**2. Run in development mode**
```bash
npm run dev
# Server starts on http://localhost:3000
```

**3. Run tests**
```bash
npm test
```

**4. Run linter**
```bash
npm run lint
```

**5. Build for production**
```bash
npm run build
# Compiled output in /dist
```

---

## Example requests

```bash
# Health check
curl http://localhost:3000/health

# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Review ONE360 dashboard config"}'

# Update task status
curl -X PATCH http://localhost:3000/tasks/task-1234567890 \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}'
```

---

## Project structure

```
nodejs-cicd-pipeline/
├── src/
│   └── index.ts                    # Express app — routes and handlers
├── tests/
│   └── index.test.ts               # Jest + Supertest integration tests
├── .github/
│   └── workflows/
│       └── pipeline.yml            # 4-stage CI/CD pipeline definition
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

*Academic project — demonstrates TypeScript microservice development and CI/CD pipeline automation.*

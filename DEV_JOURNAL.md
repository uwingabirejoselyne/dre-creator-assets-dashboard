# Dev Journal

## 2026-04-26 — Day 1

### Step 1: Project scaffold
Set up Vite + React + TypeScript + Tailwind. Created required doc files.
Chose Vitest for testing to stay in the same ecosystem as Vite with no extra config.

Decided against a UI component library (MUI, shadcn) to keep the code transparent
and reviewable — every style decision is visible in the JSX.

### Upcoming
- Define asset types and mock data
- Build asset list with states
- Add search and filter
- Asset detail view
- Upload form with validation
- Write tests aligned with TEST_PLAN.md

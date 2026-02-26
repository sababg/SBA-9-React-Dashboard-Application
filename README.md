# SBA-9 React Dashboard Application

## Reflections

1: Using Typed components and reusable typed UI components

2: There was not special challenges

3: Keep components small, focused, and reusable while lifting state to the appropriate level. I kept core application state in the top-level dashboard component and i separated components. Using strong type. Using controlled form.

## Table of Contents

- [SBA-9 React Dashboard Application](#sba-9-react-dashboard-application)
  - [Reflections](#reflections)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
    - [1) Clone the repository](#1-clone-the-repository)
    - [2) Install dependencies](#2-install-dependencies)
    - [3) Start the development server](#3-start-the-development-server)
  - [Available Scripts](#available-scripts)
  - [Environment Variables](#environment-variables)
  - [Preview](#preview)
    - [Preview](#preview-1)
  - [Project Structure](#project-structure)
    - [Component Props \& Usage](#component-props--usage)
      - [`TaskFilter`](#taskfilter)
      - [`Searchbar`](#searchbar)
  - [](#)

## Tech Stack

- React
- TypeScript
- Tailwind
- Node.js tooling (Vite or CRA)

## Prerequisites

Install the following:

- Node.js (LTS recommended)
- A package manager:
  - npm (comes with Node), or
  - yarn, or
  - pnpm

Verify:

```bash
node -v
npm -v
```

## Setup

### 1) Clone the repository

```bash
git clone https://github.com/sababg/SBA-9-React-Dashboard-Application.git
cd SBA-9-React-Dashboard-Application
```

### 2) Install dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn
```

Using pnpm:

```bash
pnpm install
```

### 3) Start the development server

Using npm:

```bash
npm run dev
```

If your project uses Create React App, it may be:

```bash
npm start
```

Then open the URL shown in your terminal (often http://localhost:5173 for Vite or http://localhost:3000 for CRA).

## Available Scripts

Common scripts (your `package.json` is the source of truth):

- `dev` / `start`: run the app locally in development mode
- `build`: create a production build
- `preview`: preview the production build locally (common in Vite)
- `test`: run tests (if configured)
- `lint`: run linting (if configured)
- `format`: run formatting (if configured)

Examples:

```bash
npm run build
npm run preview
```

## Environment Variables

If the app requires environment variables, create a local env file at the project root.

Common patterns:

- Vite: `.env` with variables prefixed by `VITE_`

Example (Vite):

```bash
# .env
VITE_API_BASE_URL="https://api.example.com"
```

## Preview

### Preview

```bash
npm run preview
```

## Project Structure

A typical structure might look like:

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

### Component Props & Usage

> Replace the component names below with your real components (from `src/components`), and expand as needed.

#### `TaskFilter`

**Purpose:** Filter task list based on status or priority

**Props:** onFilterChange:(filters: {status?: TaskStatus;priority?: PriorityStatus;}) => void

**Usage:**

```jsx
import ComponentName from "./components/TaskFilter/TaskFilter";

export default function Example() {
  return <TaskFilter onFilterChange={setFilters} />;
}
```

#### `Searchbar`

**Purpose:** Filter task list based on status or priority

**Props:**

| Prop       | Type                       | Required | Description                            |
| ---------- | -------------------------- | -------- | -------------------------------------- |
| `value`    | `string`                   | Yes      | Value of the searched data             |
| `onSearch` | `(value: string)) => void` | Yes      | set the searched value in parent state |

**Usage:**

```jsx
import ComponentName from "./components/TaskList/Searchbar";

export default function Example() {
  return <Searchbar value={search} onSearch={setSearch} />;
}
```

##

👤 Author
Saba Beigi
🌎 Charlotte, NC
💼 GitHub @sababg
📧 beigisaba@gmail.com

Feel free to reach out with questions, feedback, or ideas!

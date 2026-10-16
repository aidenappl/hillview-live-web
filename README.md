# hillview-live-web

The HillviewTV live page — the daily announcements and PAC broadcasts.

> **Hillview platform** · Next.js app · watch.hillview.tv (Lattice stack 38)

---

## Overview

The live-broadcast page at **watch.hillview.tv**: an embedded Vimeo live event with a live/offline badge driven by `/api/live-status`. `live.hillview.tv` is a Cloudflare redirect to it.

## Role in the Hillview ecosystem

One of three Hillview web apps (hillview.tv, team.hillview.tv, watch.hillview.tv) in front of the five Hillview Go APIs at `api.hillview.tv`. Reports to Monitor zone **hillview** as `hillview-live-web`.

## Tech stack

Next.js 16 (**App Router**), React 19, Tailwind CSS v4, TypeScript, `@aidenappleby/monitor-js` · Docker · Lattice

## Getting started

### Prerequisites

Node 24, the `dev` CLI.

### Setup

```bash
npm install
cp .env.example .env.local   # where present; see AGENTS.md §4 for the variables
dev
```

## Development

| Command         | What it does                    |
| --------------- | ------------------------------- |
| `dev`           | Start the dev server            |
| `dev build`     | Production build                |
| `dev lint`      | ESLint                          |
| `dev format`    | Prettier                        |
| `dev typecheck` | `tsc --noEmit`                  |
| `dev check`     | lint + format check + typecheck |

## Project structure

See [AGENTS.md §3](AGENTS.md#3-project-structure).

## Deployment

Push to `main` → GitHub Actions builds `registry.appleby.cloud/hillview-live-web:latest` → Lattice stack 38 redeploys the container (worker-5, port 3012).

## Contributing & further reading

- [AGENTS.md](AGENTS.md) — conventions, telemetry, operations
- Related: hillview-tv-web, hillview-team-web, hillview-live-web, hillviewVideoAPI, hillviewCoreAPI, hillviewAuthAPI

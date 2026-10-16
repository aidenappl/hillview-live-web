<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — hillview-live-web

## 1. What this repo is

The live-broadcast page at **watch.hillview.tv**: an embedded Vimeo live event with a live/offline badge driven by `/api/live-status`. `live.hillview.tv` is a Cloudflare redirect to it.

Served at **watch.hillview.tv (live.hillview.tv 301s here)** from Lattice stack 38 "Hillview Web". It moved off Vercel (team `hillview-ms`) in October 2026. It owns no data — everything comes from the Hillview Go APIs at `api.hillview.tv`.

## 2. Stack & dependencies

- Next.js 16 (**App Router**), React 19, Tailwind CSS v4, TypeScript, `@aidenappleby/monitor-js`
- Node 24 (Docker `node:24-alpine`), `output: "standalone"`
- Telemetry: `@aidenappleby/monitor-js` ^1.2.1 → Monitor zone **hillview** (§6)

## 3. Project structure

```
hillview-live-web/
  src/app/                     # routes; `api/health`, `api/monitor` (telemetry relay), `api/live-status` (Vimeo); `error.tsx` / `global-error.tsx` report to Monitor
  src/components/              # UI
  src/lib/                     # `monitor-server.ts`, `monitor-relay.ts`
  src/services/                # `monitor.service.ts` (browser Monitor)
  public/                      # static assets
  src/instrumentation.ts       # onRequestError → Monitor (Node runtime only)
  src/instrumentation-client.ts # creates the browser Monitor before hydration
  next.config.*                # standalone output, image hosts, security headers
  Dockerfile                   # node:24-alpine build → standalone runner as uid 1001, HEALTHCHECK /api/health
  .github/workflows/push-to-registry.yml   # main → registry.appleby.cloud → Lattice redeploy
  Devfile.yaml                 # dev CLI commands
```

## 4. Running, building & testing

```bash
dev            # next dev
dev build      # next build
dev check      # lint + prettier --check + tsc --noEmit
```

| Variable             | Kind    | Purpose                                                                                                                    |
| -------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `MONITOR_INGEST_URL` | runtime | Monitor ingest, `https://hillview-monitor-api.appleby.cloud/v1/events`. Unset = telemetry discarded (logged once a minute) |
| `MONITOR_API_KEY`    | runtime | Ingest-scoped key minted on the **hillview** zone; server-side only                                                        |
| `MONITOR_ENV`        | runtime | Event `env` (default `production`)                                                                                         |

`NEXT_PUBLIC_*` values are compiled into the bundle: they are Docker **build args** set in `push-to-registry.yml`, not Lattice env. Changing one needs a rebuild, not a redeploy. Locally, put them in `.env.local`.

## 5. How code is written here

- Data fetching is imperative (`useEffect` + service calls, or `getServerSideProps`) through the axios wrapper in `services/http/requestHandler.ts`; no SWR/React Query.
- Report errors with `reportError(name, error, data)` from `services/monitor.service.ts` in boundaries and catch blocks that change what the user sees. Never put form values, tokens or response bodies in event data.
- The Monitor ingest key never reaches the browser: the browser SDK posts to the same-origin `/api/monitor`, which validates the batch, forces `service` to `hillview-live-web`, adds the key and forwards.
- Legacy codebase: some components predate the estate standards (e.g. component libraries, Pages Router). Don't extend those patterns.

## 6. Domain & architecture

**Request flow:** Cloudflare (proxied, `hillview.tv` zone) → NPM proxy host → worker-5 `10.15.10.79:3012` → Next.js standalone server. Browser API calls go straight to `https://api.hillview.tv`.

### Monitor telemetry

Service **`hillview-live-web`**, zone **`hillview`** (Lattice stack 37). Server-side events ship directly from the container; browser events go through `/api/monitor`. The server client is created lazily from runtime env and installs no process-wide handlers, so a crash still crashes the container.

| Event                                         | Level | Meaning                                                                                                                                             |
| --------------------------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server.request.error`                        | error | a server render / API route threw (`instrumentation.ts` `onRequestError`): message, stack, digest, route, router kind                               |
| `client.error.boundary / client.error.global` | error | a render error reached an error boundary                                                                                                            |
| `(uncaught errors, unhandled rejections)`     | error | captured by the browser SDK automatically                                                                                                           |
| `monitor.relay.rejected`                      | warn  | the relay refused a batch (`reason`: cross_origin, body_too_large, too_many_events, invalid_json, not_an_object) — at most once a minute per reason |

## 7. Ecosystem & related repos

- **Calls:** hillviewVideoAPI, hillviewCoreAPI, hillviewAuthAPI, hillviewLinksAPI, hillviewAssetsAPI (all at `api.hillview.tv`).
- **Siblings:** hillview-tv-web (hillview.tv), hillview-team-web (team.hillview.tv), hillview-live-web (watch.hillview.tv) — same Dockerfile, CI and Monitor wiring.
- **Monitor:** zone `hillview`; agents query it with `mcp__monitor_hillview__*`.

## 8. Operations

- **Lattice stack 38 "Hillview Web"** on worker-5 (id 8, `10.15.10.79`), container `hillview-live-web`, host port `3012`. Stack env: `MONITOR_HILLVIEW_INGEST_URL` / `MONITOR_HILLVIEW_INGEST_KEY`.
- **CI:** push to `main` → `push-to-registry.yml`: registry credentials from Keyring (token `hillview-web-ci`, via `aidenappl/keyring-actions`), build on the shared `lattice-builder`, push `registry.appleby.cloud/hillview-live-web:latest`, then `LATTICE_DEPLOY_URL?container=hillview-live-web`. GitHub secrets: `KEYRING_URL`, `KEYRING_ACCESS_KEY_ID`, `KEYRING_SECRET_ACCESS_KEY`, `LATTICE_DEPLOY_URL`.
- Env or compose changes need a **stack Deploy** in Lattice; a CI container redeploy reuses the old config.
- **Edge:** Cloudflare DNS record (proxied) → NPM proxy host with the Cloudflare real-IP block and a Let's Encrypt certificate (DNS challenge).
- **Health:** `GET /api/health` (Docker HEALTHCHECK). **Errors:** Monitor zone hillview, `service: hillview-live-web`. **Logs:** `lattice_get_container_logs`.
- The old Vercel project (`hillview-ms/hillview-live`) is no longer serving traffic; don't redeploy it.

## 9. Rules & guardrails

- Never expose `MONITOR_API_KEY` to the browser or prefix it `NEXT_PUBLIC_`.
- Never proxy large files through this server — the studio has one WAN.
- Keep `lib/monitor-relay.ts` / `lib/monitor-server.ts` in step with the sibling Hillview web repos.

## 10. Verification

```bash
npx tsc --noEmit
npm run lint
npx prettier --check <the files you changed>
npx next build
```

There is no PR CI here: run the checks below yourself.

## 11. Keeping this file updated

Any change to structure, stack, commands, conventions, routes, env vars, events or deployment updates this file (and `README.md` where setup or role changed) in the same change.

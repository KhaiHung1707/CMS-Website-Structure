# Structure Website — Dev Setup & Codex Review Gate

Production build of the Structure design handoff. Stack: **Next.js 15 (App Router) + TypeScript + Tailwind + Payload 3 + Supabase Postgres**. See [PLAN.md](PLAN.md) for the full build plan.

## 1. Install & configure

```bash
npm install
cp .env.example .env          # fill DATABASE_URI (Supabase), PAYLOAD_SECRET, BLOB_READ_WRITE_TOKEN
npm run generate:types        # writes src/payload/payload-types.ts from the collections
```

- **DATABASE_URI** — Supabase Postgres connection string (NOT Supabase S3 for media).
- **Media** — Phase 1 uses **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`). Migration to **Cloudflare R2** is a single block swap in [src/payload/payload.config.ts](src/payload/payload.config.ts) — see the comment there; no component changes.

## 2. Run

```bash
npm run dev          # http://localhost:3000  (site)  +  /admin (Payload)
npm run typecheck    # tsc --noEmit — must be clean
npm run lint
npm run build
```

First run: open `/admin`, create the first admin user, then add records (Industries → Services → Projects, since Projects relate to them). Add a `pages` doc with slug `home` / `privacy` / `terms` / `cookies` to fill Core/Legal block content.

## 3. Architecture (where things live)

- `src/app/(frontend)/` — public site (route groups). `src/app/(payload)/` — admin + REST/GraphQL (do not hand-edit).
- `src/payload/` — `payload.config.ts`, `collections/`, `globals/`, `blocks/`, `fields/`.
- `src/lib/content/` — **the only data access layer**. Pages import from `@/lib/content`; nothing else touches Payload.
- `src/components/` — `layout/` (TopNav, MegaNav, CtaSection, Footer), `cards/`, `sections/`, `blocks/` (BlockRenderer), `ui/`, `forms/`.
- `src/styles/` — `globals.css` (imports the token source `assets/tokens-brick.css` + `shared.css` + vendored `service.css`/`nav-mega.css`). Page-specific CSS is co-located next to each route (`work.css`, `industries.css`, …).

## 4. Design ⇄ Code seam (invariants)

1. Only existing classes + `var(--*)` from `assets/tokens-brick.css`. No hardcoded color/spacing/font in `.tsx`.
2. Ported HTML keeps class names + DOM 1:1; only static text becomes data.
3. Token source of truth = `assets/tokens-brick.css`. Change a value there → whole site changes, no component edits.

## 5. Codex review gate (run before merging any file)

```bash
# 1) No hardcoded tokens in app/components (CSS files are the allowed home for raw values)
grep -rnE '#[0-9a-fA-F]{3,8}|[0-9]+px|font-family' src/app src/components | grep -v '\.css:'

# 2) Data layer isolation — getPayload must NOT appear outside src/lib
grep -rn "getPayload\|@payload-config" src/app src/components

# 3) Types + lint clean
npm run typecheck && npm run lint
```

Checklist per file: class/DOM matches the source template · data only via `@/lib/content` · no `any` · loops match the `@cms:loop` markers · file ≤ ~150 lines (split otherwise). Items with no design source are marked `// TODO(design)`.

## 6. Definition of done

- Change one value in `tokens-brick.css` → whole site shifts, zero component edits.
- Add a record in `/admin` → it appears on the Archive and gets a Single page, no deploy.
- No hardcoded color/spacing/font outside the token file.
- Card/section class names + DOM match the design reference.

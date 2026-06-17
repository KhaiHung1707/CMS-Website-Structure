# STRUCTURE WEBSITE — Build Plan (Claude Code) + Codex Review Gates

> Plan thi công bám sát `CLAUDE-DESIGN.md` + `CLAUDE (1).md` + `README.md`.
> Stack chốt: **Next.js 15 (App Router) + TypeScript + Tailwind + Payload 3 + Supabase Postgres**.
> Mục tiêu chất lượng: **code dễ maintain** — **mọi file code đều qua Codex review** trước khi coi là "done".

---

## 0. Nguyên tắc xuyên suốt (đo được)

1. **Seam Design ⇄ Code bất khả xâm phạm.** Code KHÔNG đổi tên class, giá trị token, cấu trúc DOM của card/section. Chỉ thay nội dung tĩnh → field.
2. **1 nguồn token duy nhất:** `assets/tokens-brick.css` → import vào `app/globals.css`. Tailwind chỉ *map lại* var, không định nghĩa giá trị mới. Bỏ `tokens.css` (lime v1).
3. **Không hardcode** màu/spacing/font ngoài token. (Codex grep gate, xem §6.)
4. **Single = 1 template động `[slug]`** cho mỗi loại. Không build file tĩnh theo slug ví dụ.
5. **Page chỉ gọi data qua `lib/content/`** — không query Payload trực tiếp trong component UI.
6. **Mỗi vùng lặp = 1 component card mẫu + `.map()`** theo đúng `data-cms-loop` / `data-cms-item`.
7. **File nhỏ, một trách nhiệm.** Component ≤ ~150 dòng; tách sub-component khi vượt. Không "god component".

---

## 1. Cây thư mục đích (chuẩn để Codex đối chiếu)

```
app/
  (frontend)/
    layout.tsx                # <html.strx> + import globals.css + TopNav/Footer chung
    page.tsx                  # Home  (core-home)
    about/page.tsx            # core-about
    contact/page.tsx          # core-contact (form)
    work/
      page.tsx                # archive-portfolio
      [slug]/page.tsx         # single-portfolio
    industries/
      page.tsx                # archive-industry
      [slug]/page.tsx         # single-industry
    services/
      page.tsx                # archive-service
      [slug]/page.tsx         # single-service
    blog/                     # CHỜ Design xuất HTML (blog.html, single-post.html)
      page.tsx
      [slug]/page.tsx
    privacy/page.tsx          # legal (block tĩnh đơn giản)
    terms/page.tsx
    cookies/page.tsx
    thank-you/page.tsx        # CHỜ Design
    not-found.tsx
    error.tsx
    styleguide/page.tsx       # verify token + component dùng chung
  (payload)/                  # admin Payload tự sinh — KHÔNG sửa tay
    admin/[[...segments]]/page.tsx
    api/[...slug]/route.ts

components/
  layout/  TopNav.tsx  MegaNav.tsx  CtaSection.tsx  Footer.tsx
  cards/   WorkCard.tsx  IndustryCard.tsx  ServiceCard.tsx  PostCard.tsx
  sections/ Hero.tsx  StatsRow.tsx  FaqList.tsx  ProcessList.tsx  Gallery.tsx  RelatedGrid.tsx
  blocks/  blockRenderer.tsx + 1 file / loại block trong extra_blocks & pages.layout
  ui/      Eyebrow.tsx  Tag.tsx  RichText.tsx   (primitives dùng lại)
  forms/   ContactForm.tsx  (client, useState — trạng thái success/error)

lib/
  content/ projects.ts industries.ts services.ts posts.ts pages.ts settings.ts
           index.ts     # re-export; mọi page import từ đây
  payload/ getPayload.ts (singleton)  types.ts (generated)
  utils/   cn.ts  format.ts  seo.ts (build generateMetadata)

payload/
  payload.config.ts
  collections/ Projects.ts Industries.ts Services.ts Posts.ts Pages.ts
               Media.ts Testimonials.ts Users.ts
  globals/     SiteSettings.ts
  blocks/      <BlockName>.ts  (định nghĩa field cho từng block, dùng chung extra_blocks/pages)
  fields/      slug.ts seo.ts  (field helper tái dùng)

styles/
  globals.css            # @import tokens-brick.css; reset tối thiểu
  service.css            # port nguyên từ assets, giữ class
  nav-mega.css

public/                  # font/asset tĩnh nếu cần self-host
tailwind.config.ts       # map var → theme (KHÔNG giá trị mới)
.env.local               # DATABASE_URL (Supabase), PAYLOAD_SECRET, BLOB token
```

---

## 2. Mapping HTML → React (cụ thể, không suy diễn)

| Template HTML | data-template | Đích React | Loop/Repeat |
|---|---|---|---|
| `work.html` | archive-portfolio | `work/page.tsx` + `WorkCard` | `@cms:loop portfolio` (`.work-grid > .work-card`), fields: title:.info h3, meta:.info .m, hero_stat:.info .st, featured:hasClass(feature), cover:svg, permalink:href |
| `single-portfolio.html` | single-portfolio | `work/[slug]/page.tsx` | REPEAT: services, stats, gallery, related |
| `industries.html` | (thiếu)→archive-industry | `industries/page.tsx` + `IndustryCard` | `@cms:loop industry` (`.ind-cards > .ind-card`): number:.ic-n, title:h3, lead:.ic-desc, tags:.ic-tags, stat_value:.ic-stat .v, stat_label:.ic-stat .k, permalink:href |
| `industry-saas.html` | single-industry | `industries/[slug]/page.tsx` | stats, faqs, related |
| `services.html` | (thiếu)→archive-service | `services/page.tsx` + `ServiceCard` | `@cms:loop service` (`.svc-list > .svc-deep`): number:.sd-n, title:h3, lead:.sd-desc, tags:.sd-tags, metric_value:.sd-metric .v, metric_label:.sd-metric .k, permalink:a[href^=service-] |
| `service-saas.html` | single-service | `services/[slug]/page.tsx` | features, process, tech |
| `Structure Homepage.html` | core-home | `page.tsx` (block layout) | — |
| `about.html` | core-about | `about/page.tsx` | — |
| `contact.html` | core-contact | `contact/page.tsx` + `ContactForm` | — |
| block chung: `nav#topnav`, `section.cta`, `footer`, nav-mega | — | `TopNav`/`CtaSection`/`Footer`/`MegaNav` dùng ở `layout.tsx` | — |

**Quy tắc port mỗi file:** mở HTML → copy nguyên markup vùng card mẫu vào component → thay text tĩnh bằng prop → page `.map()` data từ `lib/content/`. Giữ y nguyên class & DOM.

---

## 3. Data layer & collections (Phase 1)

- **Collections** theo §4 README/CLAUDE: `Projects, Industries, Services, Posts, Pages, Media, Testimonials, Users` + global `SiteSettings`. Field đúng spec (card + single + `extra_blocks`).
- **Quan hệ M:N** để Payload tự sinh junction (project↔services, related[]).
- **`fields/slug.ts`**: hook tự sinh slug từ title (unique). **`fields/seo.ts`**: title/description/og dùng cho `generateMetadata`.
- **`lib/content/*`**: mỗi loại 1 file, export hàm typed: `getProjects()`, `getProjectBySlug(slug)`, `getProjectSlugs()` (cho `generateStaticParams`)… Trả type sinh từ Payload, KHÔNG `any`.
- Media: Vercel Blob / R2 (KHÔNG Supabase S3).

---

## 4. Phases & thứ tự (mỗi phase là 1 PR + 1 vòng Codex)

- **Phase 0 — Foundation:** init Next+Payload+Supabase → import token → map Tailwind → `/styleguide` → block chung (`TopNav, MegaNav, CtaSection, Footer`). *DoD: đổi 1 token → styleguide đổi.*
- **Phase 1 — Data:** collections + `lib/content/`. *DoD: thêm record trong admin → query trả về typed.*
- **Phase 2 — Port:** Archive (`work → industries → services`) → Single (`work/[slug]` trước, copy pattern) → `generateStaticParams` + `generateMetadata` → nối slug card→Single.
- **Phase 3 — Hoàn thiện:** Core (Home/About/Contact + ContactForm) → Legal → 404/error/thank-you → JS tĩnh (mega nav, tab, FAQ, filter) → React hooks → dữ liệu thật.
- **Blocked:** Blog, thank-you, các trạng thái form/pagination/empty → chờ Design xuất (§6 CLAUDE-DESIGN). Plan giữ chỗ route, không build mù.

---

## 5. Quy ước maintainability (để Codex chấm nhất quán)

- TypeScript `strict`, không `any` (trừ chỗ Payload buộc, phải có comment lý do).
- Naming: component PascalCase, hàm content `getX`, file kebab/Pascal theo loại.
- Server Component mặc định; chỉ `"use client"` khi cần state (form, mega nav, tab, FAQ, filter).
- Không fetch trong UI component — chỉ nhận prop. Page là nơi gọi `lib/content`.
- ESLint + Prettier + `tsc --noEmit` phải sạch trước review.
- Mỗi component có prop type rõ ràng (interface), không truyền object Payload thô xuống sâu.

---

## 6. Codex review gate (mọi file code đều qua)

Mỗi file/PR phải pass checklist trước khi merge — Codex kiểm:

1. **Không hardcode token** — grep fail nếu thấy hex màu / px spacing / font-family ngoài `tokens-brick.css`:
   - `grep -rnE '#[0-9a-fA-F]{3,8}|[0-9]+px|font-family' app components` (loại trừ file CSS port nguyên).
2. **Class & DOM khớp HTML gốc** — diff cấu trúc card/section component vs template tương ứng.
3. **Data qua `lib/content`** — không `import payload`/`getPayload` trong `components/` hay JSX page (chỉ trong `lib/`).
4. **Type-safe** — `tsc --noEmit` sạch, không `any` lậu.
5. **Loop đúng marker** — mỗi `data-cms-loop` → `.map()`, `data-cms-item` → 1 component, mỗi `field:selector` → 1 prop đúng phần tử.
6. **Kích thước & SRP** — file không phình; tách khi >~150 dòng.
7. **DoD per phase** đạt (token-swap test, add-record test).

> Quy trình: Claude Code viết → tự chạy lint/tsc → mở Codex review theo checklist trên → sửa → merge. Lặp đến hết phase.

---

## 7. Definition of done (toàn site)

- Đổi 1 giá trị trong `tokens-brick.css` → toàn site đổi, không sửa component.
- Thêm 1 record Payload → tự lên Archive + có Single, không deploy.
- Không hardcode màu/spacing/font ngoài token.
- Class & DOM khớp 100% bản design.
- Mọi file code đã qua Codex gate §6.

---

## 8. Quyết định đã chốt (2026-06-17)

- **Media:** dùng `@payloadcms/storage-*` adapter. **Giai đoạn đầu = Vercel Blob**, **sau chuyển Cloudflare R2**.
  → Code phải tách qua **1 adapter trong `payload.config.ts`**, đổi storage = đổi 1 block config + env, KHÔNG sửa collection/field/component. (Codex gate: cấm hardcode URL host trong component — dùng field `media.url` từ Payload.)
- **Phần Design còn thiếu** (Blog archive/single, thank-you, 404, pagination/filter/empty-state):
  **Code tạm bản tối thiểu theo DS** — chỉ dùng token/class có sẵn (`.strx`, `var(--*)`), không tự chế màu/spacing.
  Mỗi bản tạm đánh dấu `// TODO(design): thay khi Design xuất <file>.html` để Codex/diff dễ truy.
- **Trạng thái thi công:** **chỉ giữ plan** — chưa init code. Bắt đầu Phase 0 khi có lệnh.

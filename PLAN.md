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

---

## 9. Improvement plan: Single & Archive (chốt 2026-06-17)

> Bối cảnh: Phase 0–3 đã build xong, site render OK. Nhưng kiểm tra lại thì **Single & Archive
> mới CMS-hóa phần lõi (card grid + vài field)**, còn lại **nội dung thiết kế bị hardcode** trong
> code — vi phạm §0.1 (seam) và §7 ("thêm 1 record → có Single đúng"). Mục này khắc phục triệt để.
> **Quyết định phạm vi:** full — fix per-record + archive copy qua `pages` + filter chạy thật.

### 9.1 Nợ kỹ thuật đã định vị (bằng chứng theo file)

**A. Sai chức năng CMS (mỗi record phải ra nội dung của chính nó — đang KHÔNG):**
1. `app/(frontend)/services/[slug]/page.tsx` — hardcode toàn bộ nội dung SaaS: `SCROLLY_STEPS`,
   `FAQS`, `PILLAR_DESCS`, `PILLAR_ICONS`, `FALLBACK_PILLARS`, manifesto, results stat-strip,
   hero metric phụ `×3.2`. ⇒ **mọi** service (web-design, seo…) đều render ra SaaS. Schema
   `Services.ts` mới có `features/process/tech/pricing` — thiếu field cho các vùng trên.
2. `components/sections/IndustryStory.tsx` — hardcode 100% case study "QuoteFlow" (4 step + portal
   mockup), không nhận prop. `industries/[slug]/page.tsx` gọi `<IndustryStory />` trống.
3. `app/(frontend)/work/[slug]/page.tsx` — heading & accent của section challenge/approach
   hardcode ("A beautiful site that couldn't convert", "Rebuilt on a typed foundation").

**B. Editability (page-copy để cứng — sẽ chuyển sang `pages` per-archive):**
4. `work/page.tsx` — hero copy + `.hero-stats` (40/12/96/0.9s), featured case "Luma Atelier"
   (toàn bộ), `.stat-strip` results — đều hardcode; chỉ `.work-grid` là động.
5. `industries/page.tsx` — hero copy, `.h-stats`, manifesto, `.stat-strip` results hardcode.
6. `services/page.tsx` — hero copy, roadmap 12-tuần, engagement models, scope matrix hardcode.

**C. Tương tác giả:**
7. `components/sections/WorkFilters.tsx` — `CATEGORIES` tĩnh, click chỉ đổi class `.on`,
   **không lọc** grid thật.

### 9.2 Quyết định kiến trúc

- **Page-copy archive → `pages` collection, mỗi archive 1 record** (`slug`: `work`, `industries`,
  `services`). Mở rộng `Pages.ts` thêm **tab "Archive"** chứa các field có cấu trúc khớp 1:1 với
  section template (hero, heroStats[], featuredCase, resultsStrip[], + nhóm riêng từng loại). Layout
  archive là CỐ ĐỊNH ⇒ dùng **structured fields**, KHÔNG dùng free-blocks cho các vùng này (blocks
  `extra/layout` vẫn còn cho section phụ nối thêm). Route đọc qua helper mới `getArchive(slug)`.
- **Per-record content → mở rộng schema từng collection** (Services/Industries/Projects), không
  nhét vào `pages`. Mỗi vùng động = 1 array/group; **section ẩn khi field rỗng** (không fallback
  nội dung SaaS/QuoteFlow nữa).
- **Mockup bespoke** (`SaasConsole`, story portal "QuoteFlow") = **design decoration** theo đúng
  tiền lệ README (chrome tĩnh). Giữ là decoration tùy chọn, đánh dấu `// TODO(design)`; phần TEXT
  (step/heading/tag) phải lấy từ data. KHÔNG tự chế token/màu mới.
- **Featured case (work)** = field `featuredCase` trên record `pages/work`: relationship tới 1
  `projects` + copy hiển thị; fallback = project `featured:true` đầu tiên. Không hardcode "Luma".

### 9.3 Phases (mỗi phase = 1 PR + 1 vòng Codex theo §6)

- **Phase A — Schema + types.**
  - `Services.ts` +tab/field: `manifesto` (textarea), `scrolly[] {num,cap,title,desc,tags[]}`,
    `capabilities[] {label,desc,icon}` (thay PILLAR_*), `faqs[] {q,a}`, `results[] {value,unit,label}`,
    `hero_metrics[] {value,label}` (thay `×3.2`).
  - `Industries.ts` +group `story {eyebrow,title,lead,steps[] {num,cap,title,desc,tags[]}}`.
  - `Projects.ts` +`challenge_title`, `approach_title` (text, optional).
  - `Pages.ts` +tab "Archive": `hero {eyebrow,headingHtml,lead}`, `heroStats[] {value,suffix,label}`,
    `featuredCase {project(rel),eyebrow,heading,desc,stats[]}`, `resultsStrip[] {value,suffix,label}`,
    + nhóm riêng: services `roadmap[]/engagement[]/matrix{do[],dont[]}`, industries `manifestoHtml`.
  - Chạy `npm run generate:types`; thêm 3 record `pages` (work/industries/services) + đổ nội dung
    hiện tại vào admin (giữ y nguyên text để diff = 0 về mặt hiển thị).
  - *DoD:* `tsc --noEmit` sạch; field hiện trong admin.

- **Phase B — Data layer.** `lib/content/pages.ts` +`getArchive(slug)`; cập nhật `get*BySlug` đảm
  bảo `depth` đủ cho relationship mới (featuredCase, story). Trả type sinh từ Payload, không `any`.
  *DoD:* gọi `getArchive('work')` trả typed có featuredCase.

- **Phase C — Single (sửa bug A).** Thứ tự: `work/[slug]` (nhỏ nhất) → `industries/[slug]` →
  `services/[slug]`. Xóa mọi `const` nội dung; render từ field; ẩn section khi rỗng. `IndustryStory`
  & service scrolly nhận prop `steps`. Giữ NGUYÊN class/DOM template.
  *DoD:* tạo 1 service mới (vd web-design) → trang KHÔNG còn chữ SaaS; tạo industry mới → story đúng.

- **Phase D — Archive (sửa B).** 3 archive đọc `getArchive(slug)`; thay hero/stats/featured/results/
  roadmap/engagement/matrix bằng data. Featured case từ relationship + fallback `featured`.
  *DoD:* sửa số "40+" trong admin → archive đổi, không deploy.

- **Phase E — Filter chạy thật (C).** Tách `WorkGrid` (client) bọc filter + grid, lọc theo
  `project.industry`; categories suy từ industries có thật trong data. Giữ class `.filter/.filter.on`,
  `.work-grid`. *DoD:* click "SaaS" → chỉ còn project ngành SaaS; "All" → đủ.

- **Phase F — Verify + Codex gate.** Chạy `tsc`/lint; `/verify` UI từng route; checklist §6
  (không hardcode token, DOM khớp template, data qua `lib/content`, loop đúng marker, SRP ≤~150 dòng).

### 9.4 Definition of done (riêng mục này)
- Mỗi service/industry/project render **nội dung của chính nó**; không còn const nội dung trong page.
- Sửa copy/số trong admin (archive + single) → site đổi, không deploy.
- Filter work lọc thật theo ngành.
- Class & DOM vẫn khớp 100% template; không token/màu mới; mockup bespoke gắn `// TODO(design)`.

### 9.5 Cần chốt trước Phase A
1. Mockup `SaasConsole` & story portal: giữ làm decoration tĩnh per-loại, hay cũng field-hóa? (đề xuất: giữ tĩnh giai đoạn này.)
2. Roadmap/engagement/matrix của services archive: coi là brand copy chung (1 record `pages/services`) — OK chứ?

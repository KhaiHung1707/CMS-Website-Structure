# STRUCXAL WEBSITE — Build Brief cho Claude Code

> File này **thay thế** 2 file docs cũ trong gói handoff (CLAUDE.md / README.md).
> Mục tiêu: dựng site production bằng **Next.js (App Router) + Payload CMS + Supabase Postgres**,
> giữ nguyên Design System từ Claude Design. Đọc hết Mục 0 và Mục 1 trước khi viết dòng code đầu tiên.

---

## 0. Quyết định đã chốt (locked) & cần xác nhận

### Đã chốt
| Hạng mục | Quyết định |
|---|---|
| Token / source of truth | **`tokens-brick.css` (v2 — white + cobalt)**. File `tokens.css` (v1 lime) **bỏ**, không dùng. |
| Stack render | **Next.js 15 App Router + TypeScript + Tailwind** |
| CMS | **Payload 3** (nhúng trong Next.js), DB = **Supabase Postgres** |
| Single | **MỘT template động / loại**, không phải nhiều file tĩnh |
| Mô hình Single | **Hybrid**: field cố định (hero, stats[], challenge, approach…) **+** field `extra_blocks` (blocks tuỳ chọn) cho Industry/Service/Portfolio; Core pages **full block** |
| Tên thương hiệu UI | **"Structure"** → giữ nguyên, KHÔNG find/replace. (Brand pháp lý "Strucxal Studio" chỉ dùng nội bộ/metadata.) |
| Canonical source | **HTML templates** trong `templates/` là canonical. React DS `_ds/structure-design-system-…` chỉ **tham khảo** — đối chiếu khi cần, KHÔNG bắt buộc khớp 1-1. |
| URL pattern | `/industries/{slug}`, `/services/{slug}`, `/work/{slug}` (mặc định — đổi nếu cần) |

---

## 1. Hợp đồng Design System (seam giữa Code ⇄ Design)

| Bên | SỞ HỮU | KHÔNG đụng |
|---|---|---|
| **Claude Design** | token CSS, class `.strx`/`.str-*`, layout, màu, font, spacing, HTML mẫu | logic CMS, field, vòng lặp dữ liệu |
| **Claude Code** | component React, routing, binding Payload field, data layer | tên class, giá trị token, cấu trúc DOM của card/section |

**Bất biến cho Claude Code:**
1. CHỈ dùng class & `var(--*)` có sẵn trong `tokens-brick.css`. KHÔNG hardcode màu/spacing/font.
2. Khi port HTML → React: **giữ nguyên tên class & cấu trúc DOM**. Chỉ thay nội dung tĩnh bằng prop/field.
3. Vùng lặp: giữ 1 card mẫu làm component, map field CMS vào, rồi `.map()`.
4. Đổi design sau = Claude Design sửa token/CSS → toàn site đổi, **code KHÔNG sửa**.

**Cách nạp token vào Next.js:** import `tokens-brick.css` trong `app/globals.css` (giữ nguyên các `:root` CSS vars). Tailwind chỉ map lại các var này trong `tailwind.config.ts` (`colors.accent: 'var(--accent)'`…) — KHÔNG định nghĩa lại giá trị.

---

## 2. Static handoff → Production: bảng port

Các file HTML là **bản tham chiếu high-fidelity**, KHÔNG copy nguyên. Port như sau:

| Trong gói (tĩnh) | Thành (production) |
|---|---|
| `assets/tokens-brick.css` | import vào `app/globals.css` + map sang Tailwind theme |
| `assets/service.css`, `nav-mega.css` | chuyển vào component CSS / CSS module, giữ nguyên class |
| `assets/nav-mega.js` (mega menu) | component `<MegaNav>` (state React, không DOM listener thủ công) |
| `assets/service.js` (tabs/accordion/filter) | hook/component React (`useState` cho tab, FAQ, filter) |
| `templates/work.html` | `app/(frontend)/work/page.tsx` (Archive) |
| `templates/single-portfolio.html` | `app/(frontend)/work/[slug]/page.tsx` (Single) |
| `templates/industries.html` | `app/(frontend)/industries/page.tsx` |
| `templates/industry-saas.html` | `app/(frontend)/industries/[slug]/page.tsx` |
| `templates/services.html` | `app/(frontend)/services/page.tsx` |
| `templates/service-saas.html` | `app/(frontend)/services/[slug]/page.tsx` |
| block dùng chung: `nav#topnav`, `section.cta`, `footer` | component layout dùng lại ở mọi route |

**Quan trọng:** các file `industry-ecommerce.html`, `service-seo.html`… (liệt kê trong docs cũ) **KHÔNG build**. Mỗi cái chỉ là 1 bản ghi CMS render qua đúng 1 template `[slug]`.

---

## 3. Quy ước CMS marker (đọc trong từng file HTML) → map sang Payload

Trong HTML có sẵn các mốc, Claude Code dùng để biết chỗ nào thành vùng động:

- **Loại trang:** `<body data-template="...">` + `<!-- @cms TEMPLATE: ... -->`
  *(Lưu ý: `industries.html` & `services.html` đang THIẾU header này — coi như archive-industry / archive-service.)*
- **Vùng lặp (Archive):**
  ```html
  <!-- @cms:loop name="portfolio" item=".work-card"
       fields="title:.info h3, meta:.info .m, hero_stat:.info .st,
               featured:hasClass(feature), cover:svg, permalink:href" -->
  <div class="work-grid" data-cms-loop="portfolio">
    <a class="work-card feature" data-cms-item> … </a>   ← card mẫu, giữ nguyên DOM
  </div>
  <!-- /@cms:loop portfolio -->
  ```
  → `fields="field:selector"` nghĩa là đổ `field` vào phần tử khớp `selector` **bên trong** card.
  → Trong React: `data-cms-loop` = `items.map()`, `data-cms-item` = component card, mỗi `field:selector` = 1 prop bind vào đúng phần tử đó.
- **Repeater lồng (Single):** `<!-- CMS:REPEAT stats START --> … <!-- CMS:REPEAT stats END -->`
  (có ở `single-portfolio.html`: `stats`, `services`, `gallery`, `related`) → mảng field trong Payload.

---

## 4. Collections & fields (đã reconcile với ERD)

### `projects` (Portfolio) — Archive `work` / Single `work/[slug]`
**Card (Archive):** `title`, `meta` (ngành·năm), `industry` (relation), `featured` (bool→class `feature`), `hero_stat`, `cover` (media), `slug`.
**Single (field cố định):** `summary`, `client`, `duration`, `services[]` (relation→`services`), `live_url`, `challenge` (richtext), `approach` (richtext), `stats[] {value, unit, label}`, `gallery[] {image, caption}`, `related[]` (relation→`projects`), `extra_blocks` (blocks, optional).

### `industries` — Archive `industries` / Single `industries/[slug]`
**Card:** `number`, `title`, `lead`, `tags`, `stat_value`, `stat_label`, `hero_image` (media), `slug`.
**Single:** `eyebrow`, `lead`, `stats[]`, `faqs[] {q, a}`, `related[]` (relation), section case study, `extra_blocks` (optional).

### `services` — Archive `services` / Single `services/[slug]`
**Card:** `number` (01–04), `title`, `lead`, `tags`, `metric_value`, `metric_label`, `hero_image`, `slug`.
**Single:** `icon`, `lead`, `features[]`, `process[] {step, title, desc}`, `pricing`, `tech[]`, `extra_blocks` (optional).

### `pages` (Core: Home/About/Contact) — **block-based** (`layout` = blocks). Không cần card/archive.

### Shared: `media`, `testimonials`, `users` · Global: `site_settings` (logo, nav, social) — như ERD đã thống nhất.

---

## 5. Task list (theo phase)

**Phase 0 — Foundation (làm trước, 1 lần)**
1. Khởi tạo Next.js 15 + Payload 3 + Supabase Postgres (connection string từ Supabase; media để Vercel Blob / R2, KHÔNG dùng Supabase S3).
2. Import `tokens-brick.css` vào `globals.css`; map var → `tailwind.config.ts`.
3. Dựng `/styleguide` render toàn bộ token + component dùng chung (nav, cta, footer, card) để verify design.
4. Port block dùng chung: `<TopNav>`, `<MegaNav>`, `<CtaSection>`, `<Footer>`.

**Phase 1 — Collections & data layer**
5. Khai báo Payload collections + fields (Mục 4). Quan hệ M:N để Payload tự sinh junction.
6. `lib/content/` — hàm typed (`getProjects`, `getProjectBySlug`, …). Page chỉ gọi qua đây.

**Phase 2 — Port template**
7. Archive: `work` → `industries` → `services` (card thành component, `.map()` theo `data-cms-loop`).
8. Single: `work/[slug]` (mẫu nhiều repeater nhất) → `industries/[slug]` → `services/[slug]`. Thêm `generateStaticParams` + `generateMetadata`.
9. Nối `slug`/`permalink`: card Archive → đúng route Single.

**Phase 3 — Core & hoàn thiện**
10. Home/About/Contact dạng block.
11. Chuyển JS tĩnh (mega nav, tab, FAQ, filter) sang React.
12. Thay nội dung mẫu (số liệu, tên dự án) bằng dữ liệu thật. *(Brand UI = "Structure" đã chốt — không cần đổi.)*

---

## 6. Definition of done
- Đổi giá trị 1 token trong `tokens-brick.css` → toàn site đổi, không sửa component nào.
- Thêm 1 project/industry/service trong Payload admin → tự xuất hiện ở Archive + có trang Single, không deploy.
- Không có giá trị màu/spacing/font hardcode ngoài `tokens-brick.css`.
- Tên class & cấu trúc DOM của card/section khớp 100% bản design tham chiếu.

# STRUCXAL WEBSITE — Handoff cho Claude Code

> Spec để **Claude Code** dựng site production. **Claude Design** giữ giao diện.
> Stack: **Next.js 15 (App Router) + TypeScript + Tailwind + Payload 3 + Supabase Postgres**.
> Đọc hết Mục 0–1 trước khi viết code.

---

## 0. Phối hợp Code ⇄ Design

Tách lớp tuyệt đối: cấu trúc/logic (Code) rời trình bày (Design). Cầu nối = Design System (token).

| Bên | Sở hữu | KHÔNG đụng |
|---|---|---|
| **Claude Design** | token CSS, class `.strx`/`.str-*`, layout, màu, font, spacing, HTML mẫu | logic CMS, field, vòng lặp |
| **Claude Code** | component, routing, binding Payload field, data layer | tên class, giá trị token, cấu trúc DOM của card/section |

**Bất biến:**
1. CHỈ dùng class & `var(--*)` có sẵn. KHÔNG hardcode màu/spacing/font.
2. Port HTML → React giữ NGUYÊN tên class & cấu trúc DOM; chỉ thay nội dung tĩnh bằng field.
3. Vùng lặp: giữ 1 card mẫu làm component, map field CMS vào, rồi `.map()`.
4. Đổi design sau = Design sửa token/CSS → toàn site đổi, code KHÔNG sửa.

---

## 1. Hợp đồng Design System (đã chốt)

- **Token source of truth DUY NHẤT: `assets/tokens-brick.css`** (white + cobalt). Bỏ `tokens.css` (lime v1) — không dùng.
- Nạp vào Next.js: import `tokens-brick.css` trong `app/globals.css`; Tailwind chỉ *map lại* var (`colors.accent: 'var(--accent)'`…), KHÔNG định nghĩa giá trị mới.
- **Canonical = HTML trong `templates/`.** React DS `_ds/structure-design-system-…` chỉ **tham khảo**, không ép khớp 1-1.
- **Brand UI = "Structure"** (giữ nguyên). "Strucxal Studio" chỉ dùng cho metadata/nội bộ.
- Body luôn `.strx`; container `.strx-container` (max 1440px).
- Font: display `var(--font-display)`, mono/label `var(--font-mono)`, số liệu `var(--font-numeric)`.
- Eyebrow: `<p class="t-mono">// Nhãn</p>` (nền tối thêm `.dark`).
- Block dùng chung (copy y nguyên mọi trang): `nav#topnav`, `section.cta`, `footer`. Mega menu: `nav-mega.css` + `nav-mega.js` → port thành `<MegaNav>` React.

---

## 2. Bản đồ template

Mỗi loại Single = **MỘT template động `[slug]`**, KHÔNG phải nhiều file tĩnh. Các tên như `industry-saas`, `service-seo`… chỉ là **slug ví dụ**, không build riêng.

| Loại | Archive | Single (1 template động) | File mẫu có trong gói |
|---|---|---|---|
| **Portfolio** | `/work` | `/work/{slug}` | `work.html`, `single-portfolio.html` ✅ |
| **Industries** | `/industries` | `/industries/{slug}` | `industries.html`, `industry-saas.html` ✅ |
| **Services** | `/services` | `/services/{slug}` | `services.html`, `service-saas.html` ✅ |
| **Blog** | `/blog` | `/blog/{slug}` | ⛔ chưa có — cần Design xuất |
| **Core** | — | `/`, `/about`, `/contact` | ⛔ chưa có — cần Design xuất |
| **Legal** | — | `/privacy`, `/terms`, `/cookies` | ⛔ block đơn giản, không cần CPT |
| **System** | — | `not-found.tsx`, `error.tsx`, `/thank-you` | ⛔ cần bản tối thiểu khớp DS |

---

## 3. Content types & fields

**Mô hình Single = Hybrid:** field cố định (khớp design) **+** `extra_blocks` (blocks tuỳ chọn, chèn section linh hoạt). Core pages = full block.

### `projects` (Portfolio) — vùng lặp `.work-grid > .work-card`
- **Card:** `title`, `meta` (ngành·năm), `industry` (relation→industries), `featured` (bool→class `feature`), `hero_stat`, `cover` (media), `slug`.
- **Single:** `summary`, `client`, `duration`, `services[]` (relation), `live_url`, `challenge` (richtext), `approach` (richtext), `stats[] {value,unit,label}`, `gallery[] {image,caption}`, `related[]` (relation), `extra_blocks`.

### `industries` — vùng lặp `.ind-cards > .ind-card`
- **Card:** `number`, `title`, `lead`, `tags`, `stat_value`, `stat_label`, `hero_image` (media), `slug`.
- **Single:** `eyebrow`, `lead`, `stats[]`, `faqs[] {q,a}`, `related[]` (relation), `extra_blocks`.

### `services` — vùng lặp `.svc-list > .svc-deep`
- **Card:** `number` (01–04), `title`, `lead`, `tags`, `metric_value`, `metric_label`, `hero_image`, `slug`.
- **Single:** `icon`, `lead`, `features[]`, `process[] {step,title,desc}`, `pricing`, `tech[]`, `extra_blocks`.

### `posts` (Blog) — MỚI
- **Card:** `title`, `excerpt`, `category`, `cover` (media), `published_at`, `slug`.
- **Single:** `body` (richtext/blocks), `author` (relation→users), `related_posts[]`, `extra_blocks`.

### `pages` (Core + Legal) — full block (`layout`). Home/About/Contact/Privacy/Terms.
### Shared: `media`, `testimonials`, `users` · Global: `site_settings` (logo, nav, social).

---

## 4. Quy ước CMS marker trong HTML

- **Loại trang:** `<body data-template="...">` + `<!-- @cms TEMPLATE: ... -->`.
  *(`industries.html` & `services.html` đang thiếu header này — coi là `archive-industry` / `archive-service`.)*
- **Vùng lặp (Archive):**
  ```
  <!-- @cms:loop name="portfolio" item=".work-card"
       fields="title:.info h3, meta:.info .m, permalink:href" -->
  <div class="work-grid" data-cms-loop="portfolio">
    <a class="work-card feature" data-cms-item> … </a>   ← card mẫu
  </div>
  <!-- /@cms:loop portfolio -->
  ```
  `field:selector` = đổ `field` vào phần tử khớp `selector` BÊN TRONG card.
  → React: `data-cms-loop` = `.map()`, `data-cms-item` = component card, mỗi `field:selector` = 1 prop.
- **Repeater lồng (Single):** `<!-- CMS:REPEAT stats START --> … END -->` (stats, services, gallery, related) → mảng field.
- `{{field}}` chỉ trong comment chỉ dẫn — KHÔNG render ra HTML.

---

## 5. Task list

**Phase 0 — Foundation:** init Next.js + Payload + Supabase Postgres (media để Vercel Blob/R2, KHÔNG dùng Supabase S3) → import `tokens-brick.css` → map Tailwind → dựng `/styleguide` → port block dùng chung (`TopNav`, `MegaNav`, `CtaSection`, `Footer`).
**Phase 1 — Data:** khai báo collections (Mục 3) → `lib/content/` (hàm typed, page chỉ gọi qua đây).
**Phase 2 — Port:** Archive (`work`→`industries`→`services`→`blog`) → Single (`work/[slug]` trước vì nhiều repeater nhất, rồi copy) → `generateStaticParams` + `generateMetadata` → nối slug card→Single.
**Phase 3 — Hoàn thiện:** Core/Legal (block) → 404/error/thank-you → JS tĩnh (mega nav, tab, FAQ, filter) sang React → dữ liệu thật.

---

## 6. Cần Claude Design xuất bổ sung
1. **Home, About, Contact** (chặn tiến độ — 3 trang quan trọng nhất nhưng chưa có file).
2. **Blog Archive + Single** (`blog.html`, `single-post.html`).
3. **404 / thank-you** tối thiểu khớp DS.
4. **Trạng thái thiếu trong Archive/form:** pagination, filter active, empty state, success/error của form.

## Definition of done
- Đổi 1 giá trị trong `tokens-brick.css` → toàn site đổi, không sửa component.
- Thêm 1 bản ghi trong Payload → tự lên Archive + có trang Single, không deploy.
- Không hardcode màu/spacing/font ngoài `tokens-brick.css`. Class & DOM khớp 100% bản design.
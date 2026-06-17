# Handoff: STRUCXAL Website — CMS Templates (Archive / Single)

> Gói này để **Codex / Claude Code** đọc và kiểm tra cấu trúc TRƯỚC khi build CMS.
> Mọi giao diện do **Claude Design** giữ; phần này mô tả cấu trúc + quy ước đánh dấu CMS.

---

## 1. Các file là gì

Đây là **bản thiết kế tham chiếu viết bằng HTML/CSS tĩnh** — thể hiện giao diện & cấu trúc
mong muốn, KHÔNG phải code production để copy nguyên. Nhiệm vụ của dev là **dựng các template
này trong môi trường CMS đã chọn** (WordPress/ACF, Next.js + Sanity/Payload, v.v.), giữ
nguyên class & token, biến vùng tĩnh thành vùng lặp dữ liệu.

**Fidelity: High-fidelity.** Màu, type, spacing, layout đã chốt theo Design System. Tái dựng
pixel-perfect bằng đúng class/token sẵn có — không tự chế màu/spacing mới.

---

## 2. Nguyên tắc bất biến (KHÔNG vi phạm)

1. CHỈ dùng class & `var(--*)` có sẵn. KHÔNG hardcode màu/spacing/font.
2. KHÔNG đổi tên class hay cấu trúc DOM khi biến HTML tĩnh → template động.
3. Vùng lặp: giữ nguyên 1 card mẫu, chỉ thay nội dung tĩnh bằng biến CMS, rồi loop.
4. Đổi design sau = Claude Design sửa token/CSS → toàn site đổi, code KHÔNG phải sửa.

---

## 3. Bản đồ template

| Loại | Archive (listing) | Single (detail) |
|---|---|---|
| **Core** | — | `Structure Homepage.html`, `about.html`, `contact.html` |
| **Services** | `services.html` | `service-web-design.html`, `service-web-app.html`, `service-seo.html`, `service-saas.html` |
| **Industries** | `industries.html` | `industry-ecommerce.html`, `industry-saas.html`, `industry-fintech.html`, `industry-healthcare.html`, `industry-realestate.html`, `industry-education.html` |
| **Portfolio** | `work.html` | `single-portfolio.html` (case study — khuôn cho CMS) |

---

## 4. Quy ước đánh dấu CMS (đọc trong từng file HTML)

- **Loại trang:** `<body data-template="...">` + `<!-- @cms TEMPLATE: ... -->` ở đầu body.
- **Vùng lặp (Archive):**
  ```html
  <!-- @cms:loop name="portfolio" item=".work-card" fields="title:.info h3, meta:.info .m, permalink:href" -->
  <div class="work-grid" data-cms-loop="portfolio">
    <a class="work-card feature" href="single-portfolio.html" data-cms-item> … </a>  ← card mẫu
  </div>
  <!-- /@cms:loop portfolio -->
  ```
  Cú pháp `fields`: `field:selector` → đổ `field` vào phần tử khớp `selector` BÊN TRONG card.
- **Repeater lồng (Single):** `<!-- CMS:REPEAT name START -->` … `<!-- CMS:REPEAT name END -->`
  (vd `services`, `stats`, `gallery`, `related`).
- **Token chỉ dẫn:** `{{field}}` chỉ xuất hiện trong comment hướng dẫn — KHÔNG render ra HTML.

---

## 5. Content types & fields

### portfolio (Archive `work.html` → Single `single-portfolio.html`)
Archive card (`.work-card`): `title`, `meta` (ngành·năm), `hero_stat`, `featured` (class `feature`),
`cover` (image), `permalink`.
Single thêm: `summary`, `client`, `duration`, `industry`, `services[]`, `live_url`,
`challenge` (rich text), `approach` (rich text), `stats[] {value,unit,label}`,
`gallery[] {image,caption}`, `related[] {number,title,meta,href}`.

### industry (Archive `industries.html` → Single `industry-*.html`)
Card (`.ind-card`): `number`, `title`, `lead`, `tags`, `stat_value`, `stat_label`, `permalink`.
Single: `title`, `eyebrow`, `lead`, `stats[]`, `faqs[] {q,a}`, `related[]`, + section case study.

### service (Archive `services.html` → Single `service-*.html`)
Card (`.svc-deep`): `number`, `title`, `lead`, `tags`, `metric_value`, `metric_label`, `permalink`.
Single: `title`, `number`, `icon`, `lead`, `features[]`, `process[]`, `pricing`, `tech[]`.

### page (Core) — Home/About/Contact dựng tay, không cần CPT.

---

## 6. Design System contract

- Tokens: `tokens-brick.css` (+ `tokens.css`). Component/section CSS: `service.css`.
- Body luôn `.strx`; container `.strx-container` (max 1440px).
- Mọi màu/spacing tham chiếu `var(--accent)`, `var(--ink)`, `var(--space-*)`, `var(--radius-*)`…
- Eyebrow: `<p class="t-mono">// Nhãn</p>` (trên nền tối thêm `.dark`).
- Block dùng chung copy y nguyên: `nav.top#topnav`, `section.cta`, `footer`,
  nav mega (`nav-mega.css` + `nav-mega.js`).
- Design System chính thức (React + tokens) ở dự án gốc: `_ds/structure-design-system-6df7eb…`.

---

## 7. Gợi ý CMS
- **WordPress + ACF/CPT** — khớp đúng Archive/Single; headless (WP REST/GraphQL + Next.js) giữ DS nguyên.
- **Sanity / Payload** — headless hiện đại, tách design/content tốt nhất với Next.js.
- **Storyblok / Webflow CMS** — có visual editor cho người không kỹ thuật.

---

## 8. Cần chốt trước khi build
1. **Tên thương hiệu:** "Strucxal" (project) vs "Structure" (UI). Chọn một.
2. **Nền tảng CMS** + framework render.
3. **URL pattern** cho Single (vd `/work/{slug}`, `/industries/{slug}`, `/services/{slug}`).

---

## 9. Files trong gói
- `templates/` — bản HTML tham chiếu (Core + Archive + Single của mỗi loại).
  - Core: `Structure Homepage.html`, `about.html`, `contact.html`
  - Services / Industries / Portfolio: Archive + Single mẫu
- `assets/` — CSS/JS phụ thuộc (`tokens-brick.css`, `tokens.css`, `service.css`, `nav-mega.css`, `service.js`, `nav-mega.js`).
- `CLAUDE.md` — spec đầy đủ (tự nạp khi mở dự án trong Claude).

> Mở các file `templates/*.html` để xem mốc `@cms:loop` và `CMS:REPEAT` tại chỗ.
# CMS-Website-Structure

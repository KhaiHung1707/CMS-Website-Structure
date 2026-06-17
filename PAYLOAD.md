# Cấu hình Payload — Structure Website

Payload 3 nhúng trong Next.js, DB = Supabase Postgres, data 100% thuộc về bạn (không SaaS bên thứ 3).

## 1. File ở đâu

```
src/payload/
  payload.config.ts        # điểm cấu hình trung tâm (db, editor, collections, globals, storage)
  collections/             # mỗi file = 1 bảng nội dung
  globals/SiteSettings.ts  # cấu hình toàn site (nav, footer, social)
  blocks/                  # block linh hoạt cho extra_blocks & pages.layout
  fields/                  # field tái dùng (slug, seo)
  payload-types.ts         # TỰ SINH bằng `npm run generate:types` (đừng sửa tay)

src/app/(payload)/         # admin UI + REST/GraphQL (Payload tự lo, đừng sửa)
src/lib/payload/getPayload.ts  # client local-API, CHỈ dùng trong src/lib/content/*
```

## 2. Biến môi trường (trong `.env`, đã gitignore)

| Biến | Ý nghĩa |
|---|---|
| `DATABASE_URI` | Connection string Supabase Postgres |
| `PAYLOAD_SECRET` | Khóa ký session/token — sinh bằng `openssl rand -hex 32` |
| `NEXT_PUBLIC_SERVER_URL` | URL site (serverURL + canonical SEO) |
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob (lưu media) |

## 3. Khởi động lần đầu

```bash
npm install
npm run generate:types     # sinh src/payload/payload-types.ts từ collections
npm run dev                # site :3000  +  admin tại /admin
```

Mở `http://localhost:3000/admin` → tạo **user admin đầu tiên** → thêm dữ liệu theo thứ tự:
**Industries → Services → Projects** (vì Projects tham chiếu tới 2 cái kia) → **Posts** → thêm `pages` slug `home`/`privacy`/`terms`/`cookies` để đổ nội dung Core/Legal.

## 4. Cấu hình từng phần (trong `payload.config.ts`)

```ts
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  editor: lexicalEditor(),                  // rich text
  collections: [Users, Media, Industries, Services, Projects, Posts, Pages, Testimonials],
  globals: [SiteSettings],
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  plugins: [ vercelBlobStorage({ collections: { media: true }, token: ... }) ],
})
```

### Thêm 1 collection mới
1. Tạo `src/payload/collections/Foo.ts` (xem `Industries.ts` làm mẫu — dùng `slugField()`, `seoField`).
2. Import + thêm vào mảng `collections` trong `payload.config.ts`.
3. `npm run generate:types`.
4. (Tùy chọn) thêm hàm trong `src/lib/content/foo.ts` để page lấy data — **page chỉ gọi qua `@/lib/content`**.

### Thêm field vào collection có sẵn
Sửa file collection → `npm run generate:types`. Dev mode tự đồng bộ schema vào DB (xem §6).

### Thêm block linh hoạt
Tạo `src/payload/blocks/FooBlock.ts` → thêm vào `extraBlocks`/`pageBlocks` trong `blocks/index.ts` → tạo view `src/components/blocks/FooBlockView.tsx` → thêm `case 'foo'` trong `BlockRenderer.tsx`.

## 5. Storage media: Vercel Blob → Cloudflare R2

Đang dùng Vercel Blob. Khi chuyển R2 (S3-compatible) — chỉ sửa **1 block** trong `payload.config.ts`, không đụng collection/component (component chỉ đọc `media.url`):

```bash
npm i @payloadcms/storage-s3
```
```ts
import { s3Storage } from '@payloadcms/storage-s3'
// thay vercelBlobStorage(...) bằng:
s3Storage({
  collections: { media: true },
  bucket: process.env.R2_BUCKET!,
  config: {
    endpoint: process.env.R2_ENDPOINT!,           // https://<acct>.r2.cloudflarestorage.com
    region: 'auto',
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  },
})
```
Rồi thêm hostname R2 vào `images.remotePatterns` trong `next.config.mjs`.

## 6. Schema sync: dev push vs production migrations

- **Dev:** `postgresAdapter` mặc định `push: true` → tự đồng bộ schema vào Supabase khi chạy `npm run dev`. Tiện nhưng đừng dùng cho production.
- **Production:** dùng migrations:
  ```bash
  npm run payload migrate:create   # sinh file migration từ schema hiện tại
  npm run payload migrate          # chạy migration trên DB đích
  ```
  Có thể tắt push ở prod: `postgresAdapter({ push: false, pool: {...} })`.

## 6b. Trạng thái thực tế sau khi chạy thử (đã verify)

- **DB**: kết nối Supabase qua **Session pooler** OK (PostgreSQL 17.6). Direct connection `db.xxx.supabase.co` chỉ IPv6 → KHÔNG dùng được ở mạng này.
- **Mọi route render OK** (`/`, archive, single → 404 khi không có data, admin, legal, 404/error).
- **Media storage tạm TẮT** trong `payload.config.ts` (chưa có `BLOB_READ_WRITE_TOKEN`). Payload lưu file lên **local disk** khi dev. Khi có token: bỏ comment import + block `vercelBlobStorage` rồi chạy `npm run payload generate:importmap`.
  - ⚠️ Lý do tắt: handler client của Vercel Blob kéo `pino → worker_threads` vào client bundle → vỡ `/admin`. Chỉ bật khi thật sự dùng (có token), và nhớ generate lại importmap.
- **`sharp` (resize ảnh) tạm TẮT**: import `sharp` vào config gây lỗi bundle `worker_threads` ở môi trường này → upload ảnh ở kích thước gốc. Bật lại theo comment trong `payload.config.ts` khi môi trường build hỗ trợ.
- **Pool**: đặt `max: 8` để không vượt giới hạn 15 client của Session pooler. Lúc dev cold-compile nhiều route cùng lúc có thể gặp `EMAXCONNSESSION` (transient) — request lại là OK; `next build` (prod) không bị.

## 7. Lưu ý Supabase (hay gặp)

- **Cổng:** `5432` = direct/session (hỗ trợ prepared statements — hợp Payload). `6543` = transaction pooler (KHÔNG hỗ trợ prepared statements → cần xử lý riêng). Ưu tiên 5432.
- **Nếu connect lỗi (host `db.xxx.supabase.co` IPv6-only):** lấy chuỗi **Session pooler** trong Supabase → Project Settings → Database (host dạng `aws-0-<region>.pooler.supabase.com`), vẫn cổng 5432.
- **SSL:** Supabase yêu cầu SSL. Nếu cần, thêm `?sslmode=require` vào `DATABASE_URI`, hoặc cấu hình `pool: { connectionString, ssl: { rejectUnauthorized: false } }`.
- **Bảo mật:** đổi mật khẩu DB sau khi đã chia sẻ; không để credential trong `.env.example`.

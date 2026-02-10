# Wdrożenie PersonalBlog na Cloudflare Pages
**Data:** 10 lutego 2026

## ✅ Zmiany zapisane w Git
Commit: `ff12d30` - "Aktualizacja portfolio - dane Karol Bonzo, favicon, avatar, stopka i metadata"

## 🚀 Wdrożenie na Cloudflare Pages

### Opcja 1: Przez Dashboard Cloudflare (Zalecane dla pierwszego wdrożenia)

1. **Zaloguj się do Cloudflare Dashboard:**
   - Przejdź na: https://dash.cloudflare.com
   - Wybierz **Workers & Pages** z menu

2. **Utwórz nowy projekt:**
   - Kliknij **Create application** > **Pages** > **Connect to Git**
   - Wybierz GitHub i autoryzuj dostęp do repozytorium `PersonalBlog`

3. **Konfiguracja Build:**
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   Root directory: /
   Node version: 18 lub nowszy
   ```

4. **Zmienne środowiskowe (Environment Variables):**
   ```
   NEXT_PUBLIC_GITHUB_USERNAME=Bonzokoles
   WAKATIME_API_KEY=your_actual_key_here
   NODE_VERSION=18
   ```

5. **Deploy:**
   - Kliknij **Save and Deploy**
   - Cloudflare automatycznie zbuduje i wdroży aplikację

### Opcja 2: Przez Wrangler CLI

```powershell
# 1. Zainstaluj Wrangler
npm install -g wrangler

# 2. Zaloguj się do Cloudflare
wrangler login

# 3. Wdróż projekt
cd U:\WEB_PROJECTS\active\websites\PersonalBlog
npx @cloudflare/next-on-pages@latest
wrangler pages deploy .vercel/output/static
```

## 📊 Integracja z Cloudflare D1 (dla artykułów i zdjęć)

### 1. Utwórz bazę danych D1:
```powershell
wrangler d1 create bonzo-blog-db
```

### 2. Schematy tabel:

**Tabela: articles**
```sql
CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT DEFAULT 'Karol Bonzo',
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  category TEXT,
  tags TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'draft'
);
```

**Tabela: images**
```sql
CREATE TABLE images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  width INTEGER,
  height INTEGER,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  article_id INTEGER,
  FOREIGN KEY (article_id) REFERENCES articles(id)
);
```

### 3. Konfiguracja wrangler.toml:

```toml
name = "bonzo-portfolio"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".vercel/output/static"

[[d1_databases]]
binding = "DB"
database_name = "bonzo-blog-db"
database_id = "your-d1-database-id"

[[r2_buckets]]
binding = "IMAGES"
bucket_name = "bonzo-images"
```

### 4. Dodaj API Routes dla D1:

Utwórz: `src/app/api/articles/route.ts`
```typescript
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { DB } = (request as any).context.env;
  
  const { results } = await DB.prepare(
    'SELECT * FROM articles WHERE status = ? ORDER BY published_at DESC'
  ).bind('published').all();
  
  return Response.json(results);
}
```

## 🔧 Optymalizacje dla Cloudflare

### 1. Dodaj Cloudflare Images support:
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudflare-image-loader.ts',
  },
};
```

### 2. Cache Headers:
```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  return response;
}
```

## 📝 Custom Domain Setup

1. W Cloudflare Dashboard > Pages > Custom domains
2. Dodaj domenę: **jimbo77.com**
3. Zaktualizuj DNS records (automatycznie przez Cloudflare)
4. Włącz SSL/TLS (Full/Strict)

## 🔐 Environment Variables

W Cloudflare Dashboard > Pages > Settings > Environment Variables:

```
Production:
- NEXT_PUBLIC_GITHUB_USERNAME=Bonzokoles
- WAKATIME_API_KEY=your_key
- DATABASE_URL=your_d1_connection_string

Preview:
- (te same lub testowe wartości)
```

## ✅ Checklist przed wdrożeniem:

- [x] Zmiany zapisane w Git
- [x] Dane osobowe zaktualizowane
- [x] Avatar i favicon dodane
- [ ] Push do GitHub: `git push origin main`
- [ ] Połączenie z Cloudflare Pages
- [ ] Konfiguracja zmiennych środowiskowych
- [ ] Setup D1 database (jeśli potrzebne)
- [ ] Setup R2 bucket dla obrazków (jeśli potrzebne)
- [ ] Konfiguracja custom domain
- [ ] Test wdrożenia
- [ ] Weryfikacja SEO i metadata

## 🚀 Następne kroki:

```powershell
# 1. Push do GitHub
cd U:\WEB_PROJECTS\active\websites\PersonalBlog
git push origin main

# 2. Albo deploy bezpośrednio przez Cloudflare Dashboard
# Lub użyj Wrangler CLI jak opisano wyżej
```

## 🤖 R2 Storage + Automatyczny Image Publisher Agent

### Setup R2 Bucket

```powershell
# Utwórz bucket dla obrazków
wrangler r2 bucket create bonzo-images
```

### Automatyczny Agent

**Mamy już działającego agenta** w R2, który automatycznie:
- ✅ Łączy zdjęcia z artykułami
- ✅ Optymalizuje formaty (WebP, AVIF)
- ✅ Tworzy responsywne warianty
- ✅ Generuje alt text
- ✅ Dodaje do publikacji

### Jak używać:

```powershell
# Upload zdjęcia z odpowiednią nazwą
wrangler r2 object put bonzo-images/articles/my-post-hero.jpg --file="./image.jpg"

# Agent automatycznie:
# 1. Rozpoznaje artykuł po slug (my-post)
# 2. Dodaje jako featured_image
# 3. Tworzy wersje: 400w, 800w, 1200w, 1920w
# 4. Aktualizuje D1 database
```

### Konwencja nazewnictwa:

```
articles/{slug}-hero.jpg        → Główny obrazek artykułu
articles/{slug}-1.jpg           → Pierwszy obrazek w treści
articles/{slug}-2.jpg           → Drugi obrazek w treści
gallery/{slug}/{name}.jpg       → Galeria dla artykułu
thumbnails/{slug}.jpg           → Miniatura OG
```

📖 **Szczegóły:** Zobacz `The_yellow_hub_CLEAN/PROJECTS/PersonalBlog_Deployment_Manual.md` (sekcja R2)

## 📚 Dokumentacja:
- Cloudflare Pages: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- D1 Database: https://developers.cloudflare.com/d1/
- R2 Storage: https://developers.cloudflare.com/r2/

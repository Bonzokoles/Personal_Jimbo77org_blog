# 🚀 Wdrożenie PersonalBlog na Cloudflare Pages

## Krok 1: Otwórz Cloudflare Dashboard

1. Idź na: **https://dash.cloudflare.com**
2. Zaloguj się na swoje konto Cloudflare

## Krok 2: Utwórz Projekt Pages

1. W menu bocznym kliknij **Workers & Pages**
2. Kliknij **Create application**
3. Wybierz zakładkę **Pages**
4. Kliknij **Connect to Git**

## Krok 3: Połącz GitHub

1. Jeśli to pierwsza integracja:
   - Kliknij **Connect GitHub**
   - Zaloguj się do GitHub
   - Autoryzuj Cloudflare
2. Wybierz repozytorium: **Personal_Jimbo77org_blog**

## Krok 4: Konfiguracja Build

### Framework preset:
- Wybierz: **Next.js (Static HTML Export)** lub **Next.js**

### Build settings:
```
Production branch: main
Build command: npm run build
Build output directory: .next
Root Directory: / (leave empty)
```

### Environment Variables:
Dodaj następujące zmienne (opcjonalne):

```
NEXT_PUBLIC_GITHUB_USERNAME=Bonzokoles
NODE_VERSION=20
```

*(WakaTime API możesz dodać później w Settings)*

## Krok 5: Deploy!

1. Kliknij **Save and Deploy**
2. Cloudflare rozpocznie budowanie projektu
3. Poczekaj ~2-5 minut na build

## Krok 6: Sukces! 🎉

Po zakończeniu buildu otrzymasz:
- **URL projektu**: `https://personal-jimbo77org-blog.pages.dev`
- Możliwość dodania Custom Domain (jimbo77.com)

---

## 📝 Dodawanie Custom Domain (jimbo77.com)

Po pierwszym wdrożeniu:

1. W projekcie kliknij **Custom domains**
2. Kliknij **Set up a custom domain**
3. Wpisz: `jimbo77.com` lub `blog.jimbo77.com`
4. Postępuj zgodnie z instrukcjami DNS

---

## 🔄 Automatyczne Wdrożenia

Od teraz każdy **push do main** na GitHub automatycznie zbuduje i wdroży nową wersję!

```bash
git add .
git commit -m "Update: nowa funkcjonalność"
git push
# Cloudflare automatycznie wdroży zmiany!
```

---

## ⚙️ Dodatkowa Konfiguracja (Opcjonalnie)

### D1 Database (dla bloga)
```bash
# Lokalnie z wrangler:
npm install -D wrangler
npx wrangler d1 create personal-blog-db
# Skopiuj database_id do wrangler.toml
```

### R2 Storage (dla obrazków)
```bash
npx wrangler r2 bucket create bonzo-images
# Wgraj obrazki:
npx wrangler r2 object put bonzo-images/articles/test.jpg --file=./test.jpg
```

---

## 📊 Monitoring

Dashboard Cloudflare pokazuje:
- ✅ Status deploymentów
- ✅ Logi buildu
- ✅ Analytics ruchu
- ✅ Funkcje (Functions/API routes)

---

## 🐛 Troubleshooting

### Build Failed?
- Sprawdź logi w Cloudflare Dashboard
- Upewnij się, że `npm run build` działa lokalnie
- Sprawdź czy wszystkie zależności są w `package.json`

### 404 Error?
- Sprawdź czy Build output directory = `.next`
- Dla Next.js App Router może być potrzebna konfiguracja

### Environment Variables
- Dodaj w: Settings → Environment variables → Production

---

**Gotowe!** Twój blog będzie dostępny na całym świecie przez CDN Cloudflare! 🌍

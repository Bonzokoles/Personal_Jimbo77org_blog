# Quick Start - GitHub i Cloudflare Deployment
**Data:** 10 lutego 2026

## ✅ Status: Gotowe do wdrożenia!
- Wszystkie zmiany zapisane lokalnie (commit: ff12d30)
- Dane osobowe zaktualizowane na Karol Bonzo
- Avatar, favicon, stopka - wszystko gotowe

## 🔴 Krok 1: Utwórz GitHub Repository

### Opcja A: Przez GitHub.com (Web)
1. Przejdź na: https://github.com/new
2. **Repository name:** `PersonalBlog`
3. **Description:** "Portfolio & Blog - Karol Bonzo | Tech Explorer & AI Architect"
4. **Visibility:** Public (lub Private)
5. ❌ **NIE** zaznaczaj "Initialize this repository with README"
6. Kliknij **Create repository**

### Opcja B: Przez GitHub CLI
```powershell
gh repo create PersonalBlog --public --source=. --remote=origin --push
```

## 🔴 Krok 2: Push do GitHub (jeśli A)

Jeśli użyłeś Opcji A, wykonaj:
```powershell
cd U:\WEB_PROJECTS\active\websites\PersonalBlog
git push -u origin main
```

## 🔴 Krok 3: Wdróż na Cloudflare Pages

### **Metoda 1: Przez Dashboard (Najłatwiejsza)**

1. **Zaloguj się:**
   - https://dash.cloudflare.com
   - Wybierz **Workers & Pages**

2. **Utwórz projekt:**
   - **Create application** > **Pages** > **Connect to Git**
   - Autoryzuj GitHub
   - Wybierz `Bonzokoles/PersonalBlog`

3. **Build Settings:**
   ```
   Production branch: main
   Build command: npm run build
   Build output directory: .next
   Root directory: (leave empty)
   ```

4. **Environment Variables:**
   Kliknij **Add variable** dla każdej:
   ```
   NEXT_PUBLIC_GITHUB_USERNAME = Bonzokoles
   NODE_VERSION = 18
   ```

5. **Deploy:**
   - **Save and Deploy**
   - Cloudflare zbuduje i wdroży (3-5 minut)
   - Otrzymasz URL: `personalBlog.pages.dev`

### **Metoda 2: Przez Wrangler CLI (Dla zaawansowanych)**

```powershell
# Zainstaluj Wrangler globalnie
npm install -g wrangler

# Zaloguj się
wrangler login

# Deploy bezpośrednio
cd U:\WEB_PROJECTS\active\websites\PersonalBlog
npm run build
wrangler pages deploy .next --project-name=bonzo-portfolio
```

## 🔴 Krok 4: Custom Domain (jimbo77.com)

Po wdrożeniu:
1. W Cloudflare Pages > **Custom domains**
2. Kliknij **Set up a custom domain**
3. Wpisz: `jimbo77.com` lub `www.jimbo77.com`
4. Cloudflare automatycznie skonfiguruje DNS
5. SSL Certificate: Automatycznie (Free)

## 📊 Opcjonalnie: D1 Database (dla artykułów)

Jeśli chcesz dodać blog z D1:

```powershell
# Utwórz bazę danych
wrangler d1 create bonzo-blog-db

# Zapisz Database ID (pojawi się w output)
# Dodaj do wrangler.toml lub Environment Variables w Cloudflare
```

## 🤖 R2 Storage + Image Publisher Agent

**Już mamy gotowego agenta!** Automatycznie łączy zdjęcia z artykułami:

```powershell
# 1. Upload zdjęcia do R2
wrangler r2 object put bonzo-images/articles/my-article-hero.jpg --file="./hero.jpg"

# 2. Agent automatycznie:
#    - Rozpoznaje artykuł po nazwie (my-article)
#    - Dodaje jako featured_image
#    - Tworzy responsywne wersje
#    - Generuje alt text
```

**Konwencja nazw:**
- `articles/{slug}-hero.jpg` → Główny obrazek
- `articles/{slug}-1.jpg` → Pierwszy w treści
- `gallery/{slug}/image.jpg` → Galeria

📖 **Pełna dokumentacja:** `The_yellow_hub_CLEAN/PROJECTS/PersonalBlog_Deployment_Manual.md` (sekcja R2)

## 🎯 Automatyczne Deployments

Po połączeniu z GitHub:
- **Każdy push do `main`** → Automatyczny deploy na produkcję
- **Pull Request** → Preview deployment (osobny URL do testów)
- **Rollback** → Możliwość powrotu do poprzedniej wersji

## 📝 Podsumowanie Komend

```powershell
# 1. Jeśli jeszcze nie utworzyłeś repo:
#    Idź na https://github.com/new i utwórz "PersonalBlog"

# 2. Push do GitHub
cd U:\WEB_PROJECTS\active\websites\PersonalBlog
git push -u origin main

# 3. Podłącz Cloudflare Pages (przez dashboard)
#    https://dash.cloudflare.com → Workers & Pages → Create

# 4. Gotowe! 🎉
```

## ✅ Checklist Deployment

- [ ] Utwórz GitHub repo: `Bonzokoles/PersonalBlog`
- [ ] Push kodu: `git push -u origin main`
- [ ] Połącz Cloudflare Pages z GitHub
- [ ] Ustaw Environment Variables
- [ ] Pierwszy deploy (automatyczny)
- [ ] Dodaj custom domain `jimbo77.com`
- [ ] Sprawdź czy strona działa
- [ ] (Opcjonalnie) Setup D1 dla artykułów

## 🚀 Po Deployment

Twoja strona będzie dostępna na:
- Cloudflare URL: `https://personal-blog-xxx.pages.dev`
- Custom domain: `https://jimbo77.com` (po konfiguracji)

**Szybkość:**
- Build time: ~2-3 minuty
- Global CDN: Cloudflare (175+ lokalizacji)
- SSL: Automatyczny, darmowy
- Deploy na każdy push: Automatyczny

## 💡 Wskazówki

1. **Pierwszy deploy zawsze trwa dłużej** (instalacja zależności)
2. **Preview Deployments** - każdy PR dostaje własny URL
3. **Analytics** - włącz w Cloudflare Pages > Analytics
4. **Cache** - Cloudflare automatycznie cache'uje static assets

---

**Pytania?** Sprawdź szczegóły w `CLOUDFLARE_DEPLOYMENT.md`

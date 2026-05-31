# Academia Bolaños — CLAUDE.md

> **REGLA CRÍTICA:** Leer este archivo al INICIO de cada sesión. Actualizar el historial y checkboxes al COMPLETAR cada tarea.

---

## Proyecto

**Academia Bolaños** — Academia de música y idiomas, Costa Rica.
- Repo: `https://github.com/NelSystems77/academia-bolanos.git`
- Deploy: GitHub Pages (`gh-pages` branch)
- WhatsApp: `+506 89215848` → `https://wa.me/50689215848`
- Idiomas: Español (default `/`) y English (`/en/`)

---

## Stack Técnico

| Capa | Tecnología |
|---|---|
| Framework | Astro 4.x (SSG) |
| Lenguaje | TypeScript strict (`"strict": true`) |
| Estilos | Tailwind CSS v3 + CSS custom properties |
| Validación | Zod (schemas compartidos frontend/backend) |
| i18n | Astro i18n routing nativo |
| Testing Unit/Int | Vitest + @testing-library/dom |
| Testing E2E | Playwright |
| Linting | ESLint + Prettier |
| CI/CD | GitHub Actions |

---

## Identidad Visual

```css
--color-primary:       #0047AB;   /* Cobalt Blue */
--color-primary-light: #1A6FD4;
--color-accent:        #00BFFF;   /* Sky accent */
--color-dark:          #0A0A0F;   /* Near black bg */
--color-dark-2:        #111827;
--color-surface:       #141B2D;   /* Cards / surfaces */
--color-text:          #E8EAF0;
--color-text-muted:    #94A3B8;
```

---

## Servicios (escalable — agregar en `src/i18n/services.ts`)

1. Guitarra / Guitar
2. Ukelele / Ukulele
3. Canto / Singing
4. Inglés/Español / English/Spanish

---

## REGLAS ABSOLUTAS (no negociables en ninguna sesión)

### 1. RUTAS DE ASSETS — ABSOLUTAS SIEMPRE
- Toda ruta a imagen, font, script o estilo debe ser **absoluta** desde la raíz pública.
- Prohibido: `./assets/img.png`, `../fonts/Inter.woff2`
- Correcto: `/assets/img.png`, `/fonts/Inter.woff2`
- Testing: script de validación en `scripts/check-asset-paths.ts` verifica que no existan rutas relativas en el build.

### 2. PRINCIPIOS SOLID
- **S** — Cada componente tiene una única responsabilidad.
- **O** — Nuevos servicios se agregan con datos en `i18n/services.ts`, sin tocar los componentes existentes.
- **L** — Componentes intercambiables mediante props tipadas.
- **I** — Props interfaces mínimas y específicas por componente.
- **D** — Datos fluyen de arriba hacia abajo; componentes no importan datos directamente de archivos externos de configuración.

### 3. SEGURIDAD (OBLIGATORIO)
- **Sanitización de inputs:** Zod en TODOS los formularios. Schema en `src/lib/schemas/`. Validar en frontend Y (si hay endpoint) en el servidor.
- **XSS:** Prohibido `innerHTML`, `dangerouslySetInnerHTML`, `set:html` sin sanitizar. Usar `set:text` siempre que sea posible.
- **CSRF:** Tokens en formularios POST (si se agregan endpoints).
- **Secrets:** CERO secrets en código frontend. Variables sensibles en `.env` (`.gitignore`). Solo usar `PUBLIC_` prefix en Astro para lo que puede ser público.
- **CSP:** Content-Security-Policy header configurado en `astro.config.mjs` headers o `_headers` (Netlify/Vercel) / `public/_headers`.
- **Headers de seguridad:** `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **Firebase** (cuando se integre): Reglas estrictas en `firestore.rules` y `storage.rules`. Nunca acceso público de escritura.
- **Dependencias:** `npm audit` en cada sesión que toque `package.json`.

### 4. PERFORMANCE (OBLIGATORIO)
- **Lazy loading:** Imágenes con `loading="lazy"` + `<Image />` de Astro. Componentes pesados con `client:idle` o `client:visible`.
- **Code splitting:** Astro lo hace por defecto (zero JS por defecto). Islas de JS solo donde hay interactividad real.
- **Fuentes:** `font-display: swap`. Preconectar a Google Fonts.
- **Imágenes:** Formato WebP/AVIF, dimensiones explícitas (`width` + `height`) para evitar CLS.
- **Memoización:** En funciones utilitarias puras con cálculos repetidos.
- **Target Lighthouse:** Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.

### 5. SEO & AI SEARCH
- Meta tags: `title`, `description`, `canonical`, Open Graph, Twitter Card.
- JSON-LD: `LocalBusiness` + `EducationalOrganization` en cada página.
- `hreflang` ES/EN en `<head>`.
- `sitemap.xml` generado por `@astrojs/sitemap`.
- `robots.txt` en `public/`.
- Headings semánticos: un solo `<h1>` por página.

### 6. TESTING (CRÍTICO)
- **Unit:** Vitest. Cubrir: schemas Zod, funciones i18n, utilidades.
- **Integration:** Testing Library + Vitest. Cubrir: formularios, validación, flujo de datos.
- **E2E:** Playwright. Cubrir: navegación ES/EN, links WhatsApp, formularios, mobile viewport.
- **Asset Paths:** Script `scripts/check-asset-paths.ts` — falla el build si detecta rutas relativas en `dist/`.
- **Accesibilidad:** `@axe-core/playwright` en E2E.
- Cobertura mínima: 80% en unit + integration.

### 7. ARQUITECTURA MODULAR
```
src/
  components/     — Un archivo por componente, props tipadas
  i18n/           — ui.ts (nav/meta), services.ts (tarjetas de servicios)
  layouts/        — BaseLayout.astro
  lib/
    schemas/      — Zod schemas
    utils/        — Funciones puras testeables
  pages/          — index.astro (ES), en/index.astro (EN)
  styles/         — global.css
public/
  assets/         — Imágenes optimizadas (WebP)
  favicon.svg
  robots.txt
  _headers        — Security headers para GitHub Pages (via custom 404 trick o Netlify)
scripts/
  check-asset-paths.ts
tests/
  unit/
  integration/
  e2e/
```

---

## CHECKLIST DE SESIONES

### ✅ Sesión 1 — Fundación & Setup
- [x] CLAUDE.md creado y versionado
- [x] `git init` + remote configurado
- [x] Proyecto Astro configurado manualmente con TypeScript strict
- [x] Tailwind CSS configurado (paleta Negro/Azul)
- [x] CSS custom properties en `src/styles/global.css`
- [x] i18n routing configurado (ES default `/`, EN `/en/`)
- [x] Archivos i18n completos: `src/i18n/ui.ts` + `src/i18n/services.ts`
- [x] BaseLayout con SEO completo (meta, OG, Twitter Card, hreflang, JSON-LD LocalBusiness)
- [x] Todos los componentes: Header, Hero, Services, ServiceCard, About, Testimonials, Promotions, ContactCTA, Footer, WhatsAppButton, LanguageSwitcher
- [x] Páginas ES (`/`) y EN (`/en/`) creadas
- [x] `robots.txt` y `sitemap.xml` estático configurados
- [x] Security headers en `public/_headers`
- [x] ESLint + Prettier configurados
- [x] `.env.example` y `.gitignore` configurados
- [x] Zod instalado + schema de contacto con validación completa
- [x] Script `check-asset-paths.ts` creado y funcionando
- [x] 20/20 tests unitarios pasando
- [x] Build limpio: 2 páginas generadas
- [x] **NOTA SEGURIDAD:** Astro 4.x tiene CVEs en features SSR (middleware, server islands, Cloudflare adapter). Nuestra app es 100% SSG estático, estos CVEs NO aplican en producción. Upgrade a Astro 6.x en Sesión 8 (deploy).
- [x] `.github/workflows/deploy.yml` con CI (lint, typecheck, test, check-paths) + deploy a GitHub Pages

### ✅ Sesión 2 — Layout & Navegación
- [x] Header con logo + nav + LanguageSwitcher
- [x] Mobile menu final — animación slide-in/out, backdrop blur, cierre Escape/click-fuera/resize, burger→X animation
- [x] WhatsApp button flotante (sticky) — se oculta cuando el menú móvil está abierto
- [x] Footer con links y datos de contacto
- [x] Verificar: todas las rutas de assets absolutas
- [x] Fix `@keyframes pulse` faltante (Hero badge-dot)
- [x] Sistema scroll-reveal (`.reveal` + IntersectionObserver, stagger delay via CSS var)
- [x] body.menu-open oculta WAB button durante menú móvil

### ⬜ Sesión 3 — Hero & CTA
- [ ] Hero section con headline bilingüe
- [ ] Subheadline + CTA botones (WhatsApp + "Ver servicios")
- [ ] Imagen hero optimizada (WebP, lazy donde aplica)
- [ ] Animación CSS sutil (sin JS)

### ⬜ Sesión 4 — Cards de Servicios
- [ ] Sección Services con grid responsive
- [ ] ServiceCard component (icono, título, descripción, CTA WhatsApp)
- [ ] Datos en `i18n/services.ts` (SOLID - OCP)
- [ ] Nuevo servicio = solo agregar entrada en el archivo de datos

### ⬜ Sesión 5 — Secciones Complementarias
- [ ] Sección "Por qué elegirnos" / About
- [ ] Testimonials / Reviews
- [ ] Sección Promociones (placeholder escalable)
- [ ] Galería / Media placeholder

### ⬜ Sesión 6 — Formulario de Contacto + Seguridad
- [ ] Formulario de contacto (Zod validation)
- [ ] Sanitización XSS en todos los inputs
- [ ] Security headers en `public/_headers`
- [ ] CSP configurada
- [ ] `npm audit` final

### 🔄 Sesión 7 — Testing (parcial)
- [x] Vitest configurado (Sesión 1)
- [x] Tests unitarios: Zod schemas, utils i18n (Sesión 1 — 20/20)
- [ ] Tests integración: formulario, validación
- [x] Playwright E2E: navegación, WhatsApp links, mobile (54/54 Chromium)
- [x] Accessibility tests con axe-core — WCAG 2.0/2.1 A–AA, ARIA, semántica, skip-link
- [ ] Script `check-asset-paths` en CI
- [ ] Cobertura ≥ 80%
- **Bug fix:** `LanguageSwitcher` — hrefs faltaban el base path (`/academia-bolanos`), habría dado 404 en producción

### ⬜ Sesión 8 — Performance & Deploy
- [ ] Lighthouse audit ≥ 90 en todas las categorías
- [ ] Imágenes optimizadas (WebP, dimensiones explícitas)
- [ ] `@astrojs/sitemap` generando sitemap correcto
- [ ] GitHub Actions CI/CD configurado
- [ ] Deploy a GitHub Pages
- [ ] Verificar URLs ES/EN en producción

---

## Historial de Sesiones

| Fecha | Sesión | Estado |
|---|---|---|
| 2026-05-31 | Sesión 1 completa — Scaffolding total, build limpio, 20/20 tests | ✅ Completo |
| 2026-05-31 | Sesión 2 completa — Mobile menu final, scroll-reveal, fix pulse, build limpio, 20/20 tests | ✅ Completo |
| 2026-05-31 | Sesión 7 parcial — E2E Playwright 54/54 Chromium, axe WCAG A–AA, bug fix LanguageSwitcher base path | ✅ Completo |

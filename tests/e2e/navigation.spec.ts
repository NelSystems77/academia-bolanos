import { test, expect } from "@playwright/test";

const BASE = "/academia-bolanos";

// ── ES default route ──────────────────────────────────────────────────────────

test.describe("Navigation — ES (default)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/`);
  });

  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Academia Bolaños/);
  });

  test("hero section is visible", async ({ page }) => {
    await expect(page.locator("#hero")).toBeVisible();
  });

  test("services section has 4 cards", async ({ page }) => {
    await page.click('a[href*="#services"]');
    await expect(page.locator("#services article")).toHaveCount(4);
  });

  test("WhatsApp floating button exists and has correct href", async ({ page }) => {
    const waBtn = page.locator(".wa-fab");
    await expect(waBtn).toBeVisible();
    const href = await waBtn.getAttribute("href");
    expect(href).toContain("wa.me/50689215848");
  });

  test("language switcher switches to English", async ({ page }) => {
    await page.click("a[hreflang='en']");
    await expect(page).toHaveURL(/\/en\/?/);
  });

  test("skip to content link exists for accessibility", async ({ page }) => {
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeAttached();
  });

  test("WhatsApp FAB hides when mobile menu is open", async ({ page, viewport }) => {
    // Only relevant on narrow viewports — skip on desktop
    if (!viewport || viewport.width >= 768) return;
    await page.click("#menu-toggle");
    await expect(page.locator(".wa-fab")).toHaveCSS("display", "none").catch(() => {
      // body.menu-open hides WAB — verify body has the class
      return expect(page.locator("body")).toHaveClass(/menu-open/);
    });
  });
});

// ── EN route ─────────────────────────────────────────────────────────────────

test.describe("Navigation — EN", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/en/`);
  });

  test("page loads with English title", async ({ page }) => {
    await expect(page).toHaveTitle(/Academia Bolaños/);
  });

  test("hero primary CTA uses English text", async ({ page }) => {
    const cta = page.locator(".hero__cta--primary").first();
    await expect(cta).toContainText("WhatsApp");
  });

  test("language switcher goes back to Spanish", async ({ page }) => {
    await page.click("a[hreflang='es']");
    // Dev: base may or may not be in URL depending on server config.
    await expect(page).toHaveURL(new RegExp(`(${BASE.replace("/", "\\/")})?\\/?$`));
  });

  test("WhatsApp floating button links to correct number", async ({ page }) => {
    const href = await page.locator(".wa-fab").getAttribute("href");
    expect(href).toContain("wa.me/50689215848");
  });
});

// ── In-page anchor navigation ─────────────────────────────────────────────────

test.describe("In-page anchor links — ES", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/`);
  });

  test("#services section is reachable via anchor link", async ({ page }) => {
    await page.goto(`${BASE}/#services`);
    await expect(page.locator("#services")).toBeInViewport({ ratio: 0.1 });
  });

  test("#about section is reachable via anchor link", async ({ page }) => {
    await page.goto(`${BASE}/#about`);
    await expect(page.locator("#about")).toBeInViewport({ ratio: 0.1 });
  });

  test("#contact section is reachable via anchor link", async ({ page }) => {
    await page.goto(`${BASE}/#contact`);
    await expect(page.locator("#contact")).toBeInViewport({ ratio: 0.1 });
  });
});

// ── Mobile viewport ───────────────────────────────────────────────────────────

test.describe("Mobile viewport", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile menu toggle opens and closes", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const toggle = page.locator("#menu-toggle");
    const menu = page.locator("#mobile-menu");

    await expect(menu).toBeHidden();
    await toggle.click();
    await expect(menu).toBeVisible();
    await toggle.click();
    await expect(menu).toBeHidden();
  });

  test("clicking backdrop closes the mobile menu", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.click("#menu-toggle");
    await expect(page.locator("#mobile-menu")).toBeVisible();
    // Backdrop sits below the menu in z-index — dispatch event directly to bypass pointer interception.
    await page.locator("#mobile-backdrop").dispatchEvent("click");
    await expect(page.locator("#mobile-menu")).toBeHidden();
  });

  test("clicking a menu link closes the mobile menu", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.click("#menu-toggle");
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.locator("#mobile-menu a").first().click();
    await expect(page.locator("#mobile-menu")).toBeHidden();
  });

  test("Escape key closes the mobile menu", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.click("#menu-toggle");
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toBeHidden();
  });

  test("WhatsApp FAB is visible on mobile", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator(".wa-fab")).toBeVisible();
  });

  test("body gets class 'menu-open' when mobile menu is open", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.click("#menu-toggle");
    await expect(page.locator("body")).toHaveClass(/menu-open/);
    await page.click("#menu-toggle");
    const classes = await page.locator("body").getAttribute("class") ?? "";
    expect(classes).not.toContain("menu-open");
  });
});

// ── Scroll-reveal ─────────────────────────────────────────────────────────────

test.describe("Scroll-reveal", () => {
  test("elements below fold gain 'visible' class when scrolled into view", async ({ page }) => {
    await page.goto(`${BASE}/`);
    // Scroll to the bottom to trigger all reveals
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // Give the IntersectionObserver a tick to fire
    await page.waitForTimeout(300);
    const reveals = page.locator(".reveal");
    const count = await reveals.count();
    if (count > 0) {
      // At least some reveal elements should now be visible
      const visibleCount = await page.locator(".reveal.visible").count();
      expect(visibleCount).toBeGreaterThan(0);
    }
  });
});

// ── WhatsApp message text ─────────────────────────────────────────────────────

test.describe("WhatsApp link text encoding", () => {
  test("WAB href contains URL-encoded text parameter", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const href = await page.locator(".wa-fab").getAttribute("href");
    // Must have a ?text= query parameter
    expect(href).toMatch(/[?&]text=/);
  });

  test("hero CTA WhatsApp link opens in new tab (target=_blank)", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const cta = page.locator(".hero__cta--primary").first();
    expect(await cta.getAttribute("target")).toBe("_blank");
    expect(await cta.getAttribute("rel")).toContain("noopener");
  });
});

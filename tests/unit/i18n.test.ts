import { describe, it, expect } from "vitest";
import { useTranslations, getLangFromUrl, getLocalizedPath, defaultLang } from "@/i18n/ui";
import { getLocalizedServices } from "@/i18n/services";

describe("useTranslations", () => {
  it("returns Spanish text for es lang", () => {
    const t = useTranslations("es");
    expect(t("nav.services")).toBe("Servicios");
    expect(t("hero.headline")).toBe("Aprende, Crea, Transforma");
  });

  it("returns English text for en lang", () => {
    const t = useTranslations("en");
    expect(t("nav.services")).toBe("Services");
    expect(t("hero.headline")).toBe("Learn, Create, Transform");
  });

  it("falls back to default lang for missing keys", () => {
    const t = useTranslations("en");
    expect(t("meta.siteName")).toBe("Academia Bolaños");
  });
});

describe("getLangFromUrl", () => {
  it("returns es for root path", () => {
    const url = new URL("https://example.com/academia-bolanos/");
    expect(getLangFromUrl(url)).toBe(defaultLang);
  });

  it("returns en for /en/ path", () => {
    const url = new URL("https://example.com/academia-bolanos/en/");
    expect(getLangFromUrl(url)).toBe("en");
  });

  it("returns default for unknown lang", () => {
    const url = new URL("https://example.com/fr/about");
    expect(getLangFromUrl(url)).toBe(defaultLang);
  });
});

describe("getLocalizedPath", () => {
  it("returns path unchanged for default lang", () => {
    expect(getLocalizedPath("/", "es")).toBe("/");
    expect(getLocalizedPath("/services", "es")).toBe("/services");
  });

  it("prepends /en for English", () => {
    expect(getLocalizedPath("/", "en")).toBe("/en/");
    expect(getLocalizedPath("/services", "en")).toBe("/en/services");
  });
});

describe("getLocalizedServices", () => {
  it("returns 4 services for es", () => {
    const services = getLocalizedServices("es");
    expect(services).toHaveLength(4);
  });

  it("returns 4 services for en", () => {
    const services = getLocalizedServices("en");
    expect(services).toHaveLength(4);
  });

  it("guitar service has Spanish title in es", () => {
    const services = getLocalizedServices("es");
    const guitar = services.find((s) => s.id === "guitar");
    expect(guitar?.title).toBe("Guitarra");
  });

  it("guitar service has English title in en", () => {
    const services = getLocalizedServices("en");
    const guitar = services.find((s) => s.id === "guitar");
    expect(guitar?.title).toBe("Guitar");
  });

  it("each service has a waMessage", () => {
    const services = getLocalizedServices("es");
    for (const service of services) {
      expect(typeof service.waMessage).toBe("string");
      expect(service.waMessage.length).toBeGreaterThan(10);
    }
  });
});

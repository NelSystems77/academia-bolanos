import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const SITE_URL = "https://nelsystems77.github.io/academia-bolanos";

export default defineConfig({
  site: SITE_URL,
  base: "/academia-bolanos",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-CR",
          en: "en-US",
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    assets: "_astro",
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});

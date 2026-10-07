import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "nuxt-auth-utils"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  fonts: {
    families: [{ name: "Hanken Grotesk", provider: "google", weights: [400, 500, 600, 700, 800] }],
  },
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },
  image: {
    // Serve modern formats at the size each slot needs.
    format: ["avif", "webp"],
    quality: 72,
    domains: ["images.unsplash.com"],
    unsplash: {},
    screens: { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536, "2xl": 1920 },
  },
  // Server-only settings. Override in production with NUXT_* environment variables,
  // e.g. NUXT_ADMIN_PASSWORD, NUXT_RESEND_API_KEY, NUXT_DATA_DIR.
  runtimeConfig: {
    adminPassword: "",
    resendApiKey: "",
    resendAudienceId: "",
    mailFrom: "Illchamus Website <onboarding@resend.dev>",
    contactTo: "illchamus@gmail.com",
    dataDir: "",
    public: {
      // Canonical site address, e.g. https://illchamus.org (falls back to the request host).
      siteUrl: "",
    },
  },
  app: {
    head: {
      title: "Illchamus Community CBO - Preserving Culture & Empowering Community",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover" },
        { name: "theme-color", content: "#faf7f2" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" },
        { rel: "apple-touch-icon", href: "/logo.png" },
      ],
    },
  },
  routeRules: {
    "/admin": { ssr: false, headers: { "x-robots-tag": "noindex, nofollow" } },
    "/admin/**": { ssr: false, headers: { "x-robots-tag": "noindex, nofollow" } },
    "/videos/**": { headers: { "cache-control": "public, max-age=2592000" } },
    "/images/**": { headers: { "cache-control": "public, max-age=2592000" } },
  },
  nitro: {
    alias: {
      "#internal/nuxt/paths": fileURLToPath(
        new URL("./node_modules/nuxt/dist/core/runtime/nitro/utils/paths.js", import.meta.url)
      ),
    },
  },
});

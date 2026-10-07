import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "notivue/nuxt",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@nuxt/icon",
    "nuxt-auth-utils",
  ],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "notivue/notification.css",
    "notivue/animations.css",
  ],
  fonts: {
    families: [
      { name: "Hanken Grotesk", provider: "google", weights: [400, 500, 600, 700, 800] },
    ],
  },
  icon: {
    clientBundle: {
      scan: true,

      sizeLimitKb: 256,
    },
  },
  runtimeConfig: {
    oauth: {
      google: {
        clientId: "",
        clientSecret: "",
        redirectURL: process.env.GOOGLE_REDIRECT_URL,
      },
      facebook: {
        clientId: "",
        clientSecret: "",
      },
    },
    environment: process.env.ENVIROMENT,
  },
  app: {
    head: {
      title: "Illchamus Community CBO - Preserving Culture & Empowering Community",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover" },
        { name: "description", content: "Illchamus Community CBO is committed to protecting our heritage, supporting families, and building a brighter future in Baringo County, Kenya." },
        { name: "theme-color", content: "#faf7f2" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" }
      ],
    },
  },
  vite: {
    server: {
      allowedHosts: ["958d-105-160-105-173.ngrok-free.app"],
    },
  },
  notivue: {
    limit: 3,
    avoidDuplicates: true,
    notifications: {
      global: {
        duration: 5000,
      },
    },
  },
  nitro: {
    alias: {
      "#internal/nuxt/paths": fileURLToPath(
        new URL("./node_modules/nuxt/dist/core/runtime/nitro/utils/paths.js", import.meta.url)
      ),
    },
  },
});

import { defineNuxtPlugin } from "#app";
import { nextTick } from "vue";
import AOS from "aos";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
    });
    nuxtApp.hook("page:finish", () => {
      nextTick(() => AOS.refresh());
    });
  }
});

import type { H3Event } from "h3";

/** Canonical origin: NUXT_PUBLIC_SITE_URL when set, otherwise the request host. */
export const siteOrigin = (event: H3Event) =>
  (useRuntimeConfig().public.siteUrl || getRequestURL(event, { xForwardedHost: true, xForwardedProto: true }).origin).replace(/\/$/, "");

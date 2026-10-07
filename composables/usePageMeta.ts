const SITE_NAME = "Illchamus Community CBO";
const DEFAULT_IMAGE = "/images/og-image.jpg";

/** Canonical origin (NUXT_PUBLIC_SITE_URL, or the current host). */
export function useSiteOrigin() {
  const configured = useRuntimeConfig().public.siteUrl as string;
  return (configured || useRequestURL().origin).replace(/\/$/, "");
}

const absolute = (origin: string, url: string) => {
  // Share previews look best at 1200×630; Unsplash can crop to that on the fly.
  const unsplash = /images\.unsplash\.com\/photo-([\w-]+)/.exec(url);
  if (unsplash) return `https://images.unsplash.com/photo-${unsplash[1]}?auto=format&fit=crop&w=1200&h=630&q=75`;
  return /^https?:\/\//.test(url) ? url : `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
};

/**
 * Page title, description and the preview card shown when the page is shared
 * (WhatsApp, Facebook, X, LinkedIn). Values may be refs so they follow the language.
 */
export function usePageMeta(
  title: MaybeRefOrGetter<string>,
  description?: MaybeRefOrGetter<string | undefined>,
  options: { image?: MaybeRefOrGetter<string | undefined>; type?: "website" | "article" } = {}
) {
  const origin = useSiteOrigin();
  const route = useRoute();
  const { lang } = useLang();

  const fullTitle = computed(() => {
    const t = toValue(title);
    return t.includes(SITE_NAME) ? t : `${t} • ${SITE_NAME}`;
  });
  const image = computed(() => absolute(origin, toValue(options.image) || DEFAULT_IMAGE));
  const url = computed(() => `${origin}${route.path === "/" ? "" : route.path}` || origin);

  useSeoMeta({
    title: fullTitle,
    description: () => toValue(description),
    ogTitle: fullTitle,
    ogDescription: () => toValue(description),
    ogType: options.type || "website",
    ogUrl: url,
    ogImage: image,
    ogImageAlt: fullTitle,
    ogSiteName: SITE_NAME,
    ogLocale: () => (lang.value === "sw" ? "sw_KE" : "en_KE"),
    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: () => toValue(description),
    twitterImage: image,
  });
  useHead({ link: [{ rel: "canonical", href: url }] });
}

/** Adds a JSON-LD block (structured data for search engines). */
export function useJsonLd(data: MaybeRefOrGetter<Record<string, unknown>>) {
  useHead({
    script: [{ type: "application/ld+json", innerHTML: () => JSON.stringify(toValue(data)) }],
  });
}

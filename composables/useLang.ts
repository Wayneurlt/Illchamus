import en from "~/locales/en";
import sw from "~/locales/sw";

export type Lang = "en" | "sw";

const dictionaries = { en, sw } as const;

/**
 * Site language. The choice is stored in a cookie so server rendering uses it too
 * (no flash of the wrong language). `m` holds the current copy; `tx` picks the
 * Swahili version of admin-entered content when one exists.
 */
export function useLang() {
  const lang = useCookie<Lang>("lang", { default: () => "en", maxAge: 60 * 60 * 24 * 365, sameSite: "lax", path: "/" });
  const current = computed<Lang>(() => (lang.value === "sw" ? "sw" : "en"));
  const m = computed(() => dictionaries[current.value]);

  const setLang = (value: Lang) => {
    lang.value = value;
  };

  const tx = (english?: string, swahili?: string) => (current.value === "sw" && swahili?.trim() ? swahili : english || "");

  const dateLocale = computed(() => (current.value === "sw" ? "sw-KE" : "en-GB"));

  /** Format a YYYY-MM-DD date in the current language. */
  const fmtDate = (iso: string, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) => {
    const d = new Date(`${iso.slice(0, 10)}T00:00:00`);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString(dateLocale.value, options);
  };

  return { lang: current, m, setLang, tx, fmtDate, dateLocale };
}

/** Replace {name} placeholders in a message. */
export const fill = (message: string, values: Record<string, string | number>) =>
  message.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`));

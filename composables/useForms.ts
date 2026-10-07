type ErrorCode = keyof ReturnType<typeof useLang>["m"]["value"]["forms"]["errors"];

/** Turn an API error into a translated, human message. */
export function useFormError() {
  const { m } = useLang();
  return (error: unknown) => {
    const code = (error as { data?: { data?: { code?: string } } })?.data?.data?.code as ErrorCode | undefined;
    const messages = m.value.forms.errors;
    return (code && messages[code]) || messages.generic;
  };
}

/** Newsletter sign-up used by the footer and the shop's "notify me" form. */
export function useNewsletter(source: "footer" | "shop" | "donate") {
  const { lang } = useLang();
  const toMessage = useFormError();
  const email = ref("");
  const website = ref(""); // honeypot
  const sending = ref(false);
  const status = ref<"idle" | "ok" | "already" | "error">("idle");
  const error = ref("");

  const subscribe = async () => {
    if (!email.value.trim() || sending.value) return;
    sending.value = true;
    error.value = "";
    try {
      const res = await $fetch<{ ok: boolean; already?: boolean }>("/api/newsletter", {
        method: "POST",
        body: { email: email.value, source, lang: lang.value, website: website.value },
      });
      status.value = res.already ? "already" : "ok";
      email.value = "";
    } catch (e) {
      status.value = "error";
      error.value = toMessage(e);
    } finally {
      sending.value = false;
    }
  };

  return { email, website, sending, status, error, subscribe };
}

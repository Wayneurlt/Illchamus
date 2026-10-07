/** Contact form state and submission to /api/contact. */
export function useContactForm() {
  const { m } = useLang();
  const toMessage = useFormError();

  const blank = () => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
    website: "", // honeypot
  });
  const form = reactive(blank());

  const isSubmitting = ref(false);
  const feedback = ref("");
  const feedbackType = ref<"" | "success" | "error">("");

  const show = (text: string, type: "success" | "error") => {
    feedback.value = text;
    feedbackType.value = type;
  };

  /** Quick checks in the browser; the server validates again. */
  const validate = () => {
    const e = m.value.forms.errors;
    if (!form.firstName.trim() || !form.lastName.trim()) return e.name_required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) return e.email_invalid;
    if (!form.subject) return e.subject_required;
    if (form.message.trim().length < 10) return e.message_short;
    if (!form.consent) return e.consent_required;
    return "";
  };

  const submit = async () => {
    if (isSubmitting.value) return;
    const problem = validate();
    if (problem) return show(problem, "error");
    isSubmitting.value = true;
    feedback.value = "";
    try {
      await $fetch("/api/contact", { method: "POST", body: { ...form } });
      Object.assign(form, blank());
      show(m.value.contact.success, "success");
    } catch (error) {
      show(toMessage(error), "error");
    } finally {
      isSubmitting.value = false;
    }
  };

  return { form, isSubmitting, feedback, feedbackType, submit };
}

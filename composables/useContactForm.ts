export function useContactForm() {
  const form = reactive({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });

  const isSubmitting = ref(false);
  const feedback = ref("");
  const feedbackType = ref("");

  const showFeedback = (text: string, type: "success" | "error") => {
    feedback.value = text;
    feedbackType.value = type;
    setTimeout(() => {
      feedback.value = "";
      feedbackType.value = "";
    }, 5000);
  };

  const validate = () => {
    if (!form.firstName?.trim()) {
      showFeedback("Please enter your first name.", "error");
      return false;
    }
    if (!form.lastName?.trim()) {
      showFeedback("Please enter your last name.", "error");
      return false;
    }
    if (!form.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      showFeedback("Please enter a valid email.", "error");
      return false;
    }
    if (!form.subject) {
      showFeedback("Please select a subject.", "error");
      return false;
    }
    if (!form.message?.trim() || form.message.trim().length < 10) {
      showFeedback("Please enter a message (at least 10 characters).", "error");
      return false;
    }
    if (!form.consent) {
      showFeedback("Please agree to the terms and privacy policy.", "error");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    Object.assign(form, {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: false,
    });
  };

  const submit = async () => {
    if (!validate()) return;
    isSubmitting.value = true;
    feedback.value = "";
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      resetForm();
      showFeedback("Thank you! We'll get back to you within 24 hours.", "success");
    } catch {
      showFeedback("Something went wrong. Please try again.", "error");
    } finally {
      isSubmitting.value = false;
    }
  };

  return { form, isSubmitting, feedback, feedbackType, submit };
}

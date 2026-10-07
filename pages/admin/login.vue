<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-10">
    <form class="w-full max-w-sm rounded-[28px] bg-white border border-line p-8 shadow-[0_24px_60px_-30px_rgba(46,20,20,0.45)]" @submit.prevent="login">
      <div class="flex items-center gap-3">
        <LogoBadge class="w-20 h-20 shrink-0 rounded-full ring-1 ring-line" />
        <div class="leading-tight">
          <p class="font-extrabold text-ink">Illchamus Community</p>
          <p class="text-sm text-ink-soft">Website admin</p>
        </div>
      </div>
      <label for="password" class="field-label mt-8">Password</label>
      <input id="password" v-model="password" type="password" autocomplete="current-password" required class="field" autofocus />
      <p v-if="error" class="mt-3 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800" role="alert">{{ error }}</p>
      <button type="submit" class="btn btn-ink mt-6 w-full" :disabled="busy">{{ busy ? "Signing in…" : "Sign in" }}</button>
      <NuxtLink to="/" class="mt-5 block text-center text-sm font-semibold text-ink-soft hover:text-maroon">← Back to the website</NuxtLink>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "admin" });
useHead({ title: "Admin sign in • Illchamus Community CBO", meta: [{ name: "robots", content: "noindex" }] });

const route = useRoute();
const { fetch: refreshSession, loggedIn } = useUserSession();
const password = ref("");
const busy = ref(false);
const error = ref("");

const next = () => {
  const target = String(route.query.next || "/admin");
  return target.startsWith("/admin") ? target : "/admin";
};

onMounted(async () => {
  await refreshSession();
  if (loggedIn.value) navigateTo(next());
});

const MESSAGES: Record<string, string> = {
  wrong_password: "That password isn't right.",
  rate_limited: "Too many attempts. Please wait 15 minutes.",
  admin_not_configured: "Admin is not set up yet: set NUXT_ADMIN_PASSWORD on the server.",
};

const login = async () => {
  busy.value = true;
  error.value = "";
  try {
    await $fetch("/api/admin/login", { method: "POST", body: { password: password.value } });
    await refreshSession();
    await navigateTo(next());
  } catch (e: any) {
    error.value = MESSAGES[e?.data?.data?.code] || "Could not sign in. Please try again.";
  } finally {
    busy.value = false;
  }
};
</script>

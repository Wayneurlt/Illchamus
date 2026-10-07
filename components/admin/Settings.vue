<template>
  <div class="grid grid-cols-1 gap-6 @4xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
    <!-- Change password -->
    <form class="card" @submit.prevent="submit">
      <div class="flex items-center gap-3">
        <span class="icon-tile bg-sun-soft text-maroon"><Icon name="heroicons:key" class="h-5 w-5" /></span>
        <div>
          <h2 class="text-xl font-bold tracking-tight text-ink">Change admin password</h2>
          <p class="text-sm text-ink-soft">Everyone who uses the admin shares this password.</p>
        </div>
      </div>

      <div class="mt-6 space-y-5">
        <div>
          <label for="pw-current" class="field-label">Current password</label>
          <input id="pw-current" v-model="current" :type="show ? 'text' : 'password'" autocomplete="current-password" required class="field" />
        </div>
        <div>
          <label for="pw-new" class="field-label">New password</label>
          <input id="pw-new" v-model="next" :type="show ? 'text' : 'password'" autocomplete="new-password" required :minlength="min" class="field" />
          <ul class="mt-2 space-y-1 text-sm">
            <li v-for="rule in rules" :key="rule.label" class="flex items-center gap-2" :class="rule.ok ? 'text-leaf' : 'text-ink-soft'">
              <Icon :name="rule.ok ? 'heroicons:check-circle-solid' : 'heroicons:minus-circle'" class="h-4 w-4 shrink-0" />
              {{ rule.label }}
            </li>
          </ul>
        </div>
        <div>
          <label for="pw-confirm" class="field-label">Repeat new password</label>
          <input id="pw-confirm" v-model="confirm" :type="show ? 'text' : 'password'" autocomplete="new-password" required class="field" />
          <p v-if="confirm && confirm !== next" class="mt-1.5 text-sm font-medium text-red-700">The two new passwords don't match.</p>
        </div>
        <label class="inline-flex items-center gap-2.5 text-sm font-semibold text-ink cursor-pointer">
          <input v-model="show" type="checkbox" class="h-5 w-5 accent-maroon" />
          Show passwords
        </label>
      </div>

      <p v-if="error" class="mt-5 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800" role="alert">{{ error }}</p>
      <p v-if="done" class="mt-5 rounded-xl bg-leaf-soft p-3 text-sm font-medium text-leaf" role="status">
        Password changed. Any other devices that were signed in have been signed out.
      </p>
      <button type="submit" class="btn btn-ink mt-6" :disabled="!canSubmit || busy">
        <Icon v-if="busy" name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
        {{ busy ? "Saving…" : "Change password" }}
      </button>
    </form>

    <div class="space-y-6">
      <!-- Password status -->
      <section class="card">
        <div class="flex items-center gap-3">
          <span class="icon-tile bg-lake-soft text-[#24647c]"><Icon name="heroicons:shield-check" class="h-5 w-5" /></span>
          <h2 class="text-lg font-bold tracking-tight text-ink">Password status</h2>
        </div>
        <p v-if="status?.passwordSource === 'custom'" class="mt-4 text-[15px] text-ink-soft">
          A custom password is in use. It was last changed on <b class="text-ink">{{ changedLabel }}</b>.
        </p>
        <p v-else class="mt-4 text-[15px] text-ink-soft">
          The admin is using the starting password from <code>NUXT_ADMIN_PASSWORD</code>. Changing it here replaces it.
        </p>
      </section>

      <!-- Recovery -->
      <section class="card">
        <div class="flex items-center gap-3">
          <span class="icon-tile bg-paper text-ink"><Icon name="heroicons:lifebuoy" class="h-5 w-5" /></span>
          <h2 class="text-lg font-bold tracking-tight text-ink">Forgot the password?</h2>
        </div>
        <p class="mt-4 text-[15px] text-ink-soft">
          Whoever manages the website can put a new password in <code>NUXT_ADMIN_PASSWORD</code> and run
          <code>npm run admin:reset-password</code>. That replaces the saved password and signs everyone out.
        </p>
      </section>

      <!-- Email -->
      <section class="card">
        <div class="flex items-center gap-3">
          <span class="icon-tile" :class="mailHealthy ? 'bg-leaf-soft text-leaf' : 'bg-sun-soft text-maroon'">
            <Icon :name="mailHealthy ? 'heroicons:envelope' : 'heroicons:exclamation-triangle'" class="h-5 w-5" />
          </span>
          <h2 class="text-lg font-bold tracking-tight text-ink">Email delivery</h2>
        </div>
        <p class="mt-4 text-[15px] text-ink-soft">
          <template v-if="status?.mail">
            Messages and pledges are sent to <b class="text-ink">{{ status.contactTo }}</b>.
            <template v-if="status.audience">New subscribers are also added to your Resend audience.</template>
          </template>
          <template v-else>
            Not set up yet. Messages are saved here but not emailed to {{ status?.contactTo }}. Add <code>NUXT_RESEND_API_KEY</code> on the server to turn emails on.
          </template>
        </p>
        <div v-if="status?.lastMail && !status.lastMail.ok" class="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800" role="alert">
          <b>The last email failed</b> ({{ new Date(status.lastMail.at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) }}).
          Messages are still saved here.<br />
          <span class="text-red-700">Reason from Resend: {{ status.lastMail.error }}</span>
        </div>
        <div v-if="status?.mail" class="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" class="btn btn-outline btn-sm" :disabled="testing" @click="sendTest">
            <Icon :name="testing ? 'heroicons:arrow-path' : 'heroicons:paper-airplane'" class="h-4 w-4" :class="testing ? 'animate-spin' : ''" />
            {{ testing ? "Sending…" : "Send test email" }}
          </button>
          <span v-if="testResult" class="text-sm font-semibold" :class="testResult.ok ? 'text-leaf' : 'text-red-700'" role="status">
            {{ testResult.ok ? `Sent. Check ${status.contactTo}.` : "Failed. See the reason above." }}
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: {
    mail: boolean;
    audience: boolean;
    contactTo: string;
    passwordSource: "custom" | "server";
    passwordChangedAt: string | null;
    minPasswordLength: number;
    impactUpdatedAt?: string | null;
    lastMail?: { ok: boolean; error?: string; at: string } | null;
  } | null;
}>();
const emit = defineEmits<{ changed: [] }>();

const mailHealthy = computed(() => !!props.status?.mail && props.status.lastMail?.ok !== false);
const testing = ref(false);
const testResult = ref<{ ok: boolean } | null>(null);
const sendTest = async () => {
  testing.value = true;
  testResult.value = null;
  try {
    testResult.value = await $fetch<{ ok: boolean }>("/api/admin/test-email", { method: "POST" });
  } catch (e) {
    testResult.value = { ok: false };
  } finally {
    testing.value = false;
    emit("changed"); // reload status so the latest result shows
  }
};

const current = ref("");
const next = ref("");
const confirm = ref("");
const show = ref(false);
const busy = ref(false);
const error = ref("");
const done = ref(false);

const min = computed(() => props.status?.minPasswordLength || 10);
const rules = computed(() => [
  { label: `At least ${min.value} characters`, ok: next.value.length >= min.value },
  { label: "Different from the current password", ok: !!next.value && next.value !== current.value },
  { label: "Mix of words, numbers or symbols (recommended)", ok: /\d|[^\w\s]/.test(next.value) && /[a-z]/i.test(next.value) },
]);
const canSubmit = computed(() => !!current.value && next.value.length >= min.value && next.value === confirm.value && next.value !== current.value);

const changedLabel = computed(() =>
  props.status?.passwordChangedAt ? new Date(props.status.passwordChangedAt).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" }) : ""
);

const submit = async () => {
  if (!canSubmit.value) return;
  busy.value = true;
  error.value = "";
  done.value = false;
  try {
    await $fetch("/api/admin/password", { method: "POST", body: { current: current.value, next: next.value } });
    current.value = next.value = confirm.value = "";
    done.value = true;
    emit("changed");
  } catch (e) {
    error.value = adminError(e);
  } finally {
    busy.value = false;
  }
};
</script>

<style scoped>
.card {
  border-radius: 24px;
  border: 1px solid var(--color-line);
  background: #fff;
  padding: 1.5rem;
}
@media (min-width: 640px) {
  .card {
    padding: 2rem;
  }
}
.icon-tile {
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
code {
  font-size: 0.85em;
  background: var(--color-paper);
  padding: 0.1em 0.35em;
  border-radius: 0.35em;
  color: var(--color-ink);
}
</style>

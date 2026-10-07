<template>
  <div v-if="!ready" class="rounded-[22px] bg-white border border-line p-10 text-center text-ink-soft">
    <Icon name="heroicons:arrow-path" class="inline h-5 w-5 animate-spin mr-2 align-[-4px]" />Loading…
    <p v-if="error" class="mt-3 text-sm font-medium text-red-700">{{ error }}</p>
  </div>
  <form v-else class="space-y-6" @submit.prevent="save">
    <p class="rounded-2xl bg-lake-soft p-4 text-sm text-[#24647c]">
      These figures appear on the home page, the About page and in each program's details.
      <template v-if="updatedAt">Last saved {{ new Date(updatedAt).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" }) }}.</template>
      <template v-else><b>Not confirmed yet</b>: the website is showing the starting figures. Check them and press Save.</template>
    </p>

    <!-- Headline figures -->
    <section class="panel">
      <h2 class="panel-title">Headline figures</h2>
      <p class="mt-1 text-sm text-ink-soft">The four numbers in the yellow "impact" band. Type the number only; put symbols such as <b>$</b> in "Before" and <b>+</b> or <b>K+</b> in "After". Leave them empty if not needed.</p>
      <div class="mt-5 grid grid-cols-1 gap-4 @3xl:grid-cols-2">
        <fieldset v-for="(stat, i) in form.stats" :key="i" class="rounded-2xl border border-line p-4 sm:p-5">
          <legend class="px-1 text-xs font-bold uppercase tracking-wider text-ink-soft">Figure {{ i + 1 }}</legend>
          <p class="text-3xl font-extrabold tracking-tight text-ink tabular-nums" aria-live="polite">{{ formatStat(stat) }}</p>
          <div class="mt-3 grid grid-cols-[4.5rem_minmax(0,1fr)_4.5rem] gap-2">
            <div>
              <label :for="`s${i}-pre`" class="field-label text-xs">Before</label>
              <input :id="`s${i}-pre`" v-model="stat.prefix" maxlength="4" class="field text-center" />
            </div>
            <div>
              <label :for="`s${i}-val`" class="field-label text-xs">Number *</label>
              <input :id="`s${i}-val`" v-model.number="stat.value" type="number" min="0" step="1" required class="field" />
            </div>
            <div>
              <label :for="`s${i}-suf`" class="field-label text-xs">After</label>
              <input :id="`s${i}-suf`" v-model="stat.suffix" maxlength="4" class="field text-center" />
            </div>
          </div>
          <div class="mt-3 grid grid-cols-1 gap-3">
            <div>
              <label :for="`s${i}-en`" class="field-label text-xs">Label (English) *</label>
              <input :id="`s${i}-en`" v-model="stat.label.en" maxlength="80" required class="field" />
            </div>
            <div>
              <label :for="`s${i}-sw`" class="field-label text-xs">Label (Kiswahili)</label>
              <input :id="`s${i}-sw`" v-model="stat.label.sw" maxlength="80" class="field" />
            </div>
          </div>
        </fieldset>
      </div>
    </section>

    <!-- Program figures -->
    <section class="panel">
      <h2 class="panel-title">Program figures</h2>
      <p class="mt-1 text-sm text-ink-soft">Shown when a visitor opens a program on the home page.</p>
      <div class="mt-5 space-y-4">
        <fieldset v-for="id in PROGRAM_IDS" :key="id" class="rounded-2xl border border-line p-4 sm:p-5">
          <legend class="px-1 font-bold text-ink">{{ en.programs[id].title }}</legend>
          <div class="grid grid-cols-1 gap-3 @2xl:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <label :for="`${id}-p`" class="field-label text-xs">Participants</label>
              <input :id="`${id}-p`" v-model="form.programs[id].participants" maxlength="20" class="field" placeholder="e.g. 350+" />
            </div>
            <div class="space-y-2">
              <label :for="`${id}-d`" class="field-label text-xs">Duration (English / Kiswahili)</label>
              <input :id="`${id}-d`" v-model="form.programs[id].duration.en" maxlength="40" class="field" placeholder="e.g. Ongoing" />
              <input v-model="form.programs[id].duration.sw" maxlength="40" class="field" placeholder="mf. Inaendelea" aria-label="Duration in Kiswahili" />
            </div>
            <div class="space-y-2">
              <label :for="`${id}-i`" class="field-label text-xs">Impact (English / Kiswahili)</label>
              <input :id="`${id}-i`" v-model="form.programs[id].impact.en" maxlength="60" class="field" />
              <input v-model="form.programs[id].impact.sw" maxlength="60" class="field" aria-label="Impact in Kiswahili" />
            </div>
          </div>
        </fieldset>
      </div>
    </section>

    <div class="sticky bottom-0 -mx-1 rounded-2xl border border-line bg-white/95 backdrop-blur p-4 flex flex-wrap items-center gap-3">
      <p v-if="error" class="w-full rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800" role="alert">{{ error }}</p>
      <p v-if="saved" class="mr-auto text-sm font-semibold text-leaf" role="status">
        <Icon name="heroicons:check-circle-solid" class="inline h-5 w-5 align-[-5px]" /> Saved. The website now shows these figures.
      </p>
      <button type="button" class="btn btn-outline btn-sm ml-auto" @click="resetForm">Undo changes</button>
      <button type="submit" class="btn btn-ink btn-sm" :disabled="busy">
        <Icon v-if="busy" name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
        {{ busy ? "Saving…" : "Save figures" }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import en from "~/locales/en";
import { formatStat, PROGRAM_IDS, type ImpactData } from "~/data/impact";

const emit = defineEmits<{ saved: [] }>();

const updatedAt = ref<string | null>(null);
const form = reactive<Omit<ImpactData, "updatedAt">>({ stats: [], programs: {} as ImpactData["programs"] });
let original: ImpactData | null = null;

const fill = (data: ImpactData) => {
  original = JSON.parse(JSON.stringify(data));
  form.stats = JSON.parse(JSON.stringify(data.stats));
  form.programs = JSON.parse(JSON.stringify(data.programs));
  updatedAt.value = data.updatedAt;
};
const resetForm = () => original && fill(original);

const ready = ref(false);
const busy = ref(false);
const error = ref("");

// Always load fresh from the server (not the cached public copy).
onMounted(async () => {
  try {
    fill(await $fetch<ImpactData>("/api/impact"));
    ready.value = true;
  } catch (e) {
    error.value = adminError(e);
  }
});
const saved = ref(false);

const save = async () => {
  busy.value = true;
  error.value = "";
  saved.value = false;
  try {
    fill(await $fetch<ImpactData>("/api/admin/impact", { method: "PUT", body: { stats: form.stats, programs: form.programs } }));
    saved.value = true;
    // Refresh the public copy used by the site in this browser session.
    await refreshNuxtData("impact");
    emit("saved");
  } catch (e) {
    error.value = adminError(e);
  } finally {
    busy.value = false;
  }
};
</script>

<style scoped>
.panel {
  border-radius: 22px;
  border: 1px solid var(--color-line);
  background: #fff;
  padding: 1.25rem;
}
@media (min-width: 640px) {
  .panel {
    padding: 1.5rem;
  }
}
.panel-title {
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--color-ink);
}
</style>

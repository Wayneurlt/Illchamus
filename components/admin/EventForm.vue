<template>
  <form class="space-y-6" @submit.prevent="save">
    <AdminLangTabs v-model="tab" />

    <template v-if="tab === 'en'">
      <div>
        <label for="e-title" class="field-label">Event name *</label>
        <input id="e-title" v-model="form.title" type="text" required maxlength="200" class="field" placeholder="e.g. Cultural Heritage Festival" />
      </div>
      <div>
        <label for="e-desc" class="field-label">Description</label>
        <textarea id="e-desc" v-model="form.description" rows="5" maxlength="5000" class="field" placeholder="What's happening, who it's for, what to bring…" />
      </div>
    </template>
    <template v-else>
      <p class="rounded-2xl bg-lake-soft p-4 text-sm text-[#24647c]">Optional. Anything left empty shows in English.</p>
      <div>
        <label for="e-title-sw" class="field-label">Jina la tukio (name)</label>
        <input id="e-title-sw" v-model="form.titleSw" type="text" maxlength="200" class="field" />
      </div>
      <div>
        <label for="e-desc-sw" class="field-label">Maelezo (description)</label>
        <textarea id="e-desc-sw" v-model="form.descriptionSw" rows="5" maxlength="5000" class="field" />
      </div>
    </template>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label for="e-date" class="field-label">Date *</label>
        <input id="e-date" v-model="form.date" type="date" required class="field" />
      </div>
      <div>
        <label for="e-end" class="field-label">End date <span class="font-normal text-ink-soft">(multi-day events)</span></label>
        <input id="e-end" v-model="form.endDate" type="date" :min="form.date" class="field" />
      </div>
      <div>
        <label for="e-start" class="field-label">Start time <span class="font-normal text-ink-soft">(empty = all day)</span></label>
        <input id="e-start" v-model="form.startTime" type="time" class="field" />
      </div>
      <div>
        <label for="e-endtime" class="field-label">End time</label>
        <input id="e-endtime" v-model="form.endTime" type="time" class="field" :disabled="!form.startTime" />
      </div>
      <div>
        <label for="e-loc" class="field-label">Location</label>
        <input id="e-loc" v-model="form.location" type="text" maxlength="200" class="field" placeholder="e.g. Kampi ya Samaki, Lake Baringo" />
      </div>
      <div>
        <label for="e-cat" class="field-label">Category</label>
        <input id="e-cat" v-model="form.category" type="text" maxlength="40" list="event-cats" class="field" placeholder="e.g. Festival" />
        <datalist id="event-cats">
          <option v-for="c in ['Festival', 'Community day', 'Workshop', 'Clean-up', 'Meeting', 'Fundraiser']" :key="c" :value="c" />
        </datalist>
      </div>
    </div>
    <p class="text-xs text-ink-soft -mt-3">Times are Kenya time (EAT).</p>

    <AdminImageField v-model="form.image" label="Event photo (optional)" />

    <AdminFormFooter v-model:published="form.published" :busy="busy" :error="error" @cancel="$emit('cancel')" />
  </form>
</template>

<script setup lang="ts">
import type { SiteEvent } from "~/composables/useContent";

const props = defineProps<{ item?: SiteEvent | null }>();
const emit = defineEmits<{ saved: [event: SiteEvent]; cancel: [] }>();

const tab = ref<"en" | "sw">("en");
const form = reactive({
  id: props.item?.id || "",
  title: props.item?.title || "",
  titleSw: props.item?.titleSw || "",
  description: props.item?.description || "",
  descriptionSw: props.item?.descriptionSw || "",
  date: props.item?.date || todayInKenya(),
  endDate: props.item?.endDate || "",
  startTime: props.item?.startTime || "",
  endTime: props.item?.endTime || "",
  location: props.item?.location || "",
  category: props.item?.category || "",
  image: props.item?.image || "",
  published: props.item?.published ?? true,
});
watch(
  () => form.startTime,
  (v) => {
    if (!v) form.endTime = "";
  }
);

const { save: saveItem } = useAdminApi();
const busy = ref(false);
const error = ref("");

const save = async () => {
  busy.value = true;
  error.value = "";
  try {
    emit("saved", await saveItem<SiteEvent>("events", { ...form }));
  } catch (e) {
    error.value = adminError(e);
  } finally {
    busy.value = false;
  }
};
</script>

<template>
  <form class="space-y-6" @submit.prevent="save">
    <AdminLangTabs v-model="tab" />

    <template v-if="tab === 'en'">
      <div>
        <label for="p-title" class="field-label">Title *</label>
        <input id="p-title" v-model="form.title" type="text" required maxlength="200" class="field" placeholder="e.g. Scholarship Drive Launch" />
      </div>
      <div>
        <label for="p-excerpt" class="field-label">Short summary</label>
        <textarea id="p-excerpt" v-model="form.excerpt" rows="2" maxlength="400" class="field" placeholder="One or two sentences shown on news cards and when the link is shared." />
      </div>
      <AdminMarkdownField id="p-body" v-model="form.body" label="Story" placeholder="Write the story here…" />
    </template>
    <template v-else>
      <p class="rounded-2xl bg-lake-soft p-4 text-sm text-[#24647c]">
        Optional. Swahili visitors see these versions; anything left empty shows in English.
      </p>
      <div>
        <label for="p-title-sw" class="field-label">Kichwa (title)</label>
        <input id="p-title-sw" v-model="form.titleSw" type="text" maxlength="200" class="field" />
      </div>
      <div>
        <label for="p-excerpt-sw" class="field-label">Muhtasari (summary)</label>
        <textarea id="p-excerpt-sw" v-model="form.excerptSw" rows="2" maxlength="400" class="field" />
      </div>
      <AdminMarkdownField id="p-body-sw" v-model="form.bodySw" label="Hadithi (story)" />
    </template>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label for="p-date" class="field-label">Date *</label>
        <input id="p-date" v-model="form.date" type="date" required class="field" />
      </div>
      <div>
        <label for="p-tag" class="field-label">Category</label>
        <input id="p-tag" v-model="form.tag" type="text" maxlength="40" list="post-tags" class="field" placeholder="e.g. Education" />
        <datalist id="post-tags">
          <option v-for="tag in tags" :key="tag" :value="tag" />
        </datalist>
      </div>
    </div>

    <AdminImageField v-model="form.image" label="Cover photo" />

    <details class="rounded-2xl border border-line bg-paper p-4">
      <summary class="cursor-pointer text-sm font-bold text-ink">Web address</summary>
      <label for="p-slug" class="field-label mt-3">/blog/…</label>
      <input id="p-slug" v-model="form.slug" type="text" maxlength="80" class="field" :placeholder="autoSlug || 'made from the title'" />
      <p class="mt-1.5 text-xs text-ink-soft">Lowercase letters, numbers and dashes. Leave empty to create it from the title.</p>
    </details>

    <AdminFormFooter v-model:published="form.published" :busy="busy" :error="error" @cancel="$emit('cancel')" />
  </form>
</template>

<script setup lang="ts">
import type { Post } from "~/composables/useContent";

const props = defineProps<{ item?: Post | null; tags: string[] }>();
const emit = defineEmits<{ saved: [post: Post]; cancel: [] }>();

const tab = ref<"en" | "sw">("en");
const form = reactive({
  title: props.item?.title || "",
  titleSw: props.item?.titleSw || "",
  excerpt: props.item?.excerpt || "",
  excerptSw: props.item?.excerptSw || "",
  body: props.item?.body || "",
  bodySw: props.item?.bodySw || "",
  date: props.item?.date || todayInKenya(),
  tag: props.item?.tag || "",
  image: props.item?.image || "",
  slug: props.item?.slug || "",
  published: props.item?.published ?? true,
});

const autoSlug = computed(() =>
  form.title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
);

const { save: saveItem } = useAdminApi();
const busy = ref(false);
const error = ref("");

const save = async () => {
  busy.value = true;
  error.value = "";
  try {
    const saved = await saveItem<Post>("posts", { ...form, slug: form.slug.trim() || autoSlug.value, originalSlug: props.item?.slug });
    emit("saved", saved);
  } catch (e) {
    error.value = adminError(e);
  } finally {
    busy.value = false;
  }
};
</script>

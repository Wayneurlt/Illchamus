<template>
  <div>
    <div class="flex items-center justify-between gap-2">
      <label :for="id" class="field-label mb-0">{{ label }}</label>
      <button type="button" class="text-sm font-bold text-maroon hover:underline" @click="preview = !preview">
        {{ preview ? "Edit" : "Preview" }}
      </button>
    </div>
    <div class="mt-1.5 rounded-[0.875rem] border-[1.5px] border-line bg-white overflow-hidden focus-within:border-lake">
      <div v-if="!preview" class="flex flex-wrap gap-0.5 border-b border-line bg-paper px-2 py-1.5">
        <button v-for="tool in tools" :key="tool.label" type="button" class="tool" :title="tool.label" :aria-label="tool.label" @click="tool.run">
          <Icon :name="tool.icon" class="h-[18px] w-[18px]" />
        </button>
        <label class="tool cursor-pointer" title="Insert photo" aria-label="Insert photo">
          <Icon :name="uploading ? 'heroicons:arrow-path' : 'heroicons:photo'" class="h-[18px] w-[18px]" :class="uploading ? 'animate-spin' : ''" />
          <input type="file" accept="image/jpeg,image/png,image/webp" class="sr-only" @change="insertPhoto" />
        </label>
      </div>
      <textarea
        v-show="!preview"
        :id="id"
        ref="area"
        :value="modelValue"
        :rows="rows || 14"
        class="block w-full resize-y px-4 py-3 text-base leading-relaxed text-ink outline-none"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      />
      <div v-if="preview" class="article min-h-[12rem] px-5 py-4" v-html="renderMarkdown(modelValue) || '<p><em>Nothing written yet.</em></p>'" />
    </div>
    <p class="mt-1.5 text-xs text-ink-soft">
      Leave an empty line between paragraphs. Use the buttons for headings, bold text, links, lists and photos.
    </p>
    <p v-if="error" class="mt-1 text-sm font-medium text-red-700">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string; label: string; id: string; placeholder?: string; rows?: number }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const area = ref<HTMLTextAreaElement | null>(null);
const preview = ref(false);
const uploading = ref(false);
const error = ref("");

/** Wrap the selection (or insert a placeholder) with before/after text. */
function wrap(before: string, after = "", placeholder = "text") {
  const el = area.value;
  if (!el) return;
  const { selectionStart: s, selectionEnd: e } = el;
  const value = props.modelValue || "";
  const selected = value.slice(s, e) || placeholder;
  emit("update:modelValue", value.slice(0, s) + before + selected + after + value.slice(e));
  nextTick(() => {
    el.focus();
    el.setSelectionRange(s + before.length, s + before.length + selected.length);
  });
}

/** Prefix each selected line, starting a new paragraph if needed. */
function prefixLines(make: (i: number) => string, placeholder: string) {
  const el = area.value;
  if (!el) return;
  const value = props.modelValue || "";
  const { selectionStart: s, selectionEnd: e } = el;
  const lineStart = value.lastIndexOf("\n", s - 1) + 1;
  const chunk = value.slice(lineStart, e) || placeholder;
  const replaced = chunk
    .split("\n")
    .map((line, i) => make(i) + line.replace(/^(#{2,3}\s|[-*]\s|\d+[.)]\s|>\s?)/, ""))
    .join("\n");
  const lead = lineStart > 0 && value[lineStart - 2] !== "\n" ? "\n" : "";
  emit("update:modelValue", value.slice(0, lineStart) + lead + replaced + value.slice(e));
  nextTick(() => el.focus());
}

const tools = [
  { label: "Heading", icon: "heroicons:h1", run: () => prefixLines(() => "## ", "Heading") },
  { label: "Sub-heading", icon: "heroicons:h2", run: () => prefixLines(() => "### ", "Sub-heading") },
  { label: "Bold", icon: "heroicons:bold", run: () => wrap("**", "**", "bold text") },
  { label: "Italic", icon: "heroicons:italic", run: () => wrap("*", "*", "italic text") },
  {
    label: "Link",
    icon: "heroicons:link",
    run: () => {
      const url = window.prompt("Link address (starting with https://)", "https://");
      if (url && url !== "https://") wrap("[", `](${url.trim()})`, "link text");
    },
  },
  { label: "Bulleted list", icon: "heroicons:list-bullet", run: () => prefixLines(() => "- ", "List item") },
  { label: "Numbered list", icon: "heroicons:numbered-list", run: () => prefixLines((i) => `${i + 1}. `, "List item") },
  { label: "Quote", icon: "mdi:format-quote-open", run: () => prefixLines(() => "> ", "Quote") },
];

async function insertPhoto(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;
  uploading.value = true;
  error.value = "";
  try {
    const url = await uploadImage(file);
    const caption = window.prompt("Photo caption (optional)", "") || "";
    const value = props.modelValue || "";
    const pos = area.value?.selectionEnd ?? value.length;
    emit("update:modelValue", `${value.slice(0, pos).trimEnd()}\n\n![${caption}](${url})\n\n${value.slice(pos).trimStart()}`.trim());
  } catch (e) {
    error.value = adminError(e);
  } finally {
    uploading.value = false;
  }
}
</script>

<style scoped>
.tool {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-ink-soft);
}
.tool:hover {
  background: #fff;
  color: var(--color-maroon);
}
</style>

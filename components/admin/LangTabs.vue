<template>
  <div class="inline-flex rounded-full bg-paper p-1 ring-1 ring-line" role="tablist" aria-label="Language">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      role="tab"
      :aria-selected="modelValue === option.value"
      class="rounded-full px-4 py-2 text-sm font-bold transition-colors"
      :class="modelValue === option.value ? 'bg-maroon text-white' : 'text-ink-soft hover:text-ink'"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: "en" | "sw" }>();
defineEmits<{ "update:modelValue": [value: "en" | "sw"] }>();
const options = [
  { value: "en" as const, label: "English" },
  { value: "sw" as const, label: "Kiswahili (optional)" },
];
</script>

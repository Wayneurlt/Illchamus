<template>
  <div class="sticky bottom-0 -mx-6 sm:-mx-8 border-t border-line bg-white/95 backdrop-blur px-6 sm:px-8 py-4">
    <p v-if="error" class="mb-3 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800" role="alert">{{ error }}</p>
    <div class="flex flex-wrap items-center gap-3">
      <label class="inline-flex items-center gap-2.5 text-sm font-semibold text-ink mr-auto cursor-pointer">
        <input type="checkbox" class="h-5 w-5 accent-maroon" :checked="published" @change="$emit('update:published', ($event.target as HTMLInputElement).checked)" />
        Show on the website
      </label>
      <button type="button" class="btn btn-outline btn-sm" @click="$emit('cancel')">Cancel</button>
      <button type="submit" class="btn btn-ink btn-sm" :disabled="busy">
        <Icon v-if="busy" name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
        {{ busy ? "Saving…" : "Save" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ published: boolean; busy: boolean; error: string }>();
defineEmits<{ "update:published": [value: boolean]; cancel: [] }>();
</script>

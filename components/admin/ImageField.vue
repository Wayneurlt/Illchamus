<template>
  <div>
    <span class="field-label">{{ label }}</span>
    <div class="flex flex-col sm:flex-row gap-4 sm:items-center">
      <div class="relative w-full sm:w-40 shrink-0 overflow-hidden rounded-2xl bg-paper border border-line" :class="round ? 'aspect-square sm:w-32' : 'aspect-[16/10]'">
        <img v-if="modelValue" :src="modelValue" alt="" class="absolute inset-0 w-full h-full object-cover" />
        <div v-else class="absolute inset-0 flex items-center justify-center text-ink-soft/60">
          <Icon name="heroicons:photo" class="h-8 w-8" />
        </div>
        <div v-if="busy" class="absolute inset-0 bg-white/70 flex items-center justify-center">
          <Icon name="heroicons:arrow-path" class="h-6 w-6 animate-spin text-maroon" />
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex flex-wrap gap-2">
          <label class="btn btn-outline btn-sm cursor-pointer">
            <Icon name="heroicons:arrow-up-tray" class="h-4 w-4" />
            {{ modelValue ? "Change photo" : "Upload photo" }}
            <input type="file" accept="image/jpeg,image/png,image/webp" class="sr-only" @change="pick" />
          </label>
          <button v-if="modelValue" type="button" class="btn btn-sm text-red-700 hover:bg-red-50" @click="$emit('update:modelValue', '')">Remove</button>
        </div>
        <p class="text-xs text-ink-soft">{{ hint || "JPG, PNG or WebP. Large photos are resized automatically." }}</p>
        <p v-if="error" class="text-sm font-medium text-red-700">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue?: string; label: string; hint?: string; round?: boolean }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const busy = ref(false);
const error = ref("");

const pick = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;
  busy.value = true;
  error.value = "";
  try {
    emit("update:modelValue", await uploadImage(file));
  } catch (e) {
    error.value = e instanceof Error && !("data" in e) ? e.message : adminError(e);
  } finally {
    busy.value = false;
  }
};
</script>

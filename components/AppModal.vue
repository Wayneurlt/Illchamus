<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-6 bg-ink/60 backdrop-blur-sm"
        @click.self="close"
      >
        <div
          ref="panel"
          class="relative w-full sm:max-w-2xl max-h-[92svh] overflow-y-auto overscroll-contain bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl"
          role="dialog"
          aria-modal="true"
          :aria-label="label"
          tabindex="-1"
        >
          <button
            type="button"
            class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 text-ink flex items-center justify-center shadow-md hover:bg-sun-soft transition-colors"
            :aria-label="m.common.close"
            @click="close"
          >
            <Icon name="heroicons:x-mark" class="h-5 w-5" />
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean; label?: string }>();
const emit = defineEmits<{ close: [] }>();
const { m } = useLang();

const panel = ref<HTMLElement | null>(null);
let previousFocus: HTMLElement | null = null;

const close = () => emit("close");

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") close();
};

watch(
  () => props.open,
  (open) => {
    if (!import.meta.client) return;
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      previousFocus = document.activeElement as HTMLElement | null;
      document.addEventListener("keydown", onKeydown);
      nextTick(() => panel.value?.focus());
    } else {
      document.removeEventListener("keydown", onKeydown);
      previousFocus?.focus?.();
    }
  }
);

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  if (props.open) document.documentElement.style.overflow = "";
});
</script>

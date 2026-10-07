<template>
  <div
    class="inline-flex items-center rounded-full p-0.5 text-xs font-bold"
    :class="dark ? 'bg-white/10' : 'bg-white ring-1 ring-line'"
    role="group"
    :aria-label="m.lang.label"
  >
    <button
      v-for="code in codes"
      :key="code"
      type="button"
      class="rounded-full px-2.5 py-1 transition-colors"
      :class="
        lang === code
          ? dark
            ? 'bg-sun text-ink'
            : 'bg-maroon text-white'
          : dark
            ? 'text-white/80 hover:text-white'
            : 'text-ink-soft hover:text-ink'
      "
      :aria-pressed="lang === code"
      :title="m.lang[code]"
      :lang="code"
      @click="setLang(code)"
    >
      {{ m.lang.short[code] }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Lang } from "~/composables/useLang";

defineProps<{ dark?: boolean }>();
const { lang, m, setLang } = useLang();
const codes: Lang[] = ["en", "sw"];
</script>

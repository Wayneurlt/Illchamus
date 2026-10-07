<template>
  <svg viewBox="0 0 200 200" class="block" role="img" :aria-label="label">
    <circle cx="100" cy="100" r="100" fill="#fff" />
    <circle v-if="!compact" cx="100" cy="100" r="93" fill="none" stroke="var(--color-sun)" stroke-width="2.5" />
    <defs>
      <!-- Semicircle over the top for the curved name (baseline 76 units from the centre). -->
      <path :id="arcId" d="M 24 100 A 76 76 0 0 1 176 100" fill="none" />
    </defs>
    <text
      v-if="!compact"
      fill="var(--color-maroon)"
      font-size="17"
      font-weight="800"
      letter-spacing="2.2"
      font-family="'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif"
    >
      <textPath :href="`#${arcId}`" startOffset="50%" text-anchor="middle">{{ arcText }}</textPath>
    </text>
    <!-- The ICDO mark, cropped from the logo file to its artwork. -->
    <svg :x="compact ? 26 : 45" :y="compact ? 26 : 57" :width="compact ? 148 : 110" :height="compact ? 148 : 110" viewBox="88 88 284 284">
      <image href="/logo.png" width="500" height="500" />
    </svg>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ compact?: boolean; label?: string; text?: string }>(), {
  label: "Illchamus Community CBO logo",
  text: "Illchamus Community",
});
const arcText = computed(() => props.text.toUpperCase());
// Unique per instance so several badges on one page don't share a path id.
const arcId = `logo-arc-${useId()}`;
</script>

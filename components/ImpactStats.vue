<template>
  <dl ref="root" class="grid grid-cols-2 lg:grid-cols-4 border-t border-ink/15">
    <div
      v-for="(stat, i) in stats"
      :key="i"
      class="pt-6 pb-2 pr-4 lg:px-6 first:lg:pl-0"
      :class="[
        i % 2 === 1 ? 'pl-4 border-l border-ink/15' : '',
        i > 0 ? 'lg:border-l lg:border-ink/15' : '',
        i > 1 ? 'border-t border-ink/15 lg:border-t-0 mt-0' : '',
      ]"
    >
      <dt class="sr-only">{{ tx(stat.label.en, stat.label.sw) }}</dt>
      <dd>
        <span class="block text-[2.25rem] sm:text-5xl font-extrabold tracking-tight text-ink tabular-nums">
          {{ formatStat(stat, display[i] ?? stat.value) }}
        </span>
        <span class="mt-2 block text-sm sm:text-[15px] font-medium leading-snug text-ink-soft max-w-[14rem]">
          {{ tx(stat.label.en, stat.label.sw) }}
        </span>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import { formatStat } from "~/data/impact";

const { tx } = useLang();
// Figures and labels are editable in /admin → Impact & figures.
const { data: impact } = await useImpact();
const stats = computed(() => impact.value.stats);

const root = ref<HTMLElement | null>(null);
// Render final values on the server so the numbers are never wrong without JS.
const display = ref<number[]>(stats.value.map((s) => s.value));
watch(stats, (now) => (display.value = now.map((s) => s.value)));

let observer: IntersectionObserver | undefined;

const animate = () => {
  const start = performance.now();
  const duration = 1600;
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    display.value = stats.value.map((s) => s.value * eased);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

onMounted(() => {
  if (!root.value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = root.value.getBoundingClientRect();
  if (rect.top < window.innerHeight) return; // already visible: keep final values
  display.value = stats.value.map(() => 0);
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        animate();
        observer?.disconnect();
      }
    },
    { threshold: 0.4 }
  );
  observer.observe(root.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

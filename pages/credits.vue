<template>
  <div>
    <PageHero :title="t.title" :lead="t.lead" :image="baringo.sunrise" :crumbs="[{ label: t.title }]" />

    <section class="py-14 sm:py-20">
      <div class="shell">
        <p class="lead max-w-2xl">{{ t.intro }}</p>
        <ul class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="credit in photoCredits" :key="credit.file" class="overflow-hidden rounded-[24px] bg-white border border-line">
            <Photo :src="credit.file" :alt="credit.title" :width="600" :height="400" sizes="100vw sm:50vw lg:400px" class="aspect-[3/2] w-full object-cover" />
            <div class="p-5 text-sm">
              <p class="font-bold text-ink">{{ credit.title }}</p>
              <p class="mt-1 text-ink-soft">{{ t.photoBy }} {{ credit.author }}</p>
              <p class="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                <a :href="credit.licenseUrl" target="_blank" rel="noopener noreferrer license" class="font-semibold text-maroon hover:underline">{{ t.license }}: {{ credit.license }}</a>
                <a :href="credit.source" target="_blank" rel="noopener noreferrer" class="font-semibold text-maroon hover:underline">{{ t.source }}</a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { baringo } from "~/data/site";
import { photoCredits } from "~/data/credits";

const { m } = useLang();
const t = computed(() => m.value.credits);
usePageMeta(() => t.value.metaTitle, () => t.value.metaDescription);
</script>

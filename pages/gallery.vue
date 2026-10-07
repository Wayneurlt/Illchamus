<template>
  <div>
    <PageHero :eyebrow="t.eyebrow" :title="t.title" :lead="t.lead" :image="baringo.sunsetBoat" :crumbs="[{ label: m.nav.gallery }]" />

    <Gallery />

    <PageCta :title="t.ctaTitle" :description="t.ctaText" :primary-text="t.ctaPrimary" primary-to="/contact" :secondary-text="t.ctaSecondary" secondary-to="/donate" />
  </div>
</template>

<script setup lang="ts">
import { baringo } from "~/data/site";

const { m } = useLang();
const t = computed(() => m.value.gallery);
usePageMeta(() => t.value.metaTitle, () => t.value.metaDescription, { image: baringo.sunsetBoat });
</script>

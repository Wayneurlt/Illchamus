<template>
  <div>
    <HomeHero />
    <HomeImpact />
    <HomePrograms />
    <HomeStories />
    <HomeGive />
    <HomeEvents />
    <HomeNews />
    <PageCta
      :title="m.home.cta.title"
      :description="m.home.cta.text"
      :primary-text="m.home.cta.primary"
      primary-to="/donate"
      :secondary-text="m.home.cta.secondary"
      secondary-to="/contact"
    />
  </div>
</template>

<script setup lang="ts">
const { m } = useLang();
usePageMeta(() => m.value.meta.homeTitle, () => m.value.meta.homeDescription);
</script>

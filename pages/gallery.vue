<template>
  <div>
    <PageHero
      eyebrow="Moments that matter"
      title="Community gallery"
      lead="Celebrations, classrooms and the landscapes of home, from across the Illchamus community."
      :image="img(photos.acaciaDusk, 1800)"
      :crumbs="[{ label: 'Gallery' }]"
    />

    <Gallery />

    <PageCta
      title="Have photos to share?"
      description="Send us your photos of community events, cultural celebrations or volunteer days and help us tell our story."
      primary-text="Share your photos"
      primary-to="/contact"
      secondary-text="Support our work"
      secondary-to="/donate"
    />
  </div>
</template>

<script setup lang="ts">
import { img, photos } from "~/data/site";

usePageMeta("Gallery", "Explore our community gallery: cultural celebrations, educational programs, and initiatives across Baringo County, Kenya.");
</script>

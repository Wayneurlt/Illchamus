<template>
  <div>
    <PageHero title-before="Community " gradient-word="gallery" title-after="" lead="Explore moments, celebrations, and impactful work across our Illchamus community—from cultural preservation to educational programs." />

    <Gallery />

    <PageCta
      heading-before="Want to "
      accent-word="contribute"
      heading-after="?"
      description="Share your photos of community events, cultural celebrations, or volunteer activities. Help us build a visual story of our journey."
      primary-text="Share your photos"
      primary-to="/contact"
      secondary-text="Support our work"
      secondary-to="/donate"
    />
  </div>
</template>

<script setup>
usePageMeta('Gallery', "Explore our community gallery: cultural celebrations, educational programs, and initiatives across Baringo County, Kenya.");
</script>

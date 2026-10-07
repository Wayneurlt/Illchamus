<template>
  <section class="shell">
    <div class="relative overflow-hidden rounded-[28px] lg:rounded-[36px] bg-sun-soft px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
      <div class="sun-ring w-[170px] h-[170px] border-[20px] -top-24 -right-16 sm:w-[340px] sm:h-[340px] sm:border-[32px] sm:-top-40 sm:-right-24" aria-hidden="true" />
      <div class="relative max-w-2xl pr-10 sm:pr-16 lg:pr-0" data-aos="fade-up">
        <h2 class="h2">{{ title }}</h2>
        <p v-if="description" class="lead mt-4 text-ink">{{ description }}</p>
        <div class="mt-8 flex flex-col sm:flex-row gap-3">
          <NuxtLink v-if="primaryTo" :to="primaryTo" class="btn btn-ink">{{ primaryText }}</NuxtLink>
          <NuxtLink v-if="secondaryTo" :to="secondaryTo" class="btn btn-outline">{{ secondaryText }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
  primaryText?: string;
  primaryTo?: string;
  secondaryText?: string;
  secondaryTo?: string;
}>();
</script>

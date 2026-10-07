<template>
  <section class="frame hero-offset">
    <div class="relative isolate overflow-hidden rounded-[26px] lg:rounded-[32px] bg-maroon-deep min-h-[440px] sm:min-h-[460px] lg:min-h-[500px] flex items-end">
      <Photo
        v-if="image"
        :src="image"
        alt=""
        :width="1920"
        :height="900"
        sizes="100vw xxl:1480px"
        priority
        class="absolute inset-0 -z-10 w-full h-full object-cover"
        :class="imagePosition"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" aria-hidden="true" />
      <div class="absolute inset-x-0 top-0 h-40 -z-10 bg-gradient-to-b from-black/45 to-transparent" aria-hidden="true" />

      <div class="w-full px-5 sm:px-10 lg:px-14 pt-32 pb-12 sm:pb-14 lg:pb-16 text-white">
        <nav :aria-label="m.nav.breadcrumb" class="text-sm font-semibold text-white/75">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li><NuxtLink to="/" class="hover:text-white">{{ m.nav.home }}</NuxtLink></li>
            <template v-for="crumb in trail" :key="crumb.label">
              <li aria-hidden="true"><Icon name="heroicons:chevron-right-20-solid" class="h-4 w-4" /></li>
              <li>
                <NuxtLink v-if="crumb.to" :to="crumb.to" class="hover:text-white">{{ crumb.label }}</NuxtLink>
                <span v-else class="text-white" aria-current="page">{{ crumb.label }}</span>
              </li>
            </template>
          </ol>
        </nav>
        <p v-if="eyebrow" class="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-[13px] font-semibold">
          <Icon name="heroicons:heart-solid" class="h-4 w-4 text-sun" />
          {{ eyebrow }}
        </p>
        <h1 class="display mt-4 max-w-4xl text-[2.5rem] sm:text-6xl lg:text-[4.25rem]">
          <slot name="title">{{ title }}</slot>
        </h1>
        <p v-if="lead" class="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/90">{{ lead }}</p>
        <div v-if="$slots.default" class="mt-7">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { m } = useLang();

const props = defineProps<{
  title?: string;
  lead?: string;
  eyebrow?: string;
  image?: string;
  imagePosition?: string;
  /** Breadcrumb trail after Home; defaults to the page title. */
  crumbs?: { label: string; to?: string }[];
}>();

const trail = computed(() => props.crumbs ?? (props.title ? [{ label: props.title }] : []));
</script>

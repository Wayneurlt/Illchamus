<template>
  <!-- Uploaded photos are already resized in the browser at upload time. -->
  <img
    v-if="isUpload"
    :src="src"
    :alt="alt"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
  />
  <NuxtImg
    v-else
    :provider="unsplashId ? 'unsplash' : undefined"
    :src="unsplashId ? `/photo-${unsplashId}` : src"
    :width="width"
    :height="height"
    :sizes="sizes"
    :alt="alt"
    fit="cover"
    format="webp"
    :quality="72"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    :preload="priority || undefined"
    decoding="async"
  />
</template>

<script setup lang="ts">
// One image component for the whole site: Unsplash photos by id, bundled images
// in /public/images (resized on the server) and admin uploads (/uploads/…).
const props = defineProps<{
  id?: string;
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  /** Responsive widths, e.g. "100vw sm:50vw lg:400px". */
  sizes?: string;
  /** Above-the-fold image: load immediately with high priority. */
  priority?: boolean;
}>();

// Full Unsplash URLs (e.g. in older posts) are optimised like ids.
const unsplashId = computed(() => props.id || /images\.unsplash\.com\/photo-([\w-]+)/.exec(props.src || "")?.[1]);
const isUpload = computed(() => !unsplashId.value && !!props.src && !props.src.startsWith("/images/"));
</script>

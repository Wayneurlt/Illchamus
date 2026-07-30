<template>
  <section class="py-24 lg:py-32 cta-community">
    <div class="container-cbo text-center relative z-10" data-aos="fade-up">
      <p class="section-eyebrow bg-white/10 text-[#fde8d8] border border-white/10">Join hands with us</p>
      <h2 class="section-heading text-[#faf6f0] mb-4">
        <slot name="heading">
          {{ headingBefore }}
          <span class="text-[#fbbf7a]">{{ accentWord }}</span>
          {{ headingAfter }}
        </slot>
      </h2>
      <p v-if="description || $slots.default" class="text-[#d4c4b5] max-w-2xl mx-auto mb-8 text-[15px] leading-relaxed">
        <slot>{{ description }}</slot>
      </p>
      <div v-if="$slots.actions || primaryText" class="flex flex-col sm:flex-row gap-4 justify-center">
        <slot name="actions">
          <NuxtLink v-if="primaryTo" :to="primaryTo" class="btn-cbo px-8 py-3 text-base inline-flex justify-center">
            {{ primaryText }}
          </NuxtLink>
          <NuxtLink
            v-if="secondaryTo"
            :to="secondaryTo"
            class="btn-cbo-outline border-[#faf6f0] text-[#faf6f0] hover:bg-[#faf6f0] hover:text-[var(--cbo-earth-dark)] px-8 py-3 text-base inline-flex justify-center"
          >
            {{ secondaryText }}
          </NuxtLink>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  headingBefore?: string
  accentWord?: string
  headingAfter?: string
  description?: string
  primaryText?: string
  primaryTo?: string
  secondaryText?: string
  secondaryTo?: string
}>()
</script>

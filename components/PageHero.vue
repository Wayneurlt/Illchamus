<template>
  <section class="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-cbo-cream border-b border-[var(--cbo-border)]">
    <div class="container-cbo text-center" data-aos="fade-up">
      <p v-if="eyebrow" class="section-eyebrow">{{ eyebrow }}</p>
      <h1 class="section-heading mb-4">
        <slot name="title">
          <template v-if="title">{{ title }}</template>
          <template v-else>
            {{ titleBefore }}
            <span v-if="gradientWord" class="gradient-text">{{ gradientWord }}</span>
            {{ titleAfter }}
          </template>
        </slot>
      </h1>
      <p v-if="lead || $slots.lead" class="section-lead mx-auto max-w-2xl" :class="leadClass">
        <slot name="lead">{{ lead }}</slot>
      </p>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  titleBefore?: string
  gradientWord?: string
  titleAfter?: string
  lead?: string
  leadClass?: string
  eyebrow?: string
}>()
</script>

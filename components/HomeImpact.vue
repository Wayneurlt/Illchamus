<template>
  <section id="impact" class="relative overflow-hidden bg-sun-soft mt-14 lg:mt-16 py-14 sm:py-20 lg:py-24 scroll-mt-16">
    <div class="sun-ring w-[260px] h-[260px] border-[26px] -top-28 -right-24 sm:w-[380px] sm:h-[380px] sm:border-[34px] sm:-top-40 sm:-right-28" aria-hidden="true" />

    <div class="shell relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16 items-start">
      <div class="relative max-w-sm mx-auto w-full lg:mx-0" data-aos="fade-up">
        <div class="aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-[0_24px_50px_-28px_rgba(46,20,20,0.5)]">
          <Photo :id="photos.woman" :alt="m.home.impact.photoAlt" :width="700" :height="875" sizes="100vw sm:384px lg:340px" class="w-full h-full object-cover" />
        </div>
        <div class="absolute -bottom-5 left-5 right-5 sm:left-auto sm:-right-6 sm:w-60 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-20px_rgba(46,20,20,0.45)]">
          <p class="flex items-center gap-2 text-sm font-bold text-ink">
            <span class="w-8 h-8 rounded-full bg-leaf-soft text-leaf flex items-center justify-center">
              <Icon name="heroicons:user-group-solid" class="h-4 w-4" />
            </span>
            {{ m.home.impact.badgeTitle }}
          </p>
          <p class="mt-1.5 text-[13px] leading-snug text-ink-soft">{{ m.home.impact.badgeText }}</p>
        </div>
      </div>

      <div class="pt-4 lg:pt-6" data-aos="fade-up" data-aos-delay="100">
        <h2 class="h2">{{ m.home.impact.title }}</h2>
        <p class="lead mt-5 max-w-2xl text-ink">
          {{ m.home.impact.text }}
        </p>
        <NuxtLink to="/about" class="btn btn-ink mt-8">{{ m.home.impact.cta }}</NuxtLink>

        <ImpactStats class="mt-12 lg:mt-16" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { photos } from "~/data/site";

const { m } = useLang();
</script>

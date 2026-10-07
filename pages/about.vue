<template>
  <div>
    <PageHero :eyebrow="t.eyebrow" :title="t.title" :lead="t.lead" :image="GATHERING" image-position="object-[50%_35%]" :crumbs="[{ label: m.nav.about }]" />

    <!-- Our story -->
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="shell grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div class="relative pb-10 sm:pb-14 pr-10 sm:pr-16" data-aos="fade-up">
          <div class="aspect-[4/3] overflow-hidden rounded-[28px]">
            <Photo :id="photos.classroom" :alt="m.home.slides[1]!.alt" :width="900" :height="675" sizes="100vw lg:560px" class="w-full h-full object-cover" />
          </div>
          <div class="absolute bottom-0 right-0 w-1/2 aspect-square overflow-hidden rounded-[24px] ring-8 ring-paper">
            <Photo :id="photos.learner" :alt="m.gallery.items[9]!.description" :width="500" :height="500" sizes="50vw lg:280px" class="w-full h-full object-cover" />
          </div>
          <div class="absolute top-6 -left-2 sm:left-6 rounded-2xl bg-sun px-4 py-3 shadow-lg">
            <p class="text-2xl font-extrabold text-ink leading-none">12</p>
            <p class="text-xs font-bold text-ink/75">{{ t.villagesBadge }}</p>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <p class="eyebrow">{{ t.storyEyebrow }}</p>
          <h2 class="h2 mt-3">{{ t.storyTitle }}</h2>
          <p class="lead mt-5">{{ t.storyText }}</p>
          <ul class="mt-7 space-y-3">
            <li v-for="item in t.storyPoints" :key="item" class="flex items-start gap-3 text-[16px] font-medium text-ink">
              <span class="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-leaf-soft text-leaf flex items-center justify-center">
                <Icon name="heroicons:check-20-solid" class="h-4 w-4" />
              </span>
              {{ item }}
            </li>
          </ul>
          <div class="mt-9 flex flex-col sm:flex-row gap-3">
            <NuxtLink to="/donate" class="btn btn-ink">{{ t.joinMission }}</NuxtLink>
            <NuxtLink to="/blog/first-charity-visit" class="btn btn-outline">{{ t.readFull }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & vision -->
    <section class="shell grid grid-cols-1 gap-5 md:grid-cols-2">
      <div v-for="(card, i) in purpose" :key="card.title" class="rounded-[28px] p-8 sm:p-10" :class="card.bg" data-aos="fade-up" :data-aos-delay="i * 80">
        <span class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center" :class="card.iconColor">
          <Icon :name="card.icon" class="h-6 w-6" />
        </span>
        <h2 class="mt-6 text-2xl sm:text-[1.75rem] font-bold tracking-tight text-ink">{{ card.title }}</h2>
        <p class="mt-3 text-[17px] leading-relaxed text-ink/80">{{ card.text }}</p>
      </div>
    </section>

    <!-- Values -->
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="shell">
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="eyebrow">{{ t.valuesEyebrow }}</p>
          <h2 class="h2 mt-3">{{ t.valuesTitle }}</h2>
        </div>
        <div class="mt-10 lg:mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(value, i) in t.values" :key="value.title" class="rounded-[26px] bg-white border border-line p-7" data-aos="fade-up" :data-aos-delay="i * 70">
            <span class="w-12 h-12 rounded-2xl flex items-center justify-center" :class="toneClasses[valueStyle[i]!.tone]">
              <Icon :name="valueStyle[i]!.icon" class="h-6 w-6" />
            </span>
            <h3 class="h3 mt-6">{{ value.title }}</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-soft">{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership -->
    <section id="team" class="pb-16 sm:pb-20 lg:pb-28 scroll-mt-20">
      <div class="shell">
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="eyebrow">{{ t.teamEyebrow }}</p>
          <h2 class="h2 mt-3">{{ t.teamTitle }}</h2>
          <p class="lead mt-4">{{ t.teamText }}</p>
        </div>
        <TeamGrid class="mt-10 lg:mt-14" />
      </div>
    </section>

    <!-- Impact band -->
    <section class="relative overflow-hidden bg-sun-soft py-14 sm:py-20">
      <div class="sun-ring w-[240px] h-[240px] border-[24px] -top-28 -right-20 sm:w-[340px] sm:h-[340px] sm:border-[32px] sm:-top-40" aria-hidden="true" />
      <div class="shell relative">
        <h2 class="h2 max-w-xl pr-12">{{ t.impactTitle }}</h2>
        <p class="lead mt-4 max-w-2xl text-ink">{{ t.impactText }}</p>
        <ImpactStats class="mt-10 lg:mt-14" />
      </div>
    </section>

    <!-- Where we work -->
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="shell">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up">
          <div class="max-w-2xl">
            <p class="eyebrow">{{ t.whereEyebrow }}</p>
            <h2 class="h2 mt-3">{{ t.whereTitle }}</h2>
            <p class="lead mt-4">{{ t.whereText }}</p>
          </div>
          <NuxtLink to="/gallery" class="btn btn-outline shrink-0 self-start sm:self-auto">{{ t.viewGallery }}</NuxtLink>
        </div>
        <div class="mt-10 grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 sm:gap-4 h-[460px] sm:h-[560px]">
          <div v-for="(tile, i) in mosaic" :key="i" class="relative overflow-hidden rounded-[22px]" :class="tile.span" data-aos="fade-up" :data-aos-delay="i * 60">
            <Photo :id="tile.id" :src="tile.src" :alt="t.mosaic[i] || ''" :width="900" :height="900" sizes="50vw lg:620px" class="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <PageCta :title="t.ctaTitle" :description="t.ctaText" :primary-text="t.ctaPrimary" primary-to="/donate" :secondary-text="t.ctaSecondary" secondary-to="/contact" />
  </div>
</template>

<script setup lang="ts">
import { GATHERING, baringo, photos, toneClasses, type Tone } from "~/data/site";

const { m } = useLang();
const t = computed(() => m.value.about);
usePageMeta(() => t.value.metaTitle, () => t.value.metaDescription, { image: GATHERING });

const purpose = computed(() => [
  { title: t.value.missionTitle, text: t.value.missionText, icon: "heroicons:flag", bg: "bg-sun-soft", iconColor: "text-maroon" },
  { title: t.value.visionTitle, text: t.value.visionText, icon: "heroicons:eye", bg: "bg-lake-soft", iconColor: "text-[#24647c]" },
]);

const valueStyle: { icon: string; tone: Tone }[] = [
  { icon: "heroicons:sparkles", tone: "maroon" },
  { icon: "heroicons:academic-cap", tone: "sun" },
  { icon: "heroicons:heart", tone: "lake" },
  { icon: "heroicons:globe-europe-africa", tone: "leaf" },
];

const mosaic: { id?: string; src?: string; span: string }[] = [
  { src: GATHERING, span: "col-span-2 lg:row-span-2" },
  { src: baringo.crocodile, span: "" },
  { src: baringo.fisherman, span: "" },
  { src: baringo.hippo, span: "hidden lg:block" },
  { src: baringo.sunsetBoat, span: "hidden lg:block" },
];
</script>

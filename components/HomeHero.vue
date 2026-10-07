<template>
  <section class="frame hero-offset" aria-roledescription="carousel" aria-label="Highlights">
    <div
      class="hero-card relative isolate overflow-hidden rounded-[26px] lg:rounded-[32px] bg-maroon-deep"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
    >
      <!-- Slides -->
      <div
        v-for="(slide, i) in slides"
        :key="slide.title"
        class="absolute inset-0 -z-10 transition-opacity duration-1000 ease-out"
        :class="i === active ? 'opacity-100' : 'opacity-0'"
        :aria-hidden="i !== active"
      >
        <img
          :src="img(slide.photo, 1800)"
          :srcset="`${img(slide.photo, 800)} 800w, ${img(slide.photo, 1300)} 1300w, ${img(slide.photo, 1800)} 1800w`"
          sizes="100vw"
          :alt="slide.alt"
          class="w-full h-full object-cover transition-transform duration-[7000ms] ease-out"
          :class="[slide.position, i === active ? 'scale-105' : 'scale-100']"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'auto'"
        />
      </div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/35 to-black/0" aria-hidden="true" />
      <div class="absolute inset-x-0 top-0 h-40 -z-10 bg-gradient-to-b from-black/45 to-transparent" aria-hidden="true" />
      <div class="absolute inset-x-0 bottom-0 h-40 -z-10 bg-gradient-to-t from-black/50 to-transparent sm:hidden" aria-hidden="true" />

      <!-- Copy -->
      <div class="relative h-full flex flex-col justify-end sm:justify-center px-5 sm:px-10 lg:px-14 pt-28 pb-28 sm:pb-24">
        <Transition mode="out-in" name="hero-copy">
          <div :key="active" class="max-w-[34rem] text-white" aria-live="polite">
            <p class="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs sm:text-[13px] font-semibold tracking-wide">
              <Icon :name="current.icon" class="h-4 w-4 text-sun" />
              {{ current.kicker }}
            </p>
            <h1 class="display mt-4 text-[2.75rem] sm:text-6xl lg:text-[4.5rem]" v-html="current.title" />
            <p class="mt-5 text-base sm:text-lg leading-relaxed text-white/90 max-w-md">
              {{ current.text }}
            </p>
            <p class="mt-3 text-base sm:text-lg font-bold">{{ current.strong }}</p>
            <NuxtLink :to="current.cta.to" class="btn btn-sun mt-7">
              {{ current.cta.label }}
            </NuxtLink>
          </div>
        </Transition>
      </div>

      <!-- Controls -->
      <div class="absolute inset-x-0 bottom-0 px-5 sm:px-10 lg:px-14 pb-6 sm:pb-8 flex items-center gap-4">
        <div class="flex items-center gap-2 sm:absolute sm:left-1/2 sm:-translate-x-1/2" role="tablist" aria-label="Choose slide">
          <button
            v-for="(slide, i) in slides"
            :key="slide.title"
            type="button"
            role="tab"
            class="h-2.5 rounded-full transition-all duration-300"
            :class="i === active ? 'w-7 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'"
            :aria-selected="i === active"
            :aria-label="`Slide ${i + 1} of ${slides.length}`"
            @click="go(i)"
          />
        </div>
        <div class="ml-auto flex items-center gap-2">
          <button
            type="button"
            class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-ink flex items-center justify-center shadow-md hover:bg-sun-soft transition-colors"
            :aria-label="playing ? 'Pause slideshow' : 'Play slideshow'"
            @click="toggle"
          >
            <Icon :name="playing ? 'heroicons:pause-solid' : 'heroicons:play-solid'" class="h-4 w-4" />
          </button>
          <button type="button" class="ctrl" aria-label="Previous slide" @click="prev">
            <Icon name="heroicons:arrow-left" class="h-5 w-5" />
          </button>
          <button type="button" class="ctrl" aria-label="Next slide" @click="next">
            <Icon name="heroicons:arrow-right" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <div class="relative z-10 -mt-7 flex justify-center">
      <a
        href="#impact"
        class="w-14 h-14 rounded-full bg-white text-ink flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(46,20,20,0.45)] hover:translate-y-0.5 transition-transform"
        aria-label="Scroll to our impact"
      >
        <Icon name="heroicons:chevron-down" class="h-6 w-6" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { img, photos } from "~/data/site";

const slides = [
  {
    photo: photos.children,
    position: "object-[60%_30%]",
    alt: "Smiling children from the community",
    icon: "heroicons:heart-solid",
    kicker: "Illchamus Community · Baringo County",
    title: "Rooted in<br />our heritage.",
    text: "A community-led organisation protecting Illchamus culture and supporting families across Baringo County.",
    strong: "Together, we grow stronger.",
    cta: { label: "Our Story", to: "/about" },
  },
  {
    photo: photos.classroom,
    position: "object-center",
    alt: "A classroom full of pupils",
    icon: "heroicons:academic-cap-solid",
    kicker: "Education",
    title: "Every child<br />in school.",
    text: "Scholarships, school supplies and mentors that keep learners in the classroom and dreaming bigger.",
    strong: "350+ students supported so far.",
    cta: { label: "Sponsor a Learner", to: "/donate" },
  },
  {
    photo: photos.care,
    position: "object-center",
    alt: "Hands held together in care",
    icon: "heroicons:plus-circle-solid",
    kicker: "Community Health",
    title: "Care that<br />reaches home.",
    text: "Mobile clinics and health education bring essential care to families in our most remote villages.",
    strong: "No family left behind.",
    cta: { label: "Explore Programs", to: "/#programs" },
  },
  {
    photo: photos.roller,
    position: "object-[70%_center]",
    alt: "A lilac-breasted roller perched on a branch",
    icon: "heroicons:globe-europe-africa-solid",
    kicker: "Lake Baringo Conservation",
    title: "Protecting<br />the land we share.",
    text: "Clean-ups, education and local partnerships that keep Lake Baringo and its wildlife thriving.",
    strong: "For our children's children.",
    cta: { label: "Get Involved", to: "/contact" },
  },
  {
    photo: photos.acaciaDusk,
    position: "object-center",
    alt: "Acacia tree on the savanna at dusk",
    icon: "heroicons:sparkles-solid",
    kicker: "Culture & Crafts",
    title: "Crafted by<br />our artisans.",
    text: "Beadwork, textiles and traditional art that sustain livelihoods and keep our traditions alive.",
    strong: "Our marketplace is coming soon.",
    cta: { label: "Visit the Shop", to: "/products" },
  },
];

const INTERVAL = 7000;
const active = ref(0);
const playing = ref(true);
const current = computed(() => slides[active.value]);
let timer: ReturnType<typeof setInterval> | undefined;

const stop = () => {
  if (timer) clearInterval(timer);
  timer = undefined;
};
const start = () => {
  stop();
  if (playing.value) timer = setInterval(() => (active.value = (active.value + 1) % slides.length), INTERVAL);
};

const go = (i: number) => {
  active.value = (i + slides.length) % slides.length;
  start();
};
const next = () => go(active.value + 1);
const prev = () => go(active.value - 1);
const toggle = () => {
  playing.value = !playing.value;
  start();
};

let touchX = 0;
const onTouchStart = (e: TouchEvent) => {
  touchX = e.touches[0]?.clientX ?? 0;
};
const onTouchEnd = (e: TouchEvent) => {
  const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX;
  if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
};

const onVisibility = () => (document.hidden ? stop() : start());

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) playing.value = false;
  start();
  document.addEventListener("visibilitychange", onVisibility);
});

onBeforeUnmount(() => {
  stop();
  document.removeEventListener("visibilitychange", onVisibility);
});
</script>

<style scoped>
.hero-card {
  height: min(88svh, 760px);
  min-height: 600px;
}
@media (min-width: 1024px) {
  .hero-card {
    height: min(calc(100svh - 5rem), 700px);
    min-height: 580px;
  }
}

.ctrl {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: var(--color-maroon);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}
@media (min-width: 640px) {
  .ctrl {
    width: 2.75rem;
    height: 2.75rem;
  }
}
.ctrl:hover {
  background: var(--color-maroon-deep);
}

.hero-copy-enter-active,
.hero-copy-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}
.hero-copy-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.hero-copy-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

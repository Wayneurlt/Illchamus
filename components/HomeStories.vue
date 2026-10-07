<template>
  <section class="pb-16 sm:pb-20 lg:pb-28">
    <div class="shell grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-stretch">
      <!-- Video: served from /public/videos and only downloaded when played -->
      <div class="relative min-h-[320px] sm:min-h-[420px] overflow-hidden rounded-[28px] bg-maroon-deep" data-aos="fade-up">
        <video
          v-show="playing"
          ref="video"
          class="absolute inset-0 w-full h-full object-cover"
          src="/videos/community.mp4"
          poster="/videos/community-poster.jpg"
          controls
          playsinline
          preload="none"
          @pause="playing = false"
          @ended="playing = false"
        />
        <template v-if="!playing">
          <Photo src="/videos/community-poster.jpg" :alt="m.home.slides[0]!.alt" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <button type="button" class="group absolute inset-0 flex items-center justify-center" :aria-label="t.play" @click="play">
            <span class="relative w-20 h-20 rounded-full bg-sun text-ink flex items-center justify-center shadow-xl transition-transform group-hover:scale-105">
              <span class="absolute inset-0 rounded-full bg-sun/60 animate-ping" aria-hidden="true" />
              <Icon name="heroicons:play-solid" class="relative h-8 w-8 ml-1" />
            </span>
          </button>
          <div class="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white pointer-events-none">
            <p class="text-sm font-semibold text-sun">{{ t.watch }}</p>
            <p class="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">{{ t.videoTitle }}</p>
          </div>
        </template>
      </div>

      <!-- Testimonials -->
      <div class="flex flex-col rounded-[28px] bg-white border border-line p-7 sm:p-10" data-aos="fade-up" data-aos-delay="100">
        <p class="eyebrow">{{ t.eyebrow }}</p>
        <Icon name="mdi:format-quote-open" class="mt-6 h-12 w-12 text-sun" />
        <Transition mode="out-in" name="quote">
          <figure :key="`${index}-${lang}`" class="flex-1 flex flex-col">
            <blockquote class="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-ink">
              “{{ current.quote }}”
            </blockquote>
            <figcaption class="mt-8 flex items-center gap-4">
              <span class="w-14 h-14 shrink-0 rounded-full bg-sun-soft text-maroon flex items-center justify-center text-lg font-extrabold" aria-hidden="true">
                {{ initials(testimonialNames[index]!) }}
              </span>
              <span>
                <span class="block font-bold text-ink">{{ testimonialNames[index] }}</span>
                <span class="block text-sm text-ink-soft">{{ current.role }}</span>
              </span>
            </figcaption>
          </figure>
        </Transition>
        <div class="mt-8 pt-6 border-t border-line flex items-center justify-between">
          <div class="flex gap-2">
            <button
              v-for="(name, i) in testimonialNames"
              :key="name"
              type="button"
              class="h-2.5 rounded-full transition-all"
              :class="i === index ? 'w-7 bg-maroon' : 'w-2.5 bg-line hover:bg-ink-soft/40'"
              :aria-label="fill(t.showStory, { name })"
              :aria-current="i === index"
              @click="index = i"
            />
          </div>
          <div class="flex gap-2">
            <button type="button" class="arrow" :aria-label="t.prev" @click="step(-1)">
              <Icon name="heroicons:arrow-left" class="h-5 w-5" />
            </button>
            <button type="button" class="arrow" :aria-label="t.next" @click="step(1)">
              <Icon name="heroicons:arrow-right" class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { testimonialNames } from "~/data/site";

const { m, lang } = useLang();
const t = computed(() => m.value.home.stories);

const index = ref(0);
const current = computed(() => m.value.testimonials[index.value]!);
const initials = (name: string) =>
  name
    .replace(/^(Dr\.|Elder)\s+/, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
const step = (d: number) => (index.value = (index.value + d + testimonialNames.length) % testimonialNames.length);

const video = ref<HTMLVideoElement | null>(null);
const playing = ref(false);
const play = async () => {
  playing.value = true;
  await nextTick();
  try {
    await video.value?.play();
  } catch {
    playing.value = false;
  }
};
</script>

<style scoped>
.arrow {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  background: var(--color-maroon);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}
.arrow:hover {
  background: var(--color-maroon-deep);
}
.quote-enter-active,
.quote-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.quote-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.quote-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>

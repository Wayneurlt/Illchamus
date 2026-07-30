<template>
  <section
    ref="sectionRef"
    class="relative flex flex-col justify-center items-center text-center min-h-[calc(100vh-4rem)] sm:min-h-screen overflow-hidden bg-cbo-warm pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16"
    aria-label="Hero"
  >
    <div class="absolute inset-0 w-full h-full">
      <video
        ref="videoRef"
        :src="bgVideo"
        playsinline
        muted
        loop
        preload="auto"
        class="absolute top-0 left-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-700"
        style="width: 100%; height: 100%; object-fit: cover;"
        :class="isPlaying ? 'opacity-100' : 'opacity-0'"
        @loadeddata="onVideoLoaded"
        @error="onVideoError"
      />
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#faf6f0]/85 via-[#f3ebe0]/70 to-[#faf6f0]/90 pointer-events-none transition-opacity duration-700 z-[1]"
      :class="isPlaying ? 'opacity-100' : 'opacity-100'"
      aria-hidden="true"
    />

    <div class="relative z-10 container-cbo max-w-4xl w-full flex flex-col items-center">
      <p
        ref="badgeRef"
        class="section-eyebrow mb-2"
      >
        <Icon name="heroicons:heart" class="h-3.5 w-3.5" />
        Illchamus Community · Baringo County
      </p>
      <h1
        ref="line1"
        class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--cbo-ink)] leading-[1.15]"
      >
        Together we preserve
      </h1>
      <p
        ref="line2"
        class="mt-2 sm:mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--cbo-accent)] leading-[1.15]"
      >
        our culture &amp; our people
      </p>
      <p
        ref="subtitle"
        class="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-[var(--cbo-muted)] max-w-2xl leading-relaxed px-2 sm:px-0"
      >
        A community-led organisation rooted in Illchamus heritage—supporting families, children, and neighbours across Baringo County.
      </p>

      <div
        ref="statsRef"
        class="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto w-full px-2 sm:px-0"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="card-community px-3 py-4 sm:px-4 sm:py-5 text-center"
        >
          <p class="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--cbo-accent)]">{{ stat.value }}</p>
          <p class="text-xs sm:text-sm text-[var(--cbo-muted)] mt-1 leading-tight font-medium">{{ stat.label }}</p>
        </div>
      </div>

      <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto px-2 sm:px-0">
        <NuxtLink
          to="/donate"
          class="btn-cbo px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 min-w-[140px] sm:min-w-0"
        >
          <Icon name="heroicons:heart" class="h-4 w-4" />
          Support our community
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="btn-cbo-outline px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto text-center inline-flex items-center justify-center min-w-[140px] sm:min-w-0"
        >
          Our story
        </NuxtLink>
      </div>

      <button
        ref="playBtn"
        :aria-label="isPlaying ? 'Pause community video' : 'Play community video'"
        class="mt-8 sm:mt-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 border-2 border-[var(--cbo-border)] flex items-center justify-center shadow-md hover:bg-white hover:border-[var(--cbo-accent)] transition-colors shrink-0"
        @click="toggleVideo"
      >
        <Icon
          :name="isPlaying ? 'mdi:pause' : 'mdi:play'"
          class="text-[var(--cbo-earth)] text-xl sm:text-2xl ml-0.5"
        />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import bgVideo from "~/assets/videos/bg.mp4";

const stats = [
  { value: "5,000+", label: "Neighbours reached" },
  { value: "350+", label: "Young learners" },
  { value: "12", label: "Villages together" },
];

const isPlaying = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);
const badgeRef = ref<HTMLElement | null>(null);
const line1 = ref<HTMLElement | null>(null);
const line2 = ref<HTMLElement | null>(null);
const subtitle = ref<HTMLElement | null>(null);
const statsRef = ref<HTMLElement | null>(null);
const playBtn = ref<HTMLElement | null>(null);

const onVideoLoaded = () => {};
const onVideoError = (e: Event) => console.warn("Video error", e);

const toggleVideo = async () => {
  if (!videoRef.value) return;
  try {
    if (isPlaying.value) {
      videoRef.value.pause();
      isPlaying.value = false;
    } else {
      await videoRef.value.play();
      isPlaying.value = true;
    }
  } catch {
    isPlaying.value = false;
  }
  if (playBtn.value) {
    gsap.fromTo(playBtn.value, { scale: 0.95 }, { scale: 1, duration: 0.2, ease: "power2.out" });
  }
};

onMounted(() => {
  const els = [badgeRef.value, line1.value, line2.value, subtitle.value, statsRef.value, playBtn.value].filter(Boolean);
  gsap.set(els, { y: 32, opacity: 0 });
  gsap.to(els, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    stagger: 0.08,
    ease: "power3.out",
  });
});
</script>

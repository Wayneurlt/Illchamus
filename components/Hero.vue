<template>
  <section
    class="relative flex items-center justify-center text-center overflow-hidden bg-white min-h-screen"
    aria-label="Hero"
  >
    <!-- Background Video -->
    <video
      ref="videoRef"
      :src="bgVideo"
      playsinline
      muted
      loop
      preload="auto"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none"
      :class="{ 'opacity-100': isPlaying, 'opacity-0': !isPlaying }"
      @loadeddata="onVideoLoaded"
      @error="onVideoError"
    ></video>

    <!-- Overlay for readability when video plays -->
    <div
      class="absolute inset-0 transition-opacity duration-700 pointer-events-none"
      :class="
        isPlaying ? 'bg-white/50 opacity-100' : 'bg-white opacity-100'
      "
      aria-hidden="true"
    ></div>

    <!-- Content wrapper -->
    <div class="relative z-10 px-6 md:px-10 max-w-3xl w-full">
      <!-- Heading lines as separate elements for staggered animation -->
      <h1 class="font-extrabold leading-tight tracking-tight">
        <span
          ref="line1"
          class="block text-4xl md:text-6xl text-gray-900"
        >
          Preserving Illchamus
        </span>

        <span ref="line2" class="block text-4xl md:text-6xl mt-4">
          <span class="gradient-text">Culture & Empowering</span>
        </span>

        <span ref="line3" class="block text-4xl md:text-6xl mt-2 text-gray-900">
          Our Community
        </span>
      </h1>

      <!-- Subtitle -->
      <p ref="subtitle" class="text-xl font-bold md:text-2xl text-black mb-8 max-w-4xl mx-auto leading-relaxed">
        We are committed to protecting our heritage, supporting families, and building a brighter future in Baringo County, Kenya.
      </p>

      <!-- Play / Pause Button centered under heading -->
      <div class="flex justify-center">
        <a
          ref="playBtn"
          @click="toggleVideo"
          :aria-pressed="isPlaying"
          :aria-label="
            isPlaying ? 'Pause background video' : 'Play background video'
          "
          class="mt-10 group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 btn-maasai rounded-full shadow-xl transform-gpu transition-transform focus:outline-none focus:ring-4 focus:ring-orange-200"
        >
          <Icon
            :icon="isPlaying ? 'mdi:pause' : 'mdi:play'"
            class="text-white text-2xl md:text-3xl transform transition-transform duration-200"
            aria-hidden="true"
          />
          <!-- subtle focus/active visual (screen readers still get aria-label) -->
          <span class="sr-only">{{ isPlaying ? "Pause" : "Play" }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import gsap from "gsap";

// Import video file using Nuxt's asset handling
import bgVideo from "~/assets/videos/bg.mp4";

const isPlaying = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);
const line1 = ref<HTMLElement | null>(null);
const line2 = ref<HTMLElement | null>(null);
const line3 = ref<HTMLElement | null>(null);
const subtitle = ref<HTMLElement | null>(null);
const playBtn = ref<HTMLElement | null>(null);

/** Video event handlers */
const onVideoLoaded = () => {
  console.log("Video loaded successfully");
};

const onVideoError = (error: Event) => {
  console.error("Video failed to load:", error);
};

/** Toggle play/pause and keep state */
const toggleVideo = async () => {
  if (!videoRef.value) {
    console.warn("Video element not found");
    return;
  }

  try {
    if (isPlaying.value) {
      videoRef.value.pause();
      isPlaying.value = false;
    } else {
      // try play() and handle promise (some browsers block autoplay)
      await videoRef.value.play();
      isPlaying.value = true;
    }
  } catch (err) {
    // If browser blocked play (autoplay policies), unmute or prompt user action
    console.warn("Video play failed:", err);
    isPlaying.value = false;
  }

  // small scale animation on click for tactile feedback
  if (playBtn.value) {
    gsap.fromTo(
      playBtn.value,
      { scale: 0.95 },
      { scale: 1, duration: 0.25, ease: "power2.out" }
    );
  }
};

onMounted(() => {
  // GSAP entry animation: words and button come up from below
  const tl = gsap.timeline({
    defaults: { duration: 0.75, ease: "power3.out" },
  });

  // initial positions
  gsap.set([line1.value, line2.value, line3.value, subtitle.value, playBtn.value], {
    y: 40,
    opacity: 0,
  });

  tl.to(line1.value, { y: 0, opacity: 1 })
    .to(line2.value, { y: 0, opacity: 1 }, "-=0.45")
    .to(line3.value, { y: 0, opacity: 1 }, "-=0.45")
    .to(subtitle.value, { y: 0, opacity: 1 }, "-=0.35")
    .to(playBtn.value, { y: 0, opacity: 1, scale: 1 }, "-=0.25");
});
</script>

<style scoped>
/* ensure hero fills viewport like screenshot */
section {
  min-height: 100vh;
}

/* Slight shadow under button to match "floating" look */
button {
  box-shadow: 0 10px 25px rgba(16, 24, 40, 0.12);
}
</style>

<template>
  <section
    class="relative flex items-center justify-center text-center overflow-hidden bg-[#FFFCF4] min-h-screen"
    aria-label="Hero"
  >
    <!-- Background Video -->
    <video
      ref="videoRef"
      :src="videoSrc"
      playsinline
      muted
      loop
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none"
      :class="{ 'opacity-100': isPlaying, 'opacity-0': !isPlaying }"
    ></video>

    <!-- Dark overlay for readability when video plays -->
    <div
      class="absolute inset-0 transition-opacity duration-700 pointer-events-none"
      :class="
        isPlaying ? 'bg-black/30 opacity-100' : 'bg-[#FFFCF4] opacity-100'
      "
      aria-hidden="true"
    ></div>

    <!-- Content wrapper -->
    <div class="relative z-10 px-6 md:px-10 max-w-3xl w-full">
      <!-- Heading lines as separate elements for staggered animation -->
      <h1 class="font-extrabold leading-tight tracking-tight">
        <span
          ref="line1"
          class="block text-4xl md:text-6xl"
          :class="{ 'text-[#FBBF24]': true }"
        >
          Imagine...
        </span>

        <span ref="line2" class="block text-4xl md:text-6xl mt-4">
          <span class="text-green-700"
            >a Nigeria with exemplary leadership;</span
          >
        </span>

        <span ref="line3" class="block text-4xl md:text-6xl mt-2 text-black">
          leadership that goes beyond tribe and religion.
        </span>
      </h1>

      <!-- Play / Pause Button centered under heading -->
      <div class="flex justify-center">
        <a
          ref="playBtn"
          @click="toggleVideo"
          :aria-pressed="isPlaying"
          :aria-label="
            isPlaying ? 'Pause background video' : 'Play background video'
          "
          class="mt-10 group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-700 rounded-full shadow-xl transform-gpu transition-transform focus:outline-none focus:ring-4 focus:ring-green-200"
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

/*
    Video from src/assets/videos/bg.mp4 (Nuxt/Vite friendly import)
    Note: ensure the file exists at that path.
  */
const videoSrc = new URL("~/assets/videos/bg.mp4", import.meta.url).href;

const isPlaying = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);
const line1 = ref<HTMLElement | null>(null);
const line2 = ref<HTMLElement | null>(null);
const line3 = ref<HTMLElement | null>(null);
const playBtn = ref<HTMLElement | null>(null);

/** Toggle play/pause and keep state */
const toggleVideo = async () => {
  if (!videoRef.value) return;

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
    // Here we simply set isPlaying to false (video won't play) and optionally you can show a toast.
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
  gsap.set([line1.value, line2.value, line3.value, playBtn.value], {
    y: 40,
    opacity: 0,
  });

  tl.to(line1.value, { y: 0, opacity: 1 })
    .to(line2.value, { y: 0, opacity: 1 }, "-=0.45")
    .to(line3.value, { y: 0, opacity: 1 }, "-=0.45")
    .to(playBtn.value, { y: 0, opacity: 1, scale: 1 }, "-=0.35");
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

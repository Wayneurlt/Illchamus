<template>
  <section id="gallery" class="py-20 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Community <span class="gradient-text">Gallery</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Capturing the spirit and beauty of our community through moments of
          joy, celebration, and togetherness.
        </p>
      </div>

      <!-- Infinite Sliding Grid -->
      <div ref="sliderWrapper" class="relative w-full overflow-hidden">
        <div ref="sliderTrack" class="flex items-start space-x-12">
          <!-- Duplicate 2 sets for continuous slide -->
          <div
            v-for="n in 2"
            :key="n"
            class="grid-container w-[1200px] md:w-[1400px] flex-shrink-0"
          >
            <div
              class="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            >
              <div
                v-for="(image, index) in galleryImages"
                :key="`${n}-${index}`"
                class="masonry-item break-inside-avoid"
              >
                <div
                  class="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
                >
                  <img
                    :src="image.url"
                    :alt="image.alt"
                    class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                  <div
                    class="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <h3 class="text-lg font-semibold mb-1">
                      {{ image.title }}
                    </h3>
                    <p class="text-sm text-white/90">{{ image.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const galleryImages = ref([
  {
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2070&q=80",
    alt: "Traditional Illchamus culture",
    title: "Cultural Heritage",
    description: "Preserving our traditions",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80",
    alt: "Lake Baringo",
    title: "Lake Baringo",
    description: "Our beautiful natural environment",
  },
  {
    url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=2070&q=80",
    alt: "Community gathering",
    title: "Community Unity",
    description: "Coming together as one",
  },
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2071&q=80",
    alt: "Children in Kenya",
    title: "Future Generation",
    description: "Nurturing our children",
  },
  {
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2070&q=80",
    alt: "Community celebration",
    title: "Celebration",
    description: "Joy and togetherness",
  },
  {
    url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=2070&q=80",
    alt: "Women empowerment",
    title: "Empowered Women",
    description: "Strong and independent",
  },
  {
    url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2011&q=80",
    alt: "Agriculture in Africa",
    title: "Sustainable Farming",
    description: "Growing our future",
  },
  {
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2070&q=80",
    alt: "Traditional art",
    title: "Cultural Art",
    description: "Expressing our identity",
  },
]);

const sliderTrack = ref(null);

onMounted(() => {
  const track = sliderTrack.value;

  const totalWidth = track.scrollWidth / 2;

  // Infinite horizontal scroll animation
  gsap.to(track, {
    x: -totalWidth,
    duration: 80, // slower or faster speed
    ease: "none",
    repeat: -1,
  });
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #10b981, #16a34a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.grid-container {
  /* Keeps the masonry set width fixed to prevent scaling up */
  max-width: 1400px;
}
</style>

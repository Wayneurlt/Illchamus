<template>
  <section id="gallery" class="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Community <span class="gradient-text">Gallery</span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Capturing the spirit and beauty of our community through moments of
          joy, celebration, and togetherness.
        </p>
      </div>

      <!-- Infinite Sliding Grid -->
      <div ref="sliderWrapper" class="relative w-full overflow-hidden">
        <div ref="sliderTrack" class="flex items-start" style="gap: 0.5rem;">
          <!-- Duplicate 2 sets for continuous slide -->
          <div
            v-for="n in 2"
            :key="n"
            class="grid-container w-[280px] sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[1100px] flex-shrink-0"
          >
            <div
              class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6"
            >
              <div
                v-for="(image, index) in galleryImages"
                :key="`${n}-${index}`"
                class="masonry-item break-inside-avoid"
              >
                <div
                  class="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg group cursor-pointer"
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
                    class="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <h3 class="text-sm sm:text-lg font-semibold mb-1">
                      {{ image.title }}
                    </h3>
                    <p class="text-xs sm:text-sm text-white/90">{{ image.description }}</p>
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
import { ref, onMounted, onUnmounted } from "vue";
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

  // Responsive animation speed based on screen size
  const getAnimationDuration = () => {
    if (window.innerWidth < 640) return 50; // Mobile: faster
    if (window.innerWidth < 1024) return 60; // Tablet: medium
    return 70; // Desktop: slower
  };

  const startAnimation = () => {
    // Wait for DOM to be fully rendered
    setTimeout(() => {
      // Get the actual width of one set of items (first half)
      const firstSet = track.children[0];
      if (!firstSet) return;
      
      // Calculate total width including gap
      const gap = window.innerWidth < 640 ? 4 : 8; // 0.25rem or 0.5rem in pixels
      const totalWidth = firstSet.offsetWidth + gap;
      
      // Kill any existing animation
      gsap.killTweensOf(track);
      
      // Reset position to ensure smooth restart
      gsap.set(track, { x: 0 });
      
      // Infinite horizontal scroll animation
      gsap.to(track, {
        x: -totalWidth,
        duration: getAnimationDuration(),
        ease: "none",
        repeat: -1,
      });
    }, 100);
  };

  // Start the animation
  startAnimation();

  // Update animation on resize with debounce
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      startAnimation();
    }, 100);
  };

  window.addEventListener('resize', handleResize);
  
  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
    gsap.killTweensOf(track);
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
  /* Responsive masonry container */
  max-width: 100%;
}

/* Ensure smooth infinite scrolling */
#gallery .flex {
  will-change: transform;
}

/* Prevent layout shifts during animation */
@media (max-width: 640px) {
  #gallery .flex {
    gap: 0.25rem !important;
  }
}

/* Improve masonry layout on mobile */
@media (max-width: 640px) {
  .masonry-item {
    margin-bottom: 0.5rem;
  }
  
  .grid-container {
    width: 260px !important;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .masonry-item {
    margin-bottom: 0.75rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .masonry-item {
    margin-bottom: 1rem;
  }
}
</style>

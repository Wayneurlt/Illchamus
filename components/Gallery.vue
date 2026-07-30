<template>
  <section id="gallery" class="py-24 lg:py-32 bg-cbo-warm overflow-hidden">
    <div class="container-cbo">
      <div class="text-center mb-12 lg:mb-16" data-aos="fade-up">
        <h2 class="section-heading mb-4">
          Community <span class="gradient-text">Gallery</span>
        </h2>
        <p class="section-lead mx-auto">
          Moments of joy, celebration, and togetherness from across our community.
        </p>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="w-10 h-10 rounded-full border-2 border-[var(--cbo-accent)] border-t-transparent animate-spin" />
        <span class="ml-3 text-[var(--cbo-muted)]">Loading gallery…</span>
      </div>

      <div v-else-if="hasError" class="text-center py-16" data-aos="fade-up">
        <Icon name="heroicons:exclamation-triangle" class="h-12 w-12 text-[var(--cbo-accent)] mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-[var(--cbo-ink)] mb-2">Unable to load gallery</h3>
        <p class="text-[var(--cbo-muted)] mb-4">There was an error loading the images.</p>
        <button class="btn-cbo px-5 py-2.5 rounded-xl text-sm" @click="retryLoad">Try again</button>
      </div>

      <div v-else class="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        <div
          v-for="(image, index) in galleryImages"
          :key="index"
          class="group relative overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
          :data-aos="'fade-up'"
          :data-aos-delay="index % 8 * 60"
          @click="openLightbox(index)"
          @keydown.enter="openLightbox(index)"
          @keydown.space.prevent="openLightbox(index)"
          tabindex="0"
          role="button"
          :aria-label="`View ${image.title}`"
        >
          <img
            :src="image.url"
            :alt="image.alt"
            class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            @error="handleImageError"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 class="font-semibold text-sm">{{ image.title }}</h3>
            <p class="text-xs text-white/90 mt-0.5">{{ image.description }}</p>
          </div>
          <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="inline-flex w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm">
              <Icon name="heroicons:magnifying-glass-plus" class="h-5 w-5 text-[var(--cbo-accent)]" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      @click="closeLightbox"
      @keydown.escape="closeLightbox"
      tabindex="0"
      role="dialog"
      aria-modal="true"
      :aria-label="`Image ${currentImageIndex + 1} of ${galleryImages.length}`"
    >
      <button
        class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close"
        @click="closeLightbox"
      >
        <Icon name="heroicons:x-mark" class="h-6 w-6" />
      </button>
      <button
        v-if="galleryImages.length > 1"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Previous"
        @click="previousImage"
      >
        <Icon name="heroicons:chevron-left" class="h-6 w-6" />
      </button>
      <button
        v-if="galleryImages.length > 1"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Next"
        @click="nextImage"
      >
        <Icon name="heroicons:chevron-right" class="h-6 w-6" />
      </button>
      <div class="relative max-w-full max-h-full flex items-center justify-center">
        <img
          :src="currentImage.url"
          :alt="currentImage.alt"
          class="max-w-full max-h-[85vh] object-contain rounded-lg"
          @error="handleImageError"
        />
        <div class="absolute bottom-4 left-4 right-4 text-white text-center md:text-left">
          <h3 class="text-lg font-semibold">{{ currentImage.title }}</h3>
          <p class="text-sm text-white/80">{{ currentImage.description }}</p>
          <p class="text-xs text-white/60 mt-1">{{ currentImageIndex + 1 }} of {{ galleryImages.length }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const isLoading = ref(true);
const hasError = ref(false);
const lightboxOpen = ref(false);
const currentImageIndex = ref(0);

const galleryImages = ref([
  { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80", alt: "Traditional Illchamus culture", title: "Cultural Heritage", description: "Preserving our traditions", category: "culture", tags: ["tradition", "heritage", "culture"] },
  { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", alt: "Lake Baringo", title: "Lake Baringo", description: "Our natural environment", category: "nature", tags: ["lake", "nature", "environment"] },
  { url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80", alt: "Community gathering", title: "Community Unity", description: "Coming together", category: "community", tags: ["community", "unity", "gathering"] },
  { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", alt: "Children in Kenya", title: "Future Generation", description: "Nurturing our children", category: "education", tags: ["children", "education", "future"] },
  { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80", alt: "Women empowerment", title: "Empowered Women", description: "Strong and independent", category: "community", tags: ["women", "empowerment", "strength"] },
  { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80", alt: "Agriculture in Africa", title: "Sustainable Farming", description: "Growing our future", category: "community", tags: ["agriculture", "farming", "sustainability"] },
  { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80", alt: "Traditional art", title: "Cultural Art", description: "Expressing our identity", category: "culture", tags: ["art", "culture", "identity"] },
  { url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80", alt: "Community health", title: "Health Initiative", description: "Caring for our community", category: "community", tags: ["health", "wellness", "care"] },
]);

const currentImage = computed(() => galleryImages.value[currentImageIndex.value] || galleryImages.value[0]);

const loadImages = async () => {
  isLoading.value = true;
  hasError.value = false;
  try {
    await new Promise((r) => setTimeout(r, 800));
  } catch {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const retryLoad = () => loadImages();

const openLightbox = (i) => {
  currentImageIndex.value = i;
  lightboxOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = "";
};

const nextImage = () => {
  currentImageIndex.value = currentImageIndex.value < galleryImages.value.length - 1 ? currentImageIndex.value + 1 : 0;
};

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value > 0 ? currentImageIndex.value - 1 : galleryImages.value.length - 1;
};

const handleImageError = (e) => {
  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23f5f5f5' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' font-family='system-ui' font-size='14' fill='%23737373' text-anchor='middle' dy='.3em'%3EImage not available%3C/text%3E%3C/svg%3E";
};

const onKeydown = (e) => {
  if (!lightboxOpen.value) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") previousImage();
  if (e.key === "ArrowRight") nextImage();
};

onMounted(() => {
  loadImages();
  document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

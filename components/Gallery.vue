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


      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <span class="ml-3 text-gray-600">Loading gallery...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="text-center py-12">
        <Icon name="heroicons:exclamation-triangle" class="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Unable to load gallery</h3>
        <p class="text-gray-600 mb-4">There was an error loading the gallery images.</p>
        <button
          @click="retryLoad"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>

      <!-- Gallery Content -->
      <div v-else>
        <!-- Grid View -->
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
            v-for="(image, index) in galleryImages"
            :key="`grid-${index}`"
            class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            @click="openLightbox(index)"
            @keydown.enter="openLightbox(index)"
            @keydown.space.prevent="openLightbox(index)"
            tabindex="0"
            role="button"
            :aria-label="`View ${image.title} in lightbox`"
          >
            <div class="aspect-square relative">
                  <img
                    :src="image.url"
                    :alt="image.alt"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 class="text-lg font-semibold mb-1">{{ image.title }}</h3>
                <p class="text-sm text-white/90">{{ image.description }}</p>
                  </div>
              <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Icon name="heroicons:eye" class="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      @click="closeLightbox"
      @keydown.escape="closeLightbox"
      tabindex="0"
      role="dialog"
      aria-modal="true"
      :aria-label="`Image ${currentImageIndex + 1} of ${galleryImages.length}`"
    >
      <div class="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
        <!-- Close Button -->
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors duration-200"
          aria-label="Close lightbox"
        >
          <Icon name="heroicons:x-mark" class="h-6 w-6" />
        </button>

        <!-- Navigation Buttons -->
        <button
          v-if="galleryImages.length > 1"
          @click="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors duration-200"
          aria-label="Previous image"
        >
          <Icon name="heroicons:chevron-left" class="h-6 w-6" />
        </button>
        <button
          v-if="galleryImages.length > 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors duration-200"
          aria-label="Next image"
        >
          <Icon name="heroicons:chevron-right" class="h-6 w-6" />
        </button>

        <!-- Image -->
        <div class="relative max-w-full max-h-full">
          <img
            :src="currentImage.url"
            :alt="currentImage.alt"
            class="max-w-full max-h-full object-contain rounded-lg"
            @error="handleImageError"
          />
          <div class="absolute bottom-4 left-4 right-4 text-white">
            <h3 class="text-xl font-semibold mb-2">{{ currentImage.title }}</h3>
            <p class="text-white/90 mb-2">{{ currentImage.description }}</p>
            <p class="text-sm text-white/70">{{ currentImageIndex + 1 }} of {{ galleryImages.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

// Reactive state
const isLoading = ref(true)
const hasError = ref(false)
const lightboxOpen = ref(false)
const currentImageIndex = ref(0)

// Gallery data with enhanced metadata
const galleryImages = ref([
  {
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2070&q=80",
    alt: "Traditional Illchamus culture",
    title: "Cultural Heritage",
    description: "Preserving our traditions",
    category: "culture",
    tags: ["tradition", "heritage", "culture"]
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80",
    alt: "Lake Baringo",
    title: "Lake Baringo",
    description: "Our beautiful natural environment",
    category: "nature",
    tags: ["lake", "nature", "environment"]
  },
  {
    url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=2070&q=80",
    alt: "Community gathering",
    title: "Community Unity",
    description: "Coming together as one",
    category: "community",
    tags: ["community", "unity", "gathering"]
  },
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2071&q=80",
    alt: "Children in Kenya",
    title: "Future Generation",
    description: "Nurturing our children",
    category: "education",
    tags: ["children", "education", "future"]
  },

  {
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2070&q=80",
    alt: "Women empowerment",
    title: "Empowered Women",
    description: "Strong and independent",
    category: "community",
    tags: ["women", "empowerment", "strength"]
  },
  {
    url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2011&q=80",
    alt: "Agriculture in Africa",
    title: "Sustainable Farming",
    description: "Growing our future",
    category: "community",
    tags: ["agriculture", "farming", "sustainability"]
  },
  {
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2070&q=80",
    alt: "Traditional art",
    title: "Cultural Art",
    description: "Expressing our identity",
    category: "culture",
    tags: ["art", "culture", "identity"]
  },
 
  {
    url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=2067&auto=format&fit=crop",
    alt: "Community health",
    title: "Health Initiative",
    description: "Caring for our community",
    category: "community",
    tags: ["health", "wellness", "care"]
  }
])

// Computed properties
const currentImage = computed(() => {
  return galleryImages.value[currentImageIndex.value] || galleryImages.value[0]
})

// Methods
const loadImages = async () => {
  try {
    isLoading.value = true
    hasError.value = false
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you would fetch images from an API here
    // For now, we'll just simulate success
    isLoading.value = false
  } catch (error) {
    console.error('Error loading gallery:', error)
    hasError.value = true
    isLoading.value = false
  }
}

const retryLoad = () => {
  loadImages()
}


const openLightbox = (index) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentImageIndex.value < galleryImages.value.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = galleryImages.value.length - 1
  }
}

const handleImageError = (event) => {
  console.warn('Image failed to load:', event.target.src)
  // You could set a fallback image here
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+'
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (!lightboxOpen.value) return

  switch (event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      previousImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}


// Lifecycle
onMounted(() => {
  loadImages()
  document.addEventListener('keydown', handleKeydown)
})

  onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #dc2626, #f97316, #6b21a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced gallery styles */
.gallery-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-item:hover {
  transform: translateY(-4px);
}

/* Improved masonry layout */
.masonry-view {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 640px) {
  .masonry-view {
    column-count: 2;
    column-gap: 1rem;
    display: block;
  }
  
  .masonry-view > * {
    break-inside: avoid;
    margin-bottom: 1rem;
  }
}

@media (min-width: 1024px) {
  .masonry-view {
    column-count: 3;
  }
}

@media (min-width: 1280px) {
  .masonry-view {
    column-count: 4;
  }
}

/* Mobile-specific grid adjustments */
@media (max-width: 639px) {
  .masonry-view {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .masonry-view > * {
    margin-bottom: 0;
  }
}

/* Lightbox animations */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.lightbox-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.lightbox-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Focus styles for accessibility */
.gallery-item:focus {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}

/* Smooth transitions for view mode changes */
.view-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Better responsive spacing */
@media (max-width: 640px) {
  .gallery-grid {
    gap: 0.75rem;
  }
}

@media (min-width: 641px) {
  .gallery-grid {
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    gap: 1.5rem;
  }
}

/* Enhanced hover effects */
.gallery-overlay {
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.1) 70%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

/* Improved mobile experience */
@media (max-width: 768px) {
  .lightbox-content {
    padding: 1rem;
  }
  
  .lightbox-image {
    max-height: 70vh;
  }
}

/* Better button styles */
.gallery-button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-button:hover {
  transform: scale(1.05);
}

.gallery-button:active {
  transform: scale(0.95);
}

/* Search and filter improvements */
.search-input:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.filter-select:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
</style>


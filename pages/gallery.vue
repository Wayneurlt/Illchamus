<template>
  <div>
    <Navbar />

    <section class="pt-28 pb-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Gallery</h1>
        <p class="mt-4 text-gray-600 max-w-3xl">Moments from our programs and community work.</p>
      </div>
    </section>

    <!-- Masonry-like grid with multiple images -->
    <section class="pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="(img, i) in images" :key="i" class="group overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <img :src="img.src" :alt="img.caption" class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div class="p-3">
              <p class="text-sm font-medium text-gray-800">{{ img.caption }}</p>
              <p class="text-xs text-gray-500">{{ img.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
useHead({ title: 'Gallery • Illchamus Community CBO' })
const images = [
  { src: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=2070&auto=format&fit=crop', caption: 'Community outreach', location: 'Baringo' },
  { src: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2069&auto=format&fit=crop', caption: 'School supplies distribution', location: 'Local school' },
  { src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1975&auto=format&fit=crop', caption: 'Cultural celebration', location: 'Community center' },
  { src: 'https://images.unsplash.com/photo-1603640377241-1e8c4d9c58f7?q=80&w=1974&auto=format&fit=crop', caption: 'Mentorship session', location: 'Youth hub' },
  { src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2067&auto=format&fit=crop', caption: 'Wellness program', location: 'Clinic' },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop', caption: 'Computer literacy', location: 'Training room' },
  { src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2067&auto=format&fit=crop', caption: 'Food distribution', location: 'Village' },
  { src: 'https://images.unsplash.com/photo-1558985040-ed4d5029c9f4?q=80&w=1974&auto=format&fit=crop', caption: 'Women empowerment', location: 'Workshop' },
  { src: 'https://images.unsplash.com/photo-1520975867597-0f8bf3b2c3e1?q=80&w=2070&auto=format&fit=crop', caption: 'Environmental action', location: 'Lake Baringo' },
  { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop', caption: 'Cultural art', location: 'Art fair' },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop', caption: 'Community meeting', location: 'Hall' },
  { src: 'https://images.unsplash.com/photo-1558980664-10a5a5f1b8c2?q=80&w=1974&auto=format&fit=crop', caption: 'Holiday support', location: 'Town center' }
]
</script>



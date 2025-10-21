<template>
  <div>
    <Navbar />

    <!-- Hero Section -->
    <section class="pt-28 pb-16 bg-gradient-to-br from-red-50 via-orange-50 to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Community <span class="gradient-text">Gallery</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the vibrant moments, celebrations, and impactful work happening across our Illchamus community. 
            From cultural preservation to educational programs, see how we're making a difference together.
          </p>
        </div>
      </div>
    </section>

    <!-- Enhanced Gallery Component -->
    <Gallery />

    <!-- Call to Action -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Want to <span class="gradient-text">Contribute</span>?
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Share your own photos of community events, cultural celebrations, or volunteer activities. 
          Help us build a comprehensive visual story of our community's journey.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/contact" 
            class="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Share Your Photos
          </NuxtLink>
          <NuxtLink 
            to="/donate" 
            class="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Support Our Work
          </NuxtLink>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
useHead({ 
  title: 'Gallery • Illchamus Community CBO',
  meta: [
    { name: 'description', content: 'Explore our community gallery showcasing cultural celebrations, educational programs, and community initiatives across Baringo County, Kenya.' },
    { name: 'keywords', content: 'Illchamus community, gallery, cultural events, education programs, community initiatives, Baringo County' }
  ]
})
</script>



<template>
  <div>
    <Navbar />

    <!-- Hero -->
    <section class="pt-28 pb-16 bg-gradient-to-b from-white to-purple-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Preserving Culture. Empowering Community.</h1>
          <p class="mt-5 text-gray-600 text-lg">We champion Illchamus heritage while advancing education, wellness, and sustainable livelihoods across Baringo County.</p>
        </div>
      </div>
    </section>

    <!-- Mission & Story -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 class="text-2xl font-semibold text-gray-900">Our Mission</h2>
          <p class="mt-4 text-gray-600 leading-relaxed">To protect our heritage and enable every child and family to thrive through inclusive education, mental wellness support, and community-driven development.</p>
          <div class="mt-6 grid grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200 p-4 bg-white">
              <p class="text-3xl font-bold text-purple-600">500+</p>
              <p class="text-gray-600 text-sm mt-1">Community Support</p>
            </div>
            <div class="rounded-xl border border-gray-200 p-4 bg-white">
              <p class="text-3xl font-bold text-purple-600">50+</p>
              <p class="text-gray-600 text-sm mt-1">Educational Aid</p>
            </div>
            <div class="rounded-xl border border-gray-200 p-4 bg-white">
              <p class="text-3xl font-bold text-purple-600">5+</p>
              <p class="text-gray-600 text-sm mt-1">Wellness Programs</p>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 class="text-lg font-semibold text-gray-900">Our Story</h3>
          <p class="mt-3 text-gray-600 leading-relaxed">Born from a simple visit to a children's home, our journey has grown into a community-driven initiative. We partner with local schools, provide scholarships and mentorship, and integrate mental health support so learning and wellbeing can flourish together.</p>
          <ul class="mt-6 space-y-3">
            <li class="flex items-start gap-3"><Icon name="heroicons:check-circle-20-solid" class="h-5 w-5 text-purple-600 mt-0.5" /><span class="text-gray-700">Scholarships and school essentials</span></li>
            <li class="flex items-start gap-3"><Icon name="heroicons:check-circle-20-solid" class="h-5 w-5 text-purple-600 mt-0.5" /><span class="text-gray-700">Computer literacy and vocational training</span></li>
            <li class="flex items-start gap-3"><Icon name="heroicons:check-circle-20-solid" class="h-5 w-5 text-purple-600 mt-0.5" /><span class="text-gray-700">Integrated mental wellness support</span></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-16 bg-purple-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-semibold text-gray-900">Our Values</h2>
        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <div class="rounded-2xl border border-purple-100 bg-white p-6">
            <h4 class="font-semibold text-gray-900">Culture & Identity</h4>
            <p class="mt-2 text-gray-600">We preserve Illchamus heritage through language, arts, and storytelling.</p>
          </div>
          <div class="rounded-2xl border border-purple-100 bg-white p-6">
            <h4 class="font-semibold text-gray-900">Education First</h4>
            <p class="mt-2 text-gray-600">Access, equity, and excellence in learning for every child.</p>
          </div>
          <div class="rounded-2xl border border-purple-100 bg-white p-6">
            <h4 class="font-semibold text-gray-900">Wellbeing</h4>
            <p class="mt-2 text-gray-600">Holistic mental, emotional, and social support for families.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Image strip -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img v-for="(img, i) in strip" :key="i" :src="img" alt="About gallery" class="w-full h-40 object-cover rounded-xl border border-gray-200" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
  
</template>

<script setup>
useHead({ title: 'About • Illchamus Community CBO' })
const strip = [
  'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2069&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1975&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520975867597-0f8bf3b2c3e1?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop'
]
</script>



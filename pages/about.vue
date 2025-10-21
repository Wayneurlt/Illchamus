<template>
  <div>
    <Navbar />

    <!-- Hero -->
    <section class="pt-32 pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl text-center mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Preserving <span class="gradient-text">Culture</span>. 
            <br>Empowering <span class="gradient-text">Community</span>.
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">We champion Illchamus heritage while advancing education, wellness, and sustainable livelihoods across Baringo County, Kenya.</p>
        </div>
      </div>
    </section>

    <!-- Mission & Story -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our <span class="gradient-text">Mission</span>
            </h2>
            <p class="text-lg text-gray-600 leading-relaxed mb-8">To protect our heritage and enable every child and family to thrive through inclusive education, mental wellness support, and community-driven development.</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 text-center border border-red-100">
                <p class="text-3xl font-bold text-red-600">5,000+</p>
                <p class="text-gray-600 text-sm mt-2">Lives Impacted</p>
              </div>
              <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 text-center border border-orange-100">
                <p class="text-3xl font-bold text-orange-600">350+</p>
                <p class="text-gray-600 text-sm mt-2">Students Supported</p>
              </div>
              <div class="bg-gradient-to-br from-purple-50 to-red-50 rounded-2xl p-6 text-center border border-purple-100">
                <p class="text-3xl font-bold text-purple-600">12</p>
                <p class="text-gray-600 text-sm mt-2">Communities Reached</p>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-red-900 via-purple-900 to-gray-900 rounded-2xl p-8 text-white">
            <h3 class="text-2xl font-bold mb-6">Our Story</h3>
            <p class="text-gray-300 leading-relaxed mb-6">Born from a simple visit to a children's home, our journey has grown into a community-driven initiative. We partner with local schools, provide scholarships and mentorship, and integrate mental health support so learning and wellbeing can flourish together.</p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span class="text-gray-300">Scholarships and school essentials</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span class="text-gray-300">Computer literacy and vocational training</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span class="text-gray-300">Integrated mental wellness support</span>
              </li>
            </ul>
            <NuxtLink to="/donate" class="inline-block mt-8 bg-white text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl font-medium transition-colors">
              Join Our Mission
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span class="gradient-text">Values</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            These core principles guide everything we do in service of the Illchamus community.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-red-100 hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-br from-red-100 to-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-4">Culture & Identity</h4>
            <p class="text-gray-600 leading-relaxed">We preserve Illchamus heritage through language, arts, and storytelling, ensuring our traditions thrive for future generations.</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-br from-orange-100 to-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-4">Education First</h4>
            <p class="text-gray-600 leading-relaxed">Access, equity, and excellence in learning for every child, providing the foundation for a brighter future.</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-br from-purple-100 to-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-4">Wellbeing</h4>
            <p class="text-gray-600 leading-relaxed">Holistic mental, emotional, and social support for families, creating strong and resilient communities.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Gallery -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span class="gradient-text">Community</span> in Action
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            See the impact of our programs and the vibrant spirit of the Illchamus community.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="(img, i) in strip" :key="i" class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <img :src="img" alt="Community activity" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-r from-red-600 via-orange-500 to-purple-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Make a <span class="text-yellow-300">Difference</span>?
        </h2>
        <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Join us in preserving Illchamus culture and empowering our community. Every contribution makes an impact.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/donate" class="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            Donate Now
          </NuxtLink>
          <NuxtLink to="/contact" class="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-0.5">
            Get Involved
          </NuxtLink>
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



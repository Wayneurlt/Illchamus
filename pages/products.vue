<template>
  <div>
    <Navbar />

    <!-- Hero Section -->
    <section class="pt-32 pb-16 bg-gradient-to-br from-red-50 via-orange-50 to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Community <span class="gradient-text">Products</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover authentic handcrafted products made by our community members, supporting local artisans and sustainable livelihoods.
          </p>
        </div>
      </div>
    </section>

    <!-- Coming Soon Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- Coming Soon Badge -->
          <div class="inline-flex items-center px-6 py-3 bg-red-100 text-red-600 rounded-full font-semibold text-lg mb-8">
            <Icon name="heroicons:clock" class="h-5 w-5 mr-2" />
            Coming Soon
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Something Amazing is <span class="gradient-text">Brewing</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We're working hard to bring you a curated collection of authentic Illchamus community products. 
            From traditional beadwork to handcrafted items, our marketplace will support local artisans and preserve cultural heritage.
          </p>
        </div>

        <!-- Preview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div class="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="heroicons:sparkles" class="h-8 w-8 text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Traditional Beadwork</h3>
            <p class="text-gray-600 leading-relaxed">
              Authentic Maasai beadwork including necklaces, bracelets, and decorative items made by skilled local artisans.
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="heroicons:heart" class="h-8 w-8 text-orange-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Handcrafted Textiles</h3>
            <p class="text-gray-600 leading-relaxed">
              Beautiful shuka cloths, traditional garments, and home textiles showcasing Illchamus cultural patterns and colors.
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="heroicons:home" class="h-8 w-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Home Decor</h3>
            <p class="text-gray-600 leading-relaxed">
              Unique decorative items including calabash bowls, traditional shields, and cultural art pieces for modern homes.
            </p>
          </div>
        </div>

        <!-- Features -->
        <div class="bg-gradient-to-r from-red-600 via-orange-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <Icon name="heroicons:user-group" class="h-12 w-12 mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">Support Local Artisans</h3>
              <p class="text-white/90">Every purchase directly supports community members and their families</p>
            </div>
            <div class="text-center">
              <Icon name="heroicons:shield-check" class="h-12 w-12 mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">Authentic Products</h3>
              <p class="text-white/90">Genuine handcrafted items preserving traditional techniques and cultural heritage</p>
            </div>
            <div class="text-center">
              <Icon name="heroicons:globe-alt" class="h-12 w-12 mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">Sustainable Impact</h3>
              <p class="text-white/90">Promoting sustainable livelihoods and environmental conservation</p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center">
          <h3 class="text-3xl font-bold text-gray-900 mb-6">Stay Updated</h3>
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be the first to know when our community marketplace launches. Sign up for updates and get early access to exclusive products.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button class="bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Notify Me
            </button>
          </div>
          
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/contact" 
              class="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-red-600"
            >
              Contact Us
            </NuxtLink>
            <NuxtLink 
              to="/donate" 
              class="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Support Our Work
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
useHead({ 
  title: 'Products • Illchamus Community CBO',
  meta: [
    { name: 'description', content: 'Discover authentic handcrafted products from the Illchamus community. Traditional beadwork, textiles, and cultural items supporting local artisans.' },
    { name: 'keywords', content: 'Illchamus products, traditional beadwork, handcrafted items, community marketplace, cultural heritage, local artisans' }
  ]
})
</script>



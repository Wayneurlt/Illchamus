<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow-md' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-2xl font-bold gradient-text">
            Illchamus CBO
          </NuxtLink>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-3">
            <NuxtLink 
              to="/" 
              class="px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative link-underline text-gray-900 hover:text-red-600"
            >Home</NuxtLink>
            <NuxtLink 
              to="/about" 
              class="px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative link-underline text-gray-900 hover:text-red-600"
            >About</NuxtLink>
            <NuxtLink 
              to="/gallery" 
              class="px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative link-underline text-gray-900 hover:text-red-600"
            >Gallery</NuxtLink>
            <NuxtLink 
              to="/products" 
              class="px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative link-underline text-gray-900 hover:text-red-600"
            >Products</NuxtLink>
            <NuxtLink 
              to="/blog" 
              class="px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative link-underline text-gray-900 hover:text-red-600"
            >Blog</NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="px-3 py-2 rounded-lg text-sm font-semibold transition-colors relative link-underline text-gray-900 hover:text-red-600"
            >Contact</NuxtLink>
            <NuxtLink 
              to="/donate"
              class="ml-2 inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors btn-maasai"
            >Donate</NuxtLink>
          </div>
        </div>
        
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 text-gray-900 hover:text-red-600"
          >
            <Icon 
              :name="isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" 
              class="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div 
      v-show="isMobileMenuOpen" 
      class="md:hidden bg-white/95 backdrop-blur-md shadow-lg"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink 
          to="/" 
          @click="closeMobileMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          @click="closeMobileMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
        >
          About
        </NuxtLink>
        <NuxtLink 
          to="/gallery" 
          @click="closeMobileMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
        >
          Gallery
        </NuxtLink>
        <NuxtLink 
          to="/products" 
          @click="closeMobileMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
        >
          Products
        </NuxtLink>
        <NuxtLink 
          to="/blog" 
          @click="closeMobileMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
        >
          Blog
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          @click="closeMobileMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
        >
          Contact
        </NuxtLink>
        <NuxtLink 
          to="/donate" 
          @click="closeMobileMenu"
          class="block px-3 py-2 rounded-md text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
        >
          Donate
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

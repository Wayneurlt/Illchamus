<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-lg' : 'bg-transparent'"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 lg:h-18">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink 
            to="/" 
            class="text-xl sm:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg"
            aria-label="Illchamus CBO Home"
          >
            Illchamus CBO
          </NuxtLink>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden lg:block">
          <div class="flex items-center space-x-1 xl:space-x-2">
            <NuxtLink 
              to="/" 
              class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative link-underline text-gray-900 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              :class="{ 'text-red-600': $route.path === '/' }"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative link-underline text-gray-900 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              :class="{ 'text-red-600': $route.path === '/about' }"
            >
              About
            </NuxtLink>
            <NuxtLink 
              to="/gallery" 
              class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative link-underline text-gray-900 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              :class="{ 'text-red-600': $route.path === '/gallery' }"
            >
              Gallery
            </NuxtLink>
            <NuxtLink 
              to="/products" 
              class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative link-underline text-gray-900 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              :class="{ 'text-red-600': $route.path === '/products' }"
            >
              Products
            </NuxtLink>
            <NuxtLink 
              to="/blog" 
              class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative link-underline text-gray-900 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              :class="{ 'text-red-600': $route.path === '/blog' }"
            >
              Blog
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative link-underline text-gray-900 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              :class="{ 'text-red-600': $route.path === '/contact' }"
            >
              Contact
            </NuxtLink>
            <NuxtLink 
              to="/donate"
              class="ml-3 inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 btn-maasai hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Donate
            </NuxtLink>
          </div>
        </div>
        
        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 text-gray-900 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            <Icon 
              :name="isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" 
              class="h-6 w-6 transition-transform duration-200"
              :class="{ 'rotate-90': isMobileMenuOpen }"
            />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div 
        v-show="isMobileMenuOpen" 
        id="mobile-menu"
        class="lg:hidden bg-white/98 backdrop-blur-md shadow-xl border-t border-gray-200/60"
      >
        <div class="px-4 pt-4 pb-6 space-y-2">
          <NuxtLink 
            to="/" 
            @click="closeMobileMenu"
            class="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            :class="{ 'text-red-600 bg-red-50': $route.path === '/' }"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            @click="closeMobileMenu"
            class="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            :class="{ 'text-red-600 bg-red-50': $route.path === '/about' }"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/gallery" 
            @click="closeMobileMenu"
            class="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            :class="{ 'text-red-600 bg-red-50': $route.path === '/gallery' }"
          >
            Gallery
          </NuxtLink>
          <NuxtLink 
            to="/products" 
            @click="closeMobileMenu"
            class="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            :class="{ 'text-red-600 bg-red-50': $route.path === '/products' }"
          >
            Products
          </NuxtLink>
          <NuxtLink 
            to="/blog" 
            @click="closeMobileMenu"
            class="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            :class="{ 'text-red-600 bg-red-50': $route.path === '/blog' }"
          >
            Blog
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            @click="closeMobileMenu"
            class="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            :class="{ 'text-red-600 bg-red-50': $route.path === '/contact' }"
          >
            Contact
          </NuxtLink>
          <div class="pt-2">
            <NuxtLink 
              to="/donate" 
              @click="closeMobileMenu"
              class="flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-white transition-all duration-200 btn-maasai hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Donate Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

// Throttled scroll handler for better performance
let scrollTimeout = null

const handleScroll = () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  
  scrollTimeout = setTimeout(() => {
    isScrolled.value = window.scrollY > 50
  }, 10)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  
  // Prevent body scroll when mobile menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
})

// Close mobile menu on escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
  
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})
</script>

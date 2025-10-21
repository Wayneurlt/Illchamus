<template>
  <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="py-12 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <!-- Organization Info -->
          <div class="lg:col-span-2">
            <div class="mb-6">
              <div class="flex items-center space-x-4 mb-4">
                <img 
                  src="/assets/images/logo.png" 
                  alt="Illchamus CBO Logo" 
                  class="h-36 w-auto object-contain"
                />
                <div>
                
                </div>
              </div>
              <p class="text-gray-300 mb-6 max-w-lg leading-relaxed text-base lg:text-lg">
                Preserving Illchamus culture and empowering our community through education, support, and sustainable development in Baringo County, Kenya.
              </p>
            </div>
            
            <!-- Newsletter Signup -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold mb-3 text-white">Stay Updated</h4>
              <form @submit.prevent="handleNewsletterSubmit" class="flex flex-col sm:flex-row gap-3">
                <input
                  v-model="newsletterEmail"
                  type="email"
                  placeholder="Enter your email"
                  class="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Icon v-if="isSubmitting" name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
                  <Icon v-else name="heroicons:envelope" class="h-4 w-4" />
                  {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
                </button>
              </form>
              <p v-if="newsletterMessage" class="mt-2 text-sm" :class="newsletterSuccess ? 'text-green-400' : 'text-red-400'">
                {{ newsletterMessage }}
              </p>
            </div>
            
            <!-- Social Media Links -->
            <div>
              <h4 class="text-lg font-semibold mb-4 text-white">Follow Us</h4>
              <div class="flex space-x-3">
                <a 
                  href="https://facebook.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Follow us on Facebook"
                >
                  <Icon name="mdi:facebook" class="h-6 w-6" />
                </a>
                <a 
                  href="https://x.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 bg-gray-800 hover:bg-black rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Follow us on X (Twitter)"
                >
                  <Icon name="mdi:twitter" class="h-6 w-6" />
                </a>
                <a 
                  href="https://instagram.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 bg-gray-800 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Follow us on Instagram"
                >
                  <Icon name="mdi:instagram" class="h-6 w-6" />
                </a>
                <a 
                  href="https://youtube.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Icon name="mdi:youtube" class="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul class="space-y-4">
                <li>
                  <NuxtLink 
                    to="/about" 
                    class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    active-class="text-red-400"
                  >
                    <Icon name="heroicons:information-circle" class="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    About Us
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/products" 
                    class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    active-class="text-red-400"
                  >
                    <Icon name="heroicons:shopping-bag" class="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    Products
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/blog" 
                    class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    active-class="text-red-400"
                  >
                    <Icon name="heroicons:document-text" class="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    Blog
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/gallery" 
                    class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    active-class="text-red-400"
                  >
                    <Icon name="heroicons:photo" class="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    Gallery
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/contact" 
                    class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    active-class="text-red-400"
                  >
                    <Icon name="heroicons:envelope" class="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    Contact Us
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/donate" 
                    class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group font-semibold"
                    active-class="text-red-400"
                  >
                    <Icon name="heroicons:heart" class="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    Donate
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
          
          <!-- Contact Info -->
          <div>
            <h4 class="text-lg font-semibold mb-6 text-white">Contact Info</h4>
            <div class="space-y-4">
              <div class="flex items-start space-x-3 group">
                <Icon name="heroicons:map-pin" class="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <p class="text-gray-300 text-sm font-medium">Location</p>
                  <p class="text-gray-400 text-sm">Baringo County, Kenya</p>
                </div>
              </div>
              <div class="flex items-start space-x-3 group">
                <Icon name="heroicons:phone" class="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <p class="text-gray-300 text-sm font-medium">Phone</p>
                  <a href="tel:+254732847605" class="text-gray-400 text-sm hover:text-white transition-colors duration-200">
                    +254 732 847 605
                  </a>
                </div>
              </div>
              <div class="flex items-start space-x-3 group">
                <Icon name="heroicons:envelope" class="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <p class="text-gray-300 text-sm font-medium">Email</p>
                  <a href="mailto:smile4smileinnitiative@gmail.com" class="text-gray-400 text-sm hover:text-white transition-colors duration-200 break-all">
                    smile4smileinnitiative@gmail.com
                  </a>
                </div>
              </div>
              <div class="flex items-start space-x-3 group">
                <Icon name="heroicons:clock" class="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <p class="text-gray-300 text-sm font-medium">Hours</p>
                  <p class="text-gray-400 text-sm">Mon - Fri: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 py-8">
        <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div class="text-center lg:text-left">
            <p class="text-gray-400 text-sm mb-2">
              © {{ currentYear }} Illchamus Community CBO. All Rights Reserved.
            </p>
            <p class="text-gray-500 text-xs">
              Registered Community-Based Organization in Kenya
            </p>
          </div>
          <div class="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
            <a 
              href="#" 
              class="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
              @click.prevent="scrollToTop"
            >
              Back to Top
            </a>
            <a 
              href="#" 
              class="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              class="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              class="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

// Newsletter functionality
const newsletterEmail = ref('')
const isSubmitting = ref(false)
const newsletterMessage = ref('')
const newsletterSuccess = ref(false)

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value.trim()) return
  
  isSubmitting.value = true
  newsletterMessage.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, you would make an API call here
    newsletterSuccess.value = true
    newsletterMessage.value = 'Thank you for subscribing! You\'ll receive updates about our community work.'
    newsletterEmail.value = ''
  } catch (error) {
    newsletterSuccess.value = false
    newsletterMessage.value = 'Sorry, there was an error. Please try again later.'
  } finally {
    isSubmitting.value = false
    
    // Clear message after 5 seconds
    setTimeout(() => {
      newsletterMessage.value = ''
    }, 5000)
  }
}

// Current year for copyright
const currentYear = computed(() => new Date().getFullYear())

// Scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo and Description -->
        <div class="lg:col-span-2">
          <h3 class="text-3xl font-bold gradient-text mb-4">
            Illchamus CBO
          </h3>
          <p class="text-gray-300 mb-6 max-w-md leading-relaxed">
            Preserving Illchamus culture and empowering our community through education, support, and sustainable development in Baringo County, Kenya.
          </p>
          
          <!-- Social Media Links -->
          <div class="flex space-x-4">
            <a 
              href="https://facebook.com/" 
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Icon name="mdi:facebook" class="h-5 w-5" />
            </a>
            <a 
              href="https://x.com/" 
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Icon name="mdi:twitter" class="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/" 
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Icon name="mdi:instagram" class="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 gradient-text">Quick Links</h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/about" class="text-gray-300 hover:text-white transition-colors duration-200">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products" class="text-gray-300 hover:text-white transition-colors duration-200">
                Products
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-gray-300 hover:text-white transition-colors duration-200">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/gallery" class="text-gray-300 hover:text-white transition-colors duration-200">
                Gallery
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-300 hover:text-white transition-colors duration-200">
                Contact Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/donate" class="text-gray-300 hover:text-white transition-colors duration-200">
                Donate
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Contact Info</h4>
          <div class="space-y-3">
            <div class="flex items-start space-x-3">
              <Icon name="mdi:map-marker" class="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <p class="text-gray-300 text-sm">
                Baringo County, Kenya
              </p>
            </div>
            <div class="flex items-start space-x-3">
              <Icon name="mdi:phone" class="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <p class="text-gray-300 text-sm">+254 732 847 605</p>
            </div>
            <div class="flex items-start space-x-3">
              <Icon name="mdi:email" class="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <p class="text-gray-300 text-sm">smile4smileinnitiative@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-gray-400 text-sm">
            © 2025 Illchamus Community CBO. All Rights Reserved.
          </p>
          <div class="flex space-x-6 text-sm">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional logic needed for this component
</script>

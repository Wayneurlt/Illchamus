<template>
  <section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Get in <span class="gradient-text">Touch</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          We'd love to hear from you. Reach out to us for more information about our programs or to get involved.
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl p-8 shadow-lg">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 resize-none"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full gradient-bg text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center justify-center">
                <Icon name="heroicons:arrow-path" class="h-5 w-5 animate-spin mr-2" />
                Sending...
              </span>
            </button>
          </form>
        </div>
        
        <!-- Contact Information -->
        <div class="space-y-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="heroicons:map-pin" class="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-1">Location</h4>
                  <p class="text-gray-600">Baringo County, Kenya</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="heroicons:phone" class="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                  <p class="text-gray-600">+254 700 000 000</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="heroicons:envelope" class="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                  <p class="text-gray-600">info@illchamus.org</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Map Placeholder -->
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>
            <div class="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Baringo County, Kenya"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <p class="text-sm font-medium">Baringo County, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    message: ''
  }
  
  isSubmitting.value = false
  
  // Show success message (you can integrate with a notification system)
  alert('Thank you for your message! We will get back to you soon.')
}
</script>

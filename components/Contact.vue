<template>
  <section id="contact" class="py-20 bg-gradient-to-br from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Get in <span class="gradient-text">Touch</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          We'd love to hear from you. Reach out to us for more information about our programs or to get involved in our community work.
        </p>
        
        <!-- Contact Methods -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <div class="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Icon name="heroicons:phone" class="h-5 w-5 text-red-600" />
            <span class="text-gray-700 font-medium">+254 732 847 605</span>
          </div>
          <div class="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Icon name="heroicons:envelope" class="h-5 w-5 text-red-600" />
            <span class="text-gray-700 font-medium">smile4smileinnitiative@gmail.com</span>
          </div>
          <div class="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Icon name="heroicons:map-pin" class="h-5 w-5 text-red-600" />
            <span class="text-gray-700 font-medium">Baringo County, Kenya</span>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
          
          <!-- Success/Error Messages -->
          <div v-if="message" class="mb-6 p-4 rounded-lg" :class="messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
            <div class="flex items-center">
              <Icon :name="messageType === 'success' ? 'heroicons:check-circle' : 'heroicons:exclamation-triangle'" class="h-5 w-5 mr-2" />
              {{ message }}
            </div>
          </div>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Your first name"
                />
              </div>
              
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Your last name"
                />
              </div>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                placeholder="+254 700 000 000"
              />
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="volunteer">Volunteer Opportunity</option>
                <option value="donation">Donation Information</option>
                <option value="partnership">Partnership</option>
                <option value="program">Program Information</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200 resize-none"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            
            <div class="flex items-start space-x-3">
              <input
                id="consent"
                v-model="form.consent"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label for="consent" class="text-sm text-gray-600">
                I agree to the <a href="#" class="text-red-600 hover:underline">terms and conditions</a> and <a href="#" class="text-red-600 hover:underline">privacy policy</a>.
              </label>
            </div>
            
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Icon v-if="isSubmitting" name="heroicons:arrow-path" class="h-5 w-5 animate-spin mr-2" />
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
        
        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Contact Details -->
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4 group">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors duration-200">
                  <Icon name="heroicons:map-pin" class="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-1">Location</h4>
                  <p class="text-gray-600">Baringo County, Kenya</p>
                  <p class="text-sm text-gray-500">East Africa</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 group">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors duration-200">
                  <Icon name="heroicons:phone" class="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                  <a href="tel:+254732847605" class="text-gray-600 hover:text-red-600 transition-colors duration-200">+254 732 847 605</a>
                  <p class="text-sm text-gray-500">Mon-Fri, 8AM-5PM EAT</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 group">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors duration-200">
                  <Icon name="heroicons:envelope" class="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                  <a href="mailto:smile4smileinnitiative@gmail.com" class="text-gray-600 hover:text-red-600 transition-colors duration-200 break-all">smile4smileinnitiative@gmail.com</a>
                  <p class="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Social Media -->
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
            <div class="grid grid-cols-2 gap-4">
              <a 
                href="https://facebook.com/" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
              >
                <Icon name="mdi:facebook" class="h-6 w-6 text-blue-600" />
                <span class="text-gray-700 font-medium">Facebook</span>
              </a>
              <a 
                href="https://instagram.com/" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-200 group"
              >
                <Icon name="mdi:instagram" class="h-6 w-6 text-pink-600" />
                <span class="text-gray-700 font-medium">Instagram</span>
              </a>
              <a 
                href="https://x.com/" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
              >
                <Icon name="mdi:twitter" class="h-6 w-6 text-gray-600" />
                <span class="text-gray-700 font-medium">Twitter</span>
              </a>
              <a 
                href="https://wa.me/254732847605" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-200 group"
              >
                <Icon name="mdi:whatsapp" class="h-6 w-6 text-green-600" />
                <span class="text-gray-700 font-medium">WhatsApp</span>
              </a>
            </div>
          </div>
          
          <!-- Map Placeholder -->
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
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
                <p class="text-xs text-white/80">East Africa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Reactive state
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
})

const isSubmitting = ref(false)
const message = ref('')
const messageType = ref('')

// Form validation
const validateForm = () => {
  if (!form.value.firstName.trim()) {
    showMessage('Please enter your first name', 'error')
    return false
  }
  if (!form.value.lastName.trim()) {
    showMessage('Please enter your last name', 'error')
    return false
  }
  if (!form.value.email.trim()) {
    showMessage('Please enter your email address', 'error')
    return false
  }
  if (!isValidEmail(form.value.email)) {
    showMessage('Please enter a valid email address', 'error')
    return false
  }
  if (!form.value.subject) {
    showMessage('Please select a subject', 'error')
    return false
  }
  if (!form.value.message.trim()) {
    showMessage('Please enter your message', 'error')
    return false
  }
  if (form.value.message.trim().length < 10) {
    showMessage('Please enter a message with at least 10 characters', 'error')
    return false
  }
  if (!form.value.consent) {
    showMessage('Please agree to the terms and conditions', 'error')
    return false
  }
  return true
}

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Show message
const showMessage = (text, type) => {
  message.value = text
  messageType.value = type
  
  // Clear message after 5 seconds
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 5000)
}

// Submit form
const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  message.value = ''
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    }
    
    showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success')
  } catch (error) {
    showMessage('Sorry, there was an error sending your message. Please try again later.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

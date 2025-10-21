<template>
  <div>
    <Navbar />

    <!-- Hero Section -->
    <section class="pt-32 pb-16 bg-gradient-to-br from-red-50 via-orange-50 to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Get In <span class="gradient-text">Touch</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We'd love to hear from you! Whether you want to volunteer, partner with us, or support our community work, 
            we're here to help and answer any questions you might have.
          </p>
          
          <!-- Contact Methods -->
          <div class="flex flex-wrap justify-center gap-4 mb-8">
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
          
          <!-- Tags -->
          <div class="flex flex-wrap justify-center gap-3">
            <span class="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold">Partnerships</span>
            <span class="px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-semibold">Volunteering</span>
            <span class="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold">Donations</span>
            <span class="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold">Programs</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <!-- Success/Error Messages -->
            <div v-if="message" class="mb-6 p-4 rounded-lg" :class="messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
              <div class="flex items-center">
                <Icon :name="messageType === 'success' ? 'heroicons:check-circle' : 'heroicons:exclamation-triangle'" class="h-5 w-5 mr-2" />
                {{ message }}
              </div>
            </div>
            
            <form @submit.prevent="onSubmit" class="space-y-6">
              <!-- Name fields -->
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
                  <p v-if="errors.firstName" class="mt-2 text-xs text-red-600">{{ errors.firstName }}</p>
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
                  <p v-if="errors.lastName" class="mt-2 text-xs text-red-600">{{ errors.lastName }}</p>
                </div>
              </div>
              
              <!-- Contact fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  <p v-if="errors.email" class="mt-2 text-xs text-red-600">{{ errors.email }}</p>
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
              </div>
              
              <!-- Subject field -->
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
                  <option value="partnership">Partnership</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donation">Donation</option>
                  <option value="program">Program Information</option>
                  <option value="general">General Inquiry</option>
                </select>
                <p v-if="errors.subject" class="mt-2 text-xs text-red-600">{{ errors.subject }}</p>
              </div>
              
              <!-- Message field -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label for="message" class="block text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <span class="text-sm text-gray-500">{{ form.message.length }}/1000</span>
                </div>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  maxlength="1000"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
                <p v-if="errors.message" class="mt-2 text-xs text-red-600">{{ errors.message }}</p>
              </div>
              
              <!-- Consent checkbox -->
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
              <p v-if="errors.consent" class="text-xs text-red-600">{{ errors.consent }}</p>
              
              <!-- Submit button -->
              <button
                type="submit"
                :disabled="submitting"
                class="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Icon v-if="submitting" name="heroicons:arrow-path" class="h-5 w-5 animate-spin mr-2" />
                {{ submitting ? 'Sending...' : 'Send Message' }}
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
            
            <!-- Response Info -->
            <div class="bg-gradient-to-r from-red-600 via-orange-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 class="text-2xl font-bold mb-4">Quick Response</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/20 rounded-lg p-4">
                  <p class="text-sm text-white/90">Response time</p>
                  <p class="text-xl font-bold">1-2 business days</p>
                </div>
                <div class="bg-white/20 rounded-lg p-4">
                  <p class="text-sm text-white/90">Office hours</p>
                  <p class="text-xl font-bold">Mon-Fri, 8AM-5PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p class="text-gray-600">Located in the heart of Baringo County, Kenya</p>
        </div>
        <div class="relative h-96 bg-gray-200 rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Baringo County, Kenya"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div class="absolute bottom-6 left-6 text-white">
            <p class="text-lg font-semibold">Baringo County, Kenya</p>
            <p class="text-sm text-white/80">East Africa</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

useHead({ 
  title: 'Contact • Illchamus Community CBO',
  meta: [
    { name: 'description', content: 'Get in touch with Illchamus Community CBO. Contact us for partnerships, volunteering opportunities, donations, or general inquiries.' },
    { name: 'keywords', content: 'contact Illchamus, community organization, Baringo County, Kenya, partnerships, volunteering, donations' }
  ]
})

// Reactive state
const form = reactive({ 
  firstName: '', 
  lastName: '', 
  email: '', 
  phone: '', 
  subject: '', 
  message: '', 
  consent: false 
})

const errors = reactive({ 
  firstName: null, 
  lastName: null, 
  email: null, 
  subject: null, 
  message: null, 
  consent: null 
})

const submitting = ref(false)
const message = ref('')
const messageType = ref('')

// Form validation
const validate = () => {
  errors.firstName = form.firstName ? null : 'First name is required'
  errors.lastName = form.lastName ? null : 'Last name is required'
  errors.email = /.+@.+\..+/.test(form.email) ? null : 'Valid email is required'
  errors.subject = form.subject ? null : 'Please select a subject'
  errors.message = form.message && form.message.length >= 10 ? null : 'Message must be at least 10 characters'
  errors.consent = form.consent ? null : 'Please accept the terms to proceed'
  return !errors.firstName && !errors.lastName && !errors.email && !errors.subject && !errors.message && !errors.consent
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
const onSubmit = async () => {
  if (!validate()) {
    showMessage('Please fill in all required fields correctly', 'error')
    return
  }
  
  submitting.value = true
  message.value = ''
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    })
    
    showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success')
  } catch (error) {
    showMessage('Sorry, there was an error sending your message. Please try again later.', 'error')
  } finally {
    submitting.value = false
  }
}
</script>




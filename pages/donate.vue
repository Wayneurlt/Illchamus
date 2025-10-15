<template>
  <div>
    <!-- Navigation -->
    <Navbar />
    
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-br from-red-50 to-orange-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Support Our <span class="gradient-text">Mission</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Your generous donation helps us preserve Illchamus culture, support families, and build a brighter future for our community in Baringo County, Kenya.
        </p>
      </div>
    </section>

    <!-- Donation Information -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Impact Information -->
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Impact Makes a <span class="gradient-text">Difference</span>
            </h2>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">Education Support</h3>
                  <p class="text-gray-600">Help provide school supplies, uniforms, and educational resources for children in our community.</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">Healthcare Access</h3>
                  <p class="text-gray-600">Support mobile clinics and health education programs for families in remote areas.</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">Economic Development</h3>
                  <p class="text-gray-600">Fund micro-loans and training programs to help families build sustainable livelihoods.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Donation Form -->
          <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h3>
            
            <!-- Quick Amount Buttons -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-3">Select Amount (KES)</label>
              <div class="grid grid-cols-2 gap-3">
                <button 
                  v-for="amount in quickAmounts" 
                  :key="amount"
                  @click="selectedAmount = amount"
                  :class="[
                    'py-3 px-4 rounded-lg border-2 font-medium transition-colors',
                    selectedAmount === amount 
                      ? 'border-red-500 bg-red-50 text-red-600' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  ]"
                >
                  {{ formatAmount(amount) }}
                </button>
              </div>
            </div>

            <!-- Custom Amount -->
            <div class="mb-6">
              <label for="customAmount" class="block text-sm font-medium text-gray-700 mb-2">Custom Amount (KES)</label>
              <input
                id="customAmount"
                v-model="customAmount"
                type="number"
                placeholder="Enter amount"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                @input="selectedAmount = null"
              />
            </div>

            <!-- Donation Details -->
            <div class="space-y-4 mb-6">
              <div>
                <label for="donorName" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  id="donorName"
                  v-model="donorName"
                  type="text"
                  placeholder="Your full name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label for="donorEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  id="donorEmail"
                  v-model="donorEmail"
                  type="email"
                  placeholder="your.email@example.com"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label for="donorPhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  id="donorPhone"
                  v-model="donorPhone"
                  type="tel"
                  placeholder="+254 XXX XXX XXX"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <!-- Donate Button -->
            <button
              @click="processDonation"
              :disabled="!canDonate"
              :class="[
                'w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors',
                canDonate
                  ? 'btn-maasai hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              {{ donationAmount > 0 ? `Donate ${formatAmount(donationAmount)}` : 'Select Amount to Donate' }}
            </button>

            <!-- Payment Methods Info -->
            <div class="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">Payment Methods</h4>
              <p class="text-sm text-gray-600 mb-3">We accept the following payment methods:</p>
              <div class="flex space-x-4 text-sm text-gray-600">
                <span>• M-Pesa</span>
                <span>• Bank Transfer</span>
                <span>• PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Alternative Donation Methods -->
    <section class="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Other Ways to <span class="gradient-text">Support</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            There are many ways you can help our community beyond monetary donations.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Volunteer -->
          <div class="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Volunteer</h3>
            <p class="text-gray-600 mb-4">Join our programs and make a direct impact in our community.</p>
            <button class="btn-maasai px-6 py-2 rounded-lg font-medium">
              Learn More
            </button>
          </div>

          <!-- Spread the Word -->
          <div class="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Spread the Word</h3>
            <p class="text-gray-600 mb-4">Share our mission with friends and family to raise awareness.</p>
            <button class="btn-maasai px-6 py-2 rounded-lg font-medium">
              Share Now
            </button>
          </div>

          <!-- Partner With Us -->
          <div class="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Partner With Us</h3>
            <p class="text-gray-600 mb-4">Organizations and businesses can partner with us for greater impact.</p>
            <button class="btn-maasai px-6 py-2 rounded-lg font-medium">
              Partner Now
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
// Set page title and meta
useHead({
  title: 'Donate - Illchamus Community CBO',
  meta: [
    { name: 'description', content: 'Support Illchamus Community CBO through donations. Help us preserve culture, support families, and build a brighter future in Baringo County, Kenya.' }
  ]
})

// Reactive data
const selectedAmount = ref(null)
const customAmount = ref('')
const donorName = ref('')
const donorEmail = ref('')
const donorPhone = ref('')

// Quick donation amounts
const quickAmounts = [1000, 2500, 5000, 10000, 25000, 50000]

// Computed properties
const donationAmount = computed(() => {
  return selectedAmount.value || (customAmount.value ? parseInt(customAmount.value) : 0)
})

const canDonate = computed(() => {
  return donationAmount.value > 0 && donorName.value.trim() && donorEmail.value.trim()
})

// Methods
const formatAmount = (amount) => {
  return `KES ${amount.toLocaleString()}`
}

const processDonation = () => {
  if (!canDonate.value) return
  
  // Here you would integrate with your payment processor
  console.log('Processing donation:', {
    amount: donationAmount.value,
    donorName: donorName.value,
    donorEmail: donorEmail.value,
    donorPhone: donorPhone.value
  })
  
  // For now, show success message
  alert(`Thank you for your donation of ${formatAmount(donationAmount.value)}! We will contact you shortly with payment instructions.`)
  
  // Reset form
  selectedAmount.value = null
  customAmount.value = ''
  donorName.value = ''
  donorEmail.value = ''
  donorPhone.value = ''
}
</script>
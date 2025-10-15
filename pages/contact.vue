<template>
  <div>
    <Navbar />

    <section class="pt-28 pb-12 bg-gradient-to-b from-orange-50/60 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Get In Touch</h1>
        <p class="mt-4 text-gray-700 max-w-3xl">Tell us a bit about yourself and how we can help. We typically reply within 1–2 business days.</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <span class="px-3 py-1 rounded-full text-xs font-semibold text-white btn-maasai">Partnerships</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold text-white btn-maasai">Volunteering</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold text-white btn-maasai">Donations</span>
        </div>
      </div>
    </section>

    <section class="pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
        <!-- Contact details -->
        <div class="rounded-2xl border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900">Reach us directly</h2>
          <div class="mt-4 space-y-4 text-gray-700">
            <div class="flex items-start gap-3"><Icon name="mdi:map-marker" class="h-5 w-5 text-purple-600 mt-0.5" /><span>Baringo County, Kenya</span></div>
            <div class="flex items-start gap-3"><Icon name="mdi:phone" class="h-5 w-5 text-purple-600 mt-0.5" /><span>+254 732 847 605</span></div>
            <div class="flex items-start gap-3"><Icon name="mdi:email" class="h-5 w-5 text-purple-600 mt-0.5" /><span>smile4smileinnitiative@gmail.com</span></div>
          </div>
          <div class="mt-6 flex gap-3">
            <a href="https://facebook.com/" class="px-3 py-2 rounded-lg text-sm font-semibold text-white btn-maasai">Facebook</a>
            <a href="https://instagram.com/" class="px-3 py-2 rounded-lg text-sm font-semibold text-white btn-maasai">Instagram</a>
          </div>
          <div class="mt-6 grid grid-cols-2 gap-3">
            <div class="rounded-xl border border-orange-100 p-4 bg-orange-50/30">
              <p class="text-xs text-gray-600">Response time</p>
              <p class="font-semibold text-gray-900">1–2 business days</p>
            </div>
            <div class="rounded-xl border border-orange-100 p-4 bg-orange-50/30">
              <p class="text-xs text-gray-600">Office hours</p>
              <p class="font-semibold text-gray-900">Mon–Fri, 9am–5pm</p>
            </div>
          </div>
        </div>

        <!-- Contact form with enhanced UI & validation -->
        <form @submit.prevent="onSubmit" class="rounded-2xl border border-gray-200 p-8 bg-white">
          <div v-if="success" class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">Thanks! Your email app will open with your message prefilled.</div>

          <h3 class="text-xl font-bold text-gray-900 mb-6">Your Details</h3>
          <div class="space-y-6">
            <!-- Name fields row -->
            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-base font-semibold text-gray-800 mb-2" for="firstName">First Name</label>
                <div class="relative">
                  <Icon name="heroicons:user-20-solid" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input id="firstName" v-model="form.firstName" type="text" required class="w-full pl-9 pr-4 py-3 text-base text-gray-900 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="Enter your first name" autofocus />
                </div>
                <p v-if="errors.firstName" class="mt-2 text-xs text-red-600">{{ errors.firstName }}</p>
              </div>
              <div>
                <label class="block text-base font-semibold text-gray-800 mb-2" for="lastName">Last Name</label>
                <div class="relative">
                  <Icon name="heroicons:user-20-solid" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input id="lastName" v-model="form.lastName" type="text" required class="w-full pl-9 pr-4 py-3 text-base text-gray-900 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="Enter your last name" />
                </div>
                <p v-if="errors.lastName" class="mt-2 text-xs text-red-600">{{ errors.lastName }}</p>
              </div>
            </div>

            <!-- Contact fields row -->
            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-base font-semibold text-gray-800 mb-2" for="email">Email Address</label>
                <div class="relative">
                  <Icon name="heroicons:envelope-20-solid" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input id="email" v-model="form.email" type="email" required class="w-full pl-9 pr-4 py-3 text-base text-gray-900 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="Enter your email address" />
                </div>
                <p v-if="errors.email" class="mt-2 text-xs text-red-600">{{ errors.email }}</p>
              </div>
              <div>
                <label class="block text-base font-semibold text-gray-800 mb-2" for="phone">Phone Number <span class="text-gray-500 font-normal">(Optional)</span></label>
                <div class="relative">
                  <Icon name="heroicons:phone-20-solid" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input id="phone" v-model="form.phone" type="tel" class="w-full pl-9 pr-4 py-3 text-base text-gray-900 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="Enter your phone number" />
                </div>
              </div>
            </div>

            <!-- Subject field -->
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Your Message</h3>
              <label class="block text-base font-semibold text-gray-800 mb-2" for="subject">Subject</label>
              <select id="subject" v-model="form.subject" required class="w-full px-4 py-3 text-base text-gray-900 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                <option disabled value="">Select a subject</option>
                <option>Partnership</option>
                <option>Volunteering</option>
                <option>Donation</option>
                <option>General</option>
              </select>
              <p v-if="errors.subject" class="mt-2 text-xs text-red-600">{{ errors.subject }}</p>
            </div>

            <!-- Message field -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-base font-semibold text-gray-800" for="message">Message</label>
                <span class="text-sm text-gray-600 font-medium">{{ form.message.length }}/1000</span>
              </div>
              <textarea id="message" v-model="form.message" rows="6" maxlength="1000" required class="w-full px-4 py-3 text-base text-gray-900 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="Tell us how we can help you..." />
              <p v-if="errors.message" class="mt-2 text-xs text-red-600">{{ errors.message }}</p>
            </div>

            <!-- Honey pot -->
            <input v-model="form._hp" type="text" class="hidden" tabindex="-1" autocomplete="off" />

            <!-- Consent checkbox -->
            <div class="flex items-start gap-3 pt-2">
              <input id="consent" v-model="form.consent" type="checkbox" class="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-0.5" />
              <label for="consent" class="text-base text-gray-800 leading-relaxed font-medium">I agree to the terms and privacy policy</label>
            </div>
            <p v-if="errors.consent" class="text-xs text-red-600">{{ errors.consent }}</p>
          </div>
          <!-- reCAPTCHA placeholder -->
          <div class="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4 text-base text-gray-700 font-medium">Security verification will appear here</div>

          <div class="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" :disabled="submitting" class="inline-flex items-center px-5 py-3 rounded-lg text-sm font-semibold text-white btn-maasai transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              <Icon name="heroicons:paper-airplane-20-solid" class="mr-2 h-4 w-4" />
              {{ submitting ? 'Sending…' : 'Send Message' }}
            </button>
            <a href="mailto:smile4smileinnitiative@gmail.com" class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200">Email us directly</a>
            <a href="tel:+254732847605" class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200">Call us</a>
            <a href="https://wa.me/254732847605" target="_blank" rel="noopener" class="px-4 py-2 rounded-lg text-sm font-semibold text-white btn-maasai">WhatsApp</a>
          </div>
        </form>
      </div>
    </section>

    <!-- Map placeholder -->
    <section class="pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="h-64 rounded-2xl border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-600">Map placeholder</div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact • Illchamus Community CBO' })
const form = reactive({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', _hp: '', consent: false })
const errors = reactive<{ [k: string]: string | null }>({ firstName: null, lastName: null, email: null, subject: null, message: null, consent: null })
const submitting = ref(false)
const success = ref(false)

const validate = () => {
  errors.firstName = form.firstName ? null : 'First name is required'
  errors.lastName = form.lastName ? null : 'Last name is required'
  errors.email = /.+@.+\..+/.test(form.email) ? null : 'Valid email is required'
  errors.subject = form.subject ? null : 'Please select a subject'
  errors.message = form.message && form.message.length >= 10 ? null : 'Message must be at least 10 characters'
  errors.consent = form.consent ? null : 'Please accept the terms to proceed'
  return !errors.firstName && !errors.lastName && !errors.email && !errors.subject && !errors.message && !errors.consent
}

const onSubmit = () => {
  if (!validate()) return
  submitting.value = true
  if (form._hp) { submitting.value = false; return } // honey pot
  const subject = encodeURIComponent(`Website Contact — ${form.subject || 'Illchamus'}`)
  const body = encodeURIComponent(`Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone || '-'}\n\n${form.message}`)
  const mailto = `mailto:smile4smileinnitiative@gmail.com?subject=${subject}&body=${body}`
  success.value = true
  setTimeout(() => {
    window.location.href = mailto
    submitting.value = false
  }, 300)
}
</script>




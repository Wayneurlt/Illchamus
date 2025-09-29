<template>
  <div>
    <Navbar />

    <section class="pt-28 pb-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Contact Us</h1>
        <p class="mt-4 text-gray-600 max-w-3xl">We'd love to hear from you. Reach out to partner, volunteer, or ask questions.</p>
      </div>
    </section>

    <section class="pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
        <!-- Contact details -->
        <div class="rounded-2xl border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900">Get in touch</h2>
          <div class="mt-4 space-y-4 text-gray-700">
            <div class="flex items-start gap-3"><Icon name="mdi:map-marker" class="h-5 w-5 text-purple-600 mt-0.5" /><span>Baringo County, Kenya</span></div>
            <div class="flex items-start gap-3"><Icon name="mdi:phone" class="h-5 w-5 text-purple-600 mt-0.5" /><span>+254 732 847 605</span></div>
            <div class="flex items-start gap-3"><Icon name="mdi:email" class="h-5 w-5 text-purple-600 mt-0.5" /><span>smile4smileinnitiative@gmail.com</span></div>
          </div>
          <div class="mt-6 flex gap-3">
            <a href="https://facebook.com/" class="px-3 py-2 rounded-lg text-sm font-semibold text-white btn-maasai">Facebook</a>
            <a href="https://instagram.com/" class="px-3 py-2 rounded-lg text-sm font-semibold text-white btn-maasai">Instagram</a>
          </div>
        </div>

        <!-- Contact form with enhanced UI & validation -->
        <form @submit.prevent="onSubmit" class="rounded-2xl border border-gray-200 p-6 bg-white">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700" for="firstName">First name</label>
              <div class="relative mt-1">
                <Icon name="heroicons:user-20-solid" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input id="firstName" v-model="form.firstName" type="text" required class="w-full pl-9 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="Jane" />
              </div>
              <p v-if="errors.firstName" class="mt-1 text-xs text-red-600">{{ errors.firstName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700" for="lastName">Last name</label>
              <div class="relative mt-1">
                <Icon name="heroicons:user-20-solid" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input id="lastName" v-model="form.lastName" type="text" required class="w-full pl-9 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="Doe" />
              </div>
              <p v-if="errors.lastName" class="mt-1 text-xs text-red-600">{{ errors.lastName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
              <div class="relative mt-1">
                <Icon name="heroicons:envelope-20-solid" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input id="email" v-model="form.email" type="email" required class="w-full pl-9 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="you@example.com" />
              </div>
              <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700" for="phone">Phone (optional)</label>
              <div class="relative mt-1">
                <Icon name="heroicons:phone-20-solid" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input id="phone" v-model="form.phone" type="tel" class="w-full pl-9 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="+254 7xx xxx xxx" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700" for="subject">Subject</label>
              <select id="subject" v-model="form.subject" required class="mt-1 w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                <option disabled value="">Select a subject</option>
                <option>Partnership</option>
                <option>Volunteering</option>
                <option>Donation</option>
                <option>General</option>
              </select>
              <p v-if="errors.subject" class="mt-1 text-xs text-red-600">{{ errors.subject }}</p>
            </div>
            <div class="sm:col-span-2">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-gray-700" for="message">Message</label>
                <span class="text-xs text-gray-500">{{ form.message.length }}/1000</span>
              </div>
              <textarea id="message" v-model="form.message" rows="6" maxlength="1000" required class="mt-1 w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="How can we help?" />
              <p v-if="errors.message" class="mt-1 text-xs text-red-600">{{ errors.message }}</p>
            </div>
            <!-- Honey pot -->
            <input v-model="form._hp" type="text" class="hidden" tabindex="-1" autocomplete="off" />
            <div class="sm:col-span-2 flex items-center gap-2">
              <input id="consent" v-model="form.consent" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <label for="consent" class="text-sm text-gray-700">I agree to the terms and privacy policy</label>
            </div>
            <p v-if="errors.consent" class="sm:col-span-2 -mt-2 text-xs text-red-600">{{ errors.consent }}</p>
          </div>
          <div class="mt-5 flex flex-wrap items-center gap-3">
            <button type="submit" :disabled="submitting" class="inline-flex items-center px-5 py-3 rounded-lg text-sm font-semibold text-white btn-maasai transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              <Icon name="heroicons:paper-airplane-20-solid" class="mr-2 h-4 w-4" />
              {{ submitting ? 'Sending…' : 'Send Message' }}
            </button>
            <a href="mailto:smile4smileinnitiative@gmail.com" class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200">Email us directly</a>
            <a href="tel:+254732847605" class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200">Call us</a>
            <a href="https://wa.me/254732847605" target="_blank" rel="noopener" class="px-4 py-2 rounded-lg text-sm font-semibold text-white btn-maasai">WhatsApp</a>
          </div>
          <p v-if="success" class="mt-3 text-sm text-green-700">Thanks! Your email app will open with your message prefilled.</p>
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




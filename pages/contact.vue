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

        <!-- Contact form (UI only) -->
        <form class="rounded-2xl border border-gray-200 p-6 bg-white">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">First name</label>
              <input type="text" class="mt-1 w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="Jane" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Last name</label>
              <input type="text" class="mt-1 w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="Doe" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" class="mt-1 w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="you@example.com" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Message</label>
              <textarea rows="5" class="mt-1 w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" placeholder="How can we help?" />
            </div>
          </div>
          <button type="button" class="mt-4 inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors">Send Message</button>
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

<script setup>
useHead({ title: 'Contact • Illchamus Community CBO' })
</script>



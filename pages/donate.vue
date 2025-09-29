<template>
  <div>
    <Navbar />

    <section class="pt-28 pb-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Donate</h1>
        <p class="mt-4 text-gray-600 max-w-3xl">Your support fuels our mission. Choose a method below to contribute.</p>
      </div>
    </section>

    <!-- Donation tiers -->
    <section class="pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-6">
          <div class="rounded-2xl border border-gray-200 p-6">
            <h3 class="text-xl font-semibold text-gray-900">Supporter</h3>
            <p class="mt-2 text-sm text-gray-600">Covers school supplies for one child.</p>
            <p class="mt-4 text-3xl font-bold text-purple-700">KES 1,000</p>
            <button class="mt-6 w-full px-4 py-2 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors">Donate</button>
          </div>
          <div class="rounded-2xl border-2 border-orange-300 p-6 relative">
            <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded-full text-white btn-maasai">Recommended</span>
            <h3 class="text-xl font-semibold text-gray-900">Champion</h3>
            <p class="mt-2 text-sm text-gray-600">Funds a month of meals for a family.</p>
            <p class="mt-4 text-3xl font-bold text-purple-700">KES 5,000</p>
            <button class="mt-6 w-full px-4 py-2 rounded-lg text-sm font-semibold text-white btn-maasai transition-colors">Donate</button>
          </div>
          <div class="rounded-2xl border border-gray-200 p-6">
            <h3 class="text-xl font-semibold text-gray-900">Partner</h3>
            <p class="mt-2 text-sm text-gray-600">Supports scholarship and mentorship programs.</p>
            <p class="mt-4 text-3xl font-bold text-purple-700">KES 10,000</p>
            <button class="mt-6 w-full px-4 py-2 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors">Donate</button>
          </div>
        </div>

        <div class="mt-10 rounded-2xl border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900">Prefer direct giving?</h3>
          <p class="mt-2 text-gray-700">M-Pesa Paybill: <span class="font-semibold text-purple-700">123456</span> • Account: <span class="font-semibold text-purple-700">ILLCHAMUS</span></p>
          <p class="mt-1 text-gray-700">Bank: <span class="font-semibold">Your Bank</span> • Acc No: <span class="font-semibold">0000000000</span></p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
useHead({ title: 'Donate • Illchamus Community CBO' })
</script>



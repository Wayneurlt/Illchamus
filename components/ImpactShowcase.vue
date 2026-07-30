<template>
  <section class="py-24 lg:py-32 bg-cbo-cream">
    <div class="container-cbo">
      <div class="text-center mb-16 lg:mb-20" data-aos="fade-up">
        <h2 class="section-heading mb-4">
          Witness the <span class="gradient-text">transformation</span>
        </h2>
        <p class="section-lead mx-auto">
          Real before-and-after stories from the Illchamus community.
        </p>
      </div>

      <div class="space-y-20 lg:space-y-28">
        <div
          v-for="(story, i) in stories"
          :key="story.id"
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          :class="i % 2 === 1 ? 'lg:flex-row-reverse' : ''"
        >
          <div
            class="relative rounded-2xl overflow-hidden border border-[var(--cbo-border)] order-2"
            :class="i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'"
            :data-aos="i % 2 === 1 ? 'fade-left' : 'fade-right'"
          >
            <img
              :src="story.before"
              :alt="story.beforeAlt"
              class="w-full h-72 lg:h-80 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span class="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-neutral-800/90 text-white text-xs font-semibold uppercase">
              Before
            </span>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <h3 class="text-xl font-semibold">{{ story.beforeTitle }}</h3>
              <p class="text-sm text-white/90 mt-1">{{ story.beforeDesc }}</p>
            </div>
          </div>
          <div
            class="relative rounded-2xl overflow-hidden border border-[var(--cbo-border)] order-1"
            :class="i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'"
            :data-aos="i % 2 === 1 ? 'fade-right' : 'fade-left'"
          >
            <img
              :src="story.after"
              :alt="story.afterAlt"
              class="w-full h-72 lg:h-80 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span class="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-emerald-600/90 text-white text-xs font-semibold uppercase">
              After
            </span>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <h3 class="text-xl font-semibold">{{ story.afterTitle }}</h3>
              <p class="text-sm text-white/90 mt-1">{{ story.afterDesc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 text-center" data-aos="fade-up">
        <h3 class="section-heading mb-4">Help us create more success stories</h3>
        <p class="section-lead mx-auto mb-8">
          Your support enables us to transform more lives and expand our impact.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/donate" class="btn-cbo px-8 py-3 rounded-full text-base inline-flex justify-center">
            Donate
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-cbo-outline px-8 py-3 rounded-full text-base inline-flex justify-center">
            Partner with us
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stories = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    beforeAlt: "Limited educational resources",
    beforeTitle: "Limited resources",
    beforeDesc: "Students studying under difficult conditions with limited materials",
    after: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    afterAlt: "Modern learning environment",
    afterTitle: "Thriving students",
    afterDesc: "Modern classrooms, computers, and engaged learning with 95% success rate",
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    beforeAlt: "Limited healthcare access",
    beforeTitle: "Healthcare gap",
    beforeDesc: "Families traveling 50+ km for basic medical care",
    after: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    afterAlt: "Mobile health clinics",
    afterTitle: "Healthcare at your doorstep",
    afterDesc: "Mobile clinics serving 12+ communities with essential care",
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    beforeAlt: "Limited economic opportunities",
    beforeTitle: "Limited opportunities",
    beforeDesc: "Few economic opportunities for community members",
    after: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    afterAlt: "Thriving businesses",
    afterTitle: "Thriving businesses",
    afterDesc: "150+ new businesses started, creating sustainable livelihoods",
  },
];
</script>

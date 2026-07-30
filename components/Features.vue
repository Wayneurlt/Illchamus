<template>
  <section id="features" class="py-24 lg:py-32 bg-cbo-cream">
    <div class="container-cbo">
      <div class="text-center mb-16 lg:mb-24" data-aos="fade-up">
        <p class="section-eyebrow">What we do together</p>
        <h2 class="section-heading mb-4">
          How our <span class="gradient-text">community</span> grows stronger
        </h2>
        <p class="section-lead mx-auto">
          From classroom to homestead, neighbours come together to support education, health, and the traditions that connect us.
        </p>
      </div>

      <div class="space-y-24 lg:space-y-32">
        <div
          v-for="(feature, i) in features"
          :key="feature.id"
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div
            class="relative rounded-2xl overflow-hidden order-2 lg:order-1"
            :class="i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'"
            :data-aos="i % 2 === 1 ? 'fade-left' : 'fade-right'"
            data-aos-duration="600"
          >
            <img
              :src="feature.image"
              :alt="feature.alt"
              class="w-full h-80 lg:h-96 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div class="absolute bottom-6 left-6 right-6 text-white">
              <p class="text-sm font-semibold text-[#fde8d8]">{{ feature.tag }}</p>
              <p class="font-display text-xl lg:text-2xl font-semibold mt-1">{{ feature.title }}</p>
            </div>
          </div>
          <div
            class="order-1 lg:order-2 space-y-6"
            :class="i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'"
            :data-aos="i % 2 === 1 ? 'fade-right' : 'fade-left'"
            data-aos-duration="600"
          >
            <span class="inline-block px-3 py-1.5 rounded-full bg-[var(--cbo-accent-soft)] text-[var(--cbo-accent)] text-sm font-bold">
              {{ feature.badge }}
            </span>
            <h3 class="font-display text-2xl lg:text-3xl font-semibold text-[var(--cbo-ink)]">
              {{ feature.heading }}
            </h3>
            <p class="text-[var(--cbo-muted)] leading-relaxed text-[15px] lg:text-base">
              {{ feature.description }}
            </p>
            <div v-if="feature.stats" class="grid grid-cols-2 gap-4 pt-2">
              <div
                v-for="stat in feature.stats"
                :key="stat.label"
                class="rounded-xl border border-[var(--cbo-border)] p-4 lg:p-5"
              >
                <p class="text-2xl font-semibold text-[var(--cbo-ink)]">{{ stat.value }}</p>
                <p class="text-sm text-[var(--cbo-muted)] mt-1">{{ stat.label }}</p>
              </div>
            </div>
            <NuxtLink
              :to="feature.ctaTo"
              class="inline-flex items-center gap-2 text-[var(--cbo-accent)] font-medium hover:underline text-[15px]"
            >
              {{ feature.cta }}
              <Icon name="heroicons:arrow-right" class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div
        class="mt-24 lg:mt-32 rounded-2xl cta-community p-8 md:p-12 lg:p-16 text-center"
        data-aos="fade-up"
      >
        <h3 class="font-display text-2xl lg:text-3xl font-semibold text-[#faf6f0] mb-4 relative z-10">
          Every hand makes a difference
        </h3>
        <p class="text-[#d4c4b5] max-w-2xl mx-auto mb-8 text-[15px] leading-relaxed relative z-10">
          Whether you give time, resources, or encouragement—you belong in this community story.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <NuxtLink to="/donate" class="btn-cbo px-8 py-3 text-base inline-flex justify-center">
            Give with heart
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-cbo-outline border-[#faf6f0] text-[#faf6f0] hover:bg-[#faf6f0] hover:text-[var(--cbo-earth-dark)] px-8 py-3 text-base inline-flex justify-center">
            Volunteer with us
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    id: 1,
    badge: "Education",
    tag: "Our children",
    title: "Transforming Education",
    heading: "Building bright futures through education",
    description:
      "We provide scholarships, school supplies, and mentorship so every child has access to quality education. Our computer literacy programs prepare students for the digital age.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    alt: "Education in Illchamus community",
    cta: "Learn more about our programs",
    ctaTo: "/about",
    stats: [
      { value: "350+", label: "Students supported" },
      { value: "95%", label: "Success rate" },
    ],
  },
  {
    id: 2,
    badge: "Healthcare",
    tag: "Our families",
    title: "Healthcare for All",
    heading: "Bringing healthcare to remote communities",
    description:
      "Our mobile health clinics reach remote areas with essential medical services, maternal health support, and health education for families who need it most.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    alt: "Healthcare in the community",
    cta: "Explore our health initiatives",
    ctaTo: "/about",
    stats: null,
  },
  {
    id: 3,
    badge: "Culture",
    tag: "Our heritage",
    title: "Preserving Our Heritage",
    heading: "Celebrating and preserving Illchamus culture",
    description:
      "Through cultural festivals, traditional arts, and storytelling, we keep our heritage alive for future generations while embracing modern opportunities.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    alt: "Cultural preservation",
    cta: "View our cultural gallery",
    ctaTo: "/gallery",
    stats: null,
  },
];
</script>

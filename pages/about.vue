<template>
  <div>
    <PageHero lead="We champion Illchamus heritage while advancing education, wellness, and sustainable livelihoods across Baringo County, Kenya." lead-class="text-lg">
      <template #title>
        Preserving <span class="gradient-text">culture</span>. Empowering <span class="gradient-text">community</span>.
      </template>
    </PageHero>

    <section class="py-24 lg:py-32 bg-cbo-warm">
      <div class="container-cbo">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div data-aos="fade-right">
            <h2 class="section-heading mb-6">
              Our <span class="gradient-text">mission</span>
            </h2>
            <p class="text-[var(--cbo-muted)] leading-relaxed mb-8 text-[15px] lg:text-base">
              To protect our heritage and enable every child and family to thrive through inclusive education, mental wellness support, and community-driven development.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-6 text-center" data-aos="fade-up" data-aos-delay="100">
                <p class="text-2xl lg:text-3xl font-semibold text-[var(--cbo-accent)]">5,000+</p>
                <p class="text-sm text-[var(--cbo-muted)] mt-1">Lives impacted</p>
              </div>
              <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-6 text-center" data-aos="fade-up" data-aos-delay="150">
                <p class="text-2xl lg:text-3xl font-semibold text-[var(--cbo-accent)]">350+</p>
                <p class="text-sm text-[var(--cbo-muted)] mt-1">Students supported</p>
              </div>
              <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-6 text-center" data-aos="fade-up" data-aos-delay="200">
                <p class="text-2xl lg:text-3xl font-semibold text-[var(--cbo-accent)]">12</p>
                <p class="text-sm text-[var(--cbo-muted)] mt-1">Communities reached</p>
              </div>
            </div>
          </div>
          <div class="rounded-2xl cta-community p-8 lg:p-10" data-aos="fade-left">
            <h3 class="text-xl lg:text-2xl font-semibold tracking-tight mb-6">Our story</h3>
            <p class="text-neutral-400 leading-relaxed mb-6 text-[15px]">
              Born from a simple visit to a children's home, our journey has grown into a community-driven initiative. We partner with local schools, provide scholarships and mentorship, and integrate mental health support so learning and wellbeing flourish together.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3 text-neutral-300 text-[15px]">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--cbo-accent)] mt-1.5 shrink-0" />
                Scholarships and school essentials
              </li>
              <li class="flex items-start gap-3 text-neutral-300 text-[15px]">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--cbo-accent)] mt-1.5 shrink-0" />
                Computer literacy and vocational training
              </li>
              <li class="flex items-start gap-3 text-neutral-300 text-[15px]">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--cbo-accent)] mt-1.5 shrink-0" />
                Integrated mental wellness support
              </li>
            </ul>
            <NuxtLink to="/donate" class="btn-cbo inline-flex px-6 py-2.5 rounded-full text-sm">
              Join our mission
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-32 bg-cbo-cream">
      <div class="container-cbo">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="section-heading mb-4">Our <span class="gradient-text">values</span></h2>
          <p class="section-lead mx-auto">These principles guide everything we do in service of the Illchamus community.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="rounded-2xl border border-[var(--cbo-border)] p-8 card-hover" data-aos="fade-up" data-aos-delay="0">
            <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mb-6">
              <Icon name="heroicons:heart" class="h-6 w-6 text-[var(--cbo-accent)]" />
            </div>
            <h4 class="text-lg font-semibold text-[var(--cbo-ink)] mb-3">Culture & identity</h4>
            <p class="text-[var(--cbo-muted)] text-[15px] leading-relaxed">We preserve Illchamus heritage through language, arts, and storytelling for future generations.</p>
          </div>
          <div class="rounded-2xl border border-[var(--cbo-border)] p-8 card-hover" data-aos="fade-up" data-aos-delay="80">
            <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mb-6">
              <Icon name="heroicons:academic-cap" class="h-6 w-6 text-[var(--cbo-accent)]" />
            </div>
            <h4 class="text-lg font-semibold text-[var(--cbo-ink)] mb-3">Education first</h4>
            <p class="text-[var(--cbo-muted)] text-[15px] leading-relaxed">Access, equity, and excellence in learning for every child.</p>
          </div>
          <div class="rounded-2xl border border-[var(--cbo-border)] p-8 card-hover" data-aos="fade-up" data-aos-delay="160">
            <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mb-6">
              <Icon name="heroicons:shield-check" class="h-6 w-6 text-[var(--cbo-accent)]" />
            </div>
            <h4 class="text-lg font-semibold text-[var(--cbo-ink)] mb-3">Wellbeing</h4>
            <p class="text-[var(--cbo-muted)] text-[15px] leading-relaxed">Holistic mental, emotional, and social support for strong, resilient communities.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-32 bg-cbo-warm">
      <div class="container-cbo">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="section-heading mb-4">Our <span class="gradient-text">community</span> in action</h2>
          <p class="section-lead mx-auto">See the real impact of our programs through images from across the Illchamus community.</p>
        </div>
        <div class="mb-8 relative rounded-2xl overflow-hidden border border-[var(--cbo-border)] h-80 md:h-[420px]" data-aos="fade-up">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80"
            alt="Community gathering"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div
            v-for="(item, i) in impactGallery"
            :key="i"
            class="rounded-xl overflow-hidden border border-[var(--cbo-border)] group"
            :class="item.span ? 'md:col-span-2 md:row-span-2' : ''"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 60"
          >
            <div :class="item.span ? 'h-64 md:h-full' : 'h-40 md:h-48'">
              <img :src="item.url" :alt="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
        <div class="mt-12 text-center" data-aos="fade-up">
          <NuxtLink to="/gallery" class="btn-cbo inline-flex items-center gap-2 px-8 py-3 rounded-full text-base">
            View full gallery
            <Icon name="heroicons:arrow-right" class="h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <PageCta
      heading-before="Ready to make a "
      accent-word="difference"
      heading-after="?"
      description="Join us in preserving Illchamus culture and empowering our community. Every contribution makes an impact."
      primary-text="Donate"
      primary-to="/donate"
      secondary-text="Get involved"
      secondary-to="/contact"
    />
  </div>
</template>

<script setup>
usePageMeta('About');

const impactGallery = [
  { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", title: "Education", span: true },
  { url: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80", title: "Culture" },
  { url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80", title: "Community" },
  { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80", title: "Health" },
  { url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80", title: "Women" },
  { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80", title: "Festivals", span: true },
  { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80", title: "Farming" },
  { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80", title: "Youth" },
];
</script>

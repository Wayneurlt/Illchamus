<template>
  <div>
    <PageHero title-before="Community " gradient-word="products" title-after="" lead="Discover authentic handcrafted products from our community, supporting local artisans and sustainable livelihoods." />

    <section class="py-24 lg:py-32 bg-cbo-warm">
      <div class="container-cbo">
        <div class="text-center mb-16" data-aos="fade-up">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--cbo-accent-soft)] text-[var(--cbo-accent)] text-sm font-medium mb-8">
            <Icon name="heroicons:clock" class="h-4 w-4" />
            Coming soon
          </span>
          <h2 class="section-heading mb-4">
            Something amazing is <span class="gradient-text">brewing</span>
          </h2>
          <p class="section-lead mx-auto max-w-2xl">
            We're building a curated collection of authentic Illchamus products—from traditional beadwork to handcrafted items—to support local artisans and preserve cultural heritage.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-20">
          <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-8 card-hover" data-aos="fade-up" data-aos-delay="0">
            <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mb-6">
              <Icon name="heroicons:sparkles" class="h-6 w-6 text-[var(--cbo-accent)]" />
            </div>
            <h3 class="text-lg font-semibold text-[var(--cbo-ink)] mb-3">Traditional beadwork</h3>
            <p class="text-[var(--cbo-muted)] text-[15px] leading-relaxed">
              Authentic Maasai beadwork—necklaces, bracelets, and decorative items from skilled local artisans.
            </p>
          </div>
          <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-8 card-hover" data-aos="fade-up" data-aos-delay="80">
            <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mb-6">
              <Icon name="heroicons:heart" class="h-6 w-6 text-[var(--cbo-accent)]" />
            </div>
            <h3 class="text-lg font-semibold text-[var(--cbo-ink)] mb-3">Handcrafted textiles</h3>
            <p class="text-[var(--cbo-muted)] text-[15px] leading-relaxed">
              Shuka cloths, traditional garments, and home textiles with Illchamus patterns and colors.
            </p>
          </div>
          <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-8 card-hover" data-aos="fade-up" data-aos-delay="160">
            <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mb-6">
              <Icon name="heroicons:home" class="h-6 w-6 text-[var(--cbo-accent)]" />
            </div>
            <h3 class="text-lg font-semibold text-[var(--cbo-ink)] mb-3">Home decor</h3>
            <p class="text-[var(--cbo-muted)] text-[15px] leading-relaxed">
              Calabash bowls, traditional shields, and cultural art for modern homes.
            </p>
          </div>
        </div>

        <div class="rounded-2xl cta-community p-8 md:p-12 mb-20" data-aos="fade-up">
          <div class="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Icon name="heroicons:user-group" class="h-10 w-10 mx-auto mb-4 text-[var(--cbo-accent)]" />
              <h3 class="text-lg font-semibold mb-2">Support local artisans</h3>
              <p class="text-neutral-400 text-[15px]">Every purchase directly supports community members and their families.</p>
            </div>
            <div>
              <Icon name="heroicons:shield-check" class="h-10 w-10 mx-auto mb-4 text-[var(--cbo-accent)]" />
              <h3 class="text-lg font-semibold mb-2">Authentic products</h3>
              <p class="text-neutral-400 text-[15px]">Genuine handcrafted items preserving traditional techniques.</p>
            </div>
            <div>
              <Icon name="heroicons:globe-alt" class="h-10 w-10 mx-auto mb-4 text-[var(--cbo-accent)]" />
              <h3 class="text-lg font-semibold mb-2">Sustainable impact</h3>
              <p class="text-neutral-400 text-[15px]">Sustainable livelihoods and environmental conservation.</p>
            </div>
          </div>
        </div>

        <div class="text-center" data-aos="fade-up">
          <h3 class="section-heading mb-4">Stay updated</h3>
          <p class="section-lead mx-auto max-w-xl mb-8">
            Be the first to know when our community marketplace launches.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)] focus:border-transparent"
            />
            <button class="btn-cbo px-6 py-2.5 rounded-xl text-sm font-medium shrink-0">
              Notify me
            </button>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/contact" class="btn-cbo-outline px-8 py-3 rounded-full text-base inline-flex justify-center">
              Contact us
            </NuxtLink>
            <NuxtLink to="/donate" class="btn-cbo px-8 py-3 rounded-full text-base inline-flex justify-center">
              Support our work
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
usePageMeta('Products', "Discover authentic handcrafted products from the Illchamus community. Traditional beadwork, textiles, and cultural items supporting local artisans.");
</script>

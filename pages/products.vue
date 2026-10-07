<template>
  <div>
    <PageHero
      eyebrow="Coming soon"
      title="Crafted by our artisans"
      lead="Authentic handcrafted products from our community, supporting local artisans and sustainable livelihoods."
      :image="img(photos.acacia, 1800)"
      :crumbs="[{ label: 'Shop' }]"
    />

    <section class="py-16 sm:py-20 lg:py-24">
      <div class="shell">
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="eyebrow">The collection</p>
          <h2 class="h2 mt-3">Something special is on its way</h2>
          <p class="lead mt-4">
            We're building a curated collection of authentic Illchamus products, from traditional beadwork to handcrafted
            items, to support local artisans and preserve our cultural heritage.
          </p>
        </div>

        <div class="mt-10 lg:mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          <article
            v-for="(item, i) in collections"
            :key="item.title"
            class="relative overflow-hidden rounded-[28px] p-7 sm:p-8 min-h-[280px] flex flex-col"
            :class="item.bg"
            data-aos="fade-up"
            :data-aos-delay="i * 80"
          >
            <span class="absolute -right-8 -top-8 w-36 h-36 rounded-full border-[18px] opacity-40" :class="item.ring" aria-hidden="true" />
            <span class="relative w-14 h-14 rounded-2xl bg-white flex items-center justify-center" :class="item.iconColor">
              <Icon :name="item.icon" class="h-7 w-7" />
            </span>
            <h3 class="h3 mt-auto pt-10 text-2xl">{{ item.title }}</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink/75">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="shell">
      <div class="relative overflow-hidden rounded-[28px] lg:rounded-[36px] bg-maroon text-white px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div class="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1 order-2 lg:order-1">
            <li v-for="point in promises" :key="point.title" class="flex gap-4">
              <span class="w-11 h-11 shrink-0 rounded-2xl bg-white/10 text-sun flex items-center justify-center">
                <Icon :name="point.icon" class="h-5 w-5" />
              </span>
              <span>
                <span class="block font-bold">{{ point.title }}</span>
                <span class="block mt-1 text-[15px] text-white/70">{{ point.text }}</span>
              </span>
            </li>
          </ul>

          <div class="order-1 lg:order-2 rounded-[24px] bg-white text-ink p-6 sm:p-8">
            <h2 class="text-2xl font-bold tracking-tight">Be first to know</h2>
            <p class="mt-2 text-ink-soft">We'll email you once when the marketplace opens.</p>
            <form class="mt-6 flex flex-col sm:flex-row gap-3" @submit.prevent="notify">
              <label for="notify-email" class="sr-only">Email address</label>
              <input id="notify-email" v-model="email" type="email" required autocomplete="email" placeholder="Your email address" class="field flex-1" />
              <button type="submit" class="btn btn-sun" :disabled="sending">{{ sending ? "Saving…" : "Notify me" }}</button>
            </form>
            <p v-if="done" class="mt-3 text-sm font-semibold text-leaf" role="status">Thank you! We'll let you know when we launch.</p>
          </div>
        </div>
      </div>
    </section>

    <PageCta
      title="Support artisans today"
      description="Until the shop opens, a donation is the most direct way to support the families behind our crafts."
      primary-text="Donate"
      primary-to="/donate"
      secondary-text="Contact us"
      secondary-to="/contact"
      class="mt-16 lg:mt-24"
    />
  </div>
</template>

<script setup lang="ts">
import { img, photos } from "~/data/site";

usePageMeta("Shop", "Discover authentic handcrafted products from the Illchamus community. Traditional beadwork, textiles, and cultural items supporting local artisans.");

const collections = [
  { title: "Traditional beadwork", text: "Necklaces, bracelets and decorative pieces from skilled local artisans.", icon: "heroicons:sparkles", bg: "bg-sun-soft", ring: "border-sun", iconColor: "text-maroon" },
  { title: "Handcrafted textiles", text: "Shuka cloths, garments and home textiles in Illchamus patterns and colours.", icon: "heroicons:swatch", bg: "bg-lake-soft", ring: "border-lake", iconColor: "text-[#24647c]" },
  { title: "Home & culture", text: "Calabash bowls, traditional shields and cultural art for modern homes.", icon: "heroicons:home-modern", bg: "bg-leaf-soft", ring: "border-leaf", iconColor: "text-leaf" },
];

const promises = [
  { title: "Support local artisans", text: "Every purchase directly supports community members and their families.", icon: "heroicons:user-group" },
  { title: "Authentic products", text: "Genuine handcrafted items made with traditional techniques.", icon: "heroicons:shield-check" },
  { title: "Sustainable impact", text: "Livelihoods that respect the land and Lake Baringo.", icon: "heroicons:globe-europe-africa" },
];

const email = ref("");
const sending = ref(false);
const done = ref(false);
const notify = async () => {
  sending.value = true;
  await new Promise((r) => setTimeout(r, 800));
  sending.value = false;
  done.value = true;
  email.value = "";
};
</script>

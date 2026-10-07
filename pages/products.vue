<template>
  <div>
    <PageHero :eyebrow="t.eyebrow" :title="t.title" :lead="t.lead" :image="img(photos.acacia, 1800)" :crumbs="[{ label: m.nav.shop }]" />

    <section class="py-16 sm:py-20 lg:py-24">
      <div class="shell">
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="eyebrow">{{ t.collectionEyebrow }}</p>
          <h2 class="h2 mt-3">{{ t.collectionTitle }}</h2>
          <p class="lead mt-4">{{ t.collectionText }}</p>
        </div>

        <div class="mt-10 lg:mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          <article
            v-for="(item, i) in t.collections"
            :key="item.title"
            class="relative overflow-hidden rounded-[28px] p-7 sm:p-8 min-h-[280px] flex flex-col"
            :class="collectionStyle[i]!.bg"
            data-aos="fade-up"
            :data-aos-delay="i * 80"
          >
            <span class="absolute -right-8 -top-8 w-36 h-36 rounded-full border-[18px] opacity-40" :class="collectionStyle[i]!.ring" aria-hidden="true" />
            <span class="relative w-14 h-14 rounded-2xl bg-white flex items-center justify-center" :class="collectionStyle[i]!.iconColor">
              <Icon :name="collectionStyle[i]!.icon" class="h-7 w-7" />
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
            <li v-for="(point, i) in t.promises" :key="point.title" class="flex gap-4">
              <span class="w-11 h-11 shrink-0 rounded-2xl bg-white/10 text-sun flex items-center justify-center">
                <Icon :name="promiseIcons[i]!" class="h-5 w-5" />
              </span>
              <span>
                <span class="block font-bold">{{ point.title }}</span>
                <span class="block mt-1 text-[15px] text-white/70">{{ point.text }}</span>
              </span>
            </li>
          </ul>

          <div class="order-1 lg:order-2 rounded-[24px] bg-white text-ink p-6 sm:p-8">
            <h2 class="text-2xl font-bold tracking-tight">{{ t.notifyTitle }}</h2>
            <p class="mt-2 text-ink-soft">{{ t.notifyText }}</p>
            <form class="mt-6 flex flex-col sm:flex-row gap-3" @submit.prevent="subscribe">
              <label for="notify-email" class="sr-only">{{ m.forms.yourEmail }}</label>
              <input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
              <input id="notify-email" v-model="email" type="email" required autocomplete="email" :placeholder="m.forms.yourEmail" class="field flex-1" />
              <button type="submit" class="btn btn-sun" :disabled="sending">{{ sending ? t.saving : t.notify }}</button>
            </form>
            <p v-if="status !== 'idle'" class="mt-3 text-sm font-semibold" :class="status === 'error' ? 'text-red-700' : 'text-leaf'" role="status">
              {{ status === "error" ? error : status === "already" ? m.footer.already : t.notified }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <PageCta
      :title="t.ctaTitle"
      :description="t.ctaText"
      :primary-text="t.ctaPrimary"
      primary-to="/donate"
      :secondary-text="t.ctaSecondary"
      secondary-to="/contact"
      class="mt-16 lg:mt-24"
    />
  </div>
</template>

<script setup lang="ts">
import { img, photos } from "~/data/site";

const { m } = useLang();
const t = computed(() => m.value.products);
usePageMeta(() => t.value.metaTitle, () => t.value.metaDescription);

const collectionStyle = [
  { icon: "heroicons:sparkles", bg: "bg-sun-soft", ring: "border-sun", iconColor: "text-maroon" },
  { icon: "heroicons:swatch", bg: "bg-lake-soft", ring: "border-lake", iconColor: "text-[#24647c]" },
  { icon: "heroicons:home-modern", bg: "bg-leaf-soft", ring: "border-leaf", iconColor: "text-leaf" },
];
const promiseIcons = ["heroicons:user-group", "heroicons:shield-check", "heroicons:globe-europe-africa"];

const { email, website, sending, status, error, subscribe } = useNewsletter("shop");
</script>

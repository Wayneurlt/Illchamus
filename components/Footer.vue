<template>
  <footer class="relative overflow-hidden mt-16 lg:mt-24 bg-maroon-deep text-white rounded-t-[32px] lg:rounded-t-[48px]" role="contentinfo">
    <div class="sun-ring hidden lg:block w-[320px] h-[320px] border-[32px] -top-56 -right-48 opacity-80" aria-hidden="true" />

    <div class="shell relative pt-14 lg:pt-20">
      <!-- Newsletter -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-center pb-12 lg:pb-14 border-b border-white/10">
        <div>
          <h2 class="text-[1.75rem] sm:text-4xl font-bold tracking-tight">{{ t.newsletterTitle }}</h2>
          <p class="mt-3 text-white/70 max-w-xl">{{ t.newsletterText }}</p>
        </div>
        <form class="w-full" @submit.prevent="subscribe">
          <label for="footer-email" class="sr-only">{{ m.forms.yourEmail }}</label>
          <!-- Honeypot field for spam bots; hidden from people and screen readers. -->
          <input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:rounded-full sm:bg-white sm:p-1.5">
            <input
              id="footer-email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              :placeholder="m.forms.yourEmail"
              class="field sm:min-h-0 sm:border-0 sm:rounded-full sm:shadow-none sm:focus:shadow-none flex-1"
            />
            <button type="submit" class="btn btn-sun" :disabled="sending">
              {{ sending ? t.joining : t.subscribe }}
            </button>
          </div>
          <p v-if="status !== 'idle'" class="mt-3 text-sm" :class="status === 'error' ? 'text-red-300' : 'text-sun'" role="status">
            {{ status === "ok" ? t.subscribed : status === "already" ? t.already : error }}
          </p>
        </form>
      </div>

      <!-- Links -->
      <div class="grid grid-cols-1 gap-10 py-12 lg:py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <NuxtLink to="/" class="inline-flex items-center gap-3" :aria-label="m.nav.homeLabel">
            <LogoBadge class="w-24 h-24 shrink-0" />
            <span class="leading-tight">
              <span class="block text-lg font-extrabold tracking-tight">Illchamus Community</span>
              <span class="block text-sm text-white/60">{{ t.orgType }}</span>
            </span>
          </NuxtLink>
          <p class="mt-5 text-[15px] leading-relaxed text-white/70 max-w-sm">{{ t.about }}</p>
          <div class="mt-6 flex gap-2">
            <a
              v-for="s in site.socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/10 hover:bg-sun hover:text-ink flex items-center justify-center transition-colors"
              :aria-label="s.label"
            >
              <Icon :name="s.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav v-for="col in columns" :key="col.title" class="lg:col-span-2" :aria-label="col.title">
          <h3 class="text-sm font-bold uppercase tracking-[0.08em] text-sun">{{ col.title }}</h3>
          <ul class="mt-5 space-y-3">
            <li v-for="link in col.links" :key="link.label">
              <NuxtLink :to="link.to" class="text-[15px] text-white/75 hover:text-white transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="lg:col-span-4">
          <h3 class="text-sm font-bold uppercase tracking-[0.08em] text-sun">{{ t.reachUs }}</h3>
          <ul class="mt-5 space-y-4 text-[15px] text-white/75">
            <li class="flex gap-3">
              <Icon name="heroicons:map-pin" class="h-5 w-5 shrink-0 text-white/50" />
              {{ m.site.location }}
            </li>
            <li class="flex gap-3">
              <Icon name="heroicons:phone" class="h-5 w-5 shrink-0 text-white/50" />
              <a :href="site.phoneHref" class="hover:text-white">{{ site.phone }}</a>
            </li>
            <li class="flex gap-3 min-w-0">
              <Icon name="heroicons:envelope" class="h-5 w-5 shrink-0 text-white/50" />
              <a :href="`mailto:${site.email}`" class="hover:text-white break-all">{{ site.email }}</a>
            </li>
            <li class="flex gap-3">
              <Icon name="heroicons:clock" class="h-5 w-5 shrink-0 text-white/50" />
              {{ m.site.hours }}
            </li>
          </ul>
          <div class="mt-7 flex flex-wrap items-center gap-4">
            <NuxtLink to="/donate" class="btn btn-sun">
              <Icon name="heroicons:heart-solid" class="h-4 w-4" />
              {{ m.nav.donate }}
            </NuxtLink>
            <LangSwitch dark />
          </div>
        </div>
      </div>

      <div class="flex flex-col-reverse gap-4 border-t border-white/10 py-7 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ t.rights }}</p>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <NuxtLink to="/privacy" class="hover:text-white">{{ t.privacy }}</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white">{{ t.terms }}</NuxtLink>
          <NuxtLink to="/credits" class="hover:text-white">{{ m.credits.link }}</NuxtLink>
          <button type="button" class="inline-flex items-center gap-1 hover:text-white" @click="toTop">
            {{ t.toTop }}
            <Icon name="heroicons:arrow-up" class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { site } from "~/data/site";

const { m } = useLang();
const t = computed(() => m.value.footer);

const columns = computed(() => [
  {
    title: t.value.explore,
    links: [
      { label: t.value.links.about, to: "/about" },
      { label: t.value.links.programs, to: "/#programs" },
      { label: t.value.links.events, to: "/events" },
      { label: t.value.links.gallery, to: "/gallery" },
      { label: t.value.links.news, to: "/blog" },
    ],
  },
  {
    title: t.value.getInvolved,
    links: [
      { label: t.value.links.donate, to: "/donate" },
      { label: t.value.links.volunteer, to: "/contact" },
      { label: t.value.links.partner, to: "/contact" },
      { label: t.value.links.shop, to: "/products" },
    ],
  },
]);

const year = new Date().getFullYear();
const { email, website, sending, status, error, subscribe } = useNewsletter("footer");
const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
</script>

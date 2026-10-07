<template>
  <header class="absolute inset-x-0 top-0 z-40" role="banner">
    <!-- Utility bar -->
    <div class="hidden lg:block">
      <div class="frame">
        <div class="h-11 flex items-center justify-end gap-7 pr-4 text-[13px] font-semibold text-ink">
          <NuxtLink
            v-for="link in utilityLinks"
            :key="link.key"
            :to="link.to"
            class="inline-flex items-center gap-1.5 hover:text-maroon transition-colors"
          >
            <Icon v-if="link.key === 'shop'" :name="link.icon" class="h-4 w-4" />
            {{ m.nav[link.key] }}
          </NuxtLink>
          <a :href="site.phoneHref" class="inline-flex items-center gap-1.5 hover:text-maroon transition-colors">
            <Icon name="heroicons:phone" class="h-4 w-4" />
            {{ m.nav.callUs }}: {{ site.phone }}
          </a>
          <a :href="`mailto:${site.email}`" class="inline-flex items-center hover:text-maroon transition-colors" :aria-label="m.nav.emailUs">
            <Icon name="heroicons:envelope" class="h-[18px] w-[18px]" />
          </a>
          <LangSwitch />
        </div>
      </div>
    </div>

    <!-- Main bar: sits over the top of each page's hero card -->
    <div class="frame hero-offset lg:pt-0">
      <nav class="relative flex items-center h-[76px] lg:h-[92px] px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <NuxtLink
          to="/"
          class="logo-badge absolute left-3 top-1.5 w-[74px] h-[74px] sm:left-5 sm:w-[84px] sm:h-[84px] lg:left-7 lg:-top-9 lg:w-[132px] lg:h-[132px]"
          :aria-label="m.nav.homeLabel"
        >
          <LogoBadge class="w-full h-full" />
        </NuxtLink>

        <div class="hidden lg:flex items-center gap-0.5 xl:gap-1 ml-[156px] xl:ml-[170px]">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link-light"
            :class="{ 'is-active': isActive(link.to) }"
          >
            {{ m.nav[link.key] }}
          </NuxtLink>
        </div>

        <div class="ml-auto flex items-center gap-2">
          <NuxtLink to="/donate" class="btn btn-white hidden sm:inline-flex">
            <Icon name="heroicons:heart-solid" class="h-4 w-4 text-[#e2574c]" />
            {{ m.nav.donate }}
          </NuxtLink>
          <button
            type="button"
            class="lg:hidden w-12 h-12 rounded-full bg-white/95 text-ink flex items-center justify-center shadow-lg"
            :aria-label="m.nav.openMenu"
            :aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            @click="openMenu"
          >
            <Icon name="heroicons:bars-3" class="h-6 w-6" />
          </button>
        </div>
      </nav>
    </div>

    <!-- Compact sticky bar after scrolling -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-full"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="-translate-y-full"
    >
      <div v-if="scrolled" class="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line shadow-[0_8px_24px_-16px_rgba(46,20,20,0.35)]">
        <div class="shell flex items-center h-16 lg:h-[72px]">
          <NuxtLink to="/" class="flex items-center gap-3 shrink-0" :aria-label="m.nav.homeLabel">
            <span class="logo-badge w-11 h-11 lg:w-12 lg:h-12 !shadow-none ring-1 ring-line">
              <LogoBadge compact class="w-full h-full" />
            </span>
            <span class="hidden sm:block lg:hidden xl:block leading-tight">
              <span class="block text-[15px] font-extrabold tracking-tight text-ink">Illchamus Community</span>
              <span class="block text-xs font-semibold text-ink-soft">{{ m.site.location }}</span>
            </span>
          </NuxtLink>
          <div class="hidden lg:flex items-center gap-0.5 ml-auto mr-4">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="nav-link-dark"
              :class="{ 'is-active': isActive(link.to) }"
            >
              {{ m.nav[link.key] }}
            </NuxtLink>
          </div>
          <div class="flex items-center gap-2 ml-auto lg:ml-0">
            <NuxtLink to="/donate" class="btn btn-sun btn-sm">
              <Icon name="heroicons:heart-solid" class="h-4 w-4" />
              {{ m.nav.donate }}
            </NuxtLink>
            <button
              type="button"
              class="lg:hidden w-10 h-10 rounded-full bg-paper text-ink flex items-center justify-center border border-line"
              :aria-label="m.nav.openMenu"
              :aria-expanded="menuOpen"
              aria-controls="mobile-menu"
              @click="openMenu"
            >
              <Icon name="heroicons:bars-3" class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile menu -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-3"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="opacity-0 translate-y-3"
      >
        <div
          v-if="menuOpen"
          id="mobile-menu"
          ref="menuRef"
          class="fixed inset-0 z-[70] bg-maroon-deep text-white overflow-y-auto overscroll-contain lg:hidden"
          role="dialog"
          aria-modal="true"
          :aria-label="m.nav.openMenu"
        >
          <div class="sun-ring w-[340px] h-[340px] border-[34px] -right-36 -bottom-36 opacity-90" aria-hidden="true" />
          <div class="relative min-h-full flex flex-col px-5 sm:px-8 pt-4 pb-10">
            <div class="flex items-center justify-between">
              <NuxtLink to="/" class="logo-badge w-[84px] h-[84px]" :aria-label="m.nav.home" @click="closeMenu">
                <LogoBadge class="w-full h-full" />
              </NuxtLink>
              <div class="flex items-center gap-3">
                <LangSwitch dark />
                <button
                  ref="closeRef"
                  type="button"
                  class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                  :aria-label="m.nav.closeMenu"
                  @click="closeMenu"
                >
                  <Icon name="heroicons:x-mark" class="h-6 w-6" />
                </button>
              </div>
            </div>

            <nav class="mt-10" aria-label="Mobile navigation">
              <ul class="space-y-1">
                <li v-for="link in mobileLinks" :key="link.to">
                  <NuxtLink
                    :to="link.to"
                    class="flex items-center justify-between py-3 text-[1.75rem] sm:text-3xl font-bold tracking-tight border-b border-white/10"
                    :class="isActive(link.to) ? 'text-sun' : 'text-white'"
                    @click="closeMenu"
                  >
                    {{ m.nav[link.key] }}
                    <Icon name="heroicons:arrow-up-right" class="h-5 w-5 opacity-50" />
                  </NuxtLink>
                </li>
              </ul>
            </nav>

            <div class="mt-8 flex flex-wrap gap-2">
              <NuxtLink
                v-for="link in utilityLinks"
                :key="link.key"
                :to="link.to"
                class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold"
                @click="closeMenu"
              >
                <Icon :name="link.icon" class="h-4 w-4 text-sun" />
                {{ m.nav[link.key] }}
              </NuxtLink>
            </div>

            <NuxtLink to="/donate" class="btn btn-sun mt-8 w-full text-base" @click="closeMenu">
              <Icon name="heroicons:heart-solid" class="h-5 w-5" />
              {{ m.nav.donateToday }}
            </NuxtLink>

            <div class="mt-auto pt-10 space-y-2 text-[15px] text-white/80">
              <a :href="site.phoneHref" class="flex items-center gap-2.5"><Icon name="heroicons:phone" class="h-4 w-4 text-sun" />{{ site.phone }}</a>
              <a :href="`mailto:${site.email}`" class="flex items-center gap-2.5 break-all"><Icon name="heroicons:envelope" class="h-4 w-4 text-sun shrink-0" />{{ site.email }}</a>
              <p class="flex items-center gap-2.5"><Icon name="heroicons:map-pin" class="h-4 w-4 text-sun" />{{ m.site.location }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { site, navLinks, utilityLinks } from "~/data/site";

const { m } = useLang();
const mobileLinks = [{ to: "/", key: "home" as const }, ...navLinks];
const route = useRoute();
const scrolled = ref(false);
const menuOpen = ref(false);
const closeRef = ref<HTMLButtonElement | null>(null);
let lastTrigger: HTMLElement | null = null;

const isActive = (to: string) => {
  if (to.includes("#")) return false;
  if (to === "/") return route.path === "/";
  return route.path.startsWith(to);
};

const openMenu = (e: Event) => {
  lastTrigger = e.currentTarget as HTMLElement;
  menuOpen.value = true;
};

const closeMenu = () => {
  menuOpen.value = false;
};

watch(menuOpen, (open) => {
  document.documentElement.style.overflow = open ? "hidden" : "";
  if (open) nextTick(() => closeRef.value?.focus());
  else lastTrigger?.focus?.();
});

watch(() => route.fullPath, closeMenu);

let raf = 0;
const onScroll = () => {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 360;
  });
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && menuOpen.value) closeMenu();
};

const onResize = () => {
  if (window.innerWidth >= 1024 && menuOpen.value) closeMenu();
};

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  document.removeEventListener("keydown", onKeydown);
  document.documentElement.style.overflow = "";
});
</script>

<style scoped>
.logo-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 10px 30px -12px rgb(46 20 20 / 0.45);
  z-index: 2;
}

.nav-link-light,
.nav-link-dark {
  position: relative;
  padding: 0.625rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.9375rem;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.2s ease, background-color 0.2s ease;
}
@media (min-width: 1280px) {
  .nav-link-light,
  .nav-link-dark {
    padding-inline: 0.875rem;
  }
}
.nav-link-light {
  color: #fff;
  text-shadow: 0 1px 12px rgb(0 0 0 / 0.35);
}
.nav-link-light:hover,
.nav-link-light.is-active {
  background: rgb(255 255 255 / 0.16);
}
.nav-link-dark {
  color: var(--color-ink);
}
.nav-link-dark:hover {
  color: var(--color-maroon);
  background: var(--color-sun-soft);
}
.nav-link-dark.is-active {
  color: var(--color-maroon);
}
.nav-link-light.is-active::after,
.nav-link-dark.is-active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0.25rem;
  width: 1rem;
  height: 3px;
  border-radius: 3px;
  background: var(--color-sun);
  transform: translateX(-50%);
}
</style>

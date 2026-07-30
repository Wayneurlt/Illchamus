<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
    :class="[
      isScrolled
        ? 'bg-[var(--cbo-cream)]/95 backdrop-blur-md border-b border-[var(--cbo-border)] shadow-sm'
        : 'bg-[var(--cbo-cream)]/90 backdrop-blur-sm',
    ]"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="container-cbo">
      <div class="flex justify-between items-center h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center shrink-0 h-full py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cbo-accent)] focus-visible:ring-offset-2 rounded-lg transition-transform hover:scale-105"
          aria-label="Illchamus CBO Home"
          @click="closeMobileMenu"
        >
          <img
            src="/logo.png"
            alt="Illchamus CBO"
            class="h-full max-h-10 lg:max-h-12 w-auto object-contain"
            loading="eager"
          />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="relative px-4 py-2.5 rounded-lg text-[15px] font-semibold text-[var(--cbo-earth)] transition-colors hover:text-[var(--cbo-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cbo-accent)] focus-visible:ring-offset-2"
            :class="{
              'text-[var(--cbo-accent)]': isActiveRoute(link.to),
            }"
            active-class="text-[var(--cbo-accent)]"
          >
            {{ link.label }}
            <span
              v-if="isActiveRoute(link.to)"
              class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--cbo-accent)]"
            />
          </NuxtLink>
          <NuxtLink
            to="/donate"
            class="ml-2 btn-cbo px-5 py-2.5 text-[15px] text-white inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cbo-accent)] focus-visible:ring-offset-2"
          >
            <Icon name="heroicons:heart" class="h-4 w-4" />
            Donate
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          ref="menuButtonRef"
          class="lg:hidden p-2.5 -mr-2 rounded-lg text-neutral-700 hover:bg-[var(--cbo-accent-soft)] active:bg-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cbo-accent)] focus-visible:ring-offset-2"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="toggleMobileMenu"
        >
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 rotate-90"
            enter-to-class="opacity-100 rotate-0"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 rotate-0"
            leave-to-class="opacity-0 -rotate-90"
          >
            <Icon
              :key="isMobileMenuOpen ? 'close' : 'menu'"
              :name="isMobileMenuOpen ? 'heroicons:x-mark-20-solid' : 'heroicons:bars-3'"
              class="h-6 w-6"
            />
          </Transition>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="lg:hidden absolute inset-x-0 top-full bg-white border-b border-neutral-200 shadow-lg"
      >
        <div class="container-cbo py-6 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold text-[var(--cbo-earth)] hover:bg-[var(--cbo-warm)] hover:text-[var(--cbo-accent)] transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cbo-accent)] focus-visible:ring-offset-2"
            :class="{
              'text-[var(--cbo-accent)] bg-[var(--cbo-accent-soft)]': isActiveRoute(link.to),
            }"
            @click="closeMobileMenu"
          >
            <span>{{ link.label }}</span>
            <Icon
              v-if="isActiveRoute(link.to)"
              name="heroicons:check-circle"
              class="h-5 w-5 text-[var(--cbo-accent)]"
            />
          </NuxtLink>
          <NuxtLink
            to="/donate"
            class="flex items-center justify-center gap-2 mx-4 mt-4 btn-cbo text-center py-3.5 rounded-full text-white font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cbo-accent)] focus-visible:ring-offset-2"
            @click="closeMobileMenu"
          >
            <Icon name="heroicons:heart" class="h-4 w-4" />
            Donate
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/products", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const route = useRoute();
const navRef = ref(null);
const menuButtonRef = ref(null);
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Check if route is active (handles exact and partial matches)
const isActiveRoute = (path) => {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
};

// Improved scroll handler with requestAnimationFrame for better performance
let rafId = null;
const handleScroll = () => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  rafId = requestAnimationFrame(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    isScrolled.value = scrollY > 20;
  });
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
    // Focus trap: focus the first link when menu opens
    nextTick(() => {
      const firstLink = document.querySelector("#mobile-menu a");
      if (firstLink) {
        firstLink.focus();
      }
    });
  } else {
    document.body.style.overflow = "";
    // Return focus to menu button
    if (menuButtonRef.value) {
      menuButtonRef.value.focus();
    }
  }
};

// Close mobile menu
const closeMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = "";
  }
};

// Close menu on route change
watch(
  () => route.path,
  () => {
    closeMobileMenu();
  }
);

// Handle escape key
const handleKeydown = (e) => {
  if (e.key === "Escape" && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// Handle click outside to close mobile menu
const handleClickOutside = (e) => {
  if (
    isMobileMenuOpen.value &&
    navRef.value &&
    !navRef.value.contains(e.target)
  ) {
    closeMobileMenu();
  }
};

// Lifecycle hooks
onMounted(() => {
  // Initial scroll state
  handleScroll();
  
  // Add event listeners
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  // Cleanup
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleClickOutside);
  document.body.style.overflow = "";
});
</script>

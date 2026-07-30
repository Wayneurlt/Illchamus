<template>
  <footer class="bg-cbo-earth text-[#e8dfd4]" role="contentinfo">
    <div class="container-cbo">
      <div class="py-16 lg:py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div class="lg:col-span-2">
            <NuxtLink to="/" class="inline-flex items-center mb-6 h-8">
              <img src="/logo.png" alt="Illchamus CBO" class="h-full max-h-8 w-auto object-contain brightness-0 invert opacity-90" />
            </NuxtLink>
            <p class="text-[15px] leading-relaxed text-neutral-400 max-w-md mb-8">
              Preserving Illchamus culture and empowering our community through education, support, and sustainable development in Baringo County, Kenya.
            </p>
            <form @submit.prevent="handleNewsletterSubmit" class="flex flex-col sm:flex-row gap-3 max-w-sm">
              <input
                v-model="newsletterEmail"
                type="email"
                placeholder="Stay connected with us"
                class="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)] focus:border-transparent text-sm"
                required
                aria-label="Newsletter email"
              />
              <button
                type="submit"
                :disabled="isSubmitting"
                class="btn-cbo px-5 py-2.5 rounded-lg text-sm text-white disabled:opacity-50 shrink-0"
              >
                {{ isSubmitting ? "…" : "Join us" }}
              </button>
            </form>
            <p v-if="newsletterMessage" class="mt-2 text-sm" :class="newsletterSuccess ? 'text-emerald-400' : 'text-red-400'">
              {{ newsletterMessage }}
            </p>
            <div class="flex gap-4 mt-8">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" class="text-neutral-500 hover:text-white transition-colors" aria-label="Facebook"> <Icon name="mdi:facebook" class="h-5 w-5" /> </a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" class="text-neutral-500 hover:text-white transition-colors" aria-label="X"> <Icon name="mdi:twitter" class="h-5 w-5" /> </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" class="text-neutral-500 hover:text-white transition-colors" aria-label="Instagram"> <Icon name="mdi:instagram" class="h-5 w-5" /> </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" class="text-neutral-500 hover:text-white transition-colors" aria-label="YouTube"> <Icon name="mdi:youtube" class="h-5 w-5" /> </a>
            </div>
          </div>
          <nav aria-label="Footer links">
            <h4 class="font-display text-base font-semibold text-[#faf6f0] mb-6">Explore</h4>
            <ul class="space-y-4">
              <li><NuxtLink to="/about" class="text-[#c4b5a8] hover:text-[#faf6f0] transition-colors text-[15px]">Our story</NuxtLink></li>
              <li><NuxtLink to="/products" class="text-[#c4b5a8] hover:text-[#faf6f0] transition-colors text-[15px]">Community crafts</NuxtLink></li>
              <li><NuxtLink to="/blog" class="text-[#c4b5a8] hover:text-[#faf6f0] transition-colors text-[15px]">News & stories</NuxtLink></li>
              <li><NuxtLink to="/gallery" class="text-[#c4b5a8] hover:text-[#faf6f0] transition-colors text-[15px]">Photo gallery</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-[#c4b5a8] hover:text-[#faf6f0] transition-colors text-[15px]">Get in touch</NuxtLink></li>
              <li><NuxtLink to="/donate" class="text-[var(--cbo-accent)] hover:underline font-medium text-[15px]">Donate</NuxtLink></li>
            </ul>
          </nav>
          <div>
            <h4 class="font-display text-base font-semibold text-[#faf6f0] mb-6">Reach out</h4>
            <div class="space-y-4 text-[15px] text-[#c4b5a8]">
              <p>Baringo County, Kenya</p>
              <a href="tel:+254732847605" class="block hover:text-white transition-colors">+254 732 847 605</a>
              <a href="mailto:smile4smileinnitiative@gmail.com" class="block hover:text-white transition-colors break-all">smile4smileinnitiative@gmail.com</a>
              <p>Mon – Fri, 8AM – 5PM</p>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t border-white/10 py-8 flex flex-col lg:flex-row justify-between items-center gap-4">
        <p class="text-sm text-neutral-500">
          © {{ currentYear }} Illchamus Community CBO. Registered CBO, Kenya.
        </p>
        <div class="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#" class="text-neutral-500 hover:text-white transition-colors" @click.prevent="scrollToTop">Back to top</a>
          <a href="#" class="text-neutral-500 hover:text-white transition-colors">Privacy</a>
          <a href="#" class="text-neutral-500 hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const newsletterEmail = ref("");
const isSubmitting = ref(false);
const newsletterMessage = ref("");
const newsletterSuccess = ref(false);

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value.trim()) return;
  isSubmitting.value = true;
  newsletterMessage.value = "";
  try {
    await new Promise((r) => setTimeout(r, 1500));
    newsletterSuccess.value = true;
    newsletterMessage.value = "Thanks for subscribing. We’ll keep you updated.";
    newsletterEmail.value = "";
  } catch {
    newsletterSuccess.value = false;
    newsletterMessage.value = "Something went wrong. Please try again.";
  } finally {
    isSubmitting.value = false;
    setTimeout(() => { newsletterMessage.value = ""; }, 5000);
  }
};

const currentYear = computed(() => new Date().getFullYear());

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

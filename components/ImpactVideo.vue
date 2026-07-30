<template>
  <section class="py-24 lg:py-32 bg-cbo-warm">
    <div class="container-cbo">
      <div class="text-center mb-12 lg:mb-16" data-aos="fade-up">
        <p class="section-eyebrow">Stories from home</p>
        <h2 class="section-heading mb-4">
          See our <span class="gradient-text">community</span> in motion
        </h2>
        <p class="section-lead mx-auto">
          Watch neighbours supporting neighbours—education, culture, and care in everyday life.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16" data-aos="fade-up">
        <div class="relative rounded-2xl overflow-hidden border border-[var(--cbo-border)] aspect-video">
          <img
            v-if="!isPlaying.featured"
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80"
            alt="Community impact"
            class="w-full h-full object-cover"
          />
          <video
            v-show="isPlaying.featured"
            ref="featuredVideo"
            class="w-full h-full object-cover"
            controls
            @play="isPlaying.featured = true"
            @pause="isPlaying.featured = false"
          >
            <source :src="bgVideo" type="video/mp4" />
          </video>
          <button
            v-if="!isPlaying.featured"
            class="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
            @click="playFeatured"
          >
            <span class="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
              <Icon name="heroicons:play" class="h-8 w-8 text-[var(--cbo-accent)] ml-1" />
            </span>
          </button>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
            <h3 class="text-xl font-semibold">Transforming lives through education</h3>
            <p class="text-sm text-white/90 mt-1">See how our scholarship program is changing futures</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="rounded-2xl border border-[var(--cbo-border)] bg-white p-6 card-hover"
            :data-aos="'fade-up'"
            :data-aos-delay="(i + 1) * 80"
          >
            <div class="w-10 h-10 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mb-3">
              <Icon :name="stat.icon" class="h-5 w-5 text-[var(--cbo-accent)]" />
            </div>
            <p class="text-2xl lg:text-3xl font-semibold text-[var(--cbo-ink)]">{{ stat.value }}</p>
            <p class="text-sm text-[var(--cbo-muted)] mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <div data-aos="fade-up">
        <h3 class="section-heading text-center mb-8">Impact stories</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(t, i) in testimonials"
            :key="t.id"
            class="relative rounded-2xl overflow-hidden border border-[var(--cbo-border)] aspect-video card-hover"
          >
            <img
              v-if="!isPlaying[t.id]"
              :src="t.thumbnail"
              :alt="t.title"
              class="w-full h-full object-cover"
            />
            <video
              v-show="isPlaying[t.id]"
              :ref="(el) => setVideoRef(t.id, el)"
              class="w-full h-full object-cover"
              controls
              @play="isPlaying[t.id] = true"
              @pause="isPlaying[t.id] = false"
            >
              <source :src="bgVideo" type="video/mp4" />
            </video>
            <button
              v-if="!isPlaying[t.id]"
              class="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
              @click="playTestimonial(t.id)"
            >
              <span class="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                <Icon name="heroicons:play" class="h-7 w-7 text-[var(--cbo-accent)] ml-0.5" />
              </span>
            </button>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
              <p class="font-semibold text-sm">{{ t.title }}</p>
              <p class="text-xs text-white/80 mt-0.5">{{ t.author }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 rounded-2xl cta-community p-8 md:p-12 text-center" data-aos="fade-up">
        <h3 class="text-2xl lg:text-3xl font-semibold tracking-tight mb-4">Be part of the story</h3>
        <p class="text-neutral-400 max-w-2xl mx-auto mb-8 text-[15px]">
          Your support helps us create more success stories. Join us in making a lasting difference.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/donate" class="btn-cbo px-8 py-3 rounded-full text-base inline-flex justify-center">
            Donate
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-cbo-outline border-white text-white hover:bg-white hover:text-[var(--cbo-ink)] px-8 py-3 rounded-full text-base inline-flex justify-center">
            Get involved
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import bgVideo from "~/assets/videos/bg.mp4";

const featuredVideo = ref(null);
const videoRefs = ref({});

const isPlaying = reactive({
  featured: false,
  testimonial1: false,
  testimonial2: false,
  testimonial3: false,
});

const stats = [
  { value: "5,000+", label: "Lives impacted", icon: "heroicons:users" },
  { value: "350+", label: "Students supported", icon: "heroicons:academic-cap" },
  { value: "12", label: "Communities reached", icon: "heroicons:building-office" },
  { value: "$250K+", label: "Funds deployed", icon: "heroicons:heart" },
];

const testimonials = [
  { id: "testimonial1", title: "Sarah's educational journey", author: "Sarah Mwangi, Student", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" },
  { id: "testimonial2", title: "Healthcare access success", author: "Dr. James Kiprotich", thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80" },
  { id: "testimonial3", title: "Cultural heritage preserved", author: "Elder John Kipchoge", thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80" },
];

const setVideoRef = (id, el) => {
  if (el) videoRefs.value[id] = el;
};

const playFeatured = () => {
  if (featuredVideo.value) {
    featuredVideo.value.play();
    isPlaying.featured = true;
  }
};

const playTestimonial = (id) => {
  const el = videoRefs.value[id];
  if (el) {
    el.play();
    isPlaying[id] = true;
  }
};
</script>

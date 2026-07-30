<template>
  <section id="impact" class="py-24 lg:py-32 bg-cbo-cream">
    <div class="container-cbo">
      <div class="text-center mb-16 lg:mb-20" data-aos="fade-up">
        <p class="section-eyebrow">Real change, real neighbours</p>
        <h2 class="section-heading mb-4">
          Our <span class="gradient-text">impact</span> in numbers
        </h2>
        <p class="section-lead mx-auto">
          Every figure represents a person, a family, or a village we walk alongside in Baringo County.
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
        <div
          v-for="(stat, index) in impactStats"
          :key="stat.id"
          class="text-center rounded-2xl border border-[var(--cbo-border)] p-6 lg:p-8 card-hover cursor-pointer"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 80"
          @click="openStatModal(stat)"
        >
          <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mx-auto mb-4">
            <Icon :name="stat.icon" class="h-6 w-6 text-[var(--cbo-accent)]" />
          </div>
          <p class="text-2xl lg:text-3xl font-semibold text-[var(--cbo-ink)]">{{ animatedValue(stat.value) }}{{ stat.suffix || "" }}</p>
          <p class="text-sm text-[var(--cbo-muted)] mt-1">{{ stat.label }}</p>
          <p class="text-xs text-[var(--cbo-muted)] mt-0.5">{{ stat.description }}</p>
        </div>
      </div>

      <div class="mb-20">
        <h3 class="section-heading text-center mb-12" data-aos="fade-up">Impact stories</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="(story, index) in impactStories"
            :key="story.id"
            class="card-hover bg-white rounded-2xl overflow-hidden border border-[var(--cbo-border)] cursor-pointer"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
            @click="openStoryModal(story)"
          >
            <div class="relative h-52 overflow-hidden">
              <img
                :src="story.image"
                :alt="story.title"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-[var(--cbo-ink)]">
                {{ story.category }}
              </span>
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <h4 class="text-lg font-semibold">{{ story.title }}</h4>
              </div>
            </div>
            <div class="p-5">
              <p class="text-[var(--cbo-muted)] text-[15px] leading-relaxed line-clamp-3 mb-4">{{ story.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-[var(--cbo-muted)]">{{ story.author }}</span>
                <span class="text-[var(--cbo-accent)] font-medium text-sm">Read more →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="rounded-2xl cta-community p-8 md:p-12 lg:p-16"
        data-aos="fade-up"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-2xl lg:text-3xl font-semibold tracking-tight mb-4">Join us in making a difference</h3>
            <p class="text-neutral-400 text-[15px] leading-relaxed mb-6">
              Your support helps us expand our programs and reach more members of the Illchamus community. Together we can create lasting change.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/donate" class="btn-cbo px-8 py-3 rounded-full text-base inline-flex justify-center">
                Donate
              </NuxtLink>
              <NuxtLink to="/contact" class="btn-cbo-outline border-white text-white hover:bg-white hover:text-[var(--cbo-ink)] px-8 py-3 rounded-full text-base inline-flex justify-center">
                Get involved
              </NuxtLink>
            </div>
          </div>
          <div class="rounded-xl overflow-hidden h-56 lg:h-64">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
              alt="Community support"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Stat modal -->
    <div
      v-if="selectedStat"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click="closeStatModal"
    >
      <div class="bg-white rounded-2xl max-w-md w-full p-8 text-center" @click.stop>
        <div class="w-16 h-16 rounded-2xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mx-auto mb-4">
          <Icon :name="selectedStat.icon" class="h-8 w-8 text-[var(--cbo-accent)]" />
        </div>
        <h3 class="text-xl font-semibold text-[var(--cbo-ink)] mb-2">{{ selectedStat.label }}</h3>
        <p class="text-3xl font-semibold text-[var(--cbo-accent)] mb-4">{{ selectedStat.value }}{{ selectedStat.suffix || "" }}</p>
        <p class="text-[var(--cbo-muted)] text-[15px] mb-6">{{ selectedStat.fullDescription }}</p>
        <button class="btn-cbo px-6 py-2.5 rounded-xl text-sm" @click="closeStatModal">Close</button>
      </div>
    </div>

    <!-- Story modal -->
    <div
      v-if="selectedStory"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click="closeStoryModal"
    >
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="relative">
          <img
            :src="selectedStory.image"
            :alt="selectedStory.title"
            class="w-full h-56 object-cover rounded-t-2xl"
          />
          <button
            class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[var(--cbo-ink)] hover:bg-white transition-colors"
            aria-label="Close"
            @click="closeStoryModal"
          >
            <Icon name="heroicons:x-mark" class="h-5 w-5" />
          </button>
        </div>
        <div class="p-6 lg:p-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-semibold text-[var(--cbo-ink)]">{{ selectedStory.title }}</h3>
            <span class="px-3 py-1 rounded-full bg-[var(--cbo-accent-soft)] text-[var(--cbo-accent)] text-sm font-medium">
              {{ selectedStory.category }}
            </span>
          </div>
          <div class="flex items-center gap-4 text-sm text-[var(--cbo-muted)] mb-6">
            <span>{{ selectedStory.author }}</span>
            <span>{{ selectedStory.date }}</span>
          </div>
          <p class="text-[var(--cbo-muted)] leading-relaxed">{{ selectedStory.content }}</p>
          <button class="mt-8 btn-cbo px-6 py-2.5 rounded-xl text-sm" @click="closeStoryModal">Close</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const selectedStat = ref(null);
const selectedStory = ref(null);
const animationValues = ref({});

const impactStats = ref([
  { id: 1, value: 5000, suffix: "+", label: "Lives impacted", icon: "heroicons:users", description: "Community members reached", fullDescription: "We have directly impacted over 5,000 lives through education, healthcare, and economic opportunities across Baringo County." },
  { id: 2, value: 350, suffix: "+", label: "Students supported", icon: "heroicons:academic-cap", description: "Educational assistance", fullDescription: "Our education programs have supported over 350 students with scholarships, supplies, and mentorship." },
  { id: 3, value: 12, label: "Communities reached", icon: "heroicons:building-office", description: "Villages and settlements", fullDescription: "We serve 12 communities across Baringo County, including the most remote areas." },
  { id: 4, value: "250", suffix: "K+", label: "Funds deployed", icon: "heroicons:currency-dollar", description: "USD in development", fullDescription: "Over $250,000 has been invested in community development, infrastructure, and programs." },
]);

const impactStories = ref([
  { id: 1, title: "Sarah's journey to leadership", category: "Education", author: "Sarah Mwangi", date: "March 2024", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", excerpt: "From a shy student to a confident community leader, Sarah's transformation through our mentorship program.", content: "Sarah joined our Youth Mentorship Program as a quiet 16-year-old with big dreams but little confidence. Through mentorship, she developed leadership skills, public speaking, and community engagement. Today she leads a youth group of 30 and has organized three successful community clean-up campaigns." },
  { id: 2, title: "Mobile clinic saves lives", category: "Health", author: "Dr. James Kiprotich", date: "February 2024", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80", excerpt: "How our mobile health clinic brought essential medical care to remote communities.", content: "Our mobile health clinic has been a game-changer. In one month we provided care to over 200 patients who otherwise would have traveled 50+ km. The clinic offers consultations, maternal health, and health education, improving outcomes and reducing the burden on families." },
  { id: 3, title: "Cultural festival unites community", category: "Culture", author: "Elder John Kipchoge", date: "January 2024", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80", excerpt: "The annual cultural festival brought together 800+ community members to celebrate Illchamus heritage.", content: "Our annual Cultural Heritage Festival has become the highlight of the year. This year over 800 participants joined from across Baringo and beyond. The three-day event featured traditional music, dance, art, and storytelling, preserving heritage and creating economic opportunities for local artisans." },
]);

const animatedValue = (v) => {
  const key = String(v);
  return animationValues.value[key] ?? (typeof v === "number" ? 0 : v);
};

const animateValue = (key, start, end, duration) => {
  const startTime = performance.now();
  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    animationValues.value[key] = Math.floor(start + (end - start) * progress);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const openStatModal = (s) => {
  selectedStat.value = s;
  document.body.style.overflow = "hidden";
};
const closeStatModal = () => {
  selectedStat.value = null;
  document.body.style.overflow = "";
};

const openStoryModal = (s) => {
  selectedStory.value = s;
  document.body.style.overflow = "hidden";
};
const closeStoryModal = () => {
  selectedStory.value = null;
  document.body.style.overflow = "";
};

const onKeydown = (e) => {
  if (e.key === "Escape") {
    if (selectedStat.value) closeStatModal();
    else if (selectedStory.value) closeStoryModal();
  }
};

onMounted(() => {
  impactStats.value.forEach((s, i) => {
    const val = s.value;
    if (typeof val === "number") {
      setTimeout(() => animateValue(String(val), 0, val, 1800), i * 150);
    } else {
      animationValues.value[String(val)] = val;
    }
  });
  document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

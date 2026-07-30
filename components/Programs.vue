<template>
  <section id="programs" class="py-24 lg:py-32 bg-cbo-warm">
    <div class="container-cbo">
      <div class="text-center mb-12 lg:mb-16" data-aos="fade-up">
        <p class="section-eyebrow">Programs for our people</p>
        <h2 class="section-heading mb-4">
          What we do <span class="gradient-text">together</span>
        </h2>
        <p class="section-lead mx-auto mb-10">
          Initiatives shaped by community needs—from the classroom to the homestead.
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="category in programCategories"
            :key="category.id"
            @click="setActiveCategory(category.id)"
            class="px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            :class="activeCategory === category.id
              ? 'bg-[var(--cbo-accent)] text-white'
              : 'bg-white border border-[var(--cbo-border)] text-[var(--cbo-muted)] hover:border-[var(--cbo-accent)] hover:text-[var(--cbo-accent)]'"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(program, index) in filteredPrograms"
          :key="program.id"
          class="card-hover bg-white rounded-2xl overflow-hidden border border-[var(--cbo-border)] cursor-pointer"
          :data-aos="'fade-up'"
          :data-aos-delay="index % 3 * 100"
          @click="openProgramModal(program)"
        >
          <div class="relative h-52 lg:h-56 overflow-hidden">
            <img
              :src="program.image"
              :alt="program.title"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span class="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-[var(--cbo-ink)]">
              {{ program.category }}
            </span>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <h3 class="text-lg font-semibold">{{ program.title }}</h3>
              <p class="text-sm text-white/90 mt-0.5">{{ program.shortDescription }}</p>
            </div>
          </div>
          <div class="p-5 lg:p-6">
            <div class="flex items-center gap-4 text-sm text-[var(--cbo-muted)] mb-3">
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:users" class="h-4 w-4" />
                {{ program.participants }}+
              </span>
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:calendar" class="h-4 w-4" />
                {{ program.duration }}
              </span>
            </div>
            <p class="text-[var(--cbo-muted)] text-[15px] leading-relaxed line-clamp-2 mb-4">
              {{ program.description }}
            </p>
            <p class="text-[var(--cbo-accent)] font-medium text-sm">Learn more →</p>
          </div>
        </div>
      </div>

      <div
        class="mt-20 rounded-2xl cta-community p-8 md:p-12 text-center"
        data-aos="fade-up"
      >
        <h3 class="text-2xl lg:text-3xl font-semibold tracking-tight mb-4">Ready to get involved?</h3>
        <p class="text-neutral-400 max-w-2xl mx-auto mb-8 text-[15px]">
          Join our programs and be part of positive change. Every contribution matters.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" class="btn-cbo px-8 py-3 rounded-full text-base inline-flex justify-center">
            Join a program
          </NuxtLink>
          <NuxtLink to="/donate" class="btn-cbo-outline border-white text-white hover:bg-white hover:text-[var(--cbo-ink)] px-8 py-3 rounded-full text-base inline-flex justify-center">
            Support our work
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="selectedProgram"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click="closeProgramModal"
    >
      <div
        class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="relative">
          <img
            :src="selectedProgram.image"
            :alt="selectedProgram.title"
            class="w-full h-56 object-cover rounded-t-2xl"
          />
          <button
            class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[var(--cbo-ink)] hover:bg-white transition-colors"
            aria-label="Close"
            @click="closeProgramModal"
          >
            <Icon name="heroicons:x-mark" class="h-5 w-5" />
          </button>
        </div>
        <div class="p-6 lg:p-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-semibold text-[var(--cbo-ink)]">{{ selectedProgram.title }}</h3>
            <span class="px-3 py-1 rounded-full bg-[var(--cbo-accent-soft)] text-[var(--cbo-accent)] text-sm font-medium">
              {{ selectedProgram.category }}
            </span>
          </div>
          <p class="text-[var(--cbo-muted)] leading-relaxed mb-6">{{ selectedProgram.fullDescription }}</p>
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="rounded-xl border border-[var(--cbo-border)] p-4 text-center">
              <p class="text-xl font-semibold text-[var(--cbo-ink)]">{{ selectedProgram.participants }}+</p>
              <p class="text-sm text-[var(--cbo-muted)]">Participants</p>
            </div>
            <div class="rounded-xl border border-[var(--cbo-border)] p-4 text-center">
              <p class="text-xl font-semibold text-[var(--cbo-ink)]">{{ selectedProgram.duration }}</p>
              <p class="text-sm text-[var(--cbo-muted)]">Duration</p>
            </div>
            <div class="rounded-xl border border-[var(--cbo-border)] p-4 text-center">
              <p class="text-xl font-semibold text-[var(--cbo-ink)]">{{ selectedProgram.impact }}</p>
              <p class="text-sm text-[var(--cbo-muted)]">Impact</p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <NuxtLink
              to="/contact"
              class="btn-cbo flex-1 py-3 rounded-xl text-center"
            >
              Join this program
            </NuxtLink>
            <button
              class="flex-1 py-3 rounded-xl border border-[var(--cbo-border)] text-[var(--cbo-ink)] font-medium hover:bg-cbo-warm transition-colors"
              @click="closeProgramModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const activeCategory = ref("all");
const selectedProgram = ref(null);

const programCategories = [
  { id: "all", name: "All" },
  { id: "education", name: "Education" },
  { id: "health", name: "Health" },
  { id: "culture", name: "Culture" },
  { id: "economic", name: "Economic" },
  { id: "environment", name: "Environment" },
  { id: "women", name: "Women" },
];

const programs = ref([
  {
    id: 1,
    title: "Youth Mentorship Program",
    category: "Education",
    categoryId: "education",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Building tomorrow's leaders",
    description: "Mentorship and training that build leadership skills and character.",
    fullDescription:
      "Our Youth Mentorship Program pairs experienced community members with young people aged 15–25 for guidance, support, and skill development. Through workshops and hands-on projects, we help youth develop leadership, career readiness, and community engagement.",
    participants: 150,
    duration: "6 months",
    impact: "95% success rate",
  },
  {
    id: 2,
    title: "Community Health Initiative",
    category: "Health",
    categoryId: "health",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Healthcare for all",
    description: "Mobile clinics and health education for families.",
    fullDescription:
      "Our Community Health Initiative brings essential healthcare to remote areas through mobile clinics, health education, and connections to medical resources. We focus on maternal health, child nutrition, and disease prevention.",
    participants: 500,
    duration: "Ongoing",
    impact: "2,000+ lives improved",
  },
  {
    id: 3,
    title: "Cultural Heritage Festival",
    category: "Culture",
    categoryId: "culture",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Celebrating our traditions",
    description: "Music, dance, and art that bring our community together.",
    fullDescription:
      "Our annual Cultural Heritage Festival celebrates Illchamus traditions with music, dance, art, and storytelling. It brings together community members of all ages to preserve and share our heritage.",
    participants: 800,
    duration: "3 days",
    impact: "Community unity",
  },
  {
    id: 4,
    title: "Economic Empowerment",
    category: "Economic",
    categoryId: "economic",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Sustainable livelihoods",
    description: "Training, resources, and micro-financing for local entrepreneurs.",
    fullDescription:
      "Our Economic Empowerment program supports local entrepreneurs with business training, micro-financing, market connections, and mentorship to build sustainable livelihoods.",
    participants: 200,
    duration: "12 months",
    impact: "150+ businesses started",
  },
  {
    id: 5,
    title: "Lake Baringo Conservation",
    category: "Environment",
    categoryId: "environment",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Protecting our environment",
    description: "Conservation education and sustainable practices.",
    fullDescription:
      "We focus on protecting Lake Baringo and its ecosystems through clean-ups, sustainable-practice education, and working with local authorities on conservation measures.",
    participants: 300,
    duration: "Ongoing",
    impact: "Ecosystem preservation",
  },
  {
    id: 6,
    title: "Women's Leadership Program",
    category: "Women",
    categoryId: "women",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Empowering women leaders",
    description: "Skills training, leadership, and economic opportunities.",
    fullDescription:
      "Our Women's Leadership Program offers training in leadership, entrepreneurship, and community engagement, plus mentorship and networking so women can take on leadership roles.",
    participants: 120,
    duration: "9 months",
    impact: "85% in leadership roles",
  },
]);

const filteredPrograms = computed(() => {
  if (activeCategory.value === "all") return programs.value;
  return programs.value.filter((p) => p.categoryId === activeCategory.value);
});

const setActiveCategory = (id) => {
  activeCategory.value = id;
};

const openProgramModal = (p) => {
  selectedProgram.value = p;
  document.body.style.overflow = "hidden";
};

const closeProgramModal = () => {
  selectedProgram.value = null;
  document.body.style.overflow = "";
};

const onKeydown = (e) => {
  if (e.key === "Escape" && selectedProgram.value) closeProgramModal();
};

onMounted(() => document.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <section id="programs" class="py-16 sm:py-20 lg:py-28 scroll-mt-20">
    <div class="shell">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-aos="fade-up">
        <div class="max-w-2xl">
          <p class="eyebrow">What we do</p>
          <h2 class="h2 mt-3">Programs shaped by our community</h2>
          <p class="lead mt-4">
            Initiatives that start with what families tell us they need, from the classroom to the homestead.
          </p>
        </div>
        <NuxtLink to="/donate" class="link-arrow shrink-0">
          Support a program
          <Icon name="heroicons:arrow-right" class="h-5 w-5" />
        </NuxtLink>
      </div>
    </div>

    <!-- Cards: swipeable row on phones, grid from tablet up -->
    <div class="shell mt-10 lg:mt-14 px-0 sm:px-6 lg:px-8">
      <ul data-aos="fade-up" class="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
        <li
          v-for="program in programs"
          :key="program.id"
          class="snap-start shrink-0 w-[82%] sm:w-auto"
        >
          <button
            type="button"
            class="group h-full w-full text-left flex flex-col rounded-[26px] bg-white border border-line overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(46,20,20,0.55)]"
            @click="selected = program"
          >
            <div class="relative aspect-[16/11] overflow-hidden">
              <img
                :src="img(program.photo, 720, 495)"
                :alt="program.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <span class="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">
                {{ program.category }}
              </span>
            </div>
            <div class="flex flex-1 flex-col p-6">
              <span class="relative w-11 h-11 rounded-2xl flex items-center justify-center -mt-12 mb-4 ring-4 ring-white" :class="toneClasses[program.tone]">
                <Icon :name="program.icon" class="h-5 w-5" />
              </span>
              <h3 class="h3">{{ program.title }}</h3>
              <p class="mt-2 text-[15px] leading-relaxed text-ink-soft">{{ program.summary }}</p>
              <span class="link-arrow mt-auto pt-5 text-[15px]">
                Learn more
                <Icon name="heroicons:arrow-right" class="h-4 w-4" />
              </span>
            </div>
          </button>
        </li>
      </ul>
    </div>

    <AppModal :open="!!selected" :label="selected?.title" @close="selected = null">
      <template v-if="selected">
        <img :src="img(selected.photo, 1100, 560)" :alt="selected.title" class="w-full h-52 sm:h-64 object-cover" />
        <div class="p-6 sm:p-8">
          <span class="inline-flex rounded-full px-3 py-1 text-xs font-bold" :class="toneClasses[selected.tone]">
            {{ selected.category }}
          </span>
          <h3 class="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink">{{ selected.title }}</h3>
          <p class="mt-4 leading-relaxed text-ink-soft">{{ selected.description }}</p>
          <dl class="mt-6 grid grid-cols-3 gap-3">
            <div v-for="item in modalFacts" :key="item.label" class="rounded-2xl bg-paper p-3 sm:p-4">
              <dt class="text-xs font-semibold text-ink-soft">{{ item.label }}</dt>
              <dd class="mt-1 text-sm sm:text-base font-bold text-ink leading-tight">{{ item.value }}</dd>
            </div>
          </dl>
          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <NuxtLink to="/contact" class="btn btn-ink flex-1">Join this program</NuxtLink>
            <NuxtLink to="/donate" class="btn btn-sun flex-1">Fund this program</NuxtLink>
          </div>
        </div>
      </template>
    </AppModal>
  </section>
</template>

<script setup lang="ts">
import { img, programs, toneClasses, type Program } from "~/data/site";

const selected = ref<Program | null>(null);

const modalFacts = computed(() =>
  selected.value
    ? [
        { label: "Participants", value: selected.value.participants },
        { label: "Duration", value: selected.value.duration },
        { label: "Impact", value: selected.value.impact },
      ]
    : []
);

// Close the modal when navigating to one of its links.
const route = useRoute();
watch(() => route.fullPath, () => (selected.value = null));
</script>

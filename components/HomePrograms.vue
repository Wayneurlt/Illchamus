<template>
  <section id="programs" class="py-16 sm:py-20 lg:py-28 scroll-mt-20">
    <div class="shell">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-aos="fade-up">
        <div class="max-w-2xl">
          <p class="eyebrow">{{ t.eyebrow }}</p>
          <h2 class="h2 mt-3">{{ t.title }}</h2>
          <p class="lead mt-4">{{ t.text }}</p>
        </div>
        <NuxtLink to="/donate" class="link-arrow shrink-0">
          {{ t.support }}
          <Icon name="heroicons:arrow-right" class="h-5 w-5" />
        </NuxtLink>
      </div>
    </div>

    <!-- Cards: swipeable row on phones, grid from tablet up -->
    <div class="shell mt-10 lg:mt-14 px-0 sm:px-6 lg:px-8">
      <ul data-aos="fade-up" class="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
        <li v-for="program in programs" :key="program.id" class="snap-start shrink-0 w-[82%] sm:w-auto">
          <button
            type="button"
            class="group h-full w-full text-left flex flex-col rounded-[26px] bg-white border border-line overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(46,20,20,0.55)]"
            @click="selectedId = program.id"
          >
            <div class="relative aspect-[16/11] overflow-hidden">
              <Photo
                :id="program.photo"
                :src="program.src"
                :alt="copy(program.id).title"
                :width="720"
                :height="495"
                sizes="82vw sm:50vw lg:400px"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span class="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">
                {{ copy(program.id).category }}
              </span>
            </div>
            <div class="flex flex-1 flex-col p-6">
              <span class="relative w-11 h-11 rounded-2xl flex items-center justify-center -mt-12 mb-4 ring-4 ring-white" :class="toneClasses[program.tone]">
                <Icon :name="program.icon" class="h-5 w-5" />
              </span>
              <h3 class="h3">{{ copy(program.id).title }}</h3>
              <p class="mt-2 text-[15px] leading-relaxed text-ink-soft">{{ copy(program.id).summary }}</p>
              <span class="link-arrow mt-auto pt-5 text-[15px]">
                {{ m.common.learnMore }}
                <Icon name="heroicons:arrow-right" class="h-4 w-4" />
              </span>
            </div>
          </button>
        </li>
      </ul>
    </div>

    <AppModal :open="!!selected" :label="selected ? copy(selected.id).title : ''" @close="selectedId = null">
      <template v-if="selected">
        <Photo :id="selected.photo" :src="selected.src" :alt="copy(selected.id).title" :width="1100" :height="560" sizes="100vw sm:672px" class="w-full h-52 sm:h-64 object-cover" />
        <div class="p-6 sm:p-8">
          <span class="inline-flex rounded-full px-3 py-1 text-xs font-bold" :class="toneClasses[selected.tone]">
            {{ copy(selected.id).category }}
          </span>
          <h3 class="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink">{{ copy(selected.id).title }}</h3>
          <p class="mt-4 leading-relaxed text-ink-soft">{{ copy(selected.id).description }}</p>
          <dl class="mt-6 grid grid-cols-3 gap-3">
            <div v-for="item in facts" :key="item.label" class="rounded-2xl bg-paper p-3 sm:p-4">
              <dt class="text-xs font-semibold text-ink-soft">{{ item.label }}</dt>
              <dd class="mt-1 text-sm sm:text-base font-bold text-ink leading-tight">{{ item.value }}</dd>
            </div>
          </dl>
          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <NuxtLink to="/contact" class="btn btn-ink flex-1">{{ t.join }}</NuxtLink>
            <NuxtLink to="/donate" class="btn btn-sun flex-1">{{ t.fund }}</NuxtLink>
          </div>
        </div>
      </template>
    </AppModal>
  </section>
</template>

<script setup lang="ts">
import { programs, toneClasses, type ProgramId } from "~/data/site";

const { m } = useLang();
const t = computed(() => m.value.home.programs);
const copy = (id: ProgramId) => m.value.programs[id];

const selectedId = ref<ProgramId | null>(null);
const selected = computed(() => programs.find((p) => p.id === selectedId.value) || null);

const facts = computed(() =>
  selected.value
    ? [
        { label: t.value.participants, value: selected.value.participants },
        { label: t.value.duration, value: copy(selected.value.id).duration },
        { label: t.value.impact, value: copy(selected.value.id).impact },
      ]
    : []
);

// Close the modal when navigating to one of its links.
const route = useRoute();
watch(() => route.fullPath, () => (selectedId.value = null));
</script>

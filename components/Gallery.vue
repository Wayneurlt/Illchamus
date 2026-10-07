<template>
  <section class="py-14 sm:py-20">
    <div class="shell">
      <div class="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto" role="tablist" aria-label="Filter photos">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          role="tab"
          :aria-selected="active === cat.id"
          class="shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
          :class="active === cat.id ? 'bg-maroon text-white' : 'bg-white border border-line text-ink hover:border-maroon'"
          @click="active = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <TransitionGroup tag="ul" name="tile" class="mt-8 columns-2 lg:columns-3 gap-3 sm:gap-5 [&>li]:mb-3 sm:[&>li]:mb-5">
        <li v-for="item in filtered" :key="item.id + item.title" class="break-inside-avoid">
          <button
            type="button"
            class="group relative block w-full overflow-hidden rounded-[20px] sm:rounded-[24px] bg-line"
            :aria-label="`Open photo: ${item.title}`"
            @click="openAt(item)"
          >
            <img
              :src="img(item.id, 800)"
              :alt="item.alt"
              class="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              :class="item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'"
              loading="lazy"
            />
            <span class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
            <span class="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-left text-white">
              <span class="block text-sm sm:text-base font-bold">{{ item.title }}</span>
              <span class="hidden sm:block text-sm text-white/80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">{{ item.description }}</span>
            </span>
          </button>
        </li>
      </TransitionGroup>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0" leave-active-class="transition duration-150" leave-to-class="opacity-0">
        <div
          v-if="lightbox !== null && currentItem"
          class="fixed inset-0 z-[80] flex flex-col bg-[#140808]/95"
          role="dialog"
          aria-modal="true"
          :aria-label="currentItem.title"
          @touchstart.passive="touchX = $event.touches[0]?.clientX ?? 0"
          @touchend="onSwipe"
        >
          <div class="flex items-center justify-between p-4 text-white">
            <p class="text-sm font-semibold text-white/70">{{ lightbox + 1 }} / {{ filtered.length }}</p>
            <button ref="closeBtn" type="button" class="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label="Close" @click="lightbox = null">
              <Icon name="heroicons:x-mark" class="h-6 w-6" />
            </button>
          </div>
          <div class="relative flex-1 min-h-0 flex items-center justify-center px-4" @click.self="lightbox = null">
            <img :src="img(currentItem.id, 1600)" :alt="currentItem.alt" class="max-h-full max-w-full object-contain rounded-2xl" />
            <button type="button" class="lb-arrow left-3 sm:left-6" aria-label="Previous photo" @click="step(-1)">
              <Icon name="heroicons:arrow-left" class="h-5 w-5" />
            </button>
            <button type="button" class="lb-arrow right-3 sm:right-6" aria-label="Next photo" @click="step(1)">
              <Icon name="heroicons:arrow-right" class="h-5 w-5" />
            </button>
          </div>
          <div class="p-5 text-center text-white">
            <p class="font-bold">{{ currentItem.title }}</p>
            <p class="text-sm text-white/70">{{ currentItem.description }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { img, photos } from "~/data/site";

type Cat = "culture" | "nature" | "community" | "education";

const categories: { id: "all" | Cat; label: string }[] = [
  { id: "all", label: "All photos" },
  { id: "community", label: "Community" },
  { id: "education", label: "Education" },
  { id: "culture", label: "Culture" },
  { id: "nature", label: "Lake & land" },
];

const items: { id: string; title: string; description: string; alt: string; category: Cat; tall?: boolean }[] = [
  { id: photos.children, title: "Future generation", description: "Nurturing our children", alt: "Smiling children", category: "community", tall: true },
  { id: photos.roller, title: "Birds of Baringo", description: "The lilac-breasted roller", alt: "Lilac-breasted roller on a branch", category: "nature" },
  { id: photos.classroom, title: "Full classrooms", description: "Learners supported by scholarships", alt: "Pupils in a classroom", category: "education" },
  { id: photos.acaciaDusk, title: "Our heritage", description: "The land that shaped our traditions", alt: "Acacia tree at dusk", category: "culture", tall: true },
  { id: photos.youthTech, title: "Digital skills", description: "Computer literacy for young people", alt: "Young people at computers", category: "education" },
  { id: photos.hands, title: "Community unity", description: "Coming together", alt: "Hands joined in a circle", category: "community" },
  { id: photos.savanna, title: "The savanna", description: "Our natural environment", alt: "Savanna with a distant mountain", category: "nature" },
  { id: photos.woman, title: "Strong women", description: "Leaders in every village", alt: "Portrait of a woman", category: "community", tall: true },
  { id: photos.learner, title: "Homework time", description: "Every child in school", alt: "A child writing in a notebook", category: "education", tall: true },
  { id: photos.giraffe, title: "Wildlife", description: "Sharing the land with wildlife", alt: "Giraffe at sunset", category: "nature" },
  { id: photos.portrait, title: "Our people", description: "Proud and rooted in Baringo", alt: "Portrait of a man", category: "culture" },
  { id: photos.acacia, title: "Golden hour", description: "Evening over Baringo", alt: "Acacia tree at sunset", category: "nature" },
  { id: photos.soil, title: "Growing our future", description: "Sustainable farming", alt: "Hands holding soil and a seedling", category: "community" },
  { id: photos.elephant, title: "Conservation", description: "Protecting our ecosystems", alt: "Elephant on the plains", category: "nature", tall: true },
];

const active = ref<"all" | Cat>("all");
const filtered = computed(() => (active.value === "all" ? items : items.filter((i) => i.category === active.value)));

const lightbox = ref<number | null>(null);
const currentItem = computed(() => (lightbox.value === null ? null : filtered.value[lightbox.value]));
const closeBtn = ref<HTMLButtonElement | null>(null);

const openAt = (item: (typeof items)[number]) => {
  lightbox.value = filtered.value.indexOf(item);
};
const step = (d: number) => {
  if (lightbox.value === null) return;
  const n = filtered.value.length;
  lightbox.value = (lightbox.value + d + n) % n;
};

let touchX = 0;
const onSwipe = (e: TouchEvent) => {
  const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
};

const onKeydown = (e: KeyboardEvent) => {
  if (lightbox.value === null) return;
  if (e.key === "Escape") lightbox.value = null;
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
};

watch(lightbox, (v, old) => {
  document.documentElement.style.overflow = v === null ? "" : "hidden";
  if (v !== null && old === null) nextTick(() => closeBtn.value?.focus());
});

onMounted(() => document.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  document.documentElement.style.overflow = "";
});
</script>

<style scoped>
.lb-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  background: rgb(255 255 255 / 0.12);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}
.lb-arrow:hover {
  background: var(--color-sun);
  color: var(--color-ink);
}
.tile-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.tile-enter-from {
  opacity: 0;
  transform: scale(0.97);
}
</style>

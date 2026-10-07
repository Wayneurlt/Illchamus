<template>
  <section class="py-14 sm:py-20">
    <div class="shell">
      <div class="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto" role="tablist" :aria-label="m.gallery.filter">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          role="tab"
          :aria-selected="active === cat"
          class="shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
          :class="active === cat ? 'bg-maroon text-white' : 'bg-white border border-line text-ink hover:border-maroon'"
          @click="active = cat"
        >
          {{ m.gallery.categories[cat] }}
        </button>
      </div>

      <TransitionGroup tag="ul" name="tile" class="mt-8 columns-2 lg:columns-3 gap-3 sm:gap-5 [&>li]:mb-3 sm:[&>li]:mb-5">
        <li v-for="(item, index) in filtered" :key="item.key" class="break-inside-avoid">
          <button
            type="button"
            class="group relative block w-full overflow-hidden rounded-[20px] sm:rounded-[24px] bg-line"
            :aria-label="fill(m.gallery.open, { title: item.title })"
            @click="lightbox = index"
          >
            <Photo
              :src="item.src"
              :alt="item.description"
              :width="600"
              :height="item.tall ? 800 : 450"
              sizes="50vw lg:400px"
              class="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              :class="item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'"
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
            <button ref="closeBtn" type="button" class="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" :aria-label="m.common.close" @click="lightbox = null">
              <Icon name="heroicons:x-mark" class="h-6 w-6" />
            </button>
          </div>
          <div class="relative flex-1 min-h-0 flex items-center justify-center px-4" @click.self="lightbox = null">
            <img :src="currentItem.large" :alt="currentItem.description" class="max-h-full max-w-full object-contain rounded-2xl" />
            <button type="button" class="lb-arrow left-3 sm:left-6" :aria-label="m.common.previous" @click="step(-1)">
              <Icon name="heroicons:arrow-left" class="h-5 w-5" />
            </button>
            <button type="button" class="lb-arrow right-3 sm:right-6" :aria-label="m.common.next" @click="step(1)">
              <Icon name="heroicons:arrow-right" class="h-5 w-5" />
            </button>
          </div>
          <div class="p-5 text-center text-white">
            <p class="font-bold">{{ currentItem.title }}</p>
            <p class="text-sm text-white/70">{{ currentItem.description }}</p>
            <p v-if="creditFor(currentItem.src)" class="mt-1 text-xs text-white/50">
              {{ m.credits.photoBy }} {{ creditFor(currentItem.src)!.author }} ·
              <a :href="creditFor(currentItem.src)!.source" target="_blank" rel="noopener noreferrer" class="underline hover:text-white">{{ creditFor(currentItem.src)!.license }}</a>
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { GATHERING, baringo, img, photos } from "~/data/site";
import { creditFor } from "~/data/credits";

type Cat = "culture" | "nature" | "community" | "education";

const { m } = useLang();
const categories: ("all" | Cat)[] = ["all", "community", "education", "culture", "nature"];

// Photo, category and shape per item; titles/descriptions come from gallery.items in the locale files (same order).
const sources: { id?: string; src?: string; category: Cat; tall?: boolean }[] = [
  { src: GATHERING, category: "culture" },
  { id: photos.children, category: "community", tall: true },
  { src: baringo.fisherman, category: "nature" },
  { id: photos.classroom, category: "education" },
  { src: baringo.hippo, category: "nature" },
  { src: baringo.farmerTraining, category: "education" },
  { id: photos.hands, category: "community" },
  { src: baringo.crocodile, category: "nature" },
  { id: photos.woman, category: "community", tall: true },
  { src: baringo.kitchenGarden, category: "community" },
  { src: baringo.sunsetBoat, category: "nature" },
  { src: baringo.beehives, category: "community" },
  { id: photos.learner, category: "education", tall: true },
  { src: baringo.tilapia, category: "nature" },
  { id: photos.roller, category: "nature" },
  { src: baringo.deadTree, category: "nature", tall: true },
];

const items = computed(() =>
  sources.map((source, i) => ({
    ...source,
    key: source.id || source.src || String(i),
    src: source.src || img(source.id!, 800),
    large: source.src || img(source.id!, 1600),
    title: m.value.gallery.items[i]?.title || "",
    description: m.value.gallery.items[i]?.description || "",
  }))
);

const active = ref<"all" | Cat>("all");
const filtered = computed(() => (active.value === "all" ? items.value : items.value.filter((i) => i.category === active.value)));

const lightbox = ref<number | null>(null);
const currentItem = computed(() => (lightbox.value === null ? null : filtered.value[lightbox.value]));
const closeBtn = ref<HTMLButtonElement | null>(null);

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

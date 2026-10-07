<template>
  <section class="shell">
    <div class="relative overflow-hidden rounded-[28px] lg:rounded-[36px] bg-maroon text-white px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-20">
      <div class="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-14 items-start">
        <div data-aos="fade-up">
          <p class="eyebrow text-sun">{{ t.eyebrow }}</p>
          <h2 class="h2 text-white mt-3">{{ t.title }}</h2>
          <p class="mt-5 text-[17px] leading-relaxed text-white/80 max-w-md">{{ t.text }}</p>
          <p class="mt-6 inline-flex flex-wrap items-center gap-2 text-sm">
            <span v-for="method in t.payments" :key="method" class="rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white">
              {{ method }}
            </span>
          </p>
        </div>
        <ul class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <li v-for="(way, i) in ways" :key="way.to + i" data-aos="fade-up" :data-aos-delay="i * 80">
            <NuxtLink
              :to="way.to"
              class="group flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
              :class="way.primary ? 'bg-sun text-ink' : 'bg-white/[0.08] text-white ring-1 ring-white/15 hover:bg-white/[0.12]'"
            >
              <span class="w-12 h-12 rounded-2xl flex items-center justify-center" :class="way.primary ? 'bg-white/60' : 'bg-white/10 text-sun'">
                <Icon :name="way.icon" class="h-6 w-6" />
              </span>
              <h3 class="mt-6 text-xl font-bold tracking-tight">{{ t.ways[i]!.title }}</h3>
              <p class="mt-2 text-[15px] leading-relaxed" :class="way.primary ? 'text-ink/75' : 'text-white/70'">{{ t.ways[i]!.text }}</p>
              <span class="mt-auto pt-6 inline-flex items-center gap-1.5 font-bold text-[15px]">
                {{ t.ways[i]!.cta }}
                <Icon name="heroicons:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { m } = useLang();
const t = computed(() => m.value.home.give);

const ways = [
  { to: "/donate", icon: "heroicons:heart-solid", primary: true },
  { to: "/contact", icon: "heroicons:hand-raised" },
  { to: "/contact", icon: "heroicons:building-office-2" },
];
</script>

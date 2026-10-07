<template>
  <section v-if="upcoming.length" class="pt-16 sm:pt-20 lg:pt-28">
    <div class="shell">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up">
        <div class="max-w-2xl">
          <p class="eyebrow">{{ m.home.events.eyebrow }}</p>
          <h2 class="h2 mt-3">{{ m.home.events.title }}</h2>
        </div>
        <NuxtLink to="/events" class="btn btn-outline shrink-0 self-start sm:self-auto">{{ m.home.events.all }}</NuxtLink>
      </div>
      <div class="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <EventCard v-for="(event, i) in upcoming" :key="event.id" :event="event" compact data-aos="fade-up" :data-aos-delay="i * 80" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { m } = useLang();
const { data: upcoming } = await useEvents({ upcoming: true, limit: 3 });
</script>

<template>
  <article class="flex h-full flex-col sm:flex-row gap-5 rounded-[26px] bg-white border border-line p-5 sm:p-6" :class="past ? 'opacity-75' : ''">
    <div class="flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-0 shrink-0 sm:w-20 sm:h-24 rounded-2xl bg-sun-soft text-maroon px-4 py-3 sm:p-0 self-start">
      <span class="text-xs font-bold uppercase tracking-wider">{{ fmtDate(event.date, { month: "short" }) }}</span>
      <span class="text-3xl font-extrabold leading-none tracking-tight text-ink">{{ fmtDate(event.date, { day: "numeric" }) }}</span>
      <span class="text-xs font-semibold text-ink-soft sm:mt-0.5">{{ fmtDate(event.date, { weekday: "short" }) }}</span>
    </div>

    <div class="min-w-0 flex-1 flex flex-col">
      <p v-if="event.category" class="text-xs font-bold uppercase tracking-wider text-leaf">{{ event.category }}</p>
      <h3 class="mt-1 text-xl font-bold tracking-tight text-ink leading-snug">{{ title }}</h3>
      <dl class="mt-3 space-y-1.5 text-[15px] text-ink-soft">
        <div class="flex gap-2">
          <dt class="sr-only">{{ m.events.when }}</dt>
          <Icon name="heroicons:clock" class="h-5 w-5 shrink-0 text-maroon/70" aria-hidden="true" />
          <dd>{{ when }}</dd>
        </div>
        <div v-if="event.location" class="flex gap-2">
          <dt class="sr-only">{{ m.events.where }}</dt>
          <Icon name="heroicons:map-pin" class="h-5 w-5 shrink-0 text-maroon/70" aria-hidden="true" />
          <dd>{{ event.location }}</dd>
        </div>
      </dl>
      <p v-if="description" class="mt-3 text-[15px] leading-relaxed text-ink-soft whitespace-pre-line" :class="compact ? 'line-clamp-3' : ''">
        {{ description }}
      </p>

      <div v-if="!past" class="relative mt-auto pt-5">
        <button type="button" class="link-arrow text-[15px]" :aria-expanded="menu" @click="menu = !menu">
          <Icon name="heroicons:calendar-days" class="h-4 w-4" />
          {{ m.events.addToCalendar }}
        </button>
        <div v-if="menu" class="absolute left-0 bottom-full mb-2 z-10 w-56 rounded-2xl bg-white border border-line shadow-lg p-1.5">
          <a :href="googleCalendarUrl(calendarData)" target="_blank" rel="noopener noreferrer" class="cal-item" @click="menu = false">
            <Icon name="mdi:google" class="h-4 w-4" /> Google Calendar
          </a>
          <button type="button" class="cal-item w-full" @click="ics">
            <Icon name="heroicons:arrow-down-tray" class="h-4 w-4" /> Apple / Outlook (.ics)
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { SiteEvent } from "~/composables/useContent";

const props = defineProps<{ event: SiteEvent; compact?: boolean; past?: boolean }>();
const { m, tx, fmtDate } = useLang();

const title = computed(() => tx(props.event.title, props.event.titleSw));
const description = computed(() => tx(props.event.description, props.event.descriptionSw));

const when = computed(() => {
  const e = props.event;
  const day = fmtDate(e.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const end = e.endDate && e.endDate !== e.date ? ` – ${fmtDate(e.endDate, { day: "numeric", month: "long", year: "numeric" })}` : "";
  const time = e.startTime ? ` · ${e.startTime}${e.endTime ? `–${e.endTime}` : ""} EAT` : ` · ${m.value.events.allDay}`;
  return `${day}${end}${time}`;
});

const calendarData = computed(() => ({ ...props.event, title: title.value, description: description.value }));

const menu = ref(false);
const ics = () => {
  downloadIcs(calendarData.value);
  menu.value = false;
};
</script>

<style scoped>
.cal-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink);
  text-align: left;
}
.cal-item:hover {
  background: var(--color-sun-soft);
}
</style>

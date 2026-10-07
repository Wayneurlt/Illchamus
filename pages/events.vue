<template>
  <div>
    <PageHero :eyebrow="t.eyebrow" :title="t.title" :lead="t.lead" :image="GATHERING" image-position="object-[50%_35%]" :crumbs="[{ label: m.nav.events }]" />

    <section class="py-14 sm:py-20">
      <div class="shell grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-10 items-start">
        <!-- Month calendar -->
        <div class="rounded-[28px] bg-white border border-line p-5 sm:p-6 lg:sticky lg:top-24">
          <div class="flex items-center justify-between">
            <button type="button" class="cal-nav" :aria-label="t.prevMonth" @click="shiftMonth(-1)">
              <Icon name="heroicons:chevron-left" class="h-5 w-5" />
            </button>
            <h2 class="text-lg font-bold tracking-tight text-ink capitalize" aria-live="polite">{{ monthLabel }}</h2>
            <button type="button" class="cal-nav" :aria-label="t.nextMonth" @click="shiftMonth(1)">
              <Icon name="heroicons:chevron-right" class="h-5 w-5" />
            </button>
          </div>

          <div class="mt-5 grid grid-cols-7 text-center text-xs font-bold uppercase tracking-wide text-ink-soft" aria-hidden="true">
            <span v-for="d in t.weekdays" :key="d" class="py-1">{{ d }}</span>
          </div>
          <div class="mt-1 grid grid-cols-7 gap-1">
            <template v-for="cell in cells" :key="cell.key">
              <span v-if="!cell.date" aria-hidden="true" />
              <button
                v-else
                type="button"
                class="day"
                :class="{
                  'is-today': cell.date === today,
                  'has-events': cell.count > 0,
                  'is-selected': cell.date === selectedDay,
                }"
                :disabled="cell.count === 0"
                :aria-pressed="cell.date === selectedDay"
                :aria-label="cell.count ? fill(t.eventsOn, { date: fmtDate(cell.date) }) : fmtDate(cell.date)"
                @click="selectedDay = selectedDay === cell.date ? null : cell.date"
              >
                {{ cell.day }}
                <span v-if="cell.count" class="dot" aria-hidden="true" />
              </button>
            </template>
          </div>

          <div class="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
            <button type="button" class="font-bold text-maroon hover:underline" @click="goToday">{{ t.today }}</button>
            <span v-if="!monthEvents.length" class="text-ink-soft">{{ t.noneMonth }}</span>
          </div>
        </div>

        <!-- Event list -->
        <div class="min-w-0">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="h2 text-[1.75rem] sm:text-[2.25rem]">
              {{ selectedDay ? fill(t.eventsOn, { date: fmtDate(selectedDay) }) : t.upcoming }}
            </h2>
            <button v-if="selectedDay" type="button" class="btn btn-outline btn-sm" @click="selectedDay = null">
              <Icon name="heroicons:x-mark" class="h-4 w-4" />
              {{ t.upcoming }}
            </button>
          </div>

          <div v-if="listed.length" class="mt-6 grid grid-cols-1 gap-5">
            <EventCard v-for="event in listed" :key="event.id" :event="event" :past="(event.endDate || event.date) < today" />
          </div>
          <div v-else class="mt-6 rounded-[26px] border border-dashed border-line bg-white p-10 text-center">
            <Icon name="heroicons:calendar-days" class="mx-auto h-10 w-10 text-maroon/40" />
            <p class="mt-4 text-ink-soft max-w-md mx-auto">{{ t.none }}</p>
          </div>

          <details v-if="past.length && !selectedDay" class="group mt-10">
            <summary class="cursor-pointer list-none inline-flex items-center gap-2 font-bold text-ink">
              <Icon name="heroicons:chevron-right" class="h-5 w-5 transition-transform group-open:rotate-90" />
              {{ t.past }} ({{ past.length }})
            </summary>
            <div class="mt-5 grid grid-cols-1 gap-5">
              <EventCard v-for="event in past" :key="event.id" :event="event" past compact />
            </div>
          </details>
        </div>
      </div>
    </section>

    <PageCta :title="t.ctaTitle" :description="t.ctaText" :primary-text="t.ctaPrimary" primary-to="/contact" :secondary-text="t.ctaSecondary" secondary-to="/donate" />
  </div>
</template>

<script setup lang="ts">
import { GATHERING } from "~/data/site";
import type { SiteEvent } from "~/composables/useContent";

const { m, tx, fmtDate, dateLocale } = useLang();
const t = computed(() => m.value.events);
usePageMeta(() => t.value.metaTitle, () => t.value.metaDescription, { image: GATHERING });

const { data: events } = await useEvents();
const today = todayInKenya();

const covers = (e: SiteEvent, day: string) => day >= e.date && day <= (e.endDate || e.date);
const upcoming = computed(() => events.value.filter((e) => (e.endDate || e.date) >= today));
const past = computed(() => events.value.filter((e) => (e.endDate || e.date) < today).reverse());

// Calendar month shown: the month of the next event, otherwise this month.
const start = upcoming.value[0]?.date || today;
const month = ref({ y: Number(start.slice(0, 4)), m: Number(start.slice(5, 7)) - 1 });
const selectedDay = ref<string | null>(null);

const pad = (n: number) => String(n).padStart(2, "0");
const isoDay = (y: number, mo: number, d: number) => `${y}-${pad(mo + 1)}-${pad(d)}`;

const monthLabel = computed(() =>
  new Date(month.value.y, month.value.m, 1).toLocaleDateString(dateLocale.value, { month: "long", year: "numeric" })
);

const cells = computed(() => {
  const { y, m: mo } = month.value;
  const firstWeekday = (new Date(y, mo, 1).getDay() + 6) % 7; // Monday = 0
  const days = new Date(y, mo + 1, 0).getDate();
  const out: { key: string; date?: string; day?: number; count: number }[] = [];
  for (let i = 0; i < firstWeekday; i++) out.push({ key: `blank-${i}`, count: 0 });
  for (let d = 1; d <= days; d++) {
    const date = isoDay(y, mo, d);
    out.push({ key: date, date, day: d, count: events.value.filter((e) => covers(e, date)).length });
  }
  return out;
});

const monthEvents = computed(() => {
  const prefix = `${month.value.y}-${pad(month.value.m + 1)}`;
  return events.value.filter((e) => e.date.startsWith(prefix) || (e.endDate || e.date).startsWith(prefix));
});

const listed = computed(() => (selectedDay.value ? events.value.filter((e) => covers(e, selectedDay.value!)) : upcoming.value));

const shiftMonth = (d: number) => {
  const next = new Date(month.value.y, month.value.m + d, 1);
  month.value = { y: next.getFullYear(), m: next.getMonth() };
  selectedDay.value = null;
};
const goToday = () => {
  month.value = { y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) - 1 };
  selectedDay.value = null;
};

// Structured data so upcoming events can appear in Google's event listings.
const origin = useSiteOrigin();
useJsonLd(() => ({
  "@context": "https://schema.org",
  "@graph": upcoming.value.slice(0, 20).map((e) => ({
    "@type": "Event",
    name: tx(e.title, e.titleSw),
    description: tx(e.description, e.descriptionSw) || undefined,
    startDate: e.startTime ? `${e.date}T${e.startTime}:00+03:00` : e.date,
    endDate: e.endDate ? (e.endTime ? `${e.endDate}T${e.endTime}:00+03:00` : e.endDate) : e.endTime ? `${e.date}T${e.endTime}:00+03:00` : undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: e.location || "Baringo County, Kenya", address: { "@type": "PostalAddress", addressRegion: "Baringo County", addressCountry: "KE" } },
    image: e.image ? [/^https?:/.test(e.image) ? e.image : `${origin}${e.image}`] : [`${origin}/images/og-image.jpg`],
    organizer: { "@type": "Organization", name: "Illchamus Community CBO", url: origin },
    url: `${origin}/events`,
  })),
}));
</script>

<style scoped>
.cal-nav {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-ink);
  background: var(--color-paper);
}
.cal-nav:hover {
  background: var(--color-sun-soft);
}
.day {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-ink-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}
.day:disabled {
  cursor: default;
}
.day.is-today {
  outline: 2px solid var(--color-line);
  color: var(--color-ink);
}
.day.has-events {
  background: var(--color-sun-soft);
  color: var(--color-maroon);
  font-weight: 800;
}
.day.has-events:hover {
  background: var(--color-sun);
  color: var(--color-ink);
}
.day.is-selected {
  background: var(--color-maroon);
  color: #fff;
}
.dot {
  position: absolute;
  bottom: 0.3rem;
  left: 50%;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 9999px;
  background: currentColor;
  transform: translateX(-50%);
}
</style>

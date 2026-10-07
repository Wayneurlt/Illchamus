<template>
  <div class="space-y-6">
    <!-- Stats -->
    <div class="grid grid-cols-1 gap-4 @sm:grid-cols-2 @4xl:grid-cols-4">
      <button v-for="card in cards" :key="card.label" type="button" class="stat" @click="$emit('go', card.tab)">
        <span class="flex items-center justify-between">
          <span class="text-sm font-semibold text-ink-soft">{{ card.label }}</span>
          <span class="w-9 h-9 rounded-xl flex items-center justify-center" :class="card.tone"><Icon :name="card.icon" class="h-5 w-5" /></span>
        </span>
        <span class="mt-3 block text-3xl font-extrabold tracking-tight text-ink">{{ card.value }}</span>
        <span class="mt-1 block text-sm text-ink-soft">{{ card.note }}</span>
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6 @4xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
      <div class="space-y-6">
        <!-- Quick actions -->
        <section class="panel">
          <h2 class="panel-title">Quick actions</h2>
          <div class="mt-4 grid grid-cols-1 gap-3 @xl:grid-cols-3">
            <button v-for="a in actions" :key="a.label" type="button" class="action" @click="$emit('create', a.tab)">
              <Icon :name="a.icon" class="h-5 w-5 text-maroon" />
              {{ a.label }}
            </button>
          </div>
        </section>

        <!-- Recent messages -->
        <section class="panel">
          <div class="flex items-center justify-between gap-3">
            <h2 class="panel-title">Latest messages</h2>
            <button type="button" class="text-sm font-bold text-maroon hover:underline" @click="$emit('go', 'messages')">See all</button>
          </div>
          <ul v-if="messages.length" class="mt-4 divide-y divide-line">
            <li v-for="msg in messages.slice(0, 4)" :key="msg.id" class="py-3 flex items-start gap-3">
              <span class="mt-1 w-2 h-2 shrink-0 rounded-full" :class="msg.createdAt > lastSeen ? 'bg-sun' : 'bg-line'" />
              <div class="min-w-0 flex-1">
                <p class="text-sm"><b class="text-ink">{{ msg.name }}</b> <span class="text-ink-soft">· {{ msg.kind === "pledge" ? `Pledge KES ${msg.amount?.toLocaleString("en-US")}` : msg.subject }}</span></p>
                <p v-if="msg.message" class="mt-0.5 text-sm text-ink-soft truncate">{{ msg.message }}</p>
              </div>
              <span class="shrink-0 text-xs text-ink-soft">{{ ago(msg.createdAt) }}</span>
            </li>
          </ul>
          <p v-else class="mt-4 text-sm text-ink-soft">No messages yet. They'll appear here when people use the Contact or Donate forms.</p>
        </section>
      </div>

      <div class="space-y-6">
        <!-- To do -->
        <section class="panel">
          <h2 class="panel-title">To do</h2>
          <ul v-if="todos.length" class="mt-4 space-y-3">
            <li v-for="todo in todos" :key="todo.text">
              <button type="button" class="todo" @click="$emit('go', todo.tab)">
                <Icon name="heroicons:exclamation-circle" class="h-5 w-5 shrink-0 text-maroon" />
                <span class="flex-1 text-left">{{ todo.text }}</span>
                <Icon name="heroicons:chevron-right" class="h-4 w-4 shrink-0 text-ink-soft" />
              </button>
            </li>
          </ul>
          <p v-else class="mt-4 flex items-center gap-2 text-sm font-semibold text-leaf">
            <Icon name="heroicons:check-circle-solid" class="h-5 w-5" /> Everything is set up.
          </p>
        </section>

        <!-- Next events -->
        <section class="panel">
          <div class="flex items-center justify-between gap-3">
            <h2 class="panel-title">Coming up</h2>
            <button type="button" class="text-sm font-bold text-maroon hover:underline" @click="$emit('go', 'events')">Calendar</button>
          </div>
          <ul v-if="upcoming.length" class="mt-4 space-y-3">
            <li v-for="e in upcoming.slice(0, 3)" :key="e.id" class="flex items-center gap-3">
              <span class="w-12 h-12 shrink-0 rounded-xl bg-sun-soft text-maroon flex flex-col items-center justify-center leading-none">
                <span class="text-[10px] font-bold uppercase">{{ fmt(e.date, { month: "short" }) }}</span>
                <span class="text-lg font-extrabold text-ink">{{ fmt(e.date, { day: "numeric" }) }}</span>
              </span>
              <span class="min-w-0">
                <span class="block font-bold text-ink truncate">{{ e.title }}</span>
                <span class="block text-sm text-ink-soft truncate">{{ e.location || "Location to be confirmed" }}</span>
              </span>
            </li>
          </ul>
          <p v-else class="mt-4 text-sm text-ink-soft">No upcoming events. Add one so visitors know what's on.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post, SiteEvent, TeamMember } from "~/composables/useContent";
import type { Message, Subscriber } from "~/server/utils/content";

const props = defineProps<{
  posts: Post[];
  events: SiteEvent[];
  team: TeamMember[];
  messages: Message[];
  subscribers: Subscriber[];
  mail: boolean;
  passwordCustom: boolean;
  lastSeen: string;
  today: string;
}>();
defineEmits<{ go: [tab: string]; create: [tab: string] }>();

const upcoming = computed(() => props.events.filter((e) => (e.endDate || e.date) >= props.today).sort((a, b) => a.date.localeCompare(b.date)));
const newMessages = computed(() => props.messages.filter((m) => m.createdAt > props.lastSeen).length);

const cards = computed(() => [
  { label: "News posts", value: props.posts.filter((p) => p.published).length, note: `${props.posts.filter((p) => !p.published).length} hidden`, icon: "heroicons:newspaper", tone: "bg-sun-soft text-maroon", tab: "posts" },
  { label: "Upcoming events", value: upcoming.value.length, note: `${props.events.length} in total`, icon: "heroicons:calendar-days", tone: "bg-lake-soft text-[#24647c]", tab: "events" },
  { label: "Messages", value: props.messages.length, note: newMessages.value ? `${newMessages.value} new` : "All caught up", icon: "heroicons:inbox", tone: "bg-[#f4e3e0] text-maroon", tab: "messages" },
  { label: "Subscribers", value: props.subscribers.length, note: "Newsletter list", icon: "heroicons:envelope-open", tone: "bg-leaf-soft text-leaf", tab: "subscribers" },
]);

const actions = [
  { label: "Write a post", icon: "heroicons:pencil-square", tab: "posts" },
  { label: "Add an event", icon: "heroicons:calendar-days", tab: "events" },
  { label: "Add a person", icon: "heroicons:user-plus", tab: "team" },
];

const todos = computed(() => {
  const list: { text: string; tab: string }[] = [];
  const unnamed = props.team.filter((t) => t.name === "Name coming soon").length;
  if (unnamed) list.push({ text: `Add names and photos for ${unnamed} leadership role${unnamed > 1 ? "s" : ""}`, tab: "team" });
  const noPhoto = props.team.filter((t) => t.name !== "Name coming soon" && !t.photo).length;
  if (noPhoto) list.push({ text: `Add photos for ${noPhoto} team member${noPhoto > 1 ? "s" : ""}`, tab: "team" });
  if (!upcoming.value.length) list.push({ text: "Add upcoming events to the calendar", tab: "events" });
  if (!props.mail) list.push({ text: "Turn on email delivery so messages reach your inbox", tab: "settings" });
  if (!props.passwordCustom) list.push({ text: "Change the admin password from the server default", tab: "settings" });
  return list;
});

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", opts);
const ago = (iso: string) => {
  const mins = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)} min ago`;
  if (mins < 60 * 24) return `${Math.round(mins / 60)} h ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};
</script>

<style scoped>
.stat {
  text-align: left;
  border-radius: 22px;
  border: 1px solid var(--color-line);
  background: #fff;
  padding: 1.25rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.stat:hover {
  box-shadow: 0 18px 40px -28px rgb(46 20 20 / 0.5);
  transform: translateY(-2px);
}
.panel {
  border-radius: 22px;
  border: 1px solid var(--color-line);
  background: #fff;
  padding: 1.25rem 1.5rem;
}
.panel-title {
  font-size: 1.0625rem;
  font-weight: 800;
  color: var(--color-ink);
}
.action {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1rem;
  border: 1.5px dashed var(--color-line);
  padding: 0.875rem 1rem;
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--color-ink);
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.action:hover {
  border-color: var(--color-maroon);
  background: var(--color-sun-soft);
}
.todo {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.75rem;
  border-radius: 1rem;
  background: var(--color-paper);
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-ink);
}
.todo:hover {
  background: var(--color-sun-soft);
}
</style>

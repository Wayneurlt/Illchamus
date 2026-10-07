<template>
  <AdminShell :groups="navGroups" :active="tab" @select="setTab" @logout="logout">
    <div class="sticky top-16 lg:top-0 z-20 hidden lg:flex items-center gap-4 h-20 px-8 bg-paper/90 backdrop-blur border-b border-line">
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight text-ink truncate">{{ editing ? editorTitle : current.title }}</h1>
        <p class="text-sm text-ink-soft truncate">{{ editing ? current.title : current.text }}</p>
      </div>
      <button v-if="!editing && current.add" type="button" class="btn btn-ink btn-sm ml-auto" @click="openEditor(null)">
        <Icon name="heroicons:plus" class="h-4 w-4" />
        {{ current.add }}
      </button>
      <a v-else-if="!editing && tab === 'subscribers'" href="/api/admin/subscribers.csv" class="btn btn-ink btn-sm ml-auto">
        <Icon name="heroicons:arrow-down-tray" class="h-4 w-4" />
        Download CSV
      </a>
    </div>
    <main class="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
      <div v-if="status && !status.mail && tab !== 'settings' && tab !== 'overview'" class="mb-6 flex gap-3 rounded-2xl bg-sun-soft p-4 text-sm text-ink">
        <Icon name="heroicons:exclamation-triangle" class="h-5 w-5 shrink-0 text-maroon" />
        <p>
          <b>Email delivery isn't set up yet.</b> Messages, pledges and sign-ups are still saved and appear here, but they are not emailed to
          {{ status.contactTo }}. Add <code>NUXT_RESEND_API_KEY</code> on the server to turn emails on.
        </p>
      </div>
      <p v-if="loadError" class="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-800">{{ loadError }}</p>

      <!-- Editors -->
      <div v-if="editing" class="mx-auto max-w-3xl rounded-[28px] bg-white border border-line px-6 sm:px-8 pt-6 sm:pt-8">
        <div class="flex items-center justify-between gap-3">
          <h1 class="text-2xl font-bold tracking-tight text-ink">{{ editorTitle }}</h1>
          <button type="button" class="w-10 h-10 rounded-full hover:bg-paper flex items-center justify-center" aria-label="Close editor" @click="closeEditor">
            <Icon name="heroicons:x-mark" class="h-5 w-5" />
          </button>
        </div>
        <div class="mt-6">
          <AdminPostForm v-if="tab === 'posts'" :item="(editing.item as any)" :tags="postTags" @saved="onSaved" @cancel="closeEditor" />
          <AdminEventForm v-else-if="tab === 'events'" :item="(editing.item as any)" @saved="onSaved" @cancel="closeEditor" />
          <AdminTeamForm v-else-if="tab === 'team'" :item="(editing.item as any)" :next-order="team.length + 1" @saved="onSaved" @cancel="closeEditor" />
        </div>
      </div>

      <AdminOverview
        v-else-if="tab === 'overview'"
        :posts="posts"
        :events="events"
        :team="team"
        :messages="messages"
        :subscribers="subscribers"
        :mail="!!status?.mail"
        :password-custom="status?.passwordSource === 'custom'"
        :last-seen="messagesSeenAt"
        :today="today"
        @go="setTab"
        @create="(t) => { setTab(t); openEditor(null); }"
      />

      <AdminSettings v-else-if="tab === 'settings'" :status="status" @changed="load" />

      <!-- News -->
      <section v-else-if="tab === 'posts'">
        <ListHeader title="News & stories" text="Posts appear on the News page and the home page, newest first." add="New post" @add="openEditor(null)" />
        <ul class="mt-6 space-y-3">
          <li v-for="p in posts" :key="p.slug" class="row">
            <div class="thumb">
              <img v-if="p.image" :src="thumb(p.image)" alt="" class="w-full h-full object-cover" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-bold text-ink truncate">{{ p.title }}</p>
              <p class="text-sm text-ink-soft">
                {{ fmt(p.date) }}<span v-if="p.tag"> · {{ p.tag }}</span>
                <span v-if="p.titleSw" class="ml-1 rounded bg-lake-soft px-1.5 text-xs font-bold text-[#24647c]">SW</span>
              </p>
            </div>
            <StatusBadge :published="p.published" />
            <RowActions :view="p.published ? `/blog/${p.slug}` : undefined" @edit="openEditor(p)" @delete="remove('posts', p.slug, p.title)" />
          </li>
          <EmptyRow v-if="!posts.length" text="No posts yet. Add your first story." />
        </ul>
      </section>

      <!-- Events -->
      <section v-else-if="tab === 'events'">
        <ListHeader title="Events" text="Upcoming events show on the Events page and the home page." add="New event" @add="openEditor(null)" />
        <ul class="mt-6 space-y-3">
          <li v-for="e in events" :key="e.id" class="row" :class="(e.endDate || e.date) < today ? 'opacity-60' : ''">
            <div class="thumb flex flex-col items-center justify-center bg-sun-soft text-maroon">
              <span class="text-[10px] font-bold uppercase">{{ fmt(e.date, { month: "short" }) }}</span>
              <span class="text-xl font-extrabold leading-none text-ink">{{ fmt(e.date, { day: "numeric" }) }}</span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-bold text-ink truncate">{{ e.title }}</p>
              <p class="text-sm text-ink-soft truncate">
                {{ fmt(e.date) }}<span v-if="e.startTime"> · {{ e.startTime }}</span><span v-if="e.location"> · {{ e.location }}</span>
                <span v-if="(e.endDate || e.date) < today"> · past</span>
              </p>
            </div>
            <StatusBadge :published="e.published" />
            <RowActions view="/events" @edit="openEditor(e)" @delete="remove('events', e.id, e.title)" />
          </li>
          <EmptyRow v-if="!events.length" text="No events yet. Add one to fill the calendar." />
        </ul>
      </section>

      <!-- Team -->
      <section v-else-if="tab === 'team'">
        <ListHeader title="Leadership team" text="Shown on the About page in the order below." add="Add person" @add="openEditor(null)" />
        <ul class="mt-6 space-y-3">
          <li v-for="t in team" :key="t.id" class="row">
            <div class="thumb rounded-full">
              <img v-if="t.photo" :src="t.photo" alt="" class="w-full h-full object-cover" />
              <Icon v-else name="heroicons:user-circle" class="h-8 w-8 m-auto mt-3 text-ink-soft/50" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-bold truncate" :class="t.name === 'Name coming soon' ? 'text-maroon italic' : 'text-ink'">
                {{ t.name === "Name coming soon" ? "Add name and photo" : t.name }}
              </p>
              <p class="text-sm text-ink-soft">{{ t.role }}</p>
            </div>
            <StatusBadge :published="t.published" />
            <RowActions view="/about#team" @edit="openEditor(t)" @delete="remove('team', t.id, t.name)" />
          </li>
          <EmptyRow v-if="!team.length" text="No team members yet." />
        </ul>
      </section>

      <!-- Messages -->
      <section v-else-if="tab === 'messages'">
        <ListHeader title="Messages & pledges" text="Everything sent through the Contact and Donate forms." />
        <ul class="mt-6 space-y-3">
          <li v-for="msg in messages" :key="msg.id" class="rounded-[22px] bg-white border border-line p-5">
            <div class="flex flex-wrap items-start gap-3">
              <span class="rounded-full px-2.5 py-1 text-xs font-bold" :class="msg.kind === 'pledge' ? 'bg-sun text-ink' : 'bg-lake-soft text-[#24647c]'">
                {{ msg.kind === "pledge" ? "Donation pledge" : msg.subject || "Message" }}
              </span>
              <span class="text-sm text-ink-soft">{{ new Date(msg.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) }}</span>
              <span v-if="msg.createdAt > messagesSeenAt" class="rounded-full bg-sun px-2 py-0.5 text-xs font-bold text-ink">New</span>
              <span v-if="msg.emailed" class="text-xs font-semibold text-leaf inline-flex items-center gap-1"><Icon name="heroicons:check" class="h-3.5 w-3.5" /> emailed</span>
              <button type="button" class="ml-auto text-sm font-semibold text-red-700 hover:underline" @click="remove('messages', msg.id, `the message from ${msg.name}`)">Delete</button>
            </div>
            <p class="mt-3 font-bold text-ink">{{ msg.name }}</p>
            <p class="text-sm">
              <a :href="`mailto:${msg.email}`" class="font-semibold text-maroon hover:underline break-all">{{ msg.email }}</a>
              <template v-if="msg.phone"> · <a :href="`tel:${msg.phone.replace(/\s/g, '')}`" class="font-semibold text-maroon hover:underline">{{ msg.phone }}</a></template>
            </p>
            <p v-if="msg.kind === 'pledge'" class="mt-3 text-lg font-extrabold text-ink">KES {{ msg.amount?.toLocaleString("en-US") }} <span class="text-sm font-semibold text-ink-soft">· {{ msg.frequency }}</span></p>
            <p v-if="msg.message" class="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft">{{ msg.message }}</p>
          </li>
          <EmptyRow v-if="!messages.length" text="No messages yet." />
        </ul>
      </section>

      <!-- Subscribers -->
      <section v-else-if="tab === 'subscribers'">
        <ListHeader title="Newsletter subscribers" :text="`${subscribers.length} people have signed up.${status?.audience ? ' New sign-ups are also added to your Resend audience.' : ''}`">
          <a href="/api/admin/subscribers.csv" class="btn btn-ink btn-sm">
            <Icon name="heroicons:arrow-down-tray" class="h-4 w-4" />
            Download CSV
          </a>
        </ListHeader>
        <div class="mt-6 overflow-hidden rounded-[22px] bg-white border border-line">
          <table class="w-full text-left text-sm">
            <thead class="bg-paper text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th class="px-4 py-3">Email</th>
                <th class="px-4 py-3 hidden sm:table-cell">From</th>
                <th class="px-4 py-3 hidden sm:table-cell">Date</th>
                <th class="px-4 py-3"><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in subscribers" :key="s.id" class="border-t border-line">
                <td class="px-4 py-3 font-semibold text-ink break-all">{{ s.email }}</td>
                <td class="px-4 py-3 hidden sm:table-cell text-ink-soft capitalize">{{ s.source }} · {{ (s.lang || "en").toUpperCase() }}</td>
                <td class="px-4 py-3 hidden sm:table-cell text-ink-soft">{{ new Date(s.createdAt).toLocaleDateString("en-GB") }}</td>
                <td class="px-4 py-3 text-right">
                  <button type="button" class="font-semibold text-red-700 hover:underline" @click="remove('subscribers', s.id, s.email)">Remove</button>
                </td>
              </tr>
              <tr v-if="!subscribers.length"><td colspan="4" class="px-4 py-10 text-center text-ink-soft">No subscribers yet.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </AdminShell>
</template>

<script setup lang="ts">
import type { Post, SiteEvent, TeamMember } from "~/composables/useContent";
import type { Message, Subscriber } from "~/server/utils/content";
import type { AdminType } from "~/composables/useAdmin";

definePageMeta({ layout: "admin", middleware: "admin" });
useHead({ title: "Admin • Illchamus Community CBO", meta: [{ name: "robots", content: "noindex" }] });

type Tab = "overview" | "posts" | "events" | "team" | "messages" | "subscribers" | "settings";
const TABS: Tab[] = ["overview", "posts", "events", "team", "messages", "subscribers", "settings"];
const route = useRoute();
const router = useRouter();
const tab = computed<Tab>(() => (TABS.includes(route.query.tab as Tab) ? (route.query.tab as Tab) : "overview"));
const setTab = (id: string) => {
  editing.value = null;
  router.replace({ query: id === "overview" ? {} : { tab: id } });
  window.scrollTo({ top: 0 });
};

const api = useAdminApi();
const posts = ref<Post[]>([]);
const events = ref<SiteEvent[]>([]);
const team = ref<TeamMember[]>([]);
const messages = ref<Message[]>([]);
const subscribers = ref<(Subscriber & { id: string })[]>([]);
type Status = { mail: boolean; audience: boolean; contactTo: string; passwordSource: "custom" | "server"; passwordChangedAt: string | null; minPasswordLength: number };
const status = ref<Status | null>(null);
const loadError = ref("");
const today = todayInKenya();

// "New" messages are those that arrived since the inbox was last opened (per browser).
const messagesSeenAt = ref("");
onMounted(() => {
  try {
    messagesSeenAt.value = localStorage.getItem("admin-messages-seen") || "";
  } catch {}
});
watch(tab, (now, before) => {
  if (before === "messages" && now !== "messages") {
    messagesSeenAt.value = new Date().toISOString();
    try {
      localStorage.setItem("admin-messages-seen", messagesSeenAt.value);
    } catch {}
  }
});
const newMessages = computed(() => messages.value.filter((m) => m.createdAt > messagesSeenAt.value).length);
const unnamedTeam = computed(() => team.value.filter((t) => t.name === "Name coming soon").length);

const navGroups = computed(() => [
  { title: "Overview", items: [{ id: "overview", label: "Dashboard", icon: "heroicons:squares-2x2" }] },
  {
    title: "Content",
    items: [
      { id: "posts", label: "News & stories", icon: "heroicons:newspaper", badge: posts.value.length || undefined, badgeTone: "muted" as const },
      { id: "events", label: "Events", icon: "heroicons:calendar-days", badge: events.value.filter((e) => (e.endDate || e.date) >= today).length || undefined, badgeTone: "muted" as const },
      { id: "team", label: "Team", icon: "heroicons:users", badge: unnamedTeam.value ? "!" : undefined, badgeTone: "alert" as const },
    ],
  },
  {
    title: "Inbox",
    items: [
      { id: "messages", label: "Messages", icon: "heroicons:inbox", badge: newMessages.value || undefined, badgeTone: "alert" as const },
      { id: "subscribers", label: "Subscribers", icon: "heroicons:envelope-open", badge: subscribers.value.length || undefined, badgeTone: "muted" as const },
    ],
  },
  { title: "Settings", items: [{ id: "settings", label: "Account & security", icon: "heroicons:cog-6-tooth" }] },
]);

const SECTION_COPY: Record<Tab, { title: string; text: string; add?: string }> = {
  overview: { title: "Dashboard", text: "An overview of the website and what needs attention." },
  posts: { title: "News & stories", text: "Posts appear on the News page and the home page, newest first.", add: "New post" },
  events: { title: "Events", text: "Upcoming events show on the Events page and the home page.", add: "New event" },
  team: { title: "Leadership team", text: "Shown on the About page in the order below.", add: "Add person" },
  messages: { title: "Messages & pledges", text: "Everything sent through the Contact and Donate forms." },
  subscribers: { title: "Newsletter subscribers", text: "People who signed up for updates." },
  settings: { title: "Account & security", text: "Change the admin password and check email delivery." },
};
const current = computed(() => SECTION_COPY[tab.value]);

const postTags = computed(() => [...new Set(posts.value.map((p) => p.tag).filter((t): t is string => !!t))]);

async function load() {
  loadError.value = "";
  try {
    const [p, e, t, msg, s, st] = await Promise.all([
      api.list<Post>("posts"),
      api.list<SiteEvent>("events"),
      api.list<TeamMember>("team"),
      api.list<Message>("messages"),
      api.list<Subscriber & { id: string }>("subscribers"),
      $fetch<Status>("/api/admin/status"),
    ]);
    posts.value = p;
    events.value = e;
    team.value = t;
    messages.value = msg;
    subscribers.value = s;
    status.value = st;
  } catch (err) {
    loadError.value = adminError(err);
    if ((err as any)?.statusCode === 401) navigateTo("/admin/login");
  }
}
onMounted(load);

// Editor state
const editing = ref<{ item: Post | SiteEvent | TeamMember | null } | null>(null);
const openEditor = (item: Post | SiteEvent | TeamMember | null) => {
  editing.value = { item };
  window.scrollTo({ top: 0 });
};
const closeEditor = () => (editing.value = null);
const editorTitle = computed(() => {
  const isNew = !editing.value?.item;
  return { posts: isNew ? "New post" : "Edit post", events: isNew ? "New event" : "Edit event", team: isNew ? "Add person" : "Edit person" }[tab.value as "posts"] || "";
});
const onSaved = async () => {
  closeEditor();
  await load();
};

async function remove(type: AdminType, id: string, label: string) {
  if (!window.confirm(`Delete ${label}? This can't be undone.`)) return;
  try {
    await api.remove(type, id);
    await load();
  } catch (err) {
    loadError.value = adminError(err);
  }
}

const { clear } = useUserSession();
const logout = async () => {
  await $fetch("/api/admin/logout", { method: "POST" });
  await clear();
  navigateTo("/admin/login");
};

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", opts);
const thumb = (url: string) => (url.includes("images.unsplash.com") ? url.replace(/w=\d+/, "w=160") : url);

// Small presentational helpers used only on this page
const ListHeader = defineComponent({
  props: { title: String, text: String, add: String },
  emits: ["add"],
  setup(props, { emit, slots }) {
    return () =>
      // Desktop shows the section title in the sticky bar above, so this header is for phones.
      h("div", { class: "flex flex-wrap items-end justify-between gap-4 lg:hidden" }, [
        h("div", [h("h1", { class: "text-2xl sm:text-3xl font-bold tracking-tight text-ink" }, props.title), h("p", { class: "mt-1 text-ink-soft" }, props.text)]),
        slots.default?.() ??
          (props.add
            ? h("button", { type: "button", class: "btn btn-ink btn-sm", onClick: () => emit("add") }, [h(resolveComponent("Icon"), { name: "heroicons:plus", class: "h-4 w-4" }), props.add])
            : null),
      ]);
  },
});
const StatusBadge = defineComponent({
  props: { published: Boolean },
  setup(props) {
    return () =>
      h(
        "span",
        { class: ["hidden sm:inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-bold", props.published ? "bg-leaf-soft text-leaf" : "bg-paper text-ink-soft ring-1 ring-line"] },
        props.published ? "Live" : "Hidden"
      );
  },
});
const RowActions = defineComponent({
  props: { view: String },
  emits: ["edit", "delete"],
  setup(props, { emit }) {
    const Icon = resolveComponent("Icon");
    return () =>
      h("div", { class: "flex shrink-0 items-center gap-1" }, [
        props.view ? h("a", { href: props.view, target: "_blank", class: "icon-btn", title: "View on site", "aria-label": "View on site" }, [h(Icon, { name: "heroicons:eye", class: "h-5 w-5" })]) : null,
        h("button", { type: "button", class: "icon-btn", title: "Edit", "aria-label": "Edit", onClick: () => emit("edit") }, [h(Icon, { name: "heroicons:pencil-square", class: "h-5 w-5" })]),
        h("button", { type: "button", class: "icon-btn hover:!text-red-700", title: "Delete", "aria-label": "Delete", onClick: () => emit("delete") }, [h(Icon, { name: "heroicons:trash", class: "h-5 w-5" })]),
      ]);
  },
});
const EmptyRow = defineComponent({
  props: { text: String },
  setup(props) {
    return () => h("li", { class: "rounded-[22px] border border-dashed border-line bg-white p-10 text-center text-ink-soft" }, props.text);
  },
});
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 22px;
  border: 1px solid var(--color-line);
  background: #fff;
  padding: 0.75rem 1rem 0.75rem 0.75rem;
}
.thumb {
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 0.875rem;
  background: var(--color-paper);
}
:deep(.icon-btn) {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-ink-soft);
}
:deep(.icon-btn:hover) {
  background: var(--color-paper);
  color: var(--color-maroon);
}
</style>

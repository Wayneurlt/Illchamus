<template>
  <div class="min-h-screen lg:flex">
    <!-- Phone / tablet top bar -->
    <header class="lg:hidden sticky top-0 z-30 flex items-center gap-3 h-16 px-4 bg-white/95 backdrop-blur border-b border-line">
      <button
        ref="openBtn"
        type="button"
        class="w-11 h-11 -ml-1 rounded-xl flex items-center justify-center text-ink hover:bg-paper"
        aria-label="Open menu"
        :aria-expanded="drawer"
        aria-controls="admin-sidebar"
        @click="drawer = true"
      >
        <Icon name="heroicons:bars-3" class="h-6 w-6" />
      </button>
      <LogoBadge compact class="w-9 h-9 rounded-full ring-1 ring-line" />
      <p class="font-extrabold text-ink truncate">{{ activeLabel }}</p>
    </header>

    <!-- Drawer backdrop -->
    <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-150" leave-to-class="opacity-0">
      <div v-if="drawer" class="lg:hidden fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm" aria-hidden="true" @click="drawer = false" />
    </Transition>

    <!-- Sidebar -->
    <aside
      id="admin-sidebar"
      class="sidebar fixed lg:sticky top-0 left-0 z-50 h-dvh shrink-0 flex flex-col bg-maroon-deep text-white transition-[transform,width] duration-300 ease-out"
      :class="[drawer ? 'translate-x-0' : '-translate-x-full lg:translate-x-0', collapsed ? 'lg:w-[84px]' : 'lg:w-[272px]', 'w-[280px]']"
      aria-label="Admin navigation"
    >
      <div class="flex items-center gap-3 h-20 px-4 border-b border-white/10 shrink-0" :class="collapsed ? 'lg:justify-center lg:px-0' : ''">
        <LogoBadge :compact="collapsed" class="w-12 h-12 shrink-0 rounded-full" />
        <div class="min-w-0 leading-tight" :class="collapsed ? 'lg:hidden' : ''">
          <p class="font-extrabold truncate">Website admin</p>
          <p class="text-xs text-white/60 truncate">Illchamus Community CBO</p>
        </div>
        <button type="button" class="lg:hidden ml-auto w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10" aria-label="Close menu" @click="drawer = false">
          <Icon name="heroicons:x-mark" class="h-5 w-5" />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto overscroll-contain px-3 py-4 space-y-6">
        <div v-for="group in groups" :key="group.title">
          <p class="px-3 mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/45" :class="collapsed ? 'lg:sr-only' : ''">{{ group.title }}</p>
          <ul class="space-y-1">
            <li v-for="item in group.items" :key="item.id">
              <button
                type="button"
                class="nav-item"
                :class="[active === item.id ? 'is-active' : '', collapsed ? 'lg:justify-center lg:px-0' : '']"
                :aria-current="active === item.id ? 'page' : undefined"
                :title="collapsed ? item.label : undefined"
                @click="choose(item.id)"
              >
                <span class="relative shrink-0">
                  <Icon :name="item.icon" class="h-5 w-5" />
                  <span v-if="collapsed && item.badge" class="hidden lg:block absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-sun ring-2 ring-maroon-deep" />
                </span>
                <span class="flex-1 truncate text-left" :class="collapsed ? 'lg:hidden' : ''">{{ item.label }}</span>
                <span
                  v-if="item.badge"
                  class="rounded-full px-2 py-0.5 text-xs font-bold"
                  :class="[item.badgeTone === 'alert' ? 'bg-sun text-ink' : 'bg-white/15 text-white', collapsed ? 'lg:hidden' : '']"
                >
                  {{ item.badge }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div class="shrink-0 border-t border-white/10 p-3 space-y-1">
        <a href="/" target="_blank" rel="noopener" class="nav-item" :class="collapsed ? 'lg:justify-center lg:px-0' : ''" :title="collapsed ? 'View website' : undefined">
          <Icon name="heroicons:arrow-top-right-on-square" class="h-5 w-5 shrink-0" />
          <span :class="collapsed ? 'lg:hidden' : ''">View website</span>
        </a>
        <button type="button" class="nav-item" :class="collapsed ? 'lg:justify-center lg:px-0' : ''" :title="collapsed ? 'Sign out' : undefined" @click="$emit('logout')">
          <Icon name="heroicons:arrow-right-on-rectangle" class="h-5 w-5 shrink-0" />
          <span :class="collapsed ? 'lg:hidden' : ''">Sign out</span>
        </button>
        <!-- Wrapped so "hidden" isn't overridden by .nav-item's display rule -->
        <div class="hidden lg:block">
        <button
          type="button"
          class="nav-item"
          :class="collapsed ? 'lg:justify-center lg:px-0' : ''"
          :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          :title="collapsed ? 'Expand sidebar' : undefined"
          @click="toggleCollapsed"
        >
          <Icon name="heroicons:chevron-double-left" class="h-5 w-5 shrink-0 transition-transform" :class="collapsed ? 'rotate-180' : ''" />
          <span :class="collapsed ? 'lg:hidden' : ''">Collapse</span>
        </button>
        </div>
      </div>
    </aside>

    <!-- Page content -->
    <div class="flex-1 min-w-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdminNavItem } from "~/composables/useAdmin";

const props = defineProps<{ groups: { title: string; items: AdminNavItem[] }[]; active: string }>();
const emit = defineEmits<{ select: [id: string]; logout: [] }>();

const drawer = ref(false);
const collapsed = ref(false);
const openBtn = ref<HTMLButtonElement | null>(null);

const activeLabel = computed(() => props.groups.flatMap((g) => g.items).find((i) => i.id === props.active)?.label || "Admin");

const choose = (id: string) => {
  emit("select", id);
  drawer.value = false;
};

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
  try {
    localStorage.setItem("admin-sidebar-collapsed", collapsed.value ? "1" : "0");
  } catch {}
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape" && drawer.value) {
    drawer.value = false;
    openBtn.value?.focus();
  }
};

watch(drawer, (open) => {
  document.documentElement.style.overflow = open ? "hidden" : "";
});

onMounted(() => {
  try {
    collapsed.value = localStorage.getItem("admin-sidebar-collapsed") === "1";
  } catch {}
  document.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKey);
  document.documentElement.style.overflow = "";
});
</script>

<style scoped>
.nav-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.75rem;
  min-height: 2.75rem;
  padding: 0 0.75rem;
  border-radius: 0.875rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgb(255 255 255 / 0.78);
  transition: background-color 0.15s ease, color 0.15s ease;
}
.nav-item:hover {
  background: rgb(255 255 255 / 0.08);
  color: #fff;
}
.nav-item.is-active {
  background: var(--color-sun);
  color: var(--color-ink);
}
.nav-item:focus-visible {
  outline: 3px solid var(--color-sun);
  outline-offset: 1px;
}
</style>

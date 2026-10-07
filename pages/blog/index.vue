<template>
  <div>
    <PageHero :eyebrow="t.eyebrow" :title="t.title" :lead="t.lead" :image="img(photos.classroom, 1800)" :crumbs="[{ label: m.nav.news }]" />

    <section class="py-14 sm:py-20">
      <div class="shell">
        <div v-if="tags.length > 2" class="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto" role="tablist" :aria-label="t.filter">
          <button
            v-for="tag in tags"
            :key="tag"
            type="button"
            role="tab"
            :aria-selected="active === tag"
            class="shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
            :class="active === tag ? 'bg-maroon text-white' : 'bg-white border border-line text-ink hover:border-maroon'"
            @click="active = tag"
          >
            {{ tag === ALL ? t.all : tag }}
          </button>
        </div>

        <p v-if="!visible.length" class="mt-8 rounded-[26px] bg-white border border-line p-10 text-center text-ink-soft">{{ t.empty }}</p>
        <PostCard v-if="featured" :post="featured" featured class="mt-8 block" />
        <div v-if="rest.length" class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PostCard v-for="post in rest" :key="post.slug" :post="post" />
        </div>
      </div>
    </section>

    <PageCta :title="t.ctaTitle" :description="t.ctaText" :primary-text="t.ctaPrimary" primary-to="/contact" :secondary-text="t.ctaSecondary" secondary-to="/donate" />
  </div>
</template>

<script setup lang="ts">
import { img, photos } from "~/data/site";

const { m } = useLang();
const t = computed(() => m.value.blog);
usePageMeta(() => t.value.metaTitle, () => t.value.metaDescription);

const { data: posts } = await usePosts();
const ALL = "__all";
const tags = computed(() => [ALL, ...new Set(posts.value.map((p) => p.tag).filter((tag): tag is string => !!tag))]);
const active = ref(ALL);

const visible = computed(() => (active.value === ALL ? posts.value : posts.value.filter((p) => p.tag === active.value)));
const featured = computed(() => visible.value[0]);
const rest = computed(() => visible.value.slice(1));
</script>

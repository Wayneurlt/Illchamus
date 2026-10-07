<template>
  <div>
    <PageHero
      eyebrow="News & stories"
      title="Stories from our community"
      lead="Updates, milestones and voices from across our programs in Baringo County."
      :image="img(photos.classroom, 1800)"
      :crumbs="[{ label: 'News & Stories' }]"
    />

    <section class="py-14 sm:py-20">
      <div class="shell">
        <div class="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto" role="tablist" aria-label="Filter stories">
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
            {{ tag }}
          </button>
        </div>

        <PostCard v-if="featured" :post="featured" featured class="mt-8 block" />

        <div v-if="rest.length" class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PostCard v-for="post in rest" :key="post.slug" :post="post" />
        </div>
      </div>
    </section>

    <PageCta
      title="Have a story to tell?"
      description="If our programs have touched your life, we would love to hear from you."
      primary-text="Share your story"
      primary-to="/contact"
      secondary-text="Support our work"
      secondary-to="/donate"
    />
  </div>
</template>

<script setup lang="ts">
import { img, photos } from "~/data/site";

usePageMeta("News & Stories", "Stories and updates from the Illchamus Community CBO and our programs in Baringo County, Kenya.");

const { posts } = useBlogPosts();
const newestFirst = [...posts].reverse();
const tags = ["All", ...new Set(newestFirst.map((p) => p.tag).filter((t): t is string => !!t))];
const active = ref("All");

const visible = computed(() => (active.value === "All" ? newestFirst : newestFirst.filter((p) => p.tag === active.value)));
const featured = computed(() => visible.value[0]);
const rest = computed(() => visible.value.slice(1));
</script>

<template>
  <article class="group h-full">
    <NuxtLink
      :to="`/blog/${post.slug}`"
      class="flex h-full flex-col rounded-[26px] bg-white border border-line overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(46,20,20,0.55)]"
      :class="featured ? 'lg:flex-row' : ''"
    >
      <div class="relative overflow-hidden" :class="featured ? 'aspect-[16/10] lg:aspect-auto lg:w-[55%] lg:min-h-[380px]' : 'aspect-[16/10]'">
        <img
          :src="post.image"
          :alt="post.title"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span v-if="post.tag" class="absolute top-4 left-4 rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink">
          {{ post.tag }}
        </span>
      </div>
      <div class="flex flex-1 flex-col p-6" :class="featured ? 'lg:p-10 lg:justify-center' : ''">
        <p class="flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
          <Icon name="heroicons:calendar-days" class="h-4 w-4" />
          {{ post.date }}
        </p>
        <h3
          class="mt-3 font-bold tracking-tight text-ink group-hover:text-maroon transition-colors"
          :class="featured ? 'text-2xl lg:text-[2rem] leading-tight' : 'text-xl leading-snug'"
        >
          {{ post.title }}
        </h3>
        <p class="mt-3 text-[15px] leading-relaxed text-ink-soft line-clamp-3">{{ post.excerpt }}</p>
        <span class="link-arrow mt-auto pt-6 text-[15px]">
          Read story
          <Icon name="heroicons:arrow-right" class="h-4 w-4" />
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from "~/data/blog-posts";

defineProps<{ post: BlogPost; featured?: boolean }>();
</script>

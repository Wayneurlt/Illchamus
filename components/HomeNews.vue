<template>
  <section class="py-16 sm:py-20 lg:py-28">
    <div class="shell">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up">
        <div class="max-w-2xl">
          <p class="eyebrow">News &amp; stories</p>
          <h2 class="h2 mt-3">What's happening in our community</h2>
        </div>
        <NuxtLink to="/blog" class="btn btn-outline shrink-0 self-start sm:self-auto">See all news</NuxtLink>
      </div>
      <div class="mt-10 lg:mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PostCard
          v-for="(post, i) in latest"
          :key="post.slug"
          :post="post"
          :class="i === 2 ? 'md:hidden lg:block' : ''"
          data-aos="fade-up"
          :data-aos-delay="i * 80"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { posts } = useBlogPosts();
const latest = [...posts].reverse().slice(0, 3);
</script>

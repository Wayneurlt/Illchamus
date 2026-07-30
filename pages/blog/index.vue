<template>
  <div>
    <PageHero title="Blog & updates" lead="Stories and updates from our community work." />

    <section class="pb-24 lg:pb-32 bg-cbo-cream">
      <div class="container-cbo">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <article
            v-for="(post, i) in posts"
            :key="post.slug"
            class="group rounded-2xl border border-[var(--cbo-border)] overflow-hidden card-hover bg-white"
            :data-aos="'fade-up'"
            :data-aos-delay="i % 3 * 80"
          >
            <NuxtLink :to="`/blog/${post.slug}`" class="block">
              <div class="relative aspect-video overflow-hidden bg-[var(--cbo-accent-soft)]">
                <img :src="post.image" alt="Post cover" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div v-if="post.tag" class="absolute top-4 left-4">
                  <span class="px-3 py-1.5 rounded-full bg-[var(--cbo-accent)] text-white text-xs font-medium">{{ post.tag }}</span>
                </div>
              </div>
              <div class="p-5 lg:p-6">
                <p class="text-xs text-[var(--cbo-muted)] font-medium mb-2 flex items-center gap-1.5">
                  <Icon name="heroicons:calendar" class="h-3.5 w-3.5" />
                  {{ post.date }}
                </p>
                <h3 class="text-lg font-semibold text-[var(--cbo-ink)] mb-2 line-clamp-2 hover:text-[var(--cbo-accent)] transition-colors">{{ post.title }}</h3>
                <p class="text-sm text-[var(--cbo-muted)] leading-relaxed line-clamp-3 mb-4">{{ post.excerpt }}</p>
                <span class="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--cbo-accent)]">
                  Read more
                  <Icon name="heroicons:arrow-right" class="h-4 w-4" />
                </span>
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { posts } = useBlogPosts()
usePageMeta('Blog')
</script>

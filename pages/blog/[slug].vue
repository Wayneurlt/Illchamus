<template>
  <div v-if="post">
    <!-- Blog post header -->
    <section class="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-white">
      <div class="container-cbo max-w-4xl">
        <div class="mb-8" data-aos="fade-up">
          <NuxtLink to="/blog" class="inline-flex items-center text-sm font-medium text-[var(--cbo-muted)] hover:text-[var(--cbo-accent)] mb-6 transition-colors">
            <Icon name="heroicons:arrow-left" class="mr-2 h-4 w-4" />
            Back to Blog
          </NuxtLink>
          <p class="text-sm text-[var(--cbo-muted)] mb-4">{{ post.date }}</p>
          <h1 class="section-heading mb-6">{{ post.title }}</h1>
          <div class="flex items-center gap-4">
            <span v-if="post.tag" class="px-3 py-1 text-sm rounded-full bg-[var(--cbo-accent)] text-white font-medium">{{ post.tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured image -->
    <section class="pb-8 bg-white">
      <div class="container-cbo max-w-4xl">
        <div class="aspect-video bg-[var(--cbo-accent-soft)] rounded-2xl overflow-hidden border border-[var(--cbo-border)]" data-aos="fade-up">
          <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <!-- Blog content -->
    <section class="pb-16 bg-white">
      <div class="container-cbo max-w-4xl">
        <article class="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-[var(--cbo-muted)] prose-p:leading-relaxed">
          <div class="text-lg text-[var(--cbo-muted)] mb-8">{{ post.excerpt }}</div>
          <div v-html="post.content" class="text-[var(--cbo-muted)] leading-relaxed space-y-6"></div>
        </article>
        <div class="mt-12 pt-8 border-t border-[var(--cbo-border)] flex gap-4">
          <button class="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--cbo-border)] text-[var(--cbo-ink)] hover:border-[var(--cbo-accent)] transition-colors text-sm font-medium">
            <Icon name="heroicons:share" class="h-4 w-4" />
            Share
          </button>
          <button class="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--cbo-border)] text-[var(--cbo-ink)] hover:border-[var(--cbo-accent)] transition-colors text-sm font-medium">
            <Icon name="heroicons:bookmark" class="h-4 w-4" />
            Save
          </button>
        </div>
      </div>
    </section>

    <!-- Related posts -->
    <section class="py-24 lg:py-32 bg-cbo-warm">
      <div class="container-cbo">
        <h2 class="section-heading mb-8" data-aos="fade-up">Related posts</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <NuxtLink v-for="(relatedPost, i) in relatedPosts" :key="relatedPost.slug" :to="`/blog/${relatedPost.slug}`" class="group rounded-2xl border border-[var(--cbo-border)] bg-white overflow-hidden card-hover block" :data-aos="'fade-up'" :data-aos-delay="i * 80">
            <div class="aspect-video bg-[var(--cbo-accent-soft)] overflow-hidden">
              <img :src="relatedPost.image" alt="Post cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-5">
              <p class="text-xs text-[var(--cbo-muted)]">{{ relatedPost.date }}</p>
              <h3 class="mt-1 font-semibold text-[var(--cbo-ink)] group-hover:text-[var(--cbo-accent)] transition-colors">{{ relatedPost.title }}</h3>
              <p class="mt-2 text-sm text-[var(--cbo-muted)] line-clamp-2">{{ relatedPost.excerpt }}</p>
              <div class="mt-4 flex items-center justify-between">
                <span v-if="relatedPost.tag" class="px-2 py-1 text-xs rounded-full bg-[var(--cbo-accent)] text-white font-medium">{{ relatedPost.tag }}</span>
                <span class="inline-flex items-center text-sm font-medium text-[var(--cbo-accent)]">Read more <Icon name="heroicons:arrow-right" class="ml-1 h-4 w-4" /></span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
const route = useRoute()
const slug = String(route.params.slug)
const { getPostBySlug, getRelatedPosts } = useBlogPosts()

const post = getPostBySlug(slug)
const relatedPosts = getRelatedPosts(slug)

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

usePageMeta(post.title, post.excerpt)
</script>

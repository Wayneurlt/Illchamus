<template>
  <div v-if="post">
    <PageHero
      :eyebrow="post.tag"
      :title="post.title"
      :image="post.image"
      :crumbs="[{ label: 'News & Stories', to: '/blog' }, { label: post.tag || 'Story' }]"
    >
      <p class="flex items-center gap-2 text-sm font-semibold text-white/85">
        <Icon name="heroicons:calendar-days" class="h-4 w-4" />
        {{ post.date }}
      </p>
    </PageHero>

    <section class="py-14 sm:py-20">
      <div class="shell grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 items-start">
        <article class="min-w-0 max-w-3xl">
          <p class="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-ink">{{ post.excerpt }}</p>
          <div class="article mt-8" v-html="post.content" />

          <div class="mt-12 pt-8 border-t border-line flex flex-wrap items-center gap-3">
            <NuxtLink to="/blog" class="btn btn-outline btn-sm">
              <Icon name="heroicons:arrow-left" class="h-4 w-4" />
              All stories
            </NuxtLink>
            <button type="button" class="btn btn-sun btn-sm" @click="share">
              <Icon name="heroicons:share" class="h-4 w-4" />
              Share this story
            </button>
            <span v-if="shareFeedback" class="text-sm font-semibold text-leaf" role="status">{{ shareFeedback }}</span>
          </div>
        </article>

        <aside class="lg:sticky lg:top-24 space-y-5">
          <div class="relative overflow-hidden rounded-[26px] bg-maroon p-7 text-white">
            <div class="sun-ring w-40 h-40 border-[18px] -bottom-20 -right-16" aria-hidden="true" />
            <h2 class="relative text-xl font-bold tracking-tight">Help write the next chapter</h2>
            <p class="relative mt-2 text-[15px] text-white/75">Your gift keeps these programs running.</p>
            <NuxtLink to="/donate" class="btn btn-sun btn-sm relative mt-6">
              <Icon name="heroicons:heart-solid" class="h-4 w-4" />
              Donate
            </NuxtLink>
          </div>
          <div class="rounded-[26px] bg-sun-soft p-7">
            <h2 class="text-lg font-bold text-ink">Get involved</h2>
            <p class="mt-2 text-[15px] text-ink-soft">Volunteer, partner or simply say hello.</p>
            <NuxtLink to="/contact" class="link-arrow mt-4 text-[15px]">Contact us <Icon name="heroicons:arrow-right" class="h-4 w-4" /></NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="relatedPosts.length" class="pb-6">
      <div class="shell">
        <h2 class="h2">More stories</h2>
        <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PostCard
            v-for="(relatedPost, i) in relatedPosts"
            :key="relatedPost.slug"
            :post="relatedPost"
            :class="i === 2 ? 'md:hidden lg:block' : ''"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = String(route.params.slug);
const { getPostBySlug, getRelatedPosts } = useBlogPosts();

const post = getPostBySlug(slug);
const relatedPosts = getRelatedPosts(slug);

if (!post) {
  throw createError({ statusCode: 404, statusMessage: "Post not found", fatal: true });
}

usePageMeta(post.title, post.excerpt);

const shareFeedback = ref("");
const share = async () => {
  const data = { title: post.title, text: post.excerpt, url: window.location.href };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard?.writeText(data.url);
    shareFeedback.value = "Link copied!";
    setTimeout(() => (shareFeedback.value = ""), 3000);
  } catch {
    // Share cancelled or clipboard blocked.
  }
};
</script>

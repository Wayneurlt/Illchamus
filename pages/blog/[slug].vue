<template>
  <div v-if="post">
    <PageHero
      :eyebrow="post.tag"
      :title="title"
      :image="post.image || GATHERING"
      :crumbs="[{ label: m.nav.news, to: '/blog' }, { label: post.tag || t.story }]"
    >
      <p class="flex items-center gap-2 text-sm font-semibold text-white/85">
        <Icon name="heroicons:calendar-days" class="h-4 w-4" />
        <time :datetime="post.date">{{ fmtDate(post.date) }}</time>
      </p>
    </PageHero>

    <section class="py-14 sm:py-20">
      <div class="shell grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 items-start">
        <article class="min-w-0 max-w-3xl">
          <p class="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-ink">{{ tx(post.excerpt, post.excerptSw) }}</p>
          <!-- renderMarkdown escapes all HTML before formatting, so this is safe. -->
          <div class="article mt-8" v-html="bodyHtml" />

          <div class="mt-12 pt-8 border-t border-line flex flex-wrap items-center gap-3">
            <NuxtLink to="/blog" class="btn btn-outline btn-sm">
              <Icon name="heroicons:arrow-left" class="h-4 w-4" />
              {{ m.common.allStories }}
            </NuxtLink>
            <button type="button" class="btn btn-sun btn-sm" @click="share">
              <Icon name="heroicons:share" class="h-4 w-4" />
              {{ m.common.shareStory }}
            </button>
            <span v-if="shareFeedback" class="text-sm font-semibold text-leaf" role="status">{{ shareFeedback }}</span>
          </div>
        </article>

        <aside class="lg:sticky lg:top-24 space-y-5">
          <div class="relative overflow-hidden rounded-[26px] bg-maroon p-7 text-white">
            <div class="sun-ring w-40 h-40 border-[18px] -bottom-20 -right-16" aria-hidden="true" />
            <h2 class="relative text-xl font-bold tracking-tight">{{ t.asideTitle }}</h2>
            <p class="relative mt-2 text-[15px] text-white/75">{{ t.asideText }}</p>
            <NuxtLink to="/donate" class="btn btn-sun btn-sm relative mt-6">
              <Icon name="heroicons:heart-solid" class="h-4 w-4" />
              {{ m.nav.donate }}
            </NuxtLink>
          </div>
          <div class="rounded-[26px] bg-sun-soft p-7">
            <h2 class="text-lg font-bold text-ink">{{ t.involvedTitle }}</h2>
            <p class="mt-2 text-[15px] text-ink-soft">{{ t.involvedText }}</p>
            <NuxtLink to="/contact" class="link-arrow mt-4 text-[15px]">{{ t.contactUs }} <Icon name="heroicons:arrow-right" class="h-4 w-4" /></NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="related.length" class="pb-6">
      <div class="shell">
        <h2 class="h2">{{ t.more }}</h2>
        <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PostCard v-for="(relatedPost, i) in related" :key="relatedPost.slug" :post="relatedPost" :class="i === 2 ? 'md:hidden lg:block' : ''" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { GATHERING } from "~/data/site";

const route = useRoute();
const slug = String(route.params.slug);
const { m, tx, fmtDate } = useLang();
const t = computed(() => m.value.blog);

const { data: post, error } = await usePost(slug);
if (error.value || !post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found", fatal: true });
}
const { data: allPosts } = await usePosts(4);
const related = computed(() => allPosts.value.filter((p) => p.slug !== slug).slice(0, 3));

const title = computed(() => tx(post.value!.title, post.value!.titleSw));
const bodyHtml = computed(() => renderMarkdown(tx(post.value!.body, post.value!.bodySw)));

const origin = useSiteOrigin();
const image = computed(() => post.value!.image || GATHERING);
usePageMeta(title, () => tx(post.value!.excerpt, post.value!.excerptSw), { image, type: "article" });
useJsonLd(() => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title.value,
  description: tx(post.value!.excerpt, post.value!.excerptSw),
  image: [/^https?:/.test(image.value) ? image.value : `${origin}${image.value}`],
  datePublished: post.value!.date,
  dateModified: post.value!.updatedAt,
  author: { "@type": "Organization", name: "Illchamus Community CBO", url: origin },
  publisher: { "@id": `${origin}/#organization` },
  mainEntityOfPage: `${origin}/blog/${slug}`,
}));

const shareFeedback = ref("");
const share = async () => {
  const data = { title: title.value, text: tx(post.value!.excerpt, post.value!.excerptSw), url: window.location.href };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard?.writeText(data.url);
    shareFeedback.value = m.value.common.linkCopied;
    setTimeout(() => (shareFeedback.value = ""), 3000);
  } catch {
    // Share cancelled or clipboard blocked.
  }
};
</script>

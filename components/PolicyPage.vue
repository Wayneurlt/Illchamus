<template>
  <div>
    <PageHero :title="copy.title" :lead="copy.lead" :image="baringo.deadTree" :crumbs="[{ label: copy.crumb }]" />

    <section class="py-14 sm:py-20">
      <div class="shell">
        <div class="mx-auto max-w-3xl rounded-[28px] bg-white border border-line p-6 sm:p-12">
          <article class="article">
            <p class="text-sm font-semibold text-ink-soft">
              <time :datetime="POLICIES_UPDATED">{{ fill(copy.updated, { date: fmtDate(POLICIES_UPDATED) }) }}</time>
            </p>
            <template v-for="section in copy.sections" :key="section.heading">
              <h2>{{ section.heading }}</h2>
              <p v-for="(paragraph, i) in section.body" :key="i">
                <template v-for="(part, j) in withEmail(paragraph)" :key="j">
                  <a v-if="part.email" :href="`mailto:${site.email}`">{{ site.email }}</a>
                  <template v-else>{{ part.text }}</template>
                </template>
              </p>
            </template>
            <p>
              {{ copy.contactBefore }} <NuxtLink to="/contact">{{ copy.contactLink }}</NuxtLink>.
            </p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { baringo, POLICIES_UPDATED, site } from "~/data/site";

const props = defineProps<{ kind: "privacy" | "terms" }>();
const { m, fmtDate } = useLang();
const copy = computed(() => m.value[props.kind]);
usePageMeta(() => copy.value.metaTitle, () => copy.value.metaDescription);

/** Split a paragraph around the {email} placeholder so it can become a link. */
const withEmail = (text: string) =>
  text.split(/(\{email\})/).map((piece) => (piece === "{email}" ? { email: true, text: "" } : { email: false, text: piece }));
</script>

<template>
  <UApp>
    <NuxtLayout>
      <PageHero
        :eyebrow="is404 ? t.notFoundEyebrow : t.errorEyebrow"
        :title="is404 ? t.notFoundTitle : t.errorTitle"
        :lead="is404 ? t.notFoundLead : t.errorLead"
        :image="img(photos.acaciaDusk, 1800)"
        :crumbs="[{ label: is404 ? t.notFoundCrumb : t.errorCrumb }]"
      >
        <div class="flex flex-wrap gap-3">
          <button type="button" class="btn btn-sun" @click="clearError({ redirect: '/' })">{{ t.home }}</button>
          <button type="button" class="btn btn-ghost" @click="clearError({ redirect: '/contact' })">{{ t.contact }}</button>
        </div>
      </PageHero>
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import { img, photos } from "~/data/site";

const props = defineProps<{ error: NuxtError }>();
const is404 = computed(() => props.error?.statusCode === 404);
const { m, lang } = useLang();
const t = computed(() => m.value.error);

useHead({
  title: () => `${is404.value ? t.value.notFoundCrumb : t.value.errorCrumb} • Illchamus Community CBO`,
  htmlAttrs: { lang },
  meta: [{ name: "robots", content: "noindex" }],
});
</script>

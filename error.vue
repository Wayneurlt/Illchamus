<template>
  <UApp>
    <NuxtLayout>
      <PageHero
        :eyebrow="is404 ? 'Error 404' : 'Something went wrong'"
        :title="is404 ? 'We couldn\'t find that page' : 'Sorry, something went wrong'"
        :lead="is404 ? 'The page may have moved, or the link might be broken. Let\'s get you back on track.' : 'Please try again in a moment.'"
        :image="img(photos.acaciaDusk, 1800)"
        :crumbs="[{ label: is404 ? 'Page not found' : 'Error' }]"
      >
        <div class="flex flex-wrap gap-3">
          <button type="button" class="btn btn-sun" @click="clearError({ redirect: '/' })">Back to home</button>
          <NuxtLink to="/contact" class="btn btn-ghost" @click="clearError()">Contact us</NuxtLink>
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

useHead({ title: is404.value ? "Page not found • Illchamus Community CBO" : "Error • Illchamus Community CBO" });
</script>

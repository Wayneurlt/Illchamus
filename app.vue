<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const { lang } = useLang();
useHead({ htmlAttrs: { lang } });
useSiteSchema();
</script>

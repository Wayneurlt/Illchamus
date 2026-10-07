<template>
  <div>
    <PageHero
      title="Privacy policy"
      lead="How Illchamus Community CBO collects, uses, and protects your information."
      :image="img(photos.savanna, 1800)"
      :crumbs="[{ label: 'Privacy' }]"
    />

    <section class="py-14 sm:py-20">
      <div class="shell">
        <div class="mx-auto max-w-3xl rounded-[28px] bg-white border border-line p-6 sm:p-12">
        <article class="article" data-aos="fade-up">
          <p class="text-sm font-semibold text-ink-soft">Last updated: {{ lastUpdated }}</p>

          <h2>Information we collect</h2>
          <p>
            When you contact us, subscribe to our newsletter, or make a donation, we collect the information you provide directly—such as your name, email address, phone number, and message content. We do not knowingly collect information beyond what is needed to respond to your inquiry or process your support.
          </p>

          <h2>How we use your information</h2>
          <p>
            We use the information you share to respond to enquiries, process donations, send updates about our programs (only if you opt in), and improve our community services. We do not sell or rent your personal information to third parties.
          </p>

          <h2>Data storage and security</h2>
          <p>
            We take reasonable technical and organisational measures to protect the information you share with us. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2>Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information at any time by contacting us at
            <a :href="`mailto:${site.email}`">{{ site.email }}</a>.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have questions about this privacy policy, please reach out via our
            <NuxtLink to="/contact">contact page</NuxtLink>.
          </p>
        </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { img, photos, site } from "~/data/site";

usePageMeta('Privacy Policy', "Learn how Illchamus Community CBO collects, uses, and protects your personal information.");

const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
</script>

<template>
  <div>
    <PageHero title-before="Terms of " gradient-word="service" title-after="" lead="The terms that govern your use of the Illchamus Community CBO website and services." />

    <section class="py-16 lg:py-24 bg-white">
      <div class="container-cbo max-w-3xl">
        <article class="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-[var(--cbo-muted)] prose-p:leading-relaxed" data-aos="fade-up">
          <p class="text-sm text-[var(--cbo-muted)]">Last updated: {{ lastUpdated }}</p>

          <h2>Acceptance of terms</h2>
          <p>
            By using this website, you agree to these terms of service. If you do not agree, please discontinue use of the site.
          </p>

          <h2>Use of content</h2>
          <p>
            All text, images, and materials on this site belong to Illchamus Community CBO or are used with permission, unless otherwise noted. You may share our content for non-commercial, community-supporting purposes with attribution.
          </p>

          <h2>Donations</h2>
          <p>
            Donations made through this site support our education, healthcare, and cultural preservation programs in Baringo County. Donations are voluntary and, except where required by law, are non-refundable once processed.
          </p>

          <h2>No warranty</h2>
          <p>
            This website and its content are provided "as is" without warranties of any kind. We do our best to keep information accurate and up to date, but we cannot guarantee completeness or accuracy at all times.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about these terms can be sent to us via our
            <NuxtLink to="/contact" class="text-[var(--cbo-accent)] hover:underline">contact page</NuxtLink>.
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
usePageMeta('Terms of Service', "The terms that govern your use of the Illchamus Community CBO website and services.");

const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
</script>

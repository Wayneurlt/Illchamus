<template>
  <div>
    <PageHero title-before="Privacy " gradient-word="policy" title-after="" lead="How Illchamus Community CBO collects, uses, and protects your information." />

    <section class="py-16 lg:py-24 bg-white">
      <div class="container-cbo max-w-3xl">
        <article class="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-[var(--cbo-muted)] prose-p:leading-relaxed" data-aos="fade-up">
          <p class="text-sm text-[var(--cbo-muted)]">Last updated: {{ lastUpdated }}</p>

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
            <a href="mailto:smile4smileinnitiative@gmail.com" class="text-[var(--cbo-accent)] hover:underline">smile4smileinnitiative@gmail.com</a>.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have questions about this privacy policy, please reach out via our
            <NuxtLink to="/contact" class="text-[var(--cbo-accent)] hover:underline">contact page</NuxtLink>.
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
usePageMeta('Privacy Policy', "Learn how Illchamus Community CBO collects, uses, and protects your personal information.");

const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
</script>

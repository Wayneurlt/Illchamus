<template>
  <div>
    <PageHero
      eyebrow="We'd love to hear from you"
      title="Get in touch"
      lead="Whether you want to volunteer, partner with us or support our community work, we're here to help."
      :image="img(photos.hands, 1800)"
      :crumbs="[{ label: 'Contact' }]"
    >
      <div class="flex flex-wrap gap-3">
        <a :href="site.phoneHref" class="btn btn-sun">
          <Icon name="heroicons:phone" class="h-4 w-4" />
          Call us
        </a>
        <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
          <Icon name="mdi:whatsapp" class="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </PageHero>

    <section class="py-16 sm:py-20 lg:py-24">
      <div class="shell grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10 items-start">
        <!-- Form -->
        <div class="rounded-[28px] bg-white border border-line p-6 sm:p-10" data-aos="fade-up">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-ink">Send us a message</h2>
          <p class="mt-2 text-ink-soft">We usually reply within one to two business days.</p>

          <div
            v-if="feedback"
            class="mt-6 flex items-start gap-3 rounded-2xl p-4 text-sm font-medium"
            :class="feedbackType === 'success' ? 'bg-leaf-soft text-leaf' : 'bg-red-50 text-red-800'"
            role="status"
          >
            <Icon :name="feedbackType === 'success' ? 'heroicons:check-circle' : 'heroicons:exclamation-circle'" class="h-5 w-5 shrink-0" />
            {{ feedback }}
          </div>

          <form class="mt-8 space-y-5" novalidate @submit.prevent="submit">
            <fieldset>
              <legend class="field-label">I'm getting in touch about</legend>
              <div class="mt-1 flex flex-wrap gap-2">
                <label
                  v-for="topic in topics"
                  :key="topic.value"
                  class="cursor-pointer rounded-full border-[1.5px] px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-lake"
                  :class="form.subject === topic.value ? 'border-maroon bg-maroon text-white' : 'border-line bg-white text-ink hover:border-maroon'"
                >
                  <input v-model="form.subject" type="radio" name="subject" :value="topic.value" class="sr-only" />
                  {{ topic.label }}
                </label>
              </div>
            </fieldset>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label for="firstName" class="field-label">First name *</label>
                <input id="firstName" v-model="form.firstName" type="text" autocomplete="given-name" required class="field" />
              </div>
              <div>
                <label for="lastName" class="field-label">Last name *</label>
                <input id="lastName" v-model="form.lastName" type="text" autocomplete="family-name" required class="field" />
              </div>
            </div>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label for="email" class="field-label">Email *</label>
                <input id="email" v-model="form.email" type="email" autocomplete="email" required placeholder="you@example.com" class="field" />
              </div>
              <div>
                <label for="phone" class="field-label">Phone</label>
                <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="+254 700 000 000" class="field" />
              </div>
            </div>
            <div>
              <label for="msg" class="field-label">Message *</label>
              <textarea id="msg" v-model="form.message" rows="5" maxlength="1000" required placeholder="Tell us how we can help…" class="field" />
              <p class="mt-1 text-right text-xs text-ink-soft">{{ form.message.length }}/1000</p>
            </div>
            <label class="flex items-start gap-3 text-sm text-ink-soft">
              <input v-model="form.consent" type="checkbox" required class="mt-0.5 h-5 w-5 shrink-0 rounded accent-maroon" />
              <span>
                I agree to the <NuxtLink to="/terms" class="font-semibold text-maroon underline underline-offset-2">terms</NuxtLink>
                and <NuxtLink to="/privacy" class="font-semibold text-maroon underline underline-offset-2">privacy policy</NuxtLink>.
              </span>
            </label>
            <button type="submit" :disabled="isSubmitting" class="btn btn-ink w-full sm:w-auto sm:px-10">
              <Icon v-if="isSubmitting" name="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
              {{ isSubmitting ? "Sending…" : "Send message" }}
            </button>
          </form>
        </div>

        <!-- Details -->
        <div class="space-y-5" data-aos="fade-up" data-aos-delay="100">
          <ul class="rounded-[28px] bg-sun-soft p-6 sm:p-8 space-y-6">
            <li v-for="item in details" :key="item.label" class="flex gap-4">
              <span class="w-11 h-11 shrink-0 rounded-2xl bg-white text-maroon flex items-center justify-center">
                <Icon :name="item.icon" class="h-5 w-5" />
              </span>
              <div class="min-w-0">
                <p class="text-sm font-semibold text-ink-soft">{{ item.label }}</p>
                <a v-if="item.href" :href="item.href" class="font-bold text-ink hover:text-maroon break-all">{{ item.value }}</a>
                <p v-else class="font-bold text-ink">{{ item.value }}</p>
              </div>
            </li>
          </ul>

          <div class="rounded-[28px] bg-white border border-line p-6 sm:p-8">
            <h3 class="h3">Follow our journey</h3>
            <div class="mt-5 grid grid-cols-2 gap-3">
              <a
                v-for="s in site.socials"
                :key="s.label"
                :href="s.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 rounded-2xl border border-line px-4 py-3 text-sm font-semibold text-ink hover:border-maroon transition-colors"
              >
                <Icon :name="s.icon" class="h-5 w-5 text-maroon" />
                {{ s.label }}
              </a>
            </div>
          </div>

          <div class="overflow-hidden rounded-[28px] border border-line bg-white h-64">
            <iframe
              title="Map of Lake Baringo, Kenya"
              src="https://www.google.com/maps?q=Lake%20Baringo%2C%20Kenya&z=10&output=embed"
              class="w-full h-full border-0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { img, photos, site } from "~/data/site";

usePageMeta("Contact", "Get in touch with Illchamus Community CBO. Partnerships, volunteering, donations, or general inquiries.");

const { form, isSubmitting, feedback, feedbackType, submit } = useContactForm();

const topics = [
  { value: "volunteer", label: "Volunteering" },
  { value: "partnership", label: "Partnership" },
  { value: "donation", label: "Donation" },
  { value: "program", label: "Program info" },
  { value: "general", label: "Something else" },
];

const details = [
  { label: "Call us", value: site.phone, href: site.phoneHref, icon: "heroicons:phone" },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: "heroicons:envelope" },
  { label: "Visit", value: site.location, icon: "heroicons:map-pin" },
  { label: "Office hours", value: site.hours, icon: "heroicons:clock" },
];
</script>

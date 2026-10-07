<template>
  <div>
    <PageHero :eyebrow="t.eyebrow" :title="t.title" :lead="t.lead" :image="img(photos.hands, 1800)" :crumbs="[{ label: m.nav.contact }]">
      <div class="flex flex-wrap gap-3">
        <a :href="site.phoneHref" class="btn btn-sun">
          <Icon name="heroicons:phone" class="h-4 w-4" />
          {{ m.nav.callUs }}
        </a>
        <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
          <Icon name="mdi:whatsapp" class="h-5 w-5" />
          {{ t.whatsapp }}
        </a>
      </div>
    </PageHero>

    <section class="py-16 sm:py-20 lg:py-24">
      <div class="shell grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10 items-start">
        <!-- Form -->
        <div class="rounded-[28px] bg-white border border-line p-6 sm:p-10" data-aos="fade-up">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-ink">{{ t.formTitle }}</h2>
          <p class="mt-2 text-ink-soft">{{ t.formText }}</p>

          <div
            v-if="feedback"
            class="mt-6 flex items-start gap-3 rounded-2xl p-4 text-sm font-medium"
            :class="feedbackType === 'success' ? 'bg-leaf-soft text-leaf' : 'bg-red-50 text-red-800'"
            role="status"
            aria-live="polite"
          >
            <Icon :name="feedbackType === 'success' ? 'heroicons:check-circle' : 'heroicons:exclamation-circle'" class="h-5 w-5 shrink-0" />
            {{ feedback }}
          </div>

          <form class="mt-8 space-y-5" novalidate @submit.prevent="submit">
            <!-- Honeypot field for spam bots; hidden from people and screen readers. -->
            <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
            <fieldset>
              <legend class="field-label">{{ t.topicLegend }}</legend>
              <div class="mt-1 flex flex-wrap gap-2">
                <label
                  v-for="(label, value) in t.topics"
                  :key="value"
                  class="cursor-pointer rounded-full border-[1.5px] px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-lake"
                  :class="form.subject === value ? 'border-maroon bg-maroon text-white' : 'border-line bg-white text-ink hover:border-maroon'"
                >
                  <input v-model="form.subject" type="radio" name="subject" :value="value" class="sr-only" />
                  {{ label }}
                </label>
              </div>
            </fieldset>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label for="firstName" class="field-label">{{ m.forms.firstName }} *</label>
                <input id="firstName" v-model="form.firstName" type="text" autocomplete="given-name" required maxlength="80" class="field" />
              </div>
              <div>
                <label for="lastName" class="field-label">{{ m.forms.lastName }} *</label>
                <input id="lastName" v-model="form.lastName" type="text" autocomplete="family-name" required maxlength="80" class="field" />
              </div>
            </div>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label for="email" class="field-label">{{ m.forms.email }} *</label>
                <input id="email" v-model="form.email" type="email" autocomplete="email" required :placeholder="m.forms.emailPlaceholder" class="field" />
              </div>
              <div>
                <label for="phone" class="field-label">{{ m.forms.phone }}</label>
                <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="+254 7XX XXX XXX" maxlength="40" class="field" />
              </div>
            </div>
            <div>
              <label for="msg" class="field-label">{{ m.forms.message }} *</label>
              <textarea id="msg" v-model="form.message" rows="5" maxlength="2000" required :placeholder="t.messagePlaceholder" class="field" />
              <p class="mt-1 text-right text-xs text-ink-soft">{{ form.message.length }}/2000</p>
            </div>
            <label class="flex items-start gap-3 text-sm text-ink-soft">
              <input v-model="form.consent" type="checkbox" required class="mt-0.5 h-5 w-5 shrink-0 rounded accent-maroon" />
              <span>
                {{ m.forms.consentBefore }} <NuxtLink to="/terms" class="font-semibold text-maroon underline underline-offset-2">{{ m.forms.terms }}</NuxtLink>
                {{ m.forms.and }} <NuxtLink to="/privacy" class="font-semibold text-maroon underline underline-offset-2">{{ m.forms.privacy }}</NuxtLink>.
              </span>
            </label>
            <button type="submit" :disabled="isSubmitting" class="btn btn-ink w-full sm:w-auto sm:px-10">
              <Icon v-if="isSubmitting" name="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
              {{ isSubmitting ? m.common.sending : t.send }}
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
            <h3 class="h3">{{ t.follow }}</h3>
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
              :title="t.mapTitle"
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

const { m } = useLang();
const t = computed(() => m.value.contact);
usePageMeta(() => t.value.metaTitle, () => t.value.metaDescription);

const { form, isSubmitting, feedback, feedbackType, submit } = useContactForm();

const details = computed(() => [
  { label: t.value.details.call, value: site.phone, href: site.phoneHref, icon: "heroicons:phone" },
  { label: t.value.details.email, value: site.email, href: `mailto:${site.email}`, icon: "heroicons:envelope" },
  { label: t.value.details.visit, value: m.value.site.location, icon: "heroicons:map-pin" },
  { label: t.value.details.hours, value: m.value.site.hours, icon: "heroicons:clock" },
]);
</script>

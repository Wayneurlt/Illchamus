<template>
  <div>
    <PageHero title-before="Get in " gradient-word="touch" title-after="" lead="Whether you want to volunteer, partner with us, or support our community work, we're here to help.">
      <div class="flex flex-wrap justify-center gap-4 mt-6">
          <a href="tel:+254732847605" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--cbo-border)] text-[var(--cbo-ink)] hover:border-[var(--cbo-accent)] transition-colors text-sm font-medium">
            <Icon name="heroicons:phone" class="h-4 w-4 text-[var(--cbo-accent)]" />
            +254 732 847 605
          </a>
          <a href="mailto:smile4smileinnitiative@gmail.com" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--cbo-border)] text-[var(--cbo-ink)] hover:border-[var(--cbo-accent)] transition-colors text-sm font-medium">
            <Icon name="heroicons:envelope" class="h-4 w-4 text-[var(--cbo-accent)]" />
            Email us
          </a>
          <span class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--cbo-border)] text-[var(--cbo-muted)] text-sm">
            <Icon name="heroicons:map-pin" class="h-4 w-4 text-[var(--cbo-accent)]" />
            Baringo County, Kenya
          </span>
        </div>
        <div class="flex flex-wrap justify-center gap-2 mt-6">
          <span class="px-3 py-1.5 rounded-full bg-[var(--cbo-accent-soft)] text-[var(--cbo-muted)] text-xs font-medium">Partnerships</span>
          <span class="px-3 py-1.5 rounded-full bg-[var(--cbo-accent-soft)] text-[var(--cbo-muted)] text-xs font-medium">Volunteering</span>
          <span class="px-3 py-1.5 rounded-full bg-[var(--cbo-accent-soft)] text-[var(--cbo-muted)] text-xs font-medium">Donations</span>
          <span class="px-3 py-1.5 rounded-full bg-[var(--cbo-accent-soft)] text-[var(--cbo-muted)] text-xs font-medium">Programs</span>
        </div>
    </PageHero>

    <section class="py-16 lg:py-24 bg-cbo-warm">
      <div class="container-cbo">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-6 lg:p-8" data-aos="fade-up">
            <h2 class="text-xl font-semibold text-[var(--cbo-ink)] mb-6">Send a message</h2>
            <div v-if="feedback" class="mb-6 p-4 rounded-xl text-sm" :class="feedbackType === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'">
              {{ feedback }}
            </div>
            <form @submit.prevent="submit" class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-[var(--cbo-ink)] mb-1.5">First name *</label>
                  <input id="firstName" v-model="form.firstName" type="text" required placeholder="First name" class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)]" />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-[var(--cbo-ink)] mb-1.5">Last name *</label>
                  <input id="lastName" v-model="form.lastName" type="text" required placeholder="Last name" class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)]" />
                </div>
              </div>
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label for="email" class="block text-sm font-medium text-[var(--cbo-ink)] mb-1.5">Email *</label>
                  <input id="email" v-model="form.email" type="email" required placeholder="your@email.com" class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)]" />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-[var(--cbo-ink)] mb-1.5">Phone</label>
                  <input id="phone" v-model="form.phone" type="tel" placeholder="+254 700 000 000" class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)]" />
                </div>
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-[var(--cbo-ink)] mb-1.5">Subject *</label>
                <select id="subject" v-model="form.subject" required class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)]">
                  <option value="">Select</option>
                  <option value="partnership">Partnership</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donation">Donation</option>
                  <option value="program">Program info</option>
                  <option value="general">General inquiry</option>
                </select>
              </div>
              <div>
                <label for="msg" class="block text-sm font-medium text-[var(--cbo-ink)] mb-1.5">Message *</label>
                <textarea id="msg" v-model="form.message" rows="5" maxlength="1000" required placeholder="Tell us how we can help…" class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)] resize-none" />
                <p class="mt-1 text-xs text-[var(--cbo-muted)]">{{ form.message.length }}/1000</p>
              </div>
              <div class="flex items-start gap-3">
                <input id="consent" v-model="form.consent" type="checkbox" required class="mt-1 h-4 w-4 rounded border-[var(--cbo-border)] text-[var(--cbo-accent)] focus:ring-[var(--cbo-accent)]" />
                <label for="consent" class="text-sm text-[var(--cbo-muted)]">
                  I agree to the <NuxtLink to="/terms" class="text-[var(--cbo-accent)] hover:underline">terms</NuxtLink> and <NuxtLink to="/privacy" class="text-[var(--cbo-accent)] hover:underline">privacy policy</NuxtLink>.
                </label>
              </div>
              <button type="submit" :disabled="submitting" class="w-full btn-cbo py-3 rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2">
                <Icon v-if="submitting" name="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
                {{ submitting ? "Sending…" : "Send message" }}
              </button>
            </form>
          </div>

          <div class="space-y-8" data-aos="fade-up" data-aos-delay="100">
            <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-6 lg:p-8">
              <h3 class="text-lg font-semibold text-[var(--cbo-ink)] mb-6">Contact info</h3>
              <div class="space-y-5 text-[15px]">
                <div class="flex gap-4">
                  <span class="text-[var(--cbo-accent)] shrink-0"><Icon name="heroicons:map-pin" class="h-5 w-5" /></span>
                  <div>
                    <p class="font-medium text-[var(--cbo-ink)]">Location</p>
                    <p class="text-[var(--cbo-muted)]">Baringo County, Kenya · East Africa</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <span class="text-[var(--cbo-accent)] shrink-0"><Icon name="heroicons:phone" class="h-5 w-5" /></span>
                  <div>
                    <p class="font-medium text-[var(--cbo-ink)]">Phone</p>
                    <a href="tel:+254732847605" class="text-[var(--cbo-muted)] hover:text-[var(--cbo-accent)]">+254 732 847 605</a>
                    <p class="text-[var(--cbo-muted)] text-sm mt-0.5">Mon–Fri, 8AM–5PM EAT</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <span class="text-[var(--cbo-accent)] shrink-0"><Icon name="heroicons:envelope" class="h-5 w-5" /></span>
                  <div>
                    <p class="font-medium text-[var(--cbo-ink)]">Email</p>
                    <a href="mailto:smile4smileinnitiative@gmail.com" class="text-[var(--cbo-muted)] hover:text-[var(--cbo-accent)] break-all">smile4smileinnitiative@gmail.com</a>
                    <p class="text-[var(--cbo-muted)] text-sm mt-0.5">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="rounded-2xl border border-[var(--cbo-border)] bg-[var(--cbo-earth-dark)] text-white p-6 lg:p-8">
              <h3 class="text-lg font-semibold mb-4">Quick response</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="rounded-xl bg-white/5 p-4">
                  <p class="text-sm text-neutral-400">Response time</p>
                  <p class="font-semibold mt-1">1–2 business days</p>
                </div>
                <div class="rounded-xl bg-white/5 p-4">
                  <p class="text-sm text-neutral-400">Office hours</p>
                  <p class="font-semibold mt-1">Mon–Fri, 8AM–5PM</p>
                </div>
              </div>
            </div>
            <div class="rounded-2xl overflow-hidden border border-[var(--cbo-border)] h-64">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" alt="Baringo County" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
usePageMeta('Contact', "Get in touch with Illchamus Community CBO. Partnerships, volunteering, donations, or general inquiries.");

const { form, isSubmitting: submitting, feedback, feedbackType, submit } = useContactForm();
</script>

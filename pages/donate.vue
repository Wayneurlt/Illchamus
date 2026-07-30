<template>
  <div>
    <PageHero title-before="Support our " gradient-word="mission" title-after="" lead="Your generous donation helps us preserve Illchamus culture, support families, and build a brighter future in Baringo County, Kenya." />

    <section class="py-8 bg-cbo-warm">
      <div class="container-cbo">
        <div class="relative rounded-2xl overflow-hidden border border-[var(--cbo-border)] h-56 md:h-80" data-aos="fade-up">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80"
            alt="Community impact"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <div class="absolute bottom-6 left-6 right-6 text-white">
            <h2 class="text-2xl lg:text-3xl font-semibold mb-2">Every donation creates lasting change</h2>
            <p class="text-white/90 text-[15px]">Join us in transforming lives across the Illchamus community</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-32 bg-cbo-cream">
      <div class="container-cbo">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div data-aos="fade-right">
            <h2 class="section-heading mb-6">
              Your impact makes a <span class="gradient-text">difference</span>
            </h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center shrink-0">
                  <Icon name="heroicons:academic-cap" class="h-6 w-6 text-[var(--cbo-accent)]" />
                </div>
                <div>
                  <h3 class="font-semibold text-[var(--cbo-ink)] mb-1">Education support</h3>
                  <p class="text-[var(--cbo-muted)] text-[15px]">School supplies, uniforms, and educational resources for children.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center shrink-0">
                  <Icon name="heroicons:heart" class="h-6 w-6 text-[var(--cbo-accent)]" />
                </div>
                <div>
                  <h3 class="font-semibold text-[var(--cbo-ink)] mb-1">Healthcare access</h3>
                  <p class="text-[var(--cbo-muted)] text-[15px]">Mobile clinics and health education for families in remote areas.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center shrink-0">
                  <Icon name="heroicons:building-office" class="h-6 w-6 text-[var(--cbo-accent)]" />
                </div>
                <div>
                  <h3 class="font-semibold text-[var(--cbo-ink)] mb-1">Economic development</h3>
                  <p class="text-[var(--cbo-muted)] text-[15px]">Micro-loans and training to help families build sustainable livelihoods.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-[var(--cbo-border)] p-6 lg:p-8 bg-white" data-aos="fade-left">
            <h3 class="text-xl font-semibold text-[var(--cbo-ink)] mb-6">Make a donation</h3>
            <div class="mb-6">
              <label class="block text-sm font-medium text-[var(--cbo-ink)] mb-3">Select amount (KES)</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="amount in quickAmounts"
                  :key="amount"
                  @click="selectedAmount = amount"
                  class="py-3 px-4 rounded-xl border-2 font-medium text-sm transition-colors"
                  :class="selectedAmount === amount
                    ? 'border-[var(--cbo-accent)] bg-orange-50 text-[var(--cbo-accent)]'
                    : 'border-[var(--cbo-border)] text-[var(--cbo-ink)] hover:border-neutral-300'"
                >
                  {{ formatAmount(amount) }}
                </button>
              </div>
            </div>
            <div class="mb-6">
              <label for="customAmount" class="block text-sm font-medium text-[var(--cbo-ink)] mb-2">Custom amount (KES)</label>
              <input
                id="customAmount"
                v-model="customAmount"
                type="number"
                placeholder="Enter amount"
                class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)] focus:border-transparent"
                @input="selectedAmount = null"
              />
            </div>
            <div class="space-y-4 mb-6">
              <div>
                <label for="donorName" class="block text-sm font-medium text-[var(--cbo-ink)] mb-1.5">Full name</label>
                <input id="donorName" v-model="donorName" type="text" placeholder="Your name" class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)]" />
              </div>
              <div>
                <label for="donorEmail" class="block text-sm font-medium text-[var(--cbo-ink)] mb-1.5">Email</label>
                <input id="donorEmail" v-model="donorEmail" type="email" placeholder="your@email.com" class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)]" />
              </div>
              <div>
                <label for="donorPhone" class="block text-sm font-medium text-[var(--cbo-ink)] mb-1.5">Phone</label>
                <input id="donorPhone" v-model="donorPhone" type="tel" placeholder="+254 XXX XXX XXX" class="w-full px-4 py-2.5 border border-[var(--cbo-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--cbo-accent)]" />
              </div>
            </div>
            <button
              :disabled="!canDonate"
              :class="['w-full py-3 rounded-xl font-medium text-base transition-colors', canDonate ? 'btn-cbo' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed']"
              @click="processDonation"
            >
              {{ donationAmount > 0 ? `Donate ${formatAmount(donationAmount)}` : "Select amount to donate" }}
            </button>
            <p v-if="donationFeedback" class="mt-4 p-3 rounded-xl text-sm bg-emerald-50 text-emerald-800 border border-emerald-200">{{ donationFeedback }}</p>
            <p class="mt-4 text-xs text-[var(--cbo-muted)]">We accept M-Pesa, bank transfer, and PayPal.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-32 bg-cbo-warm">
      <div class="container-cbo">
        <div class="text-center mb-12" data-aos="fade-up">
          <h2 class="section-heading mb-4">Other ways to <span class="gradient-text">support</span></h2>
          <p class="section-lead mx-auto">There are many ways you can help our community beyond monetary donations.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-8 text-center card-hover" data-aos="fade-up" data-aos-delay="0">
            <div class="w-14 h-14 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:user-group" class="h-7 w-7 text-[var(--cbo-accent)]" />
            </div>
            <h3 class="text-lg font-semibold text-[var(--cbo-ink)] mb-3">Volunteer</h3>
            <p class="text-[var(--cbo-muted)] text-[15px] mb-4">Join our programs and make a direct impact.</p>
            <NuxtLink to="/contact" class="btn-cbo-outline inline-flex px-5 py-2 rounded-full text-sm">Learn more</NuxtLink>
          </div>
          <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-8 text-center card-hover" data-aos="fade-up" data-aos-delay="80">
            <div class="w-14 h-14 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:megaphone" class="h-7 w-7 text-[var(--cbo-accent)]" />
            </div>
            <h3 class="text-lg font-semibold text-[var(--cbo-ink)] mb-3">Spread the word</h3>
            <p class="text-[var(--cbo-muted)] text-[15px] mb-4">Share our mission with friends and family.</p>
            <button type="button" class="btn-cbo-outline inline-flex px-5 py-2 rounded-full text-sm" @click="shareSite">Share</button>
            <p v-if="shareFeedback" class="mt-3 text-xs text-emerald-700">{{ shareFeedback }}</p>
          </div>
          <div class="rounded-2xl border border-[var(--cbo-border)] bg-white p-8 text-center card-hover" data-aos="fade-up" data-aos-delay="160">
            <div class="w-14 h-14 rounded-xl bg-[var(--cbo-accent-soft)] flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:hand-raised" class="h-7 w-7 text-[var(--cbo-accent)]" />
            </div>
            <h3 class="text-lg font-semibold text-[var(--cbo-ink)] mb-3">Partner with us</h3>
            <p class="text-[var(--cbo-muted)] text-[15px] mb-4">Organizations and businesses can partner for greater impact.</p>
            <NuxtLink to="/contact" class="btn-cbo-outline inline-flex px-5 py-2 rounded-full text-sm">Partner</NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
usePageMeta('Donate', "Support Illchamus Community CBO. Help us preserve culture, support families, and build a brighter future in Baringo County, Kenya.");

const selectedAmount = ref(null);
const customAmount = ref("");
const donorName = ref("");
const donorEmail = ref("");
const donorPhone = ref("");
const quickAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

const donationAmount = computed(() => selectedAmount.value || (customAmount.value ? parseInt(customAmount.value) || 0 : 0));
const canDonate = computed(() => donationAmount.value > 0 && donorName.value?.trim() && donorEmail.value?.trim());

const formatAmount = (n) => `KES ${n.toLocaleString()}`;

const donationFeedback = ref("");

const processDonation = () => {
  if (!canDonate.value) return;
  donationFeedback.value = `Thank you for your donation of ${formatAmount(donationAmount.value)}! We will contact you shortly with payment instructions.`;
  selectedAmount.value = null;
  customAmount.value = "";
  donorName.value = "";
  donorEmail.value = "";
  donorPhone.value = "";
  setTimeout(() => { donationFeedback.value = ""; }, 6000);
};

const shareFeedback = ref("");

const shareSite = async () => {
  const shareData = {
    title: "Illchamus Community CBO",
    text: "Support Illchamus Community CBO — preserving culture and empowering families in Baringo County, Kenya.",
    url: typeof window !== "undefined" ? window.location.origin : "",
  };
  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share(shareData);
      return;
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      shareFeedback.value = "Link copied to clipboard!";
      setTimeout(() => { shareFeedback.value = ""; }, 4000);
    }
  } catch {
    // User cancelled the share sheet or clipboard access was denied — no action needed.
  }
};
</script>

<template>
  <div>
    <PageHero
      eyebrow="Ways to give"
      title="Support our mission"
      lead="Your generous gift helps us preserve Illchamus culture, support families and build a brighter future in Baringo County, Kenya."
      :image="img(photos.children, 1800)"
      image-position="object-[60%_30%]"
      :crumbs="[{ label: 'Donate' }]"
    />

    <section class="py-16 sm:py-20 lg:py-24">
      <div class="shell grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 items-start">
        <!-- Donation form -->
        <div id="give" class="rounded-[28px] bg-white border border-line p-6 sm:p-10 lg:sticky lg:top-24 order-1" data-aos="fade-up">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-ink">Make a donation</h2>
          <p class="mt-2 text-ink-soft">Choose an amount in Kenyan shillings. We'll follow up with payment details.</p>

          <div class="mt-7 grid grid-cols-2 rounded-full bg-paper p-1.5" role="radiogroup" aria-label="Donation frequency">
            <button
              v-for="f in frequencies"
              :key="f.value"
              type="button"
              role="radio"
              :aria-checked="frequency === f.value"
              class="rounded-full py-2.5 text-sm font-bold transition-colors"
              :class="frequency === f.value ? 'bg-maroon text-white shadow' : 'text-ink-soft hover:text-ink'"
              @click="frequency = f.value"
            >
              {{ f.label }}
            </button>
          </div>

          <fieldset class="mt-7">
            <legend class="field-label">Select amount (KES)</legend>
            <div class="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                v-for="amount in quickAmounts"
                :key="amount"
                type="button"
                class="min-h-[3.25rem] rounded-2xl border-[1.5px] font-bold transition-colors"
                :class="selectedAmount === amount ? 'border-maroon bg-sun-soft text-maroon' : 'border-line text-ink hover:border-maroon'"
                :aria-pressed="selectedAmount === amount"
                @click="pickAmount(amount)"
              >
                {{ formatAmount(amount) }}
              </button>
            </div>
          </fieldset>

          <div class="mt-5">
            <label for="customAmount" class="field-label">Or enter your own amount</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-ink-soft">KES</span>
              <input
                id="customAmount"
                v-model="customAmount"
                type="number"
                inputmode="numeric"
                min="1"
                placeholder="Amount"
                class="field pl-14"
                @input="selectedAmount = null"
              />
            </div>
          </div>

          <div class="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="donorName" class="field-label">Full name *</label>
              <input id="donorName" v-model="donorName" type="text" autocomplete="name" class="field" />
            </div>
            <div>
              <label for="donorEmail" class="field-label">Email *</label>
              <input id="donorEmail" v-model="donorEmail" type="email" autocomplete="email" class="field" />
            </div>
            <div>
              <label for="donorPhone" class="field-label">Phone (for M-Pesa)</label>
              <input id="donorPhone" v-model="donorPhone" type="tel" autocomplete="tel" placeholder="+254 7XX XXX XXX" class="field" />
            </div>
          </div>

          <button type="button" :disabled="!canDonate" class="btn btn-sun mt-8 w-full text-base min-h-[3.5rem]" @click="processDonation">
            <Icon name="heroicons:heart-solid" class="h-5 w-5" />
            {{ donationAmount > 0 ? `Give ${formatAmount(donationAmount)}${frequency === "monthly" ? " monthly" : ""}` : "Select an amount" }}
          </button>
          <p v-if="donationFeedback" class="mt-4 rounded-2xl bg-leaf-soft p-4 text-sm font-medium text-leaf" role="status">{{ donationFeedback }}</p>
          <p class="mt-5 flex items-center justify-center gap-2 text-sm text-ink-soft">
            <Icon name="heroicons:lock-closed" class="h-4 w-4" />
            We accept M-Pesa, bank transfer and PayPal.
          </p>
        </div>

        <!-- Impact -->
        <div class="order-2" data-aos="fade-up" data-aos-delay="100">
          <p class="eyebrow">Your gift at work</p>
          <h2 class="h2 mt-3">Your support makes a real difference</h2>
          <ul class="mt-8 space-y-4">
            <li v-for="item in uses" :key="item.title" class="flex gap-4 rounded-[24px] bg-white border border-line p-5 sm:p-6">
              <span class="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center" :class="toneClasses[item.tone]">
                <Icon :name="item.icon" class="h-6 w-6" />
              </span>
              <div>
                <h3 class="font-bold text-lg text-ink">{{ item.title }}</h3>
                <p class="mt-1 text-[15px] leading-relaxed text-ink-soft">{{ item.text }}</p>
              </div>
            </li>
          </ul>
          <div class="relative mt-6 overflow-hidden rounded-[24px] bg-maroon p-6 sm:p-8 text-white">
            <Icon name="mdi:format-quote-open" class="h-10 w-10 text-sun" />
            <p class="mt-2 text-lg font-semibold leading-snug">
              Every program we run today traces back to listening to what our community needs.
            </p>
            <p class="mt-4 text-sm text-white/70">Illchamus Community CBO</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Other ways -->
    <section class="pb-8">
      <div class="shell">
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="eyebrow">More ways to help</p>
          <h2 class="h2 mt-3">Not ready to give? You can still help</h2>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div class="rounded-[26px] bg-sun-soft p-7 sm:p-8 flex flex-col" data-aos="fade-up">
            <Icon name="heroicons:hand-raised" class="h-8 w-8 text-maroon" />
            <h3 class="h3 mt-6">Volunteer</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink/75">Join our programs and make a direct impact in the community.</p>
            <NuxtLink to="/contact" class="link-arrow mt-auto pt-6">Sign up <Icon name="heroicons:arrow-right" class="h-4 w-4" /></NuxtLink>
          </div>
          <div class="rounded-[26px] bg-lake-soft p-7 sm:p-8 flex flex-col" data-aos="fade-up" data-aos-delay="80">
            <Icon name="heroicons:megaphone" class="h-8 w-8 text-[#24647c]" />
            <h3 class="h3 mt-6">Spread the word</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink/75">Share our mission with friends and family.</p>
            <button type="button" class="link-arrow mt-auto pt-6 self-start" @click="shareSite">Share <Icon name="heroicons:arrow-right" class="h-4 w-4" /></button>
            <p v-if="shareFeedback" class="mt-2 text-sm font-semibold text-leaf" role="status">{{ shareFeedback }}</p>
          </div>
          <div class="rounded-[26px] bg-leaf-soft p-7 sm:p-8 flex flex-col" data-aos="fade-up" data-aos-delay="160">
            <Icon name="heroicons:building-office-2" class="h-8 w-8 text-leaf" />
            <h3 class="h3 mt-6">Partner with us</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink/75">Organisations and businesses can partner for greater impact.</p>
            <NuxtLink to="/contact" class="link-arrow mt-auto pt-6">Work with us <Icon name="heroicons:arrow-right" class="h-4 w-4" /></NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { img, photos, toneClasses } from "~/data/site";

usePageMeta("Donate", "Support Illchamus Community CBO. Help us preserve culture, support families, and build a brighter future in Baringo County, Kenya.");

const frequencies = [
  { value: "once", label: "One-time" },
  { value: "monthly", label: "Monthly" },
] as const;
const frequency = ref<"once" | "monthly">("once");

const selectedAmount = ref<number | null>(2500);
const customAmount = ref("");
const donorName = ref("");
const donorEmail = ref("");
const donorPhone = ref("");
const quickAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

const pickAmount = (amount: number) => {
  selectedAmount.value = amount;
  customAmount.value = "";
};

const donationAmount = computed(() => selectedAmount.value || (customAmount.value ? parseInt(customAmount.value) || 0 : 0));
const canDonate = computed(() => donationAmount.value > 0 && !!donorName.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail.value));

const formatAmount = (n: number) => `KES ${n.toLocaleString("en-US")}`;

const donationFeedback = ref("");

const processDonation = () => {
  if (!canDonate.value) return;
  const plan = frequency.value === "monthly" ? " monthly gift" : " donation";
  donationFeedback.value = `Thank you for your${plan} of ${formatAmount(donationAmount.value)}! We will contact you shortly with payment instructions.`;
  selectedAmount.value = null;
  customAmount.value = "";
  donorName.value = "";
  donorEmail.value = "";
  donorPhone.value = "";
  setTimeout(() => (donationFeedback.value = ""), 8000);
};

const uses = [
  { title: "Education support", text: "School supplies, uniforms and learning resources for children.", icon: "heroicons:academic-cap", tone: "sun" as const },
  { title: "Healthcare access", text: "Mobile clinics and health education for families in remote areas.", icon: "heroicons:heart", tone: "lake" as const },
  { title: "Economic development", text: "Micro-loans and training to help families build sustainable livelihoods.", icon: "heroicons:banknotes", tone: "leaf" as const },
  { title: "Culture & conservation", text: "Heritage festivals and care for Lake Baringo and its wildlife.", icon: "heroicons:sparkles", tone: "maroon" as const },
];

const shareFeedback = ref("");

const shareSite = async () => {
  const shareData = {
    title: "Illchamus Community CBO",
    text: "Support Illchamus Community CBO — preserving culture and empowering families in Baringo County, Kenya.",
    url: window.location.origin,
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard?.writeText(shareData.url);
    shareFeedback.value = "Link copied to clipboard!";
    setTimeout(() => (shareFeedback.value = ""), 4000);
  } catch {
    // Share sheet cancelled or clipboard blocked — nothing to do.
  }
};
</script>

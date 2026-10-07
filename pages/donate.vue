<template>
  <div>
    <PageHero
      :eyebrow="t.eyebrow"
      :title="t.title"
      :lead="t.lead"
      :image="img(photos.children, 1800)"
      image-position="object-[60%_30%]"
      :crumbs="[{ label: m.nav.donate }]"
    />

    <section class="py-16 sm:py-20 lg:py-24">
      <div class="shell grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 items-start">
        <!-- Donation pledge form -->
        <form id="give" class="rounded-[28px] bg-white border border-line p-6 sm:p-10 lg:sticky lg:top-24" data-aos="fade-up" novalidate @submit.prevent="submitPledge">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-ink">{{ t.formTitle }}</h2>
          <p class="mt-2 text-ink-soft">{{ t.formText }}</p>
          <input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

          <div class="mt-7 grid grid-cols-2 rounded-full bg-paper p-1.5" role="radiogroup" :aria-label="t.frequency">
            <button
              v-for="f in (['once', 'monthly'] as const)"
              :key="f"
              type="button"
              role="radio"
              :aria-checked="frequency === f"
              class="rounded-full py-2.5 text-sm font-bold transition-colors"
              :class="frequency === f ? 'bg-maroon text-white shadow' : 'text-ink-soft hover:text-ink'"
              @click="frequency = f"
            >
              {{ t[f] }}
            </button>
          </div>

          <fieldset class="mt-7">
            <legend class="field-label">{{ t.selectAmount }}</legend>
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
            <label for="customAmount" class="field-label">{{ t.customAmount }}</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-ink-soft">KES</span>
              <input
                id="customAmount"
                v-model="customAmount"
                type="number"
                inputmode="numeric"
                min="1"
                :placeholder="t.amountPlaceholder"
                class="field pl-14"
                @input="selectedAmount = null"
              />
            </div>
          </div>

          <div class="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="donorName" class="field-label">{{ m.forms.fullName }} *</label>
              <input id="donorName" v-model="donorName" type="text" autocomplete="name" maxlength="120" class="field" />
            </div>
            <div>
              <label for="donorEmail" class="field-label">{{ m.forms.email }} *</label>
              <input id="donorEmail" v-model="donorEmail" type="email" autocomplete="email" class="field" />
            </div>
            <div>
              <label for="donorPhone" class="field-label">{{ t.phoneMpesa }}</label>
              <input id="donorPhone" v-model="donorPhone" type="tel" autocomplete="tel" placeholder="+254 7XX XXX XXX" maxlength="40" class="field" />
            </div>
          </div>

          <button type="submit" :disabled="!canDonate || sending" class="btn btn-sun mt-8 w-full text-base min-h-[3.5rem]">
            <Icon :name="sending ? 'heroicons:arrow-path' : 'heroicons:heart-solid'" class="h-5 w-5" :class="sending ? 'animate-spin' : ''" />
            {{ sending ? m.common.sending : buttonLabel }}
          </button>
          <p
            v-if="feedback"
            class="mt-4 rounded-2xl p-4 text-sm font-medium"
            :class="feedbackOk ? 'bg-leaf-soft text-leaf' : 'bg-red-50 text-red-800'"
            role="status"
            aria-live="polite"
          >
            {{ feedback }}
          </p>
          <p class="mt-5 flex items-center justify-center gap-2 text-sm text-ink-soft">
            <Icon name="heroicons:lock-closed" class="h-4 w-4" />
            {{ t.methods }}
          </p>
        </form>

        <!-- Impact -->
        <div data-aos="fade-up" data-aos-delay="100">
          <p class="eyebrow">{{ t.usesEyebrow }}</p>
          <h2 class="h2 mt-3">{{ t.usesTitle }}</h2>
          <ul class="mt-8 space-y-4">
            <li v-for="(item, i) in t.uses" :key="item.title" class="flex gap-4 rounded-[24px] bg-white border border-line p-5 sm:p-6">
              <span class="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center" :class="toneClasses[useStyle[i]!.tone]">
                <Icon :name="useStyle[i]!.icon" class="h-6 w-6" />
              </span>
              <div>
                <h3 class="font-bold text-lg text-ink">{{ item.title }}</h3>
                <p class="mt-1 text-[15px] leading-relaxed text-ink-soft">{{ item.text }}</p>
              </div>
            </li>
          </ul>
          <div class="relative mt-6 overflow-hidden rounded-[24px] bg-maroon p-6 sm:p-8 text-white">
            <Icon name="mdi:format-quote-open" class="h-10 w-10 text-sun" />
            <p class="mt-2 text-lg font-semibold leading-snug">{{ t.quote }}</p>
            <p class="mt-4 text-sm text-white/70">Illchamus Community CBO</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Other ways -->
    <section class="pb-8">
      <div class="shell">
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="eyebrow">{{ t.moreEyebrow }}</p>
          <h2 class="h2 mt-3">{{ t.moreTitle }}</h2>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div v-for="(way, i) in t.more" :key="way.title" class="rounded-[26px] p-7 sm:p-8 flex flex-col" :class="moreStyle[i]!.bg" data-aos="fade-up" :data-aos-delay="i * 80">
            <Icon :name="moreStyle[i]!.icon" class="h-8 w-8" :class="moreStyle[i]!.color" />
            <h3 class="h3 mt-6">{{ way.title }}</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink/75">{{ way.text }}</p>
            <button v-if="i === 1" type="button" class="link-arrow mt-auto pt-6 self-start" @click="shareSite">
              {{ way.cta }} <Icon name="heroicons:arrow-right" class="h-4 w-4" />
            </button>
            <NuxtLink v-else to="/contact" class="link-arrow mt-auto pt-6">{{ way.cta }} <Icon name="heroicons:arrow-right" class="h-4 w-4" /></NuxtLink>
            <p v-if="i === 1 && shareFeedback" class="mt-2 text-sm font-semibold text-leaf" role="status">{{ shareFeedback }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { img, photos, toneClasses, type Tone } from "~/data/site";

const { m } = useLang();
const t = computed(() => m.value.donate);
usePageMeta(() => t.value.metaTitle, () => t.value.metaDescription);
const toMessage = useFormError();

const frequency = ref<"once" | "monthly">("once");
const selectedAmount = ref<number | null>(2500);
const customAmount = ref("");
const donorName = ref("");
const donorEmail = ref("");
const donorPhone = ref("");
const website = ref(""); // honeypot
const quickAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

const pickAmount = (amount: number) => {
  selectedAmount.value = amount;
  customAmount.value = "";
};

const donationAmount = computed(() => selectedAmount.value || (customAmount.value ? parseInt(customAmount.value) || 0 : 0));
const canDonate = computed(() => donationAmount.value > 0 && !!donorName.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(donorEmail.value.trim()));
const formatAmount = (n: number) => `KES ${n.toLocaleString("en-US")}`;
const buttonLabel = computed(() =>
  donationAmount.value > 0
    ? fill(frequency.value === "monthly" ? t.value.giveMonthly : t.value.give, { amount: formatAmount(donationAmount.value) })
    : t.value.selectFirst
);

const sending = ref(false);
const feedback = ref("");
const feedbackOk = ref(false);

const submitPledge = async () => {
  if (!canDonate.value || sending.value) return;
  sending.value = true;
  feedback.value = "";
  const amount = donationAmount.value;
  try {
    await $fetch("/api/pledge", {
      method: "POST",
      body: { name: donorName.value, email: donorEmail.value, phone: donorPhone.value, amount, frequency: frequency.value, website: website.value },
    });
    feedbackOk.value = true;
    feedback.value = fill(frequency.value === "monthly" ? t.value.thanksMonthly : t.value.thanks, { amount: formatAmount(amount) });
    selectedAmount.value = null;
    customAmount.value = "";
    donorName.value = "";
    donorEmail.value = "";
    donorPhone.value = "";
  } catch (error) {
    feedbackOk.value = false;
    feedback.value = toMessage(error);
  } finally {
    sending.value = false;
  }
};

const useStyle: { icon: string; tone: Tone }[] = [
  { icon: "heroicons:academic-cap", tone: "sun" },
  { icon: "heroicons:heart", tone: "lake" },
  { icon: "heroicons:banknotes", tone: "leaf" },
  { icon: "heroicons:sparkles", tone: "maroon" },
];

const moreStyle = [
  { icon: "heroicons:hand-raised", bg: "bg-sun-soft", color: "text-maroon" },
  { icon: "heroicons:megaphone", bg: "bg-lake-soft", color: "text-[#24647c]" },
  { icon: "heroicons:building-office-2", bg: "bg-leaf-soft", color: "text-leaf" },
];

const shareFeedback = ref("");
const shareSite = async () => {
  const shareData = { title: "Illchamus Community CBO", text: t.value.shareText, url: window.location.origin };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard?.writeText(shareData.url);
    shareFeedback.value = m.value.common.linkCopied;
    setTimeout(() => (shareFeedback.value = ""), 4000);
  } catch {
    // Share sheet cancelled or clipboard blocked — nothing to do.
  }
};
</script>

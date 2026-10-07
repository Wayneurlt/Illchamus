<template>
  <div>
    <PageHero
      eyebrow="About us"
      title="Preserving culture. Empowering community."
      lead="We champion Illchamus heritage while advancing education, wellness and sustainable livelihoods across Baringo County, Kenya."
      :image="img(photos.savanna, 1800)"
      :crumbs="[{ label: 'About Us' }]"
    />

    <!-- Our story -->
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="shell grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div class="relative pb-10 sm:pb-14 pr-10 sm:pr-16" data-aos="fade-up">
          <div class="aspect-[4/3] overflow-hidden rounded-[28px]">
            <img :src="img(photos.classroom, 900, 675)" alt="Pupils in a classroom" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="absolute bottom-0 right-0 w-1/2 aspect-square overflow-hidden rounded-[24px] ring-8 ring-paper">
            <img :src="img(photos.learner, 500, 500)" alt="A learner writing in a notebook" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="absolute top-6 -left-2 sm:left-6 rounded-2xl bg-sun px-4 py-3 shadow-lg">
            <p class="text-2xl font-extrabold text-ink leading-none">12</p>
            <p class="text-xs font-bold text-ink/75">villages together</p>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <p class="eyebrow">Our story</p>
          <h2 class="h2 mt-3">It started with a single visit</h2>
          <p class="lead mt-5">
            Born from a simple visit to a children's home, our journey has grown into a community-driven initiative. We
            partner with local schools, provide scholarships and mentorship, and integrate mental health support so learning
            and wellbeing flourish together.
          </p>
          <ul class="mt-7 space-y-3">
            <li v-for="item in storyPoints" :key="item" class="flex items-start gap-3 text-[16px] font-medium text-ink">
              <span class="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-leaf-soft text-leaf flex items-center justify-center">
                <Icon name="heroicons:check-20-solid" class="h-4 w-4" />
              </span>
              {{ item }}
            </li>
          </ul>
          <div class="mt-9 flex flex-col sm:flex-row gap-3">
            <NuxtLink to="/donate" class="btn btn-ink">Join our mission</NuxtLink>
            <NuxtLink to="/blog/first-charity-visit" class="btn btn-outline">Read the full story</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & vision -->
    <section class="shell grid grid-cols-1 gap-5 md:grid-cols-2">
      <div v-for="(card, i) in purpose" :key="card.title" class="rounded-[28px] p-8 sm:p-10" :class="card.bg" data-aos="fade-up" :data-aos-delay="i * 80">
        <span class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center" :class="card.iconColor">
          <Icon :name="card.icon" class="h-6 w-6" />
        </span>
        <h2 class="mt-6 text-2xl sm:text-[1.75rem] font-bold tracking-tight text-ink">{{ card.title }}</h2>
        <p class="mt-3 text-[17px] leading-relaxed text-ink/80">{{ card.text }}</p>
      </div>
    </section>

    <!-- Values -->
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="shell">
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="eyebrow">Our values</p>
          <h2 class="h2 mt-3">What guides everything we do</h2>
        </div>
        <div class="mt-10 lg:mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(value, i) in values"
            :key="value.title"
            class="rounded-[26px] bg-white border border-line p-7"
            data-aos="fade-up"
            :data-aos-delay="i * 70"
          >
            <span class="w-12 h-12 rounded-2xl flex items-center justify-center" :class="toneClasses[value.tone]">
              <Icon :name="value.icon" class="h-6 w-6" />
            </span>
            <h3 class="h3 mt-6">{{ value.title }}</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-soft">{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact band -->
    <section class="relative overflow-hidden bg-sun-soft py-14 sm:py-20">
      <div class="sun-ring w-[240px] h-[240px] border-[24px] -top-28 -right-20 sm:w-[340px] sm:h-[340px] sm:border-[32px] sm:-top-40" aria-hidden="true" />
      <div class="shell relative">
        <h2 class="h2 max-w-xl pr-12">Real change, real neighbours</h2>
        <p class="lead mt-4 max-w-2xl text-ink">Every figure is a person, a family or a village we walk alongside.</p>
        <ImpactStats class="mt-10 lg:mt-14" />
      </div>
    </section>

    <!-- Where we work -->
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="shell">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up">
          <div class="max-w-2xl">
            <p class="eyebrow">Where we work</p>
            <h2 class="h2 mt-3">Around Lake Baringo, Baringo County</h2>
            <p class="lead mt-4">Twelve villages and settlements, from the lakeshore to the most remote homesteads.</p>
          </div>
          <NuxtLink to="/gallery" class="btn btn-outline shrink-0 self-start sm:self-auto">View gallery</NuxtLink>
        </div>
        <div class="mt-10 grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 sm:gap-4 h-[460px] sm:h-[560px]">
          <div v-for="(tile, i) in mosaic" :key="tile.id" class="relative overflow-hidden rounded-[22px]" :class="tile.span" data-aos="fade-up" :data-aos-delay="i * 60">
            <img :src="img(tile.id, 900)" :alt="tile.alt" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <PageCta
      title="Ready to make a difference?"
      description="Join us in preserving Illchamus culture and empowering our community. Every contribution makes an impact."
      primary-text="Donate"
      primary-to="/donate"
      secondary-text="Get involved"
      secondary-to="/contact"
    />
  </div>
</template>

<script setup lang="ts">
import { img, photos, toneClasses } from "~/data/site";

usePageMeta("About", "Learn about Illchamus Community CBO: our story, mission, values and the communities we serve around Lake Baringo, Kenya.");

const storyPoints = [
  "Scholarships and school essentials",
  "Computer literacy and vocational training",
  "Integrated mental wellness support",
];

const purpose = [
  {
    title: "Our mission",
    text: "To protect our heritage and enable every child and family to thrive through inclusive education, mental wellness support and community-driven development.",
    icon: "heroicons:flag",
    bg: "bg-sun-soft",
    iconColor: "text-maroon",
  },
  {
    title: "Our vision",
    text: "A proud, healthy and self-reliant Illchamus community where culture is celebrated and every generation has the chance to flourish.",
    icon: "heroicons:eye",
    bg: "bg-lake-soft",
    iconColor: "text-[#24647c]",
  },
];

const values = [
  { title: "Culture & identity", text: "We preserve Illchamus heritage through language, arts and storytelling for future generations.", icon: "heroicons:sparkles", tone: "maroon" as const },
  { title: "Education first", text: "Access, equity and excellence in learning for every child.", icon: "heroicons:academic-cap", tone: "sun" as const },
  { title: "Wellbeing", text: "Holistic mental, emotional and social support for strong, resilient families.", icon: "heroicons:heart", tone: "lake" as const },
  { title: "Stewardship", text: "Caring for Lake Baringo and the land so it can sustain those who come after us.", icon: "heroicons:globe-europe-africa", tone: "leaf" as const },
];

const mosaic = [
  { id: photos.children, alt: "Children from the community", span: "col-span-2 lg:row-span-2" },
  { id: photos.roller, alt: "A lilac-breasted roller", span: "" },
  { id: photos.acacia, alt: "Acacia tree at sunset", span: "" },
  { id: photos.giraffe, alt: "Giraffe on the savanna", span: "hidden lg:block" },
  { id: photos.youthTech, alt: "Young people learning computer skills", span: "hidden lg:block" },
];
</script>

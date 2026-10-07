<template>
  <ul v-if="team.length" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <li v-for="(member, i) in team" :key="member.id" class="flex flex-col rounded-[26px] bg-white border border-line overflow-hidden" data-aos="fade-up" :data-aos-delay="(i % 4) * 70">
      <div class="relative aspect-[4/5] bg-sun-soft">
        <Photo
          v-if="member.photo"
          :src="member.photo"
          :alt="member.name"
          :width="480"
          :height="600"
          sizes="100vw sm:50vw lg:300px"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <!-- Placeholder until a photo is uploaded in /admin → Team -->
        <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-maroon">
          <span class="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-extrabold shadow-sm">
            <template v-if="initials(member.name)">{{ initials(member.name) }}</template>
            <Icon v-else name="heroicons:user" class="h-10 w-10 text-maroon/60" />
          </span>
        </div>
      </div>
      <div class="flex-1 p-6">
        <h3 class="text-lg font-bold tracking-tight text-ink">{{ member.name === "Name coming soon" ? m.about.teamTbc : member.name }}</h3>
        <p class="mt-1 text-sm font-semibold text-maroon">{{ tx(member.role, member.roleSw) }}</p>
        <p v-if="member.bio" class="mt-3 text-[15px] leading-relaxed text-ink-soft">{{ tx(member.bio, member.bioSw) }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const { m, tx } = useLang();
const { data: team } = await useTeam();

const initials = (name: string) => {
  const letters = name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !/^(coming|soon|name)$/i.test(w))
    .map((w) => w[0]!.toUpperCase());
  return letters.slice(0, 2).join("");
};
</script>

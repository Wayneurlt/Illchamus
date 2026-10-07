<template>
  <form class="space-y-6" @submit.prevent="save">
    <AdminImageField v-model="form.photo" label="Photo" hint="A clear head-and-shoulders photo works best. It is shown in a portrait frame." round />

    <AdminLangTabs v-model="tab" />

    <template v-if="tab === 'en'">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label for="t-name" class="field-label">Full name *</label>
          <input id="t-name" v-model="form.name" type="text" required maxlength="120" class="field" />
        </div>
        <div>
          <label for="t-role" class="field-label">Role *</label>
          <input id="t-role" v-model="form.role" type="text" required maxlength="120" class="field" placeholder="e.g. Chairperson" />
        </div>
      </div>
      <div>
        <label for="t-bio" class="field-label">Short bio</label>
        <textarea id="t-bio" v-model="form.bio" rows="3" maxlength="1000" class="field" placeholder="One or two sentences (optional)." />
      </div>
    </template>
    <template v-else>
      <p class="rounded-2xl bg-lake-soft p-4 text-sm text-[#24647c]">Optional. Names stay the same; anything left empty shows in English.</p>
      <div>
        <label for="t-role-sw" class="field-label">Wadhifa (role)</label>
        <input id="t-role-sw" v-model="form.roleSw" type="text" maxlength="120" class="field" />
      </div>
      <div>
        <label for="t-bio-sw" class="field-label">Wasifu mfupi (bio)</label>
        <textarea id="t-bio-sw" v-model="form.bioSw" rows="3" maxlength="1000" class="field" />
      </div>
    </template>

    <div class="max-w-[10rem]">
      <label for="t-order" class="field-label">Position in list</label>
      <input id="t-order" v-model.number="form.order" type="number" min="1" max="99" class="field" />
    </div>

    <AdminFormFooter v-model:published="form.published" :busy="busy" :error="error" @cancel="$emit('cancel')" />
  </form>
</template>

<script setup lang="ts">
import type { TeamMember } from "~/composables/useContent";

const props = defineProps<{ item?: TeamMember | null; nextOrder: number }>();
const emit = defineEmits<{ saved: [member: TeamMember]; cancel: [] }>();

const tab = ref<"en" | "sw">("en");
const form = reactive({
  id: props.item?.id || "",
  name: props.item?.name === "Name coming soon" ? "" : props.item?.name || "",
  role: props.item?.role || "",
  roleSw: props.item?.roleSw || "",
  bio: props.item?.bio || "",
  bioSw: props.item?.bioSw || "",
  photo: props.item?.photo || "",
  order: props.item?.order ?? props.nextOrder,
  published: props.item?.published ?? true,
});

const { save: saveItem } = useAdminApi();
const busy = ref(false);
const error = ref("");

const save = async () => {
  busy.value = true;
  error.value = "";
  try {
    emit("saved", await saveItem<TeamMember>("team", { ...form }));
  } catch (e) {
    error.value = adminError(e);
  } finally {
    busy.value = false;
  }
};
</script>

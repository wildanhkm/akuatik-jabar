<script setup lang="ts">
const props = defineProps<{
  label: string;
  required?: boolean;
}>();

const slots = defineSlots<{
  default: void;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="font-medium text-md"
      >{{ props.label }}
      <span v-if="props.required" class="text-red-600 font-bold">*</span>
    </label>
    <slot />
  </div>
</template>

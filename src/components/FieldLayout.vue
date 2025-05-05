<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();

const slots = defineSlots<{
  default: void;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="font-medium text-md">{{ props.label }}</label>
    <slot />
  </div>
</template>

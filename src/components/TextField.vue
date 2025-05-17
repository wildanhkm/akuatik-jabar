<script setup lang="ts">
import { computed } from 'vue';

type TextFieldProps = {
  type?: string;
  class?: string;
};
const props = defineProps<TextFieldProps>();

const textFieldClasses = props.class + ' text-gray-900';
const componentType = computed(() => {
  return props.type || 'p';
});
</script>
<template>
  <component :is="componentType" :class="textFieldClasses">
    <slot></slot>
  </component>
</template>
<style lang=""></style>

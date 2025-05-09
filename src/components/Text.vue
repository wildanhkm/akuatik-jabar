<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';

type TextPropType = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  class?: string;
  variant?: 'header1' | 'header2' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  subtitle?: string;
  text?: string;
};

const props = withDefaults(defineProps<TextPropType>(), {
  as: 'h1',
  class: 'h-8',
  variant: 'header1',
});

const textBaseClass = 'text-gray-900';

const textClasses = computed(() => {
  switch (props.variant) {
    case 'header1':
      return `text-3xl font-bold ${textBaseClass}`;
    case 'header2':
      return `text-2xl font-bold ${textBaseClass}`;
    case 'subtitle1':
      return `text-xl font-medium ${textBaseClass}`;
    case 'subtitle2':
      return `text-lg font-medium ${textBaseClass}`;
    case 'body1':
      return `text-md ${textBaseClass}`;
    case 'body2':
      return `text-sm ${textBaseClass}`;
    default:
      return '';
  }
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <component :is="props.as" :class="textClasses">{{ props.text }}</component>
    <p v-if="props.subtitle" class="text-gray-700 text-md">{{ props.subtitle }}</p>
  </div>
</template>

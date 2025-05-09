<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

type SectionPropType = {
  class?: string;
};

const props = withDefaults(defineProps<SectionPropType>(), {
  class: 'h-8',
});
</script>

<template>
  <section :class="props.class"></section>
</template>

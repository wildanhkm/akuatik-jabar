<script setup lang="ts">
// import { Button } from 'primevue';
import Text from '../../components/Text.vue';
// import { useRouter } from 'vue-router';

// const router = useRouter();

// function goToEvents() {
//   router.push({ name: 'Event' });
// }
</script>

<template>
  <div class="flex flex-col gap-6">
    <Text as="h1" text="Event Management" />

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-4 flex items-center justify-between">
        <div>
          <Text as="h3" variant="subtitle1" text="Tambah Event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'primevue';
import Table from '../../components/Table.vue';
import Text from '../../components/Text.vue';
import { useRouter } from 'vue-router';

type Event = {
  id: number;
  name: string;
  date: string;
  city: string;
  isActive: boolean;
};

const router = useRouter();

const userData = ref<Event[]>([
  { id: 1, name: 'Event Januari ', date: '01/01/2025', city: 'New York', isActive: false },
  { id: 2, name: 'Event Februari ', date: '01/02/2025', city: 'London', isActive: false },
  { id: 3, name: 'Event Maret ', date: '01/03/2025', city: 'London', isActive: true },
  { id: 4, name: 'Event April', date: '01/04/2025', city: 'London', isActive: false },
  { id: 5, name: 'Event Mei', date: '01/05/2025', city: 'London', isActive: false },
  { id: 6, name: 'Event Juni', date: '01/06/2025', city: 'London', isActive: false },
  { id: 7, name: 'Event Juli', date: '01/07/2025', city: 'London', isActive: false },
  { id: 8, name: 'Event Agustus', date: '01/08/2025', city: 'London', isActive: false },
  { id: 9, name: 'Event September', date: '01/09/2025', city: 'London', isActive: false },
  { id: 10, name: 'Event Oktober', date: '01/10/2025', city: 'London', isActive: false },
  { id: 11, name: 'Event November', date: '01/11/2025', city: 'Rotterdam', isActive: false },
  { id: 12, name: 'Event Desember', date: '01/12/2025', city: 'Rotterdam', isActive: false },
]);

const columns = ref([
  { name: 'ID', field: 'id' },
  { name: 'Name', field: 'name' },
  { name: 'Date', field: 'date' },
  { name: 'City', field: 'city' },
  { name: 'Active', field: 'isActive', template: 'tag' },
  { name: 'Actions', field: 'actions', template: 'actions' },
]);

function editEvent(id: number) {
  console.log('Edit event with ID:', id);
}

function viewEvent(id: number) {
  console.log('Edit event with ID:', id);
}

function goToCreateEvent() {
  router.push({ name: 'CreateEvent' });
}
</script>
<template>
  <div class="flex flex-col gap-6">
    <Text as="h1" text="Event Management" />

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-4 flex items-center justify-between border-b">
        <div>
          <Text as="h3" variant="subtitle1" text="Semua Event" />
        </div>
        <Button severity="info" @click="goToCreateEvent"> Tambah Event </Button>
      </div>

      <Table :values="userData" :columns="columns">
        <template #actions="{ data }">
          <div class="flex gap-2 items-center">
            <Button severity="info" variant="outlined" @click="viewEvent(data.id)">Lihat</Button>
            <Button severity="contrast" variant="outlined" @click="editEvent(data.id)">Edit</Button>
          </div>
        </template></Table
      >
    </div>
  </div>
</template>

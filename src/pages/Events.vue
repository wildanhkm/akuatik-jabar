<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'primevue';
import Table from '../components/Table.vue';
import TextField from '../components/TextField.vue';

type Event = {
  id: number;
  name: string;
  date: string;
  city: string;
  isActive: boolean;
};

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
</script>
<template>
  <div>
    <TextField type="h1" class="text-2xl font-bold mb-6">Events Management</TextField>

    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div class="p-4 flex items-center justify-between border-b">
        <div>
          <TextField type="h3" class="text-lg font-semibold">All Events</TextField>
          <p class="text-sm text-gray-500">Manage your events</p>
        </div>
        <Button> Add Event </Button>
      </div>

      <Table :values="userData" :columns="columns"> </Table>
    </div>
  </div>
</template>

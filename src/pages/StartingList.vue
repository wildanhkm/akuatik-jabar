<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'primevue';
import Table from '../components/Table.vue';
import TextField from '../components/TextField.vue';

type StartingList = {
  id: number;
  name: string;
  position: number;
};

const userData = ref<StartingList[]>([
  { id: 1, name: 'John Doe', position: 1 },
  { id: 2, name: 'Jane Smith', position: 2 },
  { id: 3, name: 'Ole Larsen', position: 3 },
  { id: 4, name: 'Kuan-Yin Ku', position: 4 },
  { id: 5, name: 'Qing Yuan Lo', position: 5 },
  { id: 6, name: 'Smith', position: 6 },
  { id: 7, name: 'Robert Edward', position: 7 },
  { id: 8, name: 'David Sam', position: 8 },
  { id: 9, name: 'Jessica Miller', position: 9 },
  { id: 10, name: 'Alex Jason', position: 10 },
  { id: 11, name: 'Vikash van Kaathoven', position: 11 },
  { id: 12, name: 'Jansen van Engelsman', position: 12 },
  { id: 13, name: 'Dorothy', position: 13 },
  { id: 14, name: 'Jane Wongso', position: 14 },
  { id: 15, name: 'Pascal Smith Limanto', position: 15 },
  { id: 16, name: 'Jane Quincy', position: 16 },
  { id: 17, name: 'Jane Miller', position: 17 },
  { id: 18, name: 'Angela Purnomo', position: 18 },
  { id: 19, name: 'Didik', position: 19 },
  { id: 20, name: 'Akbar', position: 20 },
]);

const columns = ref([
  { name: 'ID', field: 'id' },
  { name: 'Name', field: 'name' },
  { name: 'Position', field: 'position' },
]);
</script>
<template>
  <div>
    <TextField type="h1" class="text-2xl font-bold mb-6">Starting List Management</TextField>

    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div class="p-4 flex items-center justify-between border-b">
        <div>
          <TextField type="h3" class="text-lg font-semibold">All Starting List</TextField>
          <p class="text-sm text-gray-500">Manage your starting list</p>
        </div>
        <Button> Add Starting List </Button>
      </div>

      <Table :values="userData" :columns="columns"> </Table>
    </div>
  </div>
</template>

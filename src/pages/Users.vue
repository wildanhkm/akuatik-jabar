<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'primevue';
import Table from '../components/Table.vue';
import TextField from '../components/TextField.vue';

type User = {
  id: number;
  name: string;
  age: number;
  city: string;
  isActive: boolean;
};

const userData = ref<User[]>([
  { id: 1, name: 'John Doe', age: 28, city: 'New York', isActive: true },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London', isActive: true },
  { id: 3, name: 'Ole Larsen', age: 22, city: 'London', isActive: true },
  { id: 4, name: 'Kuan-Yin Ku', age: 32, city: 'London', isActive: true },
  { id: 5, name: 'Qing Yuan Lo', age: 32, city: 'London', isActive: true },
  { id: 6, name: 'Smith', age: 32, city: 'London', isActive: true },
  { id: 7, name: 'Robert Edward', age: 32, city: 'London', isActive: false },
  { id: 8, name: 'David Sam', age: 32, city: 'London', isActive: false },
  { id: 9, name: 'Jessica Miller', age: 32, city: 'London', isActive: false },
  { id: 10, name: 'Alex Jason', age: 32, city: 'London', isActive: false },
  { id: 11, name: 'Vikash van Kaathoven', age: 32, city: 'Rotterdam', isActive: true },
  { id: 12, name: 'Jansen van Engelsman', age: 32, city: 'Rotterdam', isActive: true },
  { id: 13, name: 'Dorothy', age: 32, city: 'London', isActive: true },
  { id: 14, name: 'Jane Wongso', age: 32, city: 'Surabaya', isActive: false },
  { id: 15, name: 'Pascal Smith Limanto', age: 32, city: 'Surabaya', isActive: false },
  { id: 16, name: 'Jane Quincy', age: 32, city: 'London', isActive: true },
  { id: 17, name: 'Jane Miller', age: 32, city: 'London', isActive: true },
  { id: 18, name: 'Angela Purnomo', age: 32, city: 'Malang', isActive: false },
  { id: 19, name: 'Didik', age: 32, city: 'London', isActive: false },
  { id: 20, name: 'Akbar', age: 32, city: 'London', isActive: true },
]);

const columns = ref([
  { name: 'ID', field: 'id' },
  { name: 'Name', field: 'name' },
  { name: 'Age', field: 'age' },
  { name: 'City', field: 'city' },
  { name: 'Active', field: 'isActive', template: 'tag' },
]);
</script>
<template>
  <div>
    <TextField type="h1" class="text-2xl font-bold mb-6">Users Management</TextField>

    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div class="p-4 flex items-center justify-between border-b">
        <div>
          <TextField type="h3" class="text-lg font-semibold">All Users</TextField>
          <p class="text-sm text-gray-500">Manage your user accounts</p>
        </div>
        <Button> Add User </Button>
      </div>

      <Table :values="userData" :columns="columns"> </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabulatorTable from '../components/TabulatorTable.vue';

interface User {
  id: number;
  name: string;
  age: number;
  city: string;
}

const userData = ref<User[]>([
  { id: 1, name: 'John Doe', age: 28, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
  { id: 2, name: 'Jane Smith', age: 32, city: 'London' },
]);

const columns = ref([
  { title: 'ID', field: 'id', sorter: 'number', width: 80 },
  { title: 'Name', field: 'name', sorter: 'string' },
  { title: 'Age', field: 'age', sorter: 'number' },
  { title: 'City', field: 'city', sorter: 'string' },
]);

const onRowClick = (data) => {
  console.log('Row clicked:', data);
};

const onPageChanged = (pageNumber: number) => {
  console.log('Page changed to:', pageNumber);
};
</script>
<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Users Management</h2>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-4 flex items-center justify-between border-b">
        <div>
          <h3 class="text-lg font-semibold">All Users</h3>
          <p class="text-sm text-gray-500">Manage your user accounts</p>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add User
        </button>
      </div>

      <div>
        <TabulatorTable
          :data="userData"
          :columns="columns"
          height="500px"
          :pagination="true"
          @row-click="onRowClick"
          @page-changed="onPageChanged"
        />
      </div>
    </div>
  </div>
</template>

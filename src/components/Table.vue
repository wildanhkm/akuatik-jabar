<script setup lang="ts">
import { defineProps } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { Button } from 'primevue';

type TableProps = {
  values: unknown[];
  columns: {
    field: string;
    name: string;
    template?: string; // To indicate which columns need custom templates
  }[];
};

const props = defineProps<TableProps>();
const emit = defineEmits<{
  (e: 'onEditAction', id: string): void;
  (e: 'onDeleteAction', id: string): void;
}>();

// Helper function to get status severity based on boolean value
const getSeverity = (status: boolean) => {
  return status ? 'success' : 'danger';
};
</script>
<template>
  <DataTable
    :value="props.values"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    class="p-datatable-light"
  >
    <Column
      v-for="(col, index) in props.columns"
      :key="index"
      :field="col.field"
      :header="col.name"
    >
      <!-- Custom template options based on column type -->
      <template #body="slotProps" v-if="col.template === 'tag'">
        <Tag
          :value="slotProps.data[col.field] ? 'Active' : 'Inactive'"
          :severity="getSeverity(slotProps.data[col.field])"
        />
      </template>

      <template #body="slotProps" v-else-if="col.template === 'name'">
        <div class="flex align-items-center gap-2">
          <span class="font-bold">{{ slotProps.data[col.field] }}</span>
        </div>
      </template>

      <template #body="slotProps" v-else-if="col.template === 'actions'">
        <div class="flex gap-2">
          <Button
            severity="info"
            variant="outlined"
            @click="emit('onEditAction', slotProps.data['id'])"
            >Edit</Button
          >
          <Button
            severity="danger"
            variant="outlined"
            @click="emit('onDeleteAction', slotProps.data['id'])"
            >Delete</Button
          >
        </div>
      </template>
    </Column>
  </DataTable>
</template>

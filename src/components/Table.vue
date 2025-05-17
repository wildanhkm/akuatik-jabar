<script setup lang="ts">
import { defineProps } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

type TableProps = {
  values: unknown[];
  columns: {
    field: string;
    name: string;
    template?: string; // To indicate which columns need custom templates
  }[];
};

const props = defineProps<TableProps>();
// const emit = defineEmits<{
//   (e: 'onEditAction', id: string): void;
//   (e: 'onDeleteAction', id: string): void;
// }>();

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
      <!-- Use parent slot if provided for this column -->
      <template #body="slotProps" v-if="$slots[col.field]">
        <slot :name="col.field" v-bind="slotProps" />
      </template>

      <!-- Default templates if no parent slot -->
      <template #body="slotProps" v-else-if="col.template === 'tag'">
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
    </Column>
  </DataTable>
</template>

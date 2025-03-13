<template>
  <div>
    <div class="tabulator-controls" v-if="showControls">
      <input
        v-if="enableSearch"
        v-model="searchQuery"
        @input="onSearch"
        placeholder="Search..."
        class="tabulator-search"
      />
      <button v-if="enableDownload" @click="downloadData('csv')" class="tabulator-button">
        Download CSV
      </button>
      <button v-if="enableDownload" @click="downloadData('xlsx')" class="tabulator-button">
        Download Excel
      </button>
      <button v-if="enablePrint" @click="printTable" class="tabulator-button">Print</button>
    </div>
    <div ref="tabulatorRef" class="tabulator-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, defineProps, defineEmits } from 'vue';
import { Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator_materialize.min.css';

// Define TypeScript interfaces
interface RowData {
  [key: string]: any;
}

interface ColumnDefinition {
  title: string;
  field: string;
  sorter?: string;
  width?: number;
  headerFilter?: boolean;
  formatter?: string | Function;
  [key: string]: any;
}

interface TabulatorOptions {
  [key: string]: any;
}

interface RowClickEvent {
  event: MouseEvent;
  row: RowData;
}

// Define props with TypeScript types
const props = defineProps<{
  data: RowData[];
  columns: ColumnDefinition[];
  options?: TabulatorOptions;
  enableSearch?: boolean;
  enableDownload?: boolean;
  enablePrint?: boolean;
  showControls?: boolean;
  height?: string;
  layout?: string;
  selectable?: boolean;
  pagination?: boolean;
  paginationSize?: number;
  paginationPosition?: 'top' | 'bottom' | 'both';
}>();

// Define emits
const emit = defineEmits<{
  (e: 'row-click', payload: RowClickEvent): void;
  (e: 'data-loaded'): void;
  (e: 'selection-changed', payload: RowData[]): void;
  (e: 'page-changed', payload: number): void;
}>();

// Setup reactive state
const tabulatorRef = ref<HTMLElement | null>(null);
const searchQuery = ref<string>('');
let tabulator: Tabulator | null = null;

// Initialize Tabulator
const initializeTabulator = () => {
  if (!tabulatorRef.value) return;

  // Combine default options with passed options
  const defaultOptions: TabulatorOptions = {
    height: props.height || '400px',
    layout: props.layout || 'fitColumns',
    data: props.data,
    columns: props.columns,
    selectable: props.selectable ?? false,
    reactiveData: true, // Automatically update when data changes

    pagination: 'local',
    paginationSize: 6,
    paginationSizeSelector: [3, 6, 8, 10],
    movableColumns: true,
    paginationCounter: 'rows',
  };

  // Create the table
  tabulator = new Tabulator(tabulatorRef.value, {
    ...defaultOptions,
    ...props.options,
  });

  // Set up event emitters
  tabulator.on('rowClick', (e, row) => {
    emit('row-click', { event: e as MouseEvent, row: row.getData() });
  });

  tabulator.on('dataLoaded', () => {
    emit('data-loaded');
  });

  if (props.selectable) {
    tabulator.on('rowSelectionChanged', (data) => {
      emit('selection-changed', data as RowData[]);
    });
  }
};

// Search functionality
const onSearch = () => {
  if (tabulator) {
    tabulator.setFilter('*', 'like', searchQuery.value);
  }
};

// Download table data
const downloadData = (fileType: 'csv' | 'xlsx') => {
  if (!tabulator) return;

  if (fileType === 'csv') {
    tabulator.download('csv', 'data.csv');
  } else if (fileType === 'xlsx') {
    tabulator.download('xlsx', 'data.xlsx');
  }
};

// Print table
const printTable = () => {
  if (tabulator) {
    tabulator.print();
  }
};

// Method to refresh table
const refreshTable = () => {
  if (tabulator) {
    tabulator.redraw(true);
  }
};

// Method to clear filters
const clearFilters = () => {
  if (tabulator) {
    tabulator.clearFilter(false);
    searchQuery.value = '';
  }
};

// Method to get selected rows
const getSelectedRows = (): RowData[] => {
  if (!tabulator) return [];
  return tabulator.getSelectedRows().map((row) => row.getData());
};

// Method to navigate to a specific page
const setPage = (pageNumber: number) => {
  if (!tabulator) return false;
  return tabulator.setPage(pageNumber);
};

// Watch for changes in data
watch(
  () => props.data,
  (newValue) => {
    if (tabulator) {
      tabulator.setData(newValue);
    }
  },
  { deep: true }
);

// Lifecycle hooks
onMounted(() => {
  initializeTabulator();
});

onBeforeUnmount(() => {
  if (tabulator) {
    tabulator.destroy();
  }
});

// Expose methods for the parent component
defineExpose({
  refreshTable,
  clearFilters,
  getSelectedRows,
  setPage,
});
</script>

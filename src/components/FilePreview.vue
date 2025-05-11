<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { UploadableFile } from '../compositions/file-list';
import * as XLSX from 'xlsx';
import { DocumentTextIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/20/solid';

const props = withDefaults(
  defineProps<{
    file: UploadableFile;
    tag: string;
  }>(),
  {
    file: () => {
      return {
        file: {
          name: '',
        },
        status: false,
      } as UploadableFile;
    },
    tag: 'li',
  }
);

defineEmits<{
  (e: 'remove', value: UploadableFile): void;
}>();

const previewData = ref<any[]>([]);

// Function to parse Excel file and generate preview
async function parseExcelFile() {
  try {
    if (isExcelFile(props.file.file)) {
      const arrayBuffer = await props.file.file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      // Get first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert to array of arrays (limited to first few rows for preview)
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      previewData.value = jsonData;
    }
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    previewData.value = [];
  }
}

// Check if file is an Excel file
function isExcelFile(file: File): boolean {
  const excelTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.oasis.opendocument.spreadsheet',
  ];
  return excelTypes.includes(file.type) || /\.(xlsx|xls|xlsb|xlsm|ods)$/i.test(file.name);
}

// Parse Excel file when component is mounted
onMounted(() => {
  if (props.file && props.file.file) {
    parseExcelFile();
  }
});

// Watch for file changes
watch(
  () => props.file,
  () => {
    parseExcelFile();
  },
  { deep: true }
);
</script>
<template>
  <component
    :is="tag"
    class="relative w-1/5 m-4 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md"
  >
    <button
      @click="$emit('remove', file)"
      class="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-700 text-white shadow-md leading-5 text-center cursor-pointer border-0 p-0"
    >
      <XMarkIcon />
    </button>

    <!-- Excel icon when no preview is available -->
    <div v-if="!previewData" class="w-full h-32 flex items-center justify-center bg-green-50">
      <div class="text-center">
        <div class="text-green-600 mb-2">
          <DocumentTextIcon />
        </div>
        <div class="text-sm font-medium text-gray-700 truncate px-2" :title="file.file.name">
          {{ file.file.name }}
        </div>
      </div>
    </div>

    <!-- Excel data preview when available -->
    <div v-else class="w-full h-full p-2 overflow-auto">
      <div class="text-xs font-medium text-gray-700 mb-2 truncate" :title="file.file.name">
        {{ file.file.name }}
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse" v-if="previewData.length > 0">
          <thead>
            <tr class="bg-gray-100">
              <th
                v-for="(header, idx) in previewData[0]"
                :key="idx"
                class="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIdx) in previewData.slice(1, 5)" :key="rowIdx">
              <td
                v-for="(cell, cellIdx) in row"
                :key="cellIdx"
                class="border border-gray-300 px-1 py-1 text-xs text-gray-600"
              >
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center text-xs text-gray-500">Unable to preview Excel content</div>
      </div>
      <div v-if="previewData.length > 5" class="text-center text-xs text-gray-500 mt-2">
        Showing 4 of {{ previewData.length - 1 }} rows
      </div>
    </div>

    <span
      v-show="file.status === null"
      class="absolute bottom-1 right-1 h-5 px-2.5 rounded-full text-xs leading-5 text-black shadow-md animate-pulse bg-white"
    >
      In Progress
    </span>

    <span
      v-show="file.status === true"
      class="absolute bottom-1 right-1 h-5 px-2.5 rounded-full text-xs leading-5 bg-green-300 text-green-800 shadow-md"
    >
      Uploaded
    </span>

    <span
      v-show="file.status === false"
      class="absolute bottom-1 right-1 h-5 px-2.5 rounded-full text-xs leading-5 bg-red-700 text-white shadow-md"
    >
      Error
    </span>
  </component>
</template>

<style>
/* Adding custom animation for pulse effect if not using Tailwind's built-in animate-pulse */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits<{
  (e: 'files-dropped', value: File[]): void;
}>();

let active = ref(false);
let isValidDrag = ref(true);
let inActiveTimeout: ReturnType<typeof setTimeout> = 0;

// Validate if files are Excel files
function areExcelFiles(files: FileList | File[]): boolean {
  if (!files || files.length === 0) return false;

  const excelMimeTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.oasis.opendocument.spreadsheet',
  ];

  const excelExtensions = ['.xlsx', '.xls', '.xlsm', '.xlsb', '.ods'];

  return Array.from(files).every((file) => {
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    return excelMimeTypes.includes(file.type) || excelExtensions.includes(fileExtension);
  });
}

function handleDragEnter(e: DragEvent) {
  setActive();

  // Check if the dragged items are files and if they're Excel files
  if (e.dataTransfer?.items) {
    isValidDrag.value = Array.from(e.dataTransfer.items).every((item) => {
      return (
        item.kind === 'file' &&
        (item.type.includes('excel') ||
          item.type.includes('spreadsheet') ||
          // Since we can't access the file name here, we have to be a bit permissive
          item.type === 'application/octet-stream')
      );
    });
  }
}

function handleDragOver() {
  setActive();
}

function setActive() {
  active.value = true;
  clearTimeout(inActiveTimeout);
}

function setInactive() {
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function onDrop(e: DragEvent) {
  setInactive();

  if (e.dataTransfer?.files) {
    const files = [...e.dataTransfer.files];

    // Filter only Excel files
    if (areExcelFiles(files)) {
      emit('files-dropped', files);
    } else {
      // Show an error message or notification that non-Excel files were rejected
      console.warn('Only Excel files are accepted');
    }
  }
}

function preventDefaults(e: Event) {
  e.preventDefault();
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>

<template>
  <div
    class="transition-all duration-200 ease-in-out border-2 border-dashed rounded-lg p-4"
    :class="{
      'border-gray-300 bg-gray-50': !active,
      'border-green-400 bg-green-50': active && isValidDrag,
      'border-red-400 bg-red-50': active && !isValidDrag,
    }"
    @dragenter.prevent="handleDragEnter"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <slot :dropZoneActive="active" :isValidDrag="isValidDrag"></slot>
  </div>
</template>

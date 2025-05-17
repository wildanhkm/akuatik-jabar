<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { ref } from 'vue';

const model = ref(false);
const loading = ref(false);

// Form data
const formData = ref({
  username: '',
  email: '',
});

// Props for initial data and callback function
const props = withDefaults(
  defineProps<{
    message: string;
    modalTitle: string;
    mainButtonText?: string;
    mainButtonType?: 'submit' | 'reset' | 'button';
    cancelButtonText?: string;
    submitButtonText?: string;
  }>(),
  {
    modalTitle: 'Modal Title',
    mainButtonText: 'Submit',
    mainButtonType: 'button',
    cancelButtonText: 'Cancel',
    submitButtonText: 'Submit',
  }
);

// Event emitters
const emit = defineEmits<{
  (e: 'confirmed'): void;
  (e: 'cancelled'): void;
}>();

// Reset form when dialog is closed
const onDialogHide = () => {
  formData.value = { username: '', email: '' };
  loading.value = false;
};

// Cancel handler
const handleCancel = () => {
  emit('cancelled');
  model.value = false;
};

// Confirm handler - calls API
const handleConfirm = () => {
  emit('confirmed');
};

const handleOpenModal = () => {
  model.value = true;
};
</script>

<template>
  <Button
    :type="props.mainButtonType"
    :label="props.mainButtonText"
    severity="info"
    :disabled="loading"
    @click="handleOpenModal"
  ></Button>
  <Dialog
    v-model:visible="model"
    modal
    :header="props.modalTitle"
    :style="{ width: '25rem' }"
    @hide="onDialogHide"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ props.message }}</span>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        :label="props.cancelButtonText"
        severity="secondary"
        :disabled="loading"
        @click="handleCancel"
      ></Button>
      <Button
        type="button"
        :label="props.submitButtonText"
        :loading="loading"
        severity="info"
        @click="handleConfirm"
      ></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import { Form, FormSubmitEvent } from '@primevue/forms';
import { Button, DatePicker, Message, MultiSelect, Toast } from 'primevue';
import FieldLayout from '../../components/FieldLayout.vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

type FormValues = {
  name: string;
  eventName: string;
  birthDate: string;
  birthPlace: string;
};

const toast = useToast();

const categories = ref([
  {
    name: 'Gaya Dada',
    value: 'dada',
  },
]);

const initialValues = ref<FormValues>({
  name: '',
  eventName: '',
  birthDate: '',
  birthPlace: '',
});

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().min(3, 'Nama wajib diisi!'),
      birthPlace: z.string().min(3, 'Tempat lahir wajib diisi!'),
      birthDate: z.string().min(3, 'Tanggal lahir wajib diisi!'),
      eventName: z.string().min(3, 'Nama kompetisi lahir wajib diisi!'),
      categories: z
        .array(z.object({ name: z.string().min(1, 'Nomor lomba wajib dipilih!') }))
        .min(1, 'Nomor lomba wajib dipilih!'),
    })
  )
);

const onFormSubmit = ({ valid }: FormSubmitEvent) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 bg-white p-8 rounded-lg">
    <Toast />

    <h1 class="text-3xl font-bold text-center">Registrasi Kejurkab</h1>
    <p>Daftarkan diri Anda untuk mengikuti Kejurkab</p>

    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
      <div class="grid grid-cols-2 gap-8 w-full py-10">
        <div class="flex flex-col gap-1">
          <FieldLayout label="Nama Kompetisi">
            <InputText id="eventName" name="eventName" type="text" fluid />
          </FieldLayout>
          <Message
            v-if="$form?.eventName?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.eventName.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <FieldLayout label="Nama Peserta">
            <InputText id="name" name="name" type="text" fluid />
          </FieldLayout>
          <Message v-if="$form?.name?.invalid" severity="error" size="small" variant="simple">{{
            $form.name.error?.message
          }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <FieldLayout label="Tempat Lahir">
            <InputText id="birthPlace" name="birthPlace" type="text" fluid />
          </FieldLayout>
          <Message
            v-if="$form?.birthPlace?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.birthPlace.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <FieldLayout label="Tanggal Lahir">
            <DatePicker name="birthDate" fluid />
          </FieldLayout>
          <Message
            v-if="$form?.birthDate?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.birthDate.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <FieldLayout label="Nomor Lomba">
            <MultiSelect
              name="categories"
              :options="categories"
              optionLabel="name"
              :maxSelectedLabels="3"
              display="chip"
            />
          </FieldLayout>
          <Message
            v-if="$form?.birthDate?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.birthDate.error?.message }}</Message
          >
        </div>
      </div>
      <Button type="submit" severity="secondary" label="Simpan" />
    </Form>
  </div>
</template>

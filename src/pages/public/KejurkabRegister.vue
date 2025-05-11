<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import { Form, FormSubmitEvent } from '@primevue/forms';
import { Button, Message, MultiSelect, Select, Toast } from 'primevue';
import FieldLayout from '../../components/FieldLayout.vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { competitionCategoriesByAge } from '../../constants/constants';
import Text from '../../components/Text.vue';
import DropZone from '../../components/DropZone.vue';
import FilePreview from '../../components/FilePreview.vue';
import useFileList from '../../compositions/file-list';
import createUploader from '../../compositions/file-uploader';

enum EnumRegistrationType {
  Import = 'ImportExcel',
  Form = 'InputForm',
}

type FormValues = {
  name: string;
  gender: string;
  clubName: string;
  birthYear: string;
  bestTime: string;
  ageCategory: string;
  competitionCategory: string[];
};

const toast = useToast();

// File Management
const { files, addFiles, removeFile } = useFileList();

// Uploader
const { uploadFiles } = createUploader('YOUR URL HERE');

const ageCategories = ref([
  {
    label: 'KU 1 + Senior',
    value: 'ku_1_senior',
  },
  {
    label: 'KU 2',
    value: 'ku_2',
  },
  {
    label: 'KU 3',
    value: 'ku_3',
  },
  {
    label: 'KU 4',
    value: 'ku_4',
  },
  {
    label: 'KU 5A',
    value: 'ku_5A',
  },
  {
    label: 'KU 5B',
    value: 'ku_5B',
  },
]);

const allCompetitionCategories = ref([
  {
    label: 'Freestyle 25 M',
    value: 'freestyle_25_m',
  },
  {
    label: 'Freestyle 50 M',
    value: 'freestyle_50_m',
  },
  {
    label: 'Freestyle 100 M',
    value: 'freestyle_100_m',
  },
  {
    label: 'Freestyle 200 M',
    value: 'freestyle_200_m',
  },
  {
    label: 'Freestyle 400 M',
    value: 'freestyle_400_m',
  },
  {
    label: 'Breast Stroke 25 M',
    value: 'breast_stroke_25_m',
  },
  {
    label: 'Breast Stroke 50 M',
    value: 'breast_stroke_50_m',
  },
  {
    label: 'Breast Stroke 100 M',
    value: 'breast_stroke_100_m',
  },
  {
    label: 'Breast Stroke 200 M',
    value: 'breast_stroke_200_m',
  },
  {
    label: 'Back Stroke 25 M',
    value: 'back_stroke_25_m',
  },
  {
    label: 'Back Stroke 50 M',
    value: 'back_stroke_50_m',
  },
  {
    label: 'Back Stroke 100 M',
    value: 'back_stroke_100_m',
  },
  {
    label: 'Back Stroke 200 M',
    value: 'back_stroke_200_m',
  },
  {
    label: 'Butterfly 25 M',
    value: 'butterfly_25_m',
  },
  {
    label: 'Butterfly 50 M',
    value: 'butterfly_50_m',
  },
  {
    label: 'Butterfly 100 M',
    value: 'butterfly_100_m',
  },
  {
    label: 'Butterfly 200 M',
    value: 'butterfly_200_m',
  },
  {
    label: 'IM 200 M',
    value: 'im_200_m',
  },
  {
    label: 'IM 400 M',
    value: 'im_400_m',
  },
  {
    label: 'Freestyle & IM 4 x 100 M',
    value: 'freestyle_im_4x100_m',
  },
]);

const selectedRegType = ref<EnumRegistrationType>();

const gender = ref([
  {
    label: 'Laki-laki',
    value: 'laki',
  },
  {
    label: 'Perempuan',
    value: 'perempuan',
  },
]);

const initialValues = ref<FormValues>({
  name: '',
  gender: '',
  clubName: '',
  birthYear: '',
  bestTime: '',
  ageCategory: '',
  competitionCategory: [],
});

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().min(3, 'Nama wajib diisi!'),
      gender: z.string().min(3, 'Jenis kelamin wajib dipilih!'),
      birthYear: z.string().min(4, 'Tahun lahir wajib diisi!'),
      bestTime: z.string().min(1, 'Best time wajib diisi!'),
      ageCategory: z.string().min(4, 'Kelompok usia wajib dipilih!'),
      clubName: z.string().min(3, 'Nama klub lahir wajib diisi!'),
      competitionCategory: z
        .array(z.object({ name: z.string().min(1, 'Nomor lomba wajib dipilih!') }))
        .min(1, 'Nomor lomba wajib dipilih!'),
    })
  )
);

const competitionCategories = computed(() => {
  if (!initialValues.value.ageCategory) {
    return allCompetitionCategories.value;
  }

  const allowedCategories: string[] =
    competitionCategoriesByAge[
      initialValues.value.ageCategory as keyof typeof competitionCategoriesByAge
    ] || [];

  return allCompetitionCategories.value.filter((category) =>
    allowedCategories.includes(category.value)
  );
});

const onFormSubmit = ({ valid }: FormSubmitEvent) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    });
  }
};

function selectRegistrationType(value: EnumRegistrationType) {
  selectedRegType.value = value;
}

function onInputChange(e: Event) {
  addFiles((<HTMLInputElement>e.target).files!);
  (<HTMLInputElement>e.target).value = '';
  uploadFiles(files.value);
}
</script>

<template>
  <div class="flex flex-col gap-12">
    <h1 class="text-3xl font-bold text-gray-900">Registrasi Kejurkab</h1>
    <div class="flex flex-col gap-4 bg-white p-8 rounded-lg">
      <Toast />

      <Text
        as="h2"
        variant="header2"
        text="Data Peserta Lomba"
        subtitle="Daftarkan diri Anda untuk mengikuti Kejurkab"
      />

      <div class="flex gap-4 items-center">
        <Button @click="selectRegistrationType(EnumRegistrationType.Import)">Import Excel</Button>
        <span class="text-xl font-medium">atau</span>
        <Button @click="selectRegistrationType(EnumRegistrationType.Form)">Input Form</Button>
      </div>

      <Form
        v-if="selectedRegType === EnumRegistrationType.Form"
        v-slot="$form"
        :initialValues
        :resolver
        @submit="onFormSubmit"
      >
        <div class="grid grid-cols-2 gap-8 w-full py-10">
          <div class="flex flex-col gap-1">
            <FieldLayout label="Nama Peserta" required>
              <InputText id="name" name="name" type="text" fluid />
            </FieldLayout>
            <Message v-if="$form?.name?.invalid" severity="error" size="small" variant="simple">{{
              $form.name.error?.message
            }}</Message>
          </div>
          <div class="flex flex-col gap-1">
            <FieldLayout label="Nama Klub" required>
              <InputText id="clubName" name="clubName" type="text" fluid />
            </FieldLayout>
            <Message
              v-if="$form?.clubName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.clubName.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-1">
            <FieldLayout label="Tahun Lahir" required>
              <InputText id="birthYear" name="birthYear" type="number" fluid />
            </FieldLayout>
            <Message
              v-if="$form?.birthYear?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.birthYear.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-1">
            <FieldLayout label="Jenis Kelamin" required>
              <Select name="gender" :options="gender" option-label="label" option-value="value" />
            </FieldLayout>
            <Message v-if="$form?.gender?.invalid" severity="error" size="small" variant="simple">{{
              $form.gender.error?.message
            }}</Message>
          </div>
          <div class="flex flex-col gap-1">
            <FieldLayout label="Kelompok Usia" required>
              <Select
                v-model="initialValues.ageCategory"
                name="ageCategory"
                :options="ageCategories"
                option-label="label"
                option-value="value"
                :maxSelectedLabels="3"
                display="chip"
              />
            </FieldLayout>
            <Message
              v-if="$form?.ageCategory?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.ageCategory.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-1">
            <FieldLayout label="Nomor Lomba" required>
              <MultiSelect
                name="competitionCategory"
                :options="competitionCategories"
                option-label="label"
                :maxSelectedLabels="3"
                display="chip"
              />
            </FieldLayout>
            <Message
              v-if="$form?.competitionCategory?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.competitionCategory.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-1">
            <FieldLayout label="Best Time" required>
              <InputText id="bestTime" name="bestTime" type="number" fluid />
            </FieldLayout>
            <Message
              v-if="$form?.bestTime?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.bestTime.error?.message }}</Message
            >
          </div>
        </div>
        <div class="flex justify-end">
          <Button type="submit" severity="info" label="Simpan" />
        </div>
      </Form>

      <div v-if="selectedRegType === EnumRegistrationType.Import" class="flex flex-col gap-4">
        <DropZone
          class="drop-area"
          @files-dropped="addFiles"
          #default="{ dropZoneActive, isValidDrag }"
        >
          <label for="file-input" class="cursor-pointer block text-center">
            <span v-if="dropZoneActive && isValidDrag" class="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <polyline points="9 15 12 18 15 15"></polyline>
                <path d="M12 18L12 9"></path>
              </svg>
              <span class="text-lg font-medium text-green-600 mt-2">Drop Excel File Here</span>
              <span class="text-sm text-gray-500">to add it to the queue</span>
            </span>

            <span v-else-if="dropZoneActive && !isValidDrag" class="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <span class="text-lg font-medium text-red-500 mt-2">Only Excel Files Accepted</span>
              <span class="text-sm text-gray-500"
                >Please drop Excel files only (.xlsx, .xls, etc.)</span
              >
            </span>

            <span v-else class="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="8" y1="13" x2="16" y2="13"></line>
                <line x1="8" y1="17" x2="16" y2="17"></line>
              </svg>
              <span class="text-lg font-medium text-gray-700 mt-2">Drag Excel Files Here</span>
              <span class="text-sm text-gray-500">
                or <strong class="text-green-600">click here</strong> to select files
              </span>
              <span class="text-xs text-gray-400 mt-2"
                >Supported formats: .xlsx, .xls, .xlsm, .xlsb, .ods</span
              >
            </span>

            <input
              hidden
              type="file"
              id="file-input"
              @change="onInputChange"
              accept=".xlsx,.xls,.xlsm,.xlsb,.ods,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.oasis.opendocument.spreadsheet"
            />
          </label>
          <div v-show="files.length" class="mt-6">
            <h3 class="text-sm font-medium text-gray-700 mb-2">
              Files to Import ({{ files.length }})
            </h3>
            <div class="flex flex-wrap gap-4">
              <FilePreview
                v-for="file of files"
                :key="file.id"
                :file="file"
                tag="div"
                @remove="removeFile"
                class="flex-grow max-w-xs"
              />
            </div>
          </div>
        </DropZone>
        <Button type="submit" severity="info" label="Simpan" />
      </div>
    </div>
  </div>
</template>

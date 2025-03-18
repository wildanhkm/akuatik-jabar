<template>
  <div class="min-h-full min-w-screen flex flex-col justify-center items-center">
    <div
      class="w-1/3 bg-gray-100 dark:bg-gray-900 rounded shadow-gray-100 dark:shadow-none flex flex-col items-center justify-center gap-6 p-8"
    >
      <TextField type="h1" class="text-3xl font-bold">Login</TextField>
      <div class="card flex justify-center">
        <Form
          v-slot="$form"
          :resolver="resolver"
          :initialValues="initialValues"
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full sm:w-56"
        >
          <div class="flex flex-col gap-1">
            <InputText name="usernameOrEmail" type="text" placeholder="Username or Email" fluid />
            <Message
              v-if="$form?.usernameOrEmail?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.usernameOrEmail.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-1">
            <InputText name="password" type="password" placeholder="Password" fluid />
            <Message
              v-if="$form?.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.password.error?.message }}</Message
            >
          </div>
          <Button type="submit" severity="secondary" label="Submit" />
        </Form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TextField from '../components/TextField.vue';
import InputText from 'primevue/inputtext';
// @ts-ignore
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from 'primevue/usetoast';
// @ts-ignore
import { z } from 'zod';
import { Button, Message } from 'primevue';
import { Form } from '@primevue/forms';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const initialValues = ref({
  usernameOrEmail: '',
  password: '',
});

const resolver = ref(
  zodResolver(
    z.object({
      usernameOrEmail: z.string().min(1, { message: 'Username is required.' }),
      password: z
        .string()
        .min(10, { message: 'Password minimum contains 10 characters and is required.' }),
    })
  )
);

const onFormSubmit = ({ valid = false }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    router.push('/dashboard');
  }
};
</script>

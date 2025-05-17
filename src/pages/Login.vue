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
import Logo from '/images/logo_akuatik.jpg';

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

<template>
  <div class="min-h-screen min-w-screen flex flex-col justify-center items-center login-bg">
    <div class="bg-white rounded shadow-gray-100 dark:shadow-none p-20">
      <div class="flex flex-col gap-12 items-center">
        <TextField type="h2" class="text-2xl font-bold text-gray-900"
          >Portal Akuatik Cirebon</TextField
        >
        <TextField type="h1" class="text-3xl font-bold text-gray-900">Login</TextField>
        <div class="flex items-center justify-center gap-12">
          <img :src="Logo" alt="logo akuatik" class="w-full max-w-48" />
          <div class="card flex flex-col items-center gap-6 justify-center">
            <Form
              v-slot="$form"
              :resolver="resolver"
              :initialValues="initialValues"
              @submit="onFormSubmit"
              class="flex flex-col gap-4 w-full sm:w-56"
            >
              <div class="flex flex-col gap-1">
                <InputText
                  name="usernameOrEmail"
                  type="text"
                  placeholder="Username atau Email"
                  fluid
                />
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
              <Button type="submit" severity="info" label="Login" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import TextField from '../components/TextField.vue';
import InputText from 'primevue/inputtext';
// @ts-ignore
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from 'primevue/usetoast';
// @ts-ignore
import { z } from 'zod';
import { Button, Message, Toast } from 'primevue';
import { Form } from '@primevue/forms';
import { useRouter } from 'vue-router';
import Logo from '/images/logo_akuatik.jpg';
import makeApiCall from '../utils/axios';
import { type AxiosError } from 'axios';

const toast = useToast();
const router = useRouter();
const showPassword = ref(false);
const inputPasswordType = ref('password');
const initialValues = ref({
  emailOrUsername: '',
  password: '',
});

const resolver = ref(
  zodResolver(
    z.object({
      emailOrUsername: z.string().min(1, { message: 'Username atau email wajib diisi' }),
      password: z.string().min(10, { message: 'Password wajib diisi' }),
    })
  )
);

const onFormSubmit = async ({ valid = false }) => {
  if (valid) {
    try {
      const response = await makeApiCall.post('/auth/login', initialValues.value);
      const { data } = response;

      if (data?.data.token) {
        localStorage.setItem('token', data.data.token);
      }

      toast.add({ severity: 'success', summary: 'Login success.', life: 3000 });
      router.push('/dashboard');
    } catch (error) {
      // Type-safe error handling with proper AxiosError typing
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Login failed. Please try again.';
      toast.add({ severity: 'error', summary: errorMessage, life: 3000 });
    }
  }
};

watch(showPassword, (newValue) => {
  inputPasswordType.value = newValue ? 'text' : 'password';
});
</script>

<template>
  <div class="min-h-screen min-w-screen flex flex-col justify-center items-center login-bg">
    <Toast />
    <div class="bg-white rounded shadow-gray-100 dark:shadow-none p-20">
      <div class="flex flex-col gap-12 items-center">
        <TextField type="h1" class="text-3xl font-bold text-gray-900"
          >Login Portal Akuatik Cirebon</TextField
        >
        <div class="flex items-center justify-center gap-12">
          <img :src="Logo" alt="logo akuatik" class="w-full max-w-48" />
          <div class="card flex flex-col items-center gap-6 justify-center">
            <Form
              v-slot="$form"
              class="flex flex-col gap-4 w-full sm:w-56"
              :resolver
              :initial-values
              @submit="onFormSubmit"
            >
              <div class="flex flex-col gap-1">
                <InputText
                  v-model="initialValues.emailOrUsername"
                  name="emailOrUsername"
                  type="text"
                  placeholder="Username atau Email"
                  fluid
                />
                <Message
                  v-if="$form?.emailOrUsername?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.emailOrUsername.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col gap-1">
                <InputText
                  v-model="initialValues.password"
                  name="password"
                  :type="inputPasswordType"
                  placeholder="Password"
                  fluid
                />
                <Message
                  v-if="$form?.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.password.error?.message }}</Message
                >
              </div>
              <label for="showPassword" class="flex gap-2 items-center">
                <input
                  v-model="showPassword"
                  type="checkbox"
                  name="showPassword"
                  id="showPassword"
                />
                Tampilkan password
              </label>
              <Button type="submit" severity="info" label="Login" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

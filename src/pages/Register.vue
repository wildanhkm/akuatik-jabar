<template>
  <div class="min-h-full min-w-screen flex flex-col justify-center items-center">
    <div
      class="w-1/3 bg-gray-100 dark:bg-gray-900 rounded shadow-gray-100 dark:shadow-none flex flex-col items-center justify-center gap-6 p-8"
    >
      <TextField type="h1" class="text-3xl font-bold">Register</TextField>
      <div class="card flex justify-center">
        <Form
          v-slot="$form"
          :resolver="resolver"
          :initialValues="initialValues"
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full sm:w-56"
        >
          <div class="flex flex-col gap-1">
            <InputText name="username" type="text" placeholder="Username" fluid />
            <Message
              v-if="$form?.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.username.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-1">
            <InputText name="email" type="text" placeholder="Email" fluid />
            <Message v-if="$form?.email?.invalid" severity="error" size="small" variant="simple">{{
              $form.email.error?.message
            }}</Message>
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

const toast = useToast();
const initialValues = ref({
  username: '',
  email: '',
  password: '',
});

const resolver = ref(
  zodResolver(
    z.object({
      username: z.string().min(1, { message: 'Username is required.' }),
      email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
    })
  )
);

const onFormSubmit = ({ valid = false }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }
};
</script>
<style lang=""></style>

<script setup lang="ts">
import SectionDivider from '../components/SectionDivider.vue';
import Logo from '/images/logo_akuatik.jpg';
</script>

<template>
  <div class="min-h-[100dvh] mx-auto">
    <!-- Full width header with bg-white -->
    <header class="w-full bg-white">
      <!-- Contained content with max-w-6xl -->
      <div class="max-w-6xl mx-auto flex gap-4 items-center py-4">
        <router-link to="/public/kejurkab/register">
          <img :src="Logo" alt="logo akuatik" class="w-full max-w-24" />
        </router-link>
        <router-link class="text-xl text-gray-900" to="/public/kejurkab/register"
          >Registrasi Kejurkab</router-link
        >
        <router-link class="text-xl text-gray-900" to="/public/kejurkab/invoice"
          >Invoice</router-link
        >
        <router-link class="text-xl text-gray-900" to="/public/kejurkab/register-confirmation"
          >Konfirmasi Pendaftaran</router-link
        >
      </div>
    </header>

    <SectionDivider class="h-16" />

    <main class="max-w-6xl mx-auto text-gray-900">
      <router-view />
    </main>

    <SectionDivider class="h-16" />

    <footer class="w-full bg-white">
      <div class="max-w-6xl mx-auto text-gray-900 py-4">
        <div class="flex justify-center items-center">
          <img :src="Logo" alt="logo akuatik" class="w-full max-w-24" />
        </div>
      </div>
      <p class="bg-blue-600 text-white py-4 font-bold text-center">© 2025 Akuatik Cirebon</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

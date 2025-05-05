<template>
  <div class="min-h-[100dvh] mx-auto">
    <!-- Full width header with bg-white -->
    <header class="w-full bg-white">
      <!-- Contained content with max-w-6xl -->
      <div class="max-w-6xl mx-auto flex gap-4 items-center py-4">
        <router-link class="text-xl text-black font-bold" to="/public/kejurkab/register"
          >Kejurkab</router-link
        >
        <router-link class="text-xl text-black" to="/public/kejurkab/invoice">Invoice</router-link>
        <router-link class="text-xl text-black" to="/public/kejurkab/register-confirmation"
          >Konfirmasi Pendaftaran</router-link
        >
      </div>
    </header>

    <section class="h-8"></section>

    <main class="max-w-6xl mx-auto text-black min-h-screen">
      <router-view />
    </main>

    <section class="h-8"></section>

    <footer class="max-w-6xl mx-auto text-black">
      <p>© 2025 MyApp - Public Footer</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

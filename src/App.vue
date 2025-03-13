<!-- App.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
      :class="['transition-all duration-300 bg-gray-800 text-white', sidebarOpen ? 'w-64' : 'w-20']"
    >
      <div class="p-4 flex items-center justify-between">
        <h1 class="font-bold text-xl" v-show="sidebarOpen">Dashboard</h1>
        <button @click="toggleSidebar" class="p-2 rounded-md hover:bg-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <nav class="mt-5">
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :icon="route.meta.icon"
          :expanded="sidebarOpen"
          :title="route.name"
          :active="route.path === $route.path"
          :to="route.path"
        />
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navbar -->
      <header class="bg-white shadow-sm">
        <div class="px-4 py-3 flex items-center justify-between">
          <div class="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              class="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- User Menu Dropdown using Headless UI -->
          <Menu as="div" class="relative">
            <MenuButton class="flex items-center space-x-2 focus:outline-none">
              <img src="" alt="User" class="h-8 w-8 rounded-full" />
              <span v-if="sidebarOpen" class="text-sm font-medium">John Doe</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </MenuButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </header>

      <!-- Page Content - Router View -->
      <main class="flex-1 overflow-y-auto bg-gray-100 p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import SidebarItem from './components/SidebarItem.vue';

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    SidebarItem,
  },
  setup() {
    const router = useRouter();
    const routes = computed(() => router.options.routes);
    const sidebarOpen = ref(true);

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    return {
      routes,
      sidebarOpen,
      toggleSidebar,
    };
  },
};
</script>

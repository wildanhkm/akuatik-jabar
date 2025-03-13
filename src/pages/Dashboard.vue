<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Dashboard Overview</h2>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Total Users</p>
            <p class="text-2xl font-bold">2,453</p>
          </div>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-500 mr-4">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Revenue</p>
            <p class="text-2xl font-bold">$34,245</p>
          </div>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-orange-100 text-orange-500 mr-4">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Growth</p>
            <p class="text-2xl font-bold">15.3%</p>
          </div>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Tasks</p>
            <p class="text-2xl font-bold">27/45</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Activity -->
      <div class="lg:col-span-2">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div class="border-b pb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img src="" alt="User" class="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <p class="font-medium">Jane Cooper</p>
                    <p class="text-sm text-gray-500">Created a new project</p>
                  </div>
                </div>
                <span class="text-sm text-gray-500">2 hours ago</span>
              </div>
            </div>
            <div class="border-b pb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img src="" alt="User" class="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <p class="font-medium">Robert Fox</p>
                    <p class="text-sm text-gray-500">Completed task: Design System</p>
                  </div>
                </div>
                <span class="text-sm text-gray-500">5 hours ago</span>
              </div>
            </div>
            <div class="border-b pb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img src="" alt="User" class="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <p class="font-medium">Esther Howard</p>
                    <p class="text-sm text-gray-500">Added 3 new team members</p>
                  </div>
                </div>
                <span class="text-sm text-gray-500">1 day ago</span>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img src="" alt="User" class="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <p class="font-medium">Darlene Robertson</p>
                    <p class="text-sm text-gray-500">Published a new article</p>
                  </div>
                </div>
                <span class="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Tasks -->
      <div class="lg:col-span-1">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Upcoming Tasks</h3>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <input type="checkbox" class="h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
              </div>
              <div class="ml-3">
                <p class="font-medium">Design meeting</p>
                <p class="text-sm text-gray-500">Today, 2:30 PM</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <input type="checkbox" class="h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
              </div>
              <div class="ml-3">
                <p class="font-medium">Project review</p>
                <p class="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <input type="checkbox" class="h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
              </div>
              <div class="ml-3">
                <p class="font-medium">Release update</p>
                <p class="text-sm text-gray-500">Mar 10, 9:00 AM</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <input type="checkbox" class="h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
              </div>
              <div class="ml-3">
                <p class="font-medium">Quarterly planning</p>
                <p class="text-sm text-gray-500">Mar 15, 11:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

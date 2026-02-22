<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div class="max-w-2xl w-full text-center">
        
        <!-- Big 404 -->
        <h1 class="text-7xl md:text-9xl font-extrabold text-indigo-600 tracking-tight">
          404
        </h1>
  
        <!-- Message -->
        <h2 class="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>
  
        <p class="mt-3 text-gray-600 text-lg">
          Oops! The page you’re looking for doesn’t exist or has been moved.
          Don’t worry — let’s get you back on track.
        </p>
  
        <!-- Actions -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            :to="{name: 'home'}"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow hover:shadow-lg"
          >
            Go Home
          </RouterLink>
        </div>
  
        <!-- Decorative Line -->
        <div class="mt-12 flex justify-center">
          <span class="h-1 w-24 bg-indigo-600 rounded-full"></span>
        </div>
  
        <!-- Footer Text -->
        <p class="mt-6 text-sm text-gray-400">
          If you believe this is a mistake, please contact support.
        </p>
  
      </div>
    </div>
</template>
  
<script setup>
import { RouterLink } from 'vue-router'

</script>
  
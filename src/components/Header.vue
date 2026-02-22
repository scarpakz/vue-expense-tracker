<template>
  <div class="min-h-screen bg-gray-50 flex">
    <button 
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md text-gray-600 focus:outline-none border border-gray-200"
    >
      <i :class="['pi', isMobileMenuOpen ? 'pi-times' : 'pi-bars']" style="font-size: 1.25rem"></i>
    </button>

    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="h-full flex flex-col p-4">
        <div class="flex items-center gap-3 px-2 mb-10 text-emerald-400">
          <i class="pi pi-wallet text-2xl"></i>
          <span class="text-xl font-bold tracking-tight text-white">Vue Expense Tracker</span>
        </div>

        <nav class="flex-1 space-y-2">
          <a v-for="item in navItems" :key="item.name" href="#" 
             class="flex items-center gap-3 px-3 py-3 rounded-lg transition-all hover:bg-slate-800 text-slate-300 hover:text-white group">
            <i :class="['pi', item.icon, 'text-lg group-hover:text-emerald-400']"></i>
            <span class="font-medium text-sm">{{ item.name }}</span>
          </a>
        </nav>

        <div class="pt-4 mt-4 border-t border-slate-800">
          <div class="flex items-center gap-3 px-2">
            <div class="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900 text-xs">
              JJ
            </div>
            <div class="overflow-hidden">
              <p class="text-sm font-medium truncate">Jason Javier</p>
              <p class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Premium</p>
            </div>
            <i class="pi pi-sign-out ml-auto text-slate-500 hover:text-white cursor-pointer"></i>
          </div>
        </div>
      </div>
    </aside>

    <div 
      v-if="isMobileMenuOpen" 
      @click="isMobileMenuOpen = false" 
      class="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
    ></div>

    <main class="flex-1 p-6 lg:p-10">
       <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 class="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p class="text-slate-500 text-sm">Track your spending efficiency.</p>
          </div>
          <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <i class="pi pi-plus"></i>
            Add Expense
          </button>
       </header>

       <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <i class="pi pi-arrow-up-right text-xl"></i>
            </div>
            <div>
              <p class="text-xs text-slate-500 font-bold uppercase tracking-tight">Balance</p>
              <p class="text-xl font-bold text-slate-800">$12,450.00</p>
            </div>
          </div>
       </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const navItems = [
  { name: 'Dashboard', icon: 'pi-home' },
  { name: 'Transactions', icon: 'pi-list' },
  { name: 'Reports', icon: 'pi-chart-bar' },
  { name: 'Settings', icon: 'pi-cog' },
];
</script>
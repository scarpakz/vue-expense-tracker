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
          <RouterLink 
            v-for="item in navItems" 
            :key="item.name"
            :to="{ name: item.pathName }"
            class="flex items-center gap-3 px-3 py-3 rounded-lg transition-all hover:bg-slate-800 text-slate-300 hover:text-white group">
            <i :class="['pi', item.icon, 'text-lg group-hover:text-emerald-400']"></i>
            <span class="font-medium text-sm">{{ item.name }}</span>
          </RouterLink>
        </nav>

        <div class="pt-4 mt-4 border-t border-slate-800">
          <div class="flex items-center gap-3 px-2">
            <div class="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900 text-xs">
              {{initials}}
            </div>
            <div class="overflow-hidden">
              <p class="text-sm font-medium truncate">{{ props.user?.name }}</p>
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
    <RouterView />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from 'vue';
import { RouterView, RouterLink } from 'vue-router';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({ name: 'Anonymous' })
  }
})

const isMobileMenuOpen = ref(false);

const navItems = [
  { name: 'Dashboard', icon: 'pi-home', pathName: 'home' },
  { name: 'Transactions', icon: 'pi-list', pathName: 'transactions' },
  { name: 'Reports', icon: 'pi-chart-bar', pathName: 'reports' },
  { name: 'Settings', icon: 'pi-cog', pathName: 'settings' },
];

const initials = computed(() => {
  return props.user?.name?.split(' ').map(word => word[0]).join('')
})


</script>
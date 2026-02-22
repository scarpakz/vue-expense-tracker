<template>
  <main class="flex-1 p-6 lg:p-10">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p class="text-slate-500 text-sm">Track your spending efficiency.</p>
      </div>
      <button
        @click="setToggleDialog()"
        class="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
        <i class="pi pi-plus"></i>
        Add Expense
      </button>
    </header>
    <AddExpense 
      v-if="isOpen" 
      :is-open="isOpen"
      @prop-is-open="handlePropIsOpen"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
          <i class="pi pi-wallet text-xl"></i>
        </div>
        <div>
          <p class="text-xs text-slate-500 font-bold uppercase tracking-tight">Total Balance</p>
          <p class="text-xl font-bold text-slate-800">$12,450.00</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <i class="pi pi-arrow-down-left text-xl"></i>
        </div>
        <div>
          <p class="text-xs text-slate-500 font-bold uppercase tracking-tight">Monthly Income</p>
          <p class="text-xl font-bold text-slate-800">$4,200.00</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
          <i class="pi pi-arrow-up-right text-xl"></i>
        </div>
        <div>
          <p class="text-xs text-slate-500 font-bold uppercase tracking-tight">Monthly Expenses</p>
          <p class="text-xl font-bold text-slate-800">$1,840.00</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 class="font-bold text-slate-800">Recent Transactions</h2>
          <button class="text-sm text-emerald-600 font-semibold hover:underline">View All</button>
        </div>
        <div class="divide-y divide-slate-50">
          <div v-for="item in recentItems" :key="item.id"
            class="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-4">
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center text-lg', item.bg]">
                <i :class="['pi', item.icon]"></i>
              </div>
              <div>
                <p class="text-sm font-semibold text-slate-800">{{ item.label }}</p>
                <p class="text-xs text-slate-500">{{ item.date }}</p>
              </div>
            </div>
            <p :class="['font-bold text-sm', item.amount < 0 ? 'text-rose-600' : 'text-emerald-600']">
              {{ item.amount < 0 ? '-' : '+' }}${{ Math.abs(item.amount) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h2 class="font-bold text-slate-800 mb-6">Budget Overview</h2>
        <div class="space-y-6">
          <div v-for="cat in categories" :key="cat.name">
            <div class="flex justify-between text-xs font-bold mb-2">
              <span class="text-slate-600 uppercase">{{ cat.name }}</span>
              <span class="text-slate-400">{{ cat.percent }}%</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div :class="['h-full rounded-full', cat.color]" :style="{ width: cat.percent + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
          <p class="text-xs text-emerald-800 leading-relaxed">
            <i class="pi pi-info-circle mr-1"></i>
            You've spent **12% less** on dining out this week compared to last. Keep it up!
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import {ref} from 'vue';
import AddExpense from '@/components/AddExpense.vue'

const isOpen = ref(false)

const setToggleDialog = () => {
  isOpen.value === true ? isOpen.value = false : isOpen.value = true
}

const handlePropIsOpen = (nodeData) => {
  isOpen.value = nodeData
}

const recentItems = [
  { id: 1, label: 'Adobe Subscription', date: '2 hours ago', icon: 'pi-desktop', amount: -52.00, bg: 'bg-orange-100 text-orange-600' },
  { id: 2, label: 'Apple Store', date: 'Yesterday', icon: 'pi-apple', amount: -129.00, bg: 'bg-slate-100 text-slate-800' },
  { id: 3, label: 'Freelance Payout', date: 'Feb 20', icon: 'pi-money-bill', amount: 850.00, bg: 'bg-emerald-100 text-emerald-600' },
  { id: 4, label: 'Gas Station', date: 'Feb 19', icon: 'pi-car', amount: -45.00, bg: 'bg-blue-100 text-blue-600' },
];

const categories = [
  { name: 'Food & Drinks', percent: 65, color: 'bg-orange-500' },
  { name: 'Entertainment', percent: 40, color: 'bg-purple-500' },
  { name: 'Shopping', percent: 15, color: 'bg-blue-500' },
  { name: 'Transport', percent: 85, color: 'bg-emerald-500' },
];
</script>
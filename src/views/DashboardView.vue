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
          <p class="text-xl font-bold text-slate-800">${{ s_user.getUser.monthlyIncome.toLocaleString() }}</p>
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
      <RecentTransactions :user-transactions="transactions"/>
      <BudgetOverview :user-transactions="transactions"/>
    </div>
  </main>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';

import AddExpense from '@/components/AddExpense.vue'
import RecentTransactions from '@/components/RecentTransactions.vue'
import BudgetOverview from '@/components/BudgetOverview.vue'

import { useTransactionStore } from '@/stores/transaction';
import { useUserStore } from '@/stores/user';

const isOpen = ref(false)

const s_transaction = useTransactionStore()
const s_user = useUserStore()
const transactions = ref([])

const setToggleDialog = () => {
  isOpen.value === true ? isOpen.value = false : isOpen.value = true
}

const handlePropIsOpen = (nodeData) => {
  isOpen.value = nodeData
}

const getTransactions = async () => {
  transactions.value = await s_transaction.getUserTransactions
}

onMounted(async () => {
  await s_transaction.setUserTransactionData(s_user.getUser.id)
  await getTransactions()
})
</script>
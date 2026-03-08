<template>
    <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 class="font-bold text-slate-800">Recent Transactions</h2>
          <button class="text-sm text-emerald-600 font-semibold hover:underline">View All</button>
        </div>
        <div class="divide-y divide-slate-50">
          <div v-for="item in userTransactions" :key="item.id"
            class="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-4">
              <img :class="['w-10 h-10 rounded-lg flex items-center justify-center text-lg']" :src="item.bgImage" />
              <div>
                <p class="text-sm font-semibold text-slate-800">{{ item.categoryName }}</p>
                <p class="text-xs text-slate-500">{{ useDateFormatter(item.date) }}</p>
              </div>
            </div>
            <p :class="['font-bold text-sm', item.type === 'Expense' ? 'text-rose-600' : 'text-emerald-600']">
              {{ item.type === 'Expense' ? '-' : '+' }}${{ Math.abs(item.amount) }}
            </p>
          </div>
        </div>
    </div>    
</template>
<script setup>
import { useDateFormatter } from '@/composable/dateFormatter';
defineProps({
    userTransactions: {
        type: Array,
        default: []
    }
})
</script>
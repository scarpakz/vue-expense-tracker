<template>
    <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" v-if="!isLoading">
        <div class="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 class="font-bold text-slate-800">Recent Transactions</h2>
          <RouterLink :to="{ name: 'transactions' }" class="text-sm text-emerald-600 font-semibold hover:underline">View All</RouterLink>
        </div>
        <div class="divide-y divide-slate-50">
          <div v-for="item in latestTransactions" :key="item.id"
            class="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-4">
              <img :class="['w-10 h-10 rounded-lg flex items-center justify-center text-lg']" :src="item.bgImage" />
              <div>
                <p class="text-sm font-semibold text-slate-800">{{ item.categoryName + " - " + item.description  }}</p>
                <p class="text-xs text-slate-500">{{ useDateFormatter(item.date) }}</p>
              </div>
            </div>
            <p :class="['font-bold text-sm', item.type === 'Expense' ? 'text-rose-600' : 'text-emerald-600']">
              {{ item.type === 'Expense' ? '-' : '+' }}${{ Math.abs(item.amount)?.toLocaleString() }}
            </p>
          </div>
        </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useDateFormatter } from '@/composable/dateFormatter'
import Spinner from './Spinner.vue'

const props = defineProps({
    userTransactions: {
        type: Array,
        default: () => []
    }
})

let isLoading = ref(true)

const latestTransactions = computed(() => {
    return [...props.userTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
})

watch(latestTransactions, () => {
  if (props.userTransactions.length > 0) {
    isLoading.value = false
  } else {
    isLoading.value = true
  }
})
</script>
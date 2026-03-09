<template>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm" v-if="!isLoading">
        <h2 class="font-bold text-slate-800 mb-6">Budget Overview</h2>
        <div class="space-y-6">
          <div v-for="item in getTransactions" :key="item.id">
            <div class="flex justify-between text-xs font-bold mb-2">
              <span class="text-slate-600 uppercase">{{ item.categoryName }}</span>
              <span class="text-slate-400">{{ item.percentage }}%</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div :class="['h-full rounded-full', item.color]" :style="{ width: item.percentage + '%' }"></div>
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
    <div v-else>
        <p>Loading data...</p>
    </div>
</template>
<script setup>
import { onMounted,ref, watch, computed } from 'vue'

const props = defineProps({
    userTransactions: {
        type: Array,
        default: () => []
    }
})
const isLoading = ref(true)
const newTransactionData = ref([])

const getTransactions = computed(() => {
    return newTransactionData.value
})

const handleTransactionUpdate = (data) => {
    if (data && data.length > 0) {
        isLoading.value = false

        const tailwindColors = [
            'bg-orange-500', 'bg-purple-500', 'bg-blue-500', 
            'bg-emerald-500', 'bg-pink-500', 'bg-indigo-500', 
            'bg-cyan-500', 'bg-rose-500', 'bg-amber-500'
        ]

        const filterExpenseType = data.filter(item => item.type === 'Expense').map(num => num.amount)
        const sum = filterExpenseType.reduce(sumUpExpenses, 0)
        const addCalculatedPercentage = data.filter(item => item.type === 'Expense').map((transaction, index) => {
            return {
                ...transaction,
                percentage: Number(((transaction.amount / sum) * 100).toFixed(2)),
                color: tailwindColors[index % tailwindColors.length]
            }
        })
        newTransactionData.value = addCalculatedPercentage
    }
}

const sumUpExpenses = (newTotal, num) => {
    return newTotal + num
}

watch(() => props.userTransactions, 
    (newValue) => {
        handleTransactionUpdate(newValue)
    },
{immediate: true, deep: true})
</script>
<template>
    <main class="flex-1 p-6 lg:p-10">
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 class="text-2xl font-bold text-slate-800">Transactions</h1>
                <p class="text-slate-500 text-sm">Track your spending efficiency.</p>
            </div>
            <div class="flex gap-2">
                <button class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
                    <i class="pi pi-download"></i>
                    Export
                </button>
                <button class="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200">
                    <i class="pi pi-plus"></i>
                    New Entry
                </button>
            </div>
        </header>
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
                <div class="relative w-full sm:w-64">
                    <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input 
                    type="text" 
                    placeholder="Search transactions..." 
                    class="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                </div>
                <select class="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option>All Categories</option>
                    <option>Food & Drinks</option>
                    <option>Shopping</option>
                    <option>Housing</option>
                </select>
            </div>
    
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                            <th class="px-6 py-4">Date</th>
                            <th class="px-6 py-4">Label</th>
                            <th class="px-6 py-4">Category</th>
                            <th class="px-6 py-4 text-right">Amount</th>
                            <th class="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-for="tx in getUserTransactions" :key="tx.id" class="hover:bg-slate-50 transition-colors group">
                            <td class="px-6 py-4 text-sm text-slate-500">{{ useDateFormatter(tx.date) }}</td>
                            <td class="px-6 py-4">
                                <div class="font-medium text-slate-800 text-sm">{{ tx.description }}</div>
                                <div class="text-xs text-slate-400 sm:hidden">{{ tx.categoryName }}</div>
                            </td>
                            <td class="px-6 py-4 hidden sm:table-cell">
                                <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold uppercase">
                                    {{ tx.categoryName }}
                                </span>
                            </td>
                            <td :class="['px-6 py-4 text-sm font-bold text-right', tx.type === 'Expense' ? 'text-rose-600' : 'text-emerald-600']">
                                {{ tx.type === 'Expense' ? '-' : '+' }}${{ Math.abs(tx.amount).toFixed(2) }}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button class="text-slate-400 hover:text-slate-600 transition-colors">
                                    <i class="pi pi-ellipsis-v"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    
            <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                <span>Showing 1 to 5 of 24 results</span>
                <div class="flex gap-2">
                    <button class="p-2 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>
                        <i class="pi pi-chevron-left text-xs"></i>
                    </button>
                    <button class="p-2 border border-slate-200 rounded hover:bg-slate-50">
                        <i class="pi pi-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTransactionStore } from '@/stores/transaction.js'
import { useUserStore } from '@/stores/user';
import { useDateFormatter } from '@/composable/dateFormatter.js'

const s_transaction = useTransactionStore()
const s_user = useUserStore()

let transactions = ref([])

const processTransactionData = async () => {
    const userData = await s_transaction.getUserTransactions

    const categoryMap = {}
    userData.userCategories.forEach(cat_item => {
        categoryMap[cat_item.id] = cat_item.name
    })

    const filterDataTransaction = userData.userTransactions.map(transaction => {
        return {
            ...transaction,
            categoryName: categoryMap[transaction.categoryId] || 'Not Assigned'
        }
    })
    
    transactions.value = filterDataTransaction
}

const getUserTransactions = computed(() => {
    return transactions.value
})

onMounted(async () => {
    await s_transaction.setUserTransactionData(s_user.getUser.id)
    await processTransactionData()
})

</script>
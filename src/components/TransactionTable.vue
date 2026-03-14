<template>
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
            <select v-model="selectedCategory" class="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                <option v-for="cat in getCategories" :value="cat" :key="cat">{{ cat }}</option>
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
                    <tr v-for="tx in props.userTransactions" :key="tx.id" class="hover:bg-slate-50 transition-colors group">
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
</template>
<script setup>
import { useDateFormatter } from '@/composable/dateFormatter.js'
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    userTransactions: {
        type: Array,
        default: []
    }
})

const selectedCategory = ref('')

const getCategories = computed(() => {
    let filterPropByCategory = props.userTransactions.map(item => item.categoryName)
    filterPropByCategory.push('All Categories')
    // Remove duplicates
    const temp = [...new Set(filterPropByCategory)]
    return temp
})

const setDefaultCategory = () => {
    selectedCategory.value = 'All Categories'
}

onMounted(()=> {
    setDefaultCategory()
})
</script>
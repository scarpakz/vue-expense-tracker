<template>
    <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div class="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
            <div class="relative w-full sm:w-64">
                <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                v-model="textSearch" 
                type="text" 
                placeholder="Search transactions..." 
                class="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
            </div>
            <select v-model="selectedCategory" class="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                <option v-for="cat in getCategories" :value="cat" :key="cat">{{ cat }}</option>
            </select>
        </div>
        <div class="overflow-x-auto" v-if="getTransactions.length">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                        <th class="px-6 py-4">Date</th>
                        <th class="px-6 py-4">Description</th>
                        <th class="px-6 py-4">Category</th>
                        <th class="px-6 py-4 text-right">Amount</th>
                        <th class="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="tx in getTransactions" :key="tx.id" class="hover:bg-slate-50 transition-colors group">
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
                        <td class="px-6 py-4 text-right relative">
                            <div 
                            class="options-group z-90 flex justify-center bg-white rounded"
                            v-show="isVisible(tx.id)"
                            >
                                <button class="cursor-pointer text-sm text-blue-500 hover:underline p-2">Edit</button>
                                <button 
                                type="button"
                                class="cursor-pointer text-sm text-red-700 hover:underline p-2"
                                @click.prevent="confirmDeletion(tx, $event)"
                                >Delete</button>
                            </div>
                            <button 
                            class="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                            @click.stop="toggleOption(tx.id)"
                            >
                                <i class="pi pi-ellipsis-v"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center p-4" v-else>
            <Spinner />
        </div>
        <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Showing {{ tableResults.min }} to {{ tableResults.max }} of {{ tableResults.length }} results</span>
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
<style scoped>
.options-group {
    position: absolute;
    top: -20px;
    left: -40px;
    box-shadow: 2px 2px 4px #cbcbcb;
}
</style>
<script setup>
import { useDateFormatter } from '@/composable/dateFormatter.js'
import { ref, computed, onMounted, watchEffect, onUnmounted } from 'vue'
import { API_DELETE_DETAIL_TRANSACTION } from '@/api/api.js'
import { useToast } from 'vue-toastification'

import Spinner from '@/components/Spinner.vue'

const props = defineProps({
    userTransactions: {
        type: Array,
        default: []
    }
})
const toast = useToast()

const selectedCategory = ref('')
const transactions = ref([])
const textSearch = ref('')
const tableResults = ref({
    min: 1,
    max: 5,
    length: 24
})
const visibleIds = ref([])

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

const getTransactions = computed(() => {
    return transactions.value
})

const setTransactionByCategory = () => {
    transactions.value = props.userTransactions.filter((item) => {
        if (selectedCategory.value === 'All Categories') {
            return item
        }
        return item.categoryName === selectedCategory.value
    })
}

// TODO: add delete function
// Fix Results table
const filterBySearch = () => {
    transactions.value = transactions.value.filter((item) => {
        return item.description.toLowerCase().includes(textSearch.value.toLowerCase())
    })
    tableResults.value.length = transactions.value.length
}

const isVisible = (id) => {
    return visibleIds.value.includes(id)
}

const toggleOption = (id) => {
    const hasId = visibleIds.value.includes(id)
    if (hasId) {
        visibleIds.value = [...new Set(
            visibleIds.value.filter(item => item !== id)
        )]
    } else {
        visibleIds.value.push(id)
    }
}

const confirmDeletion = (obj, e) => {
    e.preventDefault()
    const isConfirmed = confirm(`Do you wish to delete ${obj.description}?`)
    toggleOption(obj.id)
    if (!isConfirmed) return
    deleteTransaction(obj, e)
}

const deleteTransaction = async (obj, e) => {
    const response = await API_DELETE_DETAIL_TRANSACTION(obj)
    if (response) {
        toast.success('Sucessfully Deleted!')
        e.preventDefault()
    }
}

const closeAllMenus = (e) => {
    if (!e.target.closest('.options-group') && !e.target.closest('.pi-ellipsis-v')) {
        visibleIds.value = []
    }
}

watchEffect(() => {
    setTransactionByCategory()
    filterBySearch()
})

onMounted(()=> {
    setDefaultCategory()
    window.addEventListener('click', closeAllMenus)
})
onUnmounted(() => {
    window.removeEventListener('click', closeAllMenus)
})
</script>
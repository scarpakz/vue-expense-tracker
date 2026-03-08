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
        <TransactionTable :user-transactions="transactions"/>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTransactionStore } from '@/stores/transaction.js'
import { useUserStore } from '@/stores/user';

// Components
import TransactionTable from '@/components/TransactionTable.vue'

const s_transaction = useTransactionStore()
const s_user = useUserStore()
let transactions = ref([])

const processData = () => {
    transactions.value = s_transaction.getUserTransactions
}

onMounted(async () => {
    await s_transaction.setUserTransactionData(s_user.getUser.id)
    processData()
})

</script>
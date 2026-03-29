<template>
    <main class="flex-1 p-6 lg:p-10">
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 class="text-2xl font-bold text-slate-800">Transactions</h1>
                <p class="text-slate-500 text-sm">Track your spending efficiency.</p>
            </div>
            <div class="flex gap-2">
                <button 
                    @click="exportToPDF"
                    class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
                    <i class="pi pi-download"></i>
                    Export
                </button>
                <button
                    @click="setToggleDialog()"
                    class="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                    <i class="pi pi-plus"></i>
                    Add Expense
                </button>
                <AddExpense 
                    v-if="isOpen" 
                    :is-open="isOpen"
                    @prop-is-open="handlePropIsOpen"
                />
            </div>
        </header>
        <TransactionTable :user-transactions="transactions"/>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTransactionStore } from '@/stores/transaction.js'
import { useUserStore } from '@/stores/user';
import AddExpense from '@/components/AddExpense.vue';

// Components
import TransactionTable from '@/components/TransactionTable.vue'

//PDF
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useDateFormatter } from '@/composable/dateFormatter'; // Use your existing formatter

const s_transaction = useTransactionStore()
const s_user = useUserStore()
let transactions = ref([])
const isOpen = ref(false)

const processData = () => {
    transactions.value = s_transaction.getUserTransactions
}

const setToggleDialog = () => {
  isOpen.value === true ? isOpen.value = false : isOpen.value = true
}

const handlePropIsOpen = (nodeData) => {
  isOpen.value = nodeData
}

const exportToPDF = () => {
    const doc = new jsPDF();
    
    // 1. Add Title/Header
    doc.setFontSize(18);
    doc.text("Transaction Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // 2. Prepare Table Data
    const tableColumn = ["Date", "Category", "Description", "Type", "Amount"];
    const tableRows = transactions.value.map(item => [
        useDateFormatter(item.date),
        item.categoryName,
        item.description,
        item.type,
        `${item.type === 'Expense' ? '-' : '+'}$${Math.abs(item.amount)}`
    ]);

    // 3. Generate Table
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: 'striped',
        headStyles: { fillColor: [16, 185, 129] }, // Emerald-600 to match your UI
    });

    // 4. Open in New Tab (View Mode)
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
}

onMounted(async () => {
    await s_transaction.setUserTransactionData(s_user.getUser.id)
    processData()
})

</script>
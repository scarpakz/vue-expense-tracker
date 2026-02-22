<template>
    <main class="flex-1 p-6 lg:p-10">
       <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 class="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p class="text-slate-500 text-sm">Track your spending efficiency.</p>
          </div>
          <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <i class="pi pi-plus"></i>
            Add Expense
          </button>
       </header>

       <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <i class="pi pi-arrow-up-right text-xl"></i>
            </div>
            <div>
              <p class="text-xs text-slate-500 font-bold uppercase tracking-tight">Balance</p>
              <p class="text-xl font-bold text-slate-800">$12,450.00</p>
            </div>
          </div>
       </div>
    </main> 
</template>
<script setup>
</script>
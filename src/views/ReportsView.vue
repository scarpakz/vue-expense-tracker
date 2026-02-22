<template>
    <main class="flex-1 p-6 lg:p-10 bg-slate-50 min-h-screen">
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Financial Reports</h1>
                <p class="text-slate-500 text-sm font-medium">Detailed analysis of your income and outflow.</p>
            </div>

            <div class="flex items-center gap-3">
                <div class="relative">
                    <select
                        class="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer">
                        <option>Last 30 Days</option>
                        <option>Last 6 Months</option>
                        <option>Year to Date</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <i class="pi pi-chevron-down text-[10px]"></i>
                    </div>
                </div>
                <button
                    class="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                    <i class="pi pi-print"></i>
                </button>
            </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="font-bold text-slate-800">Monthly Spending Trend</h2>
                        <p class="text-xs text-slate-400 font-medium">Average $2,100 per month</p>
                    </div>
                    <div class="flex gap-2">
                        <span class="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Current
                        </span>
                    </div>
                </div>

                <div class="h-64 flex items-end justify-between gap-2 px-2">
                    <div v-for="(bar, i) in chartBars" :key="i" class="relative group flex-1">
                        <div :style="{ height: bar + '%' }"
                            class="bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-t-md transition-all duration-300 relative">
                            <div class="absolute top-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-md"></div>
                        </div>
                        <span
                            class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase">{{
                        months[i] }}</span>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 class="font-bold text-slate-800 mb-6">Expense Allocation</h2>

                <div class="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">
                    <svg class="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="70" stroke="currentColor" stroke-width="12" fill="transparent"
                            class="text-slate-100" />
                        <circle cx="80" cy="80" r="70" stroke="currentColor" stroke-width="12" fill="transparent"
                            stroke-dasharray="440" stroke-dashoffset="110" class="text-emerald-500" />
                    </svg>
                    <div class="absolute text-center">
                        <p class="text-2xl font-bold text-slate-800">75%</p>
                        <p class="text-[10px] font-bold text-slate-400 uppercase">Used</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <div v-for="cat in allocation" :key="cat.name" class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div :class="['w-2 h-2 rounded-full', cat.color]"></div>
                            <span class="text-sm font-medium text-slate-600">{{ cat.name }}</span>
                        </div>
                        <span class="text-sm font-bold text-slate-800">${{ cat.value }}</span>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div v-for="card in insightCards" :key="card.title"
                    class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors cursor-default">
                    <div class="flex items-center justify-between mb-3">
                        <div :class="['p-2 rounded-lg', card.bg]">
                            <i :class="['pi', card.icon, card.text]"></i>
                        </div>
                        <span
                            :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', card.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600']">
                            {{ card.trend }}
                        </span>
                    </div>
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ card.title }}</p>
                    <p class="text-xl font-bold text-slate-800 mt-1">{{ card.value }}</p>
                </div>
            </div>
        </div>
    </main>
</template>
  
<script setup>
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const chartBars = [40, 65, 50, 85, 70, 90, 60, 75];

const allocation = [
    { name: 'Housing', value: '1,200', color: 'bg-indigo-500' },
    { name: 'Food & Groceries', value: '540', color: 'bg-emerald-500' },
    { name: 'Transportation', value: '210', color: 'bg-amber-500' },
    { name: 'Entertainment', value: '150', color: 'bg-rose-500' },
];

const insightCards = [
    { title: 'Daily Average', value: '$68.50', icon: 'pi-calendar', trend: '+2%', trendUp: false, bg: 'bg-blue-50', text: 'text-blue-600' },
    { title: 'Highest Day', value: '$240.00', icon: 'pi-bolt', trend: 'Friday', trendUp: true, bg: 'bg-amber-50', text: 'text-amber-600' },
    { title: 'Savings Rate', value: '24%', icon: 'pi-percentage', trend: '+5%', trendUp: true, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { title: 'Projected Spend', value: '$2,450', icon: 'pi-chart-line', trend: '-8%', trendUp: true, bg: 'bg-purple-50', text: 'text-purple-600' },
];
</script>
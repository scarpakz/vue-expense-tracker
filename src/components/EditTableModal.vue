<template>
    <div class="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 id="modalTitle" class="text-xl font-bold text-gray-900 sm:text-2xl">Edit Transaction</h2>
            <div class="mt-4">
                <div class="text-pretty text-gray-700">
                    <form @submit.prevent="handleSubmit" method="post" class="space-y-6 max-w-lg mx-auto p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-slate-700">Amount</label>
                            <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-slate-500 sm:text-sm">$</span>
                            </div>
                            <input
                                v-model="form.amount"
                                class="border p-2 block w-full pl-7 pr-12 sm:text-sm border-slate-200 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="0.00"
                            />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-slate-700">Description</label>
                            <input
                            v-model="form.description"
                            class="border p-2 block w-full sm:text-sm border-slate-200 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="e.g., Grocery Shopping"
                            />
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="space-y-2">
                            <label class="block text-sm font-medium text-slate-700">Date</label>
                            <input
                                type="date"
                                v-model="form.date"
                                class="border p-2 block w-full sm:text-sm border-slate-200 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-slate-500"
                            />
                            </div>

                            <div class="space-y-2">
                            <label class="block text-sm font-medium text-slate-700">Type</label>
                            <select v-model="form.type"class="border p-2 block w-full sm:text-sm border-slate-200 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-slate-700">Category</label>
                            <input v-model="form.categoryName" class="border p-2 block w-full sm:text-sm border-slate-200 rounded-md focus:ring-emerald-500 focus:border-emerald-500" />
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-slate-700">Background Image URL</label>
                            <input
                            v-model="form.bgImage"
                            class="border p-2 block w-full sm:text-sm border-slate-200 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-xs text-slate-500"
                            />
                        </div>

                        <div class="pt-4 flex justify-center gap-3">
                            <button type="submit" v-if="!isLoading" class="cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                            Save Transaction
                            </button>
                            <Spinner v-else />
                        </div>
                    </form>
                </div>
            </div>
            <footer class="mt-6 flex justify-end gap-2">
                <button @click="handleConfirm(true)" type="button" class="cursor-pointer rounded bg-red-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800">
                    Cancel
                </button>
            </footer>
        </div>
    </div>
</template>
<script setup>
import {ref, computed, toRefs, reactive, watch, defineEmits} from 'vue'
import { useDateInputFormatter, useDateToISO } from '@/composable/dateFormatter';
import Spinner from './Spinner.vue';
import { API_UPDATE_DETAIL_TRANSACTION } from '@/api/api'
import { useToast } from 'vue-toastification';

const emit = defineEmits(['closeModal'])
const toast = useToast()
const props = defineProps({
    data: {type: Object}
})

let form = reactive({})
const isLoading = ref(false)

watch(() => props.data, (newVal) =>  {
    if (newVal) {
        Object.assign(form, {
            ...newVal,
            date: useDateInputFormatter(newVal.date)
        })
    }
})

const handleConfirm = (isConfirmed) => {
    if (isConfirmed) {
        emit('closeModal')
    }
    return
}

const handleSubmit = async () => {
    let convDate = useDateToISO(form.date)
    const data = {...form, date: convDate}
    try {
        isLoading.value = true
        const response = await API_UPDATE_DETAIL_TRANSACTION(data)
        if (response) {
            emit('closeModal')
            toast.success('Updated Successfully!', {
                timeout: 2000
            })
        }
    } catch(e) { toast.error(e) }
    finally {
        isLoading.value = false
    }
}
</script>
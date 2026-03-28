<template>
    <div v-if="isOpen" class="p-6">
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div
                class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">

                <div class="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 class="text-xl font-bold text-gray-800">Add New Entry</h3>
                    <button @click="emitToggle()" class="cursor-pointer text-gray-400 hover:text-gray-600">
                        <i class="pi pi-times"></i>
                    </button>
                </div>

                <form @submit.prevent="handleSubmit" class="p-5 space-y-4">

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <div class="relative">
                            <span class="absolute left-3 top-2.5 text-gray-400">$</span>
                            <input v-model="form.amount" type="number" step="0.01" placeholder="0.00"
                                class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                required />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input v-model="form.description" type="text" placeholder="What did you buy?"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select v-model="form.categoryId"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option v-for="i in getCategories" :key="i" :value="i.categoryId">{{ i.categoryName }}</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input v-model="form.date" type="date"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Background Image(Optional)</label>
                        <div class="relative">
                            <input v-model="form.bgImage" type="link"
                                class="w-full pl-2 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                        </div>
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="button" @click="emitToggle()"
                            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button type="submit"
                            class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                            Save Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { 
    ref, 
    reactive,
    computed,
} from 'vue';
import { useTransactionStore } from '@/stores/transaction';
import { useToast } from 'vue-toastification';
import { API_ADD_EXPENSE } from '@/api/api'
import { useUserStore } from '@/stores/user'

defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['prop-is-open'])
const t_store = useTransactionStore()
const toast = useToast()
const u_store = useUserStore()

const emitToggle = () => {
    const isOpen = false
    emit('prop-is-open',isOpen)
}

const form = reactive({
    amount: 0,
    description: '',
    categoryId: '',
    bgImage: '',
    type: 'Expense',
    date: new Date().toISOString().substr(0, 10) // Defaults to today
});

const getCategories = computed(() => {
    let filterPropByCategory = t_store.getUserTransactions
    .filter(item => item.type === 'Expense' )
    .map(item => {
        return {
            categoryId: item.categoryId,
            categoryName: item.categoryName
        }
    })
    // Remove duplicates
    const temp = [
        ...new Map(filterPropByCategory.map(item => [item.categoryId, item])).values()
    ]
    if (temp.length > 0) {
        form.categoryId = temp[0].categoryId
    }
    return temp
})

const handleSubmit = async () => {
    try {
        const response = await API_ADD_EXPENSE(form, u_store.getUser.id)
        if (!response) return
        toast.success('Successfully added!')
    } catch (e) {console.log(e)
    } finally {
        emitToggle()
        // Reset form
        form.amount = 0,
        form.description = '',
        form.bgImage = '',
        form.date = new Date().toISOString().substr(0, 10)
    }
}
</script>
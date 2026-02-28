import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import axios from "axios";
import { config } from "@/config/config";

export const useTransactionStore = defineStore('transaction', () => {
    let userTransactions = reactive([])

    const getUserTransactions = computed(() => {
        return userTransactions
    })

    const setUserTransactionData = async (userId) => {
        try {
            const transactionsData = await axios.get(`${config.appBackend}/transactions`)
            if(transactionsData) {
                const filterUserTransactions = transactionsData.data.filter(item => item.userId === userId)
                userTransactions = filterUserTransactions
            }
        } catch(e) {
            console.error(e)
        }
    }

    return {
        getUserTransactions,
        setUserTransactionData
    }
})
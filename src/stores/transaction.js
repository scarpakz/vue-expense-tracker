import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import axios from "axios";
import { config } from "@/config/config";

export const useTransactionStore = defineStore('transaction', () => {
    let data = reactive({
        userTransactions: [],
        userCategories: [],
        userSubscriptions: []
    })

    const getUserTransactions = computed(() => {
        return data
    })

    const setUserTransactionData = async (userId) => {
        try {
            const transactionsData = await axios.get(`${config.appBackend}/transactions`)
            const categoryData = await axios.get(`${config.appBackend}/categories`)
            const subscriptionData = await axios.get(`${config.appBackend}/subscriptions`)

            if(transactionsData) {
                const filterUserTransactions = transactionsData.data.filter(item => item.userId === userId)
                const filterUserCategory = categoryData.data.filter(item => item.userId === userId)
                const filterUserSubscription = subscriptionData.data.filter(item => item.userId === userId)

                data.userTransactions = filterUserTransactions
                data.userCategories = filterUserCategory
                data.userSubscriptions = filterUserSubscription
            }
        } catch(e) {
            console.error(e)
        } finally {
            console.log(data)
        }
    }

    return {
        getUserTransactions,
        setUserTransactionData
    }
})
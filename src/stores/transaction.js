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

    let userData = ref([])

    const getUserTransactions = computed(() => {
        return userData.value
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
            setCombineTransactionAndCategory()
        }
    }

    const setCombineTransactionAndCategory = async () => {
        try {
            const categoryMap = {}
            data.userCategories.forEach(cat_item => {
                categoryMap[cat_item.id] = {
                    name: cat_item.name,
                    image: cat_item.bgImage
                }
            })
            const filterDataTransaction = data.userTransactions.map(transaction => {
                const catData = categoryMap[transaction.categoryId]
                return {
                    ...transaction,
                    categoryName: catData ? catData.name : 'Not Assigned',
                    bgImage: catData ? catData.image : ''
                }
            })
            userData.value = filterDataTransaction
        } catch(e) {
            console.log(e)
        }
    }

    return {
        getUserTransactions,
        setUserTransactionData
    }
})
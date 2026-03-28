import axios from 'axios'
import {config} from '@/config/config.js'
import { RANDOM_ID } from '@/composable/randomIdGenerator'

/**
 * Delete single transaction
 */
export const API_DELETE_DETAIL_TRANSACTION = async (obj) => {
    try {
        const response = await axios.delete(`${config.appBackend}/transactions/${obj.id}`)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

/**
 * Update single transaction
 */
export const API_UPDATE_DETAIL_TRANSACTION = async (obj) => {
    try {
        const response = await axios.put(`${config.appBackend}/transactions/${obj.id}`, obj)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

/**
 * Add Expense Transaction
 */
export const API_ADD_EXPENSE = async (obj, userSessionId) => {
    try {
        let data = {
            userId: userSessionId,
            id: RANDOM_ID(),
            ...obj
        }
        const accounts = await axios.get(`${config.appBackend}/accounts/`)
        if (!accounts) return

        let filterAccounts = accounts.data.filter(item => item.userId === userSessionId)
        Object.assign(data, { accountId: filterAccounts[0].id })

        const response = await axios.post(`${config.appBackend}/transactions/`, data)
        if (!response) return

        // Deduct the expense
        const deductResponse = await API_DEDUCT_EXPENSE(filterAccounts[0].id, data.amount)
        if (!deductResponse) return

        return response.data
    } catch (e) {
        console.log(e)
    }
}

/**
 * API_DEDUCT_EXPENSE
 */
export const API_DEDUCT_EXPENSE = async (accId, expense) => {
    try {
        const getAccount = await axios.get(`${config.appBackend}/accounts/${accId}`)
        let data = Object.assign(getAccount.data, {
            balance: getAccount.data.balance - expense
        })
        const response = await axios.put(`${config.appBackend}/accounts/${accId}`, data)
        return response.data
    } catch (e) {console.log(e)}
}
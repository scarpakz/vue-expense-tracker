import axios from 'axios'
import {config} from '@/config/config.js'

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
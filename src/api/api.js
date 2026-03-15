import axios from 'axios'
import {config} from '@/config/config.js'

export const API_DELETE_DETAIL_TRANSACTION = async (obj) => {
    try {
        const response = await axios.delete(`${config.appBackend}/transactions/${obj.id}`)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

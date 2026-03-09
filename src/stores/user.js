import { defineStore } from 'pinia';
import {ref,reactive, computed} from 'vue';
import axios from 'axios'
import {config} from '@/config/config.js'

export const useUserStore = defineStore('user', () => {
    // state
    let user = reactive({})
    const mockup = reactive({
        userId: 'user_01',
        isLoggedOn: false
    })

    // use functions for actions, e.g function ()
    // getter
    const getUser = computed(() => {
        return user
    })

    const getIsLoggedOn = computed(() => mockup.isLoggedOn)

    // setter
    async function initializeData () {
        try {
            const users = await axios.get(`${config.appBackend}/users`)
            const userAccounts = await axios.get(`${config.appBackend}/accounts`)

            const filterUser = users.data.filter((item) => {
                return mockup.userId === item.id
            })
            const filterUserAccounts = userAccounts.data.filter(item => item.userId === mockup.userId).map(item => item.balance)
            const totalBalance = filterUserAccounts.reduce(getSum, 0)
            
            const newData = filterUser.map((item) => {
                return {
                    ...item,
                    balance: totalBalance
                }
            })

            user = newData[0]
            
            if (user) {
                mockup.isLoggedOn = true
            }
        } catch(e) { console.log(e) }
    }

    const getSum = (newTotal, num) => {
        return newTotal + num
    }

    return {
        getUser,
        getIsLoggedOn,
        initializeData
    }
})
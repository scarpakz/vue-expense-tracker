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
            const response = await axios.get(`${config.appBackend}/users`)
            const filterUser = response.data.filter((item) => {
                return mockup.userId === item.id
            })
            user = filterUser[0]
            if (user) {
                mockup.isLoggedOn = true
            }
        } catch(e) { console.log(e) }
    }

    return {
        getUser,
        getIsLoggedOn,
        initializeData
    }
})
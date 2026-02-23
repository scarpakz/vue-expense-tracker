<template>
  <SideBar :user="user" />
</template>

<script setup>
import { useUserStore } from '@/stores/user.js'
import { onMounted, ref } from 'vue';
import SideBar from './components/SideBar.vue';

const store = useUserStore()
const user = ref({})

const getUserData = () => {
    user.value = store.getUser
}

onMounted(async () => {
  await store.initializeData()
  getUserData()
})
</script>
<template>
    <div class="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
        <div class="max-w-5xl mx-auto">
            <header class="mb-8">
                <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Settings</h1>
                <p class="text-gray-500 mt-2">Manage your financial goals and security preferences.</p>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                        <h3 class="text-lg font-semibold opacity-90">Account Summary</h3>
                        <div class="mt-4 space-y-2">
                            <p class="text-sm opacity-75">Monthly Target</p>
                            <p class="text-2xl font-bold">${{ userSettings.monthlyIncome.toLocaleString() }}</p>
                        </div>
                        <div class="mt-6 pt-6 border-t border-indigo-500/50 flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <i class="pi pi-user text-white"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium">Jason Javier</p>
                                <p class="text-xs opacity-70">Premium Member</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 space-y-6">

                    <section
                        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                        <h2 class="text-lg font-bold text-gray-800 mb-5 flex items-center gap-3">
                            <span class="p-2 bg-green-50 rounded-lg">
                                <i class="pi pi-wallet text-green-600"></i>
                            </span>
                            Financial Configuration
                        </h2>

                        <div class="space-y-4">
                            <div class="max-w-sm">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Monthly Income
                                    Target</label>
                                <div class="relative group">
                                    <span
                                        class="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors">$</span>
                                    <input v-model="userSettings.monthlyIncome" type="number"
                                        class="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
                                </div>
                                <p class="text-xs text-gray-400 mt-2 italic">Dashboard progress bars will sync with this
                                    value.</p>
                            </div>
                        </div>
                    </section>

                    <section
                        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                        <div class="p-6 border-b border-gray-50 bg-gray-50/30">
                            <h2 class="text-lg font-bold text-gray-800 flex items-center gap-3">
                                <span class="p-2 bg-orange-50 rounded-lg">
                                    <i class="pi pi-lock text-orange-600"></i>
                                </span>
                                Security & Password
                            </h2>
                        </div>

                        <form @submit.prevent="handlePasswordChange" class="p-6 space-y-5">
                            <div>
                                <label for="current-password"
                                    class="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                <input id="current-password" v-model="userSettings.currentPassword" type="password"
                                    autocomplete="current-password" placeholder="••••••••"
                                    class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                    required />
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label for="new-password" class="block text-sm font-semibold text-gray-700 mb-2">New
                                        Password</label>
                                    <input id="new-password" v-model="userSettings.newPassword" type="password"
                                        autocomplete="new-password"
                                        class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                        required />
                                </div>

                                <div>
                                    <label for="confirm-password"
                                        class="block text-sm font-semibold text-gray-700 mb-2">Confirm New
                                        Password</label>
                                    <input id="confirm-password" v-model="userSettings.confirmPassword" type="password"
                                        class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                        required />
                                </div>
                            </div>

                            <div v-if="passwordMismatch"
                                class="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg">
                                <i class="pi pi-exclamation-circle text-sm"></i>
                                <p class="text-xs font-medium">Passwords do not match.</p>
                            </div>

                            <div class="flex justify-end pt-2">
                                <button type="submit"
                                    class="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all active:scale-95">
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </section>

                    <div class="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                        <button
                            class="w-full sm:w-auto px-6 py-2.5 text-gray-500 hover:text-gray-800 font-semibold transition-colors">
                            Cancel
                        </button>
                        <button @click="handleUpdateSettings" :disabled="isSaving"
                            class="w-full sm:w-auto px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95">
                            <i v-if="isSaving" class="pi pi-spin pi-spinner text-sm"></i>
                            {{ isSaving ? 'Saving Changes...' : 'Save All Changes' }}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';

const userSettings = reactive({
    monthlyIncome: 5000,
    currency: 'USD',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});

const isSaving = ref(false);

const handleUpdateSettings = () => {
    isSaving.value = true;
    // Simulate API call
    setTimeout(() => {
        isSaving.value = false;
        alert('Settings updated successfully!');
    }, 1000);
};
</script>
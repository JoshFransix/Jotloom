<template>
    <div>

        <!-- Logout dialog -->
        <v-dialog persistent v-model="logoutDialog" max-width="500px" scrollable>
            <div class="tw-rounded-xl tw-text-white tw-w-full tw-bg-slate-700 tw-mx-auto tw-py-12 tw-px-6 sm:tw-text-sm">
                <h1 class="fira tw-font-semibold tw-text-center tw-text-xl sm:tw-text-sm">
                    Logout
                </h1>
                <div class="tw-text-center tw-mt-4">
                    <h3 class="tw-text-sm">Are you sure you want to logout?</h3>
                    <div class="tw-mt-8">
                        <v-btn rounded class="mr-3" color="primaryLight" @click="$emit('close-dialog')"
                            depressed>Cancel</v-btn>

                        <v-btn :loading="loadLogout" @click="logout" rounded color="primary" depressed>Continue</v-btn>
                    </div>
                </div>
            </div>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="alertColor" location="top" position="fixed">
            {{ alertText }}

            <template v-slot:actions>
                <v-btn icon color="red" variant="text" @click="snackbar = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'

const authStore = useAuth()
const { logoutDialog } = storeToRefs(authStore)

const emit = defineEmits(['close-dialog'])

const loadLogout = ref(false)
const snackbar = ref(false)
const alertText = ref("");
const alertColor = ref("info");

const client = useSupabaseClient()

async function logout() {
    try {
        loadLogout.value = true
        const { error } = await client.auth.signOut()
        // console.log(user.value)
        if (error) throw error
        setTimeout(() => {
            loadLogout.value = false
            window.location = '/'
        }, 500)
    } catch (error) {
        loadLogout.value = false
        alertText.value = error.message
        alertColor.value = 'red'
        snackbar.value = true
    }
}
</script>
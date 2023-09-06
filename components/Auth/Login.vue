<template>
    <div>
        <div class="tw-h-full tw-w-full">
            <v-form v-model="valid" class="sign-up-form" ref="form" @submit.prevent="processLogin">
                <div class="tw-text-center tw-mb-12">
                    <h3 class="tw-text-white tw-mb-6 tw-text-2xl tw-font-semibold md-lg:tw-text-xl">
                        Welcome Back
                    </h3>
                    <span class="tw-text-[#ddd] sm:tw-text-sm">Please enter your details to log in.</span>
                </div>

                <v-text-field :rules="emailRules" rounded clearable bg-color="rgba(0,0,0,0.01)" base-color="white"
                    variant="outlined" color="primary" label="Email" placeholder="name@company.com" type="email"
                    v-model="email" required hide-details="auto" class="mb-6"></v-text-field>

                <v-text-field :rules="passwordRules" rounded variant="outlined" bg-color="rgba(0,0,0,0.01)" color="primary"
                    label="Password" placeholder="*******" :type="showPassword ? 'text' : 'password'"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" v-model="password" required
                    hide-details="auto" class="mb-6" @click:append-inner="showPassword = !showPassword"></v-text-field>
                <!-- 
                <div class="tw-flex tw-w-full tw-text-white tw-text-sm tw-justify-between tw-items-center">
                    <v-checkbox v-model="keepMeLoggedIn" :ripple="false" required>
                        <template #label>
                            <span class="rememberMe-text">Remember me</span>
                        </template>
                    </v-checkbox>

                    <div>
                        <span @click="toForgotPassword" class="tw-text-brand-primary tw-cursor-pointer">Forgot
                            password?</span>
                    </div>
                </div> -->

                <v-btn :disabled="!valid" color="primary" type="submit" width="121" height="50" block
                    class="disabled:tw-bg-slate-300 tw-text-white tw-rounded-lg tw-py-8 tw-mt-6 tw-font-bold tw-transition tw-duration-200 hover:tw-bg-gray-300"
                    :loading="isLoading"><span>Login</span></v-btn>
            </v-form>
            <h2 class="tw-text-sm tw-text-[#a1a1a1] tw-mt-4">
                Don't have an account,
                <span @click="$emit('toSignup')" class="tw-text-brand-primary tw-cursor-pointer">Sign up?</span>
            </h2>
            <div class="tw-mt-8">
                <v-btn @click="$emit('google-login')" height="50" color="primary" block variant="tonal"
                    class="rounded-lg red--bg">
                    <v-icon class="mr-3">mdi-google</v-icon>
                    <h2>Login with google</h2>
                </v-btn>
            </div>
            <!-- <div
                class="tw-mt-4 tw-flex tw-justify-center tw-text-brand-primary tw-py-3 tw-rounded-lg tw-border-brand-primary tw-border tw-bg-brand-primary-light">
            </div> -->
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'

const authStore = useAuth()
const { isLoading } = storeToRefs(authStore)

const email = useState('email', () => '')
const password = useState('password', '')
const valid = useState('valid', () => false)
const keepMeLoggedIn = useState('keepMeLoggedIn', () => false)
const showPassword = useState('showPassword', () => false)

const emit = defineEmits(['login', 'toSignup'])

const processLogin = () => {
    const details = {
        email: email.value,
        password: password.value
    }
    emit('login', { ...details })

}

const passwordRules = [
    value => {
        if (value) return true
        return 'Password is required.'
    },
    value => {
        if (value?.length >= 6) return true
        return 'Password should be at least 6 characters.'
    },
]

const emailRules = [
    value => {
        if (value) return true
        return 'E-mail is required.'
    },
    value => {
        if (/.+@.+\..+/.test(value)) return true
        return 'E-mail must be valid.'
    },
]


</script>
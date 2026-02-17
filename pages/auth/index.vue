<template>
    <div class="auth-landing">
        <div>
            <div class="left">
                <v-slide-x-transition leave-absolute hide-on-leave>
                    <div class="tw-w-8/12 tw-mx-auto tw-mt-10 lg:tw-w-10/12 sm:tw-mt-5" v-if="!signUp">
                        <AuthLogin @toSignup="toSignUp" @login="processLogin" @google-login="googleLogin" />
                    </div>
                </v-slide-x-transition>
                <v-slide-x-transition leave-absolute hide-on-leave>
                    <div class="tw-w-8/12 tw-mx-auto tw-mt-10 lg:tw-w-10/12 sm:tw-mt-5" v-if="signUp">
                        <AuthSignUp @toLogin="toLogin" @signUp="processSignUp" @google-signup="googleLogin" />
                    </div>
                </v-slide-x-transition>
            </div>
        </div>

        <div
            class="right tw-select-none tw-pointer-events-none tw-bg-brand-primary tw-flex tw-justify-center tw-items-center tw-h-full">
            <!-- <landing-image class="tw-w-1/2 tw-h-1/2" /> -->
            <v-slide-x-reverse-transition leave-absolute hide-on-leave>
                <img v-if="signUp" src="@/assets/svg/Saly-11.svg" alt="" class="tw-w-2/3 tw-h-2/3">
            </v-slide-x-reverse-transition>
            <v-slide-x-reverse-transition leave-absolute hide-on-leave>
                <img v-if="!signUp" src="@/assets/svg/Saly-10.svg" alt="" class="tw-w-2/3 tw-h-2/3">
            </v-slide-x-reverse-transition>
        </div>
        <div @click="$router.push('/')" class="tw-absolute tw-top-9 tw-left-9">
            <v-btn color="transparent" icon>
                <v-icon color="primary">mdi-arrow-left</v-icon>
                <v-tooltip activator="parent" location="bottom">Back to home</v-tooltip>
            </v-btn>
        </div>

        <v-snackbar :color="alertColor" v-model="snackbar" location="top right" position="fixed">
            {{ alertText }}

            <template v-slot:actions>
                <v-btn icon color="white" variant="text" @click="snackbar = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script setup lang="ts">
const authStore = useAuth()
const { loginWithGoogle, login, signUp: signUpApi } = useAuthApi()

const alertText = ref('')
const alertColor = ref('')
const snackbar = ref(false)
const route = useRoute()
const router = useRouter()

definePageMeta({
    layout: "landing",
});

const signUp = ref(false)

onBeforeMount(() => {
    // Check for Google OAuth callback
    if (route.query.token) {
        const token = route.query.token as string
        const userStr = route.query.user as string
        
        if (token && userStr) {
            authStore.setAuth(JSON.parse(decodeURIComponent(userStr)), token)
            
            alertText.value = 'Login successful'
            alertColor.value = 'green'
            snackbar.value = true
            
            setTimeout(() => {
                router.push('/dashboard')
            }, 500)
            return
        }
    }

    if ('login' in route.query || 'signin' in route.query) {
        signUp.value = false
    } else if ('signup' in route.query) {
        signUp.value = true
    }
})

function googleLogin() {
    loginWithGoogle()
}

async function processSignUp(value: any) {
    const { full_name, email, password } = value
    try {
        authStore.SET_LOADER(true)
        await signUpApi(full_name, email, password)
        authStore.SET_LOADER(false)
        alertText.value = 'Account successfully created'
        alertColor.value = 'green'
        snackbar.value = true
        setTimeout(() => {
            router.push('/dashboard')
        }, 1000)
    } catch (error: any) {
        authStore.SET_LOADER(false)
        alertText.value = error.message
        alertColor.value = 'red'
        snackbar.value = true
    }
}

async function processLogin(value: any) {
    try {
        authStore.SET_LOADER(true)
        await login(value.email, value.password)
        authStore.SET_LOADER(false)
        alertText.value = 'Login successful'
        alertColor.value = 'green'
        snackbar.value = true
        setTimeout(() => {
            router.push('/dashboard')
        }, 1000)
    } catch (error: any) {
        authStore.SET_LOADER(false)
        alertText.value = error.message
        alertColor.value = 'red'
        snackbar.value = true
    }
}

const toLogin = () => {
    router.push('/auth?login')
    signUp.value = false
}

const toSignUp = () => {
    router.push('/auth?signup')
    signUp.value = true
}

</script>
<style lang="scss" scoped>
.auth-landing {
    height: 100vh;
    display: flex;
    align-items: center;
    overflow-x: hidden;

    .left {
        width: 50vw;
        transition: all 0.3s ease-in-out;

        .logo {
            user-select: none;
            pointer-events: none;
        }

        @media screen and (max-width: 600px) {
            width: 100vw;

        }
    }

    .right {
        width: 50vw;
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        transition: all 0.3s ease-in-out;

        @media screen and (max-width: 600px) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            display: none;
        }
    }
}
</style>
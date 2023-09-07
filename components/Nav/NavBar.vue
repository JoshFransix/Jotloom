<template>
    <div>
        <v-navigation-drawer v-model="drawer" fixed temporary width="70%" class="px-4">
            <div class="tw-flex tw-justify-between tw-items-center">
                <div class="logo tw-font-bold tw-text-xl">
                    <h1>Jot<span class="tw-text-brand-primary">Loom</span><span></span></h1>
                </div>
                <div>
                    <nuxt-link to="/">Home</nuxt-link>
                    <nuxt-link to="/">Features</nuxt-link>
                    <nuxt-link to="/">About Us</nuxt-link>
                    <nuxt-link to="/">Contact Us</nuxt-link>
                </div>
                <div>
                    <nuxt-link to="/auth?login">
                        <div class="tw-text-brand-primary">
                            <h1>Log In</h1>
                        </div>
                    </nuxt-link>
                    <nuxt-link to="/auth?signup">
                        <div class="tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-bg-brand-primary">
                            <h1>Sign Up</h1>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </v-navigation-drawer>
        <v-app-bar @click="() => console.log(user)" scroll-behavior="elevate" elevation="0" color="secondary" app
            height="85">
            <div class="tw-w-10/12 tw-mx-auto tw-flex tw-justify-between tw-items-center">
                <nuxt-link to="/">
                    <div class="logo tw-font-bold tw-text-xl">
                        <h1>Jot<span class="tw-text-brand-primary">Loom</span><span></span></h1>
                    </div>
                </nuxt-link>
                <div class="nav-links">
                    <nuxt-link to="/">Home</nuxt-link>
                    <nuxt-link to="/">Features</nuxt-link>
                    <nuxt-link to="/">About Us</nuxt-link>
                    <nuxt-link to="/">Contact Us</nuxt-link>
                </div>
                <div v-if="!user" class="tw-flex tw-items-center">
                    <nuxt-link to="/auth?login">
                        <div class="tw-text-brand-primary tw-px-4">
                            <h1>Log In</h1>
                        </div>
                    </nuxt-link>
                    <nuxt-link to="/auth?signup">
                        <div class="tw-text-white tw-px-4 tw-py-2 tw-rounded-full tw-bg-brand-primary">
                            <h1>Sign Up</h1>
                        </div>
                    </nuxt-link>
                </div>
                <div v-else>
                    <v-menu :close-on-content-click="false" transition="slide-x-reverse-transition">
                        <template v-slot:activator="{ props }">
                            <div v-bind="props" class="tw-cursor-pointer tw-rounded-full tw-p-1">
                                <v-avatar v-if="user.user_metadata.picture" :image="user.user_metadata.picture"
                                    color="primary"></v-avatar>
                                <v-avatar v-else color="primary">{{ user.user_metadata.full_name[0].toUpperCase()
                                }}</v-avatar>
                                <!-- <v-icon>mdi-chevron-down</v-icon> -->
                            </div>
                        </template>
                        <v-card min-width="300px" ripple color="#14203B" border="primary" rounded>
                            <div class="tw-px-4 tw-py-3">
                                <h1>{{ user.user_metadata.full_name }}</h1>
                                <h3 class="tw-text-sm tw-mt-2">{{ user.email }}</h3>
                            </div>
                            <v-divider></v-divider>
                            <v-list bg-color="transparent">
                                <v-list-item @click="$router.push('/dashboard')" prepend-icon="mdi-home" title="Dashboard"
                                    value="dashboard"></v-list-item>
                                <v-list-item @click="logoutActive(true)" prepend-icon="mdi-logout" title="Logout"
                                    value="logout"></v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                </div>
            </div>
        </v-app-bar>
        <!-- <h1>My name is David</h1> -->
        <Logout @close-dialog="logoutActive(false)" />
    </div>
</template>

<script setup>
import Logout from '~/components/Logout.vue'

const authStore = useAuth()
const drawer = ref(false)
const user = useSupabaseUser()

const logoutActive = (value) => {
    authStore.SET_LOGOUT(value)
}

</script>

<style lang="scss">
.nav-links a {
    margin: 0 1rem;
}
</style>
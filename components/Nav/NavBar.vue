<template>
    <div>
        <v-navigation-drawer location="top" v-model="drawer" fixed temporary class="mobileNav h-auto px-4 py-5">
            <div>
                <div class="tw-flex tw-justify-between tw-items-center">
                    <div class="logo tw-font-bold tw-text-xl">
                        <h1>Jot<span class="tw-text-brand-primary">Loom</span><span></span></h1>
                    </div>
                    <!-- <div @click="drawer = false" class=" tw-cursor-pointer tw-border tw-border-black tw-rounded-full"> -->
                    <v-btn @click.stop="drawer = false" size="30" icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <!-- </div> -->
                </div>


                <div class="tw-mt-10 tw-grid tw-grid-cols-1 tw-gap-y-3">
                    <nuxt-link to="/"><v-icon color="primary" class="mr-2">mdi-home</v-icon>Home</nuxt-link>
                    <nuxt-link to="/"><v-icon color="primary"
                            class="mr-2">mdi-hand-heart-outline</v-icon>Features</nuxt-link>
                    <nuxt-link to="/"><v-icon color="primary" class="mr-2">mdi-comment-account</v-icon>About Us</nuxt-link>
                    <nuxt-link to="/"><v-icon color="primary" class="mr-2">mdi-phone-plus-outline</v-icon>Contact
                        Us</nuxt-link>
                </div>
                <div class="tw-mt-12 tw-pb-6 ">
                    <div v-if="!user" class="tw-grid tw-grid-cols-1 tw-gap-y-3">
                        <nuxt-link to="/auth?login"><v-icon color="primary" class="mr-2">mdi-login</v-icon>Log
                            In</nuxt-link>
                        <nuxt-link class="signUp tw-px-4 tw-py-2 tw-rounded-md " to="/auth?signup"><v-icon color="primary"
                                class="mr-2">mdi-account-plus</v-icon>Sign Up</nuxt-link>
                    </div>
                    <div v-else>
                        <div @click="logoutActive(true)" class="signUp tw-px-4 tw-py-2 tw-rounded-md " to="/auth?signup">
                            <v-icon color="primary" class="mr-2">mdi-logout-variant</v-icon>Logout
                        </div>
                    </div>
                </div>

            </div>
        </v-navigation-drawer>
        <v-app-bar scroll-behavior="elevate" elevation="0" color="secondary" height="85">
            <div class="tw-w-10/12 tw-mx-auto tw-flex tw-justify-between tw-items-center">
                <nuxt-link to="/">
                    <div class="logo tw-font-bold tw-text-xl">
                        <h1>Jot<span class="tw-text-brand-primary">Loom</span><span></span></h1>
                    </div>
                </nuxt-link>
                <div class="nav-links md:tw-hidden">
                    <nuxt-link to="/">Home</nuxt-link>
                    <nuxt-link to="/">Features</nuxt-link>
                    <nuxt-link to="/">About Us</nuxt-link>
                    <nuxt-link to="/">Contact Us</nuxt-link>
                </div>
                <div>
                    <div v-if="!user" class="tw-flex tw-items-center md:tw-hidden">
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
                        <v-menu :close-on-content-click="false">
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="tw-cursor-pointer">
                                    <v-avatar size="35" v-if="user.user_metadata.picture"
                                        :image="user.user_metadata.picture" color="primary"></v-avatar>
                                    <v-avatar v-else color="primary">{{ user.user_metadata.full_name[0].toUpperCase()
                                    }}</v-avatar>
                                    <v-icon color="#ddd">mdi-chevron-down</v-icon>
                                </div>
                            </template>
                            <v-card min-width="300px" ripple color="#14203B" border="primary" rounded>
                                <div class="tw-px-4 tw-py-3">
                                    <h1>{{ user.user_metadata.full_name }}</h1>
                                    <h3 class="tw-text-sm tw-mt-2">{{ user.email }}</h3>
                                </div>
                                <v-divider></v-divider>
                                <v-list bg-color="transparent">
                                    <v-list-item @click="$router.push('/dashboard')" prepend-icon="mdi-home"
                                        title="Dashboard" value="dashboard"></v-list-item>
                                    <v-list-item @click="logoutActive(true)" prepend-icon="mdi-logout" title="Logout"
                                        value="logout"></v-list-item>
                                </v-list>
                            </v-card>
                        </v-menu>
                    </div>
                </div>
                <div class="tw-hidden md:tw-block">
                    <v-btn @click.stop="drawer = true" size="40" icon>
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
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

.mobileNav {
    transition: all 0.3s ease-in-out;

    a:not(.signUp) {
        padding: 6px 12px;
        border-radius: 6px;
        transition: all 0.3s ease-in-out;
        color: #000;
        font-weight: 600;
        width: max-content;

        &:hover,
        .active {
            padding: 6px 16px;
            color: rgba(34, 42, 43, 0.25);
            background: rgba(144, 208, 218, 0.25) !important;
        }
    }

    .signUp {
        width: max-content;
        padding: 6px 16px;
        font-weight: 600;
        color: #000;
        background: rgba(144, 208, 218, 0.25) !important;
    }
}
</style>
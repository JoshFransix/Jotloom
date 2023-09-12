<template>
    <div>
        <div>
            <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <div v-bind="props" class="tw-cursor-pointer tw-rounded-full tw-p-1">
                        <v-avatar size="30" v-if="user.user_metadata.picture" :image="user.user_metadata.picture"
                            color="primary"></v-avatar>
                        <v-avatar size="35" v-else color="primary">{{ getFirstLetter() }}</v-avatar>
                        <v-icon size="20" color="#ddd">mdi-chevron-down</v-icon>
                    </div>
                </template>
                <v-card min-width="300px" ripple color="#14203B" border="primary" rounded>
                    <div class="tw-px-4 tw-py-3">
                        <h1>{{ fullName }}</h1>
                        <h3 class="tw-text-sm tw-mt-2">{{ user.email }}</h3>
                    </div>
                    <v-divider></v-divider>
                    <v-list bg-color="transparent">
                        <v-list-item @click="$emit('logout')" prepend-icon="mdi-logout" title="Logout"
                            value="logout"></v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </div>
    </div>
</template>
<script setup>
const user = useSupabaseUser()

const fullName = user.value.user_metadata.full_name;

const getFirstLetter = () => {
    return fullName[0].toUpperCase();
};

const emit = defineEmits(['logout'])


</script>
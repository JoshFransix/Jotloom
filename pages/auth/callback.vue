<template>
    <div class="tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-secondary">
        <div class="tw-text-center">
            <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            <h2 class="tw-text-white tw-mt-4">Completing authentication...</h2>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "landing",
});

// This page handles the Google OAuth callback
// The backend redirects here with token and user data
// The auth/index.vue page will process the query params
onMounted(() => {
    // Redirect to auth page which will handle the token
    const router = useRouter();
    router.push({ path: '/auth', query: useRoute().query });
});
</script>

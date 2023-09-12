<template>
    <v-app class="body">
        <div>
            <slot />
        </div>
    </v-app>
</template>
<script setup>

// onMounted(() => {
//     if (process.browser) {
//         console.log('client', window)
//     } else {
//         console.log('server', window)
//     }
// })

</script>
<style lang="scss">
.body {
    background: #0F172A !important;
    position: relative;
}

.grid-set {
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 1290px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 1190px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 539px) {
        grid-template-columns: 100%;
    }
}


.v-overlay {
    .v-overlay__scrim {
        opacity: 1 !important;
        background: rgba(0, 15, 53, 0.1) !important;
        mix-blend-mode: normal;
        border-color: rgba(0, 15, 53, 0.1) !important;
    }

    &.v-overlay--active .v-overlay__scrim {
        backdrop-filter: blur(2px);
    }
}
</style>
  
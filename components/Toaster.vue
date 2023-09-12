<template>
    <v-snackbar :color="alertColor" v-model="open" location="top right" position="fixed">
        {{ alertText }}

        <template v-slot:actions>
            <v-btn icon color="white" variant="text" @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script setup>
const props = defineProps({
    alertColor: {
        type: String,
        default: ''
    },
    alertText: {
        type: String,
        default: ''
    },
    snackbar: {
        type: Boolean,
        default: false
    },
})

const { alertColor, alertText, snackbar } = props

const open = computed(() => {
    return snackbar == true
})

const emit = defineEmits(['close'])

</script>
<template>
    <div class="grid-set tw-relative tw-mt-9 tw-grid tw-gap-4 tw-pb-20">
        <Note v-for="note in allNotes" :key="note.title" @edit="editNote" @delete="deleteNote" :note="note" />
    </div>
</template>
<script setup>
import Note from './Note.vue'

const emit = defineEmits(['save-note', 'delete-note', 'edit-note'])

const props = defineProps({
    allNotes: {
        type: Array,
        default: []
    }
})

const { allNotes } = props

const editNote = (note) => {
    emit('edit-note', note)
}

const deleteNote = (note) => {
    emit('delete-note', note)
}


</script>
<style lang="scss" scoped></style>
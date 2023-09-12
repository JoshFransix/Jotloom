<template>
    <div class="tw-relative tw-transition-all">
        <div @click="sideNavOpened = false"
            :class="sideNavOpened ? 'tw-backdrop-blur-sm md:tw-translate-x-[0px]' : 'md:tw-translate-x-[-100%]'"
            class="tw-transition-all tw-fixed tw-top-0 tw-left-0 tw-h-full tw-z-50 md:tw-w-full">
            <side-nav @add-new="addNewDialog = true" @logout="logoutActive(true)"
                class="tw-w-[200px] tw-h-full tw-bg-brand-primary-light tw-transition-all tw-shadow-xl sm:tw-w-[270px]"
                :class="sideNavOpened ? 'md:tw-translate-x-[0px]' : 'md:tw-translate-x-[-200px] sm:tw-translate-x-[-270px]'" />
        </div>


        <div class="tw-hidden md:tw-block">
            <div class="tw-py-4 tw-bg-brand-primary-light">
                <div class="tw-w-11/12 tw-mx-auto tw-flex tw-justify-between tw-items-center">
                    <div class="logo tw-font-bold tw-text-xl sm:tw-text-base">
                        <h1 class="tw-text-white">Jot<span class="tw-text-brand-primary">Loom</span><span></span></h1>
                    </div>
                    <!-- User Avatar -->
                    <user-avatar @logout="logoutActive(true)" class="tw-hidden md:tw-block" />
                    <v-btn color="primary" @click.stop="sideNavOpened = !sideNavOpened" size="30" icon>
                        <v-icon size="20"> mdi-menu</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <div
            class="tw-text-white tw-w-full tw-relative tw-overflow-x-hidden tw-pl-[14.5rem] tw-pr-8 tw-pt-8 md:tw-pl-3 md:tw-pr-3">
            <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
                <div class="left">
                    <h1 class="tw-text-xl lg:tw-text-base">Dashboard</h1>
                </div>

                <div class="right tw-items-center tw-flex tw-w-1/2 sm:tw-hidden">
                    <v-text-field v-model="search" clearable rounded bg-color="primaryLight" density="compact"
                        variant="solo" label="Search Notes" prepend-inner-icon="mdi-magnify" single-line
                        hide-details></v-text-field>
                </div>

                <!-- User Avatar -->
                <user-avatar @logout="logoutActive(true)" class="md:tw-hidden" />
            </div>
            <v-divider class="mt-4"></v-divider>
            <div class="tw-mt-9">
                <h1 class="tw-text-2xl md:tw-text-lg">
                    Hello,
                    <span class="tw-text-brand-primary">{{ fullName.replace(/ .*/, "") }}!</span>
                </h1>
                <h3 class="tw-opacity-50 tw-text-sm tw-mt-2">
                    All your notes are here, in one place
                </h3>
            </div>

            <!-- Notes -->
            <div v-if="fetchActive">
                <div class="tw-mt-8 tw-grid grid-set tw-gap-4">
                    <v-skeleton-loader v-for="n in 8" :key="n" class="rounded-lg" color="primaryLight" max-width="100%"
                        type="card"></v-skeleton-loader>
                </div>
            </div>
            <div v-else class="">
                <Notes @edit-note="editNote" @delete-note="openDelete" :allNotes="filteredNotes" />
            </div>

            <!-- Add new note dialog -->
            <v-dialog persistent v-model="addNewDialog" max-width="500px" scrollable>
                <div
                    class="tw-rounded-xl tw-text-white tw-w-full tw-bg-slate-700 tw-mx-auto tw-py-12 tw-px-6 sm:tw-text-sm">
                    <h1 class="fira tw-font-semibold tw-text-center tw-text-xl sm:tw-text-sm">
                        Add new note
                    </h1>
                    <div class="tw-text-center tw-mt-4">
                        <v-text-field type="text" outlined label="Title" v-model="newNote.title"></v-text-field>
                        <v-textarea persistent-hint hint="click on the mic icon to start/stop speaking" :append-inner-icon="isRecording ? 'mdi-stop-circle' : 'mdi-microphone'
                            " @click:append-inner="toggleRecord" rows="8" outlined label="Note"
                            v-model="newNote.content">
                        </v-textarea>
                        <div class="tw-mt-4">
                            <v-btn rounded class="mr-3" color="primaryLight" @click="addNewDialog = false"
                                depressed>Close</v-btn>
                            <v-btn :loading="loader.save" @click="saveNewNote" rounded color="primary"
                                depressed>Submit</v-btn>
                        </div>
                    </div>
                </div>
            </v-dialog>

            <!-- Edit note dialog -->
            <v-dialog persistent v-model="editNoteDialog" max-width="500px" scrollable>
                <div
                    class="tw-rounded-xl tw-text-white tw-w-full tw-bg-slate-700 tw-mx-auto tw-py-12 tw-px-6 sm:tw-text-sm">
                    <h1 class="fira tw-font-semibold tw-text-center tw-text-xl sm:tw-text-sm">
                        Edit Note
                    </h1>
                    <div class="tw-text-center tw-mt-4">
                        <v-form>
                            <v-text-field type="text" outlined label="Title" v-model="updatedNote.title"></v-text-field>
                            <v-textarea persistent-hint hint="click on the mic icon to start/stop speaking"
                                :append-inner-icon="isRecording ? 'mdi-stop-circle' : 'mdi-microphone'"
                                @click:append-inner="toggleRecord" rows="8" outlined label="Note"
                                v-model="updatedNote.content">
                            </v-textarea>
                            <div class="tw-mt-4">
                                <!-- <v-btn rounded class="mr-3" color="primaryLight" @click="editNoteDialog = false"
                                depressed>Close</v-btn> -->
                                <v-btn :loading="loader.edit" @click="updateNote" rounded color="primary"
                                    depressed>Save</v-btn>
                            </div>
                        </v-form>
                    </div>
                </div>
            </v-dialog>

            <!-- Delete note dialog -->
            <v-dialog persistent v-model="deleteNoteDialog" max-width="500px" scrollable>
                <div
                    class="tw-rounded-xl tw-text-white tw-w-full tw-bg-slate-700 tw-mx-auto tw-py-12 tw-px-6 sm:tw-text-sm">
                    <h1 class="fira tw-font-semibold tw-text-center tw-text-xl sm:tw-text-sm">
                        Delete Note
                    </h1>
                    <div class="tw-text-center tw-mt-4">
                        <h3 class="tw-text-sm">Are you sure you want to delete this note?</h3>
                        <div class="tw-mt-8">
                            <v-btn rounded class="mr-3" color="primaryLight" @click="deleteNoteDialog = false" depressed>Go
                                back</v-btn>
                            <v-btn :loading="loader.delete" @click="deleteNote" rounded color="primary"
                                depressed>Continue</v-btn>
                        </div>
                    </div>
                </div>
            </v-dialog>

            <!-- Logout dialog -->
            <Logout @close-dialog="logoutActive(false)" />

            <!-- Snackbar -->
            <v-snackbar v-model="snackbar" :color="alertColor" location="top" position="fixed">
                {{ alertText }}

                <template v-slot:actions>
                    <v-btn icon color="red" variant="text" @click="snackbar = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>

        </div>

    </div>
</template>
<script setup>
import Notes from "~/components/Dashboard/Notes.vue";
import SideNav from "~/components/Nav/SideNav.vue";
import Logout from "~/components/Logout.vue";
import UserAvatar from '~/components/Dashboard/UserAvatar.vue'

definePageMeta({
    middleware: ["auth"],
});

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const sr = new Recognition();

const user = useSupabaseUser();
const client = useSupabaseClient();

const fullName = user.value.user_metadata.full_name;

const sideNavOpened = ref(false)

const search = ref("");
const isRecording = ref(false);
const fetchActive = ref(true);
const snackbar = ref(false);
const alertText = ref("");
const alertColor = ref("info");
const addNewDialog = ref(false);
const editNoteDialog = ref(false);
const deleteNoteDialog = ref(false);
const mainNotes = ref([]);
let updatedNote = ref({})

const loader = ref({
    save: false,
    edit: false,
    delete: false,
})

const newNote = ref({
    title: "",
    content: "",
    user_id: user.value.id
});


const authStore = useAuth();

const logoutActive = (value) => {
    authStore.SET_LOGOUT(value);
};

onBeforeMount(async () => {
    await getAllNotes();
});

const getAllNotes = async () => {
    fetchActive.value = true;
    try {
        let { data, error } = await client.from("notes").select("*");

        fetchActive.value = false;

        if (data) {
            mainNotes.value = data;
            console.log("mainNotes", mainNotes.value);
        }
        if (error) throw error;
    } catch (error) {
        console.log(error);
    }
};

const saveNewNote = async () => {
    if (newNote.value.title === "") {
        alertText.value = "Title should not be empty";
        snackbar.value = true;
    } else if (newNote.value.content === "") {
        alertText.value = "Note content should not be empty";
        snackbar.value = true;
    } else {
        sr.stop();
        try {
            loader.value.save = true
            let { data, error } = await client.from('notes').insert({ ...newNote.value })
            console.log(data)
            newNote.value = {
                title: "",
                content: "",
                user_id: user.value.id
            };
            loader.value.save = false
            addNewDialog.value = false;
            getAllNotes()
            if (error) throw error
        } catch (error) {
            loader.value.save = false
            console.log(error)
        }
    }
};

const editNote = (note) => {
    updatedNote = note
    editNoteDialog.value = true
}

const openDelete = (note) => {
    updatedNote = note
    deleteNoteDialog.value = true
}

const updateNote = async () => {
    sr.stop();
    try {
        loader.value.edit = true
        let { data, error } = await client.from('notes').update({ title: updatedNote.title, content: updatedNote.content }).eq('id', updatedNote.id)
        console.log(data)
        loader.value.edit = false
        editNoteDialog.value = false
        getAllNotes()
        if (error) throw error
    } catch (error) {
        console.log(error)
    }
};

const deleteNote = async () => {
    try {
        loader.value.delete = true
        const selectedItem = mainNotes.value.find((item) => item.id === updatedNote.id);
        let { data, error } = await client.from('notes').delete().eq('id', selectedItem.id)
        console.log(data)
        loader.value.delete = true
        deleteNoteDialog.value = false
        getAllNotes()
        if (error) throw error
    } catch (error) {
        console.log(error)
    }
};

const filteredNotes = computed(() => {
    if (!mainNotes.value || search?.value) return mainNotes.value;
    return mainNotes.value.filter((item) => {
        const s = search.value.toLowerCase();
        const t = item.title.toLowerCase();
        const c = item.content.toLowerCase();
        const d = new Date(item.created_at).toDateString().toString();
        return t.includes(s) || c.includes(s) || d.includes(s);
    });
});

const startRecording = () => {
    sr.continuous = true;
    sr.interimResults = true;

    sr.onstart = () => {
        console.log("SR started");
        isRecording.value = true;
    };

    sr.onend = () => {
        console.log("SR stopped");
        isRecording.value = false;
    };

    sr.onresult = (evt) => {
        // console.log(evt)
        const words = Array.from(evt.results)
            .map((item) => item[0])
            .map((item) => item.transcript)
            .join("");

        if (editNoteDialog.value == true) {
            updatedNote.content = words
        } else {
            newNote.value.content = words;
        }

    };
};

const toggleRecord = () => {
    startRecording();
    isRecording.value ? sr.stop() : sr.start();
};
</script>

<template>
    <div class="tw-text-white tw-relative tw-overflow-x-hidden">
        <side-nav @add-new="addNewDialog = true" @logout="logoutDialog = true" class="tw-z-50" />
        <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
            <div class="left">
                <h1 class="tw-text-xl">Dashboard</h1>
            </div>

            <div class="right tw-items-center tw-flex tw-w-1/2">
                <v-text-field @keyup="logItem" v-model="search" clearable rounded bg-color="primaryLight" density="compact"
                    variant="solo" label="Search Notes" prepend-inner-icon="mdi-magnify" single-line
                    hide-details></v-text-field>
            </div>

            <div>
                <v-menu :close-on-content-click="false" transition="slide-x-reverse-transition">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="tw-cursor-pointer tw-rounded-full tw-p-1">
                            <v-avatar v-if="user.user_metadata.picture" :image="user.user_metadata.picture"
                                color="primary"></v-avatar>
                            <v-avatar v-else color="primary">{{ getFirstLetter() }}</v-avatar>
                            <!-- <v-icon>mdi-chevron-down</v-icon> -->
                        </div>
                    </template>
                    <v-card min-width="300px" ripple color="#14203B" border="primary" rounded>
                        <div class="tw-px-4 tw-py-3">
                            <h1>{{ fullName }}</h1>
                            <h3 class="tw-text-sm tw-mt-2">{{ user.email }}</h3>
                        </div>
                        <v-divider></v-divider>
                        <v-list bg-color="transparent">
                            <v-list-item @click="logoutActive(true)" prepend-icon="mdi-logout" title="Logout"
                                value="logout"></v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </div>
        </div>
        <v-divider class="mt-4"></v-divider>
        <div class="tw-mt-9">
            <h1 class="tw-text-2xl">
                Hello, <span class="tw-text-brand-primary">{{ fullName.replace(/ .*/, '') }}!</span>
            </h1>
            <h3 class="tw-opacity-50 tw-text-sm tw-mt-2">
                All your notes are here, in one place
            </h3>
        </div>

        <!-- Notes -->
        <div class="">
            <Notes @save-note="saveNote" @delete-note="deleteNote" :allNotes="allNotes" />
        </div>

        <!-- Add new note dialog -->
        <v-dialog persistent v-model="addNewDialog" max-width="500px" scrollable>
            <div class="tw-rounded-xl tw-text-white tw-w-full tw-bg-slate-700 tw-mx-auto tw-py-12 tw-px-6 sm:tw-text-sm">
                <h1 class="fira tw-font-semibold tw-text-center tw-text-xl sm:tw-text-sm">
                    Add new note
                </h1>
                <div class="tw-text-center tw-mt-4">
                    <v-text-field type="text" outlined label="Title" v-model="newNote.title"></v-text-field>
                    <v-textarea :append-inner-icon="isRecording ? 'mdi-stop-circle' : 'mdi-microphone'
                        " @click:append-inner="toggleRecord" rows="8" outlined label="Note" v-model="newNote.content">
                    </v-textarea>
                    <div class="tw-mt-4">
                        <v-btn rounded class="mr-3" color="primaryLight" @click="addNewDialog = false"
                            depressed>Close</v-btn>
                        <v-btn @click="saveNewNote" rounded color="primary" depressed>Submit</v-btn>
                    </div>
                </div>
            </div>
        </v-dialog>

        <!-- Logout dialog -->
        <Logout @close-dialog="logoutActive(false)" />

        <v-snackbar v-model="snackbar" :color="alertColor" location="top" position="fixed" multi-line>
            {{ alertText }}

            <template v-slot:actions>
                <v-btn icon color="red" variant="text" @click="snackbar = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script setup>
import Notes from "~/components/Dashboard/Notes.vue";
import SideNav from "~/components/Nav/SideNav.vue";
import Logout from '~/components/Logout.vue'

definePageMeta({
    middleware: ["auth"]
})

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const sr = new Recognition()

const user = useSupabaseUser()

const fullName = user.value.user_metadata.full_name

const router = useRouter()

const search = ref("");
const isRecording = ref(false);
const snackbar = ref(false);
const alertText = ref("");
const alertColor = ref("info");
const addNewDialog = ref(false);
const allNotes = ref([
    {
        id: 1,
        title: "This is note 1",
        content: "Content for note 1",
        date: "Mon Feb 14 2023",
    },
    {
        id: 2,
        title: "This is note 2",
        content: "Content for note 2",
        date: "Wed June 04 2023",
    },
    {
        id: 3,
        title: "This is note 3",
        content: "Content for note 3",
        date: "Thu April 24 2023",
    },
    {
        id: 4,
        title: "This is note 4",
        content: "Content for note 4",
        date: "Fri Aug 04 2023",
    },
]);

const newNote = ref({
    title: "",
    content: "",
    date: new Date().toDateString(),
});

const getFirstLetter = () => {
    return fullName[0].toUpperCase()
}

const authStore = useAuth()

const logoutActive = (value) => {
    authStore.SET_LOGOUT(value)
}


// watchEffect(() => {
//     if (newNote.value) {
//         console.log('testRun')
//     }
// });

const filteredNotes = () => {
    if (!allNotes.value || search?.value) return allNotes.value;
    return allNotes.value.filter((item) => {
        const s = search.value.toLowerCase();
        const t = item.title.toLowerCase();
        const c = item.content.toLowerCase();
        const d = item.date.toString();
        return t.includes(s) || c.includes(s) || d.includes(s);
    });
};

const startRecording = () => {
    sr.continuous = true;
    sr.interimResults = true;

    sr.onstart = () => {
        console.log("SR started");
        isRecording.value = true;
    };

    sr.onend = () => {
        console.log('SR stopped')
        isRecording.value = false
    }

    sr.onresult = (evt) => {
        // console.log(evt)
        const words = Array.from(evt.results)
            .map((item) => item[0])
            .map((item) => item.transcript).join('')

        newNote.value.content = words
    }
};

const logItem = () => {
    console.log(user.value)
}


const toggleRecord = () => {
    startRecording()
    isRecording.value ? sr.stop() : sr.start()
}

const saveNote = (note) => {
    const index = allNotes.value.findIndex((item) => item.id === note.id)
    console.log(index)
    allNotes.value[index] = note
}

const deleteNote = (note) => {
    // console.log(note)
    const index = allNotes.value.findIndex((item) => item.id === note.id)
    console.log(index)
    allNotes.value.splice(index, 1)
}

const saveNewNote = () => {
    if (newNote.value.title === '') {
        alertText.value = 'Title should not be empty'
        snackbar.value = true
    } else if (newNote.value.content === '') {
        alertText.value = 'Note content should not be empty'
        snackbar.value = true
    } else {
        sr.stop()
        allNotes.value.push(newNote.value)
        newNote.value = {
            title: '',
            content: '',
            date: new Date().toDateString()
        }
        addNewDialog.value = false
    }
}

// export default {
//     components: { Notes, SideNav },
//     layout: 'default',
//     data() {
//         return {
//             logoutDialog: false,
//             search: '',
//             isRecording: false,
//             sr: new Recognition(),
//             snackbar: false,
//             addNewDialog: false,
//             alertText: '',
//             allNotes: [
//                 {
//                     id: 1,
//                     title: 'This is note 1',
//                     content: 'Content for note 1',
//                     date: 'Mon Feb 14 2023'
//                 },
//                 {
//                     id: 2,
//                     title: 'This is note 2',
//                     content: 'Content for note 2',
//                     date: 'Wed June 04 2023'
//                 },
//                 {
//                     id: 3,
//                     title: 'This is note 3',
//                     content: 'Content for note 3',
//                     date: 'Thu April 24 2023'
//                 },
//                 {
//                     id: 4,
//                     title: 'This is note 4',
//                     content: 'Content for note 4',
//                     date: 'Fri Aug 04 2023'
//                 },
//             ],
//             newNote: {
//                 title: '',
//                 content: '',
//                 date: new Date().toDateString()
//             }
//         }
//     },

//     methods: {
//         filteredNotes() {
//             if (!this.allNotes || this.search == '') return this.allNotes;
//             return this.allNotes.filter((item) => {
//                 const s = this.search.toLowerCase();
//                 const t = item.title.toLowerCase()
//                 const c = item.content.toLowerCase()
//                 const d = item.date.toString()
//                 return (
//                     t.includes(s) || c.includes(s) || d.includes(s)
//                 )
//             })
//         },
//         startRecording() {
//             this.sr.continuous = true
//             this.sr.interimResults = true

//             this.sr.onstart = () => {
//                 console.log('SR started')
//                 this.isRecording = true
//             }

//             this.sr.onend = () => {
//                 console.log('SR stopped')
//                 this.isRecording = false
//             }

//             this.sr.onresult = (evt) => {
//                 // console.log(evt)
//                 const words = Array.from(evt.results)
//                     .map((item) => item[0])
//                     .map((item) => item.transcript).join('')

//                 this.newNote.content = words
//             }
//         },
//         logItem() {
//             // console.log(this.search)
//             console.log(this.filteredNotes)
//             console.log(this.filteredNotes.length)

//         },
//         toggleRecord() {
//             this.startRecording()
//             this.isRecording ? this.sr.stop() : this.sr.start()
//         },
//         saveNote(note) {
//             const index = this.allNotes.findIndex((item) => item.id === note.id)
//             console.log(index)
//             this.allNotes[index] = note
//         },
//         deleteNote(note) {
//             // console.log(note)
//             const index = this.allNotes.findIndex((item) => item.id === note.id)
//             console.log(index)
//             this.allNotes.splice(index, 1)
//         },
//         saveNewNote() {
//             if (this.newNote.title === '') {
//                 this.snackbar = true
//                 this.alertText = 'Title'
//             } else if (this.newNote.content === '') {
//                 this.snackbar = true
//                 this.alertText = 'Note content'
//             } else {
//                 this.sr.stop()
//                 this.allNotes.push(this.newNote)
//                 this.newNote = {
//                     title: '',
//                     content: ''
//                 }
//                 this.addNewDialog = false
//             }
//         },
//     }
// }
</script>

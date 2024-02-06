<template>
    <div class="tw-overflow-x-hidden">
        <div>
            <nav-bar />
        </div>

        <!-- Landing Section-->
        <section id="home" class="tw-pt-32 tw-h-screen sm:tw-h-[80vh] sm:tw-pt-44">
            <div class="tw-flex tw-text-white tw-flex-col tw-items-center tw-justify-center">
                <h1 data-aos="fade-up" data-aos-duration="600" data-aos-easing="ease-in-out"
                    class="tw-text-3xl tw-leading-[1.4rem] tw-text-center tw-font-bold md:tw-text-xl">Sculpting the
                    future<span class="tw-text-brand-primary"> Jotspace</span></h1>
                <p data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" class="tw-my-7 fira">Write and
                    organize your thoughts <span class="tw-text-brand-primary">.</span></p>
                <div class="">
                    <landing-image data-aos="zoom-in-up" data-aos-duration="1000" data-aos-easing="ease-in-out"
                        class="tw-w-[500px] tw-h-[500px] sm:tw-w-[400px] sm:tw-h-[400px]"></landing-image>
                </div>
            </div>
        </section>

        <section id="about" class="tw-pt-[10rem]">
            <div
                class="tw-w-11/12 tw-grid tw-grid-cols-2 tw-gap-x-8 tw-mt-[2rem]  tw-text-white tw-p-8 tw-mx-auto tw-bg-[#14203b] tw-rounded-xl tw-h-[500px] md:tw-grid-cols-1">
                <div data-aos="fade-up-right" data-aos-duration="700" data-aos-easing="linear"
                    class="left tw-flex tw-flex-col tw-my-auto tw-h-3/4">
                    <h3 class="tw-text-brand-primary tw-text-sm tw-mb-2 fira">Our Mission</h3>
                    <h1 class="tw-text-3xl md:tw-text-xl"><span class="tw-text-brand-primary">J</span>otloom's<span
                            class="tw-text-brand-primary"> M</span>ission</h1>
                    <p class="tw-mt-12 sm:tw-text-sm sm:tw-mt-8">Welcome to Jotloom, where simplicity meets productivity. We
                        understand
                        the importance of capturing
                        ideas effortlessly, which is why we've created a seamless note-taking experience tailored just for
                        you.</p>
                </div>
                <div data-aos="fade-up-left" data-aos-duration="700" data-aos-easing="linear" class="right">
                    <about-us-image class="tw-w-full tw-h-full md:tw-mt-6" />
                </div>
            </div>
        </section>

        <section id="features" class="tw-mt-[8rem]">
            <div class="tw-w-11/12 tw-mx-auto tw-pt-[6rem] tw-mb-8 tw-text-center">
                <h3 class="tw-text-brand-primary tw-text-sm tw-mb-2 fira tw-text-center">Features</h3>
                <h1 class="tw-text-3xl tw-text-white md:tw-text-xl"><span
                        class="tw-text-brand-primary">J</span>otloom's<span class="tw-text-brand-primary"> F</span>eatures
                </h1>
                <div class="grid tw-mt-8 tw-grid tw-grid-cols-3 tw-gap-4 tw-text-white">
                    <div data-aos="zoom-out-down" data-aos-duration="900" data-aos-easing="linear"
                        v-for="item, i in features" :key="i"
                        class="card tw-p-8 tw-outline-offset-[0.1px] tw-outline-brand-primary/75  tw-w-full tw-bg-[#14203B] tw-border-[0.1px] tw-border-[rgba(255,255,255,0.1)] hover:tw-border-brand-primary ">
                        <cross-platform v-if="i == 0" class="tw-mx-auto tw-w-[250px] tw-mb-14" />
                        <password-protection v-if="i == 1" class="tw-mx-auto tw-w-[200px]" />
                        <voice-translation v-if="i == 2" class="tw-mx-auto tw-w-[200px]" />
                        <h1 class="tw-mb-5 tw-mt-6">{{ item.title }}</h1>
                        <p class="tw-text-[#ccc] tw-leading-[1.7rem] tw-text-sm">{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" class="tw-pt-[10rem] tw-pb-[4rem]">
            <div
                class="tw-w-7/12 tw-text-center tw-mt-[2rem]  tw-text-white tw-p-8 tw-mx-auto tw-shadow-xl tw-outline-offset-[0.1px] tw-outline-brand-primary/75 tw-rounded-xl tw-h-[500px] lg:tw-w-11/12">
                <div data-aos="zoom-in-down" data-aos-duration="900" data-aos-easing="linear"
                    class="left tw-flex tw-flex-col tw-my-auto tw-h-3/4">
                    <h3 class="tw-text-brand-primary tw-text-sm tw-mb-2 fira">Contact us</h3>
                    <h1 class="tw-mb-8 tw-text-2xl tw-text-white md:tw-text-xl"><span
                            class="tw-text-brand-primary">L</span>eave a<span class="tw-text-brand-primary"> M</span>essage
                    </h1>

                    <v-form @submit.prevent="sendEmail" v-model="valid">
                        <v-text-field label="Full Name" name="name" :rules="nameRules" v-model="fullName" base-color="white"
                            rounded bg-color="rgba(0,0,0,0.01)" color="primary" required variant="outlined"
                            hide-details="auto" class="mb-6"></v-text-field>
                        <v-text-field :rules="emailRules" name="email" rounded clearable bg-color="rgba(0,0,0,0.01)"
                            base-color="white" variant="outlined" color="primary" label="Email"
                            placeholder="name@company.com" type="email" v-model="email" required hide-details="auto"
                            class="mb-6"></v-text-field>

                        <v-textarea cols="6" rounded bg-color="rgba(0,0,0,0.01)" base-color="white" variant="outlined"
                            color="primary" name="message" label="Message" placeholder="Input message" type="text"
                            v-model="message" required hide-details="auto" class="mb-6"></v-textarea>
                        <v-btn :loading="isLoading"
                            :disabled="!valid || message == '' || message == null || email === null || email == ''" rounded
                            color="primary" type="submit" width="121" height="50" block
                            class="disabled:tw-bg-slate-300 tw-text-white tw-rounded-lg tw-py-8 tw-mt-6 tw-font-bold tw-transition tw-duration-200 hover:tw-bg-gray-300"><span>Send
                                message</span></v-btn>
                    </v-form>
                </div>
            </div>
        </section>

        <footer id="footer">
            <div
                class="tw-mx-auto tw-transition-all tw-mt-[9rem] tw-w-full tw-pt-10 tw-pb-4 tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-[#14203b]">
                <div>
                    <a target="_blank" href="https://github.com/joshfransix"><v-btn icon
                            color="primary"><v-icon>mdi-github</v-icon></v-btn></a>

                    <a target="_blank" href="https://linkedin.com/in/joshfransix"><v-btn class="mx-6" icon
                            color="primary"><v-icon>mdi-linkedin</v-icon></v-btn></a>

                    <a target="_blank" href="https://joshfransix.netlify.app">
                        <v-btn icon color="primary"><span class="tw-font-bold">JF</span></v-btn>
                    </a>

                </div>

                <div class="tw-mt-4 tw-mb-5 tw-text-sm">
                    <a class="tw-text-white tw-transition-all hover:tw-text-brand-primary"
                        href="https://github.com/joshfransix">Built with 🚀
                        by Joshua Fransix</a>
                </div>

                <!-- <hr class="tw-w-10/12 tw-mt-8 tw-h-1 tw-opacity-30" /> -->
                <div class="tw-text-gray-500 tw-mt-2 tw-mb-0 tw-text-xs">
                    &copy; 2023 Jotloom
                </div>


            </div>
        </footer>

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

<script setup>
import LandingImage from '~/assets/svg/landing.vue'
import AboutUsImage from '~/assets/svg/about-us.vue'
import CrossPlatform from '~/assets/svg/cross-platform.vue'
import PasswordProtection from '~/assets/svg/password-protection.vue'
import VoiceTranslation from '~/assets/svg/voice-translation.vue'
import NavBar from '~/components/Nav/NavBar.vue'
import emailjs from 'emailjs-com';

definePageMeta({
    layout: "landing",
});

const fullName = ref(null)
const email = ref(null)
const message = ref(null)
const valid = ref(false)
const snackbar = ref(false)
const alertColor = ref('')
const alertText = ref('')

const isLoading = ref(false)

const emailRules = [
    value => {
        if (value) return true
        return 'E-mail is required.'
    },
    value => {
        if (/.+@.+\..+/.test(value)) return true
        return 'E-mail must be valid.'
    },
]

const nameRules = [

    value => {
        if (value) return true

        return 'Full name is required.'
    },
    value => {
        if (value?.length >= 5) return true

        return 'Full name must be greater than 5 characters.'
    },
]

const sendEmail = async (e) => {
    try {
        const data = {
            name: fullName.value,
            email: email.value,
            message: message.value
        }
        isLoading.value = true
        await emailjs.sendForm('service_vnn926z', 'template_07ztjak', e.target,
            'UAXYBBpkk4Gw5GgJf', {
            ...data
        })

        isLoading.value = false

        alertColor.value = 'green'
        alertText.value = 'Your message has been submitted'
        snackbar.value = true

        fullName.value = null
        email.value = null
        message.value = null

    } catch (error) {
        console.log({ error })
        isLoading.value = false
        alertText.value = error.message
        alertColor.value = 'red'
        snackbar.value = true
    }
}

const features = ref([
    {
        title: 'Cross-Platform Compatibility',
        text: `Access your notes from any device with an internet connection. Whether you\'re using a desktop, laptop, tablet, or smartphone, our web app ensures that your notes are accessible whenever and wherever you need them.`,
        icon: 'cross-platform'
    },
    {
        title: 'Password Protection',
        text: 'Keep your sensitive information secure with password protection. Assign password to account, adding an extra layer of privacy to your most confidential data.',
        icon: 'password-protection'
    },
    {
        title: 'Intuitive Voice-to-Text',
        text: `Transform your spoken thoughts into text with our intuitive voice-to-text feature. Whether you're on the move or simply prefer speaking over typing, this tool ensures that your ideas are captured accurately and efficiently. It's like having a personal transcriber right in your pocket.`,
        icon: 'voice-translation'
    },

])

</script>

<style lang="scss" scoped>
.grid {
    grid-template-columns: repeat(3, 1fr);


    @media screen and (max-width: 1190px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 739px) {
        grid-template-columns: 100%;
    }
}

.card {
    transition: all .3s ease-in-out;
    position: relative;
    border-radius: 12px;

    &:hover {
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.7);
    }
}
</style>

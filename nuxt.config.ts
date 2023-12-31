// https://nuxt.com/docs/api/configuration/nuxt-config

// import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "JotLoom - Your Creative Hub",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
        {
          hid: "description",
          name: "description",
          content: "Your Creative Hub",
        },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
    },
    pageTransition: {
      name: "page",
      mode: "out-in", // default
    },
    layoutTransition: {
      name: "page",
      mode: "out-in", // default
    },
  },
  devtools: { enabled: true },
  devServer: {
    port: 9000,
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/css/main.css",
    "~/assets/scss/main.scss",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    // async (options, nuxt) => {
    //   nuxt.hooks.hook("vite:extendConfig", (config) =>
    //     // @ts-ignore
    //     config.plugins.push(vuetify())
    //   );
    // },

    "@nuxtjs/google-fonts",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],

  plugins: [{ src: "@/plugins/aos", ssr: false, mode: "client" }],

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["definePiniaStore", "acceptHMRUpdate"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  imports: {
    dirs: ["stores"],
  },

  supabase: {
    redirect: false,
  },

  // Google fonts
  googleFonts: {
    families: {
      Poppins: true,
      Lato: true,
      "Fira+Sans": true,
    },
  },

  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
  },
});

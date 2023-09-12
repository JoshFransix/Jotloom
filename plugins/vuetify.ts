import { ThemeDefinition, createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import "@/assets/scss/abstracts/_override.scss";

const myTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#2fc7de",
    primaryLight: "#14203b",
    white: "#fff",
    secondary: "#0F172A",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  const vuetify = createVuetify({
    // your config will come here
    ssr: true,
    components: {
      ...components,
      VSkeletonLoader,
    },
    directives,
    theme: {
      defaultTheme: "myTheme",
      themes: {
        myTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myTheme = {
  dark: false,
  colors: {
    primary: "#2fc7de",
    primaryLight: "#14203b",
    white: "#fff",
    secondary: "#0F172A",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
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

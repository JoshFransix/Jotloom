import { defineStore } from "pinia";

export const useAuth = defineStore({
  id: "auth-store",
  state: () => ({
    user: null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => {
      return state.user !== null;
    },
  },

  actions: {
    SET_AUTH(payload: any) {
      this.user = payload;
    },
    SET_LOADER(payload: boolean) {
      this.isLoading = payload;
    },
  },
});

import { defineStore } from "pinia";

export const useAuth = defineStore({
  id: "auth-store",
  state: () => ({
    user: null,
    isLoading: false,
    logoutDialog: false,
    allNotes: [],
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
    SET_LOGOUT(payload: boolean) {
      this.logoutDialog = payload;
    },
    SET_NOTES(payload: any) {
      this.allNotes = payload;
    },
  },
});

import { defineStore } from "pinia";

export const useAuth = defineStore("auth-store", {
  state: () => ({
    user: null as any,
    token: null as string | null,
    isLoading: false,
    logoutDialog: false,
    allNotes: [],
  }),

  getters: {
    isAuthenticated: (state) => {
      return state.user !== null && state.token !== null;
    },
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },

  actions: {
    setAuth(user: any, token: string) {
      this.user = user;
      this.token = token;
      // Persist to localStorage
      if (process.client) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    
    clearAuth() {
      this.user = null;
      this.token = null;
      if (process.client) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    },

    loadAuthFromStorage() {
      if (process.client) {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
          this.token = token;
          this.user = JSON.parse(userStr);
        }
      }
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

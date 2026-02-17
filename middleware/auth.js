export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuth();
  
  // Load auth from localStorage on first access
  if (process.client && !authStore.token) {
    authStore.loadAuthFromStorage();
  }

  if (!authStore.isAuthenticated) {
    return navigateTo("/auth?login");
  }
});

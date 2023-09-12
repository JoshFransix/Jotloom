export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser();

  if (!user.value) {
    console.log(user.value);
    return navigateTo("/");
  } 
});

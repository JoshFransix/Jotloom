export const useAuthApi = () => {
  const { apiRequest } = useApi();
  const authStore = useAuth();

  const signUp = async (full_name: string, email: string, password: string) => {
    const data = await apiRequest('/auth/signup', {
      method: 'POST',
      body: { full_name, email, password },
    });
    
    if (data.access_token) {
      authStore.setAuth(data.user, data.access_token);
    }
    
    return data;
  };

  const login = async (email: string, password: string) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    
    if (data.access_token) {
      authStore.setAuth(data.user, data.access_token);
    }
    
    return data;
  };

  const logout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authStore.clearAuth();
    }
  };

  const getProfile = async () => {
    return await apiRequest('/auth/me');
  };

  const loginWithGoogle = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl as string;
    // Open Google OAuth in same window
    window.location.href = `${apiUrl}/auth/google`;
  };

  return {
    signUp,
    login,
    logout,  
    getProfile,
    loginWithGoogle,
  };
};

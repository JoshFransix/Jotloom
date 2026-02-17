interface RequestConfig {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiUrl as string;
  const authStore = useAuth();

  const apiRequest = async (endpoint: string, config: RequestConfig = {}) => {
    const token = authStore.getToken;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const requestConfig: RequestInit = {
      method: config.method || 'GET',
      headers,
    };

    if (config.body) {
      requestConfig.body = JSON.stringify(config.body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, requestConfig);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  };

  return {
    apiRequest,
  };
};

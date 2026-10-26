const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5001/api' : '/api');

const getHeaders = () => {
  const token = localStorage.getItem('messhub_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const api = {
  get: async (endpoint: string) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  post: async (endpoint: string, body: any) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  put: async (endpoint: string, body: any) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },
};

export const authAPI = {
  login: async (email: string, password: string, role: 'customer' | 'seller') => {
    return api.post('/auth/login', { email, password, role });
  },

  signup: async (userData: any) => {
    return api.post('/auth/register', userData);
  },

  getProfile: async () => {
    return api.get('/auth/me');
  },
};

export const messAPI = {
  getAll: async (filters: {
    search?: string;
    maxDistance?: number;
    minRating?: number;
    maxPrice?: number;
    onlyOpen?: boolean;
    foodType?: 'all' | 'veg' | 'non-veg';
  }) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.maxDistance) params.append('maxDistance', filters.maxDistance.toString());
    if (filters.minRating) params.append('minRating', filters.minRating.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.onlyOpen) params.append('onlyOpen', 'true');
    if (filters.foodType) params.append('foodType', filters.foodType);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return api.get(`/messes${queryStr}`);
  },

  getSellerMess: async () => {
    return api.get('/messes/seller/my-mess');
  },

  updateSellerMess: async (messData: any) => {
    return api.put('/messes/seller/my-mess', messData);
  },

  addReview: async (messId: string, rating: number, comment: string) => {
    return api.post(`/messes/${messId}/reviews`, { rating, comment });
  },
};

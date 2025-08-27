import axios from 'axios';

// Backend URL - Spring Boot API
const API_BASE_URL = 'http://localhost:8080';

// Development note: Ensure your Spring Boot application is running on port 8080
// and has CORS configured to allow requests from http://localhost:3000

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth token storage
let authToken = null;

// Request interceptor for adding auth token and logging
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please check your connection');
    }
    
    if (!error.response) {
      throw new Error('Network error - unable to connect to server');
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(data.message || 'Invalid request data');
      case 401:
        // Unauthorized - redirect to login or clear auth
        authToken = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Authentication required. Please log in.');
      case 403:
        throw new Error('Access forbidden. You don\'t have permission to perform this action.');
      case 404:
        throw new Error('Resource not found');
      case 409:
        throw new Error(data.message || 'Conflict - resource already exists');
      case 500:
        throw new Error('Server error - please try again later');
      default:
        throw new Error(data.message || `HTTP ${status} error`);
    }
  }
);

// API Service functions
export const apiService = {
  // Auth token management
  setAuthToken(token) {
    authToken = token;
  },

  clearAuthToken() {
    authToken = null;
  },

  getAuthToken() {
    return authToken;
  },

  // Authentication endpoints
  async login(credentials) {
    try {
      const response = await api.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async signup(userData) {
    try {
      const response = await api.post('/api/auth/signup', userData);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await api.post('/api/auth/logout');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      // Don't throw error for logout - it's optional
      return false;
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Milestone endpoints (user-specific)
  async getAllMilestones() {
    try {
      const response = await api.get('/api/milestones');
      return response.data;
    } catch (error) {
      console.error('Error fetching milestones:', error);
      throw error;
    }
  },

  async getMilestoneById(id) {
    try {
      const response = await api.get(`/api/milestones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching milestone ${id}:`, error);
      throw error;
    }
  },

  async createMilestone(milestoneData) {
    try {
      const response = await api.post('/api/milestones', milestoneData);
      return response.data;
    } catch (error) {
      console.error('Error creating milestone:', error);
      throw error;
    }
  },

  async updateMilestone(id, milestoneData) {
    try {
      const response = await api.put(`/api/milestones/${id}`, milestoneData);
      return response.data;
    } catch (error) {
      console.error(`Error updating milestone ${id}:`, error);
      throw error;
    }
  },

  async deleteMilestone(id) {
    try {
      await api.delete(`/api/milestones/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting milestone ${id}:`, error);
      throw error;
    }
  },

  async toggleMilestoneComplete(id, completed) {
    try {
      // Get the current milestone first
      const milestone = await this.getMilestoneById(id);
      
      // Update with new completion status
      const updatedData = {
        title: milestone.title,
        description: milestone.description,
        achieveDate: milestone.achieveDate,
        completed,
        completedDate: completed ? new Date().toISOString().split('T')[0] : null
      };
      
      const response = await api.put(`/api/milestones/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error toggling milestone ${id} completion:`, error);
      throw error;
    }
  },

  async getMilestoneStats() {
    try {
      const response = await api.get('/api/milestones/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching milestone stats:', error);
      throw error;
    }
  }
};

export default apiService;
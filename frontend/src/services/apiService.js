import axios from 'axios';

// Backend URL - Spring Boot API
const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
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
      case 404:
        throw new Error('Milestone not found');
      case 500:
        throw new Error('Server error - please try again later');
      default:
        throw new Error(data.message || `HTTP ${status} error`);
    }
  }
);

// API Service functions
export const apiService = {
  // Get all milestones
  async getAllMilestones() {
    try {
      const response = await api.get('/milestones');
      return response.data;
    } catch (error) {
      console.error('Error fetching milestones:', error);
      throw error;
    }
  },

  // Get milestone by ID
  async getMilestoneById(id) {
    try {
      const response = await api.get(`/milestones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching milestone ${id}:`, error);
      throw error;
    }
  },

  // Create new milestone
  async createMilestone(milestoneData) {
    try {
      const response = await api.post('/milestones', milestoneData);
      return response.data;
    } catch (error) {
      console.error('Error creating milestone:', error);
      throw error;
    }
  },

  // Update existing milestone
  async updateMilestone(id, milestoneData) {
    try {
      const response = await api.put(`/milestones/${id}`, milestoneData);
      return response.data;
    } catch (error) {
      console.error(`Error updating milestone ${id}:`, error);
      throw error;
    }
  },

  // Delete milestone
  async deleteMilestone(id) {
    try {
      await api.delete(`/milestones/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting milestone ${id}:`, error);
      throw error;
    }
  },

  // Toggle milestone completion status
  async toggleMilestoneComplete(id, completed) {
    try {
      const milestone = await this.getMilestoneById(id);
      const updatedData = {
        ...milestone,
        completed,
        completedDate: completed ? new Date().toISOString().split('T')[0] : null
      };
      
      const response = await api.put(`/milestones/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error toggling milestone ${id} completion:`, error);
      throw error;
    }
  }
};

export default apiService;
import axios, { AxiosInstance } from 'axios';
import { Retard } from './api.interfaces';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: '/api',  // Utilisez le chemin relatif pour le proxy
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  }

  // Retard endpoints
  async getRetards(): Promise<Retard[]> {
    try {
      const response = await this.api.get('/retard');
      console.log('API Response:', response.data);
      
      if (Array.isArray(response.data)) {
        return response.data.map((item: any) => item.props);
      } else {
        console.error('Unexpected response structure:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching retards:', error);
      throw error;
    }
  }

  async createRetard(retardData: Omit<Retard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Retard> {
    try {
      const response = await this.api.post('/retard', retardData);
      return response.data;
    } catch (error) {
      console.error('Error creating retard:', error);
      throw error;
    }
  }

  async getRetardByEtudiantId(etudiantId: number): Promise<Retard[]> {
    try {
      const response = await this.api.get(`/retard/${etudiantId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching retards for student ${etudiantId}:`, error);
      throw error;
    }
  }

  async updateRetard(id: string, retardData: Partial<Retard>): Promise<Retard> {
    try {
      const response = await this.api.patch(`/retard/${id}`, retardData);
      return response.data;
    } catch (error) {
      console.error(`Error updating retard ${id}:`, error);
      throw error;
    }
  }

  async deleteRetard(id: string): Promise<void> {
    try {
      await this.api.delete(`/retard/${id}`);
    } catch (error) {
      console.error(`Error deleting retard ${id}:`, error);
      throw error;
    }
  }
}

export const apiService = new ApiService();

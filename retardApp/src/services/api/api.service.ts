import axios, { AxiosInstance } from 'axios';
import { Retard } from './api.interfaces';
import { Absence } from './api.interfaces';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: '/api',  //chemin relatif pour le proxy || probleme avec cors
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

  //////////absences endpoints
  async getAbsences(): Promise<Absence[]> {
    try {
      const response = await this.api.get('/abs');
      console.log('API Response:', response.data);
      
      if (Array.isArray(response.data)) {
        return response.data.map((item: any) => item.props);
      } else {
        console.error('Unexpected response structure:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching absences:', error);
      throw error;
    }
  }

  async createAbsence(absenceData: Omit<Absence, 'id' | 'createdAt' | 'updatedAt'>): Promise<Absence> {
    try {
      const response = await this.api.post('/abs', absenceData);
      return response.data;
    } catch (error) {
      console.error('Error creating absence:', error);
      throw error;
    }
  }

  async getAbsenceByEtudiantId(etudiantId: number): Promise<Absence[]> {
    try {
      const response = await this.api.get(`/abs/${etudiantId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching absences for student ${etudiantId}:`, error);
      throw error;
    }
  }

  async updateAbsence(id: string, absenceData: Partial<Absence>): Promise<Absence> {
    try {
      const response = await this.api.patch(`/abs/${id}`, absenceData);
      return response.data;
    } catch (error) {
      console.error(`Error updating absence ${id}:`, error);
      throw error;
    }
  }

  async deleteAbsence(id: string): Promise<void> {
    try {
      await this.api.delete(`/abs/${id}`);
    } catch (error) {
      console.error(`Error deleting absence ${id}:`, error);
      throw error;
    }
  }
}

export const apiService = new ApiService();

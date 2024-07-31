// api.service.ts
import axios, { AxiosInstance } from 'axios';
import { Retard } from './api.interfaces';
import { Absence } from './api.interfaces';
import { Course } from '../apiCours/apiCours.interfaces';

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
  
  async getAbsencesByEtudiantId(etudiantId: number): Promise<Absence[]> {
    try {
      const response = await this.api.get(`/abs/${etudiantId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching absences for student ${etudiantId}:`, error);
      throw error;
    }
  }

  async getJustifiedAbsences(etudiantId: number): Promise<Absence[]> {
    try {
      const absences = await this.getAbsencesByEtudiantId(etudiantId);
      return absences.filter(absence => absence.isJustified);
    } catch (error) {
      console.error(`Error fetching justified absences for student ${etudiantId}:`, error);
      throw error;
    }
  }

  async getUnjustifiedAbsences(etudiantId: number): Promise<Absence[]> {
    try {
      const absences = await this.getAbsencesByEtudiantId(etudiantId);
      return absences.filter(absence => !absence.isJustified);
    } catch (error) {
      console.error(`Error fetching unjustified absences for student ${etudiantId}:`, error);
      throw error;
    }
  }


  async markStudentAsAbsent(course: Course, etudiantId: number): Promise<Absence> {
    const now = new Date().toISOString();
    const missedHours = Math.round((new Date(course.date_fin).getTime() - new Date(course.date_debut).getTime()) / (1000 * 60 * 60));
    
    const absenceData = {
      absence_id: `ABS-${Date.now()}`,
      annee_id: 2024,
      etudiant_id: etudiantId,
      structure_id: course.id,
      date_debut: new Date(course.date_debut).toISOString(), // Ensure ISO-8601 format
      date_fin: new Date(course.date_fin).toISOString(), // Ensure ISO-8601 format
      isJustified: false,
      missedHours: missedHours,
      missedLectures: [course.cours_id],
      studentHyperPlanningKey: `KEY-${etudiantId}`
    };

    try {
      const response = await this.createAbsence(absenceData);
      console.log('Student marked as absent');
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        console.error('Status:', error.response?.status);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
        console.error('Headers:', error.response?.headers);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  async createAbsence(absenceData: Omit<Absence, 'id' | 'createdAt' | 'updatedAt'>): Promise<Absence> {
    console.log('Sending absence data:', JSON.stringify(absenceData, null, 2));
    
    try {
      const response = await this.api.post('/abs', absenceData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        console.error('Status:', error.response?.status);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
        console.error('Headers:', error.response?.headers);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  // Retard endpoints

  async createRetard(retardData: Omit<Retard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Retard> {
    
    try {
      const response = await this.api.post('/retard', retardData);
      return response.data;
    } catch (error) {
      console.error('Error creating retard:', error);
      throw error;
    }
  }

  async getRetardByEtudiantId(etudiantId: number): Promise<Retard> {
    try {
      const response = await this.api.get(`/retard/${etudiantId}`);
      return response.data.props;  // Retourne les propriétés du retard
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

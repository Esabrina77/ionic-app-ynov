// api.service.ts
import axios, { AxiosInstance } from 'axios';
import { Retard } from './api.interfaces';
import { Absence } from './api.interfaces';
import { Course } from '../apiCours/apiCours.interfaces';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: '/api',  // le chemin relatif pour le proxy
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  }

  async submitJustification(justificationData: any): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('absenceId', justificationData.absenceId);
      formData.append('reason', justificationData.reason);
      justificationData.files.forEach((file: File, index: number) => {
        formData.append(`file${index}`, file);
      });
  
      console.log("ABSENCE JUSTIFIEE EN COURS DE TRAITEMENT");
      
      // Mettre à jour l'absence pour la marquer comme justifiée
      await this.updateAbsence(justificationData.absenceId, { isJustified: true });
        // Si vous avez toujours besoin d'envoyer des données supplémentaires
      // await this.api.post('/justification', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
  
      console.log("Justification submitted successfully");
    } catch (error) {
      console.error('Error submitting justification:', error);
      throw error;
    }
  }

  async updateAbsence(absenceId: string, updateData: Partial<Absence>): Promise<Absence> {
    try {
      // Récupérer d'abord les données complètes de l'absence
      const currentAbsence = await this.getAbsenceById(absenceId);
      
      // Fusionner les données actuelles avec les mises à jour
      const updatedAbsence = { ...currentAbsence, ...updateData };
      
      // Envoyer la requête PATCH avec toutes les données
      const response = await this.api.patch(`/abs/${absenceId}`, updatedAbsence);
      return response.data.props;
    } catch (error) {
      console.error(`Error updating absence ${absenceId}:`, error);
      throw error;
    }
  }
  
  async getAbsenceById(absenceId: string): Promise<Absence> {
    try {
      const response = await this.api.get(`/abs/${absenceId}`);
      return response.data.props;
    } catch (error) {
      console.error(`Error fetching absence ${absenceId}:`, error);
      throw error;
    }
  }
  


  async getAbsencesByEtudiantId(etudiantId: number): Promise<Absence[]> {
    try {
      const response = await this.api.post(`/abs/${etudiantId}`);
      if (Array.isArray(response.data)) {
        return response.data.map(item => item.props);
      } else {
        throw new Error('Invalid response format');
      }
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
    
    // Créer un ID unique basé sur le cours et les dates
    const absenceId = `ABS-${course.id}-${new Date(course.date_debut).toISOString()}-${new Date(course.date_fin).toISOString()}`;
  
    const absenceData = {
      absence_id: absenceId,
      annee_id: 2024,
      etudiant_id: etudiantId,
      structure_id: course.id,
      date_debut: new Date(course.date_debut).toISOString(),
      date_fin: new Date(course.date_fin).toISOString(),
      isJustified: false,
      missedHours: missedHours,
      missedLectures: [course.cours_id],
      studentHyperPlanningKey: `KEY-${etudiantId}`
    };
  
    try {
      // Vérif si une absence existe déjà pour ce cours et cet étudiant
      const existingAbsence = await this.getAbsenceByIdAndEtudiantId(absenceId, etudiantId);
      
      if (existingAbsence) {
        console.log('Absence already exists for this course and student');
        return existingAbsence;
      }
  
      // Si aucune absence n'existe, créer-en une nouvelle
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
  async getAbsenceByIdAndEtudiantId(absenceId: string, etudiantId: number): Promise<Absence | null> {
    try {
      const response = await this.api.get(`/abs/${absenceId}/${etudiantId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Si l'absence n'existe pas, retournez null
        return null;
      }
      console.error(`Error fetching absence ${absenceId} for student ${etudiantId}:`, error);
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

  async getRetardByEtudiantId(etudiantId: number): Promise<Retard[]> {
    try {
      const response = await this.api.post(`/retard/${etudiantId}`);
      if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].props) {
        return response.data.map(item => item.props);
      } else {
        throw new Error('Invalid response format');
      }
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

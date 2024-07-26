// src/services/api/api.interfaces.ts

export interface Retard {
    id: string;
    retard_id: string;
    annee_id: number;
    etudiant_id: number;
    structure_id: string;
    date_debut: string;
    date_fin: string;
    isJustified: boolean;
    missedHours: number;
    missedLectures: string[];
    studentHyperPlanningKey: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Absence {
    id: string;
    absence_id: string;
    annee_id: number;
    etudiant_id: number;
    structure_id: string;
    date_debut: string;
    date_fin: string;
    isJustified: boolean;
    missedHours: number;
    missedLectures: string[];
    studentHyperPlanningKey: string;
    createdAt: string;
    updatedAt: string;
  }
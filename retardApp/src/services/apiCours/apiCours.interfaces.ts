// src/services/apiCours/apiCours.interfaces.ts

export interface Course {
    id: string;
    cours_id: string;
    date_debut: string;
    date_fin: string;
    salle: string;
    prof: string;
    description: string;
  }
  
  export interface CourseData {
    courses: Course[];
  }
  
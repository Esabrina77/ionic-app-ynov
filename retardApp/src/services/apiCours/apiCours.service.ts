// src/services/apiCours/apiCours.service.ts
import { CourseData, Course } from './apiCours.interfaces';
import courseData from './data.json';

class ApiCoursService {
  getCourseData(): CourseData {
    return courseData as CourseData;
  }


  checkIfRetard(): boolean {
    const now = new Date();
    const currentDay = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);

    return this.getCourseData().courses.some(course => {
      const courseDate = course.date_debut.split('T')[0];
      const courseStartTime = course.date_debut.split('T')[1].slice(0, 5);
      return courseDate === currentDay && currentTime > courseStartTime;
    });
  }

  checkIfScanValid(): boolean {
    const now = new Date();
    const currentDay = now.toISOString().split('T')[0];
    const currentTime = now.toISOString();

    return this.getCourseData().courses.some(course => {
      const courseDate = course.date_debut.split('T')[0];
      const courseStartTime = new Date(course.date_debut).toISOString();
      const timeDifference = (new Date(currentTime).getTime() - new Date(courseStartTime).getTime()) / (1000 * 60); // Différence en minutes

      return courseDate === currentDay && timeDifference <= 30;
    });
  }
  getCurrentCourse(): Course | null {
    const now = new Date();
    const currentDay = now.toISOString().split('T')[0];
    const currentTime = now.toISOString();

    return this.getCourseData().courses.find(course => {
      const courseDate = course.date_debut.split('T')[0];
      const courseStartTime = new Date(course.date_debut).toISOString();
      const courseEndTime = new Date(course.date_fin).toISOString();
      return courseDate === currentDay && currentTime >= courseStartTime && currentTime <= courseEndTime;
    }) || null;
  }

  calculateRetardDuration(): number {
    const currentCourse = this.getCurrentCourse();
    if (!currentCourse) return 0;

    const now = new Date();
    const courseStartTime = new Date(currentCourse.date_debut);
    const timeDifference = (now.getTime() - courseStartTime.getTime()) / (1000 * 60); // Différence en minutes

    return Math.max(0, Math.round(timeDifference));
  }
}

export const apiCoursService = new ApiCoursService();

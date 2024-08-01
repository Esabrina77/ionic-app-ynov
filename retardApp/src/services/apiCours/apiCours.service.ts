import { CourseData, Course } from './apiCours.interfaces';
import courseData from './data.json';

class ApiCoursService {
  getCourseData(): CourseData {
    return courseData as CourseData;
  }

  checkIfCurrentCourseEnded(): boolean {
    const now = new Date();
    const currentCourse = this.getCurrentCourse();
    if (!currentCourse) return false;
  
    const courseEndTime = new Date(currentCourse.date_fin);
    return now > courseEndTime;
  }
  
  checkIfRetard(): { isRetard: boolean; nextCourse: Course | null } {
    const now = new Date();
    const currentDay = now.toISOString().split('T')[0];
  
    const nextCourse = this.getCourseData().courses.find(course => {
      const courseDate = new Date(course.date_debut).toISOString().split('T')[0];
      const courseStartTime = new Date(course.date_debut);
      return courseDate === currentDay && courseStartTime > now;
    });
  
    if (!nextCourse) return { isRetard: false, nextCourse: null };
  
    const courseStartTime = new Date(nextCourse.date_debut);
    const isRetard = now > courseStartTime;
  
    return { isRetard, nextCourse };
  }
  
  checkIfScanValid(): { isValid: boolean; course: Course | null } {
    const now = new Date();
    const currentDay = now.toISOString().split('T')[0];
  
    const currentCourse = this.getCourseData().courses.find(course => {
      const courseDate = new Date(course.date_debut).toISOString().split('T')[0];
      const courseStartTime = new Date(course.date_debut);
      const courseEndTime = new Date(course.date_fin);
      return courseDate === currentDay && now >= courseStartTime && now <= courseEndTime;
    });
  
    if (!currentCourse) return { isValid: false, course: null };
  
    const timeDifference = (now.getTime() - new Date(currentCourse.date_debut).getTime()) / (1000 * 60);
    const isValid = timeDifference <= 30;
  
    return { isValid, course: currentCourse };
  }
  
  getCurrentCourse(): Course | null {
    const now = new Date();
    const currentDay = now.toISOString().split('T')[0];

    return this.getCourseData().courses.find(course => {
      const courseDate = new Date(course.date_debut).toISOString().split('T')[0];
      const courseStartTime = new Date(course.date_debut);
      const courseEndTime = new Date(course.date_fin);
      return courseDate === currentDay && now >= courseStartTime && now <= courseEndTime;
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

// src/types/course.ts
export interface Course {
    id: string; // or optional if backend always sends _id only
  _id: string; // ✅ Add this
  title: string;
  description: string;
  image: string;
  category: string;
  instructor: string;
  price: number;
  duration: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface BookCoursePayload {
  userId: string;
  courseId: string;
  preferredSchedule: string; // ✅ added this field
}

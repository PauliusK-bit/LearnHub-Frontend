import { Role } from "../config/roles";

export interface User {
  username: string;
  password: string;
  email: string;
  role: Role;
}

export interface DecodedToken extends User {
  exp: number;
}

export interface Category {
  name: string;
  description: string;
  _id: string;
}

export interface CategoryProps {
  data: Category;
}

export interface Subject {
  name: string;
  description: string;
  _id?: string;
}

export interface SubjectProps {
  data: Subject;
}

export interface Student {
  name: string;
  email: string;
  password: string;
  _id: string;
}

export interface StudentProps {
  data: Student;
}

export interface Lecturer {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface LecturerProps {
  data: Lecturer;
}

export interface Activity {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
}

export interface ActivityProps {
  data: Activity;
}

export interface Video {
  title: string;
  level: string;
  videoUrl: string;
  _id: string;
}

export interface Group {
  name: string;
  _id: string;
}

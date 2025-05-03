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
}

export interface CategoryProps {
  data: Category;
}

export interface Subject {
  name: string;
  description: string;
  id: string;
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

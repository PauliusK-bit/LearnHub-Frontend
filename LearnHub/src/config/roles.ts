const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  STUDENT: "STUDENT",
  LECTURER: "LECTURER",
} as const;

export type Role = keyof typeof ROLES;

export default ROLES;

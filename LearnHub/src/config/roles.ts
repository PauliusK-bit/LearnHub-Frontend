const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  STUDENT: "STUDENT",
  LECTURER: "LECTURER",
} as const;

export type Roles = keyof typeof ROLES;

export default ROLES;

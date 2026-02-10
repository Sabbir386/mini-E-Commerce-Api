export const USER_ROLE = {
  admin: 'admin',
  customer: 'customer',
} as const;

export type TUserRole = "admin" | "customer";

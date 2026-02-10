export type TUserRole = "admin" | "customer";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
}

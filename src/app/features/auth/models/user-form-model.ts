export interface UserFormModel {
  name: string;
  username: string;
  email: string;
  birthDate: Date | null;
  password: string;
  repeatedPassword: string;
}
export interface User {
  id: number;
  password: string;
  name: string;
  username: string;
  email: string;
  role: string;
  accessToken?: string;
}

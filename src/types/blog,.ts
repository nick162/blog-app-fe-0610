import { User } from "./user";

export interface Blog {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  category: string;
  userId: number;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  user?: User;
}

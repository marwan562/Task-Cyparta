export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;  
    bio?: string | null;    
    is_superuser: boolean;
    is_staff: boolean;
    image: string;
    cover: string;
    message: string;
    status: number;
  }

export type TUpdateUser = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | undefined;
  bio?: string | undefined;
};

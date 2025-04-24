// types.ts
export interface User {
  userId: number;
  Username: string;
  cognitoID: string;
  email: string;
}



// api/users.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/php-project/api';

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_BASE_URL}/get_users.php`);
  return response.data;
};

export const getUserById = async (cognitoId: string): Promise<User> => {
  const response = await axios.get<User>(`${API_BASE_URL}/get_user.php`, {
    params: { cognitoId },
  });
  return response.data;
};

export const createUser = async (username: string, cognitoID: string, email: string): Promise<User> => {
  const response = await axios.post<User>(`${API_BASE_URL}/create_user.php`, {
    Username: username,
    CognitoId: cognitoID,
    Email: email
  });
  return response.data;
};

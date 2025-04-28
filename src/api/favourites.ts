// types.ts
export interface Favourites {
  userId: number;
  cognitoId: string;
  favGenres: string;
  favArtists: string;
  favAlbums: string;
}
// api/favourites.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/php-project/api';

export const getFavourites = async (cognitoId: number): Promise<Favourites> => {
  console.log(`Fetching favourites for cognitoId: ${cognitoId}`);
  const response = await axios.get<Favourites>(`${API_BASE_URL}/get_favourites.php`, {
    params: { cognitoId },
  });
  console.log('Favourites response:', response.data);
  return response.data;
};

export const addFavourites = async (data: Favourites): Promise<{ success: boolean; message?: string }> => {
  console.log(`Adding favourites for userId: ${data.userId}`);
  const response = await axios.post(`${API_BASE_URL}/add_favourites.php`, data);
  console.log('Add favourites response:', response.data);
  return response.data;
};
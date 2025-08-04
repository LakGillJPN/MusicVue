export interface AlbumData {
  userId: number | null;
  albums: string[] | null;
}

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/php-project/api';

const addAlbums = async (data: AlbumData): Promise<{ message?: string; error?: string }> => {
  console.log(`Adding albums for userId: ${data.userId}`);
  const response = await axios.post(`${API_BASE_URL}/add_albums.php`, data);
  console.log('Add albums response:', response.data);
  return response.data;
};

const deleteAlbums = async (data: AlbumData): Promise<{ message?: string; error?: string }> => {
  console.log(`Deleting albums for userId: ${data.userId}`);
  const response = await axios.post(`${API_BASE_URL}/delete_albums.php`, data);
  console.log('Delete albums response:', response.data);
  return response.data;
};

const getAlbums = async (userId: number): Promise<{ favourites?: string[]; error?: string }> => {
  console.log(`Fetching albums for userId: ${userId}`);
  const response = await axios.post(`${API_BASE_URL}/get_albums.php`, { userId });
  console.log('Get albums response:', response.data);
  return response.data;
};

export { addAlbums, deleteAlbums, getAlbums };


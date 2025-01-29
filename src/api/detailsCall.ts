import axios from 'axios';

interface ApiCallParams {
  master: number;
}

const consumerKey = import.meta.env.VITE_CONSUMER_KEY;
const consumerSecret = import.meta.env.VITE_CONSUMER_SECRET;
const userAgent = import.meta.env.VITE_USER_AGENT;

const detailsCall = async ({ master }: ApiCallParams) => {
  try {
    const apiURL = `https://api.discogs.com/masters/${master}`;
    const response = await axios.get(apiURL , {
        headers: {
            "User-Agent": `${userAgent}`,
            "Authorization" : `Discogs key=${consumerKey}, secret=${consumerSecret}`
        }
    });
    return response.data; 
  } catch (error) {
    console.error('Error making API call:', error);
    throw error;
  }
};

export default detailsCall;

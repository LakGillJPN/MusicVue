import axios from 'axios';

interface ApiCallParams {
  query: string;
}

const consumerKey = "uoroGlrtdwvDrnoEUCUb"
const consumerSecret = "yeFyfkiezhJELRIcGfkTynuQrxrZgoeE"

const apiCall = async ({ query }: ApiCallParams) => {
  try {
    console.log("QUERY", query)
    const apiURL = `https://api.discogs.com/database/search?format=album&artist=${query}`;
    const response = await axios.get(apiURL , {
        headers: {
            "User-Agent": "vue-test",
            "Authorization" : `Discogs key=${consumerKey}, secret=${consumerSecret}`
        }
    });
    return response.data; 
  } catch (error) {
    console.error('Error making API call:', error);
    throw error;
  }
};

export default apiCall;

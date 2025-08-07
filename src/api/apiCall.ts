import axios from 'axios';

interface ApiCallParams {
  query: string;
  maxPages?: number; // Optional: default to 10
}

const consumerKey = import.meta.env.VITE_CONSUMER_KEY;
const consumerSecret = import.meta.env.VITE_CONSUMER_SECRET;
const userAgent = import.meta.env.VITE_USER_AGENT;

const apiCall = async ({ query, maxPages = 10 }: ApiCallParams) => {
  const perPage = 100;
  let allResults: any[] = [];
  let currentPage = 1;

  try {
    while (currentPage <= maxPages) {
      const apiURL = `https://api.discogs.com/database/search?format=album&artist=${encodeURIComponent(query)}&per_page=${perPage}&page=${currentPage}`;
      console.log(`🔄 Fetching page ${currentPage}...`);

      const response = await axios.get(apiURL, {
        headers: {
          "User-Agent": userAgent,
          "Authorization": `Discogs key=${consumerKey}, secret=${consumerSecret}`
        }
      });

      const results = response.data.results;
      allResults = allResults.concat(results);

      console.log(`✅ Received ${results.length} results from page ${currentPage}`);

      if (results.length < perPage) {
        console.log("🚫 No more pages — ending early.");
        break;
      }

      currentPage++;
    }

    console.log(`📦 Total results fetched: ${allResults.length}`);
    return allResults;

  } catch (error) {
    console.error('❌ Error making API call:', error);
    throw error;
  }
};

export default apiCall;

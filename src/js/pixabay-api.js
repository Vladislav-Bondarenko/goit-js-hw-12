import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '49317113-6ec0477c2a8a63e568c804eb9';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });

    if (response.data.hits.length === 0) {
      throw new Error('No images found');
    }

    return {
      images: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
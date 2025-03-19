import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
      backgroundColor: '#ffc107',
      theme: 'dark',
      progressBarColor: '#ffd54f',
      timeout: 3000
    });
    return;
  }

  gallery.innerHTML = '';
  showLoader();

  try {
    const [images] = await Promise.all([
      fetchImages(query),
      new Promise(resolve => setTimeout(resolve, 500))
    ]);

    if (images.length === 0) {
      showErrorNotification();
      input.classList.add('error');
      setTimeout(() => input.classList.remove('error'), 1000);
    } else {
      renderGallery(images);
    }
  } catch (error) {
    showErrorNotification();
    input.classList.add('error');
    setTimeout(() => input.classList.remove('error'), 1000);
  } finally {
    hideLoader();
  }
});

function showErrorNotification() {
  iziToast.error({
    title: 'Error',
    message: 'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
    backgroundColor: '#ff4444',
    theme: 'dark',
    progressBarColor: '#ff6666',
    timeout: 5000,
    displayMode: 2,
    layout: 2
  });
}
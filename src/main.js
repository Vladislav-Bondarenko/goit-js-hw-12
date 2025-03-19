import { fetchImages } from './js/pixabay-api.js';
import { 
  renderGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreBtn, 
  hideLoadMoreBtn, 
  showEndMessage, 
  hideEndMessage,
  smoothScroll
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const gallery = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  
  currentQuery = input.value.trim();
  if (!currentQuery) {
    showWarningNotification('Please enter a search term!');
    return;
  }

  currentPage = 1;
  hideLoadMoreBtn();
  hideEndMessage();
  gallery.innerHTML = '';
  showLoader();

  try {
    const { images, totalHits: total } = await fetchImages(currentQuery, currentPage);
    totalHits = total;
    
    renderGallery(images);
    checkLoadMoreVisibility(images.length, totalHits);
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
});

document.querySelector('.load-more').addEventListener('click', async () => {
  showLoader();
  hideLoadMoreBtn(); 
  currentPage += 1;
  
  try {
    const { images } = await fetchImages(currentQuery, currentPage);
    renderGallery(images, true);
    smoothScroll();
    checkLoadMoreVisibility(images.length, totalHits);
  } catch (error) {
    handleError(error);
    showLoadMoreBtn(); 
  } finally {
    hideLoader();
  }
});

function checkLoadMoreVisibility(currentCount, total) {
  const totalLoaded = currentPage * 15;
  if (totalLoaded >= total) {
    hideLoadMoreBtn();
    showEndMessage();
  } else {
    showLoadMoreBtn();
    hideEndMessage();
  }
}

function handleError(error) {
  if (error.message === 'No images found') {
    showErrorNotification('Sorry, there are no images matching your search query. Please try again!');
  } else {
    showErrorNotification(error.message);
  }
  input.classList.add('error');
  setTimeout(() => input.classList.remove('error'), 1000);
}

function showWarningNotification(message) {
  iziToast.warning({
    title: 'Warning',
    message: message,
    position: 'topRight',
    backgroundColor: '#ffc107',
    theme: 'dark',
    progressBarColor: '#ffd54f',
    timeout: 3000
  });
}

function showErrorNotification(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    backgroundColor: '#ff4444',
    theme: 'dark',
    progressBarColor: '#ff6666',
    timeout: 5000,
    displayMode: 2,
    layout: 2
  });
}

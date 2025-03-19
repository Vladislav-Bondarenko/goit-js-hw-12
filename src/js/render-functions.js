import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

export function showEndMessage() {
  endMessage.style.display = 'block';
}

export function hideEndMessage() {
  endMessage.style.display = 'none';
}

export function renderGallery(images, append = false) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${likes}</p>
          <p><b>Views</b> ${views}</p>
          <p><b>Comments</b> ${comments}</p>
          <p><b>Downloads</b> ${downloads}</p>
        </div>
      </li>`
    )
    .join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }

  lightbox.refresh();
}

export function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    ?.getBoundingClientRect() || { height: 0 };

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
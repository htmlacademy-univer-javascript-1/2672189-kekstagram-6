import { openBigPicture } from './big-picture.js';

export function renderPicture(photo, template, container) {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;

  element.addEventListener('click', () => {
    openBigPicture(photo);
  });

  container.appendChild(element);
}

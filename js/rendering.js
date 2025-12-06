import { openBigPicture } from './big-picture.js';

export function renderThumbnails(photos) {
  const container = document.getElementById('pictures-container');
  const template = document.getElementById('picture').content;
  const fragment = document.createDocumentFragment();

  photos.forEach(photo => {
    const element = template.cloneNode(true);
    const link = element.querySelector(".picture");
    const img = element.querySelector(".picture__img");
    const likes = element.querySelector(".picture__likes");
    const comments = element.querySelector(".picture__comments");

    img.src = photo.url;
    img.alt = photo.description;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;

    link.addEventListener("click", (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.appendChild(element);
  });

  container.appendChild(fragment);
}

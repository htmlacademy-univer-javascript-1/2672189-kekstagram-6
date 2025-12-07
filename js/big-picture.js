import { isEscapeKey } from './utils.js';

const COMMENTS_PER_PAGE = 5;
let currentPhoto = null;
let shownComments = 0;

const bigPictureModal = document.getElementById('big-picture');
const bigPictureImage = document.getElementById('big-picture-image');
const likesCount = document.querySelector('.likes-count');
const commentsTotal = document.querySelector('.comments-total');
const commentsShown = document.querySelector('.comments-shown');
const socialCaption = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = document.getElementById('big-picture-close');

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img class="social__picture"
         src="${comment.avatar}"
         alt="${comment.name}"
         width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;

  return commentElement;
};

const showNextComments = () => {
  const comments = currentPhoto.comments;
  const nextComments = comments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);

  nextComments.forEach(comment => {
    socialComments.appendChild(createCommentElement(comment));
  });

  shownComments += nextComments.length;
  commentsShown.textContent = shownComments;

  if (shownComments >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

export function openBigPicture(photo) {
  currentPhoto = photo;
  shownComments = 0;

  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsTotal.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  socialComments.innerHTML = '';

  document.querySelector('.social__comment-count').classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  showNextComments();

  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  commentsLoader.addEventListener('click', showNextComments);
}

export function closeBigPicture() {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);
  commentsLoader.removeEventListener('click', showNextComments);
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

closeButton.addEventListener('click', closeBigPicture);

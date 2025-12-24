// big-picture.js
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

// Создание элемента комментария
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

// Показать следующую порцию комментариев
const showNextComments = () => {
  const comments = currentPhoto.comments;
  const nextComments = comments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);

  nextComments.forEach(comment => {
    socialComments.appendChild(createCommentElement(comment));
  });

  shownComments += nextComments.length;
  commentsShown.textContent = shownComments;

  // Скрыть кнопку "Загрузить ещё", если все комментарии показаны
  if (shownComments >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

// Открытие модального окна с фотографией
export function openBigPicture(photo) {
  currentPhoto = photo;
  shownComments = 0;

  // Заполняем данные
  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsTotal.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  // Очищаем список комментариев
  socialComments.innerHTML = '';

  // Показываем элементы управления комментариями
  document.querySelector('.social__comment-count').classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Показываем первую порцию комментариев
  showNextComments();

  // Открываем модальное окно
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляем обработчики
  document.addEventListener('keydown', onEscKeydown);
  commentsLoader.addEventListener('click', showNextComments);
}

// Закрытие модального окна
export function closeBigPicture() {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчики
  document.removeEventListener('keydown', onEscKeydown);
  commentsLoader.removeEventListener('click', showNextComments);
}

// Обработчик Escape
function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

// Обработчик клика на кнопку закрытия
closeButton.addEventListener('click', closeBigPicture);

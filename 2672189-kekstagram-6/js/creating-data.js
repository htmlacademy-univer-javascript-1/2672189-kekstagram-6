import { getRandomInteger, getRandomArrayElement } from './utils.js';
import { PHOTO_COUNT, NAMES, DESCRIPTIONS, MESSAGES } from './const.js';

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(1, 5) }, (_, index) =>
    createComment(index + 1)
  ),
});

const createPhotos = () => Array.from({ length: PHOTO_COUNT }, (_, index) =>
  createPhotoDescription(index + 1)
);

export { createPhotos };

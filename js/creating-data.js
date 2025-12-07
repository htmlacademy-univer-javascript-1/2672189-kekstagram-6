import { NAMES, MESSAGES } from './const.js';

export function createPhotos() {
  return Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    likes: Math.floor(Math.random() * 200),
    description: `Описание фото №${i + 1}`,
    comments: Array.from({ length: Math.floor(Math.random() * 25) + 5 }, () => ({
      avatar: `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`,
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    }))
  }));
}

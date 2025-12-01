export function createPhotos() {
  return Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    likes: Math.floor(Math.random() * 200),
    description: `Описание фото №${i + 1}`,
    comments: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
      avatar: 'photos/1.jpg',
      name: 'Пользователь',
      message: 'Какой красивый кадр!'
    }))
  }));
}

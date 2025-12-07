export function getPictures() {
  return Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    likes: Math.floor(Math.random() * 200),
    description: `Описание фото №${i + 1}`,
    comments: Array.from({ length: Math.floor(Math.random() * 30) + 1 }, (_, j) => ({
      avatar: `img/avatar-${(j % 6) + 1}.svg`,
      name: `Пользователь ${j + 1}`,
      message: `Комментарий ${j + 1} к фото ${i + 1}`
    }))
  }));
}
export function renderPictures(pictures) {
  const container = document.getElementById('pictures-container');
  const template = document.getElementById('picture').content;
  pictures.forEach(photo => {
    const element = template.cloneNode(true);
    const link = element.querySelector(".picture");
    const img = element.querySelector(".picture__img");
    img.src = photo.url;
    img.alt = photo.description;
    link.addEventListener("click", (evt) => {
      evt.preventDefault();
      import('./big-picture.js').then(module => {
        module.openBigPicture(photo);
      });
    });
    container.appendChild(element);
  });
}

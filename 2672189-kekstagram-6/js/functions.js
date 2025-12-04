export function getPictures() {
  return Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    likes: Math.floor(Math.random() * 200),
    description: `Описание фото №${i + 1}`,
    comments: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => ({
      avatar: "img/avatar-1.svg",
      name: "Пользователь",
      message: "Какой красивый кадр!"
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
    const likes = element.querySelector(".picture__likes");
    const comments = element.querySelector(".picture__comments");

    img.src = photo.url;
    img.alt = photo.description;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;

    link.addEventListener("click", (evt) => {
      evt.preventDefault();
      import('./big-picture.js').then(module => {
        module.openBigPicture(photo);
      });
    });

    container.appendChild(element);
  });
}

export function closeBigPicture() {
  import('./big-picture.js').then(module => {
    module.closeBigPicture();
  });
}

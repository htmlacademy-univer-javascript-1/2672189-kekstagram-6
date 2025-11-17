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

    img.src = photo.url;
    img.alt = photo.description;

    link.addEventListener("click", (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    container.appendChild(element);
  });
}

export function openBigPicture(photo) {
  const modal = document.getElementById("big-picture");
  const img = document.getElementById("big-picture-image");

  img.src = photo.url;
  modal.querySelector(".likes-count").textContent = photo.likes;
  modal.querySelector(".comments-count").textContent = photo.comments.length;
  modal.querySelector(".social__caption").textContent = photo.description;

  const commentsContainer = modal.querySelector(".social__comments");
  commentsContainer.innerHTML = "";
  photo.comments.forEach(c => {
    const li = document.createElement("li");
    li.classList.add("social__comment");
    li.innerHTML = `<img class="social__picture" src="${c.avatar}" alt="${c.name}" width="35" height="35">
                    <p class="social__text">${c.message}</p>`;
    commentsContainer.appendChild(li);
  });

  modal.querySelector(".social__comment-count")?.classList.add("hidden");
  modal.querySelector(".comments-loader")?.classList.add("hidden");

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");

  document.addEventListener("keydown", onEscClose);
}

export function closeBigPicture() {
  const modal = document.getElementById("big-picture");
  document.body.classList.remove("modal-open");
  modal.classList.add("hidden");
  document.removeEventListener("keydown", onEscClose);
}

function onEscClose(evt) {
  if (evt.key === "Escape") closeBigPicture();
}

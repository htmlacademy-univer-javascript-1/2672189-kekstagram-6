let currentPhoto = null;

export function openBigPicture(photo) {
  currentPhoto = photo;
  const modal = document.getElementById("big-picture");
  const img = document.getElementById("big-picture-image");
  const body = document.body;

  img.src = photo.url;

  modal.querySelector(".likes-count").textContent = photo.likes;
  modal.querySelector(".comments-count").textContent = photo.comments.length;
  modal.querySelector(".social__caption").textContent = photo.description;

  const commentsContainer = modal.querySelector(".social__comments");
  commentsContainer.innerHTML = "";
  photo.comments.forEach(c => {
    const li = document.createElement("li");
    li.classList.add("social__comment");
    li.innerHTML = `
      <img class="social__picture" src="${c.avatar}" alt="${c.name}" width="35" height="35">
      <p class="social__text">${c.message}</p>
    `;
    commentsContainer.appendChild(li);
  });

  modal.classList.remove("hidden");
  body.classList.add("modal-open");
  document.addEventListener("keydown", onEscClose);
}

export function closeBigPicture() {
  const modal = document.getElementById("big-picture");
  document.body.classList.remove("modal-open");
  modal.classList.add("hidden");
  document.removeEventListener("keydown", onEscClose);
}

function onEscClose(evt) {
  if (evt.key === "Escape") {
    closeBigPicture();
  }
}

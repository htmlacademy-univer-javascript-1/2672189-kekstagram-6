let currentPhoto = null;
let shownComments = 0;
const COMMENTS_PER_LOAD = 5;

export function openBigPicture(photo) {
  currentPhoto = photo;
  shownComments = 0;

  const modal = document.getElementById("big-picture");
  const img = document.getElementById("big-picture-image");

  img.src = photo.url;
  img.alt = photo.description;

  modal.querySelector(".likes-count").textContent = photo.likes;
  modal.querySelector(".comments-count").textContent = photo.comments.length;
  modal.querySelector(".social__caption").textContent = photo.description;

  const commentsContainer = modal.querySelector(".social__comments");
  commentsContainer.innerHTML = "";

  const commentCountElement = modal.querySelector(".social__comment-count");
  const commentsLoaderElement = modal.querySelector(".comments-loader");

  commentCountElement.classList.remove("hidden");
  commentsLoaderElement.classList.remove("hidden");

  loadMoreComments();

  commentsLoaderElement.onclick = loadMoreComments;

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");

  document.addEventListener("keydown", onEscClose);
}

export function closeBigPicture() {
  const modal = document.getElementById("big-picture");
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");

  document.removeEventListener("keydown", onEscClose);
}

function onEscClose(evt) {
  if (evt.key === "Escape") {
    closeBigPicture();
  }
}

function loadMoreComments() {
  if (!currentPhoto) return;

  const modal = document.getElementById("big-picture");
  const commentsContainer = modal.querySelector(".social__comments");
  const commentCountElement = modal.querySelector(".social__comment-count");
  const commentsLoaderElement = modal.querySelector(".comments-loader");

  const allComments = currentPhoto.comments;
  const totalComments = allComments.length;

  const nextCommentsCount = Math.min(shownComments + COMMENTS_PER_LOAD, totalComments);

  for (let i = shownComments; i < nextCommentsCount; i++) {
    const comment = allComments[i];
    const li = document.createElement("li");
    li.classList.add("social__comment");
    li.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsContainer.appendChild(li);
  }

  shownComments = nextCommentsCount;

  commentCountElement.innerHTML = `
    ${shownComments} из <span class="comments-count">${totalComments}</span> комментариев
  `;

  if (shownComments >= totalComments) {
    commentsLoaderElement.classList.add("hidden");
  }
}

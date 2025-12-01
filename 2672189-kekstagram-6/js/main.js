import { getPictures, renderPictures, closeBigPicture } from "./functions.js";

const pictures = getPictures();
renderPictures(pictures);

document.getElementById("big-picture-close").addEventListener("click", closeBigPicture);

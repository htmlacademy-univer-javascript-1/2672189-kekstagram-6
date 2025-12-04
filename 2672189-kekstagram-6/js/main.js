import { getPictures, renderPictures, closeBigPicture } from "./functions.js";
import './form-validation.js';

const pictures = getPictures();
renderPictures(pictures);

document.getElementById("big-picture-close").addEventListener("click", closeBigPicture);

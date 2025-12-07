import { getPictures, renderPictures } from "./functions.js";
import './big-picture.js';
import './form.js';
import './form-validation.js';
const pictures = getPictures();
renderPictures(pictures);
console.log('Приложение Kekstagram загружено');

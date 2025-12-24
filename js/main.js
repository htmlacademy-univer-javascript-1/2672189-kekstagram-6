import { getPictures } from './data.js';
import { renderThumbnails } from './thumbnail.js';
import './form.js';

const pictures = getPictures();
renderThumbnails(pictures);

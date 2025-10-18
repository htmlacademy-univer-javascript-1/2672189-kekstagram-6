import { createPhotos } from './creating-data.js';
import { renderThumbnails } from './rendering.js';

const photos = createPhotos();
renderThumbnails(photos);

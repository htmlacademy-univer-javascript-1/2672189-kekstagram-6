import { renderThumbnails } from './thumbnail.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { setFormSubmit, hideModal } from './form.js';
import { initFilter } from './filter.js';

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
    initFilter(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setFormSubmit(hideModal);

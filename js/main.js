import { renderThumbnails } from './thumbnail.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { setFormSubmit, hideModal } from './form.js';

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setFormSubmit(hideModal);

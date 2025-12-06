import { isEscapeKey } from './utils.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadPreview = document.querySelector('.img-upload__preview img');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const body = document.body;
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
  uploadForm.reset();
  uploadPreview.src = '';
};
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const isInputFocused = document.activeElement === hashtagsInput ||
                          document.activeElement === descriptionInput;
    if (!isInputFocused) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
};
const onHashtagsInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};
const onDescriptionInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};
uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  if (!file) {
    return;
  }
  if (!file.type.startsWith('image/')) {
    alert('Пожалуйста, выберите изображение');
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    uploadPreview.src = event.target.result;
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  };
  reader.readAsDataURL(file);
});
uploadCancel.addEventListener('click', () => {
  closeUploadForm();
});
hashtagsInput.addEventListener('keydown', onHashtagsInputKeydown);
descriptionInput.addEventListener('keydown', onDescriptionInputKeydown);
export { closeUploadForm };

import { isEscapeKey } from './utils.js';
import { resetEffects } from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.getElementById('upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadPreview = document.querySelector('.img-upload__preview img');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const body = document.body;

console.log('form.js загружен');
console.log('uploadInput:', uploadInput);
console.log('uploadOverlay:', uploadOverlay);
console.log('uploadPreview:', uploadPreview);

const closeUploadForm = () => {
  console.log('Закрытие формы');
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
  uploadForm.reset();
  uploadPreview.src = '';
  resetEffects();
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

const openUploadForm = () => {
  console.log('Открытие формы');
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadInput.addEventListener('change', () => {
  console.log('Событие change на input файла');
  const file = uploadInput.files[0];

  if (!file) {
    console.log('Файл не выбран');
    return;
  }

  console.log('Выбран файл:', file.name, file.type, file.size);

  if (!file.type.startsWith('image/')) {
    alert('Пожалуйста, выберите изображение (JPEG, PNG, GIF и т.д.)');
    return;
  }

  const reader = new FileReader();

  reader.onloadstart = () => {
    console.log('Начало чтения файла');
  };

  reader.onload = (event) => {
    console.log('Файл успешно прочитан');
    uploadPreview.src = event.target.result;
    openUploadForm();
  };

  reader.onerror = () => {
    console.error('Ошибка при чтении файла');
    alert('Ошибка при чтении файла. Попробуйте другой файл.');
  };

  reader.onloadend = () => {
    console.log('Чтение файла завершено');
  };

  reader.readAsDataURL(file);
});

uploadCancel.addEventListener('click', () => {
  console.log('Клик по кнопке закрытия');
  closeUploadForm();
});

if (hashtagsInput) {
  hashtagsInput.addEventListener('keydown', onHashtagsInputKeydown);
}

if (descriptionInput) {
  descriptionInput.addEventListener('keydown', onDescriptionInputKeydown);
}

export { closeUploadForm };

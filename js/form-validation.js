const form = document.getElementById('upload-form');
const fileInput = document.getElementById('upload-file');
const overlay = document.getElementById('upload-overlay');
const cancelButton = document.getElementById('upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags-input');
const descriptionInput = form.querySelector('.text__description-input');

const pristine = new Pristine(form, {
  classTo: 'text__hashtags',
  errorClass: 'text__item--invalid',
  successClass: 'text__item--valid',
  errorTextParent: 'text__hashtags',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
}, true);

function validateHashtags(value) {
  if (value === '') {
    return true;
  }

  const hashtags = value.toLowerCase().split(' ').filter(tag => tag !== '');

  if (hashtags.length > 5) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];

    if (!tag.startsWith('#')) {
      return false;
    }

    if (tag.length < 2) {
      return false;
    }

    if (tag.length > 20) {
      return false;
    }

    if (tag.indexOf('#', 1) !== -1) {
      return false;
    }

    if (!/^#[a-zа-яё0-9]+$/i.test(tag)) {
      return false;
    }

    for (let j = i + 1; j < hashtags.length; j++) {
      if (tag === hashtags[j]) {
        return false;
      }
    }
  }

  return true;
}

function validateDescription(value) {
  return value.length <= 140;
}

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Хэш-теги должны начинаться с #, содержать только буквы и цифры, не повторяться (максимум 5 тегов)'
);

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не может быть длиннее 140 символов'
);

function openUploadForm() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscClose);
}

function closeUploadForm() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscClose);

  form.reset();
  fileInput.value = '';
  pristine.reset();
}

function onEscClose(evt) {
  if (evt.key === 'Escape' &&
      document.activeElement !== hashtagInput &&
      document.activeElement !== descriptionInput) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function onFileChange() {
  const file = fileInput.files[0];
  if (file) {
    openUploadForm();
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    form.submit();
  }
}

function stopEscPropagation(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

fileInput.addEventListener('change', onFileChange);
cancelButton.addEventListener('click', closeUploadForm);
form.addEventListener('submit', onFormSubmit);
hashtagInput.addEventListener('keydown', stopEscPropagation);
descriptionInput.addEventListener('keydown', stopEscPropagation);

export { openUploadForm, closeUploadForm };

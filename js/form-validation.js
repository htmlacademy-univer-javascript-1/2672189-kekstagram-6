const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtags = value.trim().split(/\s+/).filter(Boolean);
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (!HASHTAG_REGEX.test(hashtag)) {
      return false;
    }
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtag.toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }
  return true;
};
const getHashtagErrorMessage = (value) => {
  if (value.trim() === '') {
    return '';
  }
  const hashtags = value.trim().split(/\s+/).filter(Boolean);
  if (hashtags.length > MAX_HASHTAGS) {
    return `Не более ${MAX_HASHTAGS} хэштегов`;
  }
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (hashtag[0] !== '#') {
      return 'Хэштег должен начинаться с #';
    }
    if (hashtag.length === 1) {
      return 'Хэштег не может состоять только из #';
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return `Хэштег не должен превышать ${MAX_HASHTAG_LENGTH} символов`;
    }
    if (hashtag.indexOf(' ') !== -1) {
      return 'Хэштеги разделяются пробелами, без пробелов внутри';
    }
    if (!/^#[a-zа-яё0-9]+$/i.test(hashtag)) {
      return 'Хэштег содержит недопустимые символы';
    }
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtag.toLowerCase() === hashtags[j].toLowerCase()) {
        return 'Хэштеги не должны повторяться';
      }
    }
  }
  return '';
};
const validateComment = (value) => {
  return value.length <= MAX_COMMENT_LENGTH;
};
const getCommentErrorMessage = () => {
  return `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`;
};
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error',
  errorTextTag: 'div'
});
pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  getHashtagErrorMessage
);
pristine.addValidator(
  descriptionInput,
  validateComment,
  getCommentErrorMessage
);
uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    hashtagsInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));
  }
});
hashtagsInput.addEventListener('input', () => {
  pristine.validate(hashtagsInput);
});
descriptionInput.addEventListener('input', () => {
  pristine.validate(descriptionInput);
});
export { pristine };

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('pictures-container');
  const template = document.getElementById('picture').content;
  console.log('noUiSlider loaded:', typeof window.noUiSlider !== 'undefined');

  for (let i = 1; i <= 25; i++) {
    const element = template.cloneNode(true);
    const link = element.querySelector('.picture');
    const img = element.querySelector('.picture__img');
    const likes = element.querySelector('.picture__likes');
    const comments = element.querySelector('.picture__comments');

    img.src = `photos/${i}.jpg`;
    img.alt = `Фото ${i}`;
    likes.textContent = Math.floor(Math.random() * 200);
    comments.textContent = Math.floor(Math.random() * 10);

    link.addEventListener('click', function(evt) {
      evt.preventDefault();
      openBigPicture(i);
    });

    container.appendChild(element);
  }

  const closeBtn = document.getElementById('big-picture-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      document.getElementById('big-picture').classList.add('hidden');
      document.body.classList.remove('modal-open');
    });
  }
});

function openBigPicture(photoId) {
  const modal = document.getElementById('big-picture');
  const img = document.getElementById('big-picture-image');
  const likesCount = document.querySelector('.likes-count');
  const commentsCount = document.querySelector('.comments-count');
  const caption = document.querySelector('.social__caption');
  const commentsContainer = document.querySelector('.social__comments');

  img.src = `photos/${photoId}.jpg`;
  likesCount.textContent = Math.floor(Math.random() * 200);
  commentsCount.textContent = Math.floor(Math.random() * 15) + 5;
  caption.textContent = `Описание фото №${photoId}`;

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

let currentScale = 100;

function updateScale() {
  const scaleControlValue = document.querySelector('.scale__control--value');
  const imagePreview = document.getElementById('image-preview');
  if (scaleControlValue && imagePreview) {
    scaleControlValue.value = `${currentScale}%`;
    imagePreview.style.transform = `scale(${currentScale / 100})`;
  }
}

function onScaleSmallerClick() {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale();
  }
}

function onScaleBiggerClick() {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale();
  }
}

let slider = null;

function createSlider() {
  const effectSlider = document.getElementById('effect-slider');
  const sliderWrapper = document.getElementById('slider-wrapper');
  const imagePreview = document.getElementById('image-preview');
  const effectLevelValue = document.querySelector('.effect-level__value');

  if (!effectSlider || !window.noUiSlider) {
    console.log('noUiSlider не найден');
    return;
  }

  if (slider) {
    slider.destroy();
  }

  const currentEffect = document.querySelector('input[name="effect"]:checked').value;

  if (currentEffect === 'none') {
    if (sliderWrapper) sliderWrapper.classList.add('hidden');
    if (imagePreview) imagePreview.style.filter = 'none';
    if (effectLevelValue) effectLevelValue.value = 100;
    return;
  }

  if (sliderWrapper) sliderWrapper.classList.remove('hidden');

  let min = 0;
  let max = 100;
  let step = 1;
  let filterName = '';
  let unit = '';

  if (currentEffect === 'chrome') {
    min = 0;
    max = 1;
    step = 0.1;
    filterName = 'grayscale';
  } else if (currentEffect === 'sepia') {
    min = 0;
    max = 1;
    step = 0.1;
    filterName = 'sepia';
  } else if (currentEffect === 'marvin') {
    min = 0;
    max = 100;
    step = 1;
    filterName = 'invert';
    unit = '%';
  } else if (currentEffect === 'phobos') {
    min = 0;
    max = 3;
    step = 0.1;
    filterName = 'blur';
    unit = 'px';
  } else if (currentEffect === 'heat') {
    min = 1;
    max = 3;
    step = 0.1;
    filterName = 'brightness';
  }

  slider = window.noUiSlider.create(effectSlider, {
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step,
    connect: 'lower'
  });

  slider.on('update', () => {
    const value = slider.get();
    if (effectLevelValue) effectLevelValue.value = value;
    if (imagePreview && currentEffect !== 'none') {
      imagePreview.style.filter = `${filterName}(${value}${unit})`;
    }
  });
}

function onEffectChange() {
  createSlider();
}

function resetEffects() {
  currentScale = 100;

  const noneRadio = document.getElementById('effect-none');
  if (noneRadio) noneRadio.checked = true;

  if (slider) {
    slider.destroy();
    slider = null;
  }

  const sliderWrapper = document.getElementById('slider-wrapper');
  const imagePreview = document.getElementById('image-preview');
  const scaleControlValue = document.querySelector('.scale__control--value');
  const effectLevelValue = document.querySelector('.effect-level__value');

  if (sliderWrapper) sliderWrapper.classList.add('hidden');
  if (imagePreview) {
    imagePreview.style.transform = 'scale(1)';
    imagePreview.style.filter = 'none';
  }
  if (scaleControlValue) scaleControlValue.value = '100%';
  if (effectLevelValue) effectLevelValue.value = 100;
}

function initForm() {
  const form = document.getElementById('upload-form');
  const fileInput = document.getElementById('upload-file');
  const overlay = document.getElementById('upload-overlay');
  const cancelButton = document.getElementById('upload-cancel');
  const imagePreview = document.getElementById('image-preview');

  if (!form || !fileInput) return;

  function openUploadForm() {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const scaleSmaller = document.querySelector('.scale__control--smaller');
    const scaleBigger = document.querySelector('.scale__control--bigger');
    const effectRadios = document.querySelectorAll('.effects__radio');

    if (scaleSmaller) scaleSmaller.addEventListener('click', onScaleSmallerClick);
    if (scaleBigger) scaleBigger.addEventListener('click', onScaleBiggerClick);

    effectRadios.forEach(radio => {
      radio.addEventListener('change', onEffectChange);
    });

    updateScale();
    createSlider();
  }

  function closeUploadForm() {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    form.reset();
    fileInput.value = '';
    resetEffects();

    imagePreview.src = '';
    imagePreview.style.transform = 'scale(1)';
    imagePreview.style.filter = 'none';
  }

  function onFileChange() {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imagePreview.src = e.target.result;
        openUploadForm();
      };
      reader.readAsDataURL(file);
    }
  }

  fileInput.addEventListener('change', onFileChange);
  cancelButton.addEventListener('click', closeUploadForm);
}

document.addEventListener('DOMContentLoaded', initForm);

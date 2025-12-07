// effects.js - работает с глобальным noUiSlider из CDN

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleValue = document.querySelector('.scale__value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.slider');

let currentScale = DEFAULT_SCALE;
let currentEffect = 'none';
let slider = null;

const scaleImage = (value) => {
  currentScale = value;
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const onScaleSmallerClick = () => {
  const newValue = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  scaleImage(newValue);
};

const onScaleBiggerClick = () => {
  const newValue = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  scaleImage(newValue);
};

const effectsConfig = {
  none: { min: 0, max: 100, step: 1, filter: '', unit: '', start: 100 },
  chrome: { min: 0, max: 1, step: 0.1, filter: 'grayscale', unit: '', start: 1 },
  sepia: { min: 0, max: 1, step: 0.1, filter: 'sepia', unit: '', start: 1 },
  marvin: { min: 0, max: 100, step: 1, filter: 'invert', unit: '%', start: 100 },
  phobos: { min: 0, max: 3, step: 0.1, filter: 'blur', unit: 'px', start: 3 },
  heat: { min: 1, max: 3, step: 0.1, filter: 'brightness', unit: '', start: 3 }
};

const createSlider = () => {
  if (slider) {
    slider.destroy();
  }

  const config = effectsConfig[currentEffect];

  slider = window.noUiSlider.create(sliderContainer, {
    range: {
      min: config.min,
      max: config.max
    },
    start: config.start,
    step: config.step,
    connect: 'lower'
  });

  slider.on('update', (values) => {
    const value = parseFloat(values[0]);
    effectLevelValue.value = value;

    if (currentEffect === 'none') {
      imagePreview.style.filter = 'none';
    } else {
      imagePreview.style.filter = `${config.filter}(${value}${config.unit})`;
    }
  });
};

const updateEffect = (effect) => {
  currentEffect = effect;

  if (effect === 'none') {
    effectLevel.classList.add('hidden');
    imagePreview.style.filter = 'none';
  } else {
    effectLevel.classList.remove('hidden');
    createSlider();
  }
};

const resetEffects = () => {
  currentScale = DEFAULT_SCALE;
  currentEffect = 'none';

  scaleImage(DEFAULT_SCALE);
  imagePreview.style.filter = 'none';
  imagePreview.className = '';

  const noneRadio = document.querySelector('#effect-none');
  noneRadio.checked = true;

  effectLevel.classList.add('hidden');

  if (slider) {
    slider.destroy();
    slider = null;
  }
};

scaleSmaller.addEventListener('click', onScaleSmallerClick);
scaleBigger.addEventListener('click', onScaleBiggerClick);

effectsList.addEventListener('change', (evt) => {
  if (evt.target.matches('.effects__radio')) {
    updateEffect(evt.target.value);
  }
});

export { resetEffects };

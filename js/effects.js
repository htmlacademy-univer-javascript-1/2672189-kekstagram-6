let currentScale = 100;
let currentEffect = 'none';
let slider = null;

const EFFECTS = {
  none: { min: 0, max: 100, step: 1, unit: '', filter: 'none' },
  chrome: { min: 0, max: 1, step: 0.1, unit: '', filter: 'grayscale' },
  sepia: { min: 0, max: 1, step: 0.1, unit: '', filter: 'sepia' },
  marvin: { min: 0, max: 100, step: 1, unit: '%', filter: 'invert' },
  phobos: { min: 0, max: 3, step: 0.1, unit: 'px', filter: 'blur' },
  heat: { min: 1, max: 3, step: 0.1, unit: '', filter: 'brightness' }
};

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

function createSlider() {
  const effectSlider = document.getElementById('effect-slider');
  const sliderWrapper = document.getElementById('slider-wrapper');
  const imagePreview = document.getElementById('image-preview');
  const effectLevelValue = document.querySelector('.effect-level__value');

  if (!effectSlider || !window.noUiSlider) return;

  if (slider) {
    slider.destroy();
  }

  if (currentEffect === 'none') {
    if (sliderWrapper) sliderWrapper.classList.add('hidden');
    if (imagePreview) imagePreview.style.filter = 'none';
    if (effectLevelValue) effectLevelValue.value = 100;
    return;
  }

  if (sliderWrapper) sliderWrapper.classList.remove('hidden');

  const effect = EFFECTS[currentEffect];

  slider = window.noUiSlider.create(effectSlider, {
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step,
    connect: 'lower'
  });

  slider.on('update', () => {
    const value = slider.get();
    if (effectLevelValue) effectLevelValue.value = value;
    applyEffect(value);
  });

  applyEffect(effect.max);
}

function applyEffect(value) {
  const imagePreview = document.getElementById('image-preview');
  const effect = EFFECTS[currentEffect];

  if (!imagePreview || currentEffect === 'none') {
    if (imagePreview) imagePreview.style.filter = 'none';
    return;
  }

  let filterValue = `${effect.filter}(${value}${effect.unit})`;

  if (currentEffect === 'heat') {
    filterValue = `${effect.filter}(${value})`;
  }

  imagePreview.style.filter = filterValue;
}

function onEffectChange(evt) {
  currentEffect = evt.target.value;
  createSlider();
}

function resetEffects() {
  currentScale = 100;
  currentEffect = 'none';

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

function initEffects() {
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

export { initEffects, resetEffects };

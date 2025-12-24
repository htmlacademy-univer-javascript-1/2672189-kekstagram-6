import { renderThumbnails } from './thumbnail.js';
import { debounce } from './utils.js';

const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const RANDOM_PICTURE_COUNT = 10;
const RERENDER_DELAY = 500;

const filterElement = document.querySelector('.img-filters');
let currentFilter = FILTER.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case FILTER.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, RANDOM_PICTURE_COUNT);
    case FILTER.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const debouncedRenderThumbnails = debounce((data) => {
  renderThumbnails(data);
}, RERENDER_DELAY);

const onFilterClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  filterElement
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
  debouncedRenderThumbnails(getFilteredPictures());
};

const initFilter = (loadedPictures) => {
  pictures = [...loadedPictures];
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterClick);
};

export { initFilter };

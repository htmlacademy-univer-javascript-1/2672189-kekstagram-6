const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Артём', 'Ольга', 'Мария', 'Иван', 'Светлана', 'Дмитрий', 'Екатерина', 'Сергей'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let commentId = 1;
function generateComment() {
  const messageCount = getRandomInt(1, 2);
  let message = '';
  for (let i = 0; i < messageCount; i++) {
    message += messages[getRandomInt(0, messages.length - 1)];
    if (i === 0 && messageCount === 2) message += ' ';
  }
  return {
    id: commentId++,
    avatar: `img/avatar-${getRandomInt(1,6)}.svg`,
    message,
    name: names[getRandomInt(0, names.length - 1)]
  };
}

function generatePhoto(id) {
  const commentsCount = getRandomInt(0, 30);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание фотографии ${id}`,
    likes: getRandomInt(15, 200),
    comments: comments
  };
}

const photos = [];
for (let i = 1; i <= 25; i++) {
  photos.push(generatePhoto(i));
}

console.log(photos);

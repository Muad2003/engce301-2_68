const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

const freeBoxes = [];
const takenBoxes = {};
let gameOver = false;

const boxes = document.querySelectorAll('#grid div');
const resultContainer = document.querySelector('#results');

for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}

function assignSpace(space, owner) {
  if (gameOver) return;

  const img = document.createElement('img');
  img.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(img);

  takenBoxes[space.id] = owner;

  const index = freeBoxes.indexOf(space);
  if (index !== -1) freeBoxes.splice(index, 1);

  space.removeEventListener('click', changeToX);
}

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');

  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}

function computerChooseO() {
  if (gameOver || freeBoxes.length === 0) return;

  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];

  assignSpace(freeSpace, 'o');

  if (isGameOver()) {
    displayWinner();
  }
}

function isGameOver() {
  return getWinner() !== null || freeBoxes.length === 0;
}

function displayWinner() {
  gameOver = true;
  resultContainer.innerHTML = '';

  const winner = getWinner();
  const header = document.createElement('h1');

  if (winner === 'x') {
    header.textContent = 'You win!';
  } else if (winner === 'o') {
    header.textContent = 'Computer wins!';
  } else {
    header.textContent = 'Tie!';
  }

  resultContainer.appendChild(header);

  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

function checkBoxes(a, b, c) {
  if (
    takenBoxes[a] &&
    takenBoxes[a] === takenBoxes[b] &&
    takenBoxes[b] === takenBoxes[c]
  ) {
    return takenBoxes[a];
  }
  return null;
}

function getWinner() {
  return (
    checkBoxes('one', 'two', 'three') ||
    checkBoxes('four', 'five', 'six') ||
    checkBoxes('seven', 'eight', 'nine') ||
    checkBoxes('one', 'four', 'seven') ||
    checkBoxes('two', 'five', 'eight') ||
    checkBoxes('three', 'six', 'nine') ||
    checkBoxes('one', 'five', 'nine') ||
    checkBoxes('three', 'five', 'seven')
  );
}
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyStyle = document.querySelector('body');
const waitNum = 1000;
let id = null;
startBtn.addEventListener('click', clicktoStart);
stopBtn.addEventListener('click', clicktoStop);
stopBtn.setAttribute('disabled', 'true');

function clicktoStart() {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');

  id = setInterval(() => {
    const color = getRandomHexColor();
    bodyStyle.style.backgroundColor = color;
  }, waitNum);
}

function clicktoStop() {
  clearInterval(id);
  stopBtn.setAttribute('disabled', 'true');
  startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

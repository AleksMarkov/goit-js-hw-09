import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const { delay, step, amount } = form.elements;

form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onSubmit(evt) {
  evt.preventDefault();

  let amountV = Number(amount.value);
  let delayV = Number(delay.value);
  let stepV = Number(step.value);

  for (let i = 1; i <= amountV; i += 1) {
    let fullDelay = stepV * (i - 1) + delayV;

    createPromise(i, fullDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

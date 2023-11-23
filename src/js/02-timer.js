import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
button.addEventListener('click', onClick);
button.setAttribute('disabled', 'true');

let today = null;
let alarm = null;
let id = null;
let interval = 0;
let timeCount = { days: 0, hours: 0, minutes: 0, seconds: 0 };

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    alarm = selectedDates[0].getTime();
    today = new Date();
    interval = alarm - today;
    if (interval < 1000) {
      Notiflix.Notify.info('Please choose a date in the future');
    } else {
      button.removeAttribute('disabled');
    }
  },
});

function onClick() {
  // timeCount = {
  //   days: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // };
  id = setInterval(() => {
    today = new Date().getTime();
    if (alarm - today < 1000) {
      clearInterval(id);
    } else {
      today += 1000;
      interval = alarm - today;
      timeCount = convertMs(interval);
      days.textContent = timeCount.days;
      hours.textContent = timeCount.hours;
      minutes.textContent = timeCount.minutes;
      seconds.textContent = timeCount.seconds;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

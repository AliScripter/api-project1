'use strict';
const $ = document;
const icon_settingsEl = $.getElementById(`icon-settings`);
const settingsDiv = $.querySelector(`.settings`);
let closeSettings = $.querySelector('.closeSettings');

icon_settingsEl.addEventListener(`click`, () => {
  settingsDiv.style.display = 'block';
  on();
});

closeSettings.addEventListener('click', () => {
  settingsDiv.style.display = 'none';
  off();
});
//!--------- Overlay
const overlay = document.getElementById('overlay');
function on() {
  overlay.style.display = 'block';
}

function off() {
  overlay.style.display = 'none';
}

//!------------- Colors
let changerImages = document.querySelectorAll('.changer-img');
let colorsObj = {
  green: [`#163020`, `#304d30`],
  blue: [`#525497`, `#7381dd`],
  orange: [`#F14E10`, `#F5723D`],
  red: [`#D31515`, `#FF2323`],
};

let savedColor = localStorage.getItem('selectedColor');

if (savedColor) {
  applyColor(savedColor);
} else {
  applyColor('green');
}

function changeImagesColor(color) {
  changerImages.forEach(image => {
    let imageName = image.src.includes('No-data')
      ? 'No-data-cuate'
      : 'Add-files-rafiki';
    image.src = `/img/${imageName}-${color}.png`;
  });
}

function applyColor(color) {
  let newColors = colorsObj[color];
  if (newColors && newColors.length === 2) {
    let newColor = newColors[0];
    let newColor2 = newColors[1];
    document.documentElement.style.setProperty('--green', newColor);
    document.documentElement.style.setProperty('--green2', newColor2);
    localStorage.setItem('selectedColor', color);
    changeImagesColor(color);
  }
}

let liEls = document.querySelectorAll('.color-palet');
for (const li of liEls) {
  li.addEventListener('click', e => {
    let color = e.target.dataset.color.toLowerCase();
    applyColor(color);
  });
}

//!---------------- FONTS
let liFonts = document.querySelectorAll('.li-font');

for (const liFont of liFonts) {
  liFont.addEventListener('click', function () {
    let font = this.dataset.font;
    document.body.style.fontFamily = font;
    localStorage.setItem('selectedFont', font);
  });
}

// بررسی وجود فونت قبلی در localStorage
let savedFont = localStorage.getItem('selectedFont');
if (savedFont) {
  document.body.style.fontFamily = savedFont;
}
//!------------- DARK / Light Mode
const moon_iconEl = document.getElementById('moon-icon');
const sun_iconEl = document.getElementById('sun-icon');
const headerEl = document.querySelector('.header');

// تابع تغییر به حالت تیره
const darkThemeFn = () => {
  document.body.style.backgroundColor = bgc;
  document.body.style.color = color;
  headerEl.classList.add('dark');
  // ذخیره تنظیمات در localStorage
  localStorage.setItem('theme', 'dark');
};

// تابع تغییر به حالت روشن
const lightThemeFn = () => {
  document.body.style.backgroundColor = `#ffffe0`;
  document.body.style.color = `#000`;
  headerEl.classList.remove('dark');
  // ذخیره تنظیمات در localStorage
  localStorage.setItem('theme', 'light');
};

let bgc = `#282A3A`;
let color = `#eef0e5`;

// اعمال تم بر اساس تنظیمات ذخیره شده در localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  darkThemeFn();
} else {
  lightThemeFn();
}

// رویداد کلیک برای تغییر به حالت تیره
moon_iconEl.addEventListener('click', darkThemeFn);

// رویداد کلیک برای تغییر به حالت روشن
sun_iconEl.addEventListener('click', lightThemeFn);
//!--------- Log Out

const Reset_windowEl = document.querySelector('#Reset-window');
const overlayEl = document.querySelector('#overlay');
const message_windowEl = document.querySelector('.message-Window');
const yesEl = document.querySelector('.yes');
const noEl = document.querySelector('.no');

const logOutIcon = document.getElementById('log-out-icon');
logOutIcon.addEventListener('click', () => {
  message_windowEl.innerHTML = `Are you sure to log out of your account?`;
  Reset_windowEl.style.display = 'block';
  overlayEl.style.display = 'block';

  yesEl.addEventListener('click', () => {
    overlayEl.style.display = 'none';
    Reset_windowEl.style.display = 'none';
    window.location = `http://127.0.0.1:5500/login-page/`;
  });

  noEl.addEventListener('click', () => {
    overlayEl.style.display = 'none';
    Reset_windowEl.style.display = 'none';
    settingsDiv.style.display = 'none';
  });
});

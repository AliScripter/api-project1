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
function on() {
  document.getElementById('overlay').style.display = 'block';
}

function off() {
  document.getElementById('overlay').style.display = 'none';
}

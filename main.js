'use strict';
// https://restcountries.com/v3.1/name/Iran
// line up is api - last word get from user :) happy coding

const countryEl = document.querySelector(`input[type = text]`);
const btn = document.querySelector(`input[type = button]`);
let fragment = document.createDocumentFragment();
let table = document.querySelector('table');

function makeDomFn(data, callback) {
  callback();
  fragment = table.insertAdjacentHTML(
    'afterbegin',
    `<tr>
    <th>name</th>
    <th>flag</th>
    <th>capital</th>
    <th>people</th>
    <th>area</th>
    <th>time zone</th>
  </tr>
  <tr>
    <td>${data[0].name.common}</td>
    <td>${data[0].flag}</td>
    <td>${data[0].capital}</td>
    <td>${data[0].population}</td>
    <td>${data[0].area} km²</td>
    <td>${data[0].timezones[0]}</td>
  </tr>`
  );
}

function clearFirst() {
  table.innerHTML = null;
  countryEl.value = null;
}

function getDataFromAPI() {
  let country = countryEl.value;

  fetch(`https://restcountries.com/v3.1/name/${country}`, { method: 'GET' })
    .then(Response => {
      if (Response.status === 200) {
        return Response.json();
      } else return new Error(`Your country in NOT Valid ! Try Again :)`);
    })
    .then(data => {
      makeDomFn(data, clearFirst);
    })
    .catch(err => {
      console.log(err);
      document.body.insertAdjacentHTML(
        'beforeend',
        `<h3 class='red'>Your country in NOT Valid ! Try Again :)</h3>`
      );
    })
    .finally(() => {
      console.log(`Program Finish :)`);
    });
}

btn.addEventListener('click', getDataFromAPI);
countryEl.addEventListener('keyup', e => {
  e.keyCode === 13 ? getDataFromAPI() : null;
});

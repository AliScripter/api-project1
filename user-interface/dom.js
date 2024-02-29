'use strict';

const add_iconEl = document.getElementById('add-icon');
const empty_showEl = document.querySelector('.empty-show');
const formDivEl = document.querySelector('.formDiv');
const closeIconEl = document.getElementById('closeIcon');

const name_ProductEl = document.getElementById('name-Product');
const model_ProductEl = document.getElementById('model-Product');
const price_ProductEl = document.getElementById('price-Product');
const count_ProductEl = document.getElementById('count-Product');

const noAllowEl = document.querySelector('.noAllow');
const total_ProductEl = document.getElementById('total-Product');
const submitBtn = document.querySelector('button[type="submit"]');
const resetBtn = document.querySelector('button[type="reset"]');

const Reset_windowElem = document.getElementById('Reset-window');
const message_WindowElem = document.querySelector('.message-Window');
const yesElem = document.querySelector('.yes');
const noElem = document.querySelector('.no');
const tableEl = document.querySelector('table');
const overlayElem = document.getElementById('overlay');
const allInputs = document.querySelectorAll('input');
let userProductsList = [];
let fragment = document.createDocumentFragment();

const api = 'https://just-test-e1379-default-rtdb.firebaseio.com/Product.json';

//!------------ Functions
const showForm = () => {
  empty_showEl.style.display = 'none';
  formDivEl.style.display = 'block';
};

const closeFormFn = () => {
  formDivEl.style.display = 'none';
};

const showResetWindwoFn = e => {
  e.preventDefault();
  overlayElem.style.display = 'block';
  Reset_windowElem.style.display = 'block';
};

const resetFormFn = () => {
  allInputs.forEach(input => {
    input.value = '';
  });
  closeWindow();
};

const closeWindow = () => {
  overlayElem.style.display = 'none';
  Reset_windowElem.style.display = 'none';
};

const getDataFromUserFn = e => {
  e.preventDefault();

  const price = parseFloat(price_ProductEl.value);
  const count = parseFloat(count_ProductEl.value);

  const newProduct = {
    id: userProductsList.length + 1,
    name: name_ProductEl.value,
    model: model_ProductEl.value,
    price: price,
    count: count,
    total_price: price * count,
  };
  userProductsList.push(newProduct);
  createTableFn();
  formDivEl.style.display = 'none';
};

const createTableFn = () => {
  tableEl.innerHTML = ''; // Clear previous table contents
  userProductsList.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.model}</td>
      <td>${item.price}</td>
      <td>${item.count}</td>
      <td>${item.total_price}</td>
      <td onclick='deleteFn(${item.id})'>Delete</td>
      <td onclick='editFn(${item.id})'>Edit</td>
      <td onclick='sellFn(${item.id})'>Sell</td>
    `;
    tableEl.appendChild(row);
  });
};

//!------------ Events

add_iconEl.addEventListener('click', showForm);
closeIconEl.addEventListener('click', closeFormFn);
resetBtn.addEventListener('click', showResetWindwoFn);
yesElem.addEventListener('click', resetFormFn);
noElem.addEventListener('click', closeWindow);
submitBtn.addEventListener('click', getDataFromUserFn);

function deleteFn(id) {
  // Implement delete functionality
}

function editFn(id) {
  // Implement edit functionality
}

function sellFn(id) {
  // Implement sell functionality
}

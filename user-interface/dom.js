'use strict';

const add_iconEl = document.getElementById(`add-icon`);
const empty_showEl = document.querySelector(`.empty-show`);
const formDivEl = document.querySelector(`.formDiv`);
const closeIconEl = document.getElementById(`closeIcon`);

const name_ProductEl = document.querySelector(`label[for="name-Product"]`);
const model_ProductEl = document.querySelector(`label[for="model-Product"]`);
const price_ProductEl = document.querySelector(`label[for="price-Product"]`);
const count_ProductEl = document.querySelector(`label[for="count-Product"]`);

const noAllowEl = document.querySelector(`.noAllow`);
const total_ProductEl = document.getElementById(`total-Product`);
const submitBtn = document.querySelector(`button[type="submit"]`);
const resetBtn = document.querySelector(`button[type='reset']`);

const Reset_windowElem = document.querySelector(`#Reset-window`);
const message_WindowElem = document.querySelector(`.message-Window`);
const yesElem = document.querySelector(`.yes`);
const noElem = document.querySelector(`.no`);

const api = `https://just-test-e1379-default-rtdb.firebaseio.com/Product.json`;

//!------------ Functions
const getProductDataFromServerFn = () => {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      dataObj = Object.entries(data);
      console.log(dataObj);
    })
    .catch(err => console.log(err));
};

//!------------ Events
window.addEventListener('load', getProductDataFromServerFn);

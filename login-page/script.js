'use strict';

//!------ Animations

const container = document.getElementById('container');
const registerBtn = document.getElementById('Register');
const loginBtn = document.getElementById('Login');

const activateContainer = () => {
  container.classList.add('active');
};

const deactivateContainer = () => {
  container.classList.remove('active');
};

registerBtn.addEventListener('click', activateContainer);
loginBtn.addEventListener('click', deactivateContainer);

//!----- Fetch

const api = `https://just-test-e1379-default-rtdb.firebaseio.com/Users.json`;
const messageEl = document.getElementById(`message`);
const createNameEl = document.getElementById('create-name');
const createEmailEl = document.getElementById('create-email');
const createPassEl = document.getElementById('create-pass');
const btnSignInEl = document.getElementById('btn-signIn');
const loginEmailEl = document.getElementById('login-email');
const loginPassEl = document.getElementById('login-pass');
const btnLoginEl = document.getElementById('btn-login');
let usersObj = null;
//!---------- Functions For Sign up
const getDataFromServerFn = () => {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      usersObj = Object.entries(data) || {}; //!----if res is Null ?
      checkUserInDatas(usersObj);
    })
    .catch(err => console.log(err))
    .finally(() => console.log(`getDataFromServerFn Finished`));
};

const checkUserInDatas = usersObj => {
  let isUserExists = false;
  for (const [key, value] of usersObj) {
    if (
      createNameEl.value === value.name &&
      createEmailEl.value === value.email &&
      createPassEl.value === value.password
    ) {
      // console.log(`user alredy existed :) login please`);
      isUserExists = true;
      break;
    }
  }
  if (isUserExists) {
    // console.log(`الان باید بگی بره لاگین کنه`);
    messageEl.innerHTML = `You have already registered. Please login`;
    messageEl.style.display = 'block';
    clearForm(createNameEl, createEmailEl, createPassEl);
    deactivateContainer();
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 3e3);
  } else {
    // console.log(`الان باید کاربر رو ثبتنام کنی`);
    addUserInServer();
  }
};

const addUserInServer = () => {
  const nameRegex = /^\S{3,}$/;
  const emailRegex = /^\S{3,}$/;
  const passwordRegex = /^\S{3,}$/;

  const nameIsValid = nameRegex.test(createNameEl.value);
  const emailIsValid = emailRegex.test(createEmailEl.value);
  const passwordIsValid = passwordRegex.test(createPassEl.value);

  if (nameIsValid && emailIsValid && passwordIsValid) {
    let newUser = {
      name: createNameEl.value,
      email: createEmailEl.value,
      password: createPassEl.value,
    };

    fetch(api, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(res => {
        console.log(res);
        messageEl.innerHTML = `Registration successful`;
        messageEl.style.display = 'block';
        clearForm(createNameEl, createEmailEl, createPassEl);
        setTimeout(() => {
          messageEl.style.display = 'none';
          window.location.href =
            'http://127.0.0.1:5500/user-interface/index.html';
        }, 3e3);
      })
      .catch(err => console.log(err))
      .finally(() => console.log(`addUserInServer Finished`));
  } else {
    alert(
      `Please enter valid information (all entries have more than 3 characters)`
    );
  }
};

const clearForm = (...inputs) => {
  inputs.forEach(element => (element.value = null));
};

//!---------- Functions For Sign In
const getDataFromServerFn2 = () => {
  const emailRegex = /^\S{3,}$/;
  const passwordRegex = /^\S{3,}$/;

  const emailIsValid = emailRegex.test(loginEmailEl.value);
  const passwordIsValid = passwordRegex.test(loginPassEl.value);

  if (emailIsValid && passwordIsValid) {
    fetch(api)
      .then(res => res.json())
      .then(data => {
        let usersObjSignIn = Object.entries(data) || {}; //!----if res is Null ?
        checkUserInDatas2(usersObjSignIn);
      })
      .catch(err => console.log(err))
      .finally(() => console.log(`getDataFromServerFn2 Finished`));
  } else {
    alert(
      `Please enter valid information (all entries have more than 3 characters)`
    );
  }
};

const checkUserInDatas2 = usersObjSignIn => {
  let isUserExists = false;
  for (const [key, value] of usersObjSignIn) {
    if (
      loginEmailEl.value === value.email &&
      loginPassEl.value === value.password
    ) {
      // console.log(`user alredy existed :) login please`);
      isUserExists = true;
      break;
    }
  }
  if (isUserExists) {
    // console.log(`چون کاربر هست لاگین موفق هست`);
    messageEl.innerHTML = `Successfully login`;
    messageEl.style.display = 'block';
    clearForm(loginEmailEl, loginPassEl);

    setTimeout(() => {
      messageEl.style.display = 'none';
      window.location.href = 'http://127.0.0.1:5500/user-interface/index.html';
    }, 3e3);
  } else {
    // console.log(`الان باید کاربر رو ثبتنام کنی`);
    messageEl.innerHTML = `Your account was not found. Please register first.`;
    messageEl.style.display = 'block';
    clearForm(loginEmailEl, loginPassEl);
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 3e3);
    activateContainer();
  }
};

//!---------- Events
btnSignInEl.addEventListener('click', getDataFromServerFn);
btnLoginEl.addEventListener('click', getDataFromServerFn2);

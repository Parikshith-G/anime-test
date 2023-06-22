"use-strict";
let account1 = {
  name: "Parikshith G",
  type: "admin",
  profanityLimit: 3,
  pin: 1111,
};
let account2 = {
  name: "Worms Sama",
  type: "notAdmin",
  profanityLimit: 3,
  pin: 2222,
};

let account3 = {
  name: "t",
  type: "notAdmin",
  profanityLimit: 3,
  pin: 1,
};
let profanities = {
  fuck: 1,
};

let accounts = [account1, account2, account3];
let messagesInGlobal = [];
let blocked = {};
/*------------------------------------------------------------------*/
let changeName = document.querySelector(".change-name");
let login = document.querySelector(".login");
let signup = document.querySelector(".signup");
let loginModal = document.querySelector(".login-maker");
let loginButton = document.querySelector(".login-buton");

let signUpModal = document.querySelector(".sign-up-maker");
let signUpButton = document.querySelector(".sign-up-buton");

let loginText = document.querySelector(".login-text");
let loginPin = document.querySelector(".login-pin");

let signUpText = document.querySelector(".sign-up-text");
let signUpPin = document.querySelector(".sign-up-pin");

let welcomeText = document.querySelector(".welcome");

let changer = document.querySelector(".changer");
let nameChangeText = document.querySelector(".name-change-text");
let pinChangeText = document.querySelector(".pin-change-text");

let nameChangeButton = document.querySelector(".change-name");
let pinChangeButton = document.querySelector(".change-pin");
let deleteAccount = document.querySelector(".delete-account");
let sendMessageBox = document.querySelector(".send-message-box");

let sendGlobalText = document.querySelector(".send-message-button");
let globalText = document.querySelector(".global-text");

/*------------------------------------------------------------------*/

let currentAccount;

login.addEventListener("click", () => {
  loginModal.style.display = "block";
});

window.addEventListener("click", (event) => {
  if (event.target === loginModal) loginModal.style.display = "none";
  if (event.target === signUpModal) signUpModal.style.display = "none";
});

loginButton.addEventListener("click", function (e) {
  const name = loginText.value;
  const pin = Number(loginPin.value);
  if (pin < 999 || pin > 9999) {
    alert("pin should be 4 numebers");
    loginPin.value = "";
    return;
  }
  currentAccount = accounts.find((acc) => acc.name === name);
  if (currentAccount?.pin == pin) {
    loginModal.style.display = "none";
    sendMessageBox.style.display = "block";
    let name = currentAccount.name.split(" ");
    welcomeText.textContent = `Welcome ${name[0]} Sama`;
    loginPin.value = "";
    loginText.value = "";
    changer.style.display = "block";
  } else {
    alert("Account does not exist");
    loginPin.value = "";
    loginText.value = "";
  }
});

signup.addEventListener("click", function (e) {
  signUpModal.style.display = "block";
});

signUpButton.addEventListener("click", function (e) {
  const name = signUpText.value;
  const pin = Number(signUpPin.value);
  if (pin < 999 || pin > 9999) {
    alert("Pin must be 4 digits");
    signUpPin.value = "";
  }
  const user = {
    name: name,
    type: "notAdmin",
    profanityLimit: 3,
    pin: pin,
  };
  getIPAddress();
  const check = accounts.find((acc) => acc.name == user.name);
  if (check) {
    alert("Account already exists");
    signUpPin.value = "";
    signUpText.value = "";
    return;
  } else {
    accounts.push(user);
    signUpModal.style.display = "none";
    signUpPin.value = "";
    signUpText.value = "";
  }
});

nameChangeButton.addEventListener("click", function (e) {
  const name = nameChangeText.value;
  if (name.length === 0) {
    alert("Name must be specified");
    nameChangeText.value = "";
    return;
  } else {
    const check = accounts.find((acc) => acc.name === name);
    if (check) {
      alert("That name cannot be choosen");
      nameChangeText.value = "";
      return;
    } else {
      currentAccount.name = name;
      nameChangeText.value = "";
    }
  }
});
pinChangeButton.addEventListener("click", function (e) {
  const pin = pinChangeText.value;
  if (pin < 999 || pin > 9999) {
    alert("pin must be 4 digits");
    pinChangeText.value = "";
    return;
  } else {
    currentAccount.pin = pin;
    pinChangeText.value = "";
  }
});

deleteAccount.addEventListener("click", function (e) {
  var ckeck = confirm("Are you sure you want to delete account?");
  if (ckeck) {
    const ele = accounts.indexOf(currentAccount);
    accounts.splice(ele, 1);
    changer.style.display = "none";
    sendMessageBox.style.display = "none";
    welcomeText.textContent = ``;
  }
});

let getDate = (param) => {
  param = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "short",
  };
  const locale = navigator.language;
  const makeDate = new Intl.DateTimeFormat(locale, options).format(param);
  return makeDate;
};

sendGlobalText.addEventListener("click", function (e) {
  let message = globalText.value;
  message = message.replace(/\s+$/, "").replace(/^\s+/, "");
  // globalText.value = "";
  let checker = message.split(" ");
  let marker = 1;
  for (let i = 0; i < checker.length; i++) {
    if (checker[i] in profanities) {
      marker = -1;
      break;
    }
  }
  if (!message) {
    return;
  }

  if (currentAccount.profanityLimit == 0) {
    alert(
      "account deleted for excessive use of profanities. Your ip has been captured and you cant create any more accounts from that ip"
    );
    const ele = accounts.indexOf(currentAccount);
    accounts.splice(ele, 1);
    changer.style.display = "none";
    sendMessageBox.style.display = "none";

    welcomeText.textContent = ``;
    return;
  }
  if (marker == -1) {
    alert("dont use profanities");
    currentAccount.profanityLimit--;
    return;
  }
  let curTime = getDate(undefined);
  let name = currentAccount.name.split(" ");
  let nickname = "";
  name.forEach((n) => (nickname += n[0]));
  let html = `<div class="those-messages">
  <div class='row'>
  <div class="col-md-6">${message}</div>
  <div class="col-md-5 smol">at ${curTime} by ${nickname}</div>

  
  </div>
  
  </div>`;
  document
    .querySelector(".those-messages")
    .insertAdjacentHTML("beforeend", html);
});

// setInterval(() => {
//   console.log(accounts);
// }, 4000);

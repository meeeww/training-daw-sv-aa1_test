let confirmaciones = [];
confirmaciones.length = 6;
confirmaciones.fill(false);

const handleFillCountry = _.debounce((ev) => {
  // only show matched events
  confirmaciones[2] = false;
  document.getElementById("countryCorrect").style.display = "none";
  document.getElementById("notCountryCorrect").style.display = "block";

  const node = ev.target.parentNode.getElementsByClassName("search-box")[0];
  node.style.display = "initial";
  node.innerHTML = "";

  let inputText = ev.target.value.toLowerCase();

  for (let country of countryList) {
    if (country.toLocaleLowerCase().startsWith(inputText)) {
      let row = document.createElement("div");
      row.innerText = country;
      row.onclick = selectCountry;

      node.appendChild(row);
    }
  }
}, 300);

//
function validateName(event) {
  const name = event.target.value;

  if (name.length > 7) {
    confirmaciones[0] = true;
    showElementWithClassName(event.target, "valid-feedback");
    hideElementWithClassName(event.target, "invalid-feedback");
  } else {
    confirmaciones[0] = false;
    showElementWithClassName(event.target, "invalid-feedback");
    hideElementWithClassName(event.target, "valid-feedback");
  }

  return false;
}

function validatePassword(event) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //tambien añadi por special characters
  const password = event.target.value;

  if (password.match(regex)) {
    //hay que dar feedback de por que da error en la contraseña
    confirmaciones[3] = true;
    showElementWithClassName(event.target, "valid-feedback");
    hideElementWithClassName(event.target, "invalid-feedback");
  } else {
    confirmaciones[3] = false;
    showElementWithClassName(event.target, "invalid-feedback");
    hideElementWithClassName(event.target, "valid-feedback");
  }

  return false;
}

function validateEmail(event) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const email = event.target.value;

  if (email.toLowerCase().match(regex)) {
    confirmaciones[1] = true;
    showElementWithClassName(event.target, "valid-feedback");
    hideElementWithClassName(event.target, "invalid-feedback");
  } else {
    confirmaciones[1] = false;
    showElementWithClassName(event.target, "invalid-feedback");
    hideElementWithClassName(event.target, "valid-feedback");
  }

  return false;
}

function checkGender() {
  confirmaciones[4] = true;
  //if (document.getElementById("notSelectedGender").style.display != "none") { // este if estaría mejor, pero por el ultimo punto que hay en el readme, lo quito
  document.getElementById("selectedGender").style.display = "block";
  document.getElementById("notSelectedGender").style.display = "none";

  return false;
}

function checkBox() {
  confirmaciones[5] = true;

  return false;
}

// general register
function register(event) {
  event.preventDefault();

  if (confirmaciones.includes(false)) {
    document.getElementById("invalid-register-button").style.display = "block";
    if (!confirmaciones[4]) {
      document.getElementById("selectedGender").style.display = "none";
      document.getElementById("notSelectedGender").style.display = "block";
    }
    if (!confirmaciones[3]) {
      document.getElementById("passwordCorrect").style.display = "none";
      document.getElementById("notPasswordCorrect").style.display = "block";
    }
    if (!confirmaciones[2]) {
      document.getElementById("countryCorrect").style.display = "none";
      document.getElementById("notCountryCorrect").style.display = "block";
    }
    if (!confirmaciones[1]) {
      document.getElementById("emailCorrect").style.display = "none";
      document.getElementById("notEmailCorrect").style.display = "block";
    }
    if (!confirmaciones[0]) {
      document.getElementById("usernameCorrect").style.display = "none";
      document.getElementById("notUsernameCorrect").style.display = "block";
    }
  } else {
    document.getElementById("invalid-register-button").style.display = "none";
    fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify({
        name: "sample",
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  return false;
}

// utility functions
function showElementWithClassName(node, className) {
  node.parentNode.getElementsByClassName(className)[0].style.display = "initial";
}
function hideElementWithClassName(node, className) {
  node.parentNode.getElementsByClassName(className)[0].style.display = "none";
}
function selectCountry(event) {
  document.forms[0].country.value = event.target.innerText;
  confirmaciones[2] = true;

  if (document.getElementById("notCountryCorrect").style.display != "none") {
    document.getElementById("countryCorrect").style.display = "block";
    document.getElementById("notCountryCorrect").style.display = "none";
  }

  const node = document.getElementsByClassName("search-box")[0];
  node.style.display = "none";
  node.innerHTML = "";
}

function init() {
  let items = document.getElementsByClassName("valid-feedback");
  for (const item of items) {
    item.style.display = "none";
  }
  items = document.getElementsByClassName("invalid-feedback");
  for (const item of items) {
    item.style.display = "none";
  }

  document.getElementsByClassName("search-box")[0].style.display = "none";
}

init();

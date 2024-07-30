// Fonction pour modifier la navigation
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Éléments du DOM
const modalbg = document.querySelector(".bground"); // Modale Formulaire
const modalBtn = document.querySelectorAll(".modal-btn"); // Bouton "Je m'inscris"
const modalBtnClose = document.querySelectorAll(".close"); // Bouton "Fermer"

// Récupérer les valeurs des champs
function getFormValues() {
  return {
    firstname: document.getElementById("firstName").value,
    lastname: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    birthdate: document.getElementById("birthdate").value,
    quantity: document.getElementById("quantity").value,
    location: getCheckedLocation(),
    termsAccepted: document.getElementById("checkbox1").checked,
    notifyMe: document.getElementById("checkbox2").checked,
  };
}

// Définir l'expression régulière pour valider l'email
let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Récupérer la valeur du bouton radio sélectionné
function getCheckedLocation() {
  let locations = document.getElementsByName("location");
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      return locations[i].value;
    }
  }
  return undefined;
}

// Fonction pour lancer la modal
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction pour fermer la modal
function closeModal() {
  modalbg.style.display = "none";
}

// Écouter les événements de lancement et de fermeture de la modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtnClose.forEach((btn) => btn.addEventListener("click", closeModal));

function validateFirstname(firstname) {
  const firstname_error = document.getElementById("firstName_error");
  if (firstname.length < 2) {
    firstname_error.classList.remove("hidden");
    firstname_error.innerHTML =
      "Le prénom doit contenir au moins 2 caractères.";
    throw new Error("Le prénom doit contenir au moins 2 caractères.");
  } else {
    firstname_error.classList.add("hidden");
  }
}

function validateLastname(lastname) {
  const lastname_error = document.getElementById("lastName_error");
  if (lastname.length < 2) {
    lastname_error.classList.remove("hidden");
    lastname_error.innerHTML = "Le nom doit contenir au moins 2 caractères.";
    throw new Error("Le nom doit contenir au moins 2 caractères.");
  } else {
    lastname_error.classList.add("hidden");
  }
}

function validateEmail(email) {
  const email_error = document.getElementById("email_error");
  if (!regexEmail.test(email)) {
    email_error.classList.remove("hidden");
    email_error.innerHTML = "L'email n'est pas valide.";
    throw new Error("L'email n'est pas valide.");
  } else {
    email_error.classList.add("hidden");
  }
}

function validateBirthdate(birthdate) {
  const birthdate_error = document.getElementById("birthdate_error");
  if (birthdate === "") {
    birthdate_error.classList.remove("hidden");
    birthdate_error.innerHTML = "La date de naissance est obligatoire.";
    throw new Error("La date de naissance est obligatoire.");
  } else {
    const today = new Date();
    const birthDate = new Date(birthdate);
    if (birthDate >= today) {
      birthdate_error.classList.remove("hidden");
      birthdate_error.innerHTML =
        "La date de naissance doit être antérieure à la date d'aujourd'hui.";
      throw new Error(
        "La date de naissance doit être antérieure à la date d'aujourd'hui."
      );
    } else {
      birthdate_error.classList.add("hidden");
    }
  }
}

function validateQuantity(quantity) {
  const quantity_error = document.getElementById("quantity_error");
  if (quantity === "") {
    quantity_error.classList.remove("hidden");
    quantity_error.innerHTML = "Le nombre de tournois est obligatoire.";
    throw new Error("Le nombre de tournois est obligatoire.");
  } else {
    quantity_error.classList.add("hidden");
  }
}

function validateLocation(location) {
  const location_error = document.getElementById("location_error");
  if (location === undefined) {
    location_error.classList.remove("hidden");
    location_error.innerHTML = "Le lieu de participation est obligatoire.";
    throw new Error("Le lieu de participation est obligatoire.");
  } else {
    location_error.classList.add("hidden");
  }
}

function validateTerms(termsAccepted) {
  const terms_error = document.getElementById("terms_error");
  if (!termsAccepted) {
    terms_error.classList.remove("hidden");
    terms_error.innerHTML = "Veuillez accepter les conditions d'utilisation.";
    throw new Error("Veuillez accepter les conditions d'utilisation.");
  } else {
    terms_error.classList.add("hidden");
  }
}

// Afficher les valeurs dans la console
function showValues(formValues) {
  console.log("Prénom :", formValues.firstname);
  console.log("Nom :", formValues.lastname);
  console.log("Email :", formValues.email);
  console.log("Date de naissance :", formValues.birthdate);
  console.log("Nombre de tournois :", formValues.quantity);
  console.log("Lieu de participation :", formValues.location);
  console.log("Conditions acceptées :", formValues.termsAccepted);
  console.log("Prévenir des prochains événements :", formValues.notifyMe);
}

// Fonction de validation du formulaire avec try...catch
function validate(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  const formValues = getFormValues();

  try {
    validateFirstname(formValues.firstname);
    validateLastname(formValues.lastname);
    validateEmail(formValues.email);
    validateBirthdate(formValues.birthdate);
    validateQuantity(formValues.quantity);
    validateLocation(formValues.location);
    validateTerms(formValues.termsAccepted);
    showValues(formValues);
    closeModal();
    alert("Formulaire validé avec succès");
  } catch (error) {
    console.error(error.message);
  }
}

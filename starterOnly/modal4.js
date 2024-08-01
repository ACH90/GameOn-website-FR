// Fonction pour modifier la navigation
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Éléments Modale
const modalbg = document.querySelector(".bground"); // Modale Formulaire
const modalBtn = document.querySelectorAll(".modal-btn"); // Bouton "Je m'inscris"
const modalBtnClose = document.querySelectorAll(".close"); // Bouton "Fermer"

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

//Fonctions Afficher Erreur
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.classList.remove("hidden");
  errorElement.innerHTML = message;
  throw new Error(message);
}

//Fonctions Cacher Erreur
function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.classList.add("hidden");
}

//Fonction de validation globale des elements du formulaire -- Cacher ou afficher les erreurs
function hideOrShowError(validation, elementId, messageError) {
  if (!validation) {
    showError(elementId, messageError);
  } else {
    hideError(elementId);
  }
}

//Fonction CharactereNumberMin
function charactereNumberMin(element, elementId, min, messageError) {
  if (element.length < min) {
    showError(elementId, messageError);
  } else {
    hideError(elementId);
  }
}

//Fonction ValidationRegex
function validationRegex(email, elementId, regex, messageError) {
  if (!regex.test(email)) {
    showError(elementId, messageError);
  } else {
    hideError(elementId);
  }
}

//Fonction AnteriorOrPosterior
function anteriorOrPosteriorDate(birthdate, elementId, messageError) {
  const today = new Date();
  const birthDate = new Date(birthdate);

  if (birthDate >= today) {
    showError(elementId, messageError);
  } else {
    hideError(elementId);
  }
}

//Fonctions de validation du formulaire

function validateFirstname(firstname) {
  hideOrShowError(firstname, "firstName_error", "Le prénom est obligatoire.");
  charactereNumberMin(
    firstname,
    "firstName_error",
    2,
    "Le prénom doit contenir au moins 2 caractères."
  );
}

function validateLastname(lastname) {
  hideOrShowError(lastname, "lastName_error", "Le nom est obligatoire.");
  charactereNumberMin(
    lastname,
    "lastName_error",
    2,
    "Le nom doit contenir au moins 2 caractères."
  );
}

function validateEmail(email) {
  hideOrShowError(email, "email_error", "L'email est obligatoire.");
  validationRegex(
    email,
    "email_error",
    regexEmail,
    "L'email n'est pas valide."
  );
}

function validateBirthdate(birthdate) {
  hideOrShowError(
    birthdate,
    "birthdate_error",
    "La date de naissance est obligatoire."
  );

  anteriorOrPosteriorDate(
    birthdate,
    "birthdate_error",
    "La date doit étre antérieure à la date d'aujourd'hui."
  );
}

function validateQuantity(quantity) {
  hideOrShowError(
    quantity,
    "quantity_error",
    "Le nombre de tournois est obligatoire."
  );
}

function validateLocation(location) {
  hideOrShowError(
    location,
    "location_error",
    "Le lieu de participation est obligatoire."
  );
}

function validateTerms(termsAccepted) {
  hideOrShowError(
    termsAccepted,
    "terms_error",
    "Veuillez accepter les conditions d'utilisation."
  );
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

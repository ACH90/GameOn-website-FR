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
const modalbg = document.querySelector(".bground"); //Modale Formulaire
const modalBtn = document.querySelectorAll(".modal-btn"); //Bouton "Je m'inscris"
const modalBtnClose = document.querySelectorAll(".close"); //Bouton "Fermer"

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

// Fonction de validation du formulaire
function validate(event) {
  event.preventDefault(); // Empêche le rechargement de la page
  // Récupérer les valeurs des champs
  const firstname = document.getElementById("firstName").value;
  let lastname = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let birthdate = document.getElementById("birthdate").value;
  let quantity = document.getElementById("quantity").value;

  const firstname_error = document.getElementById("firstName_error");
  const lastname_error = document.getElementById("lastName_error");
  const email_error = document.getElementById("email_error");
  const birthdate_error = document.getElementById("birthdate_error");
  const quantity_error = document.getElementById("quantity_error");
  const location_error = document.getElementById("location_error");
  const terms_error = document.getElementById("terms_error");

  // Définir l'expression régulière pour valider l'email
  let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Récupérer la valeur du bouton radio sélectionné
  let location;
  let locations = document.getElementsByName("location");
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      location = locations[i].value;
      break;
    }
  }

  // Récupérer les valeurs des cases à cocher
  let termsAccepted = document.getElementById("checkbox1").checked;
  let notifyMe = document.getElementById("checkbox2").checked;

  // Validation des champs

  if (firstname.length < 2) {
    event.preventDefault();
    firstname_error.classList.remove("hidden");
    firstname_error.innerHTML =
      "Le prénom doit contenir au moins 2 caractères.";

    return false;
  } else {
    firstname_error.classList.add("hidden");
  }

  if (lastname.length < 2) {
    event.preventDefault();
    lastname_error.classList.remove("hidden");
    lastname_error.innerHTML = "Le nom doit contenir au moins 2 caractères.";
    return false;
  } else {
    lastname_error.classList.add("hidden");
  }

  if (!regexEmail.test(email)) {
    event.preventDefault();
    email_error.classList.remove("hidden");
    email_error.innerHTML = "L'email n'est pas valide.";
    return false;
  } else {
    email_error.classList.add("hidden");
  }

  if (birthdate == "") {
    event.preventDefault();
    birthdate_error.classList.remove("hidden");
    birthdate_error.innerHTML = "La date de naissance est obligatoire.";
    return false;
  } else {
    const today = new Date();
    const birthDate = new Date(birthdate);
    if (birthDate >= today) {
      birthdate_error.classList.remove("hidden");
      birthdate_error.innerHTML =
        "La date de naissance doit être antérieure à la date d'aujourd'hui.";
      return false;
    } else {
      birthdate_error.classList.add("hidden");
    }
  }

  if (quantity == "") {
    event.preventDefault();
    quantity_error.classList.remove("hidden");
    quantity_error.innerHTML = "Le nombre de tournois est obligatoire.";
    return false;
  } else {
    quantity_error.classList.add("hidden");
  }

  //Validatin locations
  if (location === undefined) {
    location_error.classList.remove("hidden");
    location_error.innerHTML = "Le lieu de participation est obligatoire.";
    return false;
  } else {
    location_error.classList.add("hidden");
  }

  if (!termsAccepted) {
    event.preventDefault();
    terms_error.classList.remove("hidden");
    terms_error.innerHTML = "Veuillez accepter les conditions d'utilisation.";
    return false;
  } else {
    terms_error.classList.add("hidden");
  }

  // Afficher les valeurs dans la console

  console.log("Prénom :", firstname);
  console.log("Nom :", lastname);
  console.log("Email :", email);
  console.log("Date de naissance :", birthdate);
  console.log("Nombre de tournois :", quantity);
  console.log("Lieu de participation :", location);
  console.log("Conditions acceptées :", termsAccepted);
  console.log("Prévenir des prochains événements :", notifyMe);

  // Si tout est valide, fermer la fenêtre modale
  closeModal();

  alert("Formulaire validé avec succès");
  return true;
}

// Écouter l'événement de soumission du formulaire
// document
//   .querySelector('form[name="reserve"]')
//   .addEventListener("submit", function (event) {
//     try {
//       validate(event);
//       alert("Formulaire validé avec succès :");
//     } catch (error) {
//       alert(error.message);
//       event.preventDefault(); // Empêche la soumission du formulaire en cas d'erreur
//     }
//   });

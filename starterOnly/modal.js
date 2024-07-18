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

// Écouter les événements de lancement et de fermeture de la modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtnClose.forEach((btn) => btn.addEventListener("click", closeModal));

// Fonction pour lancer la modal
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction pour fermer la modal
function closeModal() {
  modalbg.style.display = "none";
}

// Fermer la modal en cliquant en dehors de celle-ci
// window.onclick = function (event) {
//   if (event.target == modalbg) {
//     modalbg.style.display = "none";
//   }
// };

// Fonction de validation du formulaire
function validate(event) {
  event.preventDefault(); // Empêche le rechargement de la page
  // Récupérer les valeurs des champs
  let firstname = document.getElementById("first").value;
  let lastname = document.getElementById("last").value;
  let email = document.getElementById("email").value;
  let birthdate = document.getElementById("birthdate").value;
  let quantity = document.getElementById("quantity").value;

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
    throw new Error("Le prénom doit contenir au moins 2 caractères.");
  }
  if (lastname.length < 2) {
    throw new Error("Le nom doit contenir au moins 2 caractères.");
  }
  if (!regexEmail.test(email)) {
    throw new Error("Veuillez entrer une adresse email valide.");
  }
  // Convertir la date de naissance en objet Date
  if (!birthdate || new Date(birthdate) > new Date()) {
    throw new Error("Veuillez entrer une date de naissance valide.");
  }
  if (quantity === "" || quantity < 0 || quantity > 99) {
    throw new Error("Veuillez entrer un nombre valide de tournois.");
  }
  if (!location) {
    throw new Error("Veuillez sélectionner un lieu de participation.");
  }
  if (!termsAccepted) {
    alert(
      "Vous devez accepter les conditions d'utilisation pour pouvoir participer au jeu."
    );
    throw new Error("Vous devez accepter les conditions d'utilisation.");
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

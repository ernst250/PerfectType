 // function afficherResultat(score, nbMotsProposes) {
//   console.log("Votre score est de " + score + " sur " + nbMotsProposes);
// }

// function choisirPhraseOuMots() {
//   let choix = prompt(
//     'Voulez-vous jouer avec les mots (entrer "mots") ou les phrases (entrer "phrases")?'
//   );
//   while (choix !== "mots" && choix !== "phrases") {
//     choix = prompt("Veuillez choisir la liste : mots ou phrases");
//   }
//   return choix;
// }

// function lancerBoucleDeJeu(listePropositions) {
//   let score = 0;

//   for (let i = 0; i < listePropositions.length; i++) {
//     let motUtilisateur = prompt("Recopiez : " + listePropositions[i]);
//     if (motUtilisateur === listePropositions[i]) {
//       score++;
//     }
//   }

//   return score;
// }

// function lancerJeu() {
//   let choix = choisirPhraseOuMots();

//   let listeChoisie = choix === "mots" ? listeMots : listePhrases;
//   let score = lancerBoucleDeJeu(listeChoisie);
//   let nbMotsProposes = listeChoisie.length;

//   afficherResultat(score, nbMotsProposes);
// }





/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
    
}
// nouvelle fonctio
function afficherProposition(proposition){
  let zoneProposition = document.querySelector(".zoneProposition")
  zoneProposition.innerText = proposition
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score PerfectType&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site de PerfectType  !`
    location.href = mailto
}
// Cette fonction valide le nom de l'utilisateur.
function validerNom(nom){
  if(nom.length >=2){
    return true
  }
  return false
}
// cette finction valide l'email de l'utilisateur
// Elle utilise une expression régulière pour vérifier le format de l'email.
// Si l'email est valide, elle retourne true, sinon false.
function validerEmail(email){
  let emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  if(emailRegex.test(email)){
    return true
  }
  return false
}
/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    let score = 0
    let i = 0
    let listProposition = listeMots
    
let monbouton = document.getElementById("btnValiderMot")
let inputEcriture = document.getElementById("inputEcriture")
afficherProposition(listProposition[i])
monbouton.addEventListener("click", ()=>{
    console.log(inputEcriture.value)
    if(inputEcriture.value === listProposition[i])
      score++
    i++
    afficherResultat(score, i)
    inputEcriture.value = ''
    if (listeMots[i] ===undefined){
      afficherProposition("le jeu est fini")
      btnValiderMot.disabled = true 
    }else{
      afficherProposition(listProposition[i])
    }
})
// recuperation de boutons radio
let listeBtnRadio = document.querySelectorAll(".optionSource input")
for(let index = 0; index < listeBtnRadio.length; index++){
  listeBtnRadio[index].addEventListener("change", (event)=>{
    console.log(event.target.value)
    if(event.target.value === "1"){
      listProposition = listeMots
    }else{
      listProposition = listePhrases
    }
    afficherProposition(listProposition[i])
  })
}
// Gestion de l'evenement de soumission du formulaire de partage du score
let form = document.querySelector("form")
form.addEventListener("submit",(event)=>{
  event.preventDefault()

  let baliseNom = document.getElementById("nom")
  let nom = baliseNom.value

  let baliseEmail = document.getElementById("email")
  let email = baliseEmail.value
  // Validation du nom et de l'email
  if (validerNom(nom) && validerEmail(email)) {
  let scoreEmail = `${score} / ${i}`
  afficherEmail(nom, email,scoreEmail)
}else{
  console.log("Erreur")
}
})
    
    afficherResultat(score, i)
}


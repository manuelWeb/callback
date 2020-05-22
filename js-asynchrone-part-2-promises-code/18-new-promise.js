// On crée une promesse avec le constructeur Promise

console.time('Accomplissement')

const promise = new Promise((resolve, reject) => {
  // Ceci est le *design pattern* “revealing constructor“ : seule la fonction de
  // rappel passée au constructeur a accès aux fonctions qui permettront
  // d'établir la promesse (accomplissement ou rejet) au bout du compte.  Ces
  // fonctions ne sont pas accessibles à l'extérieur, même en méthodes sur
  // l'objet promesse.

  // Cette fonction de rappel contient le traitement asynchrone, ou au moins son
  // déclenchement.  Ici, on s’accomplira avec la valeur 42 après 300ms.
  setTimeout(() => resolve(42), 300)
})

promise.then((result) => {
  console.timeEnd('Accomplissement')
  console.log('Valeur d’accomplissement :', result)
})

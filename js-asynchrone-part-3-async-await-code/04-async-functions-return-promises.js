// Une fonction asynchrone renvoie implicitement une promesse

async function sayWhat(what) {
  return what
}

// Affiche « Promise { 'Captain' } » ou un équivalent
console.log(sayWhat('Captain'))

// Affiche bien `Captain`, puisqu'on logue à l'accomplissement de la promesse
// renvoyée.
sayWhat('Captain').then(console.log)

// Une levée d’exception entraîne donc une promesse rejetée.
async function kaboom() {
  throw new Error('KABOOM')
}
kaboom().catch((err) => console.warn(err.message))

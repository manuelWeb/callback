// Mise en concurrence de promesses avec `Promise.race()`

let contestants = [200, 'KABOOM', 300].map(wait)
// On produit une promesse basée sur un tableau d'autres promesses.  Dès que
// l’une d’elles s’établit (accomplissement ou rejet), on propage en ignorant
// les autres.
const thrownRace = Promise.race(contestants)

console.time('thrownRace')
// Remarquez le `catch` : on sait qu’on va propager un rejet.
thrownRace.catch((err) => {
  // Affichera ~0ms (rejet immédiat par la 2e promesse) et KABOOM.
  console.timeEnd('thrownRace')
  console.log('Erreur :', err.message)
})

contestants = [200, 100, 300].map(wait)
const regularRace = Promise.race(contestants)

console.time('regularRace')
regularRace.then((result) => {
  // Affichera ~100ms (la plus rapide des 3, puisqu'on a parallélisé) et 100.
  console.timeEnd('regularRace')
  console.log('Résultat :', result)
})

// --------------------------------------------------------------------

function wait(delayOrErrMessage) {
  return new Promise((resolve, reject) => {
    if (typeof delayOrErrMessage === 'string') {
      reject(new Error(delayOrErrMessage))
    }
    setTimeout(() => resolve(delayOrErrMessage), delayOrErrMessage)
  })
}

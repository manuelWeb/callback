// Parallélisation de promesses avec `Promise.all()`

// Soit un tableau de 3 promesses qui s'accompliront à différents moments
// (d'abord la première, puis la troisième, puis la deuxième).
const waiters = [100, 300, 200].map(wait)

// On produit une promesse « combinée » basée sur un tableau d'autres promesses.
// - Si l'une d'elles rejette, on propage le rejet illico.
// - Sinon, on attend que toutes soient accomplies, et on s'accomplit avec le
//   tableau de leurs résultats *dans l'ordre de définition*.
const parallelWait = Promise.all(waiters)

console.time('parallelWait')
parallelWait.then((results) => {
  // Affichera ~300ms (la plus longue des 3, puisqu'on a parallélisé).
  console.timeEnd('parallelWait')
  // Affichera `[100, 300, 200]` (et non `[100, 200, 300]`, ordre chronologique
  // d'accomplissement).
  console.log('Résultats :', results)
})

// --------------------------------------------------------------------

function wait(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(delay), delay))
}

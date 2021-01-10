// Itérer avec des fonctions de rappel asynchrones ne séquence pas les
// promesses…
//
// Ce n'est pas intrinsèquement mauvais : voir 11-better-async-promise-all.js
// pour un exemple d'utilisation pertinente.

const { delay } = require('awaiting')

const delays = [100, 200, 300]

console.time('forEach')
// Attention ! Ce code se contente de déclencher 3 promesses, sans en attendre
// la complétion ! Le `timeEnd` aura lieu au bout de ~1ms, avant les `timeLog`
// qui ne trouveront donc pas de label `"forEach"` en vigueur…
delays.forEach(async (ms) => {
  await delay(ms)
  console.timeLog('forEach', ms)
})
console.timeEnd('forEach')

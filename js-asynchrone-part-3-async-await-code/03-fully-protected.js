// Une fonction `async` protège 100% de son code par une chaîne de promesses

const { stat } = require('fs').promises

async function faultySize(path) {
  // AÏE ! `strip()` n’existe pas, en JS c’est `trim()`…
  path = path.strip()
  const { size } = await stat(path)
  return size
}

console.time('size')
faultySize('regular')
  // On n’y arrivera jamais…
  .then((size) => console.timeEnd('size', size))
  // …mais on arrivera bien ici, l’erreur initiale étant bien capturée par la
  // chaîne d’exception en vigueur dans toute la fonction `async` :-)
  .catch((err) => console.warn('size', err.message))

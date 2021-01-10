// Pas d’await ? Aucun intérêt à utiliser une fonction `async`

const { readdir } = require('fs').promises

needlessAsync(process.argv[2] || process.cwd()).then(console.log)

// Il est absolument inutile que cette fonction soit déclarée `async` : elle ne
// fait pas de `await`, elle renvoie juste une promesse, qu’elle va donc enrober
// inutilement par une autre.  Autant virer le `async`, ça marchera pareil mais
// en plus léger et moins déroutant.
async function needlessAsync(path) {
  return readdir(path)
}

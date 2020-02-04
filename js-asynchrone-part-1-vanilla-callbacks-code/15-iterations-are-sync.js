// Les méthodes sur itérables, notamment Array, sont orientées synchrones…

const { readdirSync, stat } = require('fs')
const { join: joinPaths } = require('path')

function getFileSize(path, callback) {
  stat(path, (err, desc) => callback(null, desc.size))
}

const names = readdirSync(process.cwd())

console.log(names.map(getFileSize))
// Ça va afficher `undefined` pour chaque nom, puisque `getFileSize` ne renvoie
// rien (donc `undefined`).
//
// Par la suite ça plantera à la première tentative d'exploiter le résultat d'un
// appel `stat`, puisque l'argument passé à `getFileSize` pour `callback`, au
// sein de la méthode `map` du tableau, sera en fait un index numérique et non
// une fonction de rappel.

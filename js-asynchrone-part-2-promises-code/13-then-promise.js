// Quand un callback passé à `.then` renvoie une promesse, elle devient le sujet
// du `.then` suivant dans la chaîne : elle est incrustée à la volée, ce qui
// permet d’aplatir une cascade d’appels dépendants (“waterfall”).

const { join: joinPaths } = require('path')
const { readdir, stat } = require('fs').promises

const path = process.cwd()
readdir(path)
  .then((names) => stat(joinPaths(path, names[0])))
  .then(({ size }) => console.log(`Le premier fichier fait ${size} octets`))

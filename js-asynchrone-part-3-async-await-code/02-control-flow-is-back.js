// async/await nous permet de récupérer nos instructions de contrôle de flux,
// dont la gestion des exceptions !

const { join: joinPaths } = require('path')
const { readdir, stat } = require('fs').promises

run(process.argv[2] || process.cwd())

async function run(path) {
  // Les exceptions surviennent dans la bonne portée…
  try {
    const results = []

    // Les boucles marchent…
    for (const name of await readdir(path)) {
      // Remarquez qu'ici on ne parallélise pas les appels `stat` au système de
      // fichier ; pour cela, il faudrait générer toutes les promesses d’abord
      // et faire un `Promise.all` sur le résultat, par exemple.
      const { size } = await stat(joinPaths(path, name))
      results.push({ name, size })
    }

    console.table(results)
  } catch (err) {
    console.warn(err.message)
  }
}

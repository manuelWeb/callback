// On peut paralléliser avec un `await` sur un `Promise.all`.
//
// Note : on pourra faire mieux que ça dans la prochaine version.

const { join: joinPaths } = require('path')
const { readdir, stat } = require('fs').promises

run(process.argv[2] || process.cwd())

async function run(path) {
  const names = await readdir(path)
  // On déclenche l'ensemble des promesses d'appel `stat` à l’avance, avant le
  // `await`, de sorte qu'elles sont parallélisées.
  const stats = names.map((name) => stat(joinPaths(path, name)))
  const results = []

  // Un `await` sur le `Promise.all` suspendra pour au final renvoyer le tableau
  // des valeurs accomplies ; en appelant `.entries()` on récupère au passage
  // les index, pour récupérer le nom associé dans `names`.  On va faire mieux
  // tout à l’heure.
  for (const [index, { size }] of (await Promise.all(stats)).entries()) {
    results.push({ name: names[index], size })
  }

  console.table(results)
}

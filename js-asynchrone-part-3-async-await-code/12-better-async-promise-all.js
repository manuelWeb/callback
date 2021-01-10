// On peut paralléliser avec un `await` sur un `Promise.all`.

const { join: joinPaths } = require('path')
const { readdir, stat } = require('fs').promises

run(process.argv[2] || process.cwd())

async function run(path) {
  const names = await readdir(path)
  // Remarquez que le callback est lui-même `async` : il renvoie donc bien une
  // promesse.  Mais celle-ci pré-construira l’objet `{ name, size }` associé,
  // pour nous éviter de devoir retravailler le tableau des résultats par la
  // suite avec des hacks à base d’index…
  const stats = names.map(async (name) => {
    const { size } = await stat(joinPaths(path, name))
    return { name, size }
  })

  console.table(await Promise.all(stats))
}

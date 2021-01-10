// `await` sur une promesse

const { readdir } = require('fs').promises

listFiles(process.argv[2] || process.cwd())

async function listFiles(path) {
  try {
    const names = await readdir(path)
    // Sur un dossier lisible, suspend jusqu’à l’accomplissement de la
    // promesse, puis au dégel `names` vaudra la valeur accomplie.
    console.log('readdir dit :', names)
  } catch (err) {
    // Sur un dossier illisible, suspend jusqu’au rejet de la promesse, puis
    // au dégel lèvera l’exception du rejet, qu’on capture donc ici.
    console.warn('readdir a échoué :', err.message)
  }
}

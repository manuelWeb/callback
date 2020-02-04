// Callbacks « façon Node » : l’erreur en premier

const { join: joinPaths } = require('path')
const { readdir, stat } = require('fs')

const path = process.argv[2] || process.cwd()

readdir(path, (err, names) => {
  if (err) {
    console.warn(err.message)
    process.exit(64) // EX_USAGE
  }

  console.log(`${names.length} fichiers`)
  if (names.length > 0) {
    const fullPath = joinPaths(path, names[0])
    stat(fullPath, (err, stats) => {
      if (err) {
        console.warn(err.message)
        process.exit(74) // EX_IOERR
      }
      console.log(`${names[0]} fait ${stats.size} octets`)
    })
  }
})

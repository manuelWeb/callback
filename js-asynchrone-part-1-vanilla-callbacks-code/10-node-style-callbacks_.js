// Callbacks « façon Node » : l’erreur en premier
const { join: joinPaths } = require('path')
const { readdir, stat } = require('fs')

const path = process.argv[2] || process.cwd()

readdir(path, (err, names) => {
  if (err) {
    console.warn(err.message); process.exit(64) // EX_USAGE
  }

  if (names.length > 0) {

    names.map(i => {
      const fullPath = joinPaths(path, i)
      stat(fullPath, (err, stats) => {
        // console.log(fullPath);
        stats.isDirectory() ?
          // console.log(`${i}: ${stats.isDirectory()}`)
          // readdir(joinPaths(path, i))
          console.log(joinPaths(path, i))
          :
          console.log(`${i} fait ${stats.size}`)
        // console.log(`${i} fait ${stats.size} octet, dossier?: ${stats.isDirectory()}`);
        if (err) {
          console.warn(err.message); process.exit(64)
        }
      })
    })
  }
})

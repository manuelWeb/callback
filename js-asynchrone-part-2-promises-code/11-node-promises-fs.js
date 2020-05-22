// Promesses natives en Node : l’API noyau `fs.promises`

const { join: joinPaths } = require('path')
const { readdir, stat } = require('fs').promises

const path = process.cwd()
let names

readdir(path)
  .then((fileNames) => {
    names = fileNames
    const paths = names.map((name) => joinPaths(path, name))
    const statPromises = paths.map((path) => stat(path))
    return Promise.all(statPromises)
  })
  .then((stats) => {
    const data = stats.map(({ size }, index) => ({ name: names[index], size }))
    console.table(data)
  })
  .catch((err) => {
    console.warn(err)
  })

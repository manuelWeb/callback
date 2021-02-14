// Une fonction `async` protège 100% de son code par une chaîne de promesses
const { stat, readdir } = require('fs').promises
const { resolve, join } = require('path')

const pathfile = process.argv[2] || process.cwd()

async function firstFile(dirpath) {
  const curDir = await readdir(dirpath);
  return join(dirpath, curDir[0])
}

async function truthySize(path) {
  path = path.trim()
  let fstat = await stat(path)
  let fname = fstat.isDirectory() ?
    await firstFile(path).then(path => path.substring(path.lastIndexOf('/') + 1))
    : path.substring(path.lastIndexOf('/') + 1)
  if (fstat.isDirectory()) fstat = await stat(await firstFile(path))
  return { name: fname, size: fstat.size }
}
// exec time = id timer
console.time('exec time')

truthySize(pathfile)
  .then((obj, time) => {
    console.log(`file name: ${obj.name}, file size: ${obj.size} octets`)
    console.timeEnd('exec time', time)
  })
  // .then(console.log)
  // // chaîne d’exception en vigueur dans toute la fonction `async` :-)
  .catch((err) => console.warn('size', err.message))

// Piège de callback usuel : oublier de propager l’erreur

const { readdir } = require('fs')

function myReadDir(path, callback) {
  readdir(path, (err, names) => {
    // Oops, on ne propage pas l'erreur vers `callback`

    callback(null, names)
  })
}

const path = process.argv[2] || process.cwd()

myReadDir(path, (err, names) => {
  // On ne rentrera jamais ici : les erreurs ne sont pas propagées par
  // myReadDir… :-(
  if (err) {
    console.warn(err.message)
    process.exit(64) // EX_USAGE
  }

  // Du coup on ira toujours ici, et ce sera `undefined` en cas de souci.
  console.log(names)
})

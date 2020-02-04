// Piège de callback usuel : appels contradictoires

const { readdir } = require('fs')

function myReadDir(path, callback) {
  readdir(path, (err, names) => {
    if (err) {
      callback(err)
      // Oops, on oublie le `return` !
    }

    callback(null, names)
  })
}

const path = process.argv[2] || process.cwd()

myReadDir(path, (err, names) => {
  if (err) {
    // On rentrera ici car les erreurs sont bien propagées…
    console.warn(err.message)
  } else {
    // …mais on rentrera aussi ici juste après, car `myReadDir` oublie de
    // s'arrêter après la propagation d'erreur, et appellera donc le callback en
    // mode succès aussi !
    console.log(names)
  }
})

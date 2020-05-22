// Autoriser un usage promesse ET callback de notre API

function chooseYourPoison(delay, callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Version promesse
      resolve(delay)

      // Version callback
      if (typeof callback === 'function') {
        // On va supposer un callback « façon Node », donc l’erreur éventuelle
        // en premier.  Notez qu’il sera déclenché *avant* l’accomplissement de
        // promesse, qui est garanti asynchrone à partir de l’appel à
        // `resolve()`, alors qu’ici on appelle `callback` dans la même passe
        // d’exécution.
        callback(null, delay)
      }
    }, delay)
  })
}

chooseYourPoison(200, (err, result) => {
  console.log('Le callback dit', result)
}).then((result) => {
  console.log('La promesse dit', result)
})

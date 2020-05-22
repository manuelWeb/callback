// Quand un callback passé à `.then` lève une exception, celle-ci est convertie
// en promesse rejetée avec l’objet erreur, et doit être traitée plus loin dans
// la chaîne soit via le 2e callback d’un `.then`, soit via un `.catch`.  Comme
// dans un `try/catch` synchrone, ça neutralise l’erreur (et peut altérer la
// valeur dans la suite de la chaîne).

Promise.resolve()
  .then(() => {
    // Du coup ce `then` va produire une promesse rejetée pour la suite
    throw new Error('KABOOM')
  })
  // Ce `catch` va la neutraliser, en l'affichant au passage
  .catch((err) => console.warn(err))
  // Du coup vu qu'on n'est plus rejet, on rentre bien dans ce 1er callback
  .then(() => console.log('Ouf !'))
  .then(
    () => {
      // Et RE-BIM
      throw new Error('KABOOM')
    },
    (err) => {
      // On ne rentrera pas dans ce 2e callback, car il est au même niveau que le
      // code qui déclenche l’exception : l’appeler enfreindrait la garantie
      // d’exclusivité.  Un callback de rejet capture toute exception **plus
      // haut** dans la chaîne.
      console.log('Jamais appelé :', err)
    }
  )
  // Remarquez comme le catch, en plus de neutraliser l’erreur, peut fournir une
  // valeur d’accomplissement pour la suite de la chaîne.
  .catch(() => 42)
  .then((result) => console.log('Et donc,', result))

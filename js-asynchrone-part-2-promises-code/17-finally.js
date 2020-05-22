// La méthode `finally` (ES2018+) des promesses permet d’exécuter un traitement
// une fois la promesse établie, qu’elle soit accomplie ou rejetée, sans altérer
// son état pour la suite éventuelle de la chaîne.

Promise.resolve(42)
  .finally(() => console.log('À tous les coups'))
  // `finally` n’altérant pas l’état de la chaîne, on reste sur une promesse
  // accomplie avec 42, qu’on va donc afficher.
  .then(console.log)
  .then(() => {
    throw new Error('KABOOM')
  })
  .finally(() => console.log('À tous les coups aussi'))
  // `finally` n’altérant pas l’état de la chaîne, on reste sur une promesse
  // rejetée, le `then` suivant n’appellera donc pas son callback de succès.
  .then(() => console.log('Vous ne me verrez jamais'))
  // …en revanche, ce `catch` est bien appelé, qui affichera l’erreur…
  .catch(console.warn)
  // …et la neutralisera
  .then(() => console.log('Fini !'))

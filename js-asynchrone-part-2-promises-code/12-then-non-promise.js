// Quand un callback passé à `.then` renvoie autre chose qu’une promesse, elle
// est convertie en promesse accomplie via `Promise.resolve`.

Promise.resolve(42)
  // Le `then` appelle son 1er callback avec 42, valeur accomplie.
  .then(console.log)
  // `console.log` n’a rien renvoyé (`undefined`), mais n’a pas planté : le
  // résultat du callback de succès est converti en promesse accomplie avec
  // `undefined`, qui est donc passé à la suite de la chaîne ; c’est ce
  // qu’affichera ce deuxième `console.log`.
  .then(console.log)
  .then(() => '-')
  // On renvoie ici une promesse accomplie sur la String `'-'`.
  .then((text) => text.repeat(72))
  // On renvoie ici une promesse accomplie sur le résultat du `repeat`
  .then(console.log)

// On ne peut utiliser `await` que dans le corps de la fonction `async`, pas
// dans des fonctions imbriquées qui ne seraient pas `async`.  En d'autres
// termes, `await` n'est pas possible juste à cause d’une closure `async` autour
// de la fonction courante.

async function thisCanWait(items) {
  items.forEach(function(item) {
    // Syntaxiquement invalide : la fonction courante, c’est-à-dire la fonction
    // de rappel passée à `forEach`, n’est pas `async` (et ça n’aurait pas le
    // sens qu’on veut si elle l’était).
    await delay(10)
    console.log(item)
  })

  console.log('Fini')
}

console.log('C‘est parti ?')
thisCanWait(['Alice', 'Bob', 'Claire'])

// Tenter l’exécution de ce fichier entraînera une erreur en amont :
//
// SyntaxError: await is only valid in async function

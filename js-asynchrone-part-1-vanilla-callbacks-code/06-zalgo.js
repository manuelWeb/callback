// Parfois synchrone, parfois asynchrone ? Mauvaise idée !

const cache = new WeakMap()

function tryTooHard(key, callback) {
  if (cache.has(key)) {
    // On l’a déjà en cache ? On réutilise ! (synchrone)
    callback(cache.get(key))
    return
  }

  fetch(`https://jsonplaceholder.typicode.com/users/${key.id}`)
    .then((response) => response.json())
    .then((obj) => {
      cache.set(key, obj)
      // Appel en fin de traitement asynchrone (donc asynchrone aussi)
      callback(obj)
    })
}

// --------------------------------------------------------------------

const descriptor = { id: 1 }
console.log('À la une')

tryTooHard(descriptor, (user) => {
  // Rien en cache : on sera appelé de façon asynchrone,
  // donc après le Run-To-Completion du code appelant.
  console.log('À la trois :', user.name)
  console.log('À la quatre')

  tryTooHard(descriptor, (user) => {
    // On l’avait en cache : on sera appelé de façon synchrone,
    // donc *avant* le Run-To-Completion du code appelant.
    console.log('À la cinq :', user.name)
  })

  console.log('À la six')
})

console.log('À la deux')

// --------------------------------------------------------------------

function tryJustRight(key, callback) {
  if (cache.has(key)) {
    // On l’a déjà en cache ? On réutilise, mais asynchrone !
    setTimeout(() => callback(cache.get(key)), 0)
    // ou setImmediate, process.nextTick, requestAnimationFrame…
    return
  }

  fetch(`https://jsonplaceholder.typicode.com/users/${key.id}`)
    .then((response) => response.json())
    .then((obj) => {
      cache.set(key, obj)
      // Appel en fin de traitement asynchrone (donc asynchrone aussi)
      callback(obj)
    })
}

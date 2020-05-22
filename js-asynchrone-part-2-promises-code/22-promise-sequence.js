// Séquencement de promesses en construisant une série d'appels à `then()`.

let chain = Promise.resolve()
// Pour que les promesses ne soient pas parallèles, il faut les créer au fil de
// l'eau, et non toutes en même temps.  On crée la promesse N+1 quand la
// promesse N s’est accomplie.
for (const delay of [100, 300, 200]) {
  chain = chain
    .then(() => wait(delay))
    // Attention : `timeLog()` n'est pas disponible dans Edge < 18 ni Safari.
    // On la trouve en revanche dans Node, Chrome/Brave/Opera, Firefox.
    .then(() => console.timeLog('demo', delay))
}

console.time('demo')
chain.then(() => console.timeEnd('demo'))

// --------------------------------------------------------------------

function wait(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(delay), delay))
}

// Parallélisation de promesses en consommant au fur et à mesure

const waiters = [100, 300, 200].map(wait)

let promise = Promise.resolve()
for (const waiter of waiters) {
  promise = promise.then(() => waiter).then(handler)
}

console.time('parallelButFlowing')
promise.then(() => console.timeEnd('parallelButFlowing'))

// --------------------------------------------------------------------

function handler(value) {
  console.log(`Je traite le résultat ${value}…`)
}

function wait(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(delay), delay))
}

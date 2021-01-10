// see comment open 20-promise-all.js - solution see p2-11-parallelize.mp4 04:25
const waiters = [100, 1200, 600].map(wait)

const parallelWait = Promise.all(waiters)
// permet à console.timeEnd d'afficher le temps 0 - temps final d'exec
console.time('parallelWait')
parallelWait.then((results) => {
  console.timeEnd('parallelWait')
  console.log('Résultats :', results)
})
// TODO afficher le delais en cours de traitement
function wait(delay) {
  setTimeout(() => { console.log(delay) }, delay)
  return new Promise((resolve) => {
    setTimeout(
      function () { resolve(delay) }
      , delay)
  })
}
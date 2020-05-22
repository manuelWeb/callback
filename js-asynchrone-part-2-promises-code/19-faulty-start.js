// L’initialisation de la promesse peut nécessiter du blindage…

// --------------------------------------------------------------------

const DELAYS = { early: 50, regular: 300, late: 500 }

function wait1(delay) {
  return new Promise((resolve) => setTimeout(resolve, DELAIS[delay]))
}

console.time('wait1')
wait1('regular')
  .then(() => console.timeEnd('wait1'))
  .catch((err) => console.warn(err.message))

// // --------------------------------------------------------------------

// // Attention, une erreur à la mise en place ne sera pas protégée par la chaîne
// // de promesses (convertie en promesse rejetée) !
// function wait2(delay) {
//   return Promise.resolve().then(() => {
//     delay = DELAIS[delay]
//     return new Promise((resolve) => setTimeout(resolve, delay))
//   })
// }

// console.time('wait2')
// wait2('regular')
//   .then(() => console.timeEnd('wait2'))
//   .catch((err) => console.warn(err.message))

// // --------------------------------------------------------------------

// // Une erreur dans la fonction de rappel du constructeur le sera, en revanche.
// function wait3(delay) {
//   return new Promise((resolve) => setTimeout(resolve, DELAIS[delay]))
// }

// console.time('wait3')
// wait3('regular')
//   .then(() => console.timeEnd('wait3'))
//   .catch((err) => console.warn('wait3', err.message))

// // --------------------------------------------------------------------

// // Du coup, il est préférable de toujours démarrer au sein d’une chaîne établie.
// function wait4(delay) {
//   return Promise.resolve().then(() => {
//     delay = DELAIS[delay]
//     return new Promise((resolve) => setTimeout(resolve, delay))
//   })
// }

// console.time('wait4')
// wait4('regular')
//   .then(() => console.timeEnd('wait4'))
//   .catch((err) => console.warn('wait4', err.message))

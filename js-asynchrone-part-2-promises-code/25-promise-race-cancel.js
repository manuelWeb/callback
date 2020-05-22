// Simuler une annulation avec Promise.race()

function makePromiseCancellable(promise) {
  let cancel
  promise = Promise.race([
    promise,
    new Promise((resolve, reject) => {
      cancel = () => reject(new CancelError())
    }),
  ])

  return { promise, cancel }
}

const { promise, cancel } = makePromiseCancellable(wait(5000))

promise
  .then(() => console.log('5 secondes !'))
  .catch((err) => {
    if (err instanceof CancelError) {
      console.log('Promesse annulée !')
    } else {
      throw err
    }
  })
  .finally(() => process.exit(0))

process.stdin.on('readable', cancel)

// --------------------------------------------------------------------

class CancelError extends Error {}

function wait(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(delay), delay))
}

// Simuler un timeout avec Promise.race()

function timeoutPromise(promise, limit) {
  return Promise.race([promise, timeout(limit)]).catch((err) => {
    if (err instanceof TimeoutError) {
      console.log('Timeout !')
    } else {
      throw err
    }
  })
}

console.time('regular')
timeoutPromise(wait(100), 200)
  .then((value) => console.log(`Appelé assez vite avec ${value}`))
  .finally(() => console.timeEnd('regular'))

console.time('timed-out')
timeoutPromise(wait(400), 300).finally(() => console.timeEnd('timed-out'))

// --------------------------------------------------------------------

class TimeoutError extends Error {}

function timeout(limit) {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(new TimeoutError(limit)), limit)
  )
}

function wait(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(delay), delay))
}

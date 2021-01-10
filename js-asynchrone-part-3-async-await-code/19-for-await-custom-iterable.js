// Un exemple custom d’itérable asynchrone représentant une séquence de
// promesses quelconques, mises en place et exécutées l’une après l’autre.

const { delay } = require('awaiting')

demo()

async function demo() {
  const DELAYS = [100, 200, 300]
  console.time('yay async')
  for await (const ms of makeAsyncSeriesIterable(returningDelay, DELAYS)) {
    console.timeLog('yay async', ms)
  }
  console.timeEnd('yay async')
}

// --------------------------------------------------------------------

function makeAsyncSeriesIterable(factory, data) {
  let index = 0
  return {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          if (index >= data.length) {
            return { done: true }
          }
          return { value: await factory(data[index++]), done: false }
        },
      }
    },
  }
}

async function returningDelay(ms) {
  await delay(ms)
  return ms
}

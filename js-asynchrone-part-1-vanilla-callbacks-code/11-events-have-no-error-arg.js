// Les émetteurs d’événements ne passent pas un premier
// argument d’erreur : ils ont un événement `error` dédié.

const { createReadStream } = require('fs')

let readCount = 0
const path = process.argv[2] || '/dev/random'
const source = createReadStream(path)

source.on('readable', () => {
  while (source.read()) {}
  if (++readCount >= 10) source.close()
})

source.on('error', (err) => {
  console.warn(err.message)
  process.exit(74) // EX_IOERR
})

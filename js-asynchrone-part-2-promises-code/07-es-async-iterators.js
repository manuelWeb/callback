// Promesses natives en ES : les itérateurs asynchrones (ici des flux de lecture
// Node).

readSource(process.stdin)

async function readSource(source) {
  source.setEncoding('utf-8')
  for await (const text of source) {
    console.log('>>>', text)
  }
}
